// F-024-T05: the live index's screen, one HTML page rendered from the cache at each request and served on the base's
// loopback address only (src/mcp.mjs, GET /). Styled with bricks' framework-free layer: its tokens, base theme and
// foundations, read from the bricks checkout; bricks' components are Angular and are not used here.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { answer, load } from './read-tools.mjs';

const DONE_STEPS = new Set(['closed', 'verified', 'completed']);
const DASHBOARD = 'https://github.com/voidbrain/coordinator/blob/main/docs/SOLUTION-DASHBOARD.md';

// bricks' tokens, base theme and foundations from its checkout, or null when they are not there.
export function bricksCss(checkout) {
  try {
    return ['tokens.css', 'themes/base.css', 'foundations.css']
      .map((f) => readFileSync(join(checkout, 'projects/bricks/styles', f), 'utf8'))
      .join('\n');
  } catch {
    return null;
  }
}

const esc = (v) =>
  String(v ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
const link = (url, text) => (url ? `<a href="${esc(url)}">${esc(text)}</a>` : esc(text));
const table = (head, rows) =>
  rows.length
    ? `<table><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`
    : '<p>None.</p>';
const hours = (list) => String(list.reduce((sum, h) => sum + (h ?? 0), 0));
const time = (iso) =>
  /^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(iso ?? '')
    ? `<time datetime="${esc(iso)}">${esc(iso.slice(0, 10))} ${esc(iso.slice(11, 16))} UTC</time>`
    : esc(iso ?? 'unknown');

// Spacing, colour and type come from bricks tokens only.
const OWN_CSS = `
main { max-width: 72rem; margin: 0 auto; padding: var(--bx-space-6) var(--bx-space-4); --bx-gap: var(--bx-space-4); }
h1 { font-size: var(--bx-font-size-2xl); margin: 0; }
h2 { font-size: var(--bx-font-size-xl); margin: var(--bx-space-4) 0 0; }
h3 { font-size: var(--bx-font-size-lg); margin: var(--bx-space-2) 0 0; }
p { margin: 0; color: var(--bx-text-muted); }
section { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; background: var(--bx-surface-raised); border: var(--bx-line-width) solid var(--bx-border); border-radius: var(--bx-radius); }
th, td { text-align: left; vertical-align: top; padding: var(--bx-space-2) var(--bx-space-3); border-bottom: var(--bx-line-width) solid var(--bx-border); }
th { font-weight: var(--bx-font-weight-medium); color: var(--bx-text-muted); font-size: var(--bx-font-size-sm); }
a { color: var(--bx-accent); }
.bad { color: var(--bx-danger); }
`;

const page = (css, body) =>
  '<!doctype html>\n<html lang="en"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="300">' +
  `<title>Live index</title><style>${css}</style><style>${OWN_CSS}</style></head>` +
  `<body data-bx-theme="base"><main class="bx-stack"><h1>🚦 voidbrain live index</h1>${body}</main></body></html>\n`;

export function screen(db, css) {
  let c, waiting;
  try {
    c = load(db);
    waiting = answer(db, 'waiting_on_me', {});
  } catch (e) {
    return page(css ?? '', `<p class="bad">${esc(e.message)}.</p>`);
  }
  const unknown = new Map(waiting.unknown.map((u) => [u.repo, u.message]));
  const repos = c.sources.map((s) => s.repo);
  const openRecords = c.records.filter((r) => !r.archived && r.status !== 'Closed');
  const openSteps = c.steps.filter((s) => !DONE_STEPS.has(s.status.toLowerCase()));
  const blob = (s, file) =>
    s?.owner_name && s.commit_sha ? `https://github.com/${s.owner_name}/blob/${s.commit_sha}/${file}` : null;
  const source = new Map(c.sources.map((s) => [s.repo, s]));

  const sources = table(
    ['Repository', 'Commit', 'Read at', 'State'],
    c.sources.map((s) => [
      esc(s.repo),
      s.commit_sha
        ? link(
            s.owner_name ? `https://github.com/${s.owner_name}/commit/${s.commit_sha}` : null,
            s.commit_sha.slice(0, 12),
          )
        : '—',
      time(s.read_at),
      unknown.has(s.repo) ? `<span class="bad">unknown: ${esc(unknown.get(s.repo))}</span>` : esc(s.layout),
    ]),
  );
  const summary = table(
    ['Repository', 'Open records', 'Agent h in open steps', 'Owner h in open steps', 'Problems'],
    repos.map((repo) => {
      if (unknown.has(repo)) return [esc(repo), 'unknown', 'unknown', 'unknown', '1'];
      const steps = openSteps.filter((s) => s.repo === repo);
      return [
        esc(repo),
        String(openRecords.filter((r) => r.repo === repo).length),
        hours(steps.map((s) => s.agent_hours)),
        hours(steps.map((s) => s.owner_hours)),
        String(c.problems.filter((p) => p.repo === repo).length),
      ];
    }),
  );
  const owner = table(
    ['Step', 'Title', 'Kind', 'Owner h'],
    waiting.steps.map((s) => [
      link(s.source.url, `${s.repo}:${s.id}`),
      esc(s.title),
      esc(s.ownerKind),
      esc(s.ownerHours ?? ''),
    ]),
  );
  const open = repos
    .filter((repo) => !unknown.has(repo))
    .map(
      (repo) =>
        `<h3>${esc(repo)}</h3>` +
        table(
          ['Record', 'Title', 'Status', 'Next'],
          openRecords
            .filter((r) => r.repo === repo)
            .map((r) => [
              link(blob(source.get(repo), r.file), `${repo}:${r.id}`),
              esc(r.title),
              esc(r.status),
              esc(r.next),
            ]),
        ),
    )
    .join('');
  const problems = table(
    ['Repository', 'File', 'Problem'],
    c.problems.map((p) => [esc(p.repo), esc(p.file ?? '—'), esc(p.message)]),
  );
  return page(
    css ?? '',
    `<p>Snapshot ${time(waiting.snapshot)} (the oldest repository read). Read from GitHub every 5 minutes; this page reloads every 5 minutes. ` +
      `The git copy is the committed <a href="${DASHBOARD}">solution dashboard</a>, which also holds the solution order, the agent runway, harness versions and audit dates.</p>` +
      (css ? '' : '<p class="bad">bricks styles not found in the bricks checkout: unstyled.</p>') +
      `<section><h2>Sources</h2>${sources}</section><section><h2>Summary</h2>${summary}</section>` +
      `<section><h2>Waiting for the owner</h2>${owner}</section><section><h2>Open work by repository</h2>${open}</section>` +
      `<section><h2>Source problems</h2>${problems}</section>`,
  );
}
