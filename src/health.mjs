// F-024-T09: each repository's harness release and newest audit date, in a `health` table of the cache beside the
// builder's own tables (the builder's schema has no column for them and is not edited here). Read at the commit the
// builder recorded in `sources`, so the row and the backlog rows come from the same tree; the screen shows a row only
// while its commit is the source's, and anything missing reads as unknown (null), never as current.
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';

const COLUMNS = ['repo', 'commit_sha', 'harness_version', 'last_audit'];
const SHA = /^[a-f0-9]{40}$/;

// The version in `.harness.json` and the newest audit date among docs/audits entries named YYYY-MM-DD…, none in the
// future. `read(path)` answers a file's text or null; `list(dir)` its entry names ([] when absent).
export async function healthOf({ read, list, today = new Date().toISOString().slice(0, 10) }) {
  let version = null;
  try {
    const v = JSON.parse((await read('.harness.json')) ?? 'null')?.version;
    if (typeof v === 'string' && v) version = v;
  } catch {
    // not valid JSON: unknown
  }
  const dates = (await list('docs/audits'))
    .map((f) => /^(\d{4}-\d{2}-\d{2})(?![\d])/.exec(f)?.[1])
    .filter((d) => d && !Number.isNaN(Date.parse(`${d}T00:00:00Z`)) && d <= today)
    .sort();
  return { harness_version: version, last_audit: dates.at(-1) ?? null };
}

const git = (cwd, ...args) =>
  execFileSync('git', ['-C', cwd, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
const missing = (fn) => {
  try {
    return fn();
  } catch {
    return null;
  }
};

export const localReader = (checkout, sha) => ({
  read: async (path) => missing(() => git(checkout, 'show', `${sha}:${path}`)),
  list: async (dir) =>
    missing(() =>
      git(checkout, 'ls-tree', '--name-only', sha, `${dir}/`)
        .split('\n')
        .filter(Boolean)
        .map((f) => f.split('/').pop()),
    ) ?? [],
});

async function contents(ownerName, path, sha) {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com/repos/${ownerName}/contents/${path}?ref=${sha}`, {
    headers: { Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    signal: AbortSignal.timeout(60000),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw Error(`GitHub returned HTTP ${response.status}`);
  return response.json();
}
export const remoteReader = (ownerName, sha) => ({
  read: async (path) => {
    const file = await contents(ownerName, path, sha);
    return file?.content ? Buffer.from(file.content, 'base64').toString('utf8') : null;
  },
  list: async (dir) => ((await contents(ownerName, dir, sha)) ?? []).map((f) => f.name),
});

// Replaces this repository's health row with what its commit says; a repository the builder could not read, or a
// failed read, leaves nulls. `readerFor(sha, ownerName)` gives the reader of that commit. Never throws: the backlog rows are the cache's job, this is additive.
export async function addHealth(db, repo, readerFor) {
  const d = new DatabaseSync(db);
  try {
    d.exec(`CREATE TABLE IF NOT EXISTS health (${COLUMNS.join(', ')})`);
    const s = d.prepare('SELECT owner_name, commit_sha FROM sources WHERE repo = ?').get(repo);
    const sha = SHA.test(s?.commit_sha ?? '') ? s.commit_sha : null;
    let found = { harness_version: null, last_audit: null };
    try {
      if (sha) found = await healthOf(readerFor(sha, s.owner_name));
    } catch {
      // unknown
    }
    d.prepare('DELETE FROM health WHERE repo = ?').run(repo);
    d.prepare(`INSERT INTO health (${COLUMNS.join(', ')}) VALUES (?, ?, ?, ?)`).run(
      repo,
      sha,
      found.harness_version,
      found.last_audit,
    );
  } finally {
    d.close();
  }
}

// The rows, for the screen; an old cache without the table has none.
export function loadHealth(d) {
  try {
    return d.prepare('SELECT * FROM health').all();
  } catch {
    return [];
  }
}
