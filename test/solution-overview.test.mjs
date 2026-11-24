import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  parseBacklog,
  recordState,
  stepState,
  gapReview,
  readOrder,
  totalsLine,
  backlogHours,
  solutionTotal,
  runway,
  proseDeps,
  latestRelease,
  harnessStatus,
  auditStatus,
  reviewStatus,
  idleReason,
  isPending,
} from '../tools/solution-overview-lib.mjs';

const fixture = (name) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');
const parse = (name) => {
  const problems = [];
  return { records: parseBacklog(fixture(name), 'example', problems), problems };
};
const gaps = (records, order = { items: [] }) => {
  const sources = [
    { id: 'coordinator', repository: 'acme/coordinator', available: true, records: [] },
    { id: 'example', repository: 'acme/example', available: true, records },
    { id: 'widget-lab', repository: 'acme/widget-lab', available: true, records: [] },
  ];
  return gapReview(sources, order, new Map(), (s, id) => `${s.id}:${id}`);
};

test('generated ledger: records, steps and states', () => {
  const { records, problems } = parse('generated.md');
  assert.deepEqual(problems, []);
  assert.deepEqual(
    records.map((r) => [r.id, r.status, r.priority, recordState(r)]),
    [
      ['F-001', 'Open', 'P1', 'Ready'],
      ['B-002', 'Open', 'P2', 'Waiting on B-009-T01'],
      ['F-003', 'Open', 'P3', 'No agent work'],
    ],
  );
  assert.deepEqual(
    records[0].steps.map((s) => [s.id, stepState(s)]),
    [
      ['F-001-T02', 'Ready'],
      ['F-001-T03', 'Waiting on F-001-T02'],
      ['F-001-T04', 'Owner: procedure'],
    ],
  );
  assert.deepEqual(records[0].hours, { agent: 3, owner: 0.5 });
  // A bug's Steps table has no Who column: its open prerequisite still makes it wait.
  assert.equal(stepState(records[1].steps[0]), 'Waiting on B-009-T01');
});

test('generated ledger: gap review finds each kind once', () => {
  const found = gaps(parse('generated.md').records).map((g) => `${g.kind.slice(0, 1)} ${g.where}`);
  assert.deepEqual(found, [
    '1 example:F-001',
    '2 example:B-002',
    '2 example:B-002-T01',
    '3 example:F-001-T04',
    '4 example:F-003',
  ]);
});

test('authored four-column layout: human action and status give the state', () => {
  const { records, problems } = parse('authored.md');
  assert.deepEqual(problems, []);
  assert.deepEqual(
    records.map((r) => [r.id, recordState(r)]),
    [
      ['F-001', 'Owner: procedure'],
      ['B-002', 'Ready'],
      ['F-003', 'Owner: decision'],
      ['F-004', 'Blocked'],
    ],
  );
  assert.deepEqual(
    gaps(records).map((g) => `${g.kind.slice(0, 1)} ${g.where}`),
    ['3 example:F-003'],
  );
});

test('empty ledger: no records and no problems', () => {
  const { records, problems } = parse('empty.md');
  assert.deepEqual(records, []);
  assert.deepEqual(problems, []);
});

// Review finding 1 (PR #1): an unknown layout must not look like a repository with no work.
test('a record heading the readers do not know is a problem, not an empty backlog', () => {
  const { records, problems } = parse('unsupported-heading.md');
  assert.equal(records.length, 0);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /B-001/);
});

test('a summary table without Status and Priority columns is a problem, not an empty backlog', () => {
  const { records, problems } = parse('renamed-header.md');
  assert.equal(records.length, 0);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /B-002/);
});

test('solution order: syntax, known repositories, duplicates and numbering', () => {
  const ids = new Set(['coordinator', 'example']);
  const ok = readOrder(
    '<!-- order:start -->\n1. `example:F-001` — first\n2. `example:F-001-T02`\n<!-- order:end -->',
    ids,
  );
  assert.deepEqual(ok.problems, []);
  assert.deepEqual(
    ok.items.map((i) => i.ref),
    ['example:F-001', 'example:F-001-T02'],
  );
  const bad = readOrder(
    '<!-- order:start -->\n1. `other:F-001`\n3. `example:X-1`\n4. `other:F-001`\n<!-- order:end -->',
    ids,
  );
  assert.equal(bad.problems.length, 6);
  // This repository's own records are `coordinator:ID`; `solution` is the template dashboard's internal name only.
  assert.equal(readOrder('<!-- order:start -->\n1. `coordinator:F-002`\n<!-- order:end -->', ids).problems.length, 0);
  assert.equal(readOrder('<!-- order:start -->\n1. `solution:F-002`\n<!-- order:end -->', ids).problems.length, 1); // unknown repo twice, bad ID, duplicate, two numbering slips
});

