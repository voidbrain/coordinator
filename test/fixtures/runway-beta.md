# <a id="top"></a>Beta backlog

Generated layout. Runway chain, part 2 (repository `beta`), plus a cycle and a missing prerequisite. Invented content for tests.

## Work items

### <a id="f-002"></a>[✨ F-002](#top)

**Import the exported parts list**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔺 P1 | 🟡 Medium | 2 h agent + 0.5 h owner | alpha:F-001-T01 | — | ⏳ | 🧑‍🔧 | — |

💻 **→** Next: F-002-T01 — Read the CSV (Planned).

| | |
|---|---|
| **Issue** | Parts are typed again. |
| **Reproduce** | — |
| **Check** | The import matches the export. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | Who | PRs |
|---|---|---|---|---|---|---|---|:---:|---|
| 🟢 Small | <a id="f-002-t01"></a>F-002-T01 — Read the CSV | 1 h | 0 h | 1 h | Planned | alpha:F-001-T01 | [F-002-T02](#f-002-t02) | ⏳ 🤖 | — |
| 🟢 Small | <a id="f-002-t02"></a>F-002-T02 — Owner imports a real file | — | 0 h | 0 h agent + 0.5 h owner | Planned | [F-002-T01](#f-002-t01) | [F-002-T03](#f-002-t03) | ⏳ 🧑‍🔧 | — |
| 🟢 Small | <a id="f-002-t03"></a>F-002-T03 — Remove the manual form | 1 h | 0 h | 1 h | Planned | [F-002-T02](#f-002-t02) | — | ⏳ 🤖 | — |
| 🟡 Medium | **Total** | 2 h | 0 h | 2.5 h | 0 of 3 completed | | | | |

---

### <a id="b-003"></a>[🐞 B-003](#top)

**Two steps that wait on each other, and one on a step that does not exist**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔶 P2 | 🟢 Small | 1.5 h | — | — | ⏳ | — | — |

💻 **→** Next: B-003-T01 — First half (Planned).

| | |
|---|---|
| **Issue** | A planning mistake. |
| **Reproduce** | — |
| **Check** | — |

**Steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks |
|---|---|---|---|---|---|---|---|
| 🟢 Small | <a id="b-003-t01"></a>B-003-T01 — First half | 0.5 h | 0 h | 0.5 h | Planned | [B-003-T02](#b-003-t02) | [B-003-T02](#b-003-t02) |
| 🟢 Small | <a id="b-003-t02"></a>B-003-T02 — Second half | 0.5 h | 0 h | 0.5 h | Planned | [B-003-T01](#b-003-t01) | [B-003-T01](#b-003-t01) |
| 🟢 Small | <a id="b-003-t03"></a>B-003-T03 — Finish | 0.5 h | 0 h | 0.5 h | Planned | [B-003-T09](#b-003-t09) | — |
| 🟢 Small | **Total** | 1.5 h | 0 h | 1.5 h | 0 of 3 completed | | |

---
