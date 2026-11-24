# Coordinator backlog

Current work ledger, reviewed 24 November 2026 against main `e03eb0c`. Cross-repository work only; each component's work lives in its own backlog ([overview](SOLUTION-OVERVIEW.md)). [Rules](BACKLOG-RULES.md) · [Archive 2026](archive/backlog-2026.md) · [Reading the records](#how-to-use-this-file).

## Work items

Bugs (B-) and features (F-) in one list, most urgent first.

### F-001

**Coordinator repository with harness v10.9.0, the solution profile, the solution order and the gap review**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🟡 | 🔺 P1 | Implemented | 🟢 Small |

💻 **→ Human action required: No**<br />Let PR #1's CI run; it closes on green.

| | |
|---|---|
| **Issue** | The owner (2026-11-24) asked for one private repository where all work of all projects is seen and steered, with records left in their own repositories. |
| **Reproduce** | `npm run check:fast`; `npm run solution:refresh` regenerates `docs/SOLUTION-OVERVIEW.md` and `docs/SOLUTION-DASHBOARD.md` from GitHub. |
| **Check** | CI passes on the first PR; the overview lists every component's open work, owner checks, blocked work, effort, the solution order with live state and the gap review; `check:freshness` ends with the harness on v10.9.0. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Applied core and the solution profile from template v10.9.0 on `harness/agent-harness`; manifest with five components; project tool `tools/solution-overview.mjs` for the order, owner, blocked, effort and gap sections the template dashboard does not have (proposed for the template, F-004). Review fixes on the same PR: unknown headings, summary tables and statuses are reported as problems (failing tests first), Prettier and ESLint on the project's own tools and tests, fixture tests for the generated, authored and empty layouts run in CI and in `--check`. Closes on PR #1's green CI.

**Estimates:** Small remaining effort. Estimated 2026-11-24; not acceptance evidence.

