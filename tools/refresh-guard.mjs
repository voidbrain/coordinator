// Project tool (not from the harness template): decides whether a refresh PR may merge itself (F-010).
//
//   node tools/refresh-guard.mjs <base>
//
// Compares HEAD with <base> (the workflow passes origin/main) over their merge base, like the PR's own diff. Auto-merge
// is allowed only when the PR touches nothing but the generated views and, in the solution order, only drops items the
// regenerated dashboard shows as Closed (B-058, --prune-order): no other line of the order changes but the numbering.
// Prints "ok" and exits 0 when allowed; otherwise prints each reason and exits 1. Any git error exits 2.
import { execFileSync } from 'node:child_process';
import { VIEWS } from './refresh-branch.mjs';

export const ORDER = 'docs/solution-order.md';
export const DASHBOARD = 'docs/SOLUTION-DASHBOARD.md';

const MARKERS = /(<!-- order:start -->)([\s\S]*?)(<!-- order:end -->)/;
const ITEM = /^\d+\. (\S+)(.*)$/;

// The order split into the text outside the markers and its lines inside, each item without its number.
function parseOrder(text) {
  const m = MARKERS.exec(text);
  if (!m) return undefined;
  const lines = m[2].split('\n').map((line) => {
    const item = ITEM.exec(line.trim());
    return item ? { ref: item[1], rest: item[2] } : { line };
  });
  return { outside: text.replace(MARKERS, '$1$3'), lines };
}

// References the dashboard lists as Closed in its solution order table. The columns are found by the table's header
// (`| # | … | Item | … | Status… |`), so both the 10.20 layout (Status "Closed") and the 10.21 one (F-099: an emoji
// column, the item linked, "<status>: ✅ Done: closed …") are read, as Markdown rows or, with 10.21.4's htmlTables
// (B-005), as HTML rows (`<tr>…</tr>` on one line). Markdown cells split on unescaped pipes only.
function closedRefs(dashboard) {
  const refs = new Set();
  let item = -1;
  let status = -1;
  for (const line of dashboard.split('\n')) {
    const cells = rowCells(line.trim());
    // The order table ends at the first line that is not a table row; numbered rows of a later table are not read.
    if (!cells) {
      item = -1;
      status = -1;
      continue;
    }
    if (cells[1] === '#') {
      item = cells.indexOf('Item');
      status = cells.findIndex((c) => c.startsWith('Status'));
      continue;
    }
    if (item < 0 || status < 0 || !/^\d+$/.test(cells[1] ?? '')) continue;
    const cell = cells[status] ?? '';
    if (cell === 'Closed' || cell.includes('✅ Done: closed')) refs.add((cells[item] ?? '').replace(/^\[(.*)\]\(.*\)$/, '$1'));
  }
  return refs;
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" };

// A table row's cells, indexed as a Markdown row splits (cell 1 is the first column), or undefined when the line is
// not a row. HTML cells lose their tags, so a linked item reads as its text.
function rowCells(line) {
  if (line.startsWith('|')) return line.split(/(?<!\\)\|/).map((c) => c.trim());
  if (!/^<tr[\s>]/.test(line)) return undefined;
  const cells = [...line.matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/g)].map((m) =>
    m[1]
      .replace(/<[^>]*>/g, '')
      .replace(/&(amp|lt|gt|quot|#39);/g, (_, e) => ENTITIES[e])
      .trim(),
  );
  return ['', ...cells];
}

// Reasons the order change is more than dropping Closed items; empty when it is only that.
export function orderReasons(before, after, dashboard) {
  const a = parseOrder(before);
  const b = parseOrder(after);
  if (!a || !b) return [`${ORDER}: the order markers are missing`];
  const reasons = [];
  if (a.outside !== b.outside) reasons.push(`${ORDER}: text outside the order list changed`);
  const closed = closedRefs(dashboard);
  const key = (l) => (l.ref ? `${l.ref}${l.rest}` : `line:${l.line}`);
  let j = 0;
  for (const l of a.lines) {
    if (j < b.lines.length && key(b.lines[j]) === key(l)) {
      j++;
      continue;
    }
    if (!l.ref) reasons.push(`${ORDER}: a non-item line in the order list changed`);
    else if (!closed.has(l.ref)) reasons.push(`${ORDER}: ${l.ref} was removed but the dashboard does not show it Closed`);
  }
  if (j < b.lines.length) reasons.push(`${ORDER}: lines were added or changed in the order list`);
  return [...new Set(reasons)];
}

// Reasons the PR may not merge itself; empty when it may. before/after are the order at the merge base and
// at HEAD; dashboard is HEAD's dashboard.
export function guardReasons(changed, { before, after, dashboard }) {
  const reasons = changed
    .filter((f) => !VIEWS.includes(f) && f !== ORDER)
    .map((f) => `${f} is not a generated file the refresh writes`);
  if (changed.includes(ORDER)) reasons.push(...orderReasons(before, after, dashboard));
  return reasons;
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

if (import.meta.url === `file://${process.argv[1]}`) {
  const [base] = process.argv.slice(2);
  if (!base) {
    console.error('Usage: node tools/refresh-guard.mjs <base>');
    process.exit(2);
  }
  try {
    const mergeBase = git('merge-base', base, 'HEAD').trim();
    const changed = git('diff', '--name-only', mergeBase, 'HEAD').split('\n').filter(Boolean);
    const show = (rev, path) => {
      try {
        return git('show', `${rev}:${path}`);
      } catch {
        return '';
      }
    };
    const reasons = guardReasons(changed, {
      before: show(mergeBase, ORDER),
      after: show('HEAD', ORDER),
      dashboard: show('HEAD', DASHBOARD),
    });
    if (reasons.length) {
      for (const r of reasons) console.log(`- ${r}`);
      process.exitCode = 1;
    } else console.log('ok');
  } catch (e) {
    console.error(String(e.stderr ?? e.message).trim());
    process.exitCode = 2;
  }
}
