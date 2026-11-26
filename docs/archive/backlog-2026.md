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
| Closed in | 2026-11-25 (dated correction): [PR #35](https://github.com/voidbrain/coordinator/pull/35) recorded F-010-T02 and closed F-010 |
| Components | — |
| Opened | 2026-11-25 |
| Verification | 2026-11-25: self-merge verified (PR #32, PR #34); branch deletion verified (PR #34, branch 404). Closed 2026-11-25 |
| Reviewed | 2026-11-25 |

</details>

---

### F-004

**Propose the solution order, hours, runway, gap review, cross-repository dependencies and on-demand backlog views to the template**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P2 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-25: PR #39 reconciled to harness v10.21.1, whose dashboard carries the overview's layout (Proposals 1–4 taken to the template: project-harness F-095, F-096, F-097, B-057, B-058, F-099, B-059); the project overview tool, its tests, scripts, CI steps and page are removed (F-004-T05, parity compared on the same component commits; remaining differences in F-004-T05). Closes on PR #39's green CI.

| | |
|---|---|
| **Issue** | The solution order, the overview sections and the gap review are project content here because the template has none; two proposals for every project are written down for the owner. |
| **Reproduce** | Read `docs/proposals/solution-order-in-template.md`. |
| **Check** | The owner has taken the proposal to the template; once a template release covers it, this repository reconciles to it and removes `tools/solution-overview.mjs` or keeps only what the release leaves project-specific. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-25: PR #39 reconciled to harness v10.21.1, whose dashboard carries the overview's layout (Proposals 1–4 taken to the template: project-harness F-095, F-096, F-097, B-057, B-058, F-099, B-059); the project overview tool, its tests, scripts, CI steps and page are removed (F-004-T05, parity compared on the same component commits; remaining differences in F-004-T05). Closes on PR #39's green CI. 2026-11-25: reconciled to 10.20.1, which fixes both Proposal 3 defects (project-harness B-057, B-058); F-004-T03 and F-004-T02 closed. The refresh runs the template's `dashboard --write --prune-order`; the overview's own pruning is gone. The overview stays for its layout only (Proposal 4 in `docs/proposals/solution-order-in-template.md`): F-004-T04, the owner takes Proposal 4 to the template; F-004-T05 then retires the overview. Review: design-reviewer in a fresh context on PR #29, no blockers; F-004-T02 retitled and the prune record documented in the area notes; the record's own cue stays No while T04's 🧑‍🔧 shows (steps rule). The template change itself is the template's work and record, never this backlog's. Earlier, 2026-11-25: reconciled to 10.20.0 (with F-009-T01); the order uses the template's format.

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | [#23](https://github.com/voidbrain/coordinator/pull/23); [#29](https://github.com/voidbrain/coordinator/pull/29); [#39](https://github.com/voidbrain/coordinator/pull/39) |
| Opened | 2026-11-24 |
| Verification | Parity of the template dashboard with the retired overview compared 2026-11-25 on the same component commits (F-004-T05) |
| Reviewed | 2026-11-25 |

</details>

---

## Closed 2026-11-26

### F-015

**Reconcile project-harness v10.21.2 → v10.21.4; dashboard display names and layout**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P3 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-26: PR #54 merged on green CI; refresh PR #55 merged; dashboard on main shows display names, Total row with empty Harness cell, U+2011 dates, top-aligned HTML rows and <br>/collapsed multi-value cells.

| | |
|---|---|
| **Issue** | `.harness.json` names v10.21.2 while the template released v10.21.3. Gap review 2026-11-26, proposal 11 ("Behind the harness"), accepted by the owner (F-014). 2026-11-26: the owner asked for display names per project, a Total row, unbroken dates, top-aligned cells and short lists in the dashboard; the template shipped them in v10.21.4 (project-harness:F-101), so this reconcile goes to v10.21.4. |
| **Reproduce** | `npm run check:freshness` on `main`: it reports the harness template v10.21.3. |
| **Check** | `.harness.json` names v10.21.4; `check:freshness` reports no harness update; `check:fast` and CI on the PR pass; after the next refresh the dashboard shows the display names (Coordinator, NERV, Gauntlet, Harness, FPVBuddy, Grover, OpenBando, Hobo, Bricks), a Total row with an empty Harness cell, dates that do not wrap, top-aligned cells and multi-value cells one item per line. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-26: PR #54 merged on green CI; refresh PR #55 merged; dashboard on main shows display names, Total row with empty Harness cell, U+2011 dates, top-aligned HTML rows and <br>/collapsed multi-value cells. Opened 2026-11-26 from the gap review (proposal 11). F-015-T01 does the reconcile under APPLY.md. 2026-11-26: F-015-T01 implemented to v10.21.4: copied `tools/solution.mjs`, `tools/work-items.mjs`, `docs/agents/solution-dashboard.md` from the tag; `docs/agents/pull-requests.md` (adapted) takes the template's publish-hooks sentence. F-015-T02 implemented: `.solution.json` sets `label` per project and `htmlTables: true`; `tools/views-changed.mjs` also ignores the coordinator's own rows in HTML form (tests in `test/views-changed.test.mjs`, the last one failing first). Review (mechanical reviewer, fresh context, 2026-11-26): five checks pass (copies byte-identical to v10.21.4, labels and htmlTables only, four HTML patterns, 7 tests pass). Remaining: merge, the refresh, and checking the dashboard.

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | Opened in [PR #51](https://github.com/voidbrain/coordinator/pull/51); owner decision 2026-11-26; [#54](https://github.com/voidbrain/coordinator/pull/54) |
| Opened | 2026-11-26 |
| Verification | Pending |
| Reviewed | 2026-11-26 |

</details>

---

### B-003

**Neither scheduled workflow has run on its schedule yet**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P3 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-26: Both workflows have schedule runs: Maintenance freshness 45680400603 (2026-11-25 18:57 UTC, about 10 h after its 09:00 cron), Refresh solution views 45649633770 (2026-11-25 15:54 UTC) and 45738334912 (2026-11-26 01:49 UTC); GitHub schedule delay, not a defect.

| | |
|---|---|
| **Issue** | Maintenance freshness (`0 9 * * *`) and Refresh solution views (`30 5 * * *`) are on `main` since 2026-11-24 21:53 UTC; at 11:36 UTC on 2026-11-25 neither had a `schedule` run (Maintenance 0 runs; Refresh 10, all `workflow_dispatch`). The same cron in voidbrain/nerv, gauntlet-protocol and project-harness starts 8–12 hours late, so this is probably delay, not a fault. Found by the delivery audit of 2026-11-25 (finding 2). |
| **Reproduce** | `gh run list -R voidbrain/coordinator --event schedule` lists no run. |
| **Check** | After 2026-11-26 12:00 UTC the same command lists at least one `schedule` run of each workflow: close as delay, not a defect. If either is still missing, record the cause (Actions schedule state of the repository) and move this record to Open. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-26: Both workflows have schedule runs: Maintenance freshness 45680400603 (2026-11-25 18:57 UTC, about 10 h after its 09:00 cron), Refresh solution views 45649633770 (2026-11-25 15:54 UTC) and 45738334912 (2026-11-26 01:49 UTC); GitHub schedule delay, not a defect. Opened 2026-11-25 in Investigate from the delivery audit ([report](../audits/2026-11-25-delivery.md)). A hypothesis, not a confirmed bug.

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | Audit [2026-11-25 delivery](../audits/2026-11-25-delivery.md), opened in [#27](https://github.com/voidbrain/coordinator/pull/27) |
| Opened | 2026-11-25 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---

### F-014

**Owner accepts or rejects the 2026-11-26 gap-review proposals**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P3 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-26: 2026-11-26 refresh (06:28 UTC): proposals 1-10 and 15 gone from the gap review; 12-14 remain as 'Behind the harness' rows until their reconcile records (gauntlet-protocol:F-075, fpvbuddy:F-102, grover:F-099) are done there; new v10.21.4 rows are a separate gap.

| | |
|---|---|
| **Issue** | The gap review of 2026-11-26 listed 15 proposals: one cross-repository need (nerv:F-120), nine openbando records waiting on the owner without a page, and five projects behind harness v10.21.3. The coordinator never edits a component, so each accepted proposal is created in its owning repository. |
| **Reproduce** | `npm run solution:refresh`, then the "Gap review" section of `docs/SOLUTION-DASHBOARD.md`. |
| **Check** | Every proposal is accepted or rejected by the owner; accepted ones exist in their owning backlogs (the next refresh no longer lists them); rejected ones are recorded here with the reason. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-26: 2026-11-26 refresh (06:28 UTC): proposals 1-10 and 15 gone from the gap review; 12-14 remain as 'Behind the harness' rows until their reconcile records (gauntlet-protocol:F-075, fpvbuddy:F-102, grover:F-099) are done there; new v10.21.4 rows are a separate gap. 2026-11-26: the owner accepted all 15 proposals (F-014-T01; outcomes per proposal in its task file). Created in the owning repositories: nerv PR #780 (1), openbando PR #291 (2-10), F-015 here (11), gauntlet-protocol PR #110 (12), FPVBuddy PR #16 (13), Grover PR #43 (14). Proposal 15, openbando's harness reconcile, is accepted and in progress in another openbando session. F-014-T02 confirms on the refresh that the gaps are gone.

2026-11-26 (F-014-T02, refresh of 06:28 UTC, `npm run solution:refresh`): the gap review (`docs/SOLUTION-DASHBOARD.md`, "Gap review", lines 224-237) lists only seven "Behind the harness" rows (lines 230-236) and no cross-repository or owner-check-page row. Proposal 1 (nerv:F-120 without a counterpart) and 2-10 (openbando records without an owner page) are gone; 11 is F-015 (closed). Proposal 15 is gone too: openbando#292 merged 2026-11-25 23:53 UTC (reconcile v10.8.1 to v10.21.3), so openbando is no longer behind v10.21.3. What is left is not a proposal that was lost: 12-14 (gauntlet-protocol, fpvbuddy, grover on v10.20.0, lines 231-233) stay listed until their reconcile records (gauntlet-protocol:F-075, fpvbuddy:F-102, grover:F-099) are done in those repositories; and since template v10.21.4 nerv, openbando, hobo and bricks (v10.21.3, lines 230, 234-236) show as one release behind, a new gap for the gap review to propose, not part of the 15 accepted here.

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | Opened in [PR #51](https://github.com/voidbrain/coordinator/pull/51); owner decision 2026-11-26 |
| Components | nerv:F-120, openbando:B-009, openbando:F-026, gauntlet-protocol:F-075, fpvbuddy:F-102, grover:F-099 |
| Opened | 2026-11-26 |
| Verification | Pending |
| Reviewed | 2026-11-26 |

</details>

---

### B-002

**check:fast fails with a bare HTTP 403 when GH_TOKEN is unset**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P3 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-26: PR #59 merged on green CI (run of check 2026-11-26); check:fast passes with gh logged in (full audit 2026-11-26).

| | |
|---|---|
| **Issue** | `npm run check:fast` runs `check:solution` (`tools/solution.mjs check --remote`), which reads GitHub without a token unless `GH_TOKEN` is set. Once the unauthenticated limit (60 requests an hour) is spent, every component reports "GitHub returned HTTP 403" and the check exits 1. AGENTS.md lists both commands with no token; only the refresh line in README and the solution-refresh guide name `GH_TOKEN`. Found by the delivery audit of 2026-11-25. |
| **Reproduce** | With `GH_TOKEN` unset and `curl -s https://api.github.com/rate_limit` showing core remaining 0, run `npm run check:solution`: five "GitHub returned HTTP 403" lines; `npm run check:fast` exits 1. |
| **Check** | An agent following AGENTS.md runs `check:fast` with a token (the check lines or the project's `check:solution` script supply `GH_TOKEN=$(gh auth token)`), and it passes; without `gh` logged in, the documented command says what is missing instead of a bare 403. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-26: PR #59 merged on green CI (run of check 2026-11-26); check:fast passes with gh logged in (full audit 2026-11-26). Opened 2026-11-25 from the delivery audit ([report](../audits/2026-11-25-delivery.md), finding 1). The 403 message itself lives in the template's copied `tools/solution.mjs`; improving it is the template's, for the owner to take there, never edited here. 2026-11-26: `check:solution` now runs through the project's `tools/with-gh-token.mjs` (`GH_TOKEN`, else `GITHUB_TOKEN`, else `gh auth token`; none: runs unauthenticated and a failure names the missing token); `test/with-gh-token.test.mjs` failed first (module absent). Closes on green CI.

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | Audit [2026-11-25 delivery](../audits/2026-11-25-delivery.md), opened in [#27](https://github.com/voidbrain/coordinator/pull/27); [#59](https://github.com/voidbrain/coordinator/pull/59) |
| Opened | 2026-11-25 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---

### F-009

**Reconcile to the latest harness and read built backlog views**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P3 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-26: F-009-T01: PR #19 merged on green CI; harness at v10.21.4 (F-015); the 2026-11-26 dashboard reads NERV from its backlog-views publication (view published on backlog-views at 847b80d8309e), so nerv:F-125's built views are read (full audit 2026-11-26).

| | |
|---|---|
| **Issue** | Owner decision 2026-11-25: the project-harness major release that stops committing backlog views (project-harness:F-096-T06) ships only when the template backlog is empty and every project has reconciled to the latest release, and NERV has run with built views for about 10 merged PRs (nerv:F-125). The coordinator is on harness 10.9.0 and reads committed ledgers. |
| **Reproduce** | `.harness.json` names version 10.9.0; `tools/solution.mjs` predates 10.14.0 and reads a component's committed `docs/BACKLOG.md` only. |
| **Check** | The coordinator is reconciled to the latest harness release; `tools/solution.mjs` and `docs/agents/solution-profile.md` are at 10.14.0 or later, and `npm run solution:refresh` reads NERV's built views (the `backlog-views` publication) without a missing or stale view. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-26: F-009-T01: PR #19 merged on green CI; harness at v10.21.4 (F-015); the 2026-11-26 dashboard reads NERV from its backlog-views publication (view published on backlog-views at 847b80d8309e), so nerv:F-125's built views are read (full audit 2026-11-26). 2026-11-25: reconciled to harness 10.20.0 (owner approval 2026-11-25; the template backlog had no open step but F-096, whose T06 waits on the projects). `tools/solution.mjs` and the solution guides are at 10.20.0; the dashboard read every component as a committed snapshot, since voidbrain/nerv has no `backlog-views` branch yet. Verify on the first refresh after NERV switches. Earlier: opened at the owner's decision. F-009-T01 starts only once the project-harness template backlog is empty (external prerequisite, stated in prose: harness 10.9.0 has no cross-repository `dependsOn`; the reconcile brings it). Adoption notes: the harness `docs/apply/built-views.md` (10.14.0). A coordinator misreading a built view is a view incident for nerv:F-125; add nerv:F-125 to Components once voidbrain/nerv#748 lands on NERV main (the check reads main).

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | Opened in [PR #19](https://github.com/voidbrain/coordinator/pull/19).; [#23](https://github.com/voidbrain/coordinator/pull/23) |
| Components | project-harness:F-096 |
| Opened | 2026-11-25 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---

### F-011

**Reconcile to harness 10.21.2: the dashboard's five overview gaps and the coordinator label**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P3 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-26: F-011-T01: PR #40 merged on green CI; superseded by the 10.21.4 reconcile (F-015, closed 2026-11-26); refreshes since read every source with 0 source/link problems (run 45785986150) (full audit 2026-11-26).

| | |
|---|---|
| **Issue** | The 10.21.1 dashboard that replaced the retired overview (F-004-T05) left five differences the owner relies on: ▶ picked nerv:F-016 although its next open step is the owner's; a scoped audit did not count; no per-record open-work table with state; gap proposals were not numbered; this repository's rows read `solution`, not `coordinator`. project-harness:B-060 fixes them in 10.21.2. |
| **Reproduce** | `.harness.json` names 10.21.1; the dashboard of `69da441` marks nerv:F-016 ▶ and lists open steps only, collapsed. |
| **Check** | `.harness.json` names 10.21.2; the three solution files match the tag byte for byte; `.solution.json` sets `"label": "coordinator"`; the regenerated dashboard shows ▶ past nerv:F-016, scoped audits, Open work by repository, numbered gaps and 🧭 coordinator rows. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-26: F-011-T01: PR #40 merged on green CI; superseded by the 10.21.4 reconcile (F-015, closed 2026-11-26); refreshes since read every source with 0 source/link problems (run 45785986150) (full audit 2026-11-26). 2026-11-26: project-harness:B-060 closed and archived (released in v10.21.2), so it leaves Components: the link checker reads active records only and the refresh failed on it. 2026-11-25: reconciled and regenerated; see F-011-T01 for what still differs from the owner's needs (reported, not fixed here: the template owns it).

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | [#40](https://github.com/voidbrain/coordinator/pull/40); [#52](https://github.com/voidbrain/coordinator/pull/52) B-060 leaves Components |
| Opened | 2026-11-25 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---

### B-005

**The refresh guard cannot read the HTML dashboard, so a refresh that drops a Done order item never merges itself**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P3 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-26: PR #84 merged (7a69164) with check `check` green; the failing-first test f664bf5 passes; tools/refresh-guard.mjs from main replayed on refresh PR #73 (head fffbc98, base 5cd7567) prints ok where the old guard refused nerv:B-118.

| | |
|---|---|
| **Issue** | Full audit 2026-11-26 ([report](../audits/2026-11-26-coordinator-full.md), finding 1). Since the 10.21.4 reconcile (`5209733`, `.solution.json` `htmlTables: true`) the dashboard's order table is HTML, but `closedRefs` in `tools/refresh-guard.mjs` reads only Markdown rows starting with a pipe. It finds no Closed item, so any refresh that drops a Done order item has auto-merge refused (refresh PR #73: "nerv:B-118 was removed but the dashboard does not show it Closed"). It fails safe: a person must land the PR. |
| **Reproduce** | In a checkout at `22744b2`: `node -e` importing `orderReasons` from `tools/refresh-guard.mjs`, with the committed dashboard where item 1's status cell reads `Closed: ✅ Done: closed` and the order without item 1: it returns the reason above; the same row as a Markdown table returns none. |
| **Check** | `test/refresh-guard.test.mjs` has a case with an HTML order table (`<tr><td>` cells, the item as a link) that fails before the fix; the guard accepts dropping a Done item from either layout and still refuses an item that is not Closed; the next refresh that drops a Done item merges itself. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-26: PR #84 merged (7a69164) with check `check` green; the failing-first test f664bf5 passes; tools/refresh-guard.mjs from main replayed on refresh PR #73 (head fffbc98, base 5cd7567) prints ok where the old guard refused nerv:B-118. 2026-11-26: B-005-T01 implemented: `closedRefs` in `tools/refresh-guard.mjs` reads the order table as Markdown or HTML rows (`<tr>` cells with their tags stripped, so a linked item reads as its text); the failing-first test (`f664bf5`) has an HTML order table where dropping a Done item is allowed, dropping a Ready one is refused, and numbered rows of a later HTML table are not read. Checked against the committed dashboard: dropping item 1 is refused while it is open and allowed once its status cell reads Done. No review: P3 bug, one small project-tool function with its tests, no harness file. Next: close on PR #84's green CI; the next refresh that drops a Done item shows the live check. 2026-11-26: opened from the coordinator's full audit (solution:F-017-T04). Next: from tasks.

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | [#81](https://github.com/voidbrain/coordinator/pull/81) (opened); [#84](https://github.com/voidbrain/coordinator/pull/84) (fix); [full audit 2026-11-26](../audits/2026-11-26-coordinator-full.md) |
| Opened | 2026-11-26 |
| Verification | Verified 2026-11-26: PR #84 green CI; the fixed guard replayed on refresh PR #73's real HTML dashboard and order allows the Done drop; the live auto-merge is observed on the next refresh that drops a Done item |
| Reviewed | 2026-11-26 |

</details>

---

### B-007

**AGENTS.md asks for backlog-reader fixtures that no longer exist**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P3 | Closed | 🟢 Small |

💻 **→ Human action required: No**<br />Closed 2026-11-26: Merged PR #86 (2026-11-26), all CI green; owner decision option (b) applied to AGENTS.md; maintenance receipt refreshed.

| | |
|---|---|
| **Issue** | Full audit 2026-11-26 ([report](../audits/2026-11-26-coordinator-full.md), finding 3). The AGENTS.md project line "A change to a backlog reader adds a fixture to `test/fixtures/` and its expected result to `expected.json`" names files that went with the project's own overview in F-004-T05; the backlog readers are now the copied template `tools/solution.mjs`, which this repository may not edit and the template tests. Changing a governing rule needs the owner (rule review). |
| **Reproduce** | `ls test/fixtures` fails; `git log --diff-filter=D --name-only -- test/fixtures` shows the removal; docs/agents/areas.md "Retired (F-004-T05)". |
| **Check** | The owner picks (a) drop the line, (b) reword it for a project-owned reader only ("a project tool that reads a backlog adds a test with invented data; an unknown layout shows as a problem, never as no work"; recommended), or (c) restore fixtures for the template reader; the decision and its date are recorded here and AGENTS.md changes in one PR under the rule review. |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-26: Merged PR #86 (2026-11-26), all CI green; owner decision option (b) applied to AGENTS.md; maintenance receipt refreshed. 2026-11-26: opened from the coordinator's full audit (solution:F-017-T04). Next: from tasks.

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | [#86](https://github.com/voidbrain/coordinator/pull/86) (opened); Review: fresh-context mechanical-reviewer, one blocker (dropped maintenance outcomes) fixed; [full audit 2026-11-26](../audits/2026-11-26-coordinator-full.md) |
| Opened | 2026-11-26 |
| Verification | Pending |
| Reviewed | 2026-11-26 |

</details>

---

### F-017

**Cross-project audit: the repositories agree with each other**

| Signal | Priority | Status | Effort |
|:---:|---|---|---|
| 🔵 | ◻️ P3 | Closed | 🟡 Medium |

💻 **→ Human action required: No**<br />Closed 2026-11-26: PRs #67, #68 (T01), #74 (T02), #77 (T03), #81 (T04), #83 (T05), #80 (T06) and #90 (T07) merged on green CI (check job passed); owner accepted all T02, T06 and T07 proposals 2026-11-26.

| | |
|---|---|
| **Issue** | Per-project audits exist in all 9 components (7-day cadence; only project-harness and openbando enforce it), and the gap review finds missing steps and harness lag, but nothing checks that the repositories agree with each other. Evidence 2026-11-26: nerv:F-101-T05 had NERV import the FPV core, contradicting the 2026-11-25 screens/domain decision in docs/DOMAINS.md; fpvbuddy:F-005 waited on nerv:F-101-T04 although its own PR (FPVBuddy#17) delivered that step; the owner caught both and no check did (fixed in nerv#792, FPVBuddy#17, coordinator#63). Audit freshness 2026-11-26: nerv last full audit 2026-11-20; fpvbuddy, hobo and bricks only baseline audits; gauntlet-protocol only a reconcile audit. |
| **Reproduce** | Read docs/agents/gap-review.md and docs/agents/solution-gaps.md: no kind compares a plan with a later decision, a producer with its consumer, or reports a component's audit age; a step that depends on a closed or cancelled step of another repository shows only when the step is missing from its backlog. |
| **Check** | docs/agents/cross-project-audit.md exists and is linked from AGENTS.md and docs/agents/procedures.md, covering cross-references, decisions, contracts, duplication and audit cadence (F-017-T01); the first run is recorded with evidence and its proposals are listed for the owner (F-017-T02); project-harness has a proposal to automate cross-references and audit cadence in the solution tool (F-017-T03); the coordinator's part of accepted proposal 16: a full audit by manifest kind (F-017-T04), then `audit.enforce` on (F-017-T05, only after T04). |

<details>
<summary>Next action, estimates and PR history</summary>

**Next action / closure evidence:** Closed 2026-11-26: PRs #67, #68 (T01), #74 (T02), #77 (T03), #81 (T04), #83 (T05), #80 (T06) and #90 (T07) merged on green CI (check job passed); owner accepted all T02, T06 and T07 proposals 2026-11-26. 2026-11-26: F-017-T07 implemented at the owner's request ("are all [nerv's] procedures / audits / checks mapped ... is nerv still missing something", widened the same day to situation-based gaps): [NERV practices transfer and situation gaps](../reviews/2026-11-26-nerv-practices-transfer.md) classifies 23 NERV practices (A 12, B 6, C 6, D 6), lists 15 practices missing across the nine and 12 NERV plus 5 solution situation gaps, and numbers 22 proposals for the owner (PR #90); read-only, nothing changed in a component. Verification is the PR's green CI. 2026-11-26: F-017-T05 closed on PR #83's green CI (check `check` passed; merged `64424fb`). 2026-11-26: F-017-T05 implemented: `.harness.json` sets `audit.enforce` to `true`, a project setting (the plan's acceptance; no template change), after the full audit's PR #81 merged and F-017-T04 closed (PR #82); `npm run check:audits` and `check:fast` pass with it, so a due area now fails the check instead of warning. Next: F-017-T05 closes on PR #83's green CI. Review: fresh-context mechanical reviewer (Sonnet) on PR #83, no findings: one-line diff, F-017-T04 closed, check:audits exits 0 with all eight areas fresh; the first area falls due after 2026-12-03T09:40Z, after which check:audits fails until a new audit lands. 2026-11-26: F-017-T04 closed on PR #81's green CI (merged `d139d48`). Next: F-017-T05 (`audit.enforce` on) in its own PR. 2026-11-26: F-017-T04 implemented: [full audit 2026-11-26](../audits/2026-11-26-coordinator-full.md), manifest kind full, all eight areas checked at main `22744b2`; `npm run check:audits` passes. 12 findings: 1 confirmed defect opened as [B-005](../work/records/B-005.md) (refresh guard cannot read the HTML dashboard), 1 hypothesis as [B-006](../work/records/B-006.md) (hourly schedule fires about once a day), 1 rule defect for the owner as [B-007](../work/records/B-007.md) (AGENTS.md fixture rule), 2 fixed in the PR (SOLUTION version table; closable work: B-002, F-009, F-011 closed, F-012-T04, F-013-T01, F-018-T01 closed), 1 improvement proposal and 6 annotations report only. Next: F-017-T04 closes on PR #81's green CI; then F-017-T05 in a follow-up PR. No review: documentation and backlog only. 2026-11-26: F-017-T06 implemented at the owner's request ("check for other untracked forgotten procedures, audits, tests"): [dormant checks 2026-11-26](../audits/2026-11-26-dormant-checks.md) read all nine repositories at origin/main and found 5 procedure, 9 test-wiring, 5 cannot-fail and 2 CI findings (false positives listed); check 6 added to the [cross-project audit](../agents/cross-project-audit.md) and named in the gap review. Proposals for the owner to accept or reject, each made in its owning repository:

| # | Repo | Proposal |
|---|---|---|
| 1 | nerv | B- record: run the darwin-only Node tests (EVA sandbox, egress proxy, job user, desktop driver) on the macOS runner |
| 2 | nerv | B- record: the B-102 user-text scan covers `web/src`; the dashboard shell stops showing step IDs |
| 3 | gauntlet-protocol | B- record: type-check `test/**/*.ts` |
| 4 | project-harness | 🧑 Choose a behaviour runner; B- record for the overdue rerun (F-096, F-102) and a `behaviour.runner` setting per repository |
| 5 | openbando | B- record: `tsconfig.e2e.json` in the CI type check |
| 6 | nerv | B- record: axe `incomplete` colour-contrast results fail or are listed |
| 7 | fpvbuddy, grover, hobo, bricks, coordinator, openbando | Enable `reviews` (token, architecture, skills; 30 days) and write the first of each |
| 8 | nerv, grover, openbando, fpvbuddy, hobo, bricks | 🧑 Decide `coverage.enforce` per repository |
| 9 | fpvbuddy, grover, openbando | Add the spec `tsconfig` (and fpvbuddy's core specs) to `typecheck` |
| 10 | nerv | B- record: type-check `test/*.mjs` |
| 11 | project-harness | B- record: reconcile adds the npm scripts a copied procedure names (`work:pr`, `behaviour`, `coverage`), or the procedure says when they apply |
| 12 | hobo, bricks | Run the maintenance workflow once by hand; confirm the schedule |
| 13 | nerv | B- record: scheduled CI runs in their own concurrency group |
| 14 | bricks | B- record: the contrast helper accounts for alpha |
| 15 | grover | Alert hysteresis test iterates the contract's probe kinds |
| 16 | fpvbuddy, grover, hobo, bricks, coordinator, openbando | 🧑 Record whether work-usage measurement stays off |

2026-11-26: F-017-T03 closed on PR #77's green CI (PR #78); #76 and #77 merged on green CI. Next: F-017-T04 (full audit), then T05. 2026-11-26: the owner accepted all 17 proposals in chat on 2026-11-26 ("accept all 17 proposals"). Each is made by a session in its owning repository: nerv #1, #11, #12, #13, #17; bricks #2, #16; hobo #3, #7, #16; fpvbuddy #8, #15, #17; grover #10, #16; openbando #14; gauntlet-protocol #17; coordinator #4, #5, #6, #9, #16. Coordinator part, done in PR #77: #4 nerv:F-120-T01 and T03 in F-007-T01's `externalMet`; #6 DOMAINS (hobo modules, Maps and Routing rows, bricks published 0.3.0, Telemetry and FPV data tools rows, Hobo MCP contract row), AGENTS.md component list, hobo pair in check 3; #9 new record [F-018](../work/records/F-018.md) (producer-neutral alert contract); #16 planned as F-017-T04 (full audit) and F-017-T05 (`audit.enforce` on, only after T04). #5, the order note on fpvbuddy:F-005, is its own order PR, #76. F-017-T03 implemented in the same PR: [proposal to project-harness](../proposals/cross-project-audit-checks.md) (gap kinds for a met but unrecorded prerequisite, a prerequisite that was cancelled, and audit cadence with `audit.enforce`; delivered-but-open stays a hand check), for the owner to take to a project-harness session; no harness file edited, nothing pushed there. Next: F-017-T03 closes on PR #77's green CI; then T04 and T05. No review: the only harness-file change is AGENTS.md's component list (one line, a fact, no behaviour; documentation-only and small). 2026-11-26: F-017-T02 implemented: the first run is recorded in [cross-project audit 2026-11-26](../audits/2026-11-26-cross-project.md) (revisions read, the five checks, an evidence link per finding, false positives, audit cadence per repository). Both 2026-11-26 findings are confirmed fixed on their side (nerv:F-101-T05 cancelled; fpvbuddy:F-005-T02 waits on nothing in NERV); NERV's own F-101-T04 is still open (proposal 1). Correction to the Issue: by manifest kind fpvbuddy and gauntlet-protocol have full audits (2026-11-22); grover, hobo, bricks and this repository have none. Proposals for the owner, to accept or reject one by one; an accepted one is made by a session in its owning repository. F-017-T02 closed on PR #74's green CI. Next: the owner's disposition of the 17 proposals, then F-017-T03.

| # | Repo | Proposal |
|---|---|---|
| 1 | nerv | Close F-101-T04 as met by fpvbuddy:F-005-T02 (FPVBuddy#17); F-101-T07/T08 depend on that; owner decides on F-098-T04 and F-008-T12 |
| 2 | bricks | F-004-T05 done (0.3.0 published by trusted publishing); F-004-T06 rewritten as the 0.3.0 install check; close implemented F-003 steps |
| 3 | hobo | F-010-T02 depends on bricks:F-007-T03, not the prose wait on solution:F-012 |
| 4 | coordinator | F-007-T01: nerv:F-120-T01 and T03 in `externalMet` |
| 5 | coordinator | Order note for fpvbuddy:F-005 (owner-instructed order PR) |
| 6 | coordinator | DOMAINS and AGENTS.md: hobo modules and rows, bricks published, Telemetry and FPV contract rows, Hobo MCP pair |
| 7 | hobo | F-012-T01: a shared geo package goes to blocks under the blocks criterion |
| 8 | fpvbuddy | F-009-T03 validates against bricks' surface schemas |
| 9 | coordinator | New record: producer-neutral alert contract (nerv:F-122, nerv:F-101-T09, fpvbuddy:F-013, grover:F-008) |
| 10 | grover | New step F-008-T04: alert shape, key grammar and levels written in DESIGN.md and pinned by a test |
| 11 | nerv | F-101-T08/T09/T10 depend on the FPVBuddy steps they wait on; writes pass a request id |
| 12 | nerv | F-122-T03 (and F-123-T02) depend on grover:F-005-T01; paired checks named |
| 13 | nerv | Render surfaces with bricks `bx-surface` or record a skip |
| 14 | openbando | Record `Skip: bricks` or an adoption record |
| 15 | fpvbuddy | F-014-T01 compares openbando's Blackbox parser first |
| 16 | grover, hobo, bricks, coordinator | Next audit as `kind: full`, then `audit.enforce` on |
| 17 | nerv, fpvbuddy, gauntlet-protocol | `audit.enforce` on; nerv full audit due 2026-11-27 |

2026-11-26: F-017-T01 implemented: [cross-project audit](../agents/cross-project-audit.md) written, linked from the AGENTS.md procedures table and the gap review; verification is the PR's green CI. No review: documentation-only and small (one table row, no behaviour). 2026-11-26: the first version also forked the copied `docs/agents/procedures.md` for a row; that was unnecessary (the owner's brief asked for it by mistake) and is undone: the procedure is listed in the AGENTS.md procedures table only, like gap-review, and procedures.md is a copied file again. F-017-T01 closed on PR #67's green CI. Next: F-017-T02, the first run. 2026-11-26: planned at the owner's request (approved 2026-11-26). Planning and coordination only: the procedure runs together with the gap review, its findings become proposals to the owning repositories under the gap-review procedure (the owner decides which are created), and the coordinator edits no component. Check 4 (duplication) reuses the F-016-T02 checks by reference and does not repeat them. The solution-tool automation is a proposal to project-harness (F-017-T03); no harness file is edited here.

**Estimates:** No remaining effort.

| Field | Value |
|---|---|
| PR / evidence | [#66](https://github.com/voidbrain/coordinator/pull/66) (plan); [#67](https://github.com/voidbrain/coordinator/pull/67) (F-017-T01 procedure); [#68](https://github.com/voidbrain/coordinator/pull/68) (undo the procedures.md fork, close F-017-T01); owner approval 2026-11-26; evidence: nerv#792, FPVBuddy#17, [#63](https://github.com/voidbrain/coordinator/pull/63) · [#69](https://github.com/voidbrain/coordinator/pull/69) (order: solution:F-017 at 8) · [#74](https://github.com/voidbrain/coordinator/pull/74) (F-017-T02 first run); [#75](https://github.com/voidbrain/coordinator/pull/75) (close F-017-T02) · owner accepted all 17 proposals 2026-11-26; [#76](https://github.com/voidbrain/coordinator/pull/76) (order note, proposal 5); [#77](https://github.com/voidbrain/coordinator/pull/77) (proposals 4, 6, 9, 16 and the dispositions); [#78](https://github.com/voidbrain/coordinator/pull/78) (close F-017-T03); [#81](https://github.com/voidbrain/coordinator/pull/81) (F-017-T04 full audit); [#82](https://github.com/voidbrain/coordinator/pull/82) (close F-017-T04); [#83](https://github.com/voidbrain/coordinator/pull/83) (F-017-T05 audit.enforce) · [#80](https://github.com/voidbrain/coordinator/pull/80) (F-017-T06 dormant checks) · [#90](https://github.com/voidbrain/coordinator/pull/90) (F-017-T07 NERV practices transfer); owner accepted all T06 and T07 proposals 2026-11-26 |
| Components | nerv:F-101, nerv:F-122, fpvbuddy:F-005, grover:F-008, hobo:F-011 |
| Opened | 2026-11-26 |
| Verification | Documentation and Unit/integration: 2026-11-26 passed on merged PRs #67, #68, #74, #77, #80, #81, #83 and #90 green CI (check job) |
| Reviewed | 2026-11-26 |

</details>

---