| Field | Value |
|---|---|
| PR / evidence | [#1](https://github.com/voidbrain/coordinator/pull/1) |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-24 |

</details>

---

### F-002

**Owner sets the first solution order**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔴 | 🔺 P1 | Open | 🟢 Small |

🧑 **→ Human action required: Decision**<br />Read the proposed order in [docs/solution-order.md](solution-order.md) and its live states in the [overview](SOLUTION-OVERVIEW.md#solution-order); reply with the order you want (for example "move grover:F-003 to 1, drop nerv:F-021").

| | |
|---|---|
| **Issue** | The seeded order is a proposal from the components' P1 and P2 work, not the owner's order. |
| **Reproduce** | Open `docs/solution-order.md`: its Order section says "Proposal of 2026-11-24". |
| **Check** | The owner's order is landed in a small PR and the "Proposal" sentence is replaced by the date the owner set it. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Waits on the owner's reorder; then one PR that changes only the list.

**Estimates:** Small remaining effort. Estimated 2026-11-24; not acceptance evidence.

| Field | Value |
|---|---|
| PR / evidence | — |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-24 |

</details>

---

### F-003

**Owner accepts or rejects the first gap-review proposals**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔴 | 🔺 P1 | Open | 🟢 Small |

🧑 **→ Human action required: Decision**<br />Read the [gap review](SOLUTION-OVERVIEW.md#gap-review-proposals) and reply with the row numbers to create; each becomes a record or step in its own repository, created in a session of that repository.

| | |
|---|---|
| **Issue** | The first gap review (2026-11-24) found missing cross-repository records, missing estimates and owner checks without a procedure page. The coordinator never edits a component, so each accepted proposal is created in its owning repository. |
| **Reproduce** | `npm run solution:refresh`, then the "Gap review (proposals)" section of `docs/SOLUTION-OVERVIEW.md`. |
| **Check** | Every proposal is accepted or rejected by the owner; accepted ones exist in their owning backlogs (the next refresh no longer lists them); rejected ones are recorded here with the reason. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Waits on the owner's choice. Accepted proposals are created by sessions in their owning repositories; this record only tracks the owner's disposition and the refresh that shows them gone.

**Estimates:** Small remaining effort. Estimated 2026-11-24; not acceptance evidence.

| Field | Value |
|---|---|
| PR / evidence | — |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-24 |

</details>

---

### F-004

**Propose the solution order, the gap review and on-demand backlog views to the template**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔴 | 🔶 P2 | Open | 🟢 Small |

🧑 **→ Human action required: Procedure**<br />Take [docs/proposals/solution-order-in-template.md](proposals/solution-order-in-template.md) to a project-harness session; when a release ships it, this repository reconciles and drops its project tool.

| | |
|---|---|
| **Issue** | The solution order, the overview sections and the gap review are project content here because the template has none; two proposals for every project are written down for the owner. |
| **Reproduce** | Read `docs/proposals/solution-order-in-template.md`. |
| **Check** | The owner has taken the proposal to the template; once a template release covers it, this repository reconciles to it and removes `tools/solution-overview.mjs` or keeps only what the release leaves project-specific. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** The template change itself is the template's work and record, never this backlog's. This record closes when the owner has dispositioned the proposal and any released replacement has been reconciled here.

**Estimates:** Small remaining effort. Estimated 2026-11-24; not acceptance evidence.

| Field | Value |
|---|---|
| PR / evidence | — |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-24 |

</details>

---

### F-008

**Daily refresh of the solution views as a PR**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🟡 | 🔶 P2 | Implemented | 🟢 Small |

💻 **→ Human action required: No**<br />After PR #1 merges, start the Refresh solution views workflow once by hand (`gh workflow run refresh-views.yml --repo voidbrain/coordinator`) and link the run here.

| | |
|---|---|
| **Issue** | The owner decided a daily refresh proposed as a PR (F-005). |
| **Reproduce** | `.github/workflows/refresh-views.yml`: daily at 05:30 UTC and on demand. |
| **Check** | A run regenerates both views from GitHub, runs the offline checks, and when anything besides the snapshot time and this repository's own revision changed, pushes `chore/refresh-solution-views` (no force-push) and opens or updates the PR "chore: refresh solution views"; an unchanged day opens nothing. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Workflow added in PR #1 with `contents: write` and `pull-requests: write` only; CI stays `contents: read`. A scheduled or dispatched workflow runs only from the default branch, so the first run follows the merge. A PR opened with the workflow token does not start the CI workflow, so the refresh workflow runs the offline checks itself before pushing. A refresh with source problems fails the run and opens no PR; GitHub's failed-run notification reports it. Closes on the first successful run, linked here.

**Estimates:** Small remaining effort. Estimated 2026-11-24; not acceptance evidence.

| Field | Value |
|---|---|
| PR / evidence | [#1](https://github.com/voidbrain/coordinator/pull/1) |
| Opened | 2026-11-24 |
| Verification | Pending: first run after merge |
| Reviewed | 2026-11-24 |

</details>

---

### F-006

**NERV delivers Grover alerts end to end**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔴 | 🔶 P2 | Open | 🟡 Medium |

💻 **→ Human action required: No**<br />Once grover:F-008 lands its alerts tool, record the contract (`grover_alerts`) in docs/SOLUTION.md and the end-to-end check NERV must pass.

| | |
|---|---|
| **Issue** | Grover F-008 says NERV delivers its alerts through NERV's own pack, recorded in NERV's backlog; NERV has no such record yet (gap review, kind 1). |
| **Reproduce** | Grover `docs/DESIGN.md`, "Alerts" and "NERV"; NERV's backlog has no record mentioning Grover. |
| **Check** | An alert raised on a running Grover hub reaches the owner through NERV; the contract and the check are in docs/SOLUTION.md. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Coordination only: the alert tool is Grover's work, its delivery NERV's. The NERV-side record is a gap-review proposal for the owner (F-003).

**Estimates:** Medium remaining effort, mostly waiting on the components. Estimated 2026-11-24; not acceptance evidence.

| Field | Value |
|---|---|
| PR / evidence | — |
| Components | grover:F-008 |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-24 |

</details>

---

### F-007

**NERV capability coverage in the Gauntlet across both repositories**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔴 | 🔶 P2 | Open | 🟢 Small |

💻 **→ Human action required: No**<br />Record in docs/SOLUTION.md which Gauntlet release NERV needs for nerv:F-120 and the check that shows its cases run.

| | |
|---|---|
| **Issue** | nerv:F-120 waits on domain packs requested from gauntlet-protocol the same day; gauntlet-protocol has no open record for them (gap review, kind 1). |
| **Reproduce** | nerv F-120 Issue; gauntlet-protocol backlog: no open records on 2026-11-24. |
| **Check** | The required gauntlet-protocol release and NERV's vendored version are named in docs/SOLUTION.md, and a Gauntlet run of the new NERV cases is linked. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Coordination only; the packs are gauntlet-protocol's work and the coverage NERV's. The gauntlet-protocol record is a gap-review proposal for the owner (F-003).

**Estimates:** Small remaining effort. Estimated 2026-11-24; not acceptance evidence.

| Field | Value |
|---|---|
| PR / evidence | — |
| Components | nerv:F-120 |
| Opened | 2026-11-24 |
| Verification | Pending |
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
