// Project tool (not from the harness template): the owner's one-page view of all open work.
// Reads every component's backlog (GitHub with --remote, or the declared local checkouts at their declared ref),
// the coordinator's own backlog and docs/solution-order.md, and writes docs/SOLUTION-OVERVIEW.md.
// Read-only towards components: it never writes, fetches into or changes a component checkout.
//
//   node tools/solution-overview.mjs --check            validate docs/solution-order.md offline (CI)
//   node tools/solution-overview.mjs [--remote]         print the overview
//   node tools/solution-overview.mjs --remote --write   write docs/SOLUTION-OVERVIEW.md
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const args = process.argv.slice(2);
for (const a of args)
  if (!['--check', '--remote', '--write'].includes(a)) {
    console.error(`Unknown option: ${a}`);
    process.exit(1);
  }
const has = (flag) => args.includes(flag);
const ORDER = 'docs/solution-order.md';
const OUT = 'docs/SOLUTION-OVERVIEW.md';
const MARK = '<!-- generated: tools/solution-overview.mjs; edit docs/solution-order.md or the owning backlogs, not this file -->';
const REF = /^([a-z][a-z0-9-]*):([BF]-\d+(?:-T\d+)?)$/;

const stamp = JSON.parse(readFileSync(resolve(root, '.harness.json'), 'utf8'));
const manifestPath = resolve(root, stamp.solution?.manifest ?? '.solution.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const ids = new Set(['solution', ...manifest.repositories.map((r) => r.id)]);

// ---------- solution order ----------
function readOrder() {
  const problems = [];
  const text = readFileSync(resolve(root, ORDER), 'utf8');
  const start = text.indexOf('<!-- order:start -->');
  const end = text.indexOf('<!-- order:end -->');
  if (start < 0 || end < start) return { items: [], problems: [`${ORDER}: missing <!-- order:start --> / <!-- order:end --> markers`] };
  const items = [];
  const seen = new Set();
  for (const line of text.slice(start, end).split('\n').slice(1)) {
    if (!line.trim()) continue;
    const m = /^(\d+)\. `([^`]+)`(?: — (.*))?$/.exec(line.trim());
    if (!m) {
      problems.push(`${ORDER}: not an order line ("N. \`repo:ID\` — note"): ${line.trim()}`);
      continue;
    }
    const ref = REF.exec(m[2]);
    if (!ref) problems.push(`${ORDER}: ${m[2]} is not repo:ID (B-nnn, F-nnn or a step ID such as F-005-T29)`);
    else if (!ids.has(ref[1])) problems.push(`${ORDER}: ${m[2]} names no manifest repository (${[...ids].join(', ')})`);
    if (seen.has(m[2])) problems.push(`${ORDER}: ${m[2]} is listed twice`);
    if (Number(m[1]) !== items.length + 1) problems.push(`${ORDER}: line "${m[1]}." should be numbered ${items.length + 1}`);
    seen.add(m[2]);
    items.push({ ref: m[2], repo: ref?.[1], id: ref?.[2], note: m[3] ?? '' });
  }
  return { items, problems };
}

// ---------- backlog parsing ----------
const cells = (line) => line.split(/(?<!\\)\|/).slice(1, -1).map((c) => c.trim());
const plain = (s) =>
  String(s ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
const cell = (s) => plain(s).replaceAll('|', '\\|');
const short = (s, n = 140) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const STATUSES = ['Open', 'Investigate', 'Implemented', 'Verified', 'Blocked', 'Closed'];

function hours(value) {
  const v = plain(value);
  let agent = 0;
  let owner = 0;
  let known = false;
  for (const m of v.matchAll(/(\d+(?:\.\d+)?) h(?: (agent|owner))?/g)) {
    known = true;
    if (m[2] === 'owner') owner += Number(m[1]);
    else agent += Number(m[1]);
  }
  return known ? { agent, owner } : null;
}

// The first table under `start` whose header names every column in `need`, as objects keyed by header.
function table(lines, start, need) {
  for (let i = start; i < lines.length - 1; i++) {
    if (!lines[i].startsWith('|')) continue;
    const head = cells(lines[i]).map(plain);
    if (!need.every((n) => head.includes(n)) || !/^\|[\s:|-]+\|$/.test(lines[i + 1])) continue;
    const rows = [];
    for (let j = i + 2; j < lines.length && lines[j].startsWith('|'); j++)
      rows.push(Object.fromEntries(cells(lines[j]).map((c, k) => [head[k], c])));
    return rows;
  }
  return [];
}

function parseBacklog(markdown, repo) {
  const records = [];
  const heads = [...markdown.matchAll(/^### (?:<a id="[fb]-\d+"><\/a>)?(?:\[(?:✨|🐞) )?([BF]-\d+)(?:\]\(#top\))?\s*$/gm)];
  heads.forEach((h, n) => {
    const end = n + 1 < heads.length ? heads[n + 1].index : markdown.length;
    let block = markdown.slice(h.index, end);
    const cut = block.search(/^## /m);
    if (cut > 0) block = block.slice(0, cut);
    const lines = block.split('\n');
    const title = plain(lines.find((l) => /^\*\*[^*].*\*\*$/.test(l)) ?? '');
    const [row] = table(lines, 0, ['Status', 'Priority']);
    if (!row) return;
    let status = plain(row.Status).replace(/^\S+ /, '');
    if (!STATUSES.includes(status)) status = plain(row.Status);
    const human = /Human action required: (Procedure|Decision|Both|No)/.exec(block)?.[1];
    const procedure = row.Procedures ? row.Procedures !== '—' : human === 'Procedure' || human === 'Both';
    const decision = row.Decisions ? row.Decisions !== '—' : human === 'Decision' || human === 'Both';
    const arrow = lines.find((l) => l.includes('→'));
    const nextRaw = arrow ?? '';
    const next = arrow ? plain(arrow.replace(/^.*?→(\*\*)?/, '').replace(/^\s*(Human action required: \w+\*\*)?/, '')) : '';
    const record = {
      repo,
      id: h[1],
      title,
      status,
      priority: plain(row.Priority).replace(/^\S+ /, '') || '—',
      effort: plain(row.Effort) || '—',
      remaining: row.Remaining ? plain(row.Remaining) : '—',
      hours: row.Remaining ? hours(row.Remaining) : null,
      agent: row.Agent ? plain(row.Agent) : null,
      depends: row['Depends on'] ? plain(row['Depends on']) : '—',
      text: plain(block),
      prose: [
        ...lines.filter((l) => /^\| \*\*(Issue|Reproduce|Check)\*\* \|/.test(l)).map((l) => plain(cells(l)[1])),
        plain(arrow ?? ''),
        ...[...block.matchAll(/<\/a>([BF]-\d+-T\d+ — [^|]*)\|/g)].map((m) => plain(m[1])),
      ].join(' '),
      anchors: [...block.matchAll(/<a id="([fb]-\d+-t\d+)"><\/a>/g)].map((m) => m[1].toUpperCase()),
      procedure,
      decision,
      next,
      nextRaw,
      steps: [],
    };
    const label = lines.findIndex((l) => /^\*\*(Feature steps|Steps)\*\*$/.test(l));
    if (label >= 0)
      for (const s of table(lines, label + 1, ['Step', 'Status'])) {
        const id = /([BF]-\d+-T\d+)/.exec(s.Step)?.[1];
        if (!id) continue; // the Total row
        const who = plain(s.Who ?? '');
        record.steps.push({
          repo,
          id,
          record: record.id,
          title: plain(s.Step).replace(/^[BF]-\d+-T\d+ — /, ''),
          status: plain(s.Status),
          remaining: plain(s.Remaining ?? '—'),
          depends: plain(s['Depends on'] ?? '—'),
          estimate: plain(s.Estimate ?? ''),
          whoRaw: s.Who ?? '',
          who: who || '🤖',
        });
      }
    records.push(record);
  });
  return records;
}

// ---------- sources ----------
async function github(path) {
  const response = await fetch(`https://api.github.com/${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(process.env.GH_TOKEN ? { Authorization: `Bearer ${process.env.GH_TOKEN}` } : {}),
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status} for ${path.split('?')[0]}`);
  return response.json();
}
const git = (cwd, ...a) => execFileSync('git', ['-C', cwd, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

async function readSource(repo) {
  const backlog = repo.backlog ?? 'docs/BACKLOG.md';
  if (repo.id === 'solution') {
    const revision = git(root, 'rev-parse', 'HEAD').trim();
    return { revision, via: 'working checkout', text: readFileSync(resolve(root, backlog), 'utf8') };
  }
  if (has('--remote')) {
    const commit = await github(`repos/${repo.repository}/commits/${encodeURIComponent(repo.ref)}`);
    if (!/^[a-f0-9]{40}$/.test(commit.sha ?? '')) throw new Error('unsupported commit response');
    const file = await github(`repos/${repo.repository}/contents/${backlog}?ref=${commit.sha}`);
    return { revision: commit.sha, via: 'GitHub', text: Buffer.from(file.content, 'base64').toString('utf8') };
  }
  const base = resolve(dirname(manifestPath), repo.path);
  if (!existsSync(base)) throw new Error(`checkout unavailable at ${repo.path}`);
  const origin = git(base, 'remote', 'get-url', 'origin').trim().replace(/\.git$/, '');
  if (!origin.toLowerCase().endsWith(`/${repo.repository.toLowerCase()}`) && !origin.toLowerCase().endsWith(`:${repo.repository.toLowerCase()}`))
    throw new Error('checkout origin does not match the declared repository');
  const revision = git(base, 'rev-parse', repo.ref).trim();
  return { revision, via: 'local checkout, not fetched', text: git(base, 'show', `${revision}:${backlog}`) };
}

// ---------- states ----------
const OPEN = (s) => !['Closed'].includes(s);
function stepState(s) {
  if (/Completed|Closed|Verified|Cancelled/.test(s.status)) return 'Done';
  if (s.who.startsWith('⏳')) return `Waiting on ${s.depends}`;
  if (/🧑‍🔧|🤔|🧑/.test(s.who) && !s.who.includes('🤖')) return s.who.includes('🤔') ? 'Owner: decision' : 'Owner: procedure';
  return 'Ready';
}
function recordState(r) {
  if (r.status === 'Blocked') return `Blocked${r.depends !== '—' ? ` on ${r.depends}` : ''}`;
  if (r.status === 'Verified') return 'Verified, to close';
  if (r.agent !== null) {
    if (r.agent.startsWith('🤖')) return 'Ready';
    if (r.agent.startsWith('⏳')) return `Waiting on ${r.depends}`;
  } else if (!r.procedure && !r.decision) return 'Ready';
  if (r.decision) return 'Owner: decision';
  if (r.procedure) return 'Owner: procedure';
  return 'No agent work';
}

// ---------- gap review ----------
const ID = /\b[BF]-\d+(?:-T\d+)?\b/g;
const OPEN_STEP = (st) => stepState(st) !== 'Done';
function gapReview(sources, order, index, link) {
  const gaps = [];
  const live = sources.filter((s) => s.available);
  const alias = (s) => new RegExp(`\\b${s.repository.split('/')[1].replace(/[-.]/g, '[- ]?')}\\b`, 'i');
  // 1. Cross-repository dependencies with no record on the other side: a sentence that names another component
  // together with a dependency word, and no open record in that component that names this one back.
  const NEED = /\b(wait|waits|waiting|request|requested|need|needs|depend|depends|requires|blocked|backlog|tracked|recorded in|create|move|from that repository)/i;
  for (const a of live.filter((s) => s.id !== 'solution'))
    for (const r of a.records.filter((x) => OPEN(x.status)))
      for (const b of live.filter((s) => s.id !== a.id && s.id !== 'solution')) {
        const sentence = r.prose.split(/(?<=[.;:])\s/).find((t) => alias(b).test(t) && NEED.test(t));
        if (!sentence) continue;
        const counterpart = b.records.find((x) => OPEN(x.status) && (alias(a).test(x.prose) || x.text.includes(`${a.id}:${r.id}`)));
        if (counterpart) continue;
        const coordinated = sources[0].records.find((x) => OPEN(x.status) && x.text.includes(`${a.id}:${r.id}`));
        gaps.push({
          kind: '1 Cross-repository, no counterpart',
          where: link(a, r.id),
          evidence: `"${short(sentence, 150)}" — ${b.id} has no open record that names ${a.id}${coordinated ? ` (coordinated by solution:${coordinated.id})` : ''}`,
          proposal: `${b.id}: a record for what ${a.id}:${r.id} needs from it, or ${a.id}: drop the dependency`,
        });
      }
  // 2. Depends on a record or step that does not exist or is already done.
  for (const a of live) {
    const known = new Set(a.records.flatMap((r) => [r.id, ...r.anchors]));
    const done = new Set(a.records.flatMap((r) => r.steps.filter((st) => !OPEN_STEP(st)).map((st) => st.id)));
    const openIds = new Set(a.records.filter((r) => OPEN(r.status)).flatMap((r) => [r.id, ...r.steps.filter(OPEN_STEP).map((st) => st.id)]));
    const items = a.records.filter((r) => OPEN(r.status)).flatMap((r) => [r, ...r.steps.filter(OPEN_STEP)]);
    for (const it of items)
      for (const dep of it.depends.match(ID) ?? []) {
        if (openIds.has(dep)) continue;
        const why = !known.has(dep) ? 'is not in the active backlog (closed, archived or a wrong ID)' : done.has(dep) ? 'is already done' : 'belongs to a closed record';
        gaps.push({
          kind: '2 Dependency missing or done',
          where: link(a, it.id),
          evidence: `${it.id} depends on ${dep}, which ${why}`,
          proposal: `${a.id}: correct ${it.id}'s prerequisites (remove ${dep} or add the missing step)`,
        });
      }
  }
  // 3. Owner's turn with no copy-paste procedure or decision page.
  for (const a of live)
    for (const r of a.records.filter((x) => OPEN(x.status))) {
      for (const st of r.steps.filter(OPEN_STEP)) {
        const raw = st.whoRaw.trim();
        if (!/🧑‍🔧|🤔|🧑/.test(raw) || raw.startsWith('⏳') || /\]\(/.test(raw)) continue;
        gaps.push({
          kind: '3 Owner check without a page',
          where: link(a, st.id),
          evidence: `${st.id} (${st.status}) is the owner's turn and its Who cell links no procedure (ownerLink missing)`,
          proposal: `${a.id}: write the copy-paste procedure page for ${st.id} and set its ownerLink`,
        });
      }
      if (!r.steps.length && (r.procedure || r.decision) && !/\]\(|`/.test(r.nextRaw))
        gaps.push({
          kind: '3 Owner check without a page',
          where: link(a, r.id),
          evidence: `${r.id} waits on the owner, but its next action links no page and gives no command: "${short(r.next, 100)}"`,
          proposal: `${a.id}: add the exact commands or text to paste, and the expected result, to ${r.id}`,
        });
    }
  // 4. Open records with no next step or no estimate.
  for (const a of live)
    for (const r of a.records.filter((x) => ['Open', 'Investigate'].includes(x.status))) {
      const generated = r.agent !== null;
      const openSteps = r.steps.filter(OPEN_STEP);
      if ((generated && !openSteps.length) || !r.next)
        gaps.push({ kind: '4 No next step', where: link(a, r.id), evidence: `${r.id} is ${r.status} with no ${generated ? 'open step' : 'next action'}${r.next ? `: "${short(r.next, 80)}"` : ''}`, proposal: `${a.id}: add the next step to ${r.id}, or verify and close it` });
      const noEstimate = [r.effort, r.remaining].some((v) => !v || v === '—') && !(r.remaining === '—' && !generated && r.effort && r.effort !== '—');
      const stepsNoEstimate = openSteps.filter((st) => (!st.estimate || st.estimate === '—') && !hours(st.remaining));
      if (noEstimate || stepsNoEstimate.length)
        gaps.push({
          kind: '4 No estimate',
          where: link(a, r.id),
          evidence: noEstimate ? `${r.id} has no effort or remaining estimate` : `steps without an estimate: ${stepsNoEstimate.map((st) => st.id).join(', ')}`,
          proposal: `${a.id}: estimate ${noEstimate ? r.id : stepsNoEstimate.map((st) => st.id).join(', ')}`,
        });
    }
  // 5. Solution order items whose record does not exist.
  for (const o of order.items) {
    const src = sources.find((x) => x.id === o.repo);
    if (src?.available && !index.has(o.ref))
      gaps.push({ kind: '5 Order item missing', where: `[solution order](solution-order.md)`, evidence: `${o.ref} is not in ${o.repo}'s active backlog`, proposal: `solution: remove ${o.ref} from the order, or ${o.repo}: create the record the owner meant` });
  }
  return gaps;
}

