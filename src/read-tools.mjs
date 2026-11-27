// F-024-T04: the live index's read tools, answered from the cache: record lookup by `repo:ID`, "waiting on me" (open
// owner steps whose prerequisites are all done) and "blocked by X" (open items whose prerequisites name X). Each row
// names the file and commit it came from. The cache is opened read-only for one answer and closed at once, so a
// rebuild can move a new cache over it between answers.
import { existsSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

export const VERSION = 1;
const REF = /^([a-z][a-z0-9-]*):([A-Z]+-\d+(?:-T\d+)?)$/;
const DONE_STEPS = new Set(['closed', 'verified', 'completed']);
const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
const ref = {
  type: 'string',
  pattern: REF.source,
  description: 'repository id and record or step id, as in nerv:F-147 or coordinator:F-024-T04',
};

export const TOOLS = [
  {
    name: 'record_lookup',
    description:
      'A record or step by repo:ID: title, status, prerequisites, PRs (a record also lists its steps), with the file and commit it was read from.',
    inputSchema: { type: 'object', properties: { ref }, required: ['ref'], additionalProperties: false },
    annotations: READ_ONLY,
  },
  {
    name: 'waiting_on_me',
    description:
      "The owner's turn: open owner steps (procedure or decision) whose prerequisites are all done, across every repository.",
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    annotations: READ_ONLY,
  },
  {
    name: 'blocked_by',
    description: 'Open records and steps, in any repository, whose prerequisites name repo:ID.',
    inputSchema: { type: 'object', properties: { ref }, required: ['ref'], additionalProperties: false },
    annotations: READ_ONLY,
  },
];

function parse(name, args) {
  const tool = TOOLS.find((t) => t.name === name);
  if (!tool) throw Error(`unknown tool ${name}`);
  const keys = Object.keys(args ?? {});
  if (!tool.inputSchema.required) {
    if (keys.length) throw Error(`${name} takes no arguments`);
    return null;
  }
  const extra = keys.find((k) => k !== 'ref');
  if (extra) throw Error(`unknown argument ${extra}`);
  const m = typeof args.ref === 'string' ? REF.exec(args.ref) : null;
  if (!m) throw Error('ref must be repo:ID, as in nerv:F-147 or coordinator:F-024-T04');
  return { repo: m[1], id: m[2] };
}

// Every row the tools read, in one pass over the small cache.
function load(db) {
  if (!existsSync(db)) throw Error('the live index has no cache yet: it is still building, or serve has not started');
  const d = new DatabaseSync(db, { readOnly: true });
  try {
    const all = (sql) => d.prepare(sql).all();
    return {
      sources: all('SELECT * FROM sources ORDER BY repo'),
      records: all('SELECT * FROM records ORDER BY repo, id'),
      steps: all('SELECT * FROM steps ORDER BY repo, id'),
      depends: all('SELECT * FROM depends_on ORDER BY repo, item, rowid'),
      prs: all('SELECT * FROM prs ORDER BY repo, item, number'),
      problems: all('SELECT * FROM problems ORDER BY repo, rowid'),
    };
  } finally {
    d.close();
  }
}

export function answer(db, name, args) {
  const want = parse(name, args);
  const c = load(db);
  const source = new Map(c.sources.map((s) => [s.repo, s]));
  const unknown = c.sources
    .filter((s) => s.layout === 'unreadable')
    .map((s) => ({ repo: s.repo, message: c.problems.find((p) => p.repo === s.repo)?.message ?? 'unreadable' }));
  const from = (row) => {
    const s = source.get(row.repo);
    const url =
      s?.owner_name && s.commit_sha && row.file
        ? `https://github.com/${s.owner_name}/blob/${s.commit_sha}/${row.file}`
        : null;
    return { repo: row.repo, file: row.file, commit: s?.commit_sha ?? null, url };
  };
  const key = (repo, target) => (target.includes(':') ? target : `${repo}:${target}`);
  const dependsOn = (row) => c.depends.filter((d) => d.repo === row.repo && d.item === row.id).map((d) => d.target);
  const prs = (row) =>
    c.prs
      .filter((p) => p.repo === row.repo && p.item === row.id)
      .map((p) => ({ number: p.number, state: p.state, ci: p.ci }));
  const stepOut = (s) => ({
    kind: 'step',
    repo: s.repo,
    id: s.id,
    parent: s.parent,
    title: s.title,
    status: s.status,
    ownerKind: s.owner_kind,
    agentHours: s.agent_hours,
    ownerHours: s.owner_hours,
    dependsOn: dependsOn(s),
    prs: prs(s),
    source: from(s),
  });
  const recordOut = (r) => ({
    kind: 'record',
    repo: r.repo,
    id: r.id,
    title: r.title,
    status: r.status,
    priority: r.priority,
    humanAction: r.human_action,
    next: r.next,
    archived: r.archived === 1,
    dependsOn: dependsOn(r),
    prs: prs(r),
    source: from(r),
  });
  const steps = new Map(c.steps.map((s) => [`${s.repo}:${s.id}`, s]));
  const records = new Map(c.records.map((r) => [`${r.repo}:${r.id}`, r]));
  const done = (k) => {
    const s = steps.get(k),
      r = records.get(k);
    if (s) return DONE_STEPS.has(s.status.toLowerCase());
    return r ? r.archived === 1 || r.status === 'Closed' : false;
  };
  const head = {
    version: VERSION,
    snapshot: c.sources.map((s) => s.read_at).sort()[0] ?? null,
    unknown,
  };

  if (name === 'record_lookup') {
    const s = source.get(want.repo);
    if (!s) throw Error(`${want.repo} is not in the index`);
    const bad = unknown.find((u) => u.repo === want.repo);
    if (bad) throw Error(`${want.repo} is unknown: ${bad.message}`);
    const k = `${want.repo}:${want.id}`;
    const item = steps.has(k) ? stepOut(steps.get(k)) : records.has(k) ? recordOut(records.get(k)) : null;
    const children =
      item?.kind === 'record' ? c.steps.filter((x) => x.repo === want.repo && x.parent === want.id).map(stepOut) : [];
    return { ...head, ref: k, item, steps: children };
  }
  if (name === 'waiting_on_me') {
    const turn = c.steps.filter(
      (s) => s.owner_kind && !done(`${s.repo}:${s.id}`) && dependsOn(s).every((t) => done(key(s.repo, t))),
    );
    return { ...head, steps: turn.map(stepOut) };
  }
  const x = `${want.repo}:${want.id}`;
  const items = [];
  for (const d of c.depends) {
    const k = `${d.repo}:${d.item}`;
    if (key(d.repo, d.target) !== x || done(k) || items.some((i) => `${i.repo}:${i.id}` === k)) continue;
    if (steps.has(k)) items.push(stepOut(steps.get(k)));
    else if (records.has(k)) items.push(recordOut(records.get(k)));
  }
  return { ...head, ref: x, items };
}
