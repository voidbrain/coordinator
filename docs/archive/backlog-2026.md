# Backlog archive 2026

Closed records of the [backlog](../BACKLOG.md), in closing-date order. History, not current status.

## Closed 2026-11-24

### F-005

**Decide how often the views are refreshed**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | 🔶 P2 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-24: the owner decided (b), a daily refresh proposed as a PR; the workflow and its first run are tracked in F-008.

| | |
|---|---|
| **Issue** | The views are snapshots; nothing refreshes them between sessions. A scheduled refresh needs a workflow with `contents: write` and `pull-requests: write` on this repository (a repository setting the owner approves). |
| **Reproduce** | Compare the snapshot time at the top of `docs/SOLUTION-OVERVIEW.md` with the latest merge in any component. |
| **Check** | The owner's choice is recorded here; for (b) or (c) a workflow refreshes and opens a PR, and its first run is linked. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Owner decision 2026-11-24, in the owner's words: "F-005 decided: refresh the views DAILY; automatic refresh APPROVED, including the repository setting it needs." The owner also asked for a PR "chore: refresh solution views" rather than a direct push to main, with only the permissions the workflow needs and CI kept read-only. The repository setting "Allow GitHub Actions to create and approve pull requests" was enabled the same day on the owner's approval (`can_approve_pull_request_reviews: true`, default workflow permissions left at read). Implementation and its first run: F-008 ([PR #1](https://github.com/voidbrain/coordinator/pull/1)).

**Estimates:** Small remaining effort. Estimated 2026-11-24; not acceptance evidence.

| Field | Value |
|---|---|
| PR / evidence | [#1](https://github.com/voidbrain/coordinator/pull/1) |
| Opened | 2026-11-24 |
| Verification | Owner decision recorded 2026-11-24 |
| Reviewed | 2026-11-24 |

</details>

---

