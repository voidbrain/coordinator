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

## Closed 2026-11-25

### F-008

**Daily refresh of the solution views as a PR**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P2 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-25: PR #6 merged on green CI; dispatched refresh run 45507081422 opened PR #7 with REFRESH_TOKEN, whose pull_request CI (run 45507149360) started by itself and showed as its check; PR #7 landed with merge-when-green on 2026-11-24.

| | |
|---|---|
| **Issue** | The owner decided a daily refresh proposed as a PR (F-005). |
| **Reproduce** | `.github/workflows/refresh-views.yml`: daily at 05:30 UTC and on demand. |
| **Check** | A run regenerates both views from GitHub, runs the offline checks, and when anything besides the snapshot time and this repository's own revision changed, pushes `chore/refresh-solution-views` (no force-push), opens or updates the PR "chore: refresh solution views" with `REFRESH_TOKEN`, so CI runs on it by itself; an unchanged day opens nothing. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-25: PR #6 merged on green CI; dispatched refresh run 45507081422 opened PR #7 with REFRESH_TOKEN, whose pull_request CI (run 45507149360) started by itself and showed as its check; PR #7 landed with merge-when-green on 2026-11-24. Workflow added in PR #1 and fixed in PR #2 with `contents: write`, `pull-requests: write` and `actions: write` only; CI stays `contents: read`. A scheduled or dispatched workflow runs only from the default branch, so the first run follows the merge of PR #2 (the copy merged with PR #1 lacks the re-review fixes; until then a scheduled run of it can open a refresh PR that CI does not check). A push or PR made with the workflow token starts no workflow, so the refresh workflow starts CI on its branch with `gh workflow run` (CI has `workflow_dispatch`); the lander merges the refresh PR on green CI like any PR. Re-review of PR #1: an open refresh branch is brought up to date by merging main, taking main's copy when only the generated views conflict (`tools/refresh-branch.mjs`, tested on throwaway repositories); any other conflict fails the run; with no open refresh PR the branch starts again from main. Only main's tools run with write access, since main cannot be branch-protected on this plan. The repository setting that lets Actions create PRs also lets them approve, which has no effect while no review is required. A refresh with source problems fails the run and opens no PR. Closes on the first successful run, linked here. First run 2026-11-24 (run 45503340953): the branch started from main and PR #3 opened; the dispatched CI run passed on the branch head, but PR #3 shows no checks and its own pull_request run waits for approval because a bot opened the PR. The owner approved that run; it passed and the owner merged PR #3. The owner then chose option B ([decision page](../decisions/refresh-pr-checks.md), F-008-T02): the branch is pushed and the PR opened with the repository secret `REFRESH_TOKEN`, so CI starts by itself; the workflow token is read-only and the dispatch step is gone (F-008-T03, PR #6).

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | [#1](https://github.com/voidbrain/coordinator/pull/1) |
| Opened | 2026-11-24 |
| Verification | Owner decisions F-005 (daily refresh as a PR) and F-008-T02 (option B) applied; first manual run and a refresh PR landed on its own CI check, 2026-11-24. |
| Reviewed | 2026-11-24 |

</details>

---

### F-003

**Owner accepts or rejects the first gap-review proposals**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P1 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-25: Owner disposition F-003-T01 (accept all, 2026-11-24); F-003-T02: gaps 2 to 7 gone in the 2026-11-25 09:32 UTC refresh (coordinator PR #21); gap 1 resolved by owner decision 2026-11-25 (gauntlet-protocol v0.10.0 and v0.11.0, NERV adopts in nerv:F-120-T03, nerv PR #749).

| | |
|---|---|
| **Issue** | The first gap review (2026-11-24) found missing cross-repository records, missing estimates and owner checks without a procedure page. The coordinator never edits a component, so each accepted proposal is created in its owning repository. |
| **Reproduce** | `npm run solution:refresh`, then the "Gap review (proposals)" section of `docs/SOLUTION-OVERVIEW.md`. |
| **Check** | Every proposal is accepted or rejected by the owner; accepted ones exist in their owning backlogs (the next refresh no longer lists them); rejected ones are recorded here with the reason. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-25: Owner disposition F-003-T01 (accept all, 2026-11-24); F-003-T02: gaps 2 to 7 gone in the 2026-11-25 09:32 UTC refresh (coordinator PR #21); gap 1 resolved by owner decision 2026-11-25 (gauntlet-protocol v0.10.0 and v0.11.0, NERV adopts in nerv:F-120-T03, nerv PR #749). Waits on the owner's choice. Accepted proposals are created by sessions in their owning repositories; this record only tracks the owner's disposition and the refresh that shows them gone. 2026-11-25 (F-003-T02, refresh 09:32 UTC): proposals 2 to 7 are gone; proposal 1 remains, because gauntlet-protocol's open records (B-003, F-021, F-022) never name nerv, so nerv:F-120 still has no counterpart.

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | — |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---
