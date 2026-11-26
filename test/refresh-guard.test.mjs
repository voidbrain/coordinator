import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { guardReasons, orderReasons } from '../tools/refresh-guard.mjs';

const order = (...items) =>
  `# Solution order\n\nIntro.\n\n<!-- order:start -->\n${items.map((x, i) => `${i + 1}. ${x}`).join('\n')}\n<!-- order:end -->\n`;
const dashboard = (closed) =>
  [
    '| # | Item | Title | Status | Priority | Remaining | State | Note |',
    '|---|---|---|---|---|---|---|---|',
    '| 1 | a:F-001 | One | Closed | — | — | ✅ Done | n |',
    `| 2 | a:F-002 | Two | ${closed ? 'Closed' : 'Planned'} | — | — | Ready | n |`,
    '| 3 | a:F-003 | Three | Planned | — | — | Ready | n |',
  ].join('\n');
const before = order('a:F-001 — one', 'a:F-002 — two', 'a:F-003 — three');

test('only the generated views changed: auto-merge allowed', () => {
  assert.deepEqual(guardReasons(['docs/SOLUTION-DASHBOARD.md'], {}), []);
});

test('any other path blocks auto-merge and is named', () => {
  assert.deepEqual(guardReasons(['docs/SOLUTION-DASHBOARD.md', 'tools/solution.mjs'], {}), [
    'tools/solution.mjs is not a generated file the refresh writes',
  ]);
});

test('dropping Closed items and renumbering the rest is allowed', () => {
  assert.deepEqual(orderReasons(before, order('a:F-002 — two', 'a:F-003 — three'), dashboard(false)), []);
  assert.deepEqual(orderReasons(before, order('a:F-003 — three'), dashboard(true)), []);
});

// The order table of harness 10.21.0 and later (F-099): an emoji column, the item linked, and a Done item reads
// "<status>: ✅ Done: closed …" (closed in the archive, or found Closed in the backlog).
const dashboard1021 = (closed) =>
  [
    '| # | | Item | Title | Status / state | Agent h | Owner h | Open prerequisites | Note |',
    '|---:|---|---|---|---|---:|---:|---|---|',
    '| 1 | 🅰 | a:F-001 | One | Closed: ✅ Done: closed 2026-11-24 in [docs/archive/backlog-2026.md](https://example.invalid/a#f-001) | — | — | — | n |',
    `| 2 | 🅰 | [a:F-002](https://example.invalid/a#f-002) | Two \\| pipe | ${closed ? 'Closed: ✅ Done: closed in [F-002.md](https://example.invalid/a/F-002.md)' : 'Open: ▶ Ready'} | 1 | 0 | — | n |`,
    '| 3 | 🅰 | [a:F-003](https://example.invalid/a#f-003) | Three | Open: Ready | 1 | 0 | — | n |',
  ].join('\n');

test('10.21 order layout: dropping Done items is allowed, dropping a Ready one is refused', () => {
  assert.deepEqual(orderReasons(before, order('a:F-002 — two', 'a:F-003 — three'), dashboard1021(false)), []);
  assert.deepEqual(orderReasons(before, order('a:F-003 — three'), dashboard1021(true)), []);
  assert.deepEqual(orderReasons(before, order('a:F-001 — one', 'a:F-003 — three'), dashboard1021(false)), [
    'docs/solution-order.md: a:F-002 was removed but the dashboard does not show it Closed',
  ]);
});

// The order table of harness 10.21.4 with htmlTables (B-005): HTML rows, one per line, the item a link and the
// status cell holding a link of its own.
const dashboardHtml = (closed) =>
  [
    '<table>',
    '<tr><th align="right">#</th><th></th><th>Item</th><th>Title</th><th>Status / state</th><th align="right">Agent h</th><th align="right">Owner h</th><th>Open prerequisites</th><th>Note</th></tr>',
    '<tr valign="top"><td align="right">1</td><td>🅰</td><td><a href="https://example.invalid/a#f-001">a:F-001</a></td><td>One</td><td>Closed: ✅ Done: closed 2026-11-24 in <a href="https://example.invalid/a#f-001">docs/archive/backlog-2026.md</a></td><td align="right">0</td><td align="right">0</td><td>—</td><td>n</td></tr>',
    `<tr valign="top"><td align="right">2</td><td>🅰</td><td><a href="https://example.invalid/a#f-002">a:F-002</a></td><td>Two &amp; more</td><td>${closed ? 'Closed: ✅ Done: closed in <a href="https://example.invalid/a/F-002.md">F-002.md</a>' : 'Open: ▶ Ready'}</td><td align="right">1</td><td align="right">0</td><td>—</td><td>n</td></tr>`,
    '<tr valign="top"><td align="right">3</td><td>🅰</td><td><a href="https://example.invalid/a#f-003">a:F-003</a></td><td>Three</td><td>Open: Ready</td><td align="right">1</td><td align="right">0</td><td>—</td><td>n</td></tr>',
    '</table>',
  ].join('\n');

