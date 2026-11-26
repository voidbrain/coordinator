# 🧱 bricks: coherence read, 2026-11-26

Every finding on this page was read at `voidbrain/bricks` `origin/main` `82ada4e` on 2026-11-26. The repository is on harness 10.21.4 (`.harness.json:6`); the template is at 10.24.0.

The checks, quoted:

- `check:backlog`: "F-006: about 4,012 tokens, over the 1,500-token record budget"; 13 records passed.
- `check:rules`: passes, with 46 procedure documents.
- `check:rule-load`: five over budget:
  - "docs/agents/solution-dashboard.md is 2,561 tokens"
  - parallel work 5,192
  - solution 5,239
  - rule review 5,311
  - audit 5,627

| # | Kind | Sev | Evidence | Finding | Proposed fix | Fix owner |
|---|---|---|---|---|---|---|
| 1 | Stale after today | High | `.harness.json:6`; `tools/merge-when-green.mjs` (89 lines behind) | The landing tool lacks the 10.23.2 stale-base check (B-125) | Reconcile 10.23.2 | bricks |
| 2 | Over budget | Medium | `check:backlog` | F-006 is about 4,012 tokens, the largest record in the solution and 2.7 times the budget | Move older evidence to `docs/archive/evidence-2026.md` | bricks |
| 3 | Unreachable procedure | Medium | `.harness.json:286` (`workUsage.enabled: true`); `AGENTS.md:81` (no "job usage" row) | `docs/agents/work-usage*.md` (4 pages) cannot be reached from AGENTS.md | Add the template row, or set `enabled: false` | bricks |
| 4 | Dead reference | Medium | `docs/agents/pull-requests.md:7`, `docs/backlog/review.md:26` (`work:pr`); `docs/backlog/closure.md:8` (`work:close`) | The procedures name scripts that `package.json` does not have | Add them from `core/package-scripts.json` (10.23.1) | bricks |
| 5 | Over budget | Medium | `check:rule-load` (four triggers over 5,000) | The parallel-work, solution, rule-review and audit routes are each about 200 to 630 tokens over budget | Mostly a template fix (project-harness #6); trim `AGENTS.md:3`, a 600-character paragraph | bricks, project-harness |
| 6 | Stale after today | Medium | `AGENTS.md:88` "(agent-behaviour checks when a runner is set)"; `docs/agents/rule-review.md:26-33` | The 10.24.0 split has not been reconciled | Reconcile both pages together, and drop the suffix | bricks |
| 7 | Stale after today | Medium | `AGENTS.md:58`, `:125` | The four 10.24.0 lines are missing | Merge them at the next reconcile | bricks |
| 8 | Owner question | Low | `docs/work/tasks/F-007-T02.json` ("The owner names base or a hobo theme") | "base" is a theme name, but to the owner it reads as a generic word. The step does not say what each choice looks like. | Name the themes as the catalogue shows them, and link the catalogue page | bricks |
| 9 | Tense | Low | `AGENTS.md:3` ("the package is not published yet (F-004 …") and `:117` ("Publishing uses npm trusted publishing") | The two lines read as contradictory unless the reader knows that line 117 is the plan | Write "will use" in line 117 until F-004 closes | bricks |
| 10 | Setting differs | Low | `.harness.json:248` (`audit.enforce: false`) | Coordinator check 5 reports this as a gap | F-020-T02 decides once, for every repository | coordinator (F-020-T02) |
| 11 | Template pages | Low | `docs/agents/skills.md:23,25,40`; `docs/agents/solution-refresh.md:21,24` (`tools/solution.mjs`, which only a coordinator has) | Component repositories receive commands that only exist in a coordinator or in the harness | Label them "coordinator only" or "harness only" | project-harness |
