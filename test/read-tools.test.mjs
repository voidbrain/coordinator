// F-024-T04: the live index's MCP read tools on an invented fixture cache: record lookup by `repo:ID`, "waiting on me"
// (owner steps whose turn it is) and "blocked by X" (open items whose prerequisites name X, across repositories), each
// row naming the file and commit it came from; served over streamable HTTP, read-only.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { write } from '../tools/backlog-index.mjs';
import { answer, TOOLS } from '../src/read-tools.mjs';
import { mcpServer } from '../src/mcp.mjs';

const A = 'a'.repeat(40),
  B = 'b'.repeat(40);
const step = (repo, id, status, extra = {}) => ({
  repo,
  id,
  parent: id.slice(0, 5),
  title: `Invented ${id}`,
  status,
  owner_kind: null,
  agent_hours: 1,
  owner_hours: null,
  file: `docs/work/tasks/${id}.json`,
  ...extra,
});
const record = (repo, id, status, archived = 0) => ({
  repo,
  id,
  kind: id[0],
  title: `Invented ${id}`,
  status,
  priority: 'P2',
  effort: 'Small',
  human_action: 'No',
  next: null,
  file: archived ? 'docs/archive/backlog-2026.md' : `docs/work/records/${id}.md`,
  archived,
});
const dep = (repo, item, target) => ({ repo, item, target, file: `docs/work/tasks/${item}.json` });
const source = (repo, sha, layout = 'source-owned') => ({
  repo,
  owner_name: `example/${repo}`,
  ref: 'main',
  commit_sha: sha,
  read_at: repo === 'alpha' ? '2026-11-27T09:00:00.000Z' : '2026-11-27T09:05:00.000Z',
  layout,
});

// Two invented repositories and one GitHub could not read.
function cache(t) {
  const dir = mkdtempSync(join(tmpdir(), 'read tools '));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const db = join(dir, 'index.sqlite');
  write(db, 'alpha', source('alpha', A), {
    records: [record('alpha', 'F-001', 'Open'), record('alpha', 'B-002', 'Closed', 1)],
    steps: [
      step('alpha', 'F-001-T01', 'closed'),
      step('alpha', 'F-001-T02', 'planned', { owner_kind: 'procedure', owner_hours: 0.5, agent_hours: 0 }),
      step('alpha', 'F-001-T03', 'planned', { owner_kind: 'decision', owner_hours: 0.25, agent_hours: 0 }),
      step('alpha', 'F-001-T04', 'verified', { owner_kind: 'procedure', owner_hours: 0.5, agent_hours: 0 }),
    ],
    depends_on: [
      dep('alpha', 'F-001-T02', 'F-001-T01'),
      dep('alpha', 'F-001-T02', 'beta:F-003-T01'),
      dep('alpha', 'F-001-T03', 'F-001-T02'),
      dep('alpha', 'F-001-T04', 'beta:F-003-T02'),
    ],
    prs: [{ repo: 'alpha', item: 'F-001-T01', number: 7, state: 'merged', merged_at: null, ci: 'success', file: 'x' }],
    problems: [],
  });
  write(db, 'beta', source('beta', B), {
    records: [record('beta', 'F-003', 'Open')],
    steps: [step('beta', 'F-003-T01', 'closed'), step('beta', 'F-003-T02', 'planned')],
    depends_on: [dep('beta', 'F-003-T02', 'F-003-T01')],
    prs: [],
    problems: [],
  });
  write(db, 'gamma', source('gamma', null, 'unreadable'), {
    records: [],
    steps: [],
    depends_on: [],
    prs: [],
    problems: [{ repo: 'gamma', file: null, message: 'unreadable repository: HTTP 404' }],
  });
  return db;
}

test('record_lookup finds a record or a step by repo:ID, with its file, commit and link', (t) => {
  const db = cache(t);
  const r = answer(db, 'record_lookup', { ref: 'alpha:F-001' });
  assert.equal(r.version, 1);
  assert.equal(r.snapshot, '2026-11-27T09:00:00.000Z');
  assert.equal(r.item.kind, 'record');
  assert.equal(r.item.title, 'Invented F-001');
  assert.deepEqual(r.item.source, {
    repo: 'alpha',
    file: 'docs/work/records/F-001.md',
    commit: A,
    url: `https://github.com/example/alpha/blob/${A}/docs/work/records/F-001.md`,
  });
  assert.deepEqual(
    r.steps.map((s) => [s.id, s.status]),
    [
      ['F-001-T01', 'closed'],
      ['F-001-T02', 'planned'],
      ['F-001-T03', 'planned'],
      ['F-001-T04', 'verified'],
    ],
  );
  const s = answer(db, 'record_lookup', { ref: 'alpha:F-001-T02' });
  assert.equal(s.item.kind, 'step');
  assert.deepEqual(s.item.dependsOn, ['F-001-T01', 'beta:F-003-T01']);
  assert.equal(s.item.source.file, 'docs/work/tasks/F-001-T02.json');
  assert.deepEqual(answer(db, 'record_lookup', { ref: 'alpha:F-001-T01' }).item.prs, [
    { number: 7, state: 'merged', ci: 'success' },
  ]);
  assert.equal(answer(db, 'record_lookup', { ref: 'alpha:B-002' }).item.archived, true);
  assert.equal(answer(db, 'record_lookup', { ref: 'beta:F-999' }).item, null);
});

test('record_lookup in an unreadable or unknown repository is an error, never "not found"', (t) => {
  const db = cache(t);
  assert.throws(() => answer(db, 'record_lookup', { ref: 'gamma:F-001' }), /gamma is unknown: unreadable repository/);
  assert.throws(() => answer(db, 'record_lookup', { ref: 'delta:F-001' }), /delta is not in the index/);
});

