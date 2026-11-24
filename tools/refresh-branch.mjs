// Project tool (not from the harness template): prepares the branch the Refresh solution views workflow commits to.
//
//   node tools/refresh-branch.mjs <branch> <open|none>
//
// open: a refresh PR from <branch> is open. Continue it and bring it up to date with origin/main by a merge (never a
//       force-push). When only the generated views conflict, take main's copy of them (they are regenerated next);
//       any other conflict aborts the merge and fails, so a person looks at it.
// none: no open refresh PR (never opened, merged, or closed unmerged). Start again from origin/main; a leftover
//       remote branch is deleted first so the next push needs no force.
import { execFileSync } from 'node:child_process';

export const VIEWS = ['docs/SOLUTION-OVERVIEW.md', 'docs/SOLUTION-DASHBOARD.md'];

const git = (cwd, ...args) =>
  execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

export function prepare(cwd, branch, pr) {
  const remoteBranch = git(cwd, 'ls-remote', '--heads', 'origin', branch) !== '';
  if (pr !== 'open') {
    if (remoteBranch) git(cwd, 'push', 'origin', '--delete', branch);
    git(cwd, 'switch', '-C', branch, 'origin/main');
    return 'started from origin/main';
  }
  if (!remoteBranch) throw new Error(`An open refresh PR is reported but origin has no branch ${branch}`);
  git(cwd, 'fetch', 'origin', branch);
  git(cwd, 'switch', '-C', branch, `origin/${branch}`);
  try {
    git(cwd, 'merge', '--no-edit', 'origin/main');
    return 'merged origin/main';
  } catch (error) {
    const conflicts = git(cwd, 'diff', '--name-only', '--diff-filter=U').split('\n').filter(Boolean);
    // No conflict: the merge did not start (no identity, a dirty tree); report git's own reason.
    if (!conflicts.length)
      throw new Error(`Merging origin/main into ${branch} failed: ${String(error.stderr ?? error.message).trim()}`);
    const others = conflicts.filter((f) => !VIEWS.includes(f));
    if (others.length) {
      git(cwd, 'merge', '--abort');
      throw new Error(
        `Merging origin/main into ${branch} conflicts outside the generated views (${others.join(', ') || 'no file listed'}); resolve it by hand`,
      );
    }
    git(cwd, 'checkout', '--theirs', '--', ...conflicts);
    git(cwd, 'add', '--', ...conflicts);
    git(cwd, 'commit', '--no-edit');
    return `merged origin/main, taking main's ${conflicts.join(', ')}`;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [branch, pr] = process.argv.slice(2);
  if (!branch || !['open', 'none'].includes(pr)) {
    console.error('Usage: node tools/refresh-branch.mjs <branch> <open|none>');
    process.exit(1);
  }
  try {
    console.log(prepare(process.cwd(), branch, pr));
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}
