// F-024-T03: the GitHub poller. Conditional requests with ETags per repository (main, PRs, CI): a 304 everywhere
// costs no rebuild, a change rebuilds only that repository; the read-only token comes from a file on the base.
/* global Response */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';
import { buildLocal, dump } from '../tools/backlog-index.mjs';
import { rebuild, rebuildOne } from '../src/live-index.mjs';
import { poller, readToken } from '../src/poller.mjs';

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
  const dir = mkdtempSync(join(tmpdir(), 'poller '));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
};
const list = [
  { repo: 'hub', ownerName: 'example/hub', ref: 'main' },
  { repo: 'alpha', ownerName: 'example/alpha', ref: 'main' },
];

// An invented GitHub: each path answers with its current ETag, or 304 when the request names it.
function fakeGitHub() {
  const etags = new Map();
  const requests = [];
  const fetch = async (url, { headers }) => {
    const path = url.replace('https://api.github.com/', '');
    requests.push({ path, headers });
    const tag = etags.get(path) ?? '"v1"';
    if (headers['If-None-Match'] === tag) return new Response(null, { status: 304 });
    return new Response('[]', { status: 200, headers: { ETag: tag } });
  };
  return { fetch, requests, etags };
}

test('the first poll reads main, PRs and CI of every repository and rebuilds each; an unchanged second poll rebuilds none', async () => {
  const gh = fakeGitHub();
  const rebuilt = [];
  const poll = poller({ list, token: 'fixture-token', fetch: gh.fetch, rebuildOne: async (s) => rebuilt.push(s.repo) });
  assert.deepEqual(await poll(), ['hub', 'alpha']);
  assert.deepEqual(
    gh.requests.map((r) => r.path),
    [
      'repos/example/hub/commits/main',
      'repos/example/hub/pulls?state=all&sort=updated&direction=desc&per_page=30',
      'repos/example/hub/actions/runs?per_page=30',
      'repos/example/alpha/commits/main',
      'repos/example/alpha/pulls?state=all&sort=updated&direction=desc&per_page=30',
      'repos/example/alpha/actions/runs?per_page=30',
    ],
  );
  assert.ok(gh.requests.every((r) => r.headers.Authorization === 'Bearer fixture-token'));
  assert.ok(gh.requests.every((r) => !('If-None-Match' in r.headers)));
  gh.requests.length = 0;
  assert.deepEqual(await poll(), []);
  assert.deepEqual(rebuilt, ['hub', 'alpha']);
  assert.ok(gh.requests.every((r) => r.headers['If-None-Match'] === '"v1"'));
});

test('a new commit on one main, or a new CI result, rebuilds only that repository', async () => {
  const gh = fakeGitHub();
  const rebuilt = [];
  const poll = poller({ list, token: 't', fetch: gh.fetch, rebuildOne: async (s) => rebuilt.push(s.repo) });
  await poll();
  rebuilt.length = 0;
  gh.etags.set('repos/example/alpha/commits/main', '"v2"');
  assert.deepEqual(await poll(), ['alpha']);
  gh.etags.set('repos/example/hub/actions/runs?per_page=30', '"v2"');
  assert.deepEqual(await poll(), ['hub']);
  assert.deepEqual(rebuilt, ['alpha', 'hub']);
});

test('a failed rebuild or GitHub error keeps the old ETags, so the next poll tries that repository again', async () => {
  const gh = fakeGitHub();
  const logged = [];
  let fail = true;
  const poll = poller({
    list,
    token: 't',
    fetch: async (url, o) =>
      fail && url.includes('/hub/pulls') ? new Response('', { status: 502 }) : gh.fetch(url, o),
    rebuildOne: async (s) => {
      if (fail && s.repo === 'alpha') throw Error('tarball unreadable');
    },
    log: (line) => logged.push(line),
  });
  assert.deepEqual(await poll(), []);
  assert.deepEqual(logged, [
    'hub: GitHub returned HTTP 502 for repos/example/hub/pulls?state=all&sort=updated&direction=desc&per_page=30',
    'alpha: tarball unreadable',
  ]);
  fail = false;
  assert.deepEqual(await poll(), ['hub', 'alpha']);
});

test('rebuildOne replaces one repository in the cache and keeps the others', async (t) => {
  const root = temp(t);
  const repo = (name, title) => {
    const dir = join(root, name);
    mkdirSync(join(dir, 'docs'), { recursive: true });
    writeFileSync(
      join(dir, 'docs/BACKLOG.md'),
      `# Invented backlog\n\n## Work items\n\n### F-001\n\n**${title}**\n\n| Signal | Priority | Status | Effort |\n|---|---|---|---|\n| 🔴 | 🔺 P1 | Open | 🟢 Small |\n\n💻 **→ Human action required: No**<br />Next: an invented step.\n\n---\n`,
    );
    const git = (...args) => execFileSync('git', ['-C', dir, ...args], { env, encoding: 'utf8' });
    if (title === 'First') {
      git('init', '-q', '-b', 'main');
      git('remote', 'add', 'origin', `https://github.com/example/${name}.git`);
    }
    git('add', '.');
    git('commit', '-qm', title);
    return dir;
  };
  const hub = repo('hub', 'First');
  const alpha = repo('alpha', 'First');
  const db = join(root, 'data', 'index.sqlite');
  await rebuild(db, [
    { repo: 'hub', checkout: hub },
    { repo: 'alpha', checkout: alpha },
  ]);
  const before = JSON.parse(dump(db)).tables;
  repo('alpha', 'Second');
  await rebuildOne(db, (file) => buildLocal(file, 'alpha', alpha));
  const after = JSON.parse(dump(db)).tables;
  assert.deepEqual(
    after.records.map((r) => [r.repo, r.title]),
    [
      ['alpha', 'Second'],
      ['hub', 'First'],
    ],
  );
  assert.deepEqual(
    after.sources.find((s) => s.repo === 'hub'),
    before.sources.find((s) => s.repo === 'hub'),
  );
  assert.deepEqual(
    readdirSync(join(root, 'data')).filter((f) => f.endsWith('.next')),
    [],
  );
});

test('readToken reads the token file; a missing, unreadable or empty file is a clear error', (t) => {
  const root = temp(t);
  const file = join(root, 'github-token');
  assert.throws(() => readToken(file), new RegExp(`no GitHub token in ${file}: .*docs/live-index-install\\.md`));
  writeFileSync(file, '\n');
  assert.throws(() => readToken(file), /no GitHub token in .*: the file is empty/);
  writeFileSync(file, 'github_pat_fixture\n');
  assert.equal(readToken(file), 'github_pat_fixture');
});

test('cli serve without a token file stops with the error; rebuild (local) needs none', (t) => {
  const root = temp(t);
  const data = join(root, 'data');
  const r = spawnSync(process.execPath, [cli, 'serve', '--data', data], { env, encoding: 'utf8' });
  assert.equal(r.status, 1);
  assert.match(r.stderr, new RegExp(`no GitHub token in ${join(data, 'github-token')}`));
  const other = join(root, 'elsewhere', 'token');
  const s = spawnSync(process.execPath, [cli, 'serve', '--data', data, '--token', other], { env, encoding: 'utf8' });
  assert.equal(s.status, 1);
  assert.match(s.stderr, new RegExp(`no GitHub token in ${other}`));
});
