# Cross-repository pass, 2026-11-26

F-020-T02. It follows the [per-repository pages](README.md) of F-020-T01. Nothing here changes a component. Each item is a proposal to the repository named as its owner, made in that repository's own session after the owner decides in F-020-T05.

## Baseline and method

Each repository was read at `origin/main` after `git fetch` and exported with `git archive`. No checkout was changed. The template was read at the tags `v10.24.1` (the release every project is on) and `v10.24.2` (project-harness's own release).

| Repository | Revision | Harness | Repository | Revision | Harness |
|---|---|---|---|---|---|
| 𖣂 nerv | `f6155a52` | 10.24.1 | 🏚️ openbando | `f16f8e5` | 10.24.1 |
| 🦺 project-harness | `36c9f1f` | 10.24.2 | 🗺️ hobo | `6f2abaa` | 10.24.1 |
| 🤖 gauntlet-protocol | `7c35c7e` | 10.24.1 | 🧱 bricks | `32ae565` | 10.24.1 |
| 🚁 fpvbuddy | `af10644` | 10.24.1 | 🚦 coordinator | `5a9bce5` | 10.24.1 (10.24.2 since #104, after this read) |
| 🪴 grover | `3f19541` | 10.24.1 | | | |

Scripts did the mechanical part:

- every file in `.harness.json` `copied` was compared byte for byte with its template source at the project's release;
- each `AGENTS.md` was compared line by line with `core/AGENTS.md` (rules and table rows) inside the template's sections, with `<!-- project -->` lines and "Project override" markers set apart;
- `check:backlog` and `check:rule-load` were run in each exported tree;
- reference prefixes (`repo:ID`) and emojis were counted across all `docs/`.

Copied files are clean: all 9 repositories match their release byte for byte, and no repository has a `forked` entry or a "Project override" marker. Every difference found sits in an adapted file, mostly AGENTS.md.

**Counts.** Differing rules: 12 (D1 to D12). Topics with several owners: 9 (O1 to O9). Terms used two ways: 6 (T1 to T6). T01 findings rechecked: 103. Of these, 35 are resolved, 6 are in flight in open PRs, 6 are answered on this page, and 56 are still open. Of the 10 High findings, 9 are resolved; the one still open is openbando #2.

## 1. Rules that differ without a marker or a recorded override

Per [overrides](https://github.com/voidbrain/project-harness/blob/v10.24.2/docs/apply/overrides.md), a project line adds to a template section and ends with `<!-- project -->` (form 1b). A changed or dropped rule is a project override, marked `> Project override (harness rule: …): …, because …` (form 2). The core also says to delete a section or row "that has nothing true to say (an optional feature not adopted)" (`core/AGENTS.md:1`).

| # | Sev | Repos | Evidence (template text → project text) | Owner | Proposed fix | Carried by |
|---|---|---|---|---|---|---|
| D1 | Medium | project-harness | Core `:107` "…distinct: a merge is not verification, a unit test is not a visual, pointer or device check, a green CI run proves only the checks it ran" → root `AGENTS.md:125` "…distinct. A merge is not a release: the tag is." The root says that "everything it prescribes to a project applies here too", but this evidence safeguard is dropped with no marker. | project-harness | Keep the core sentence and add the tag clause as a project line. `check:template` already compares the safety block, so extend that comparison to "Work tracking". | project-harness |
| D2 | Medium | fpvbuddy, hobo, bricks, openbando, coordinator | The row `start, change the phase of or finish a job, when workUsage.enabled` is missing, yet `workUsage.enabled: true` in all five. Openbando also has no `work-usage*.md` pages. | each repository | Add the row, or set `enabled: false` with a reason. This replaces T01 coordinator #6, fpvbuddy #4, hobo #2, bricks #3 and openbando #2. | each |
| D3 | Medium | coordinator, fpvbuddy | `<!-- project -->` lines that replace a template rule instead of adding to one. Coordinator: "Format and lint", "Testing the joins", "Privacy" and "One repository, one backlog" (`AGENTS.md:52`, `:95`, `:113`, `:119`). Fpvbuddy: the change-impact trigger, narrowed to the worker (`AGENTS.md:76`). | each repository | Restore the template line and keep only the added part as a project line. Where the template line is really replaced, write a form-2 override with its reason. See T4. | each |
| D4 | Medium | fpvbuddy | `docs/BACKLOG-RULES.md:5` drops "(with authoritative per-record sources when `workItems.enabled` …)", and its link resolves to `docs/docs/…` | fpvbuddy | Restore the template line (T01 fpvbuddy #2 and #3, still open). | fpvbuddy |
| D5 | Low | fpvbuddy | Core "A plan or promise given to the user (steps, a table to build, a later fix)" → `AGENTS.md:115` without the parenthesis. The style-guide rule is rewritten in two lines (`:15-16`), with no marker. | fpvbuddy | Restore the template wording and add the project's tokens and fonts as a project line. | fpvbuddy |
| D6 | Low | grover | Core "Testing the joins" sentence + "Here the joins are hub↔agent…" on one line (`AGENTS.md:103`); core Privacy line rewritten (`:126`). Neither is marked. | grover | Split each into the template line plus a project line. | grover |
| D7 | Low | hobo, bricks | Privacy additions without a marker: hobo `AGENTS.md:114-115`, bricks `:120-121`. | each repository | Mark them `<!-- project -->`. | each |
| D8 | Low | coordinator, gauntlet-protocol, openbando | The core style-guide rule is applied three ways in repositories with no style guide. The coordinator deletes it, which the template allows. Gauntlet keeps it with no UI (`AGENTS.md:11`). Openbando, which has a UI but no `docs/STYLE-GUIDE.md`, deletes it with no reason given; its UI rules are in `docs/agents/areas/ui-chrome.md`. | each repository | Gauntlet deletes the rule or says it covers CLI output (T01 #7). Openbando adds a project line pointing to `areas/ui-chrome.md`. | each |
| D9 | Low | coordinator | Procedure rows replaced without a marker: "work in parallel" becomes "add, estimate or close a step" (`AGENTS.md:77`); the solution row gains "refresh the views or change the order" (`:84`); the coverage row is dropped. | coordinator | Keep the template rows, add the coordinator's own rows as project lines, and record why the coverage row is dropped (no code). | coordinator |
| D10 | Low | project-harness | The root procedures table words 8 core rows differently, with no marker: behaviour, job usage, solution profile, reconcile, rule review, change impact and both MCP rows (`AGENTS.md:86-97`). | project-harness | Mark the template-repository rows as project lines, or move them to core wording. This is T01 #9, widened. | project-harness |
| D11 | Low | openbando | Line `:138` "Keep real-device, pointer/visual and untested tool combinations explicit" is marked `<!-- project -->`, but it repeats the core line `:137` | openbando | Fold the "untested tool combinations" part into a shorter project line (T01 #11). | openbando |
| D12 | Low | nerv | `docs/agents/pull-requests.md:24` (a project line) restates template line `:16` on independent review, and both cite "BACKLOG-RULES, 'Independent review'", which only routes back. The harness root `AGENTS.md:56` has the same citation. | project-harness (citation), nerv (duplicate) | The template cites "pull requests, 'Independent review'". NERV keeps only the `git diff` addition. | project-harness, then nerv |

## 2. Topics stated in several places: one owner each

| # | Topic | Where it is stated today | Proposed single owner | Others carry | Carried by |
|---|---|---|---|---|---|
| O1 | Audit cadence (`audit.days`, `enforce`, overdue, never fully audited) | core `docs/agents/audit.md:15` (7 days, `audit.days`); project-harness F-104-T03 (gap kinds, enforce flag in the dashboard); F-105-T01 (cadence table, "read through the F-104-T03 cadence code"); coordinator `cross-project-audit.md` check 5 (restates days 7 and enforce); each `.harness.json` `audit` | **Rule**: core `audit.md`. **Report**: F-104-T03's dashboard gap kinds. F-105 already names this boundary. | Check 5 drops its restatement and becomes "read the dashboard's audit gaps (F-104-T03); until it lands, apply `audit.md`". Settings carry values only. | coordinator (check 5); project-harness (F-104 and F-105 unchanged) |
| O2 | `audit.enforce: false` (grover, hobo, bricks) | T01 grover #9, hobo #9, bricks #10; dormant checks S4; cross-project audit proposals 16 and 17 | core `audit.md`, which already says to turn enforce on once a full baseline exists. These three have never had a full audit. | No AGENTS line. Check 5 reports "enforce off, no full baseline" as expected, not as a gap. | coordinator (check 5); each repository's first full audit |
| O3 | Agent-behaviour runs: when to run them | core `behaviour-checks.md` and `rule-review.md:28` (run on a rule change); project-harness F-096 ("rerun is still due"); F-020-T03 (runs for friction evidence); the owner's standing instruction "only for real rule changes, not wording fixes, until coordinator:F-020 decides", which is held in agent memory and in no repository | core `behaviour-checks.md` | F-020-T05 decides whether the wording-fix exemption becomes a template line. Until then, F-020's Next action names it, so it is no longer held only in memory. Dormant-checks S1 ("no runner anywhere") is resolved: all nine set `behaviour.runner`. | project-harness (after T05); coordinator (F-020 line, done here) |
| O4 | When to reconcile a harness release | core `session-start.md:13` (at the next session start); the owner's standing instruction "reconcile only once the template's backlog is empty", which is held in agent memory | core `session-start.md` | F-020-T05 decides whether the condition becomes a template rule. If it does not, the memory entry is dropped. | project-harness (after T05) |
| O5 | Landing queue | core `parallel-work.md` "Landing queue", the safety block (one line, citing it), `claims.md` (copied) and `tools/merge-when-green.mjs` | core `parallel-work.md`. This is already the case, and all 9 copies are identical. | Nothing to change. Since 10.23.2 the stale-base check is in every copy (T01 High #1 resolved). | none |
| O6 | Freeze | coordinator F-020 Next action only. No component states it, and the template released 10.24.1 and 10.24.2 (fixes, which the freeze allows) during it. | coordinator F-020 | T05 decides the freeze lines proposed in [README](README.md). Components link `coordinator:F-020` (or `solution:`, see T1) and do not restate it. | each, after T05 |
| O7 | Ask-first and never lists | core safety block, byte-identical in all 9 since 10.24.1 (project-harness's own is now checked by `check:template`); project lines: nerv (install folder), coordinator (read-only components), grover (hardware) | core `AGENTS.md` safety block | Nothing to change: each addition is marked. | none |
| O8 | Solution order rules | core `solution-profile.md:42-47` (take the first ready item; the order changes only by owner instruction); coordinator `AGENTS.md:17-18` restates both as project lines | core `solution-profile.md` | The coordinator keeps its file path and its ▶ note, and cites the profile for the two rules. | coordinator |
| O9 | Rule-load budget overruns caused by the template | always-loaded rules over 3,500 tokens in grover (3,768), openbando (3,669), bricks (3,636) and coordinator (3,604), three of them new since the 10.24.0 lines; the audit route over 5,000 tokens in 7 repositories (5,047 to 5,950); `solution-dashboard.md` (2,561) | project-harness (core `AGENTS.md` and `audit.md` / `audit-findings.md`) | This is input for F-020-T04 consolidation, keeping every requirement. Each repository trims only its own sections (grover T01 #2). | project-harness, via F-020-T04 |

## 3. Terms used two ways

| # | Term | The two uses, with evidence | Term to keep (owner decides in T05) | Carried by |
|---|---|---|---|---|
| T1 | The coordinator's reference prefix | `solution:ID`: 152 uses in the coordinator, 99 in the other repositories; it is the coordinator's id in `tools/solution.mjs` (`id: 'solution'`, `:1020`). `coordinator:ID`: 20 uses in total, the owner's prefix rule, and T01 coordinator #3. | `solution:`, because the tool and most text use it. Define it once in coordinator `AGENTS.md` "Architecture" ("this repository's records are `solution:ID`; `coordinator:` is an alias"). The alternative, `coordinator:`, would need a template change to `solution.mjs`. | coordinator; the template only if the owner picks `coordinator:` |
| T2 | The coordinator's emoji | `.solution.json` `emoji` is 🚦 (7 uses); the T01 pages and other coordinator docs use 🛰️ (7 uses) | 🚦, the value the dashboard prints | coordinator |
| T3 | References to another repository | `nerv:F-130` (the `repo:ID` form the dashboard checks) against prose "NERV F-130" / "NERV B-145" (16 in bricks, 4 in gauntlet-protocol) and the short `gauntlet:` (2 uses) for `gauntlet-protocol:` | `repo:ID` with the manifest id. Prose forms are not checked by `check:solution`. | bricks, gauntlet-protocol (at their next record edit) |
| T4 | `<!-- project -->` | Template meaning: a line that adds to a template section (overrides 1b). Also used to mark a line that replaces a template rule (D3) | Keep the template meaning. A replacement uses the form-2 override marker. | coordinator, fpvbuddy (D3) |
| T5 | "reconcile" | (a) adopting a harness release (`maintenance.md`, `reconcile-preview.mjs`); (b) matching the backlog to merged PRs (`reconcile:draft`, "reconcile and close backlog records" in the safety block, the "reconcile entry" in ledger-header) | Both are template text. Proposal for F-020-T04: "reconcile the harness" and "reconcile the backlog", written in full wherever the context does not say which | project-harness |
| T6 | Work-usage state | Dormant checks (2026-11-26 morning) found `workUsage.enabled: false` in six repositories; today all nine read `true`. The flag changed without any record saying so, so "measured" now means different things in different reports. | `.harness.json` is the source. Each repository records the owner's choice (dormant-checks proposal 16) | each (with D2) |

## 4. T01 findings: what today's work fixed

### Resolved, with evidence

| Fix | T01 findings resolved | Evidence |
|---|---|---|
| Reconciles to 10.24.1 (all 8 projects, coordinator included) | merge-when-green stale-base check, all 9 High #1 (nerv, coordinator, gauntlet, grover, fpvbuddy, hobo, bricks, openbando); behaviour split and suffix dropped: nerv #3, coordinator #8, gauntlet #4, grover #5, fpvbuddy #8, hobo #4, bricks #6, openbando #9; the four 10.24.0 lines: nerv #2, coordinator #9, gauntlet #5, grover #6, fpvbuddy #9, hobo #5, bricks #7, openbando #10 | `.harness.json` `version` 10.24.1; every `copied` file byte-identical to `v10.24.1`; `behaviour-checks.md` and its row present, no "(agent-behaviour checks when a runner is set)" in any AGENTS.md |
| 10.23.1 scripts picked up at reconcile | nerv #8 (`coverage:browser`), nerv #14 (`tools/guard.mjs`, `guard:install`), gauntlet #3 (`behaviour`), grover #4, hobo #3, bricks #4 (`work:pr`, `work:close`) | `package.json` scripts at the revisions above |
| project-harness 10.24.1 (B-128) | project-harness #1 (safety block is core's word for word, and `check:template` fails on a difference); #4 (Reconcile note) | CHANGELOG 10.24.1 |
| project-harness #311 | project-harness #2 (five core rules in root AGENTS.md) | `AGENTS.md` has all five; archive F-entry "Closed 2026-11-26: #311" |
| Coordinator archived F-016 | coordinator #4 (F-016 over budget), #15 (`fpvbuddy:F-005` link) | F-016 in `docs/archive/backlog-2026.md`, no `docs/work/records/F-016.md` |

Total: 35 resolved (all 9 merge-when-green findings, 8 behaviour splits, 8 sets of four lines, 6 scripts, 2 harness reconcile items, harness #2, coordinator #4 and #15). New since T01: coordinator F-020 itself is about 1,857 tokens, over the 1,500 budget, and nerv F-120 grew from about 2,375 to 2,594 tokens.

### In flight (open PRs by another session; not duplicated here)

| PR | Resolves when merged |
|---|---|
| nerv#828, fpvbuddy#35, grover#58, hobo#20, bricks#28 (`chore/harness-10-24-2`) | `solution-dashboard.md` over budget in components (project-harness #6 for components; nerv #12, grover #7, and the dashboard half of fpvbuddy #11, hobo #10 and bricks #11 (`solution-refresh.md`)) |
| none yet for gauntlet-protocol or openbando | 10.24.2 also fixes gauntlet #2 and openbando #3 (dead links to the solution pages), because the release rewords `procedures.md` and `solution-profile.md`. Neither repository has a reconcile PR open, so those links stay dead until each reconciles. |

### Answered on this page

project-harness #10 and coordinator #10 → O1; coordinator #3 → T1; grover #9, hobo #9, bricks #10 → O2.

### Still open (56), unchanged unless noted

- **nerv**: #4 (F-130 2,868, F-120 2,594, F-125 1,602), #5, #6, #7, #9 (template), #10 (→ D12), #11, #13, #15.
- **project-harness**: #3 (→ D12), #5, #7, #8, #9 (→ D10), #11.
- **coordinator**: #2 (`SOLUTION.md:28` still "all nine on 10.21.4"), #5 (worse: 6,283), #6 (→ D2), #7 (→ D9), #11, #12, #13, #14.
- **gauntlet-protocol**: #6, #7 (→ D8), #8.
- **grover**: #2 (worse: 3,768), #3 (worse: 9 routes over budget), #8.
- **fpvbuddy**: #2, #3 (→ D4), #4 (→ D2), #5, #6 (→ D3, now marked but still narrowed), #7 (→ D5), #10, and the skills half of #11.
- **hobo**: #2 (→ D2), #6, #7, #8 (5,266), and the skills half of #10.
- **bricks**: #2, #3 (→ D2), #5, #8, #9, and the skills half of #11.
- **openbando**: #2 (High, → D2), #4 (worse: `behaviour.runner` is now set, but there is still no `tools/behaviour.mjs` or `behaviour` script), #5, #6, #7, #8, #11 (→ D11), #12, #13.

## Top items

1. D2: `workUsage.enabled: true` with no procedure row in 5 repositories, and no pages at all in openbando (High).
2. D1: the template repository drops the "a merge is not verification" safeguard from its own AGENTS.md, unmarked.
3. O1: audit cadence has one rule owner (core `audit.md`) and one report owner (F-104-T03); check 5 stops restating it.
4. T1: decide `solution:` or `coordinator:` for the coordinator's records, and define it once.
5. O9: since the 10.24.0 lines, four repositories' always-loaded rules are over 3,500 tokens, and the audit route is over budget in 7. This is input for F-020-T04.
6. Openbando #4: the behaviour runner is set, but the tool and script are missing, so a run fails.
7. D3 and T4: `<!-- project -->` is used to replace template rules in the coordinator and fpvbuddy.
8. O3 and O4: two of the owner's standing rules (behaviour runs only for real rule changes; reconcile once the template backlog is empty) live only in agent memory. T05 places them.
9. In flight: five 10.24.2 reconcile PRs. Gauntlet-protocol and openbando have none yet, so their dead solution links remain.
10. D4: fpvbuddy BACKLOG-RULES calls the ledger the source, against AGENTS.md, and its link is broken.