test('HTML order table: dropping Done items is allowed, dropping a Ready one is refused', () => {
  assert.deepEqual(orderReasons(before, order('a:F-002 — two', 'a:F-003 — three'), dashboardHtml(false)), []);
  assert.deepEqual(orderReasons(before, order('a:F-003 — three'), dashboardHtml(true)), []);
  assert.deepEqual(orderReasons(before, order('a:F-001 — one', 'a:F-003 — three'), dashboardHtml(false)), [
    'docs/solution-order.md: a:F-002 was removed but the dashboard does not show it Closed',
  ]);
});

test('numbered rows of a later HTML table are not read with the order table columns', () => {
  const later = `${dashboardHtml(false)}\n\n## Other\n\n<table>\n<tr><th>Kind</th><th>x</th><th>Item</th><th>y</th><th>Status</th></tr>\n<tr valign="top"><td>2</td><td>🅰</td><td>a:F-002</td><td>t</td><td>Closed: ✅ Done: closed</td></tr>\n</table>`;
  assert.deepEqual(orderReasons(before, order('a:F-001 — one', 'a:F-003 — three'), later), [
    'docs/solution-order.md: a:F-002 was removed but the dashboard does not show it Closed',
  ]);
});

test('numbered rows of a later table are not read with the order table columns', () => {
  const later = `${dashboard1021(false)}\n\n## Other\n\n| Kind | x | Item | y | Status |\n|---|---|---|---|---|\n| 2 | 🅰 | a:F-002 | t | Closed: ✅ Done: closed in [x](y) |`;
  assert.deepEqual(orderReasons(before, order('a:F-001 — one', 'a:F-003 — three'), later), [
    'docs/solution-order.md: a:F-002 was removed but the dashboard does not show it Closed',
  ]);
});

test('dropping an item the dashboard does not show Closed is refused', () => {
  assert.deepEqual(orderReasons(before, order('a:F-001 — one', 'a:F-003 — three'), dashboard(false)), [
    'docs/solution-order.md: a:F-002 was removed but the dashboard does not show it Closed',
  ]);
});

test('reordering, adding, editing a note or the text outside the list is refused', () => {
  const d = dashboard(true);
  assert.ok(orderReasons(before, order('a:F-002 — two', 'a:F-001 — one', 'a:F-003 — three'), d).length);
  assert.ok(orderReasons(before, order('a:F-001 — one', 'a:F-002 — two', 'a:F-003 — three', 'a:F-004 — x'), d).length);
  assert.ok(orderReasons(before, order('a:F-001 — one', 'a:F-002 — two', 'a:F-003 — new note'), d).length);
  assert.deepEqual(
    orderReasons(before, order('a:F-001 — one', 'a:F-002 — two', 'a:F-003 — three').replace('Intro', 'Edited'), d),
    ['docs/solution-order.md: text outside the order list changed'],
  );
});

test('the command reads the PR diff against the base over the merge base', () => {
  const dir = mkdtempSync(join(tmpdir(), 'guard-'));
  const git = (...args) => execFileSync('git', args, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const write = (file, text) => {
    mkdirSync(join(dir, file, '..'), { recursive: true });
    writeFileSync(join(dir, file), text);
  };
  const commit = (m) => {
    git('add', '-A');
    git('-c', 'user.name=t', '-c', 'user.email=t@example.invalid', 'commit', '-qm', m);
  };
  const run = () => {
    try {
      return {
        code: 0,
        out: execFileSync('node', [join(import.meta.dirname, '../tools/refresh-guard.mjs'), 'main'], {
          cwd: dir,
          encoding: 'utf8',
        }),
      };
    } catch (e) {
      return { code: e.status, out: e.stdout };
    }
  };
  git('init', '-q', '-b', 'main');
  write('docs/solution-order.md', before);
  write('docs/SOLUTION-DASHBOARD.md', dashboard(false));
  write('README.md', 'r\n');
  commit('init');
  git('switch', '-qc', 'refresh');
  write('docs/solution-order.md', order('a:F-002 — two', 'a:F-003 — three'));
  write('docs/SOLUTION-DASHBOARD.md', dashboard(false) + '\n');
  commit('refresh');
  // main moving on elsewhere is not part of the PR's diff
  git('switch', '-q', 'main');
  write('README.md', 'r2\n');
  commit('main moves');
  git('switch', '-q', 'refresh');
  assert.deepEqual(run(), { code: 0, out: 'ok\n' });
  write('README.md', 'edited on the branch\n');
  commit('stray');
  assert.deepEqual(run(), { code: 1, out: '- README.md is not a generated file the refresh writes\n' });
});
