// Project tool (not from the harness template): prepares the branch the Refresh solution views workflow commits to.
//
//   node tools/refresh-branch.mjs <branch>
//
// It asks GitHub (gh pr list) whether a refresh PR from <branch> is open, and stops on any error: a failed lookup must
// never read as "no PR open", which would delete the open PR's branch.
//
// open: a refresh PR from <branch> is open. Continue it and bring it up to date with origin/main by a merge (never a
//       force-push). When only the generated views or the solution order conflict, take main's copy of them (the
//       views are regenerated and the order's Done items dropped again by the solution:refresh step that runs after
//       this one, B-001); any other conflict aborts the
//       merge and fails, so a person looks at it.
// none: no open refresh PR (never opened, merged, or closed unmerged). Start again from origin/main; a leftover
//       remote branch is deleted first so the next push needs no force.
import { execFileSync } from 'node:child_process';

export const VIEWS = ['docs/SOLUTION-DASHBOARD.md'];
// Files the refresh writes: the views, and the order it drops Done items from (B-001).
export const REFRESHED = [...VIEWS, 'docs/solution-order.md'];

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
    const others = conflicts.filter((f) => !REFRESHED.includes(f));
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

// Number of open PRs from <branch>, from `gh pr list`; any failure or unexpected output throws.
const ghOpenPrs = (branch) =>
  execFileSync('gh', ['pr', 'list', '--head', branch, '--state', 'open', '--json', 'number', '--jq', 'length'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

export function refresh(cwd, branch, openPrs = ghOpenPrs) {
  let count;
  try {
    count = String(openPrs(branch)).trim();
  } catch (error) {
    throw new Error(
      `Could not tell whether a refresh PR is open (${String(error.stderr ?? error.message).trim()}); nothing changed`,
    );
  }
  if (!/^\d+$/.test(count))
    throw new Error(`Could not tell whether a refresh PR is open (gh printed "${count}"); nothing changed`);
  return prepare(cwd, branch, Number(count) > 0 ? 'open' : 'none');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [branch] = process.argv.slice(2);
  if (!branch) {
    console.error('Usage: node tools/refresh-branch.mjs <branch>');
    process.exit(1);
  }
  try {
    console.log(refresh(process.cwd(), branch));
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}
