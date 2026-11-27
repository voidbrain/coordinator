// F-024-T02: the live index's cache, rebuilt whole from git through the harness builder (tools/backlog-index.mjs).
// Git is the only truth: the SQLite file is disposable and the index never writes a record.
import { randomUUID } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { addHealth, localReader, remoteReader } from './health.mjs';
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

// One source's rows and, beside them, its harness release and audit date at the same commit (F-024-T09).
export async function buildOne(file, s, remote) {
  if (remote) await buildRemote(file, s.repo, s.ownerName, s.ref);
  else await buildLocal(file, s.repo, s.checkout);
  await addHealth(file, s.repo, (sha, owner) => (remote ? remoteReader(owner, sha) : localReader(s.checkout, sha)));
}

// Builds every source into a file of its own beside `db`, then moves it over `db`: readers see the old cache or a new
// one, never a half-built one, two rebuilds at once never share a file, and a repository dropped from the manifest
// leaves no rows. Local checkouts by default (their committed HEAD); `remote` reads GitHub at each ref with GH_TOKEN
// or GITHUB_TOKEN.
export async function rebuild(db, list, { remote = false } = {}) {
  const next = `${db}.${randomUUID()}.next`;
  mkdirSync(dirname(db), { recursive: true });
  try {
    for (const s of list) await buildOne(next, s, remote);
    renameSync(next, db);
  } finally {
    rmSync(next, { force: true });
  }
}

// F-024-T03: one repository rebuilt into a copy of the cache, then moved over it: `build(file)` writes that
// repository's rows (the builder replaces only its own), and the other repositories' rows stay as they were.
export async function rebuildOne(db, build) {
  const next = `${db}.${randomUUID()}.next`;
  mkdirSync(dirname(db), { recursive: true });
  try {
    if (existsSync(db)) copyFileSync(db, next);
    await build(next);
    renameSync(next, db);
  } finally {
    rmSync(next, { force: true });
  }
}
