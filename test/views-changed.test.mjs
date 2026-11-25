import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { viewsChanged } from '../tools/views-changed.mjs';

const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const write = (dir, file, text) => {
  mkdirSync(join(dir, file, '..'), { recursive: true });
  writeFileSync(join(dir, file), text);
};

const own = (sha) => `https://github.com/example/coord/commit/${sha}`;
const blob = (sha) => `https://github.com/example/coord/blob/${sha}/docs/BACKLOG.md#f-001`;
// The dashboard lines that carry the coordinator's own revision, shaped like the 10.21.2 layout.
const dashboard = ({ time, sha, alpha = 'Open: Ready' }) =>
  [
    `Snapshot: ${time}. Read-only aggregation.`,
    '',
    '| Source | Revision | Snapshot state |',
    '|---|---|---|',
    `| coordinator | [${sha.slice(0, 12)}](${own(sha)}) | Committed snapshot; requested working checkout |`,
    '| alpha | [aaaaaaaaaaaa](https://github.com/example/alpha/commit/aaaaaaaaaaaa) | Committed snapshot; GitHub |',
    '',
    `| 🚦 coordinator | [solution:F-001-T01](${blob(sha)}) | Step | — | owner procedure |`,
    `| [solution:F-001](${blob(sha)}) | Feature | Open |`,
    `| 1 | 🅰 | [alpha:F-001](https://github.com/example/alpha/blob/aaaa/docs/BACKLOG.md#f-001) | One | ${alpha} |`,
    '',
  ].join('\n');

function repo() {
  const dir = mkdtempSync(join(tmpdir(), 'views-changed-'));
  git(dir, 'init', '-q', '-b', 'main');
  write(dir, '.solution.json', JSON.stringify({ repository: 'example/coord', label: 'coordinator', emoji: '🚦' }));
  write(dir, 'docs/solution-order.md', '# Order\n');
  write(dir, 'docs/SOLUTION-DASHBOARD.md', dashboard({ time: '2026-11-25T10:00:00Z', sha: '1'.repeat(40) }));
  git(dir, 'add', '-A');
  git(dir, '-c', 'user.name=t', '-c', 'user.email=t@example.invalid', 'commit', '-qm', 'init');
  return dir;
}

test('a new snapshot time alone opens no PR', () => {
  const dir = repo();
  write(dir, 'docs/SOLUTION-DASHBOARD.md', dashboard({ time: '2026-11-25T11:17:00Z', sha: '1'.repeat(40) }));
  assert.equal(viewsChanged(dir), false);
});

test("the coordinator's own new revision (a merged refresh PR) opens no PR", () => {
  const dir = repo();
  write(dir, 'docs/SOLUTION-DASHBOARD.md', dashboard({ time: '2026-11-25T11:17:00Z', sha: '2'.repeat(40) }));
  assert.equal(viewsChanged(dir), false);
});

test("a component's change opens a PR", () => {
  const dir = repo();
  write(
    dir,
    'docs/SOLUTION-DASHBOARD.md',
    dashboard({ time: '2026-11-25T11:17:00Z', sha: '2'.repeat(40), alpha: 'Closed: ✅ Done' }),
  );
  assert.equal(viewsChanged(dir), true);
});

test('a change to the solution order opens a PR', () => {
  const dir = repo();
  write(dir, 'docs/solution-order.md', '# Order\n\n1. alpha:F-001\n');
  assert.equal(viewsChanged(dir), true);
});
