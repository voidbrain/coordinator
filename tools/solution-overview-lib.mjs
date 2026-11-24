// Project library for tools/solution-overview.mjs (not from the harness template): pure functions that read
// backlog Markdown and the solution order. No file, network or git access here, so tests can run them on fixtures.

export const REF = /^([a-z][a-z0-9-]*):([BF]-\d+(?:-T\d+)?)$/;

// ---------- solution order ----------
export function readOrder(text, ids, ORDER = 'docs/solution-order.md') {
  const problems = [];
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
export const cells = (line) => line.split(/(?<!\\)\|/).slice(1, -1).map((c) => c.trim());
export const plain = (s) =>
  String(s ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
export const cell = (s) => plain(s).replaceAll('|', '\\|');
export const short = (s, n = 140) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
export const STATUSES = ['Open', 'Investigate', 'Implemented', 'Verified', 'Blocked', 'Closed'];

export function hours(value) {
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
export function table(lines, start, need) {
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

// Record headings the readers know: `### F-001` (authored) and `### <a id="f-001"></a>[✨ F-001](#top)` (generated).
const HEADING = /^### (?:<a id="[fb]-\d+"><\/a>)?(?:\[(?:✨|🐞) )?([BF]-\d+)(?:\]\(#top\))?\s*$/;
// Any level-3 heading that names a record ID. One the readers do not know is a problem, never a silent skip:
// an unknown layout must not look like a repository with no work.
const ANY_RECORD_HEADING = /^### .*\b[BF]-\d+\b.*$/gm;

// Records of one backlog. Problems (unknown headings, summary tables or statuses) are appended to `problems`.
export function parseBacklog(markdown, repo, problems = []) {
  const records = [];
  const heads = [...markdown.matchAll(ANY_RECORD_HEADING)];
  heads.forEach((h, n) => {
    const known = HEADING.exec(h[0]);
    if (!known) {
      problems.push(`${repo}: unsupported record heading "${h[0].trim()}" (expected "### F-001"); its record is not shown`);
      return;
    }
    h = [h[0], known[1]];
    h.index = heads[n].index;
    const end = n + 1 < heads.length ? heads[n + 1].index : markdown.length;
    let block = markdown.slice(h.index, end);
    const cut = block.search(/^## /m);
    if (cut > 0) block = block.slice(0, cut);
    const lines = block.split('\n');
    const title = plain(lines.find((l) => /^\*\*[^*].*\*\*$/.test(l)) ?? '');
    const [row] = table(lines, 0, ['Status', 'Priority']);
    if (!row) {
      problems.push(`${repo}:${h[1]}: no summary table with Status and Priority columns; the record is not shown`);
      return;
    }
    let status = plain(row.Status).replace(/^\S+ /, '');
    if (!STATUSES.includes(status)) status = plain(row.Status);
    if (!STATUSES.includes(status)) {
      problems.push(`${repo}:${h[1]}: unknown status "${status}"; the record is not shown`);
      return;
    }
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


// ---------- states ----------
export const OPEN = (s) => !['Closed'].includes(s);
export function stepState(s) {
  if (/Completed|Closed|Verified|Cancelled/.test(s.status)) return 'Done';
  // ⏳ marks a waiting step; a bug's Steps table has no Who column, so an open prerequisite there means waiting too.
  if (s.who.startsWith('⏳') || (!s.whoRaw && s.depends !== '—')) return `Waiting on ${s.depends}`;
  if (/🧑‍🔧|🤔|🧑/.test(s.who) && !s.who.includes('🤖')) return s.who.includes('🤔') ? 'Owner: decision' : 'Owner: procedure';
  return 'Ready';
}
export function recordState(r) {
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
export const ID = /\b[BF]-\d+(?:-T\d+)?\b/g;
export const OPEN_STEP = (st) => stepState(st) !== 'Done';
export function gapReview(sources, order, index, link) {
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


// Text of a GitHub contents API response, or null when it carries no content (files over 1 MB come back without it).
export function contentsText(file) {
  if (file?.encoding !== 'base64' || typeof file.content !== 'string' || !file.content) return null;
  return Buffer.from(file.content, 'base64').toString('utf8');
}

// Self-check for --check: parse each fixture and compare with test/fixtures/expected.json (offline).
export function checkFixtures(read, expected) {
  const failures = [];
  for (const [name, want] of Object.entries(expected)) {
    const problems = [];
    const records = parseBacklog(read(name), 'example', problems);
    const sources = [
      { id: 'solution', repository: 'acme/coordinator', available: true, records: [] },
      { id: 'example', repository: 'acme/example', available: true, records },
      { id: 'widget-lab', repository: 'acme/widget-lab', available: true, records: [] },
    ];
    const got = {
      records: Object.fromEntries(records.map((r) => [r.id, recordState(r)])),
      steps: Object.fromEntries(records.flatMap((r) => r.steps.filter(OPEN_STEP)).map((st) => [st.id, stepState(st)])),
      gaps: gapReview(sources, { items: [] }, new Map(), (s, id) => `${s.id}:${id}`).length,
      problems: problems.length,
    };
    if (JSON.stringify(got) !== JSON.stringify(want))
      failures.push(`${name}: expected ${JSON.stringify(want)}, got ${JSON.stringify(got)}`);
  }
  return failures;
}
