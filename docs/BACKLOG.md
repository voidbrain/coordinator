# <a id="top"></a>Coordinator backlog

Current work ledger, reviewed 26 November 2026 against main `486b854`. PR #70 (F-016-T01 Shared assets section in the domain map) merged on green CI.
Cross-repository work only; each component's work lives in its own backlog ([dashboard](SOLUTION-DASHBOARD.md)). [Rules](BACKLOG-RULES.md) · [Archive 2026](archive/backlog-2026.md) · [Reading the records](#how-to-use-this-file).

<!-- totals:start -->
**Remaining effort:** 21.25 h agent + 1 h owner across 27 open steps of 8 features and 2 other records. Generated from the task files.
<!-- totals:end -->

## Work items

Bugs (B-) and features (F-) in one list, most urgent first.

### <a id="b-002"></a>[🐞 B-002](#top)

**check:fast fails with a bare HTTP 403 when GH_TOKEN is unset**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🟡 Implemented | 🔹 P3 | 🟢 Small | 0.5 h | — | — | 🤖 | — | — |

💻 **→** Next: B-002-T01 — Make check:fast supply or ask for GH&#95;TOKEN (Implemented; verification pending).

| | |
|---|---|
| **Issue** | `npm run check:fast` runs `check:solution` (`tools/solution.mjs check --remote`), which reads GitHub without a token unless `GH_TOKEN` is set. Once the unauthenticated limit (60 requests an hour) is spent, every component reports "GitHub returned HTTP 403" and the check exits 1. AGENTS.md lists both commands with no token; only the refresh line in README and the solution-refresh guide name `GH_TOKEN`. Found by the delivery audit of 2026-11-25. |
| **Reproduce** | With `GH_TOKEN` unset and `curl -s https://api.github.com/rate_limit` showing core remaining 0, run `npm run check:solution`: five "GitHub returned HTTP 403" lines; `npm run check:fast` exits 1. |
| **Check** | An agent following AGENTS.md runs `check:fast` with a token (the check lines or the project's `check:solution` script supply `GH_TOKEN=$(gh auth token)`), and it passes; without `gh` logged in, the documented command says what is missing instead of a bare 403. |

**Steps**

| Effort | Step | Estimate | Actual | Remaining | Status |
|---|---|---|---|---|---|
| 🟢 Small | <a id="b-002-t01"></a>B-002-T01 — Make check:fast supply or ask for GH&#95;TOKEN | 0.5 h | 0 h | 0.5 h | Implemented; verification pending |
| 🟢 Small | **Total** | 0.5 h | 0 h (0 of 1 steps recorded) | 0.5 h | 0 of 1 completed |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/B-002.md)

