// F-024-T03: the GitHub poller. Each repository's main, its recently updated PRs and its CI runs are asked with
// conditional requests (If-None-Match): a 304 costs no rebuild and no rate limit, and only a repository with an
// answer that changed is rebuilt. Read-only: GET requests with a read-only token.
import { readFileSync } from 'node:fs';

const paths = (s) => [
  `repos/${s.ownerName}/commits/${encodeURIComponent(s.ref)}`,
  `repos/${s.ownerName}/pulls?state=all&sort=updated&direction=desc&per_page=30`,
  `repos/${s.ownerName}/actions/runs?per_page=30`,
];

// The fine-grained read-only token, from a file on the base (never from git).
export function readToken(file) {
  let token;
  try {
    token = readFileSync(file, 'utf8').trim();
  } catch (e) {
    throw Error(`no GitHub token in ${file}: ${e.code ?? e.message} (create it as docs/live-index-install.md says)`);
  }
  if (!token) throw Error(`no GitHub token in ${file}: the file is empty`);
  return token;
}

// poll() asks every repository in turn and resolves to the ids it rebuilt. A repository's new ETags are kept only once
// its rebuild succeeded, so a GitHub error or a failed rebuild is logged and tried again at the next poll, with the
// last good cache kept meanwhile.
export function poller({ list, token, rebuildOne, fetch = globalThis.fetch, log = () => {} }) {
  const etags = new Map();
  return async function poll() {
    const rebuilt = [];
    for (const s of list)
      try {
        const fresh = new Map();
        for (const path of paths(s)) {
          const headers = { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}` };
          if (etags.has(path)) headers['If-None-Match'] = etags.get(path);
          const response = await fetch(`https://api.github.com/${path}`, {
            headers,
            signal: AbortSignal.timeout(60000),
          });
          if (response.status === 304) continue;
          if (!response.ok) throw Error(`GitHub returned HTTP ${response.status} for ${path}`);
          await response.arrayBuffer();
          fresh.set(path, response.headers.get('etag'));
        }
        if (!fresh.size) continue;
        await rebuildOne(s);
        for (const [path, tag] of fresh) if (tag) etags.set(path, tag);
        rebuilt.push(s.repo);
      } catch (e) {
        log(`${s.repo}: ${e.message}`);
      }
    return rebuilt;
  };
}
