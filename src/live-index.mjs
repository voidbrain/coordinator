// F-024-T02: the live index's cache, rebuilt whole from git through the harness builder (tools/backlog-index.mjs).
// Git is the only truth: the SQLite file is disposable and the index never writes a record.
import { randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, renameSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { buildLocal, buildRemote } from '../tools/backlog-index.mjs';

// The coordinator and every component in its manifest; checkout paths are relative to the coordinator checkout.
export function sources(checkout) {
  const manifest = JSON.parse(readFileSync(join(checkout, '.solution.json'), 'utf8'));
  return [
    { repo: manifest.id, ownerName: manifest.repository, ref: 'main', checkout },
    ...manifest.repositories.map((r) => ({
      repo: r.id,
      ownerName: r.repository,
      ref: r.ref,
      checkout: resolve(checkout, r.path),
    })),
  ];
}

// Builds every source into a file of its own beside `db`, then moves it over `db`: readers see the old cache or a new
// one, never a half-built one, two rebuilds at once never share a file, and a repository dropped from the manifest
// leaves no rows. Local checkouts by default (their committed HEAD); `remote` reads GitHub at each ref with GH_TOKEN
// or GITHUB_TOKEN.
export async function rebuild(db, list, { remote = false } = {}) {
  const next = `${db}.${randomUUID()}.next`;
  mkdirSync(dirname(db), { recursive: true });
  try {
    for (const s of list)
      if (remote) await buildRemote(next, s.repo, s.ownerName, s.ref);
      else await buildLocal(next, s.repo, s.checkout);
    renameSync(next, db);
  } finally {
    rmSync(next, { force: true });
  }
}