| Field | Value |
|---|---|
| PR / evidence | Audit [2026-11-25 delivery](audits/2026-11-25-delivery.md), opened in [#27](https://github.com/voidbrain/coordinator/pull/27); [#59](https://github.com/voidbrain/coordinator/pull/59) |
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
| PR / evidence | [#40](https://github.com/voidbrain/coordinator/pull/40); [#52](https://github.com/voidbrain/coordinator/pull/52) B-060 leaves Components |
| Opened | 2026-11-25 |
| Verification | Pending |
| Reviewed | 2026-11-25 |

</details>

---
### <a id="f-012"></a>[✨ F-012](#top)

**Bricks 🧱: shared UI library for the voidbrain projects**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔹 P3 | 🔴 Large | 6 h agent + 0.5 h owner | `nerv:F-130-T02`, `nerv:F-130-T05`, `nerv:F-130-T09`, `nerv:F-130-T13`, `hobo:F-010-T02`, `grover:F-020-T07`, `fpvbuddy:F-008-T06` | — | 🤖 | — | — |

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
| 🟢 Small | <a id="f-012-t04"></a>F-012-T04 — Owner: create the voidbrain/bricks library repository | 0 h | 0 h | 0 h | Implemented; verification pending | — | [F-012-T05](#f-012-t05) | 🤖 |
| 🟡 Medium | <a id="f-012-t02"></a>F-012-T02 — Design-token contract matching NERV's style guide | 2 h | 0 h | 2 h | Planned | [F-012-T01](#f-012-t01) | [F-012-T03](#f-012-t03) | ⏳ 🤖 |
| 🟡 Medium | <a id="f-012-t03"></a>F-012-T03 — Shared component contract from what the NERV dashboard migration produced | 2 h | 0 h | 2 h | Planned | [F-012-T02](#f-012-t02), `nerv:F-130-T02`, `nerv:F-130-T05`, `nerv:F-130-T09` | — | ⏳ 🤖 |
| 🟢 Small | <a id="f-012-t05"></a>F-012-T05 — Add voidbrain/bricks to the solution and propose its adoption | 0.5 h | 0 h | 0.5 h | Ready | [F-012-T04](#f-012-t04) | [F-012-T06](#f-012-t06) | ⏳ 🤖 |
| 🟢 Small | <a id="f-012-t06"></a>F-012-T06 — Integration acceptance: the UI projects on one library release | 1 h | 0 h | 1 h | Planned | [F-012-T05](#f-012-t05), `nerv:F-130-T13`, `hobo:F-010-T02`, `grover:F-020-T07`, `fpvbuddy:F-008-T06` | [F-012-T07](#f-012-t07) | ⏳ 🤖 |
| 🟢 Small | <a id="f-012-t07"></a>F-012-T07 — Owner: look at the three apps side by side | 0 h | 0 h | 0 h agent + 0.5 h owner | Planned | [F-012-T06](#f-012-t06) | — | ⏳ 🧑‍🔧 |
| 🔴 Large | **Total** | 6 h | 0 h (0 of 7 steps recorded) | 6 h agent + 0.5 h owner | 0 of 7 completed | | | |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-012.md)

| Field | Value |
|---|---|
| PR / evidence | [#44](https://github.com/voidbrain/coordinator/pull/44), [#45](https://github.com/voidbrain/coordinator/pull/45) (Bricks name); grover [#40](https://github.com/voidbrain/Grover/pull/40), fpvbuddy [#12](https://github.com/voidbrain/FPVBuddy/pull/12) (adoption records), [#48](https://github.com/voidbrain/coordinator/pull/48), [#49](https://github.com/voidbrain/coordinator/pull/49) (bricks added), bricks [#1](https://github.com/voidbrain/bricks/pull/1); owner request 2026-11-25; nerv:F-130 is planned in [voidbrain/nerv#770](https://github.com/voidbrain/nerv/pull/770), so `check:solution` reports it missing until that merges |
| Components | nerv:F-130, hobo:F-010, grover:F-020, fpvbuddy:F-007, fpvbuddy:F-008, bricks:F-001, bricks:F-002, bricks:F-004 |
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
### <a id="f-016"></a>[✨ F-016](#top)

**Shared assets pattern: bricks, blocks and the Gauntlet (model qualification per domain)**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔹 P3 | 🟣 Very large | 10 h | — | — | 🤖 | — | — |

💻 **→** Next: F-016-T02 — Gap-review checks for the three shared assets (Implemented; verification pending).

| | |
|---|---|
| **Issue** | Owner request 2026-11-26. The solution has three shared assets: 🧱 bricks (UI: tokens, themes, components, genUI surfaces), 🧊 blocks (shared domain logic; the repository is created when its first package is really shared) and the Gauntlet (gauntlet-protocol: model qualification). Nothing states, the same way for all three, who owns what, that new work checks the shared asset first and proposes what is missing there rather than writing a private copy, and how a project records a deliberate skip. For the Gauntlet the gap is concrete: only NERV's own features have domain cases ([nerv:F-120](https://github.com/voidbrain/nerv/blob/main/docs/BACKLOG.md#f-120), `evals/gauntlet/system-v1.json`, 8 flows) besides the general packs (coding, embedded, cad-3d, logic-math, italian-quality, long-context, tool-use, structured-output, multi-step-agent and others); the model-facing domains of grover (readings, alerts and feed through MCP: nerv:F-122, nerv:F-123), fpvbuddy (FPV batteries; printed parts, nerv:F-121), hobo (trips, routes and times; scheduling-time is a missing area in gauntlet-protocol:F-022) and openbando (tenders, long Italian documents) have none. Bricks and blocks are not model-facing (a recorded skip). |
| **Reproduce** | docs/DOMAINS.md has rules for shared code and screens but no common rule for the three assets; docs/agents/gap-review.md checks none of them per project; only nerv has an `evals/gauntlet/` directory. |
| **Check** | docs/DOMAINS.md has one "Shared assets" section giving, for each of bricks, blocks and the Gauntlet, who owns what, the check-first rule and the recorded skip (F-016-T01); the gap review flags UI duplicating or missing from bricks, domain logic in two or more projects that is not in blocks, and a model-facing feature or MCP tool with no Gauntlet case and no recorded skip (F-016-T02); the bricks inventories are bricks:F-006 to bricks:F-009, referenced, not repeated; one Gauntlet inventory proposal per project (F-016-T03 to F-016-T07) and a consolidated packs and graders proposal for gauntlet-protocol (F-016-T09); a shared-logic inventory proposing whether to create blocks and its first package, the hobo and openbando maps domain being the candidate (F-016-T08). All reported to the owner through the gap review. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | PRs |
|---|---|---|---|---|---|---|---|---|
| 🟢 Small | <a id="f-016-t02"></a>F-016-T02 — Gap-review checks for the three shared assets | 2 h | 0 h | 0 h | Implemented; verification pending | — | [F-016-T03](#f-016-t03), [F-016-T04](#f-016-t04), [F-016-T05](#f-016-t05), [F-016-T06](#f-016-t06), [F-016-T07](#f-016-t07), [F-016-T08](#f-016-t08) | [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan; [PR #71](https://github.com/voidbrain/coordinator/pull/71) gap-review checks; harness proposal |
| 🟡 Medium | <a id="f-016-t03"></a>F-016-T03 — Gauntlet inventory proposal for nerv | 1.5 h | 0 h | 1.5 h | Planned | [F-016-T02](#f-016-t02) | [F-016-T09](#f-016-t09) | [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan |
| 🟡 Medium | <a id="f-016-t04"></a>F-016-T04 — Gauntlet inventory proposal for grover | 1.5 h | 0 h | 1.5 h | Planned | [F-016-T02](#f-016-t02) | [F-016-T09](#f-016-t09) | [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan |
| 🟡 Medium | <a id="f-016-t05"></a>F-016-T05 — Gauntlet inventory proposal for fpvbuddy | 1.5 h | 0 h | 1.5 h | Planned | [F-016-T02](#f-016-t02) | [F-016-T09](#f-016-t09) | [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan |
| 🟡 Medium | <a id="f-016-t06"></a>F-016-T06 — Gauntlet inventory proposal for hobo | 1.5 h | 0 h | 1.5 h | Planned | [F-016-T02](#f-016-t02) | [F-016-T09](#f-016-t09) | [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan |
| 🟡 Medium | <a id="f-016-t07"></a>F-016-T07 — Gauntlet inventory proposal for openbando | 1.5 h | 0 h | 1.5 h | Planned | [F-016-T02](#f-016-t02) | [F-016-T09](#f-016-t09) | [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan |
| 🟡 Medium | <a id="f-016-t08"></a>F-016-T08 — Shared-logic inventory: whether to create blocks and its first package | 1.5 h | 0 h | 1.5 h | Planned | [F-016-T02](#f-016-t02) | — | [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan; [PR #62](https://github.com/voidbrain/coordinator/pull/62) blocks criterion; [PR #63](https://github.com/voidbrain/coordinator/pull/63) battery core not a blocks candidate |
| 🟢 Small | <a id="f-016-t09"></a>F-016-T09 — Consolidated packs and graders proposal for gauntlet-protocol | 1 h | 0 h | 1 h | Planned | [F-016-T03](#f-016-t03), [F-016-T04](#f-016-t04), [F-016-T05](#f-016-t05), [F-016-T06](#f-016-t06), [F-016-T07](#f-016-t07) | — | [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan |
| 🟣 Very large | **Total** | 13.5 h | 0 h (0 of 9 steps recorded) | 10 h | 1 of 9 completed | | | |

<details><summary>Done steps (1)</summary>

| Effort | Step | Estimate | Actual | Status | PRs |
|---|---|---|---|---|---|
| — | <a id="f-016-t01"></a>F-016-T01 — Shared assets section in docs/DOMAINS.md: bricks, blocks and the Gauntlet | 1.5 h | 0 h | Completed | [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan; [PR #62](https://github.com/voidbrain/coordinator/pull/62) blocks criterion; [PR #70](https://github.com/voidbrain/coordinator/pull/70) Shared assets section; [PR #71](https://github.com/voidbrain/coordinator/pull/71) close |

</details>

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-016.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-016-T01: [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan; [PR #62](https://github.com/voidbrain/coordinator/pull/62) blocks criterion; [PR #70](https://github.com/voidbrain/coordinator/pull/70) Shared assets section; [PR #71](https://github.com/voidbrain/coordinator/pull/71) close · F-016-T02: [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan; [PR #71](https://github.com/voidbrain/coordinator/pull/71) gap-review checks; harness proposal · F-016-T03: [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan · F-016-T04: [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan · F-016-T05: [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan · F-016-T06: [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan · F-016-T07: [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan · F-016-T08: [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan; [PR #62](https://github.com/voidbrain/coordinator/pull/62) blocks criterion; [PR #63](https://github.com/voidbrain/coordinator/pull/63) battery core not a blocks candidate · F-016-T09: [PR #61](https://github.com/voidbrain/coordinator/pull/61) plan. [#61](https://github.com/voidbrain/coordinator/pull/61) (plan), [#62](https://github.com/voidbrain/coordinator/pull/62) (blocks criterion), [#65](https://github.com/voidbrain/coordinator/pull/65) (order: solution:F-016 at 7); [#70](https://github.com/voidbrain/coordinator/pull/70) (F-016-T01 Shared assets section); [#71](https://github.com/voidbrain/coordinator/pull/71) (F-016-T02 gap-review checks, close F-016-T01); owner request and approval 2026-11-26; scope widened and blocks candidates corrected by the owner 2026-11-26 |
| Components | nerv:F-120, nerv:F-121, nerv:F-122, nerv:F-123, gauntlet-protocol:F-021, gauntlet-protocol:F-022, bricks:F-006, bricks:F-007, bricks:F-008, bricks:F-009, fpvbuddy:F-005, grover:F-008, nerv:F-101 |
| Opened | 2026-11-26 |
| Verification | Pending |
| Reviewed | 2026-11-26 |

</details>

---
### <a id="f-017"></a>[✨ F-017](#top)

**Cross-project audit: the repositories agree with each other**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔹 P3 | 🟡 Medium | 2 h | — | — | 🤖 | — | — |

💻 **→** Next: F-017-T02 — First cross-project audit run (Planned).

| | |
|---|---|
| **Issue** | Per-project audits exist in all 9 components (7-day cadence; only project-harness and openbando enforce it), and the gap review finds missing steps and harness lag, but nothing checks that the repositories agree with each other. Evidence 2026-11-26: nerv:F-101-T05 had NERV import the FPV core, contradicting the 2026-11-25 screens/domain decision in docs/DOMAINS.md; fpvbuddy:F-005 waited on nerv:F-101-T04 although its own PR (FPVBuddy#17) delivered that step; the owner caught both and no check did (fixed in nerv#792, FPVBuddy#17, coordinator#63). Audit freshness 2026-11-26: nerv last full audit 2026-11-20; fpvbuddy, hobo and bricks only baseline audits; gauntlet-protocol only a reconcile audit. |
| **Reproduce** | Read docs/agents/gap-review.md and docs/agents/solution-gaps.md: no kind compares a plan with a later decision, a producer with its consumer, or reports a component's audit age; a step that depends on a closed or cancelled step of another repository shows only when the step is missing from its backlog. |
| **Check** | docs/agents/cross-project-audit.md exists and is linked from AGENTS.md and docs/agents/procedures.md, covering cross-references, decisions, contracts, duplication and audit cadence (F-017-T01); the first run is recorded with evidence and its proposals are listed for the owner (F-017-T02); project-harness has a proposal to automate cross-references and audit cadence in the solution tool (F-017-T03). |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | PRs |
|---|---|---|---|---|---|---|---|---|
| 🟡 Medium | <a id="f-017-t02"></a>F-017-T02 — First cross-project audit run | 1.5 h | 0 h | 1.5 h | Planned | — | [F-017-T03](#f-017-t03) | [PR #66](https://github.com/voidbrain/coordinator/pull/66) plan |
| 🟢 Small | <a id="f-017-t03"></a>F-017-T03 — Proposal to project-harness: automate checks 1 and 5 | 0.5 h | 0 h | 0.5 h | Planned | [F-017-T02](#f-017-t02) | — | [PR #66](https://github.com/voidbrain/coordinator/pull/66) plan |
| 🟡 Medium | **Total** | 4.5 h | 0 h (0 of 3 steps recorded) | 2 h | 1 of 3 completed | | | |

<details><summary>Done steps (1)</summary>

| Effort | Step | Estimate | Actual | Status | PRs |
|---|---|---|---|---|---|
| — | <a id="f-017-t01"></a>F-017-T01 — Cross-project audit procedure | 2.5 h | 0 h | Completed | [PR #66](https://github.com/voidbrain/coordinator/pull/66) plan; [PR #67](https://github.com/voidbrain/coordinator/pull/67) procedure; [PR #68](https://github.com/voidbrain/coordinator/pull/68) undo procedures.md fork; close |

</details>

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-017.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-017-T01: [PR #66](https://github.com/voidbrain/coordinator/pull/66) plan; [PR #67](https://github.com/voidbrain/coordinator/pull/67) procedure; [PR #68](https://github.com/voidbrain/coordinator/pull/68) undo procedures.md fork; close · F-017-T02: [PR #66](https://github.com/voidbrain/coordinator/pull/66) plan · F-017-T03: [PR #66](https://github.com/voidbrain/coordinator/pull/66) plan. [#66](https://github.com/voidbrain/coordinator/pull/66) (plan); [#67](https://github.com/voidbrain/coordinator/pull/67) (F-017-T01 procedure); [#68](https://github.com/voidbrain/coordinator/pull/68) (undo the procedures.md fork, close F-017-T01); owner approval 2026-11-26; evidence: nerv#792, FPVBuddy#17, [#63](https://github.com/voidbrain/coordinator/pull/63) · [#69](https://github.com/voidbrain/coordinator/pull/69) (order: solution:F-017 at 8) |
| Components | nerv:F-101, nerv:F-122, fpvbuddy:F-005, grover:F-008 |
| Opened | 2026-11-26 |
| Verification | Pending |
| Reviewed | 2026-11-26 |

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
