// F-024-T02: the live index service rebuilds its node:sqlite cache from invented fixture checkouts through the harness
// builder (tools/backlog-index.mjs); the cache is disposable, so deleting it and rebuilding gives the same rows.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';
import { dump } from '../tools/backlog-index.mjs';
import { rebuild, sources } from '../src/live-index.mjs';

const cli = resolve('src/cli.mjs');
const env = {
  ...process.env,
  GIT_AUTHOR_NAME: 'Fixture',
  GIT_AUTHOR_EMAIL: 'fixture@example.invalid',
  GIT_COMMITTER_NAME: 'Fixture',
  GIT_COMMITTER_EMAIL: 'fixture@example.invalid',
  GH_TOKEN: '',
  GITHUB_TOKEN: '',
};
const temp = (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'live index '));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
};
const put = (root, path, content) => {
  mkdirSync(resolve(root, path, '..'), { recursive: true });
  writeFileSync(join(root, path), typeof content === 'string' ? content : JSON.stringify(content, null, 2));
};
const git = (dir, ...args) => execFileSync('git', ['-C', dir, ...args], { env, encoding: 'utf8' }).trim();
function repository(root, name, files) {
  for (const [path, content] of Object.entries(files)) put(root, path, content);
  git(root, 'init', '-q', '-b', 'main');
  git(root, 'remote', 'add', 'origin', `https://github.com/example/${name}.git`);
  git(root, 'add', '.');
  git(root, 'commit', '-qm', 'fixture');
}
const backlog = (id, title, status) =>
  '# Invented backlog\n\n## Work items\n\n' +
  `### ${id}\n\n**${title}**\n\n| Signal | Priority | Status | Effort |\n|---|---|---|---|\n| 🔴 | 🔺 P1 | ${status} | 🟢 Small |\n\n` +
  '💻 **→ Human action required: No**<br />Next: an invented step.\n\n| Field | Value |\n|---|---|\n| PR / evidence | #7 |\n\n---\n';

// An invented solution: the coordinator checkout with its manifest, one component beside it and one missing.
function solution(t) {
  const root = temp(t);
  const hub = join(root, 'hub');
  repository(join(root, 'alpha'), 'alpha', { 'docs/BACKLOG.md': backlog('B-001', 'Invented crash', 'Open') });
  repository(hub, 'hub', {
    '.solution.json': {
      schemaVersion: 1,
      id: 'hub',
      repository: 'example/hub',
      backlog: 'docs/BACKLOG.md',
      repositories: [
        { id: 'alpha', repository: 'example/alpha', path: '../alpha', ref: 'main', backlog: 'docs/BACKLOG.md' },
        { id: 'beta', repository: 'example/beta', path: '../beta', ref: 'main', backlog: 'docs/BACKLOG.md' },
      ],
    },
    'docs/BACKLOG.md': backlog('F-002', 'Invented feature', 'Open'),
  });
  return { root, hub };
}

test('sources lists the coordinator first, then each component checkout from the manifest', (t) => {
  const { root, hub } = solution(t);
  assert.deepEqual(sources(hub), [
    { repo: 'hub', ownerName: 'example/hub', ref: 'main', checkout: hub },
    { repo: 'alpha', ownerName: 'example/alpha', ref: 'main', checkout: join(root, 'alpha') },
    { repo: 'beta', ownerName: 'example/beta', ref: 'main', checkout: join(root, 'beta') },
  ]);
});

test('rebuild reads every checkout into the cache; a missing one is a problem row, never no work', async (t) => {
  const { root, hub } = solution(t);
  const db = join(root, 'data', 'index.sqlite');
  await rebuild(db, sources(hub));
  const { tables } = JSON.parse(dump(db));
  assert.deepEqual(
    tables.records.map((r) => [r.repo, r.id, r.title]),
    [
      ['alpha', 'B-001', 'Invented crash'],
      ['hub', 'F-002', 'Invented feature'],
    ],
  );
  assert.deepEqual(
    tables.sources.map((s) => [s.repo, s.layout]),
    [
      ['alpha', 'authored'],
      ['beta', 'unreadable'],
      ['hub', 'authored'],
    ],
  );
  assert.equal(tables.problems.length, 1);
  assert.match(tables.problems[0].message, /^unreadable repository/);
});

test('deleting the cache and rebuilding gives the same rows', async (t) => {
  const { root, hub } = solution(t);
  const db = join(root, 'index.sqlite');
  await rebuild(db, sources(hub));
  const first = dump(db);
  rmSync(db);
  await rebuild(db, sources(hub));
  assert.equal(dump(db), first);
});

test('a rebuild replaces the cache whole: a component dropped from the manifest leaves no rows', async (t) => {
  const { root, hub } = solution(t);
  const db = join(root, 'index.sqlite');
  await rebuild(db, sources(hub));
  await rebuild(db, sources(hub).slice(0, 1));
  assert.deepEqual(
    JSON.parse(dump(db)).tables.sources.map((s) => s.repo),
    ['hub'],
  );
  assert.deepEqual(
    readdirSync(root).filter((f) => f.endsWith('.next')),
    [],
  );
});

test('two rebuilds at once each publish a whole cache', async (t) => {
  const { root, hub } = solution(t);
  const db = join(root, 'index.sqlite');
  await rebuild(db, sources(hub));
  const whole = dump(db);
  await Promise.all([rebuild(db, sources(hub)), rebuild(db, sources(hub))]);
  assert.equal(dump(db), whole);
  assert.deepEqual(
    readdirSync(root).filter((f) => f.endsWith('.next')),
    [],
  );
});

test('cli rebuild writes index.sqlite in the data folder', (t) => {
  const { root, hub } = solution(t);
  const data = join(root, 'data');
  const r = spawnSync(process.execPath, [cli, 'rebuild', '--data', data, '--checkout', hub], { env, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /3 repositories/);
  assert.deepEqual(
    JSON.parse(dump(join(data, 'index.sqlite'))).tables.records.map((r) => r.id),
    ['B-001', 'F-002'],
  );
});

test('cli refuses an unknown command or option with its usage', () => {
  for (const args of [[], ['start'], ['rebuild', '--data'], ['rebuild', '--colour', 'red'], ['serve', 'x']].concat([
    ['serve', '--port', 'abc'],
    ['serve', '--port', '0'],
    ['serve', '--port', '65536'],
    ['serve', '--port'],
  ])) {
    const r = spawnSync(process.execPath, [cli, ...args], { env, encoding: 'utf8' });
    assert.equal(r.status, 2, args.join(' '));
    assert.match(r.stderr, /^Usage: /);
  }
});
