# <a id="top"></a>Coordinator backlog

Current work ledger, reviewed 25 November 2026 against main `7c0e5b8`. PR #28 (B-002 and B-003 name PR #27) merged on green CI; no record change needed. Harness reconciled to v10.20.1 in the F-004-T02 PR.
Cross-repository work only; each component's work lives in its own backlog ([overview](SOLUTION-OVERVIEW.md)). [Rules](BACKLOG-RULES.md) · [Archive 2026](archive/backlog-2026.md) · [Reading the records](#how-to-use-this-file).

<!-- totals:start -->
**Remaining effort:** 4.5 h agent + 0.75 h owner across 9 open steps of 4 features and 2 other records. 2 h of actual effort recorded on 1 step. Generated from the task files.
<!-- totals:end -->

## Work items

Bugs (B-) and features (F-) in one list, most urgent first.

### <a id="b-002"></a>[🐞 B-002](#top)

**check:fast fails with a bare HTTP 403 when GH_TOKEN is unset**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔹 P3 | 🟢 Small | 0.5 h | — | — | 🤖 | — | — |

💻 **→** Next: B-002-T01 — Make check:fast supply or ask for GH&#95;TOKEN (Planned).

| | |
|---|---|
| **Issue** | `npm run check:fast` runs `check:solution` (`tools/solution.mjs check --remote`), which reads GitHub without a token unless `GH_TOKEN` is set. Once the unauthenticated limit (60 requests an hour) is spent, every component reports "GitHub returned HTTP 403" and the check exits 1. AGENTS.md lists both commands with no token; only the refresh line in README and the solution-refresh guide name `GH_TOKEN`. Found by the delivery audit of 2026-11-25. |
| **Reproduce** | With `GH_TOKEN` unset and `curl -s https://api.github.com/rate_limit` showing core remaining 0, run `npm run check:solution`: five "GitHub returned HTTP 403" lines; `npm run check:fast` exits 1. |
| **Check** | An agent following AGENTS.md runs `check:fast` with a token (the check lines or the project's `check:solution` script supply `GH_TOKEN=$(gh auth token)`), and it passes; without `gh` logged in, the documented command says what is missing instead of a bare 403. |

**Steps**

| Effort | Step | Estimate | Actual | Remaining | Status |
|---|---|---|---|---|---|
| 🟢 Small | <a id="b-002-t01"></a>B-002-T01 — Make check:fast supply or ask for GH&#95;TOKEN | 0.5 h | 0 h | 0.5 h | Planned |
| 🟢 Small | **Total** | 0.5 h | 0 h (0 of 1 steps recorded) | 0.5 h | 0 of 1 completed |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/B-002.md)

| Field | Value |
|---|---|
| PR / evidence | Audit [2026-11-25 delivery](audits/2026-11-25-delivery.md), opened in [#27](https://github.com/voidbrain/coordinator/pull/27) |
| Opened | 2026-11-25 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---
### <a id="b-003"></a>[🐞 B-003](#top)

**Neither scheduled workflow has run on its schedule yet**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🟠 Investigate | 🔹 P3 | 🟢 Small | 0.25 h | — | — | 🤖 | — | — |

💻 **→** Next: B-003-T01 — Check that both scheduled workflows have run on their schedule (Planned).

| | |
|---|---|
| **Issue** | Maintenance freshness (`0 9 * * *`) and Refresh solution views (`30 5 * * *`) are on `main` since 2026-11-24 21:53 UTC; at 11:36 UTC on 2026-11-25 neither had a `schedule` run (Maintenance 0 runs; Refresh 10, all `workflow_dispatch`). The same cron in voidbrain/nerv, gauntlet-protocol and project-harness starts 8–12 hours late, so this is probably delay, not a fault. Found by the delivery audit of 2026-11-25 (finding 2). |
| **Reproduce** | `gh run list -R voidbrain/coordinator --event schedule` lists no run. |
| **Check** | After 2026-11-26 12:00 UTC the same command lists at least one `schedule` run of each workflow: close as delay, not a defect. If either is still missing, record the cause (Actions schedule state of the repository) and move this record to Open. |

**Steps**

| Effort | Step | Estimate | Actual | Remaining | Status |
|---|---|---|---|---|---|
| 🟢 Small | <a id="b-003-t01"></a>B-003-T01 — Check that both scheduled workflows have run on their schedule | 0.25 h | 0 h | 0.25 h | Planned |
| 🟢 Small | **Total** | 0.25 h | 0 h (0 of 1 steps recorded) | 0.25 h | 0 of 1 completed |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/B-003.md)

