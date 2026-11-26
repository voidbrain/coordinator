# 🛰️ coordinator: coherence read, 2026-11-26

Every finding on this page was read at `voidbrain/coordinator` `origin/main` `fe5ebec` on 2026-11-26. The repository is on harness 10.21.4 (`.harness.json:6`); the template is at 10.24.0. This page also carries this repository's own freeze: it stays as stated in F-020, with no AGENTS.md line unless the owner asks for one.

The checks, quoted:

- `check:backlog`: "F-016: about 1,931 tokens, over the 1,500-token record budget"; 13 records passed.
- `check:rules`: passes, with 46 procedure documents.
- `check:rule-load`: seven over budget:
  - "docs/agents/cross-project-audit.md is 2,161 tokens"
  - "docs/agents/solution-dashboard.md is 2,561 tokens"
  - "add, estimate or close a step (task file)" reads 5,160 tokens
  - "work across repositories of a solution, refresh the views or change the order" reads 6,139 tokens
  - "run a cross-project audit …" reads 5,574 tokens
  - "change AGENTS.md, CLAUDE.md, BACKLOG-RULES …" reads 5,279 tokens
  - "run an audit …" reads 5,595 tokens

| # | Kind | Sev | Evidence | Finding | Proposed fix | Fix owner |
|---|---|---|---|---|---|---|
| 1 | Stale after today | High | `.harness.json:6`; `tools/merge-when-green.mjs` differs from template by 89 lines | The landing tool that AGENTS.md names lacks the 10.23.2 stale-base check (B-125). It can merge a PR whose green checks ran against an older `main`. | Reconcile 10.23.2. Until then, check `behind_by` by hand before merging. | coordinator |
| 2 | Stale after today | Medium | `docs/SOLUTION.md:28` | It says "all nine on 10.21.4 on 2026-11-26", but project-harness is on 10.24.0 (its `.harness.json:6`) | Drop the count and point to the dashboard's Harness column, which is generated | coordinator |
| 3 | Term used two ways | Medium | `docs/solution-order.md:27` and `docs/SOLUTION.md` write `solution:F-020` and `solution:F-012`; components write `coordinator:F-016` (6 files, for example fpvbuddy); the owner's own prefix rule writes `coordinator:` | This repository's records are referenced under two prefixes, and AGENTS.md defines neither | Define the self-prefix in AGENTS.md "Architecture", and say whether `solution:` and `coordinator:` are aliases | coordinator (F-020-T02 for the components) |
| 4 | Over budget | Medium | `check:backlog` | F-016 is about 1,931 tokens, against a budget of 1,500 | Move older evidence to `docs/archive/evidence-2026.md` | coordinator |
| 5 | Over budget | Medium | `check:rule-load`; `docs/agents/cross-project-audit.md` (2,161 tokens) | The project's own page is over budget, and five triggers read more than 5,000 tokens. The heaviest is the solution route, at 6,139. | Split the cross-project audit page by check, and route the solution row to one section | coordinator |
| 6 | Unreachable procedure | Medium | `.harness.json:248` (`workUsage.enabled: true`); `AGENTS.md:69-87` has no "job usage" row | `docs/agents/work-usage*.md` (4 pages) cannot be reached from AGENTS.md, even though the setting turns usage tracking on | Add the template row, or set `enabled: false` | coordinator |
| 7 | Wrong route | Low | `AGENTS.md:74` ("add, estimate or close a step") points to parallel work, "upfront feature plans" | Upfront plans live in `docs/agents/parallel-work-plans.md` and `docs/backlog/feature-plans.md`, and estimates in `docs/backlog/estimates.md`. The row sends an agent through a page that only links onward. | Link the two pages that hold the rules | coordinator |
| 8 | Stale after today | Medium | `AGENTS.md:86` "(agent-behaviour checks when a runner is set)"; `docs/agents/rule-review.md:26-33`; no `behaviour-checks.md` | The 10.24.0 split has not been reconciled. Copying `rule-review.md` alone would link to a missing page. | Reconcile both pages together, and drop the suffix | coordinator |
| 9 | Stale after today | Medium | `AGENTS.md:56`, `:117` | The four 10.24.0 lines are missing (task scope, least code, refactor keeps behaviour, two readings) | Merge them at the next reconcile | coordinator |
| 10 | Same topic in several places | Low | `docs/agents/cross-project-audit.md:47-52` (check 5 restates `audit.days`, default 7, and `enforce`); `docs/agents/audit.md:15` | The audit cadence is defined in the copied audit page and again in check 5 | Make check 5 cite `audit.md` instead of restating it (F-020-T02) | coordinator |
| 11 | Dead reference | Low | `docs/agents/coverage-guide.md:5,12` | The page names `npm run coverage` and `coverage:browser`, and this repository has no code. No row reaches the page, so it is harmless, but it is copied for nothing. | Drop it from `copied` at the next reconcile | coordinator |
| 12 | Dead reference | Low | `docs/agents/skills.md:23,25,40` | The page names harness-only scripts. This is template text. | See project-harness #7 | project-harness |
| 13 | Owner question | Medium | `docs/work/tasks/F-018-T03.json` (goal, acceptance) | "Decides which side moves" assumes the owner knows what each side of the alert contract would change. B-007 needed the same re-explanation (F-020 Issue). | For each proposal, state in one line what changes in Grover and what changes in NERV | coordinator |
| 14 | Dated page | Low | `docs/proposals/solution-order-in-template.md:16,50` | The proposal names `tools/solution-overview.mjs`, which F-004-T05 retired (`AGENTS.md:12`) | Add one "superseded" line at the top | coordinator |
| 15 | Stale link | Medium | `docs/work/records/F-016.md:27` (Components: `fpvbuddy:F-005`) | `npm run check:solution`, and so `check:fast`, fails locally with "solution:F-016: missing fpvbuddy:F-005 (closed/archived?)". CI passes because its run is offline (`.github/workflows/ci.yml:63`). As a result, the documented pre-push bundle is red on `main`. | Reconcile the link: fpvbuddy archived F-005, so it leaves Components with a dated note | coordinator |

Checked and found clean:

- The safety block matches the template, plus the coordinator's own read-only line.
- `docs/SOLUTION.md:30` names `tools/gauntlet.mjs`, which exists in nerv.
- `docs/SOLUTION-DASHBOARD.md:638` names `npm run typecheck`. That text is generated from component data.