test('remaining hours per backlog and the solution total; an unreadable total makes the sum partial', () => {
  const read = (name) => {
    const problems = [];
    const markdown = fixture(name);
    const records = parseBacklog(markdown, 'example', problems);
    return backlogHours(totalsLine(markdown), records, problems.length);
  };
  assert.deepEqual(read('generated.md'), { agent: 4, owner: 0.5, from: "the backlog's total line" });
  assert.deepEqual(read('empty.md'), { agent: 0, owner: 0, from: "the backlog's total line" });
  assert.equal(read('unreadable-total.md'), null);
  assert.equal(read('authored.md'), null);
  assert.deepEqual(
    solutionTotal([
      { id: 'a', hours: read('generated.md') },
      { id: 'b', hours: read('empty.md') },
    ]),
    { agent: 4, owner: 0.5, partial: false, unknown: [] },
  );
  assert.deepEqual(
    solutionTotal([
      { id: 'a', hours: read('generated.md') },
      { id: 'c', hours: read('unreadable-total.md') },
    ]),
    { agent: 4, owner: 0.5, partial: true, unknown: ['c'] },
  );
});

test('runway: a cross-repository chain counts its agent steps and stops at the owner step; cycles and missing prerequisites are blocks', () => {
  const load = (id, name) => ({
    id,
    repository: `acme/${id}`,
    available: true,
    records: parseBacklog(fixture(name), id),
  });
  const { perRepo, total, state } = runway([load('alpha', 'runway-alpha.md'), load('beta', 'runway-beta.md')]);
  assert.equal(perRepo.get('alpha').runway, 2); // A
  assert.equal(perRepo.get('beta').runway, 1); // B, after A in the other repository
  assert.equal(total, 3);
  assert.equal(state('beta:F-002-T01').doable, true);
  assert.deepEqual(perRepo.get('beta').blocks, [
    'F-002-T02: owner procedure (0.5 h owner)',
    'F-002-T03 waits on owner beta:F-002-T02',
    'dependency cycle: B-003-T01 → B-003-T02 → B-003-T01',
    'B-003-T03 waits on beta:B-003-T09 (an unknown prerequisite)',
  ]);
  assert.equal(perRepo.get('beta').ownerNext, 0.5);
});

test('cross-repository prerequisites in prose ("depends on repo:ID") are read until the template has a field for them', () => {
  assert.deepEqual(proseDeps('This depends on nerv:F-101-T04 and grover:F-008. It waits on beta:B-1.'), [
    'nerv:F-101-T04',
    'grover:F-008',
    'beta:B-1',
  ]);
});

test('gap review resolves repo:ID prerequisites against the other repository', () => {
  const load = (id, name) => ({
    id,
    repository: `acme/${id}`,
    available: true,
    records: parseBacklog(fixture(name), id),
  });
  const sources = [
    { id: 'coordinator', repository: 'acme/coordinator', available: true, records: [] },
    load('alpha', 'runway-alpha.md'),
    load('beta', 'runway-beta.md'),
  ];
  const found = gapReview(sources, { items: [] }, new Map(), (s, id) => `${s.id}:${id}`).filter((g) =>
    g.kind.startsWith('2'),
  );
  assert.deepEqual(
    found.map((g) => g.evidence),
    ['B-003-T03 depends on B-003-T09, which is not in the active backlog (closed, archived or a wrong ID)'],
  );
});

// Re-review of PR #1, finding 3: the steps of a Blocked record are blocked, however ready they look.
test('runway: steps under a Blocked record are external blocks, not runway', () => {
  const records = parseBacklog(fixture('runway-blocked.md'), 'alpha');
  const { perRepo, total, state } = runway([{ id: 'alpha', repository: 'acme/alpha', available: true, records }]);
  assert.equal(total, 0);
  assert.equal(state('alpha:F-001-T01').doable, false);
  assert.deepEqual(perRepo.get('alpha').blocks, ['F-001-T01: external (record Blocked)']);
});

// Owner requests 2026-11-24: the overview's Blocked, Nothing to do, Audits and Harness tables.
const loadAll = () => {
  const load = (id, name) => ({
    id,
    repository: `acme/${id}`,
    available: true,
    records: parseBacklog(fixture(name), id),
  });
  return [
    load('alpha', 'runway-alpha.md'),
    load('beta', 'runway-beta.md'),
    load('gamma', 'empty.md'),
    load('delta', 'runway-blocked.md'),
    { id: 'omega', repository: 'acme/omega', available: false, records: [] },
  ];
};

