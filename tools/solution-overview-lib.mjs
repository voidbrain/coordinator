// Project library for tools/solution-overview.mjs (not from the harness template): pure functions that read
// backlog Markdown and the solution order. No file, network or git access here, so tests can run them on fixtures.

// This repository's own backlog, as references and labels call it (the template's solution.mjs calls it `solution`).
export const COORDINATOR = 'coordinator';

// An order item the owner placed before its record merged: its note starts with "pending" (for example
// "pending: nerv PR #730"). It shows as pending, not as a missing record, until it lands.
export const isPending = (item) => /^pending\b/i.test(item?.note ?? '');

export const REF = /^([a-z][a-z0-9-]*):([BF]-\d+(?:-T\d+)?)$/;

// ---------- solution order ----------
export function readOrder(text, ids, ORDER = 'docs/solution-order.md') {
  const problems = [];
  const start = text.indexOf('<!-- order:start -->');
  const end = text.indexOf('<!-- order:end -->');
  if (start < 0 || end < start)
    return { items: [], problems: [`${ORDER}: missing <!-- order:start --> / <!-- order:end --> markers`] };
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
    if (Number(m[1]) !== items.length + 1)
      problems.push(`${ORDER}: line "${m[1]}." should be numbered ${items.length + 1}`);
    seen.add(m[2]);
    items.push({ ref: m[2], repo: ref?.[1], id: ref?.[2], note: m[3] ?? '' });
  }
  return { items, problems };
}

