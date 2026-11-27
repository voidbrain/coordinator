// F-024-T02: the live index service's command line. `rebuild` builds the cache once (local checkouts, no token);
// `serve` is the supervised process (launchd, Task Scheduler, systemd --user files in service/). F-024-T03: serve polls
// GitHub every 5 minutes with conditional requests and rebuilds only a repository that changed, with the read-only
// token from a file on the base. F-024-T04 adds the MCP read tools.
import { appendFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRemote } from '../tools/backlog-index.mjs';
import { rebuild, rebuildOne, sources } from './live-index.mjs';
import { poller, readToken } from './poller.mjs';

const USAGE =
  'Usage: node src/cli.mjs (rebuild | serve) [--data <dir>] [--checkout <coordinator checkout>] [--remote] [--token <file>]\n' +
  '  --data      cache and logs folder (default ~/.coordinator-index)\n' +
  '  --checkout  the coordinator checkout whose .solution.json lists the repositories (default this one)\n' +
  '  --remote    rebuild: read GitHub instead of local checkouts; set GH_TOKEN (node tools/with-gh-token.mjs …)\n' +
  '  --token     serve: the read-only GitHub token file (default <data>/github-token)';
const EVERY_MS = 5 * 60 * 1000;

function options(argv) {
  const [command, ...rest] = argv;
  if (command !== 'rebuild' && command !== 'serve') return null;
  const o = {
    command,
    data: join(homedir(), '.coordinator-index'),
    checkout: resolve(fileURLToPath(new URL('..', import.meta.url))),
    remote: false,
    token: null,
  };
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === '--remote') o.remote = true;
    else if (['--data', '--checkout', '--token'].includes(rest[i]) && rest[i + 1] !== undefined)
      o[rest[i].slice(2)] = resolve(rest[++i]);
    else return null;
  }
  return o;
}

async function once(o, log) {
  const list = sources(o.checkout);
  await rebuild(join(o.data, 'index.sqlite'), list, { remote: o.remote });
  log(`rebuilt ${list.length} repositories from ${o.remote ? 'GitHub' : 'local checkouts'}`);
}

const o = options(process.argv.slice(2));
if (!o) {
  console.error(USAGE);
  process.exit(2);
}
if (o.command === 'rebuild') {
  const log = (line) => console.log(`${line} into ${join(o.data, 'index.sqlite')}`);
  await once(o, log).catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  });
} else {
  mkdirSync(join(o.data, 'logs'), { recursive: true });
  const log = (line) => {
    const text = `${new Date().toISOString()} ${line}\n`;
    appendFileSync(join(o.data, 'logs', 'index.log'), text);
    process.stdout.write(text);
  };
  let token;
  try {
    token = readToken(o.token ?? join(o.data, 'github-token'));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
  process.env.GH_TOKEN = token; // the builder's GitHub reads (buildRemote) use it
  const db = join(o.data, 'index.sqlite');
  const poll = poller({
    list: sources(o.checkout),
    token,
    rebuildOne: (s) => rebuildOne(db, (file) => buildRemote(file, s.repo, s.ownerName, s.ref)),
    log,
  });
  // The first poll rebuilds every repository; a failed one keeps the last good cache and is logged. The next poll
  // starts 5 minutes after one ends, never while one is running.
  const run = () =>
    poll()
      .then((rebuilt) => rebuilt.length && log(`rebuilt ${rebuilt.join(', ')} from GitHub`))
      .catch((e) => log(`poll failed: ${e.message}`))
      .then(() => setTimeout(run, EVERY_MS));
  await run();
}
