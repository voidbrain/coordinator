import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { prepare } from '../tools/refresh-branch.mjs';

const git = (cwd, ...args) =>
  execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const write = (dir, file, text) => {
  mkdirSync(join(dir, file, '..'), { recursive: true });
  writeFileSync(join(dir, file), text);
};
const commit = (dir, message) => {
  git(dir, 'add', '-A');
  git(dir, '-c', 'user.name=t', '-c', 'user.email=t@example.invalid', 'commit', '-qm', message);
};

// A bare origin with main and an open refresh branch, both of which changed the overview since they split.
function setup({ alsoConflictIn } = {}) {
  const base = mkdtempSync(join(tmpdir(), 'refresh-'));
  const origin = join(base, 'origin.git');
  const work = join(base, 'work');
  git(base, 'init', '-q', '--bare', '-b', 'main', origin);
  git(base, 'clone', '-q', origin, work);
  // The workflow sets an identity before it merges; so does the test (CI runners have none).
  git(work, 'config', 'user.name', 't');
  git(work, 'config', 'user.email', 't@example.invalid');
  write(work, 'docs/SOLUTION-OVERVIEW.md', 'snapshot 1\n');
  write(work, 'README.md', 'readme 1\n');
  commit(work, 'init');
  git(work, 'push', '-q', 'origin', 'HEAD:main');
  git(work, 'switch', '-qc', 'chore/refresh');
  write(work, 'docs/SOLUTION-OVERVIEW.md', 'snapshot from the refresh branch\n');
  if (alsoConflictIn) write(work, alsoConflictIn, 'branch edit\n');
  commit(work, 'refresh');
  git(work, 'push', '-q', 'origin', 'chore/refresh');
  git(work, 'switch', '-q', 'main');
  write(work, 'docs/SOLUTION-OVERVIEW.md', 'snapshot regenerated on main\n');
  if (alsoConflictIn) write(work, alsoConflictIn, 'main edit\n');
  commit(work, 'main moves on');
  git(work, 'push', '-q', 'origin', 'main');
  git(work, 'fetch', '-q', 'origin');
  return work;
}

// Re-review of PR #1, finding 1: the refresh branch got stuck on a conflict in the generated views.
test('an open refresh branch whose only conflict is a generated view takes main copy and merges', () => {
  const work = setup();
  assert.match(prepare(work, 'chore/refresh', 'open'), /taking main's docs\/SOLUTION-OVERVIEW.md/);
  assert.equal(readFileSync(join(work, 'docs/SOLUTION-OVERVIEW.md'), 'utf8'), 'snapshot regenerated on main\n');
  assert.equal(git(work, 'status', '--porcelain'), '');
  assert.equal(git(work, 'merge-base', '--is-ancestor', 'origin/main', 'HEAD'), '');
});

test('a conflict outside the generated views aborts the merge and fails', () => {
  const work = setup({ alsoConflictIn: 'README.md' });
  assert.throws(() => prepare(work, 'chore/refresh', 'open'), /outside the generated views \(README.md\)/);
  assert.equal(git(work, 'status', '--porcelain'), '');
});

test('without an open PR the branch starts again from main and the leftover remote branch is deleted', () => {
  const work = setup();
  assert.equal(prepare(work, 'chore/refresh', 'none'), 'started from origin/main');
  assert.equal(git(work, 'rev-parse', 'HEAD'), git(work, 'rev-parse', 'origin/main'));
  assert.equal(git(work, 'ls-remote', '--heads', 'origin', 'chore/refresh'), '');
});