// ---------- backlog parsing ----------
export const cells = (line) =>
  line
    .split(/(?<!\\)\|/)
    .slice(1, -1)
    .map((c) => c.trim());
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
      problems.push(
        `${repo}: unsupported record heading "${h[0].trim()}" (expected "### F-001"); its record is not shown`,
      );
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
    const next = arrow
      ? plain(arrow.replace(/^.*?→(\*\*)?/, '').replace(/^\s*(Human action required: \w+\*\*)?/, ''))
      : '';
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
  if (/🧑‍🔧|🤔|🧑/.test(s.who) && !s.who.includes('🤖'))
    return s.who.includes('🤔') ? 'Owner: decision' : 'Owner: procedure';
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
  const NEED =
    /\b(wait|waits|waiting|request|requested|need|needs|depend|depends|requires|blocked|backlog|tracked|recorded in|create|move|from that repository)/i;
  for (const a of live.filter((s) => s.id !== COORDINATOR))
    for (const r of a.records.filter((x) => OPEN(x.status)))
      for (const b of live.filter((s) => s.id !== a.id && s.id !== COORDINATOR)) {
        const sentence = r.prose.split(/(?<=[.;:])\s/).find((t) => alias(b).test(t) && NEED.test(t));
        if (!sentence) continue;
        const counterpart = b.records.find(
          (x) => OPEN(x.status) && (alias(a).test(x.prose) || x.text.includes(`${a.id}:${r.id}`)),
        );
        if (counterpart) continue;
        const coordinated = sources[0].records.find((x) => OPEN(x.status) && x.text.includes(`${a.id}:${r.id}`));
        gaps.push({
          kind: '1 Cross-repository, no counterpart',
          where: link(a, r.id),
          evidence: `"${short(sentence, 150)}" — ${b.id} has no open record that names ${a.id}${coordinated ? ` (coordinated by coordinator:${coordinated.id})` : ''}`,
          proposal: `${b.id}: a record for what ${a.id}:${r.id} needs from it, or ${a.id}: drop the dependency`,
        });
      }
  // 2. Depends on a record or step that does not exist or is already done, in this or another repository (repo:ID).
  const sets = new Map(
    live.map((a) => [
      a.id,
      {
        known: new Set(a.records.flatMap((r) => [r.id, ...r.anchors])),
        done: new Set(a.records.flatMap((r) => r.steps.filter((st) => !OPEN_STEP(st)).map((st) => st.id))),
        open: new Set(
          a.records
            .filter((r) => OPEN(r.status))
            .flatMap((r) => [r.id, ...r.steps.filter(OPEN_STEP).map((st) => st.id)]),
        ),
      },
    ]),
  );
  for (const a of live) {
    const items = a.records.filter((r) => OPEN(r.status)).flatMap((r) => [r, ...r.steps.filter(OPEN_STEP)]);
    for (const it of items)
      for (const key of parseDeps(it.depends, a.id)) {
        const [repo, dep] = key.split(':');
        const set = sets.get(repo);
        if (set?.open.has(dep)) continue;
        const name = repo === a.id ? dep : key;
        const why = !set
          ? `names a repository the manifest does not list or could not read (${repo})`
          : !set.known.has(dep)
            ? `is not in ${repo === a.id ? 'the' : `${repo}'s`} active backlog (closed, archived or a wrong ID)`
            : set.done.has(dep)
              ? 'is already done'
              : 'belongs to a closed record';
        gaps.push({
          kind: '2 Dependency missing or done',
          where: link(a, it.id),
          evidence: `${it.id} depends on ${name}, which ${why}`,
          proposal: `${a.id}: correct ${it.id}'s prerequisites (remove ${name} or add the missing step)`,
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
        gaps.push({
          kind: '4 No next step',
          where: link(a, r.id),
          evidence: `${r.id} is ${r.status} with no ${generated ? 'open step' : 'next action'}${r.next ? `: "${short(r.next, 80)}"` : ''}`,
          proposal: `${a.id}: add the next step to ${r.id}, or verify and close it`,
        });
      const noEstimate =
        [r.effort, r.remaining].some((v) => !v || v === '—') &&
        !(r.remaining === '—' && !generated && r.effort && r.effort !== '—');
      const stepsNoEstimate = openSteps.filter((st) => (!st.estimate || st.estimate === '—') && !hours(st.remaining));
      if (noEstimate || stepsNoEstimate.length)
        gaps.push({
          kind: '4 No estimate',
          where: link(a, r.id),
          evidence: noEstimate
            ? `${r.id} has no effort or remaining estimate`
            : `steps without an estimate: ${stepsNoEstimate.map((st) => st.id).join(', ')}`,
          proposal: `${a.id}: estimate ${noEstimate ? r.id : stepsNoEstimate.map((st) => st.id).join(', ')}`,
        });
    }
  // 6. A project behind the latest harness release: propose its reconcile record (the owner accepts it first).
  for (const a of live)
    if (a.harness?.behind)
      gaps.push({
        kind: '6 Harness behind',
        where: `${a.id} \`.harness.json\``,
        evidence: `${a.id} is on harness v${a.harness.version}; the latest template release is v${a.harness.latest}`,
        proposal: `${a.id}: a record "Reconcile to harness v${a.harness.latest}" (APPLY.md, Reconciling), done in a session of that repository`,
      });
  // 5. Solution order items whose record does not exist.
  for (const o of order.items) {
    const src = sources.find((x) => x.id === o.repo);
    if (src?.available && !index.has(o.ref) && !isPending(o))
      gaps.push({
        kind: '5 Order item missing',
        where: `[solution order](solution-order.md)`,
        evidence: `${o.ref} is not in ${o.repo}'s active backlog`,
        proposal: `coordinator: remove ${o.ref} from the order, or ${o.repo}: create the record the owner meant`,
      });
  }
  return gaps;
}

// Text of a GitHub contents API response, or null when it carries no content (files over 1 MB come back without it).
export function contentsText(file) {
  if (file?.encoding !== 'base64' || typeof file.content !== 'string' || !file.content) return null;
  return Buffer.from(file.content, 'base64').toString('utf8');
}

// ---------- remaining hours ----------
const round = (n) => Math.round(n * 100) / 100;

// The backlog's own total line (between the totals markers), as plain text; '' when it has none.
export function totalsLine(markdown) {
  const m = /<!-- totals:start -->\s*\n([\s\S]*?)\n<!-- totals:end -->/.exec(markdown);
  return m ? plain(m[1]) : '';
}

// Remaining agent and owner hours of one backlog, as it states them: its total line first, else the sum of its open
// records' Remaining cells when every one has hours. null when neither can be read, or when the backlog's records
// could not all be read (problems), so a partial reading never passes for a complete one.
export function backlogHours(totals, records, problemCount = 0) {
  if (problemCount) return null;
  const from = "the backlog's total line";
  if (/no open steps/i.test(totals)) return { agent: 0, owner: 0, from };
  const head = totals.split(/ across /)[0];
  const stated = /Remaining effort/i.test(head) ? hours(head) : null;
  if (stated) return { agent: round(stated.agent), owner: round(stated.owner), from };
  const open = records.filter((r) => OPEN(r.status));
  if (!open.length) return { agent: 0, owner: 0, from: 'no open records' };
  if (!open.every((r) => r.hours)) return null;
  return {
    agent: round(open.reduce((a, r) => a + r.hours.agent, 0)),
    owner: round(open.reduce((a, r) => a + r.hours.owner, 0)),
    from: "its open records' Remaining cells",
  };
}

// Hours summed across backlogs (never a percentage). Unknown backlogs make the sum partial: "at least".
export function solutionTotal(rows) {
  const known = rows.filter((r) => r.hours);
  return {
    agent: round(known.reduce((a, r) => a + r.hours.agent, 0)),
    owner: round(known.reduce((a, r) => a + r.hours.owner, 0)),
    partial: known.length < rows.length,
    unknown: rows.filter((r) => !r.hours).map((r) => r.id),
  };
}

// ---------- agent runway ----------
// Owner request 2026-11-24. A step is doable when it is an agent step, not done, and every prerequisite is done or
// itself doable, transitively and across repositories (`repo:ID` in a Depends on cell names another backlog). A block
// is an owner step, a step waiting on one, an unknown prerequisite, a cycle, or an external wait (status Blocked).
// Depends on cells of the generated ledger list only open prerequisites; done steps are known from their anchors.

const DEP = /(?:\b([a-z][a-z0-9-]*):)?\b([BF]-\d+(?:-T\d+)?)\b/g;
export function parseDeps(text, repo) {
  return [...String(text ?? '').matchAll(DEP)].map((m) => `${m[1] ?? repo}:${m[2]}`);
}
// Fallback until the template has a cross-repository dependsOn: prose that says "depends on repo:ID" or
// "waits on repo:ID" (explicit repository prefix only).
const PROSE_DEP = /\b(?:depends|waits) on ((?:[a-z][a-z0-9-]*:[BF]-\d+(?:-T\d+)?(?:,? (?:and )?)?)+)/gi;
export function proseDeps(text) {
  return [...String(text ?? '').matchAll(PROSE_DEP)].flatMap((m) =>
    [...m[1].matchAll(/([a-z][a-z0-9-]*):([BF]-\d+(?:-T\d+)?)/g)].map((x) => `${x[1]}:${x[2]}`),
  );
}

function nodeKind(status, who) {
  if (/Blocked/i.test(status)) return 'external';
  if (/🧑‍🔧|🤔|🧑/.test(who) && !who.includes('🤖')) return who.includes('🤔') ? 'owner decision' : 'owner procedure';
  return 'agent';
}

export function runway(sources) {
  const nodes = new Map();
  const done = new Set();
  const recordSteps = new Map();
  for (const s of sources.filter((x) => x.available)) {
    for (const r of s.records) {
      const rk = `${s.id}:${r.id}`;
      if (!OPEN(r.status) || r.status === 'Verified') {
        done.add(rk);
        r.anchors.forEach((a) => done.add(`${s.id}:${a}`));
        continue;
      }
      const open = r.steps.filter(OPEN_STEP);
      r.steps.filter((st) => !OPEN_STEP(st)).forEach((st) => done.add(`${s.id}:${st.id}`));
      r.anchors.filter((a) => !open.some((st) => st.id === a)).forEach((a) => done.add(`${s.id}:${a}`));
      if (r.steps.length || r.anchors.length) {
        recordSteps.set(
          rk,
          open.map((st) => `${s.id}:${st.id}`),
        );
        for (const st of open) {
          const h = hours(st.remaining);
          nodes.set(`${s.id}:${st.id}`, {
            key: `${s.id}:${st.id}`,
            repo: s.id,
            id: st.id,
            kind: r.status === 'Blocked' ? 'external (record Blocked)' : nodeKind(st.status, st.who),
            agent: h ? h.agent : null,
            owner: h ? h.owner : 0,
            deps: [...parseDeps(st.depends, s.id), ...proseDeps(st.title)],
          });
        }
      } else {
        // An authored record without steps: one item. Its layout has no Depends on, so it is treated as doable
        // unless its status or human action says otherwise; the figure is less certain for these.
        const who = r.decision ? '🤔' : r.procedure ? '🧑‍🔧' : '🤖';
        nodes.set(rk, {
          key: rk,
          repo: s.id,
          id: r.id,
          kind: r.status === 'Blocked' ? 'external' : nodeKind('', r.agent ?? who),
          agent: r.hours ? r.hours.agent : null,
          owner: r.hours ? r.hours.owner : null,
          deps: [...parseDeps(r.depends, s.id), ...proseDeps(r.prose)],
          authored: r.agent === null,
        });
      }
    }
  }
  const memo = new Map();
  const resolve = (key, stack) => {
    if (done.has(key)) return { ok: true };
    if (memo.has(key)) return memo.get(key);
    if (stack.includes(key)) {
      const ring = [...stack.slice(stack.indexOf(key)), key].map((k) => k.split(':')[1]);
      return { ok: false, root: key, why: 'a dependency cycle', via: key, cycle: ring.join(' → ') };
    }
    const node = nodes.get(key);
    let result;
    if (!node && recordSteps.has(key)) {
      result = { ok: true };
      for (const k of recordSteps.get(key)) {
        const r = resolve(k, [...stack, key]);
        if (!r.ok) {
          result = r;
          break;
        }
      }
    } else if (!node) result = { ok: false, root: key, why: 'an unknown prerequisite', via: key };
    else if (node.kind !== 'agent') result = { ok: false, root: key, why: node.kind, via: key };
    else {
      result = { ok: true };
      for (const dep of node.deps) {
        const r = resolve(dep, [...stack, key]);
        if (!r.ok) {
          result = { ...r, via: dep };
          break;
        }
      }
    }
    if (!stack.length || result.ok || result.why !== 'a dependency cycle') memo.set(key, result);
    return result;
  };
  const perRepo = new Map(
    sources.map((s) => [
      s.id,
      { runway: 0, unknownHours: [], authored: 0, blocks: [], blocked: [], stops: [], ownerNext: 0 },
    ]),
  );
  const ownerRoots = new Set();
  for (const node of nodes.values()) {
    const row = perRepo.get(node.repo);
    const r = resolve(node.key, []);
    // Every agent item that cannot start, with its root cause: the Blocked table.
    // Owner steps and external waits themselves.
    if (node.kind !== 'agent') row.stops.push({ item: node.key, kind: node.kind });
    if (node.kind === 'agent' && !r.ok)
      row.blocked.push({
        item: node.key,
        on: r.root,
        kind: r.why === 'a dependency cycle' ? `cycle ${r.cycle}` : r.why,
      });
    if (node.kind === 'agent' && r.ok) {
      if (node.agent === null) row.unknownHours.push(node.id);
      else row.runway += node.agent;
      if (node.authored) row.authored++;
    } else if (node.kind === 'agent' && r.why === 'a dependency cycle') {
      row.blocks.push(`dependency cycle: ${r.cycle}`);
    } else if (node.kind === 'agent' && r.via === r.root) {
      // The first block this agent work reaches: its own prerequisite is the root cause.
      row.blocks.push(`${node.id} waits on ${r.why.startsWith('owner') ? `owner ${r.root}` : `${r.root} (${r.why})`}`);
      if (r.why.startsWith('owner')) ownerRoots.add(r.root);
    } else if (node.kind !== 'agent' && node.deps.every((d) => resolve(d, [node.key]).ok)) {
      // A block whose own prerequisites are met: the next layer. Owner steps here are the owner's turn now.
      row.blocks.push(
        `${node.id}: ${node.kind}${node.kind.startsWith('owner') ? ` (${node.owner === null ? 'owner time not estimated' : `${node.owner} h owner`})` : ''}`,
      );
      if (node.kind.startsWith('owner')) ownerRoots.add(node.key);
    }
  }
  for (const key of ownerRoots) {
    const node = nodes.get(key);
    if (!node) continue;
    if (node.owner === null) perRepo.get(node.repo).ownerUnknown = true;
    else perRepo.get(node.repo).ownerNext += node.owner;
  }
  for (const row of perRepo.values()) {
    row.runway = round(row.runway);
    row.ownerNext = round(row.ownerNext);
    row.blocks = [...new Set(row.blocks)];
  }
  const total = round([...perRepo.values()].reduce((a, r) => a + r.runway, 0));
  const state = (key) => {
    const node = nodes.get(key);
    if (!node) return null;
    const r = resolve(key, []);
    return { kind: node.kind, doable: node.kind === 'agent' && r.ok, root: r.root, why: r.why };
  };
  // Open prerequisites of an item (a step, or every open step of a record): [itemKey, prerequisiteKey] pairs.
  const waits = (key) => {
    const keys = nodes.has(key) ? [key] : (recordSteps.get(key) ?? []);
    return keys.flatMap((k) => (nodes.get(k)?.deps ?? []).filter((d) => !done.has(d)).map((d) => [k, d]));
  };
  return { perRepo, total, state, waits };
}

// ---------- project facts: harness, audits, reviews, idle reasons ----------
const semver = (v) => (/^v?(\d+)\.(\d+)\.(\d+)$/.exec(String(v ?? '')) ?? []).slice(1).map(Number);
const newer = (a, b) => {
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] > b[i];
  return false;
};
// The highest vX.Y.Z among tag names.
export function latestRelease(tags) {
  const releases = tags.filter((t) => semver(t).length === 3);
  return (
    releases.reduce((best, t) => (!best || newer(semver(t), semver(best)) ? t : best), null)?.replace(/^v/, '') ?? null
  );
}
export function harnessStatus(version, latest) {
  if (!version) return { version: null, latest, behind: false, text: 'no harness stamp' };
  if (!latest || semver(version).length !== 3) return { version, latest, behind: false, text: `v${version}` };
  const behind = newer(semver(latest), semver(version));
  return { version, latest, behind, text: behind ? `v${version}, behind v${latest}` : `v${version} (latest)` };
}
const day = (iso) => String(iso).slice(0, 10);
const addDays = (date, n) => new Date(Date.parse(`${date}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
// Last audit (newest manifest by its reviewed time) and when the next is due, after `days`.
export function auditStatus(manifests, days, today) {
  const dated = manifests
    .filter((m) => m?.reviewed)
    .sort((a, b) => String(b.reviewed).localeCompare(String(a.reviewed)));
  if (!dated.length) return null;
  const last = day(dated[0].reviewed);
  const next = addDays(last, days);
  return { last, kind: dated[0].kind ?? 'audit', next, overdue: next < today };
}
// Periodic reviews configured under reviews.<name>.days, from files docs/reviews/<name>/<date>.md or
// docs/reviews/<date>-<name>.md.
export function reviewStatus(config, files, today) {
  return Object.entries(config ?? {}).map(([name, { days }]) => {
    const dates = files
      .map((f) =>
        new RegExp(`^docs/reviews/(?:${name}/(\\d{4}-\\d{2}-\\d{2})\\.md|(\\d{4}-\\d{2}-\\d{2})-${name}\\.md)$`).exec(
          f,
        ),
      )
      .filter(Boolean)
      .map((m) => m[1] ?? m[2])
      .sort();
    const last = dates.at(-1) ?? null;
    const next = last ? addDays(last, days) : null;
    return { name, last, next, overdue: !last || next < today };
  });
}
// Why a project has no doable agent work, or null when it has some.
export function idleReason(source, row) {
  if (!source.available) return 'backlog unreadable';
  if (!source.records.some((r) => OPEN(r.status))) return 'no open records';
  if (row.runway > 0 || row.unknownHours.length) return null;
  const roots = row.blocked.map((b) => b.on.split(':')[0]);
  if (roots.some((repo) => repo !== source.id)) return 'waiting on another project';
  const kinds = [...row.blocked.map((b) => b.kind), ...row.stops.map((x) => x.kind)];
  if (kinds.length && kinds.every((k) => k.startsWith('owner'))) return 'all waiting on the owner';
  if (kinds.length && kinds.every((k) => k.startsWith('external'))) return 'waiting on an external event (Blocked)';
  return 'everything blocked (see Blocked)';
}

// Self-check for --check: parse each fixture and compare with test/fixtures/expected.json (offline).
export function checkFixtures(read, expected) {
  const failures = [];
  const totals = [];
  for (const [name, want] of Object.entries(expected)) {
    if (name.startsWith('__')) continue;
    const problems = [];
    const markdown = read(name);
    const records = parseBacklog(markdown, 'example', problems);
    const sources = [
      { id: COORDINATOR, repository: 'acme/coordinator', available: true, records: [] },
      { id: 'example', repository: 'acme/example', available: true, records },
      { id: 'widget-lab', repository: 'acme/widget-lab', available: true, records: [] },
    ];
    const got = {
      records: Object.fromEntries(records.map((r) => [r.id, recordState(r)])),
      steps: Object.fromEntries(records.flatMap((r) => r.steps.filter(OPEN_STEP)).map((st) => [st.id, stepState(st)])),
      gaps: gapReview(sources, { items: [] }, new Map(), (s, id) => `${s.id}:${id}`).length,
      problems: problems.length,
      hours: backlogHours(totalsLine(markdown), records, problems.length),
    };
    totals.push({ id: name, hours: got.hours });
    if (got.hours) got.hours = { agent: got.hours.agent, owner: got.hours.owner };
    if (JSON.stringify(got) !== JSON.stringify(want))
      failures.push(`${name}: expected ${JSON.stringify(want)}, got ${JSON.stringify(got)}`);
  }
  if (expected.__runway__) {
    const want = expected.__runway__;
    const sources = Object.entries(want.sources).map(([id, name]) => ({
      id,
      repository: `acme/${id}`,
      available: true,
      records: parseBacklog(read(name), id),
    }));
    const { perRepo, total } = runway(sources);
    const got = { total, blocks: Object.fromEntries([...perRepo].map(([id, r]) => [id, r.blocks.length])) };
    const wanted = { total: want.total, blocks: want.blocks };
    if (JSON.stringify(got) !== JSON.stringify(wanted))
      failures.push(`runway: expected ${JSON.stringify(wanted)}, got ${JSON.stringify(got)}`);
  }
  if (expected.__harness__) {
    const { tags, version, behind } = expected.__harness__;
    const status = harnessStatus(version, latestRelease(tags));
    const gap = gapReview(
      [
        { id: COORDINATOR, repository: 'acme/coordinator', available: true, records: [] },
        { id: 'example', repository: 'acme/example', available: true, records: [], harness: status },
      ],
      { items: [] },
      new Map(),
      (s, id) => `${s.id}:${id}`,
    ).some((g) => g.kind.startsWith('6'));
    if (status.behind !== behind || gap !== behind)
      failures.push(
        `harness: expected behind=${behind} with a reconcile proposal, got behind=${status.behind}, proposal=${gap}`,
      );
  }
  if (expected.__total__) {
    const { agent, owner, partial } = solutionTotal(totals);
    if (JSON.stringify({ agent, owner, partial }) !== JSON.stringify(expected.__total__))
      failures.push(
        `solution total: expected ${JSON.stringify(expected.__total__)}, got ${JSON.stringify({ agent, owner, partial })}`,
      );
  }
  return failures;
}
