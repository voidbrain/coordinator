// Project tool (not from the harness template): did a refresh change the views beyond what changes on every run (B-004)?
//
//   node tools/views-changed.mjs
//
// Compares the working tree with HEAD over the files the refresh writes. Lines that change on every run are ignored:
// the snapshot time, and this repository's own revision (its source row, its summary and blocked rows, and every link
// pinned to one of its commits), which moves with each merge to main, the refresh PR's own merge included. Without
// that, each merged refresh PR would make the next scheduled run open another one.
// Prints "changed" and exits 0 when a PR is due; prints "unchanged" and exits 1 when not. Any git error exits 2.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { REFRESHED } from './refresh-branch.mjs';

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// POSIX extended regular expressions for git diff -I: a hunk is ignored when all its changed lines match one.
export function ignorePatterns(repository, label = 'coordinator', emoji = '🚦') {
  return [
    '^Snapshot',
    `^\\| (solution|${escape(label)}) \\|`,
    '^\\| \\[solution:',
    `^\\| ${escape(emoji)}`,
    `^\\| [0-9]+ \\| ${escape(emoji)}`,
    `github\\.com/${escape(repository)}/(commit|blob)/`,
  ];
}

export function viewsChanged(cwd) {
  const manifest = JSON.parse(readFileSync(join(cwd, '.solution.json'), 'utf8'));
  const args = ['diff', '--quiet', ...ignorePatterns(manifest.repository, manifest.label, manifest.emoji).flatMap((p) => ['-I', p])];
  try {
    execFileSync('git', [...args, '--', ...REFRESHED], { cwd, stdio: 'ignore' });
    return false;
  } catch (error) {
    if (error.status === 1) return true;
    throw error;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const changed = viewsChanged(process.cwd());
    console.log(changed ? 'changed' : 'unchanged');
    process.exit(changed ? 0 : 1);
  } catch (error) {
    console.error(error.message);
    process.exit(2);
  }
}
