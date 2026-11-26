# 🦺 project-harness: coherence read, 2026-11-26

Every finding on this page was read at `voidbrain/project-harness` `origin/main` `e084f07`, release 10.24.0 (`VERSION`, `.harness.json:6`), on 2026-11-26. Two kinds of text were read: this repository's own harness (root AGENTS.md, `docs/`) and the template that projects receive (`core/`, `angular/`).

The checks, quoted:

- `check:backlog`: "F-096: about 2,358 tokens, over the 1,500-token record budget"; 10 records passed.
- `check:rules`: passes, with 60 procedure documents.
- `check:rule-load`: one over budget, "docs/agents/solution-dashboard.md is 2,561 tokens, over the 2,000 budget".

When F-020 opened, `rule-review.md` was about 2,300 tokens, over its budget. 10.24.0 fixed that by moving the behaviour checks to their own page, `behaviour-checks.md`.

| # | Kind | Sev | Evidence | Finding | Proposed fix | Fix owner |
|---|---|---|---|---|---|---|
| 1 | Contradiction | High | `AGENTS.md:26` and `core/AGENTS.md:29-31` | The root safety block says it is "the same rule as `core/AGENTS.md`", but it differs from core:<br>• Never: it drops "or bypass the branch protection".<br>• Asks first: it drops "a harness change it cannot place" and "force-pushing", keeping only "rewriting published history or moving a published tag". It also drops "a check a record marks 🧑", keeping only "a decision".<br>• On its own: it drops "resolve conflicts on its own PRs" and says "push that at once" where core says "before the checks finish".<br>The same safety rule now exists in two wordings. | Copy the core block verbatim, then add the repository's own lines (tag and release, moving a published tag) as project lines | project-harness |
| 2 | Contradiction | Medium | `AGENTS.md:3` ("everything it prescribes to a project applies here too") and `core/AGENTS.md:50,52,89-91,108-111,119` | The root AGENTS.md is missing five core rules:<br>• a failing test is evidence;<br>• replacing a feature removes its state;<br>• Testing the joins;<br>• Privacy;<br>• a plan or promise becomes records. | Add them, or state each one's exemption with its reason | project-harness |
| 3 | Wrong citation | Low | `AGENTS.md:50` "(BACKLOG-RULES, 'Independent review')"; `docs/BACKLOG-RULES.md:22` | BACKLOG-RULES only routes to `docs/agents/pull-requests.md`, which holds the rule. nerv copied the same citation (`docs/agents/pull-requests.md:24`). | Cite "pull requests, 'Independent review'" | project-harness |
| 4 | Stale reconcile text | Medium | `CHANGELOG.md:9` (10.24.0 Reconcile) | The note says to "copy `docs/agents/rule-review.md`" and add the behaviour-checks row. It does not say to drop the suffix "(agent-behaviour checks when a runner is set)" from the rule-review row. All eight projects have that suffix (for example nerv `AGENTS.md:81`). After a reconcile, two rows would claim the behaviour checks. | Add "drop the suffix from the rule-review row" to the Reconcile note | project-harness |
| 5 | Over budget | Medium | `check:backlog` | F-096 is about 2,358 tokens, against a budget of 1,500 | Move older evidence to `docs/archive/evidence-2026.md` | project-harness |
| 6 | Over budget | Medium | `core/docs/agents/solution-dashboard.md` (2,561 tokens) | The template ships this page over budget, so eight of the nine repositories warn about it | Split it by trigger (layouts read; hours and runway) | project-harness |
| 7 | Dead reference (template) | Low | `core/docs/agents/skills.md:23,25,40` | The page names `skills:package`, `check:skills` and `skills:affected`. Those scripts exist only here, and they are not in `core/package-scripts.json`. Every project receives a command it cannot run. | Mark them "in project-harness" | project-harness |
| 8 | Dead reference (template) | Low | `core/docs/agents/coverage-guide.md:5,12` | The page names `npm run coverage` (stack-owned) and `coverage:browser`. Projects without a browser suite (coordinator, gauntlet-protocol) also receive the page. | Say "when the stack has a browser suite", or leave the page out of `copied` for projects without code | project-harness |
| 9 | Duplicate rule | Low | `AGENTS.md:73` and `core/AGENTS.md:86` | The behaviour-checks row has two triggers: "rerun … (the impact map lists it)" here, and "run … when a runner is set" in core | Use one wording | project-harness |
| 10 | Same topic in several places | Low | `core/docs/agents/audit.md:15` (7 days, `audit.days`, else `freshness.auditDays`); `docs/work/tasks/F-104-T03.json:5-10`; `docs/work/records/F-105.md:3-15`; coordinator `docs/agents/cross-project-audit.md:47-52` | The audit cadence is defined once and then planned in two more places. This is the F-020 Issue example. | Collect it in F-020-T02 and give it one owner page | project-harness (via F-020-T02) |
| 11 | Stale after today | Low | `docs/design/karpathy-rules-comparison-2026-11-26.md:5` (v10.21.4) | The dated design page names the release it compared against. This is correct as history, but it has no "superseded by 10.24.0" pointer. | Add one line pointing to CHANGELOG 10.24.0 | project-harness |

Checked and found clean:

- All `docs/agents/*.md` pages are reachable from AGENTS.md except `impact-map.md`, which is generated.
- The links in `solution/docs/SOLUTION.md` and in `core/AGENTS.md:43` resolve in an applied project, as `AGENTS.md:7` says.
- `README.md:48` and `:60` name `angular/tools/check-conventions.mjs` and `tools/mcp-catalog.json`, and both exist.

These are planned, not dead: the `tools/check-pr-record.mjs`, `check-conflict-markers.mjs`, `roadmap-status.mjs`, `test-timing-reporter.mjs` and `install-deps.mjs` that `docs/BACKLOG.md:316,402` and F-107/F-108 name are proposals.
