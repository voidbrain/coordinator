// F-024-T05: the live index's screen, rendered from the invented fixture cache with bricks tokens and foundations:
// its snapshot time, sources, per-repository summary, the owner's turn, open work and problems.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { write } from '../tools/backlog-index.mjs';
import { A, cache } from './fixture-cache.mjs';
import { bricksCss, screen } from '../src/screen.mjs';
import { mcpServer } from '../src/mcp.mjs';

const row = (html, text) => html.split('<tr').find((r) => r.includes(text)) ?? '';

test('the screen shows the snapshot time, every source, unreadable ones as unknown, with bricks styles', (t) => {
  const html = screen(cache(t), '/* bricks */');
  assert.match(html, /^<!doctype html>/);
  assert.match(html, /<style>\/\* bricks \*\/<\/style>/);
  assert.match(html, /<body data-bx-theme="base">/);
  assert.match(html, /Snapshot <time datetime="2026-11-27T09:00:00.000Z">2026-11-27 09:00 UTC<\/time>/);
  assert.match(row(html, '>alpha<'), new RegExp(`https://github.com/example/alpha/commit/${A}">aaaaaaaaaaaa<`));
  assert.match(row(html, '>gamma<'), /unknown: unreadable repository: HTTP 404/);
});

test('the summary counts open records and the hours of open steps; an unreadable repository is unknown', (t) => {
  const html = screen(cache(t), '');
  const summary = html.slice(html.indexOf('<h2>Summary'), html.indexOf('<h2>Waiting'));
  // alpha: F-001 open (B-002 archived); owner 0.5 + 0.25 (T04 verified); beta: F-003-T02 1 h agent.
  assert.match(row(summary, '>alpha<'), /<td>1<\/td><td>0<\/td><td>0.75<\/td>/);
  assert.match(row(summary, '>beta<'), /<td>1<\/td><td>1<\/td><td>0<\/td>/);
  assert.match(row(summary, '>gamma<'), /<td>unknown<\/td><td>unknown<\/td><td>unknown<\/td>/);
});

test("the owner's turn and the open work link each item to its file at the commit", (t) => {
  const html = screen(cache(t), '');
  const waiting = html.slice(html.indexOf('<h2>Waiting'), html.indexOf('<h2>Open work'));
  assert.match(
    waiting,
    new RegExp(`href="https://github.com/example/alpha/blob/${A}/docs/work/tasks/F-001-T02.json">alpha:F-001-T02<`),
  );
  assert.doesNotMatch(waiting, /F-001-T03/);
  const open = html.slice(html.indexOf('<h2>Open work'));
  assert.match(open, /alpha:F-001<\/a><\/td><td>Invented F-001<\/td><td>Open<\/td>/);
  assert.doesNotMatch(open, /B-002/);
});

test('text from a backlog is escaped', (t) => {
  const db = cache(t);
  write(
    db,
    'delta',
    { repo: 'delta', owner_name: 'example/delta', ref: 'main', commit_sha: A, read_at: 'x' },
    {
      records: [
        {
          repo: 'delta',
          id: 'F-004',
          kind: 'F',
          title: '<img src=x onerror=alert(1)> & "q"',
          status: 'Open',
          archived: 0,
          file: 'f.md',
        },
      ],
      steps: [],
      depends_on: [],
      prs: [],
      problems: [],
    },
  );
  const html = screen(db, '');
  assert.doesNotMatch(html, /<img/);
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt; &amp; &quot;q&quot;/);
});

test('without a cache the screen says so; without bricks styles it says where it looked', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'screen '));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  assert.match(screen(join(dir, 'index.sqlite'), ''), /no cache yet/);
  assert.equal(bricksCss(dir), null);
  for (const f of ['tokens.css', 'themes/base.css', 'foundations.css']) {
    mkdirSync(join(dir, 'projects/bricks/styles/themes'), { recursive: true });
    writeFileSync(join(dir, 'projects/bricks/styles', f), `/* ${f} */`);
  }
  assert.equal(bricksCss(dir), '/* tokens.css */\n/* themes/base.css */\n/* foundations.css */');
});

test('the server answers the screen at / beside the MCP tools', async (t) => {
  const s = mcpServer(cache(t), () => '<!doctype html><p>screen</p>');
  await new Promise((resolve) => s.listen(0, '127.0.0.1', resolve));
  t.after(() => s.close());
  const r = await fetch(`http://127.0.0.1:${s.address().port}/`);
  assert.equal(r.status, 200);
  assert.match(r.headers.get('content-type'), /^text\/html; charset=utf-8/);
  assert.equal(await r.text(), '<!doctype html><p>screen</p>');
});
