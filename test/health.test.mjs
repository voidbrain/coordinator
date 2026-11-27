// F-024-T09: each repository's harness release and newest audit date, read at the commit the builder recorded, shown
// on the screen; missing or unreadable evidence is unknown.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import { healthOf, loadHealth } from '../src/health.mjs';
import { rebuild, sources } from '../src/live-index.mjs';
import { screen } from '../src/screen.mjs';

const env = {
  ...process.env,
  GIT_AUTHOR_NAME: 'Fixture',
  GIT_AUTHOR_EMAIL: 'fixture@example.invalid',
  GIT_COMMITTER_NAME: 'Fixture',
  GIT_COMMITTER_EMAIL: 'fixture@example.invalid',
};
const git = (dir, ...args) => execFileSync('git', ['-C', dir, ...args], { env, encoding: 'utf8' }).trim();
const put = (root, path, content) => {
  mkdirSync(resolve(root, path, '..'), { recursive: true });
  writeFileSync(join(root, path), typeof content === 'string' ? content : JSON.stringify(content));
};
const backlog = '# Invented backlog\n\n## Work items\n';
function repository(root, name, files) {
  for (const [path, content] of Object.entries({ 'docs/BACKLOG.md': backlog, ...files })) put(root, path, content);
  git(root, 'init', '-q', '-b', 'main');
  git(root, 'remote', 'add', 'origin', `https://github.com/example/${name}.git`);
  git(root, 'add', '.');
  git(root, 'commit', '-qm', 'fixture');
}
function solution(t) {
  const root = mkdtempSync(join(tmpdir(), 'health '));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  repository(join(root, 'alpha'), 'alpha', {
    '.harness.json': { version: '10.25.0' },
    'docs/audits/2026-11-20.md': '# old',
    'docs/audits/2026-11-25.audit.json': '{}',
    'docs/audits/2026-11-25.md': '# newest',
    'docs/audits/notes.md': '# not dated',
  });
  repository(join(root, 'beta'), 'beta', { '.harness.json': '{ not json' });
  repository(join(root, 'hub'), 'hub', {
    '.solution.json': {
      schemaVersion: 1,
      id: 'hub',
      repository: 'example/hub',
      backlog: 'docs/BACKLOG.md',
      repositories: [
        { id: 'alpha', repository: 'example/alpha', path: '../alpha', ref: 'main', backlog: 'docs/BACKLOG.md' },
        { id: 'beta', repository: 'example/beta', path: '../beta', ref: 'main', backlog: 'docs/BACKLOG.md' },
        { id: 'gone', repository: 'example/gone', path: '../gone', ref: 'main', backlog: 'docs/BACKLOG.md' },
      ],
    },
  });
  return { root, hub: join(root, 'hub') };
}
const rows = (db) => {
  const d = new DatabaseSync(db, { readOnly: true });
  try {
    return loadHealth(d);
  } finally {
    d.close();
  }
};
const summary = (html) => html.slice(html.indexOf('<h2>Summary'), html.indexOf('<h2>Waiting'));
const row = (html, text) =>
  summary(html)
    .split('<tr')
    .find((r) => r.includes(text)) ?? '';

test('healthOf reads the version and the newest dated audit, none in the future', async () => {
  const files = { '.harness.json': '{"version":"10.25.0"}' };
  const list = async () => ['2026-11-20.md', '2026-11-25.audit.json', '2099-01-01.md', 'notes.md'];
  assert.deepEqual(await healthOf({ read: async (p) => files[p] ?? null, list, today: '2026-11-27' }), {
    harness_version: '10.25.0',
    last_audit: '2026-11-25',
  });
  assert.deepEqual(await healthOf({ read: async () => null, list: async () => [] }), {
    harness_version: null,
    last_audit: null,
  });
  assert.equal((await healthOf({ read: async () => '{ no', list: async () => [] })).harness_version, null);
  assert.equal((await healthOf({ read: async () => '{"version":7}', list: async () => [] })).harness_version, null);
});

test('a rebuild records each repository health at the commit of its backlog rows; missing evidence is null', async (t) => {
  const { root, hub } = solution(t);
  const db = join(root, 'index.sqlite');
  await rebuild(db, sources(hub));
  const d = new DatabaseSync(db, { readOnly: true });
  const commits = Object.fromEntries(
    d
      .prepare('SELECT repo, commit_sha FROM sources')
      .all()
      .map((s) => [s.repo, s.commit_sha]),
  );
  d.close();
  const health = Object.fromEntries(rows(db).map((r) => [r.repo, { ...r }]));
  assert.deepEqual(health.alpha, {
    repo: 'alpha',
    commit_sha: commits.alpha,
    harness_version: '10.25.0',
    last_audit: '2026-11-25',
  });
  assert.deepEqual(health.beta, { repo: 'beta', commit_sha: commits.beta, harness_version: null, last_audit: null });
  assert.deepEqual(health.gone, { repo: 'gone', commit_sha: null, harness_version: null, last_audit: null });
  assert.equal(health.hub.harness_version, null);
});

test('health is read from the committed tree, not the working copy', async (t) => {
  const { root, hub } = solution(t);
  put(join(root, 'alpha'), '.harness.json', { version: '99.0.0' });
  const db = join(root, 'index.sqlite');
  await rebuild(db, sources(hub));
  assert.equal(rows(db).find((r) => r.repo === 'alpha').harness_version, '10.25.0');
});

test('the screen shows harness version and last audit, unknown when missing or from another commit', async (t) => {
  const { root, hub } = solution(t);
  const db = join(root, 'index.sqlite');
  await rebuild(db, sources(hub));
  let html = screen(db, '');
  assert.match(row(html, '>alpha<'), /<td>10\.25\.0<\/td><td>2026-11-25<\/td>/);
  assert.match(row(html, '>beta<'), /<td>unknown<\/td><td>unknown<\/td>/);
  const d = new DatabaseSync(db);
  d.prepare("UPDATE health SET commit_sha = 'stale' WHERE repo = 'alpha'").run();
  d.close();
  html = screen(db, '');
  assert.match(row(html, '>alpha<'), /<td>unknown<\/td><td>unknown<\/td>/);
});

test('a cache from before this change still renders, health unknown', (t) => {
  const { root, hub } = solution(t);
  const db = join(root, 'index.sqlite');
  return rebuild(db, sources(hub)).then(() => {
    const d = new DatabaseSync(db);
    d.exec('DROP TABLE health');
    d.close();
    assert.match(row(screen(db, ''), '>alpha<'), /<td>unknown<\/td><td>unknown<\/td>/);
  });
});
