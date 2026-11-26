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

// Harness 10.21.4 (F-101): with `htmlTables` the same rows are HTML table rows aligned to the top, and the label is a
// display name ("Coordinator").
const td = (...cells) =>
  `<tr valign="top">${cells.map((c) => (c.startsWith('<td') ? c : `<td>${c}</td>`)).join('')}</tr>`;
const a = (href, text) => `<a href="${href}">${text}</a>`;
const htmlDashboard = ({ time, sha, alpha = 'Open: Ready' }) =>
  [
    `Snapshot: ${time}. Read-only aggregation.`,
    '',
    '<table>',
    '<tr><th>Source</th><th>Revision</th><th>Snapshot state</th></tr>',
    td('Coordinator', a(own(sha), sha.slice(0, 12)), 'Committed snapshot<br>requested working checkout'),
    td(
      'Alpha',
      a('https://github.com/example/alpha/commit/aaaaaaaaaaaa', 'aaaaaaaaaaaa'),
      'Committed snapshot<br>GitHub',
    ),
    '</table>',
    '',
    '<table>',
    td('🚦 Coordinator', a(blob(sha), 'solution:F-001-T01'), 'Step', '—', 'owner procedure'),
    td(a(blob(sha), 'solution:F-001'), 'Feature', 'Open'),
    td(
      '<td align="right">1</td>',
      '🅰',
      a('https://github.com/example/alpha/blob/aaaa/docs/BACKLOG.md#f-001', 'alpha:F-001'),
      'One',
      alpha,
    ),
    '</table>',
    '',
  ].join('\n');

function htmlRepo() {
  const dir = mkdtempSync(join(tmpdir(), 'views-changed-html-'));
  git(dir, 'init', '-q', '-b', 'main');
  write(
    dir,
    '.solution.json',
    JSON.stringify({ repository: 'example/coord', label: 'Coordinator', emoji: '🚦', htmlTables: true }),
  );
  write(dir, 'docs/solution-order.md', '# Order\n');
  write(dir, 'docs/SOLUTION-DASHBOARD.md', htmlDashboard({ time: '2026-11-25T10:00:00Z', sha: '1'.repeat(40) }));
  git(dir, 'add', '-A');
  git(dir, '-c', 'user.name=t', '-c', 'user.email=t@example.invalid', 'commit', '-qm', 'init');
  return dir;
}

test("HTML tables: the coordinator's own new revision alone opens no PR", () => {
  const dir = htmlRepo();
  write(dir, 'docs/SOLUTION-DASHBOARD.md', htmlDashboard({ time: '2026-11-25T11:17:00Z', sha: '2'.repeat(40) }));
  assert.equal(viewsChanged(dir), false);
});

test("HTML tables: a component's change opens a PR", () => {
  const dir = htmlRepo();
  write(
    dir,
    'docs/SOLUTION-DASHBOARD.md',
    htmlDashboard({ time: '2026-11-25T11:17:00Z', sha: '2'.repeat(40), alpha: 'Closed: ✅ Done' }),
  );
  assert.equal(viewsChanged(dir), true);
});

test("HTML tables: a change only in the coordinator's own rows opens no PR, as in Markdown", () => {
  const dir = htmlRepo();
  const before = htmlDashboard({ time: '2026-11-25T10:00:00Z', sha: '1'.repeat(40) });
  write(
    dir,
    'docs/SOLUTION-DASHBOARD.md',
    before + td('🚦 Coordinator', '<td align="right">12</td>') + '\n' + td('Coordinator', 'local changes') + '\n',
  );
  git(dir, 'add', '-A');
  git(dir, '-c', 'user.name=t', '-c', 'user.email=t@example.invalid', 'commit', '-qm', 'rows');
  write(
    dir,
    'docs/SOLUTION-DASHBOARD.md',
    before + td('🚦 Coordinator', '<td align="right">13</td>') + '\n' + td('Coordinator', 'committed') + '\n',
  );
  assert.equal(viewsChanged(dir), false);
});