test('Blocked table: each blocked agent item with its root cause, and the open prerequisites of an order item', () => {
  const sources = loadAll();
  const { perRepo, waits } = runway(sources);
  assert.deepEqual(perRepo.get('beta').blocked, [
    { item: 'beta:F-002-T03', on: 'beta:F-002-T02', kind: 'owner procedure' },
    { item: 'beta:B-003-T01', on: 'beta:B-003-T01', kind: 'cycle B-003-T01 → B-003-T02 → B-003-T01' },
    { item: 'beta:B-003-T02', on: 'beta:B-003-T01', kind: 'cycle B-003-T01 → B-003-T02 → B-003-T01' },
    { item: 'beta:B-003-T03', on: 'beta:B-003-T09', kind: 'an unknown prerequisite' },
  ]);
  assert.deepEqual(waits('beta:F-002'), [
    ['beta:F-002-T01', 'alpha:F-001-T01'],
    ['beta:F-002-T02', 'beta:F-002-T01'],
    ['beta:F-002-T03', 'beta:F-002-T02'],
  ]);
});

test('Nothing to do table: the reason a project has no doable agent work', () => {
  const sources = loadAll();
  const { perRepo } = runway(sources);
  const why = (id) =>
    idleReason(
      sources.find((s) => s.id === id),
      perRepo.get(id),
    );
  assert.equal(why('alpha'), null);
  assert.equal(why('gamma'), 'no open records');
  assert.equal(why('omega'), 'backlog unreadable');
  assert.equal(why('delta'), 'waiting on an external event (Blocked)');
  // A project whose only agent step waits on another project.
  const waiting = {
    id: 'beta',
    repository: 'acme/beta',
    available: true,
    records: parseBacklog(fixture('runway-beta.md'), 'beta'),
  };
  const lone = runway([{ id: 'alpha', repository: 'acme/alpha', available: true, records: [] }, waiting]);
  assert.equal(idleReason(waiting, lone.perRepo.get('beta')), 'waiting on another project');
});

test('Audits table: last audit and the next due date; periodic reviews from either file layout', () => {
  assert.deepEqual(
    auditStatus(
      [
        { kind: 'scoped', reviewed: '2026-11-20T10:00:00Z' },
        { kind: 'full', reviewed: '2026-11-10T10:00:00Z' },
      ],
      7,
      '2026-11-28',
    ),
    { last: '2026-11-20', kind: 'scoped', next: '2026-11-27', overdue: true },
  );
  assert.equal(auditStatus([], 7, '2026-11-28'), null);
  assert.deepEqual(
    reviewStatus(
      { token: { days: 30 }, skills: { days: 30 } },
      ['docs/reviews/token/2026-11-01.md', 'docs/reviews/2026-11-20-token.md'],
      '2026-11-28',
    ),
    [
      { name: 'token', last: '2026-11-20', next: '2026-12-20', overdue: false },
      { name: 'skills', last: null, next: null, overdue: true },
    ],
  );
});

test('Harness table and gap review: a project behind the latest release gets a reconcile proposal', () => {
  const latest = latestRelease(['v10.7.0', 'v10.10.0', 'v10.9.0', 'not-a-release']);
  assert.equal(latest, '10.10.0');
  assert.deepEqual(harnessStatus('10.9.0', latest), {
    version: '10.9.0',
    latest: '10.10.0',
    behind: true,
    text: 'v10.9.0, behind v10.10.0',
  });
  assert.equal(harnessStatus('10.10.0', latest).behind, false);
  const sources = [
    {
      id: 'coordinator',
      repository: 'acme/coordinator',
      available: true,
      records: [],
      harness: harnessStatus('10.10.0', latest),
    },
    { id: 'alpha', repository: 'acme/alpha', available: true, records: [], harness: harnessStatus('10.9.0', latest) },
  ];
  const found = gapReview(sources, { items: [] }, new Map(), (s, id) => `${s.id}:${id}`).filter((g) =>
    g.kind.startsWith('6'),
  );
  assert.equal(found.length, 1);
  assert.match(found[0].proposal, /^alpha: a record "Reconcile to harness v10\.10\.0"/);
});

// Owner decisions 2026-11-24: items the owner ordered before their record has merged are marked "pending".
test('an order item marked pending is shown but is not a missing-record gap until it lands', () => {
  const sources = [
    { id: 'coordinator', repository: 'acme/coordinator', available: true, records: [] },
    { id: 'example', repository: 'acme/example', available: true, records: [] },
  ];
  const order = readOrder(
    '<!-- order:start -->\n1. `example:F-001` — pending: example PR #1\n2. `example:F-002` — no note of that kind\n<!-- order:end -->',
    new Set(['coordinator', 'example']),
  );
  assert.deepEqual(order.problems, []);
  assert.equal(isPending(order.items[0]), true);
  assert.equal(isPending(order.items[1]), false);
  const missing = gapReview(sources, order, new Map(), (s, id) => `${s.id}:${id}`).filter((g) =>
    g.kind.startsWith('5'),
  );
  assert.deepEqual(
    missing.map((g) => g.evidence),
    ["example:F-002 is not in example's active backlog"],
  );
});
