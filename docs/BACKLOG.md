# <a id="top"></a>Coordinator backlog

Current work ledger, reviewed 24 November 2026 against main `e03eb0c`. Cross-repository work only; each component's work lives in its own backlog ([overview](SOLUTION-OVERVIEW.md)). [Rules](BACKLOG-RULES.md) · [Archive 2026](archive/backlog-2026.md) · [Reading the records](#how-to-use-this-file).

<!-- totals:start -->
**Remaining effort:** 6 h agent + 1.75 h owner across 12 open steps of 7 features. 0.25 h of actual effort recorded on 1 step. Generated from the task files.
<!-- totals:end -->

## Work items

Bugs (B-) and features (F-) in one list, most urgent first.

### <a id="f-001"></a>[✨ F-001](#top)

**Coordinator repository with harness v10.9.0, the solution profile, the solution order and the gap review**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🟡 Implemented | 🔺 P1 | 🟢 Small | 0.5 h | — | — | 🤖 | — | — |

💻 **→** Next: F-001-T01 — Adopt the harness, the solution profile, the views, the order and the gap review (Implemented; verification pending).

| | |
|---|---|
| **Issue** | The owner (2026-11-24) asked for one private repository where all work of all projects is seen and steered, with records left in their own repositories. |
| **Reproduce** | `npm run check:fast`; `npm run solution:refresh` regenerates `docs/SOLUTION-OVERVIEW.md` and `docs/SOLUTION-DASHBOARD.md` from GitHub. |
| **Check** | CI passes on the first PR; the overview lists every component's open work, owner checks, blocked work, effort, the solution order with live state and the gap review; `check:freshness` ends with the harness on v10.9.0. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | PRs |
|---|---|---|---|---|---|---|
| 🟢 Small | <a id="f-001-t01"></a>F-001-T01 — Adopt the harness, the solution profile, the views, the order and the gap review | 0.5 h | 0 h | 0.5 h | Implemented; verification pending | [PR #1](https://github.com/voidbrain/coordinator/pull/1) adoption, merged; [PR #2](https://github.com/voidbrain/coordinator/pull/2) re-review fixes |
| 🟢 Small | **Total** | 0.5 h | 0 h (0 of 1 steps recorded) | 0.5 h | 0 of 1 completed | |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-001.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-001-T01: [PR #1](https://github.com/voidbrain/coordinator/pull/1) adoption, merged; [PR #2](https://github.com/voidbrain/coordinator/pull/2) re-review fixes. [#1](https://github.com/voidbrain/coordinator/pull/1) |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-24 |

</details>

---

### <a id="f-002"></a>[✨ F-002](#top)

**Owner sets the first solution order**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔺 P1 | 🟢 Small | 0 h | — | — | 🤖 | — | — |

💻 **→** Next: F-002-T02 — Land the owner's order in a PR that changes only the list (Implemented; verification pending).

| | |
|---|---|
| **Issue** | The seeded order is a proposal from the components' P1 and P2 work, not the owner's order. |
| **Reproduce** | Open `docs/solution-order.md`: its Order section says "Proposal of 2026-11-24". |
| **Check** | The owner's order is landed in a small PR and the "Proposal" sentence is replaced by the date the owner set it. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Who | PRs |
|---|---|---|---|---|---|:---:|---|
| 🟢 Small | <a id="f-002-t02"></a>F-002-T02 — Land the owner's order in a PR that changes only the list | 0.25 h | 0.25 h so far (stated) | 0 h | Implemented; verification pending | 🤖 | [PR #4](https://github.com/voidbrain/coordinator/pull/4) the owner's order |
| 🟢 Small | **Total** | 0.25 h (1 of 2 steps) | 0.25 h (1 of 2 steps recorded) | 0 h | 1 of 2 completed | | |

<details><summary>Done steps (1)</summary>

| Effort | Step | Estimate | Actual | Status | PRs |
|---|---|---|---|---|---|
| — | <a id="f-002-t01"></a>F-002-T01 — Owner decides the first solution order | — | 0 h | Completed | — |

</details>

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-002.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-002-T02: [PR #4](https://github.com/voidbrain/coordinator/pull/4) the owner's order. — |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-24 |

</details>

---

### <a id="f-003"></a>[✨ F-003](#top)

**Owner accepts or rejects the first gap-review proposals**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔺 P1 | 🟢 Small | 0.25 h | — | — | 🤖 | — | — |

💻 **→** Next: F-003-T02 — Confirm after the refreshes that each accepted gap is gone (NERV PR #730, gauntlet-protocol PR #85, Grover PR #30, NERV's F-115 closure) (Ready).

| | |
|---|---|
| **Issue** | The first gap review (2026-11-24) found missing cross-repository records, missing estimates and owner checks without a procedure page. The coordinator never edits a component, so each accepted proposal is created in its owning repository. |
| **Reproduce** | `npm run solution:refresh`, then the "Gap review (proposals)" section of `docs/SOLUTION-OVERVIEW.md`. |
| **Check** | Every proposal is accepted or rejected by the owner; accepted ones exist in their owning backlogs (the next refresh no longer lists them); rejected ones are recorded here with the reason. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Who |
|---|---|---|---|---|---|:---:|
| 🟢 Small | <a id="f-003-t02"></a>F-003-T02 — Confirm after the refreshes that each accepted gap is gone (NERV PR #730, gauntlet-protocol PR #85, Grover PR #30, NERV's F-115 closure) | 0.25 h | 0 h | 0.25 h | Ready | 🤖 |
| 🟢 Small | **Total** | 0.25 h (1 of 2 steps) | 0 h (0 of 2 steps recorded) | 0.25 h | 1 of 2 completed | |

<details><summary>Done steps (1)</summary>

| Effort | Step | Estimate | Actual | Status |
|---|---|---|---|---|
| — | <a id="f-003-t01"></a>F-003-T01 — Owner accepts or rejects each gap-review proposal | — | 0 h | Completed |

</details>

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-003.md)

| Field | Value |
|---|---|
| PR / evidence | — |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-24 |

</details>

---

### <a id="f-004"></a>[✨ F-004](#top)

**Propose the solution order, hours, runway, gap review, cross-repository dependencies and on-demand backlog views to the template**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔶 P2 | 🟡 Medium | 2 h agent + 1 h owner | — | — | ⏳ | 🧑‍🔧 | — |

🧑 **→** Next: [🧑‍🔧](proposals/solution-order-in-template.md) F-004-T01 — Owner takes the template proposal to a project-harness session (Ready).

| | |
|---|---|
| **Issue** | The solution order, the overview sections and the gap review are project content here because the template has none; two proposals for every project are written down for the owner. |
| **Reproduce** | Read `docs/proposals/solution-order-in-template.md`. |
| **Check** | The owner has taken the proposal to the template; once a template release covers it, this repository reconciles to it and removes `tools/solution-overview.mjs` or keeps only what the release leaves project-specific. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | Who |
|---|---|---|---|---|---|---|---|:---:|
| 🟢 Small | <a id="f-004-t01"></a>F-004-T01 — Owner takes the template proposal to a project-harness session | — | 0 h | 0 h agent + 1 h owner | Ready | — | [F-004-T02](#f-004-t02) | [🧑‍🔧](proposals/solution-order-in-template.md) |
| 🟡 Medium | <a id="f-004-t02"></a>F-004-T02 — Reconcile to the template release that ships the proposal and retire the project tool | 2 h | 0 h | 2 h | Planned | [F-004-T01](#f-004-t01) | — | ⏳ 🤖 |
| 🟡 Medium | **Total** | 2 h (1 of 2 steps) | 0 h (0 of 2 steps recorded) | 2 h agent + 1 h owner | 0 of 2 completed | | | |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-004.md)

| Field | Value |
|---|---|
| PR / evidence | — |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-24 |

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

### <a id="f-008"></a>[✨ F-008](#top)

**Daily refresh of the solution views as a PR**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🟡 Implemented | 🔶 P2 | 🟡 Medium | 1.25 h agent + 0.25 h owner | — | — | 🤖 | — | 🤔 |

💻 **→** Next: F-008-T01 — Daily refresh workflow: first run after the merge, linked (Implemented; verification pending).

| | |
|---|---|
| **Issue** | The owner decided a daily refresh proposed as a PR (F-005). |
| **Reproduce** | `.github/workflows/refresh-views.yml`: daily at 05:30 UTC and on demand. |
| **Check** | A run regenerates both views from GitHub, runs the offline checks, and when anything besides the snapshot time and this repository's own revision changed, pushes `chore/refresh-solution-views` (no force-push), opens or updates the PR "chore: refresh solution views" and starts CI on it; an unchanged day opens nothing. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | Who | PRs |
|---|---|---|---|---|---|---|---|:---:|---|
| 🟢 Small | <a id="f-008-t01"></a>F-008-T01 — Daily refresh workflow: first run after the merge, linked | 0.25 h | 0 h | 0.25 h | Implemented; verification pending | — | — | 🤖 | [PR #2](https://github.com/voidbrain/coordinator/pull/2) workflow fixes; [PR #3](https://github.com/voidbrain/coordinator/pull/3) first refresh PR, no counting check |
| 🟢 Small | <a id="f-008-t02"></a>F-008-T02 — Owner decides how refresh PRs get a check that counts | — | 0 h | 0 h agent + 0.25 h owner | Ready | — | [F-008-T03](#f-008-t03) | [🤔](decisions/refresh-pr-checks.md) | — |
| 🟢 Small | <a id="f-008-t03"></a>F-008-T03 — Apply the decision to the refresh workflow and land one refresh PR on a counting check | 1 h | 0 h | 1 h | Planned | [F-008-T02](#f-008-t02) | — | ⏳ 🤖 | — |
| 🟡 Medium | **Total** | 1.25 h (2 of 3 steps) | 0 h (0 of 3 steps recorded) | 1.25 h agent + 0.25 h owner | 0 of 3 completed | | | | |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-008.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-008-T01: [PR #2](https://github.com/voidbrain/coordinator/pull/2) workflow fixes; [PR #3](https://github.com/voidbrain/coordinator/pull/3) first refresh PR, no counting check. [#1](https://github.com/voidbrain/coordinator/pull/1) |
| Opened | 2026-11-24 |
| Verification | Pending: first run after merge |
| Reviewed | 2026-11-24 |

</details>

---

## Other changes

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
