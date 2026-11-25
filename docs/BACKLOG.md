# <a id="top"></a>Coordinator backlog

Current work ledger, reviewed 25 November 2026 against main `69da441`. PRs #38 (F-006 coordination) and #39 (F-004-T05 reconcile to 10.21.1, overview retired) merged on green CI. Harness reconciled to v10.21.2 in the F-011 PR.
Cross-repository work only; each component's work lives in its own backlog ([dashboard](SOLUTION-DASHBOARD.md)). [Rules](BACKLOG-RULES.md) · [Archive 2026](archive/backlog-2026.md) · [Reading the records](#how-to-use-this-file).

<!-- totals:start -->
**Remaining effort:** 10 h agent + 1.25 h owner across 18 open steps of 6 features and 3 other records. Generated from the task files.
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
### <a id="b-004"></a>[🐞 B-004](#top)

**An hourly refresh would open a PR every hour: the coordinator's own revision row was not ignored**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🟡 Implemented | 🔹 P3 | 🟢 Small | 0 h | — | — | 🤖 | — | — |

💻 **→** Next: from tasks; closes on green CI and a day of scheduled runs that open no PR without a component change.

| | |
|---|---|
| **Issue** | Owner decision 2026-11-25: refresh the solution views hourly instead of daily (F-005's daily schedule of 2026-11-24). The workflow's "did anything change" check ignored the snapshot and the coordinator's rows by the label `solution`; since the 10.21.2 reconcile (F-011) the source row reads `coordinator`, so each merged refresh PR moved that row and made the next run open another PR: hourly, a PR every hour. |
| **Reproduce** | `git diff -I '^Snapshot' -I '^\| solution \|' -I '^\| \[solution:' -I '^\| 🧭' -I '^\| [0-9]+ \| 🧭' --stat 615c443^ 615c443` (refresh PR #41) still shows one changed line, the `\| coordinator \|` source row. |
| **Check** | `test/views-changed.test.mjs` passes; the workflow runs `tools/views-changed.mjs` on cron `17 * * * *`; `gh pr list -R voidbrain/coordinator --state all --search 'refresh solution views'` shows no refresh PR whose only change is the snapshot and the coordinator's revision. |

**Steps**

| Effort | Step | Estimate | Actual | Remaining | Status |
|---|---|---|---|---|---|
| 🟢 Small | <a id="b-004-t01"></a>B-004-T01 — Refresh hourly; a run with only the snapshot and the coordinator's revision opens no PR | 0.5 h | 0 h | 0 h | Implemented; verification pending |
| 🟢 Small | **Total** | 0.5 h | 0 h (0 of 1 steps recorded) | 0 h | 0 of 1 completed |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/B-004.md)

| Field | Value |
|---|---|
| PR / evidence | [#43](https://github.com/voidbrain/coordinator/pull/43) |
| Opened | 2026-11-25 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---
### <a id="f-006"></a>[✨ F-006](#top)

**NERV delivers Grover alerts end to end**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔶 P2 | 🟢 Small | 1 h agent + 0.5 h owner | `grover:F-008-T03`, `nerv:F-122-T02` | — | ⏳ | — | — |

💻 **→** Next: F-006-T01 — Record the grover&#95;alerts contract and its end-to-end check in docs/SOLUTION.md (waits on grover:F-008-T03 and nerv:F-122-T02) (Planned).

| | |
|---|---|
| **Issue** | Coordinates Grover alert delivery end to end: Grover raises alerts (grover:F-008), NERV connects to Grover's hub over MCP (nerv:F-123) and delivers the alerts to the owner (nerv:F-122). This record owns the `grover_alerts` contract and the end-to-end check. |
| **Reproduce** | Grover `docs/DESIGN.md`, "Alerts" and "NERV"; NERV `docs/decisions/grover-alert-delivery.md` (nerv#747); raise an out-of-range reading on a running hub once grover:F-008-T03 and nerv:F-122-T02 land. |
| **Check** | An alert raised on a running Grover hub reaches the owner through NERV; the contract and the check are in docs/SOLUTION.md. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | Who | PRs |
|---|---|---|---|---|---|---|---|:---:|---|
| 🟢 Small | <a id="f-006-t01"></a>F-006-T01 — Record the grover&#95;alerts contract and its end-to-end check in docs/SOLUTION.md (waits on grover:F-008-T03 and nerv:F-122-T02) | 1 h | 0 h | 1 h | Planned | `grover:F-008-T03`, `nerv:F-122-T02` | [F-006-T02](#f-006-t02) | ⏳ 🤖 | [PR #38](https://github.com/voidbrain/coordinator/pull/38) dependsOn grover:F-008-T03, nerv:F-122-T02 |
| 🟢 Small | <a id="f-006-t02"></a>F-006-T02 — Owner sees a Grover alert arrive through NERV | — | 0 h | 0 h agent + 0.5 h owner | Planned | [F-006-T01](#f-006-t01) | — | ⏳ 🧑‍🔧 | — |
| 🟢 Small | **Total** | 1 h (1 of 2 steps) | 0 h (0 of 2 steps recorded) | 1 h agent + 0.5 h owner | 0 of 2 completed | | | | |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-006.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-006-T01: [PR #38](https://github.com/voidbrain/coordinator/pull/38) dependsOn grover:F-008-T03, nerv:F-122-T02. #38 (2026-11-25): Issue, Components and F-006-T01 cross-repository prerequisites updated |
| Components | grover:F-008, nerv:F-122, nerv:F-123 |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---

### <a id="f-007"></a>[✨ F-007](#top)

**NERV capability coverage in the Gauntlet across both repositories**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔶 P2 | 🟢 Small | 1 h | `nerv:F-120-T01`, `nerv:F-120-T02`, `nerv:F-120-T03` | — | ⏳ | — | — |

💻 **→** Next: F-007-T01 — Name the Gauntlet release NERV needs for its new cases in docs/SOLUTION.md (waits on nerv:F-120) (Planned).

| | |
|---|---|
| **Issue** | nerv:F-120 waits on domain packs requested from gauntlet-protocol the same day; gauntlet-protocol has no open record for them (gap review, kind 1). |
| **Reproduce** | nerv F-120 Issue; gauntlet-protocol backlog: no open records on 2026-11-24. |
| **Check** | The required gauntlet-protocol release and NERV's vendored version are named in docs/SOLUTION.md, and a Gauntlet run of the new NERV cases is linked. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | PRs |
|---|---|---|---|---|---|---|---|---|
| 🟢 Small | <a id="f-007-t01"></a>F-007-T01 — Name the Gauntlet release NERV needs for its new cases in docs/SOLUTION.md (waits on nerv:F-120) | 0.5 h | 0 h | 0.5 h | Planned | `nerv:F-120-T01`, `nerv:F-120-T02`, `nerv:F-120-T03` | [F-007-T02](#f-007-t02) | [PR #39](https://github.com/voidbrain/coordinator/pull/39) dependsOn nerv:F-120 open steps |
| 🟢 Small | <a id="f-007-t02"></a>F-007-T02 — Link a Gauntlet run of the new NERV cases as acceptance | 0.5 h | 0 h | 0.5 h | Planned | [F-007-T01](#f-007-t01) | — | — |
| 🟢 Small | **Total** | 1 h | 0 h (0 of 2 steps recorded) | 1 h | 0 of 2 completed | | | |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-007.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-007-T01: [PR #39](https://github.com/voidbrain/coordinator/pull/39) dependsOn nerv:F-120 open steps. — |
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
### <a id="f-011"></a>[✨ F-011](#top)

**Reconcile to harness 10.21.2: the dashboard's five overview gaps and the coordinator label**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🟡 Implemented | 🔹 P3 | 🟢 Small | 0 h | — | — | 🤖 | — | — |

💻 **→** Next: from tasks; closes on the reconcile PR's green CI and the next refresh.

| | |
|---|---|
| **Issue** | The 10.21.1 dashboard that replaced the retired overview (F-004-T05) left five differences the owner relies on: ▶ picked nerv:F-016 although its next open step is the owner's; a scoped audit did not count; no per-record open-work table with state; gap proposals were not numbered; this repository's rows read `solution`, not `coordinator`. project-harness:B-060 fixes them in 10.21.2. |
| **Reproduce** | `.harness.json` names 10.21.1; the dashboard of `69da441` marks nerv:F-016 ▶ and lists open steps only, collapsed. |
| **Check** | `.harness.json` names 10.21.2; the three solution files match the tag byte for byte; `.solution.json` sets `"label": "coordinator"`; the regenerated dashboard shows ▶ past nerv:F-016, scoped audits, Open work by repository, numbered gaps and 🧭 coordinator rows. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status |
|---|---|---|---|---|---|
| 🟢 Small | <a id="f-011-t01"></a>F-011-T01 — Copy the 10.21.2 solution files, label the coordinator and regenerate the dashboard | 0.5 h | 0 h | 0 h | Implemented; verification pending |
| 🟢 Small | **Total** | 0.5 h | 0 h (0 of 1 steps recorded) | 0 h | 0 of 1 completed |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-011.md)

| Field | Value |
|---|---|
| PR / evidence | [#40](https://github.com/voidbrain/coordinator/pull/40) |
| Components | project-harness:B-060 |
| Opened | 2026-11-25 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---
### <a id="f-012"></a>[✨ F-012](#top)

**Bricks 🧱: shared UI library for the voidbrain projects**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔹 P3 | 🔴 Large | 6.5 h agent + 0.75 h owner | `nerv:F-130-T02`, `nerv:F-130-T05`, `nerv:F-130-T09`, `nerv:F-130-T13`, `hobo:F-010-T02`, `grover:F-020-T07`, `fpvbuddy:F-008-T06` | — | 🤖 | — | — |

💻 **→** Next: F-012-T01 — Angular version contract: every UI component on Angular 22 (Planned).

| | |
|---|---|
| **Issue** | Owner request 2026-11-25. Every UI project is Angular: NERV `web/src` (22), Grover `apps/client` (22), FPVBuddy (21). Each styles and builds its own status rows, cards, approval cards and fleet and battery views. NERV's dashboard migration ([nerv:F-130](https://github.com/voidbrain/nerv/blob/main/docs/BACKLOG.md#f-130)) is about to produce these as Angular components, so the solution needs one contract for versions, tokens and shared components before each project copies them. |
| **Reproduce** | Compare the three projects' `package.json` (`@angular/core` 22, 22, 21) and their style sheets: no shared tokens or components. |
| **Check** | docs/SOLUTION.md records the Angular 22 contract, the design tokens (CSS custom properties matching nerv `docs/STYLE-GUIDE.md`) and the shared component contract; `voidbrain/bricks` is a solution component with its first release; the three projects pin the same release; the owner's side-by-side check. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | Who |
|---|---|---|---|---|---|---|---|:---:|
| 🟢 Small | <a id="f-012-t01"></a>F-012-T01 — Angular version contract: every UI component on Angular 22 | 0.5 h | 0 h | 0.5 h | Planned | — | [F-012-T02](#f-012-t02) | 🤖 |
| 🟡 Medium | <a id="f-012-t02"></a>F-012-T02 — Design-token contract matching NERV's style guide | 2 h | 0 h | 2 h | Planned | [F-012-T01](#f-012-t01) | [F-012-T03](#f-012-t03) | ⏳ 🤖 |
| 🟡 Medium | <a id="f-012-t03"></a>F-012-T03 — Shared component contract from what the NERV dashboard migration produced | 2 h | 0 h | 2 h | Planned | [F-012-T02](#f-012-t02), `nerv:F-130-T02`, `nerv:F-130-T05`, `nerv:F-130-T09` | [F-012-T04](#f-012-t04) | ⏳ 🤖 |
| 🟢 Small | <a id="f-012-t04"></a>F-012-T04 — Owner: create the voidbrain/bricks library repository | 0 h | 0 h | 0 h agent + 0.25 h owner | Planned | [F-012-T03](#f-012-t03) | [F-012-T05](#f-012-t05) | ⏳ 🤔 |
| 🟢 Small | <a id="f-012-t05"></a>F-012-T05 — Add voidbrain/bricks to the solution and propose its adoption | 1 h | 0 h | 1 h | Planned | [F-012-T04](#f-012-t04) | [F-012-T06](#f-012-t06) | ⏳ 🤖 |
| 🟢 Small | <a id="f-012-t06"></a>F-012-T06 — Integration acceptance: the UI projects on one library release | 1 h | 0 h | 1 h | Planned | [F-012-T05](#f-012-t05), `nerv:F-130-T13`, `hobo:F-010-T02`, `grover:F-020-T07`, `fpvbuddy:F-008-T06` | [F-012-T07](#f-012-t07) | ⏳ 🤖 |
| 🟢 Small | <a id="f-012-t07"></a>F-012-T07 — Owner: look at the three apps side by side | 0 h | 0 h | 0 h agent + 0.5 h owner | Planned | [F-012-T06](#f-012-t06) | — | ⏳ 🧑‍🔧 |
| 🔴 Large | **Total** | 6.5 h | 0 h (0 of 7 steps recorded) | 6.5 h agent + 0.75 h owner | 0 of 7 completed | | | |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-012.md)

| Field | Value |
|---|---|
| PR / evidence | [#44](https://github.com/voidbrain/coordinator/pull/44), [#45](https://github.com/voidbrain/coordinator/pull/45) (Bricks name); grover [#40](https://github.com/voidbrain/Grover/pull/40), fpvbuddy [#12](https://github.com/voidbrain/FPVBuddy/pull/12) (adoption records); owner request 2026-11-25; nerv:F-130 is planned in [voidbrain/nerv#770](https://github.com/voidbrain/nerv/pull/770), so `check:solution` reports it missing until that merges |
| Components | nerv:F-130, hobo:F-010, grover:F-020, fpvbuddy:F-007, fpvbuddy:F-008 |
| Opened | 2026-11-25 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---
### <a id="f-013"></a>[✨ F-013](#top)

**OpenBando 🏚️ in the solution, and a domain map**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔹 P3 | 🟢 Small | 0.5 h | — | — | 🤖 | — | — |

💻 **→** Next: F-013-T01 — Add openbando to the solution and write the domain map (Implemented; verification pending).

| | |
|---|---|
| **Issue** | Owner request 2026-11-25. voidbrain/openbando is not a solution component, so the dashboard does not show its work, and nothing says which domains the projects share (maps and geo, Blackbox telemetry, 3D, UI components, fleet and batteries), so two projects can build the same thing twice or extract a package nobody shares. |
| **Reproduce** | `.solution.json` on main before this record has no `openbando`; no page lists the projects' domains. |
| **Check** | `openbando` is in `.solution.json` with emoji 🏚️ and its backlog reads in the dashboard; [docs/DOMAINS.md](DOMAINS.md) lists every component's modules with code links and the shared domains with who has or needs them, and states that a shared package is extracted only when two projects really share the code; the gap review reads the page (F-013-T02). |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | PRs |
|---|---|---|---|---|---|---|---|---|
| 🟢 Small | <a id="f-013-t01"></a>F-013-T01 — Add openbando to the solution and write the domain map | 1 h | 0 h | 0 h | Implemented; verification pending | — | [F-013-T02](#f-013-t02) | [PR #46](https://github.com/voidbrain/coordinator/pull/46) |
| 🟢 Small | <a id="f-013-t02"></a>F-013-T02 — First gap review against the domain map | 0.5 h | 0 h | 0.5 h | Planned | [F-013-T01](#f-013-t01) | — | — |
| 🟢 Small | **Total** | 1.5 h | 0 h (0 of 2 steps recorded) | 0.5 h | 0 of 2 completed | | | |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-013.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-013-T01: [PR #46](https://github.com/voidbrain/coordinator/pull/46). [#46](https://github.com/voidbrain/coordinator/pull/46); owner request and approval 2026-11-25. No review: documentation only, a few lines in adapted files (`.solution.json`, AGENTS.md, docs/SOLUTION.md), no behaviour |
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
