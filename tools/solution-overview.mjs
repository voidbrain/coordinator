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
import { readOrder as parseOrder, parseBacklog, plain, cell, short, OPEN, stepState, recordState, gapReview } from './solution-overview-lib.mjs';

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

const stamp = JSON.parse(readFileSync(resolve(root, '.harness.json'), 'utf8'));
const manifestPath = resolve(root, stamp.solution?.manifest ?? '.solution.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const ids = new Set(['solution', ...manifest.repositories.map((r) => r.id)]);

const readOrder = () => parseOrder(readFileSync(resolve(root, ORDER), 'utf8'), ids, ORDER);

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