test('waiting_on_me lists open owner steps whose prerequisites are all done, across repositories', (t) => {
  const db = cache(t);
  const r = answer(db, 'waiting_on_me', {});
  // T02's prerequisites (alpha's T01, beta's T01) are closed; T03 waits on T02; T04 is verified.
  assert.deepEqual(
    r.steps.map((s) => [s.repo, s.id, s.ownerKind, s.ownerHours]),
    [['alpha', 'F-001-T02', 'procedure', 0.5]],
  );
  assert.equal(r.steps[0].source.commit, A);
  assert.deepEqual(r.unknown, [{ repo: 'gamma', message: 'unreadable repository: HTTP 404' }]);
});

test('blocked_by lists open items whose prerequisites name X, by bare ID in its repository or repo:ID elsewhere', (t) => {
  const db = cache(t);
  assert.deepEqual(
    answer(db, 'blocked_by', { ref: 'beta:F-003-T01' }).items.map((i) => [i.repo, i.id, i.source.file]),
    [
      ['alpha', 'F-001-T02', 'docs/work/tasks/F-001-T02.json'],
      ['beta', 'F-003-T02', 'docs/work/tasks/F-003-T02.json'],
    ],
  );
  // alpha's F-001-T04 names beta:F-003-T02 but is verified: not blocked.
  assert.deepEqual(answer(db, 'blocked_by', { ref: 'beta:F-003-T02' }).items, []);
  assert.deepEqual(answer(db, 'blocked_by', { ref: 'beta:F-003-T02' }).unknown.length, 1);
});

test('an invalid ref, an unknown tool or extra arguments are refused', (t) => {
  const db = cache(t);
  for (const args of [{}, { ref: 'F-001' }, { ref: 'alpha:f-001' }, { ref: 'Alpha:F-001' }, { ref: 7 }])
    assert.throws(() => answer(db, 'record_lookup', args), /ref must be repo:ID/, JSON.stringify(args));
  assert.throws(() => answer(db, 'waiting_on_me', { ref: 'alpha:F-001' }), /takes no arguments/);
  assert.throws(() => answer(db, 'blocked_by', { ref: 'alpha:F-001', more: 1 }), /unknown argument more/);
  assert.throws(() => answer(db, 'write_record', {}), /unknown tool/);
});

test('without a cache the tools say so, never answer no work', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'read tools '));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  assert.throws(() => answer(join(dir, 'index.sqlite'), 'waiting_on_me', {}), /no cache yet/);
});

// The MCP side: streamable HTTP, JSON answers, on a port of the test's own.
async function server(t, db) {
  const s = mcpServer(db);
  await new Promise((resolve) => s.listen(0, '127.0.0.1', resolve));
  t.after(() => s.close());
  const url = `http://127.0.0.1:${s.address().port}/mcp`;
  let id = 0;
  const post = (body, headers = {}) =>
    fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream', ...headers },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });
  const rpc = async (method, params = {}) => (await post({ jsonrpc: '2.0', id: ++id, method, params })).json();
  return { url, post, rpc };
}

test('MCP: initialize, list read-only tools, call one; the cache file is never written', async (t) => {
  const db = cache(t);
  const before = createHash('sha256').update(readFileSync(db)).digest('hex');
  const { post, rpc } = await server(t, db);
  const init = await rpc('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'x' } });
  assert.equal(init.result.protocolVersion, '2025-06-18');
  assert.deepEqual(init.result.capabilities, { tools: { listChanged: false } });
  assert.equal((await post({ jsonrpc: '2.0', method: 'notifications/initialized' })).status, 202);
  const { tools } = (await rpc('tools/list')).result;
  assert.deepEqual(
    tools.map((x) => x.name),
    ['record_lookup', 'waiting_on_me', 'blocked_by'],
  );
  assert.deepEqual(tools, TOOLS);
  for (const x of tools) assert.deepEqual([x.annotations.readOnlyHint, x.annotations.destructiveHint], [true, false]);
  const call = (await rpc('tools/call', { name: 'waiting_on_me', arguments: {} })).result;
  assert.equal(call.isError, undefined);
  assert.deepEqual(JSON.parse(call.content[0].text), call.structuredContent);
  assert.equal(call.structuredContent.steps[0].id, 'F-001-T02');
  const bad = (await rpc('tools/call', { name: 'record_lookup', arguments: { ref: 'delta:F-001' } })).result;
  assert.equal(bad.isError, true);
  assert.match(bad.content[0].text, /delta is not in the index/);
  assert.equal(createHash('sha256').update(readFileSync(db)).digest('hex'), before);
});

test('MCP: unknown methods and tools are JSON-RPC errors; other HTTP uses and foreign origins are refused', async (t) => {
  const { url, post, rpc } = await server(t, cache(t));
  assert.equal((await rpc('resources/list')).error.code, -32601);
  assert.equal((await rpc('tools/call', { name: 'write_record', arguments: {} })).error.code, -32602);
  assert.equal((await post('{not json')).status, 400);
  assert.equal((await post([{ jsonrpc: '2.0', id: 1, method: 'ping' }])).status, 400);
  assert.equal((await fetch(url)).status, 405);
  assert.equal((await fetch(url.replace('/mcp', '/other'), { method: 'POST' })).status, 404);
  assert.equal((await post({ jsonrpc: '2.0', id: 1, method: 'ping' }, { origin: 'https://evil.example' })).status, 403);
  assert.equal(
    (await post({ jsonrpc: '2.0', id: 1, method: 'ping' }, { origin: 'http://localhost:4200' })).status,
    200,
  );
  assert.equal((await post('x'.repeat(1024 * 1024 + 1))).status, 413);
});
