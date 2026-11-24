# <a id="top"></a>Example backlog

Generated ledger layout (work items with steps). Invented content for tests.

<!-- totals:start -->
**Remaining effort:** 4 h agent + 0.5 h owner across 4 open steps of 2 features and 1 other record. Generated from the task files.
<!-- totals:end -->

## Work items

### Require Human 🧑

| Features | | Bugs | |
|---|---|---|---|
| **Procedures 🧑‍🔧** | **Decisions 🤔** | **Procedures 🧑‍🔧** | **Decisions 🤔** |
| [F-001](#f-001) | — | — | — |

### <a id="f-001"></a>[✨ F-001](#top)

**Import a parts list from a spreadsheet**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔺 P1 | 🟡 Medium | 3 h agent + 0.5 h owner | — | — | 🤖 | 🧑‍🔧 | — |

💻 **→** Next: F-001-T02 — Read the columns (Ready).

| | |
|---|---|
| **Issue** | Parts are typed by hand. The sample sheets are requested from widget-lab and tracked in that repository. |
| **Reproduce** | Open the import page. |
| **Check** | A sheet with three parts imports three rows. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | Who | PRs |
|---|---|---|---|---|---|---|---|:---:|---|
| 🟡 Medium | <a id="f-001-t02"></a>F-001-T02 — Read the columns | 2 h | 0 h | 2 h | Ready | — | [F-001-T03](#f-001-t03) | 🤖 | — |
| 🟢 Small | <a id="f-001-t03"></a>F-001-T03 — Map units | 1 h | 0 h | 1 h | Planned | [F-001-T02](#f-001-t02) | — | ⏳ 🤖 | — |
| 🟢 Small | <a id="f-001-t04"></a>F-001-T04 — Owner imports a real sheet | — | 0 h | 0 h agent + 0.5 h owner | Ready | — | — | 🧑‍🔧 | — |
| 🟡 Medium | **Total** | 3 h | 0 h | 3.5 h | 1 of 4 completed | | | | |

<details><summary>Done steps (1)</summary>

| Effort | Step | Estimate | Actual | Status | PRs |
|---|---|---|---|---|---|
| — | <a id="f-001-t01"></a>F-001-T01 — Agree the sheet format | 0.25 h | 0.25 h | Completed | — |

</details>

---

### <a id="b-002"></a>[🐞 B-002](#top)

**Totals are rounded twice**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔶 P2 | 🟢 Small | 1 h | [B-009-T01](#b-009-t01) | — | ⏳ | — | — |

💻 **→** Next: B-002-T01 — Round once (Planned).

| | |
|---|---|
| **Issue** | The total shows 10.01 for 10.005. |
| **Reproduce** | Add 10.005. |
| **Check** | The total shows 10.01 once. |

**Steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks |
|---|---|---|---|---|---|---|---|
| 🟢 Small | <a id="b-002-t01"></a>B-002-T01 — Round once | 1 h | 0 h | 1 h | Planned | [B-009-T01](#b-009-t01) | — |
| 🟢 Small | **Total** | 1 h | 0 h | 1 h | 0 of 1 completed | | |

---

### <a id="f-003"></a>[✨ F-003](#top)

**Dark theme**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔹 P3 | 🟢 Small | 0 h | — | — | — | — | — |

💻 **→** Next: all steps closed; verify and close the record.

| | |
|---|---|
| **Issue** | No dark theme. |
| **Reproduce** | Switch the system to dark. |
| **Check** | The page follows the system theme. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | Who | PRs |
|---|---|---|---|---|---|---|---|:---:|---|
| — | **Total** | 1 h | 1 h | 0 h | 1 of 1 completed | | | | |

<details><summary>Done steps (1)</summary>

| Effort | Step | Estimate | Actual | Status | PRs |
|---|---|---|---|---|---|
| — | <a id="f-003-t01"></a>F-003-T01 — Theme tokens | 1 h | 1 h | Completed | — |

</details>

---
