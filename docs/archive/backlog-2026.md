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

### F-001

**Coordinator repository with harness v10.9.0, the solution profile, the solution order and the gap review**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P1 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-25: PR #1 and PR #2 merged on green CI (ci:status 2026-11-25); refresh runs since regenerate both views (PR #24); check:freshness reports the harness on v10.20.0, past the v10.9.0 the check names (F-009).

| | |
|---|---|
| **Issue** | The owner (2026-11-24) asked for one private repository where all work of all projects is seen and steered, with records left in their own repositories. |
| **Reproduce** | `npm run check:fast`; `npm run solution:refresh` regenerates `docs/SOLUTION-OVERVIEW.md` and `docs/SOLUTION-DASHBOARD.md` from GitHub. |
| **Check** | CI passes on the first PR; the overview lists every component's open work, owner checks, blocked work, effort, the solution order with live state and the gap review; `check:freshness` ends with the harness on v10.9.0. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-25: PR #1 and PR #2 merged on green CI (ci:status 2026-11-25); refresh runs since regenerate both views (PR #24); check:freshness reports the harness on v10.20.0, past the v10.9.0 the check names (F-009). Applied core and the solution profile from template v10.9.0 on `harness/agent-harness`; manifest with five components; project tool `tools/solution-overview.mjs` for the order, owner, blocked, effort and gap sections the template dashboard does not have (proposed for the template, F-004). Review fixes on the same PR: unknown headings, summary tables and statuses are reported as problems (failing tests first), Prettier and ESLint on the project's own tools and tests, fixture tests for the generated, authored and empty layouts run in CI and in `--check`. Re-review fixes and the owner's additions on the same PR: refresh branch preparation and CI on the refresh PR, Blocked records in the runway, hours for this backlog (task files), and the overview of all projects (summary, order table, blocked, nothing to do, audits, harness, emojis). PR #1 merged 2026-11-24 (1c69fee); the re-review fixes and these additions are in PR #2. Closes on PR #2's green CI.

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | [#1](https://github.com/voidbrain/coordinator/pull/1); [#2](https://github.com/voidbrain/coordinator/pull/2) |
| Opened | 2026-11-24 |
| Verification | 2026-11-25: ci:status #1 and #2 green; Refresh solution views merged as PR #24; check:freshness on harness v10.20.0. Review: independent review of PR #1, its findings fixed in PR #2 (record evidence above). Closed 2026-11-25 |
| Reviewed | 2026-11-24 |

</details>

---

### F-002

**Owner sets the first solution order**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P1 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-25: PR #4 (owner's order, dated 2026-11-24 in docs/solution-order.md) and PR #11 (owner's reorder of 2026-11-25) merged on green CI (ci:status 2026-11-25).

| | |
|---|---|
| **Issue** | The seeded order is a proposal from the components' P1 and P2 work, not the owner's order. |
| **Reproduce** | Open `docs/solution-order.md`: its Order section says "Proposal of 2026-11-24". |
| **Check** | The owner's order is landed in a small PR and the "Proposal" sentence is replaced by the date the owner set it. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-25: PR #4 (owner's order, dated 2026-11-24 in docs/solution-order.md) and PR #11 (owner's reorder of 2026-11-25) merged on green CI (ci:status 2026-11-25). Waits on the owner's reorder; then one PR that changes only the list.

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | [#4](https://github.com/voidbrain/coordinator/pull/4); [#11](https://github.com/voidbrain/coordinator/pull/11) |
| Opened | 2026-11-24 |
| Verification | 2026-11-25: ci:status #4 and #11 green; docs/solution-order.md says 'Set by the owner on 2026-11-24'. No review: order-list and record changes only, no behaviour. Closed 2026-11-25 |
| Reviewed | 2026-11-24 |

</details>

---

### B-001

**The daily refresh fails when a solution-order item closed in its own repository**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P1 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-25: PR #16 (fix, failing-first tests) and PR #18 (verification) merged on green CI; Refresh solution views run 45575332245 green and PR #17 merged.

| | |
|---|---|
| **Issue** | The Refresh solution views workflow failed twice on 2026-11-25 with "X is not in Y's active backlog; remove it or fix the ID": nerv:B-121 (run 45561411464) and gauntlet-protocol:F-015, F-016 and F-017 (run 45573198859). Each had closed and moved to its repository's archive; nothing refreshed until the order was edited by hand. |
| **Reproduce** | Order an item, close and archive it in its repository, run `npm run solution:refresh`: it exits 1 with the problem above. |
| **Check** | An order item found in its repository's archive (or closed in its work-item data) shows ✅ Done with where it closed and the refresh succeeds; the refresh drops it from docs/solution-order.md and renumbers (the order's rule "A closed or archived item is removed in the next reorder or refresh PR"); an ID in neither the active backlog nor the archive still fails. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-25: PR #16 (fix, failing-first tests) and PR #18 (verification) merged on green CI; Refresh solution views run 45575332245 green and PR #17 merged. Close and archive at the next reconciliation. 2026-11-25: verified after PR #16 merged on green CI: [Refresh solution views run 45575332245](https://github.com/voidbrain/coordinator/actions/runs/45575332245) on main succeeded (0 problems) and its PR [#17](https://github.com/voidbrain/coordinator/pull/17) merged on green CI; no Done items were in the order that day, so the drop path was shown by the live local check below. 2026-11-25 (B-001-T01): an order item missing from its active backlog is looked up in its repository's archive (`docs/archive/backlog-*.md`, the manifest's `archives`) and work-item data; found, it shows ✅ Done with where it closed (linked) and is no problem, and `--write` drops it from docs/solution-order.md and renumbers (the order's rule allows removal in a refresh PR). The workflow commits the order with the views; refresh-branch takes main's order on a conflict. An ID in neither place still fails. Test first: 732d553 failed (no `closedIn` export; order conflict aborted the merge). One earlier expectation changed deliberately: the gap-review evidence for a missing order item now reads "not in X's active backlog or its archive". Review: design-reviewer in a fresh context, no blocker; should-fix 1 (a mistyped step of an archived record passed as Done) fixed test first: the archived section must name the step; should-fix 2 (no test across build and --write) answered: needs GitHub, covered by the live check below and the Refresh run on main; minors: refresh-branch comment says the refresh step re-prunes, Done rows keep their old number in the view by design. Live check: `--remote --write` with nerv:B-121, gauntlet-protocol:F-015 and F-016-T02 and a bogus nerv:F-998 appended: three ✅ Done and dropped, F-998 the one problem.

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | [PR #16](https://github.com/voidbrain/coordinator/pull/16) (Test: test/solution-overview.test.mjs, closed order items; test/refresh-branch.test.mjs, order conflict) |
| Opened | 2026-11-25 |
| Verification | Unit 2026-11-25: npm test 27/27 (Test: test/solution-overview.test.mjs, closed order items; test/refresh-branch.test.mjs, order conflict). Refresh run on main 2026-11-25: run 45575332245 green, PR #17 merged. Review: design-reviewer in a fresh context on PR #16, no blocker. Closed 2026-11-25 |
| Reviewed | 2026-11-25 |

</details>

---

### F-010

**Refresh PRs merge themselves on green**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P3 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-25: PR #31 merged on green CI; refresh PR #32 merged itself on green; after the owner turned on delete_branch_on_merge, dispatched run 45625090928 opened PR #34, which merged itself after `check` passed and its branch was deleted (404).

| | |
|---|---|
| **Issue** | Owner decision 2026-11-25: refresh PRs merge themselves once every check passes, then their branch is deleted. The lander had to merge each one by hand (F-008). The repository is public since 2026-11-25 (owner), so main can be branch-protected. |
| **Reproduce** | The Refresh solution views workflow opens `chore: refresh solution views` and stops; nothing merges it until an agent runs merge-when-green. |
| **Check** | main's branch protection requires the CI check `check` (PR required, 0 approvals, admins included, no force-push or deletion); `allow_auto_merge` is on and Actions-can-approve stays off; a dispatched refresh opens a PR that merges itself after `check` passes and its branch is deleted; a refresh PR that changes another file gets a comment and no auto-merge (`test/refresh-guard.test.mjs`). |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-25: PR #31 merged on green CI; refresh PR #32 merged itself on green; after the owner turned on delete_branch_on_merge, dispatched run 45625090928 opened PR #34, which merged itself after `check` passed and its branch was deleted (404). 2026-11-25: owner applied branch protection (required check `check`) and allow_auto_merge; PR #31 merged on green. Dispatched refresh run 45624037674: guard ok, auto-merge enabled on PR #32, which merged itself after `check` passed (13:30:19Z). Not deleted: `chore/refresh-solution-views`, because `gh pr merge --auto --delete-branch` deletes nothing when GitHub merges later and `delete_branch_on_merge` is false. Owner decision: turn on "Automatically delete head branches" (`gh api -X PATCH repos/voidbrain/coordinator -F delete_branch_on_merge=true`), or accept that the next run's `tools/refresh-branch.mjs` deletes the leftover branch. Then dispatch one more refresh and close F-010-T02. 2026-11-25: owner turned on delete_branch_on_merge (`gh api repos/voidbrain/coordinator -q .delete_branch_on_merge` prints true). Dispatched refresh run 45625090928: guard ok, auto-merge enabled on PR #34, which merged itself at 13:36:31Z after `check` passed; `gh api repos/voidbrain/coordinator/branches/chore/refresh-solution-views` then returned 404.

**Estimates:** No remaining effort. Baseline 2026-11-25: T01 1 h agent, T02 0.25 h agent; actual (stated) T01 1.5 h, T02 0.25 h.

| Field | Value |
|---|---|
| PR / evidence | Recorded in [PR #33](https://github.com/voidbrain/coordinator/pull/33); [PR #31](https://github.com/voidbrain/coordinator/pull/31) merged; refresh [PR #32](https://github.com/voidbrain/coordinator/pull/32) merged itself; refresh [PR #34](https://github.com/voidbrain/coordinator/pull/34) merged itself and its branch was deleted |
| Components | — |
| Opened | 2026-11-25 |
| Verification | 2026-11-25: self-merge verified (PR #32, PR #34); branch deletion verified (PR #34, branch 404). Closed 2026-11-25 |
| Reviewed | 2026-11-25 |

</details>

---