| Field | Value |
|---|---|
| PR / evidence | Audit [2026-11-25 delivery](audits/2026-11-25-delivery.md), opened in [#27](https://github.com/voidbrain/coordinator/pull/27) |
| Opened | 2026-11-25 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---
### <a id="f-004"></a>[✨ F-004](#top)

**Propose the solution order, hours, runway, gap review, cross-repository dependencies and on-demand backlog views to the template**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔶 P2 | 🟡 Medium | 1.5 h agent + 0.25 h owner | — | — | ⏳ | 🧑‍🔧 | — |

🧑 **→** Next: [🧑‍🔧](proposals/solution-order-in-template.md#proposal-4-the-overview-layout-the-dashboard-still-lacks-found-at-the-10201-reconcile-f-004-t02) F-004-T04 — Owner takes Proposal 4 (the overview's layout the dashboard lacks) to a project-harness session (Planned).

| | |
|---|---|
| **Issue** | The solution order, the overview sections and the gap review are project content here because the template has none; two proposals for every project are written down for the owner. |
| **Reproduce** | Read `docs/proposals/solution-order-in-template.md`. |
| **Check** | The owner has taken the proposal to the template; once a template release covers it, this repository reconciles to it and removes `tools/solution-overview.mjs` or keeps only what the release leaves project-specific. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | Who | PRs |
|---|---|---|---|---|---|---|---|:---:|---|
| 🟢 Small | <a id="f-004-t04"></a>F-004-T04 — Owner takes Proposal 4 (the overview's layout the dashboard lacks) to a project-harness session | — | 0 h | 0 h agent + 0.25 h owner | Planned | — | [F-004-T05](#f-004-t05) | [🧑‍🔧](proposals/solution-order-in-template.md#proposal-4-the-overview-layout-the-dashboard-still-lacks-found-at-the-10201-reconcile-f-004-t02) | — |
| 🟡 Medium | <a id="f-004-t05"></a>F-004-T05 — Retire the overview tool once a template release covers Proposal 4 | 1.5 h | 0 h | 1.5 h | Planned | [F-004-T04](#f-004-t04) | — | ⏳ 🤖 | — |
| 🟡 Medium | **Total** | 3.5 h (2 of 5 steps) | 2 h (1 of 5 steps recorded) | 1.5 h agent + 0.25 h owner | 3 of 5 completed | | | | |

<details><summary>Done steps (3)</summary>

| Effort | Step | Estimate | Actual | Status | PRs |
|---|---|---|---|---|---|
| — | <a id="f-004-t01"></a>F-004-T01 — Owner takes the template proposal to a project-harness session | — | 0 h | Completed | — |
| — | <a id="f-004-t02"></a>F-004-T02 — Reconcile to the template release that ships the proposal and retire the project tool | 2 h | 2 h (stated) | Completed | [PR #29](https://github.com/voidbrain/coordinator/pull/29) reconcile 10.20.1, template prune, parity |
| — | <a id="f-004-t03"></a>F-004-T03 — Owner takes Proposal 3 (dashboard defects found at the 10.20.0 reconcile) to a project-harness session | — | 0 h | Completed | [PR #29](https://github.com/voidbrain/coordinator/pull/29) closed on project-harness v10.20.1 (B-057, B-058) |

</details>

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-004.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-004-T02: [PR #29](https://github.com/voidbrain/coordinator/pull/29) reconcile 10.20.1, template prune, parity · F-004-T03: [PR #29](https://github.com/voidbrain/coordinator/pull/29) closed on project-harness v10.20.1 (B-057, B-058). [#23](https://github.com/voidbrain/coordinator/pull/23); [#29](https://github.com/voidbrain/coordinator/pull/29) |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---

### <a id="f-006"></a>[✨ F-006](#top)

**NERV delivers Grover alerts end to end**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔶 P2 | 🟢 Small | 1 h agent + 0.5 h owner | — | — | 🤖 | — | — |

💻 **→** Next: F-006-T01 — Record the grover&#95;alerts contract and its end-to-end check in docs/SOLUTION.md (waits on grover:F-008) (Planned).

| | |
|---|---|
| **Issue** | Grover F-008 says NERV delivers its alerts through NERV's own pack, recorded in NERV's backlog; NERV has no such record yet (gap review, kind 1). |
| **Reproduce** | Grover `docs/DESIGN.md`, "Alerts" and "NERV"; NERV's backlog has no record mentioning Grover. |
| **Check** | An alert raised on a running Grover hub reaches the owner through NERV; the contract and the check are in docs/SOLUTION.md. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | Who |
|---|---|---|---|---|---|---|---|:---:|
| 🟢 Small | <a id="f-006-t01"></a>F-006-T01 — Record the grover&#95;alerts contract and its end-to-end check in docs/SOLUTION.md (waits on grover:F-008) | 1 h | 0 h | 1 h | Planned | — | [F-006-T02](#f-006-t02) | 🤖 |
| 🟢 Small | <a id="f-006-t02"></a>F-006-T02 — Owner sees a Grover alert arrive through NERV | — | 0 h | 0 h agent + 0.5 h owner | Planned | [F-006-T01](#f-006-t01) | — | ⏳ 🧑‍🔧 |
| 🟢 Small | **Total** | 1 h (1 of 2 steps) | 0 h (0 of 2 steps recorded) | 1 h agent + 0.5 h owner | 0 of 2 completed | | | |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-006.md)

| Field | Value |
|---|---|
| PR / evidence | — |
| Components | grover:F-008 |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-24 |

</details>

---

### <a id="f-007"></a>[✨ F-007](#top)

**NERV capability coverage in the Gauntlet across both repositories**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔶 P2 | 🟢 Small | 1 h | — | — | 🤖 | — | — |

💻 **→** Next: F-007-T01 — Name the Gauntlet release NERV needs for its new cases in docs/SOLUTION.md (waits on nerv:F-120) (Planned).

| | |
|---|---|
| **Issue** | nerv:F-120 waits on domain packs requested from gauntlet-protocol the same day; gauntlet-protocol has no open record for them (gap review, kind 1). |
| **Reproduce** | nerv F-120 Issue; gauntlet-protocol backlog: no open records on 2026-11-24. |
| **Check** | The required gauntlet-protocol release and NERV's vendored version are named in docs/SOLUTION.md, and a Gauntlet run of the new NERV cases is linked. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks |
|---|---|---|---|---|---|---|---|
| 🟢 Small | <a id="f-007-t01"></a>F-007-T01 — Name the Gauntlet release NERV needs for its new cases in docs/SOLUTION.md (waits on nerv:F-120) | 0.5 h | 0 h | 0.5 h | Planned | — | [F-007-T02](#f-007-t02) |
| 🟢 Small | <a id="f-007-t02"></a>F-007-T02 — Link a Gauntlet run of the new NERV cases as acceptance | 0.5 h | 0 h | 0.5 h | Planned | [F-007-T01](#f-007-t01) | — |
| 🟢 Small | **Total** | 1 h | 0 h (0 of 2 steps recorded) | 1 h | 0 of 2 completed | | |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-007.md)

| Field | Value |
|---|---|
| PR / evidence | — |
| Components | nerv:F-120 |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-24 |

</details>

---

### <a id="f-009"></a>[✨ F-009](#top)

**Reconcile to the latest harness and read built backlog views**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🟡 Implemented | 🔹 P3 | 🟢 Small | 0.25 h | — | — | 🤖 | — | — |

💻 **→** Next: from tasks; F-009-T01 is verified once NERV publishes built views (nerv:F-125) and a refresh reads them.

| | |
|---|---|
| **Issue** | Owner decision 2026-11-25: the project-harness major release that stops committing backlog views (project-harness:F-096-T06) ships only when the template backlog is empty and every project has reconciled to the latest release, and NERV has run with built views for about 10 merged PRs (nerv:F-125). The coordinator is on harness 10.9.0 and reads committed ledgers. |
| **Reproduce** | `.harness.json` names version 10.9.0; `tools/solution.mjs` predates 10.14.0 and reads a component's committed `docs/BACKLOG.md` only. |
| **Check** | The coordinator is reconciled to the latest harness release; `tools/solution.mjs` and `docs/agents/solution-profile.md` are at 10.14.0 or later, and `npm run solution:refresh` reads NERV's built views (the `backlog-views` publication) without a missing or stale view. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | PRs |
|---|---|---|---|---|---|---|
| 🟢 Small | <a id="f-009-t01"></a>F-009-T01 — Reconcile to the latest harness and read built backlog views | 1.5 h | 0 h | 0.25 h | Implemented; verification pending | [PR #19](https://github.com/voidbrain/coordinator/pull/19) |
| 🟢 Small | **Total** | 1.5 h | 0 h (0 of 1 steps recorded) | 0.25 h | 0 of 1 completed | |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-009.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-009-T01: [PR #19](https://github.com/voidbrain/coordinator/pull/19). Opened in [PR #19](https://github.com/voidbrain/coordinator/pull/19).; [#23](https://github.com/voidbrain/coordinator/pull/23) |
| Components | project-harness:F-096 |
| Opened | 2026-11-25 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---
## Other changes

Reconciliation history: [reconciliation log 2026](archive/reconciliation-2026.md).

## How to use this file

| Status | Requirements | Next statuses and conditions | Priority cue |
|---|---|---|---|
| **🔴 Open** | Reproducible bug or agreed capability; scope and next action recorded. | - **Investigate** if cause/scope is uncertain<br>- **Implemented** when code is complete<br>- **Blocked** if a named dependency prevents progress<br>- **Closed** if cancelled/superseded, with reason. | Coloured |
| **🟠 Investigate** | Report and unanswered question recorded; next diagnostic identified. | - **Open** when scope/cause is established<br>- **Implemented** when fixed<br>- **Blocked** if evidence/dependency is unavailable<br>- **Closed** if duplicate/not reproducible after documented investigation, with reason. | Coloured |
| **🟡 Implemented** | Code exists; required verification remains pending. | - **Verified** when all acceptance checks pass (automated ones: the merged PR's green CI run)<br>- Open or Investigate if a check fails<br>- **Blocked** if a required check cannot proceed. | Coloured |
| **🟢 Verified** | All acceptance checks passed; date, method and evidence recorded, including human/device checks when required. | - **Closed** when no action remains and resolution is recorded<br>- **Open** or **Investigate** if new evidence invalidates verification. Do not leave completed items here indefinitely. | Coloured |
| **🟣 Blocked** | Specific blocker, affected work/check and resume condition recorded. | - Return to **Open**, **Investigate** or **Implemented** when unblocked<br>- **Verified** only after all checks pass<br>- **Closed** if cancelled/superseded, with reason. | Grey ◻️ |
| **🔵 Closed** | Resolution recorded and item archived. | - **Open** or **Investigate** if reopened by new evidence<br>Retain ID, original Opened date and historical closure record. | Grey ◻️ |

Follow [Backlog rules](BACKLOG-RULES.md) for updating records, reconciling PR/CI evidence, stale-state review, closure/archiving, human dependencies and table validation. Preserve stable IDs and existing user edits.

Each item shows its ID and title, a summary table (status with its colour, priority, effort size; with source-owned records also remaining time, Depends on, Unlocks and Procedures and Decisions, 🧑 where the record or one of its ready steps waits on that kind of human action), the human or next action, and Issue / Reproduce / Check. Expand the closed details for next actions, estimate rationale, PR history, dates and verification. Effort, from the remaining agent hours (owner time apart): 🟢 Small ≤1 h · 🟡 Medium ≤4 h · 🔴 Large ≤8 h · 🟣 Very large more; work still estimated in days: 🟢 Small ≤1 day · 🟡 Medium 2–3 days · 🔴 Large ≥4 days. Status and verification evidence describe progress; effort is an estimate of work still required. A `---` line ends every item.