// ---------- build ----------
async function build() {
  const order = readOrder();
  const problems = [...order.problems];
  const sources = [];
  const all = [{ id: 'solution', repository: manifest.repository, backlog: manifest.backlog, ref: 'working checkout' }, ...manifest.repositories];
  for (const repo of all) {
    try {
      const src = await readSource(repo);
      const records = parseBacklog(src.text, repo.id);
      const totals = /<!-- totals:start -->\s*\n([\s\S]*?)\n<!-- totals:end -->/.exec(src.text)?.[1] ?? '';
      sources.push({ ...repo, ...src, records, totals: plain(totals), available: true });
    } catch (e) {
      problems.push(`${repo.id}: ${e.message}`);
      sources.push({ ...repo, records: [], available: false });
    }
  }
  const index = new Map();
  for (const s of sources)
    for (const r of s.records) {
      index.set(`${s.id}:${r.id}`, { kind: 'record', item: r, source: s });
      for (const st of r.steps) index.set(`${s.id}:${st.id}`, { kind: 'step', item: st, parent: r, source: s });
    }
  const link = (source, id) => {
    const anchor = id.toLowerCase();
    if (source.id === 'solution') return `[solution:${id}](BACKLOG.md#${anchor})`;
    return `[${source.id}:${id}](https://github.com/${source.repository}/blob/${source.revision}/${source.backlog ?? 'docs/BACKLOG.md'}#${anchor})`;
  };
  const snapshot = new Date().toISOString();
  const out = [
    MARK,
    `# ${manifest.name}: overview`,
    '',
    `Snapshot ${snapshot}, read from the sources below. Status comes from each owning backlog; this page is regenerated, never edited. The [solution order](solution-order.md) is the owner's; everything else follows each repository's own priority. No combined completion percentage.`,
    '',
    '| Source | Revision | Read from | Open records | Open steps |',
    '|---|---|---|---:|---:|',
  ];
  for (const s of sources) {
    const open = s.records.filter((r) => OPEN(r.status));
    const steps = open.flatMap((r) => r.steps).filter((st) => stepState(st) !== 'Done');
    out.push(
      s.available
        ? `| ${s.id} | [${s.revision.slice(0, 12)}](https://github.com/${s.repository}/commit/${s.revision}) | ${s.via} | ${open.length} | ${steps.length} |`
        : `| ${s.id} | Unknown | Unavailable: status unknown | ? | ? |`,
    );
  }

  // Solution order
  out.push('', '## Solution order', '', 'Top = next. Agents take the first item whose state is Ready (▶).', '');
  out.push('| # | Item | Title | Status | Priority | Remaining | State | Note |', '|---:|---|---|---|---|---|---|---|');
  let nextMarked = false;
  order.items.forEach((o, n) => {
    const hit = index.get(o.ref);
    const src = sources.find((s) => s.id === o.repo);
    if (!hit) {
      const why = src && !src.available ? 'Source unavailable' : 'Not in the active backlog (closed or archived?)';
      if (src?.available) problems.push(`${ORDER}: ${o.ref} is not in ${o.repo}'s active backlog; remove it or fix the ID`);
      out.push(`| ${n + 1} | ${o.ref} | — | — | — | — | ${why} | ${cell(o.note)} |`);
      return;
    }
    const it = hit.item;
    const state = hit.kind === 'step' ? stepState(it) : recordState(it);
    const mark = !nextMarked && state === 'Ready' ? '▶ ' : '';
    if (mark) nextMarked = true;
    const prio = hit.kind === 'step' ? hit.parent.priority : it.priority;
    out.push(
      `| ${n + 1} | ${link(hit.source, it.id)} | ${cell(short(it.title, 90))} | ${cell(it.status)} | ${prio} | ${cell(it.remaining)} | ${mark}${cell(state)} | ${cell(o.note)} |`,
    );
  });
  if (!order.items.length) out.push('| — | No items | | | | | | |');

  // Owner
  out.push('', '## Waiting for the owner', '', 'Records and steps whose next move is an owner procedure (🧑‍🔧) or decision (🤔). Open the link for the exact instructions.', '');
  out.push('| Item | Title | Kind | Priority | Owner time | Next |', '|---|---|---|---|---|---|');
  let owners = 0;
  for (const s of sources)
    for (const r of s.records.filter((x) => OPEN(x.status))) {
      const ownerSteps = r.steps.filter((st) => stepState(st).startsWith('Owner'));
      if (!r.procedure && !r.decision && !ownerSteps.length) continue;
      owners++;
      const kind = [r.procedure || ownerSteps.some((st) => stepState(st) === 'Owner: procedure') ? 'Procedure' : '', r.decision || ownerSteps.some((st) => stepState(st) === 'Owner: decision') ? 'Decision' : ''].filter(Boolean).join(' + ');
      const ownerHours = r.hours ? `${r.hours.owner} h` : '—';
      const what = ownerSteps.length ? ownerSteps.map((st) => `${st.id}: ${st.title}`).join('; ') : r.next;
      out.push(`| ${link(s, r.id)} | ${cell(short(r.title, 80))} | ${kind} | ${r.priority} | ${ownerHours} | ${cell(short(what))} |`);
    }
  if (!owners) out.push('| — | Nothing waits for the owner | | | | |');

  // Blocked and waiting
  out.push('', '## Blocked or waiting on a prerequisite', '');
  out.push('| Item | Title | Status | Priority | Waits on |', '|---|---|---|---|---|');
  let waits = 0;
  for (const s of sources)
    for (const r of s.records.filter((x) => OPEN(x.status))) {
      const st = recordState(r);
      if (!/^(Blocked|Waiting)/.test(st)) continue;
      waits++;
      out.push(`| ${link(s, r.id)} | ${cell(short(r.title, 80))} | ${r.status} | ${r.priority} | ${cell(r.depends)} |`);
    }
  if (!waits) out.push('| — | Nothing blocked | | | |');

  // Effort
  out.push('', '## Effort', '', 'Remaining hours as each backlog states them; a backlog that estimates in sizes only shows its sizes. Hours are not summed across repositories that estimate differently.', '');
  out.push('| Source | P1 | P2 | P3 | Other | Remaining (agent / owner) | Sizes | The backlog\'s own total |', '|---|---:|---:|---:|---:|---|---|---|');
  for (const s of sources.filter((x) => x.available)) {
    const open = s.records.filter((r) => OPEN(r.status));
    const count = (p) => open.filter((r) => r.priority === p).length;
    const withHours = open.filter((r) => r.hours);
    const agent = withHours.reduce((a, r) => a + r.hours.agent, 0);
    const owner = withHours.reduce((a, r) => a + r.hours.owner, 0);
    const sizes = Object.entries(open.reduce((a, r) => ({ ...a, [r.effort]: (a[r.effort] ?? 0) + 1 }), {}))
      .map(([k, v]) => `${v} ${k}`)
      .join(', ');
    const other = open.length - count('P1') - count('P2') - count('P3');
    out.push(
      `| ${s.id} | ${count('P1')} | ${count('P2')} | ${count('P3')} | ${other} | ${withHours.length ? `${agent} h / ${owner} h` : '—'} | ${sizes || '—'} | ${cell(short(s.totals, 160)) || '—'} |`,
    );
  }

  // Open work per component
  out.push('', '## Open work by repository', '', 'In each backlog\'s own order (most urgent first). State: Ready = an agent can start now.');
  for (const s of sources) {
    out.push('', `### ${s.id}`, '');
    if (!s.available) {
      out.push('Source unavailable: status unknown.');
      continue;
    }
    const open = s.records.filter((r) => OPEN(r.status));
    if (!open.length) {
      out.push('No open records.');
      continue;
    }
    out.push('| Item | Title | Status | Priority | Effort | Remaining | State | Next |', '|---|---|---|---|---|---|---|---|');
    for (const r of open)
      out.push(
        `| ${link(s, r.id)} | ${cell(short(r.title, 90))} | ${r.status} | ${r.priority} | ${cell(r.effort)} | ${cell(r.remaining)} | ${cell(recordState(r))} | ${cell(short(r.next, 120))} |`,
      );
    const steps = open.flatMap((r) => r.steps).filter((st) => stepState(st) !== 'Done');
    if (steps.length) {
      out.push('', `<details><summary>${steps.length} open steps</summary>`, '', '| Step | Title | Status | Remaining | State |', '|---|---|---|---|---|');
      for (const st of steps)
        out.push(`| ${link(s, st.id)} | ${cell(short(st.title, 100))} | ${cell(st.status)} | ${cell(st.remaining)} | ${cell(stepState(st))} |`);
      out.push('', '</details>');
    }
  }

  // Gap review: proposals only (docs/agents/gap-review.md). Each gap names the repository that would own the fix.
  const gaps = gapReview(sources, order, index, link);
  out.push('', '## Gap review (proposals)', '', 'Possible missing steps, found by reading every backlog. Each row proposes a record or step in the owning repository; nothing is created until the owner accepts it. Procedure: [gap review](agents/gap-review.md).', '');
  out.push('| # | Kind | Found in | Evidence | Proposed, in the owning repository |', '|---:|---|---|---|---|');
  gaps.forEach((g, n) => out.push(`| ${n + 1} | ${g.kind} | ${g.where} | ${cell(short(g.evidence, 280))} | ${cell(g.proposal)} |`));
  if (!gaps.length) out.push('| — | No gaps found | | | |');

  out.push('', '## Source and order problems', '', ...(problems.length ? problems.map((p) => `- ${cell(p)}`) : ['None detected. This checks references and structure, not the truth of the records.']), '');
  return { text: out.join('\n'), problems, snapshot };
}

try {
  if (has('--check')) {
    if (has('--remote') || has('--write')) throw new Error('--check runs offline and writes nothing');
    const { items, problems } = readOrder();
    problems.forEach((p) => console.error(p));
    console.log(`Solution order: ${items.length} item(s); ${problems.length} problem(s).`);
    process.exitCode = problems.length ? 1 : 0;
  } else {
    const { text, problems, snapshot } = await build();
    if (has('--write')) {
      const dest = resolve(root, OUT);
      if (existsSync(dest) && !readFileSync(dest, 'utf8').startsWith(MARK)) throw new Error(`Refusing to replace ${OUT}: not a generated file`);
      writeFileSync(dest, text);
      console.log(`Wrote ${OUT} (${snapshot}); ${problems.length} problem(s).`);
    } else console.log(text);
    problems.forEach((p) => console.error(p));
    if (problems.length) process.exitCode = 1;
  }
} catch (e) {
  console.error(e.message);
  process.exitCode = 1;
}
