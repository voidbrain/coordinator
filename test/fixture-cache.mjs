// F-024-T04: an invented live index cache for the read tools and the screen: two repositories and one GitHub could
// not read.
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { write } from '../tools/backlog-index.mjs';

export const A = 'a'.repeat(40),
  B = 'b'.repeat(40);
const step = (repo, id, status, extra = {}) => ({
  repo,
  id,
  parent: id.slice(0, 5),
  title: `Invented ${id}`,
  status,
  owner_kind: null,
  agent_hours: 1,
  owner_hours: null,
  file: `docs/work/tasks/${id}.json`,
  ...extra,
});
const record = (repo, id, status, archived = 0) => ({
  repo,
  id,
  kind: id[0],
  title: `Invented ${id}`,
  status,
  priority: 'P2',
  effort: 'Small',
  human_action: 'No',
  next: null,
  file: archived ? 'docs/archive/backlog-2026.md' : `docs/work/records/${id}.md`,
  archived,
});
const dep = (repo, item, target) => ({ repo, item, target, file: `docs/work/tasks/${item}.json` });
const source = (repo, sha, layout = 'source-owned') => ({
  repo,
  owner_name: `example/${repo}`,
  ref: 'main',
  commit_sha: sha,
  read_at: repo === 'alpha' ? '2026-11-27T09:00:00.000Z' : '2026-11-27T09:05:00.000Z',
  layout,
});

// Two invented repositories and one GitHub could not read.
export function cache(t) {
  const dir = mkdtempSync(join(tmpdir(), 'read tools '));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const db = join(dir, 'index.sqlite');
  write(db, 'alpha', source('alpha', A), {
    records: [record('alpha', 'F-001', 'Open'), record('alpha', 'B-002', 'Closed', 1)],
    steps: [
      step('alpha', 'F-001-T01', 'closed'),
      step('alpha', 'F-001-T02', 'planned', { owner_kind: 'procedure', owner_hours: 0.5, agent_hours: 0 }),
      step('alpha', 'F-001-T03', 'planned', { owner_kind: 'decision', owner_hours: 0.25, agent_hours: 0 }),
      step('alpha', 'F-001-T04', 'verified', { owner_kind: 'procedure', owner_hours: 0.5, agent_hours: 0 }),
    ],
    depends_on: [
      dep('alpha', 'F-001-T02', 'F-001-T01'),
      dep('alpha', 'F-001-T02', 'beta:F-003-T01'),
      dep('alpha', 'F-001-T03', 'F-001-T02'),
      dep('alpha', 'F-001-T04', 'beta:F-003-T02'),
    ],
    prs: [{ repo: 'alpha', item: 'F-001-T01', number: 7, state: 'merged', merged_at: null, ci: 'success', file: 'x' }],
    problems: [],
  });
  write(db, 'beta', source('beta', B), {
    records: [record('beta', 'F-003', 'Open')],
    steps: [step('beta', 'F-003-T01', 'closed'), step('beta', 'F-003-T02', 'planned')],
    depends_on: [dep('beta', 'F-003-T02', 'F-003-T01')],
    prs: [],
    problems: [],
  });
  write(db, 'gamma', source('gamma', null, 'unreadable'), {
    records: [],
    steps: [],
    depends_on: [],
    prs: [],
    problems: [{ repo: 'gamma', file: null, message: 'unreadable repository: HTTP 404' }],
  });
  return db;
}
