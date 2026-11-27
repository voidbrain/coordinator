// F-024-T02: the live index service's command line. `rebuild` builds the cache once; `serve` is the supervised
// process (launchd, Task Scheduler, systemd --user files in service/): it rebuilds at start and every 5 minutes.
// F-024-T03 replaces the timer with the GitHub poller; F-024-T04 adds the MCP read tools.
import { appendFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rebuild, sources } from './live-index.mjs';

const USAGE =
  'Usage: node src/cli.mjs (rebuild | serve) [--data <dir>] [--checkout <coordinator checkout>] [--remote]\n' +
  '  --data      cache and logs folder (default ~/.coordinator-index)\n' +
  '  --checkout  the coordinator checkout whose .solution.json lists the repositories (default this one)\n' +
  '  --remote    read GitHub instead of local checkouts; set GH_TOKEN (node tools/with-gh-token.mjs …)';
const EVERY_MS = 5 * 60 * 1000;

function options(argv) {
  const [command, ...rest] = argv;
  if (command !== 'rebuild' && command !== 'serve') return null;
  const o = {
    command,
    data: join(homedir(), '.coordinator-index'),
    checkout: resolve(fileURLToPath(new URL('..', import.meta.url))),
    remote: false,
  };
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === '--remote') o.remote = true;
    else if ((rest[i] === '--data' || rest[i] === '--checkout') && rest[i + 1] !== undefined)
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
  // A failed rebuild keeps the last good cache and is logged; the next one starts 5 minutes after it ends, never
  // while one is running.
  const run = () =>
    once(o, log)
      .catch((e) => log(`rebuild failed: ${e.message}`))
      .then(() => setTimeout(run, EVERY_MS));
  await run();
}
