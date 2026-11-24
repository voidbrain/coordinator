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
import {
  readOrder as parseOrder,
  parseBacklog,
  contentsText,
  checkFixtures,
  totalsLine,
  backlogHours,
  solutionTotal,
  runway,
  hours,
  latestRelease,
  harnessStatus,
  auditStatus,
  reviewStatus,
  idleReason,
  cell,
  short,
  OPEN,
  stepState,
  recordState,
  gapReview,
} from './solution-overview-lib.mjs';

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
const MARK =
  '<!-- generated: tools/solution-overview.mjs; edit docs/solution-order.md or the owning backlogs, not this file -->';

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
const git = (cwd, ...a) =>
  execFileSync('git', ['-C', cwd, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

async function readSource(repo) {
  const backlog = repo.backlog ?? 'docs/BACKLOG.md';
  if (repo.id === 'solution') {
    const revision = git(root, 'rev-parse', 'HEAD').trim();
    const dirty = git(root, 'status', '--porcelain').trim() !== '';
    const via = dirty
      ? 'working checkout; local changes present, read as they are (not a committed snapshot)'
      : 'working checkout';
    return { revision, via, text: readFileSync(resolve(root, backlog), 'utf8') };
  }
  if (has('--remote')) {
    const commit = await github(`repos/${repo.repository}/commits/${encodeURIComponent(repo.ref)}`);
    if (!/^[a-f0-9]{40}$/.test(commit.sha ?? '')) throw new Error('unsupported commit response');
    const file = await github(`repos/${repo.repository}/contents/${backlog}?ref=${commit.sha}`);
    // Files over 1 MB come back without content: read the same blob through the Git data API instead.
    let text = contentsText(file);
    if (text === null && /^[a-f0-9]{40}$/.test(file?.sha ?? ''))
      text = contentsText(await github(`repos/${repo.repository}/git/blobs/${file.sha}`));
    if (text === null) throw new Error(`${backlog}: GitHub returned no content (file too large or not a file)`);
    return { revision: commit.sha, via: 'GitHub', text };
  }
  const base = resolve(dirname(manifestPath), repo.path);
  if (!existsSync(base)) throw new Error(`checkout unavailable at ${repo.path}`);
  const origin = git(base, 'remote', 'get-url', 'origin')
    .trim()
    .replace(/\.git$/, '');
  if (
    !origin.toLowerCase().endsWith(`/${repo.repository.toLowerCase()}`) &&
    !origin.toLowerCase().endsWith(`:${repo.repository.toLowerCase()}`)
  )
    throw new Error('checkout origin does not match the declared repository');
  const revision = git(base, 'rev-parse', repo.ref).trim();
  const dirty = git(base, 'status', '--porcelain').trim() !== '';
  const via = `local checkout at ${repo.ref}, not fetched${dirty ? '; local changes present, not read (committed ref only)' : ''}`;
  return { revision, via, text: git(base, 'show', `${revision}:${backlog}`) };
}

// ---------- project facts (harness, audits, reviews) ----------
// Reads files of one source at the revision its backlog was read from: GitHub with --remote, git for a local
// checkout, the file system for this repository. A missing file or folder is empty, never an error.
function fileReader(repo, revision) {
  if (repo.id === 'solution')
    return {
      read: async (path) => (existsSync(resolve(root, path)) ? readFileSync(resolve(root, path), 'utf8') : null),
      list: async (dir) => {
        try {
          return git(root, 'ls-files', '--', dir).trim().split('\n').filter(Boolean);
        } catch {
          return [];
        }
      },
    };
  if (has('--remote'))
    return {
      read: async (path) => {
        try {
          return contentsText(await github(`repos/${repo.repository}/contents/${path}?ref=${revision}`));
        } catch {
          return null;
        }
      },
      list: async (dir) => {
        try {
          const tree = await github(`repos/${repo.repository}/git/trees/${revision}?recursive=1`);
          return (tree.tree ?? []).filter((e) => e.type === 'blob' && e.path.startsWith(`${dir}/`)).map((e) => e.path);
        } catch {
          return [];
        }
      },
    };
  const base = resolve(dirname(manifestPath), repo.path);
  return {
    read: async (path) => {
      try {
        return git(base, 'show', `${revision}:${path}`);
      } catch {
        return null;
      }
    },
    list: async (dir) => {
      try {
        return git(base, 'ls-tree', '-r', '--name-only', revision, '--', dir).trim().split('\n').filter(Boolean);
      } catch {
        return [];
      }
    },
  };
}

async function projectFacts(source, latest, today) {
  const files = fileReader(source, source.revision);
  const stampText = await files.read('.harness.json');
  let harnessStamp = null;
  try {
    harnessStamp = stampText ? JSON.parse(stampText) : null;
  } catch {
    // an unreadable stamp shows as no harness stamp
  }
  const auditFiles = (await files.list('docs/audits'))
    .filter((f) => f.endsWith('.audit.json'))
    .sort()
    .reverse();
  const manifests = [];
  for (const f of auditFiles.slice(0, 3))
    try {
      manifests.push(JSON.parse((await files.read(f)) ?? 'null'));
    } catch {
      // an unreadable manifest is left out; the audit column then shows the newest readable one
    }
  const days = harnessStamp?.audit?.days ?? harnessStamp?.freshness?.auditDays ?? 7;
  return {
    harness: harnessStatus(harnessStamp?.version ?? null, latest),
    audit: auditStatus(manifests, days, today),
    reviews: reviewStatus(harnessStamp?.reviews, await files.list('docs/reviews'), today),
  };
}

async function latestTemplateRelease() {
  try {
    if (has('--remote')) {
      const tags = await github('repos/voidbrain/project-harness/tags?per_page=100');
      return latestRelease(tags.map((t) => t.name));
    }
    const out = execFileSync('git', ['ls-remote', '--tags', stamp.template.repo], { encoding: 'utf8' });
    return latestRelease(out.split('\n').map((l) => l.split('refs/tags/')[1] ?? ''));
  } catch {
    return null;
  }
}

// ---------- build ----------
async function build() {
  const order = readOrder();
  const problems = [...order.problems];
  const sources = [];
  const all = [
    {
      id: 'solution',
      repository: manifest.repository,
      backlog: manifest.backlog,
      ref: 'working checkout',
      emoji: manifest.emoji,
    },
    ...manifest.repositories,
  ];
  const today = new Date().toISOString().slice(0, 10);
  const latest = await latestTemplateRelease();
  if (!latest)
    problems.push('project-harness: the latest template release could not be read; harness status is unknown');
  for (const repo of all) {
    try {
      const src = await readSource(repo);
      const records = parseBacklog(src.text, repo.id, problems);
      const totals = totalsLine(src.text);
      const source = { ...repo, ...src, records, totals, available: true };
      Object.assign(source, await projectFacts(source, latest, today));
      sources.push(source);
    } catch (e) {
      problems.push(`${repo.id}: ${e.message}`);
      sources.push({ ...repo, records: [], available: false });
    }
  }
  const rw = runway(sources);
  const index = new Map();
  for (const s of sources)
    for (const r of s.records) {
      index.set(`${s.id}:${r.id}`, { kind: 'record', item: r, source: s });
      for (const st of r.steps) index.set(`${s.id}:${st.id}`, { kind: 'step', item: st, parent: r, source: s });
    }
  const named = (s) => `${s.emoji ?? ''} ${s.id}`.trim();
  const link = (source, id) => {
    const anchor = id.toLowerCase();
    if (source.id === 'solution') return `[solution:${id}](BACKLOG.md#${anchor})`;
    return `[${source.id}:${id}](https://github.com/${source.repository}/blob/${source.revision}/${source.backlog ?? 'docs/BACKLOG.md'}#${anchor})`;
  };
  const keyLink = (key) => {
    const [repo, id] = key.split(':');
    const s = sources.find((x) => x.id === repo);
    return s?.available ? link(s, id) : key;
  };
  const hoursOf = (hit) => (hit.kind === 'step' ? hours(hit.item.remaining) : (hit.item.hours ?? null));
  const hourRows = sources.map((s) => ({
    id: s.id,
    hours: s.available
      ? backlogHours(s.totals, s.records, problems.filter((p) => p.startsWith(`${s.id}:`)).length)
      : null,
  }));
  const total = solutionTotal(hourRows);
  const atLeast = total.partial ? 'at least ' : '';
  const snapshot = new Date().toISOString();
  const out = [
    MARK,
    `# ${manifest.name}: overview`,
    '',
    `Snapshot ${snapshot}. Status comes from each owning backlog; this page is regenerated, never edited. The [solution order](solution-order.md) is the owner's; everything else follows each repository's own priority. Hours are each project's own estimates, not cross-calibrated; no completion percentage.`,
    '',
    '## Summary',
    '',
    '| Project | Open records | Doable agent h | Owner h | Blocked | Harness | Next audit |',
    '|---|---:|---:|---:|---:|---|---|',
  ];
  for (const s of sources) {
    if (!s.available) {
      out.push(`| ${named(s)} | ? | ? | ? | ? | ? | ? |`);
      continue;
    }
    const row = rw.perRepo.get(s.id);
    const h = hourRows.find((x) => x.id === s.id).hours;
    const doable = `${row.runway}${row.unknownHours.length ? ` + ${row.unknownHours.length} without hours` : ''}`;
    const audit = s.audit ? `${s.audit.next}${s.audit.overdue ? ' (overdue)' : ''}` : 'no audit found';
    out.push(
      `| ${named(s)} | ${s.records.filter((r) => OPEN(r.status)).length} | ${doable} | ${h ? h.owner : 'Unknown'} | ${row.blocked.length} | ${s.harness.text} | ${audit} |`,
    );
  }
  out.push(
    `| **Solution** | ${sources.reduce((a, s) => a + s.records.filter((r) => OPEN(r.status)).length, 0)} | **${rw.total}** | **${atLeast}${total.owner}** | ${[...rw.perRepo.values()].reduce((a, r) => a + r.blocked.length, 0)} | latest v${latest ?? '?'} | |`,
    '',
    `Remaining in all backlogs: ${atLeast}${total.agent} h agent + ${atLeast}${total.owner} h owner. Doable agent h is the runway: agent work whose prerequisites are done or doable, across projects.`,
  );

  // Solution order
  out.push(
    '',
    '## Solution order',
    '',
    'Top = next. Agents take the first item whose state is Ready (▶), after reading its record.',
    '',
  );
  out.push(
    '| # | | Item | Title | Status / state | Agent h | Owner h | Open prerequisites | Note |',
    '|---:|---|---|---|---|---:|---:|---|---|',
  );
  let nextMarked = false;
  order.items.forEach((o, n) => {
    const hit = index.get(o.ref);
    const src = sources.find((s) => s.id === o.repo);
    const emoji = src?.emoji ?? '';
    if (!hit) {
      const why = src && !src.available ? 'Source unavailable' : 'Not in the active backlog (closed or archived?)';
      if (src?.available)
        problems.push(`${ORDER}: ${o.ref} is not in ${o.repo}'s active backlog; remove it or fix the ID`);
      out.push(`| ${n + 1} | ${emoji} | ${o.ref} | — | ${why} | — | — | — | ${cell(o.note)} |`);
      return;
    }
    const it = hit.item;
    let state = hit.kind === 'step' ? stepState(it) : recordState(it);
    // Cross-repository prerequisites (repo:ID) are resolved by the runway; a step that looks Ready inside its own
    // backlog can still wait on another repository.
    const node = rw.state(o.ref);
    if (state === 'Ready' && node && !node.doable)
      state = node.why.startsWith('owner') ? `Waiting on owner ${node.root}` : `Waiting on ${node.root} (${node.why})`;
    const mark = !nextMarked && state === 'Ready' ? '▶ ' : '';
    if (mark) nextMarked = true;
    const h = hoursOf(hit);
    const waits = rw.waits(o.ref);
    const pre = waits.length
      ? waits
          .slice(0, 3)
          .map(([item, dep]) => `${keyLink(item)} waits on ${keyLink(dep)}`)
          .join('; ') + (waits.length > 3 ? `; and ${waits.length - 3} more` : '')
      : '—';
    out.push(
      `| ${n + 1} | ${emoji} | ${link(hit.source, it.id)} | ${cell(short(it.title, 80))} | ${cell(it.status)}: ${mark}${cell(state)} | ${h ? h.agent : '—'} | ${h ? h.owner : '—'} | ${pre.replaceAll('|', '\\|')} | ${cell(o.note)} |`,
    );
  });
  if (!order.items.length) out.push('| — | | No items | | | | | | |');

  // Blocked
  out.push(
    '',
    '## Blocked',
    '',
    'Agent work that cannot start, per project, with the root cause it waits on: an owner step, a prerequisite (in this or another project), an unknown prerequisite, a cycle, or an external wait (Blocked status).',
    '',
    '| Project | Blocked item | Title | Waits on | Kind |',
    '|---|---|---|---|---|',
  );
  let blockedRows = 0;
  for (const s of sources.filter((x) => x.available))
    for (const b of rw.perRepo.get(s.id).blocked) {
      blockedRows++;
      const title = index.get(b.item)?.item.title ?? '';
      const kind = b.kind.startsWith('owner')
        ? b.kind
        : b.kind === 'an unknown prerequisite'
          ? 'unknown prerequisite'
          : b.kind.startsWith('cycle')
            ? b.kind
            : b.kind.startsWith('external')
              ? b.kind
              : `prerequisite: ${b.kind}`;
      out.push(`| ${named(s)} | ${keyLink(b.item)} | ${cell(short(title, 70))} | ${keyLink(b.on)} | ${cell(kind)} |`);
    }
  for (const s of sources.filter((x) => x.available))
    for (const x of rw.perRepo.get(s.id).stops.filter((y) => y.kind.startsWith('external'))) {
      blockedRows++;
      const title = index.get(x.item)?.item.title ?? '';
      out.push(
        `| ${named(s)} | ${keyLink(x.item)} | ${cell(short(title, 70))} | an external event | ${cell(x.kind)} |`,
      );
    }
  if (!blockedRows) out.push('| — | Nothing blocked | | | |');

  // Nothing to do
  out.push(
    '',
    '## Nothing to do',
    '',
    'Projects with no doable agent work, and why.',
    '',
    '| Project | Why |',
    '|---|---|',
  );
  let idle = 0;
  for (const s of sources) {
    const why = idleReason(s, rw.perRepo.get(s.id));
    if (!why) continue;
    idle++;
    out.push(`| ${named(s)} | ${why} |`);
  }
  if (!idle) out.push('| — | Every project has doable agent work |');

  // Owner
  out.push(
    '',
    '## Waiting for the owner',
    '',
    'Records and steps whose next move is an owner procedure (🧑‍🔧) or decision (🤔). Open the link for the exact instructions.',
    '',
  );
  out.push('| Item | Title | Kind | Priority | Owner time | Next |', '|---|---|---|---|---|---|');
  let owners = 0;
  for (const s of sources)
    for (const r of s.records.filter((x) => OPEN(x.status))) {
      const ownerSteps = r.steps.filter((st) => stepState(st).startsWith('Owner'));
      if (!r.procedure && !r.decision && !ownerSteps.length) continue;
      owners++;
      const kind = [
        r.procedure || ownerSteps.some((st) => stepState(st) === 'Owner: procedure') ? 'Procedure' : '',
        r.decision || ownerSteps.some((st) => stepState(st) === 'Owner: decision') ? 'Decision' : '',
      ]
        .filter(Boolean)
        .join(' + ');
      const ownerHours = r.hours ? `${r.hours.owner} h` : '—';
      const what = ownerSteps.length ? ownerSteps.map((st) => `${st.id}: ${st.title}`).join('; ') : r.next;
      out.push(
        `| ${link(s, r.id)} | ${cell(short(r.title, 80))} | ${kind} | ${r.priority} | ${ownerHours} | ${cell(short(what))} |`,
      );
    }
  if (!owners) out.push('| — | Nothing waits for the owner | | | | |');

  // Effort
  // Remaining hours per backlog and the solution total (owner request 2026-11-24): hours only, never a percentage.
  out.push(
    '',
    '## Remaining hours',
    '',
    'Remaining agent and owner (human) hours as each backlog states them, summed across all backlogs. Each project estimates on its own; the estimates are not cross-calibrated, so the total is a sum of estimates, not a forecast. A backlog whose hours cannot be read shows Unknown and makes the total partial (at least).',
    '',
  );
  out.push('| Backlog | Agent h | Owner h | Read from |', '|---|---:|---:|---|');
  for (const r of hourRows)
    out.push(
      r.hours
        ? `| ${named(sources.find((x) => x.id === r.id))} | ${r.hours.agent} | ${r.hours.owner} | ${r.hours.from} |`
        : `| ${named(sources.find((x) => x.id === r.id))} | Unknown | Unknown | no hours in its total line or records |`,
    );
  out.push(
    `| **Solution total** | **${atLeast}${total.agent}** | **${atLeast}${total.owner}** | ${total.partial ? `partial: ${total.unknown.join(', ')} unknown` : 'every backlog'} |`,
  );
  // Agent runway (owner request 2026-11-24): agent hours doable before work reaches a block.
  const runwayRepos = sources.filter((x) => x.available);
  const authoredCount = [...rw.perRepo.values()].reduce((a, r) => a + r.authored, 0);
  out.push(
    '',
    '## Agent runway',
    '',
    `Agent runway before the next owner block: **${rw.total} h**${runwayRepos.some((x) => rw.perRepo.get(x.id).unknownHours.length) ? ' plus doable items without hours' : ''}; then blocked on the items below. A step counts when it is agent work, not done, and every prerequisite is done or itself doable, across repositories (\`repo:ID\` in Depends on, or "depends on repo:ID" in the text). A block is an owner step, a step waiting on one, an unknown prerequisite, a cycle or a Blocked status.${authoredCount ? ` ${authoredCount} item(s) come from authored backlogs without Depends on and count as doable unless their status or human action says otherwise: less certain.` : ''}`,
    '',
    '| Backlog | Runway (agent h) | Doable, no hours | First blocks reached | Owner h to unblock the next layer |',
    '|---|---:|---|---|---:|',
  );
  for (const x of runwayRepos) {
    const r = rw.perRepo.get(x.id);
    const blocks = r.blocks.length
      ? r.blocks.slice(0, 6).join('; ') + (r.blocks.length > 6 ? `; and ${r.blocks.length - 6} more` : '')
      : '—';
    out.push(
      `| ${named(x)} | ${r.runway} | ${r.unknownHours.length ? r.unknownHours.join(', ') : '—'} | ${cell(blocks)} | ${r.ownerUnknown ? `at least ${r.ownerNext}` : r.ownerNext} |`,
    );
  }
  out.push(
    `| **Solution** | **${rw.total}** | | | **${[...rw.perRepo.values()].some((r) => r.ownerUnknown) ? 'at least ' : ''}${Math.round([...rw.perRepo.values()].reduce((a, r) => a + r.ownerNext, 0) * 100) / 100}** |`,
  );
  // Audits and reviews
  out.push(
    '',
    '## Audits and reviews',
    '',
    "Each project's newest audit manifest (`docs/audits/*.audit.json`) and the interval its `.harness.json` sets; periodic reviews configured under `reviews` there.",
    '',
    '| Project | Last audit | Next audit due | Periodic reviews (last → next) |',
    '|---|---|---|---|',
  );
  for (const s of sources.filter((x) => x.available)) {
    const reviews = s.reviews.length
      ? s.reviews
          .map((r) => `${r.name}: ${r.last ?? 'none'} → ${r.next ?? 'due now'}${r.overdue ? ' (overdue)' : ''}`)
          .join('; ')
      : 'none configured';
    out.push(
      `| ${named(s)} | ${s.audit ? `${s.audit.last} (${s.audit.kind})` : 'none found'} | ${s.audit ? `${s.audit.next}${s.audit.overdue ? ' (overdue)' : ''}` : '—'} | ${reviews} |`,
    );
  }

  // Harness
  out.push(
    '',
    '## Harness',
    '',
    `Each project's harness release (\`version\` in its \`.harness.json\`) against the latest template release, v${latest ?? '?'}. A project behind gets a reconcile proposal in the gap review; it becomes a record in that project when the owner accepts it.`,
    '',
    '| Project | Harness | Latest | Status |',
    '|---|---|---|---|',
  );
  for (const s of sources.filter((x) => x.available))
    out.push(
      `| ${named(s)} | ${s.harness.version ? `v${s.harness.version}` : '—'} | ${latest ? `v${latest}` : '?'} | ${s.harness.behind ? 'behind: reconcile proposed' : s.harness.version ? 'current' : 'no harness stamp'} |`,
    );

  out.push(
    '',
    '## Effort',
    '',
    "Open records by priority, the hours as each backlog states them, sizes, and the backlog's own total line.",
    '',
  );
  out.push(
    "| Source | P1 | P2 | P3 | Other | Remaining (agent / owner) | Sizes | The backlog's own total |",
    '|---|---:|---:|---:|---:|---|---|---|',
  );
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
      `| ${named(s)} | ${count('P1')} | ${count('P2')} | ${count('P3')} | ${other} | ${withHours.length ? `${agent} h / ${owner} h` : '—'} | ${sizes || '—'} | ${cell(short(s.totals, 160)) || '—'} |`,
    );
  }

  // Open work per component
  out.push(
    '',
    '## Open work by repository',
    '',
    "In each backlog's own order (most urgent first). State: Ready = an agent can start now.",
  );
  for (const s of sources) {
    out.push('', `### ${named(s)}`, '');
    if (!s.available) {
      out.push('Source unavailable: status unknown.');
      continue;
    }
    const open = s.records.filter((r) => OPEN(r.status));
    if (!open.length) {
      out.push('No open records.');
      continue;
    }
    out.push(
      '| Item | Title | Status | Priority | Effort | Remaining | State | Next |',
      '|---|---|---|---|---|---|---|---|',
    );
    for (const r of open)
      out.push(
        `| ${link(s, r.id)} | ${cell(short(r.title, 90))} | ${r.status} | ${r.priority} | ${cell(r.effort)} | ${cell(r.remaining)} | ${cell(recordState(r))} | ${cell(short(r.next, 120))} |`,
      );
    const steps = open.flatMap((r) => r.steps).filter((st) => stepState(st) !== 'Done');
    if (steps.length) {
      out.push(
        '',
        `<details><summary>${steps.length} open steps</summary>`,
        '',
        '| Step | Title | Status | Remaining | State |',
        '|---|---|---|---|---|',
      );
      for (const st of steps)
        out.push(
          `| ${link(s, st.id)} | ${cell(short(st.title, 100))} | ${cell(st.status)} | ${cell(st.remaining)} | ${cell(stepState(st))} |`,
        );
      out.push('', '</details>');
    }
  }

  // Gap review: proposals only (docs/agents/gap-review.md). Each gap names the repository that would own the fix.
  const gaps = gapReview(sources, order, index, link);
  out.push(
    '',
    '## Gap review (proposals)',
    '',
    'Possible missing steps, found by reading every backlog. Each row proposes a record or step in the owning repository; nothing is created until the owner accepts it. Procedure: [gap review](agents/gap-review.md).',
    '',
  );
  out.push('| # | Kind | Found in | Evidence | Proposed, in the owning repository |', '|---:|---|---|---|---|');
  gaps.forEach((g, n) =>
    out.push(`| ${n + 1} | ${g.kind} | ${g.where} | ${cell(short(g.evidence, 280))} | ${cell(g.proposal)} |`),
  );
  if (!gaps.length) out.push('| — | No gaps found | | | |');

  out.push(
    '',
    '## Sources',
    '',
    '| Source | Revision | Read from | Open records | Open steps |',
    '|---|---|---|---:|---:|',
  );
  for (const s of sources) {
    const open = s.records.filter((r) => OPEN(r.status));
    const steps = open.flatMap((r) => r.steps).filter((st) => stepState(st) !== 'Done');
    out.push(
      s.available
        ? `| ${named(s)} | [${s.revision.slice(0, 12)}](https://github.com/${s.repository}/commit/${s.revision}) | ${s.via} | ${open.length} | ${steps.length} |`
        : `| ${named(s)} | Unknown | Unavailable: status unknown | ? | ? |`,
    );
  }
  out.push(
    '',
    '## Source and order problems',
    '',
    ...(problems.length
      ? problems.map((p) => `- ${cell(p)}`)
      : ['None detected. This checks references and structure, not the truth of the records.']),
    '',
  );
  return { text: out.join('\n'), problems, snapshot };
}

try {
  if (has('--check')) {
    if (has('--remote') || has('--write')) throw new Error('--check runs offline and writes nothing');
    const { items, problems } = readOrder();
    // The readers, states and gap review on the fixtures, so CI notices a reader change that breaks a known layout.
    const fixtures = new URL('../test/fixtures/', import.meta.url);
    const expected = JSON.parse(readFileSync(new URL('expected.json', fixtures), 'utf8'));
    const failures = checkFixtures((name) => readFileSync(new URL(name, fixtures), 'utf8'), expected);
    [...problems, ...failures].forEach((p) => console.error(p));
    console.log(
      `Solution order: ${items.length} item(s); ${problems.length} problem(s). Fixtures: ${Object.keys(expected).length - failures.length} of ${Object.keys(expected).length} checks as expected.`,
    );
    process.exitCode = problems.length || failures.length ? 1 : 0;
  } else {
    const { text, problems, snapshot } = await build();
    if (has('--write')) {
      const dest = resolve(root, OUT);
      if (existsSync(dest) && !readFileSync(dest, 'utf8').startsWith(MARK))
        throw new Error(`Refusing to replace ${OUT}: not a generated file`);
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
