# 𖣂 nerv: coherence read, 2026-11-26

Every finding on this page was read at `voidbrain/nerv` `origin/main` `0c9bfe9d` on 2026-11-26. This was read-only: Gemini is working on nerv branches, and none of them was read. The repository is on harness 10.21.4 (`.harness.json:6`); the template is at 10.24.0.

The checks, quoted:

- `check:backlog`: "F-120: about 2,375 tokens, over the 1,500-token record budget"; "F-130: about 2,868 tokens"; "F-125: about 1,912 tokens"; 99 records passed.
- `check:rules`: passes, with 46 procedure documents and every AGENTS link resolving.
- `check:rule-load`: one over budget, "docs/agents/solution-dashboard.md is 2,561 tokens, over the 2,000 budget".

| # | Kind | Sev | Evidence | Finding | Proposed fix | Fix owner |
|---|---|---|---|---|---|---|
| 1 | Stale after today | High | `.harness.json:6` (10.21.4); `tools/merge-when-green.mjs` differs from template by 89 lines | Harness 10.23.2 (B-125) stops merge-when-green from merging a green PR whose checks ran against an older base. nerv#767 broke `main` that way. NERV's copy does not have the fix yet. | Reconcile 10.23.2: copy the tool | nerv |
| 2 | Stale after today | Medium | `AGENTS.md:50`, `:106` | The four 10.24.0 lines are missing: change only what the task needs, write the least code, keep behaviour in a refactor, and ask when a request reads two ways | Merge them at the next reconcile | nerv |
| 3 | Stale after today | Medium | `AGENTS.md:81` "(agent-behaviour checks when a runner is set)"; `docs/agents/rule-review.md:26-33`; no `docs/agents/behaviour-checks.md` | In 10.24.0 the behaviour checks moved to their own page. Copying `rule-review.md` alone would link to a page NERV does not have. | Copy `behaviour-checks.md` together with `rule-review.md`, add its procedures row and drop the suffix from row 81 | nerv (reconcile); project-harness (say so in the Reconcile note) |
| 4 | Over budget | Medium | `check:backlog` (above) | F-130 is about 2,868 tokens, F-120 about 2,375 and F-125 about 1,912, against a budget of 1,500 | Move evidence older than the last reconciliation to `docs/archive/evidence-2026.md` | nerv |
| 5 | Dead reference | Medium | `docs/work/records/B-163.md:14`; `docs/BACKLOG.md:1000`; `package.json:74` | The records name `npm run check:threat-map`, but the script is `check:threats`. One check now goes by two names. | Write `check:threats` in B-163 | nerv |
| 6 | Dead link | Medium | `docs/work/records/F-132.md:20` (5 links `archive/backlog-2026.md#f-045`, `#f-025`, `#f-021`, `#f-084`, `#f-091`) | The links resolve to `docs/work/records/archive/…`, which does not exist | Change them to `../../archive/backlog-2026.md#…` | nerv |
| 7 | Dead link | Low | `docs/design/owner-jobs-case-study-2026-11-14.md:13,14,21,30,32,44` | The links point to `../work/records/F-084.md`, `F-085`, `F-091`, `F-021`, `F-027` and `F-066`. Those records are now archived, so the files are gone. | Point the links at the archive anchors. This is a dated design page. | nerv |
| 8 | Dead reference | Medium | `docs/agents/coverage-guide.md:9,12` | The page names `tools/browser-coverage.mjs` and `npm run coverage:browser`, and NERV has neither. A fresh agent following the "change tests or coverage" row (`AGENTS.md`) is sent to a command that does not exist. | Reconcile 10.23.1 (package scripts and tool), or add a project line naming NERV's browser suites | nerv |
| 9 | Dead reference | Low | `docs/agents/skills.md:23,25,40` | The page names `skills:package`, `check:skills` and `skills:affected`, which only project-harness has. This is template text. | The template names them as harness-only | project-harness |
| 10 | Duplicate rule | Low | `docs/agents/pull-requests.md:16` (template) and `:24` (NERV line) | Independent review is stated twice, in different words. Line 24 cites "BACKLOG-RULES, 'Independent review'", but `docs/BACKLOG-RULES.md:24` only routes back to pull-requests. | Keep line 16 and add line 24's addition to it (pass the reviewer `git diff origin/main...HEAD`). Fix the citation. | nerv |
| 11 | Duplicate rule | Low | `docs/BACKLOG-RULES.md:5` (template) and `:30` (NERV section) | Both lines define BACKLOG.md as the ledger and the records as its sources, in different words | Keep line 5, and keep only the `layout.json` detail in the NERV section | nerv |
| 12 | Over budget | Low | `check:rule-load` | `solution-dashboard.md` is 2,561 tokens, against a budget of 2,000. The page is copied from the template. | Split the page by trigger in the template | project-harness |
| 13 | Owner question | Medium | `docs/work/records/F-132.md:15` (Check) | The Check uses "write-external", "a read-only Green tool", "watermelon stages, F-025" and "allow-list of repository + workflow pairs". The owner cannot verify it as written. F-132-T04's options already needed a plain-language re-explanation (F-020 Issue). | Rewrite the Check as what the owner sees: "the overview refreshes from chat; NERV can start only the coordinator refresh" | nerv |
| 14 | Dead reference | Medium | `AGENTS.md:27` (safety block) | The always-loaded rules say to run `node tools/guard.mjs install`, but NERV has no `tools/guard.mjs` and no `guard:install` script. F-125-T03 already tracks this (`docs/work/records/F-125.md:20`). | Land F-125-T03. Until then, the line says the tool is not yet present. | nerv |
| 15 | Owner question | Low | `docs/work/tasks/F-126-T03.json` (goal) | "Chooses gemma4:26b or keeps gemma4:12b from the speed and quality evidence", but the step does not say where that evidence is | Link the T01/T02 report and name the one or two numbers that decide | nerv |

Checked and found clean: no procedure is unreachable from AGENTS.md (`coverage.md` and `impact-map.md` are generated pages); the safety block matches the template, plus the NERV install-folder line; nothing tells an agent to edit the primary checkout.

This one is planned, not dead: `tools/publish-views.mjs` in `docs/work/records/F-125.md:20` is a proposal.
