# 🚁 fpvbuddy: coherence read, 2026-11-26

Every finding on this page was read at `voidbrain/FPVBuddy` `origin/main` `8816987` on 2026-11-26. The repository is on harness 10.21.4 (`.harness.json:6`); the template is at 10.24.0.

The checks, quoted:

- `check:backlog`: 18 records passed, none over budget.
- `check:rules`: passes, with 46 procedure documents.
- `check:rule-load`: one over budget, "docs/agents/solution-dashboard.md is 2,561 tokens".

| # | Kind | Sev | Evidence | Finding | Proposed fix | Fix owner |
|---|---|---|---|---|---|---|
| 1 | Stale after today | High | `.harness.json:6`; `tools/merge-when-green.mjs` (89 lines behind) | The landing tool lacks the 10.23.2 stale-base check (B-125) | Reconcile 10.23.2 | fpvbuddy |
| 2 | Dead link | Medium | `docs/BACKLOG-RULES.md:5` `[docs/BACKLOG-RULES.md](docs/BACKLOG-RULES.md)` | The link resolves to `docs/docs/BACKLOG-RULES.md`. The template has `(BACKLOG-RULES.md)`. | Restore the template's link | fpvbuddy |
| 3 | Contradiction | Medium | `docs/BACKLOG-RULES.md:5` and `AGENTS.md:108` | BACKLOG-RULES dropped the template's "(with authoritative per-record sources when `workItems.enabled` …)" and calls BACKLOG.md "the current status ledger". AGENTS.md says the records are the source and the ledger is generated. | Restore the template text, and drop the duplicate from AGENTS.md (#5) | fpvbuddy |
| 4 | Unreachable procedure | Medium | `.harness.json:242` (`workUsage.enabled: true`); `AGENTS.md:76` (no "job usage" row) | `docs/agents/work-usage*.md` (4 pages) cannot be reached from AGENTS.md | Add the template row, or set `enabled: false` | fpvbuddy |
| 5 | Duplicate rule | Low | `AGENTS.md:108` | It restates the records rule ("edit `docs/work/records/<ID>.md` … never edit the generated ledger") that BACKLOG-RULES and `docs/backlog/records.md` own | Keep only the cross-repository wait wording, which is the project-specific part | fpvbuddy |
| 6 | Narrowed trigger | Low | `AGENTS.md:73` | The change-impact row reads "change something an output is derived from (`src/workers/vlm-worker.ts`)". The template's trigger also covers generated pages, translations, guides and a value used in two places, and those no longer trigger it here. | Keep the template trigger and add the worker as an example | fpvbuddy |
| 7 | Drift from template | Low | `AGENTS.md:111` | The promise rule drops "(steps, a table to build, a later fix)" | Restore the template wording | fpvbuddy |
| 8 | Stale after today | Medium | `AGENTS.md:83` "(agent-behaviour checks when a runner is set)"; `docs/agents/rule-review.md:26-33` | The 10.24.0 split has not been reconciled | Reconcile both pages together, and drop the suffix | fpvbuddy |
| 9 | Stale after today | Medium | `AGENTS.md:53`, `:111` | The four 10.24.0 lines are missing | Merge them at the next reconcile | fpvbuddy |
| 10 | Owner question | Medium | `docs/work/tasks/F-016-T02.json` (goal: "accepts FPVBuddy's durability before the import") | Neither "durability" nor "the import" is explained in the step. The owner would need to read F-016-T01 to know what is being accepted. | Say it plainly: "FPVBuddy's data is backed up to X and restored by Y, or we accept that there is no backup until Z. Pick one." | fpvbuddy |
| 11 | Template pages | Low | `docs/agents/skills.md:23,25,40`; `docs/agents/solution-dashboard.md` (2,561 tokens) | One page names harness-only scripts, and the other is over budget | See project-harness #6 and #7 | project-harness |

These are planned, not dead: `tools/roadmap-status.mjs` (`docs/BACKLOG.md:747`; F-021) is a proposal.
