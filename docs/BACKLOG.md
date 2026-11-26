# <a id="top"></a>Coordinator backlog

Current work ledger, reviewed 26 November 2026 against main `837fb31`. PR #99 reconciles the harness to v10.24.1 (from 10.21.4); the owner authorised it in chat on 2026-11-26 ("ok to all") although the template backlog is not empty. CI pending at this entry.
Cross-repository work only; each component's work lives in its own backlog ([dashboard](SOLUTION-DASHBOARD.md)). [Rules](BACKLOG-RULES.md) · [Archive 2026](archive/backlog-2026.md) · [Reading the records](#how-to-use-this-file).

<!-- totals:start -->
**Remaining effort:** 23.75 h agent + 2.25 h owner across 27 open steps of 10 features and 2 other records. Generated from the task files.
<!-- totals:end -->

## Work items

Bugs (B-) and features (F-) in one list, most urgent first.

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
### <a id="b-006"></a>[🐞 B-006](#top)

**The hourly refresh schedule fires about once a day**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🟠 Investigate | 🔹 P3 | 🟢 Small | 0.5 h | — | — | 🤖 | — | — |

💻 **→** Next: B-006-T01 — Count scheduled runs over 48 hours and report (Ready).

| | |
|---|---|
| **Issue** | Full audit 2026-11-26 ([report](audits/2026-11-26-coordinator-full.md), finding 2). Since the hourly cron `17 * * * *` landed (PR #43, 2026-11-25 18:13 UTC) to 2026-11-26 09:33 UTC, about 15 hourly slots, Refresh solution views ran on `schedule` once (01:49 UTC); every other run was by hand. Maintenance freshness (`0 9 * * *`) last ran on schedule 2026-11-25 18:57. A hypothesis, not a confirmed bug: GitHub may drop or delay schedules under load. B-004 cannot close on "a day of scheduled runs" until this is understood. |
| **Reproduce** | `gh run list -R voidbrain/coordinator --workflow refresh-views.yml --event schedule --limit 50 --json createdAt -q '.[].createdAt'` and compare with the hours since 2026-11-25 18:13 UTC. |
| **Check** | Scheduled runs counted over 48 h here and in one sibling repository with a schedule, with the Actions state of the workflow; the record states whether the schedule fires as configured, and the owner chooses (accept, another minute, or another trigger) if it does not. |

**Steps**

| Effort | Step | Estimate | Actual | Remaining | Status |
|---|---|---|---|---|---|
| 🟢 Small | <a id="b-006-t01"></a>B-006-T01 — Count scheduled runs over 48 hours and report | 0.5 h | 0 h | 0.5 h | Ready |
| 🟢 Small | **Total** | 0.5 h | 0 h (0 of 1 steps recorded) | 0.5 h | 0 of 1 completed |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/B-006.md)

| Field | Value |
|---|---|
| PR / evidence | [#81](https://github.com/voidbrain/coordinator/pull/81) (opened); [full audit 2026-11-26](audits/2026-11-26-coordinator-full.md) |
| Opened | 2026-11-26 |
| Verification | Pending |
| Reviewed | 2026-11-26 |

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
| 🔴 Open | 🔶 P2 | 🟢 Small | 1 h | `nerv:F-120-T02` | — | ⏳ | — | — |

💻 **→** Next: F-007-T01 — Name the Gauntlet release NERV needs for its new cases in docs/SOLUTION.md (waits on nerv:F-120) (Planned).

| | |
|---|---|
| **Issue** | nerv:F-120 waits on domain packs requested from gauntlet-protocol the same day; gauntlet-protocol has no open record for them (gap review, kind 1). |
| **Reproduce** | nerv F-120 Issue; gauntlet-protocol backlog: no open records on 2026-11-24. |
| **Check** | The required gauntlet-protocol release and NERV's vendored version are named in docs/SOLUTION.md, and a Gauntlet run of the new NERV cases is linked. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | PRs |
|---|---|---|---|---|---|---|---|---|
| 🟢 Small | <a id="f-007-t01"></a>F-007-T01 — Name the Gauntlet release NERV needs for its new cases in docs/SOLUTION.md (waits on nerv:F-120) | 0.5 h | 0 h | 0.5 h | Planned | `nerv:F-120-T02` | [F-007-T02](#f-007-t02) | [PR #39](https://github.com/voidbrain/coordinator/pull/39) dependsOn nerv:F-120 open steps; [PR #77](https://github.com/voidbrain/coordinator/pull/77) externalMet nerv:F-120-T01, T03 |
| 🟢 Small | <a id="f-007-t02"></a>F-007-T02 — Link a Gauntlet run of the new NERV cases as acceptance | 0.5 h | 0 h | 0.5 h | Planned | [F-007-T01](#f-007-t01) | — | — |
| 🟢 Small | **Total** | 1 h | 0 h (0 of 2 steps recorded) | 1 h | 0 of 2 completed | | | |

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-007.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-007-T01: [PR #39](https://github.com/voidbrain/coordinator/pull/39) dependsOn nerv:F-120 open steps; [PR #77](https://github.com/voidbrain/coordinator/pull/77) externalMet nerv:F-120-T01, T03. — |
| Components | nerv:F-120 |
| Opened | 2026-11-24 |
| Verification | Pending |
| Reviewed | 2026-11-24 |

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
| 🟢 Small | <a id="f-012-t05"></a>F-012-T05 — Add voidbrain/bricks to the solution and propose its adoption | 0.5 h | 0 h | 0.5 h | Ready | — | [F-012-T06](#f-012-t06) | 🤖 |
| 🟡 Medium | <a id="f-012-t02"></a>F-012-T02 — Design-token contract matching NERV's style guide | 2 h | 0 h | 2 h | Planned | [F-012-T01](#f-012-t01) | [F-012-T03](#f-012-t03) | ⏳ 🤖 |
| 🟡 Medium | <a id="f-012-t03"></a>F-012-T03 — Shared component contract from what the NERV dashboard migration produced | 2 h | 0 h | 2 h | Planned | [F-012-T02](#f-012-t02), `nerv:F-130-T02`, `nerv:F-130-T05`, `nerv:F-130-T09` | — | ⏳ 🤖 |
| 🟢 Small | <a id="f-012-t06"></a>F-012-T06 — Integration acceptance: the UI projects on one library release | 1 h | 0 h | 1 h | Planned | [F-012-T05](#f-012-t05), `nerv:F-130-T13`, `hobo:F-010-T02`, `grover:F-020-T07`, `fpvbuddy:F-008-T06` | [F-012-T07](#f-012-t07) | ⏳ 🤖 |
| 🟢 Small | <a id="f-012-t07"></a>F-012-T07 — Owner: look at the three apps side by side | 0 h | 0 h | 0 h agent + 0.5 h owner | Planned | [F-012-T06](#f-012-t06) | — | ⏳ 🧑‍🔧 |
| 🔴 Large | **Total** | 6 h | 0 h (0 of 7 steps recorded) | 6 h agent + 0.5 h owner | 1 of 7 completed | | | |

<details><summary>Done steps (1)</summary>

| Effort | Step | Estimate | Actual | Status |
|---|---|---|---|---|
| — | <a id="f-012-t04"></a>F-012-T04 — Owner: create the voidbrain/bricks library repository | 0 h | 0 h | Completed |

</details>

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

💻 **→** Next: F-013-T02 — First gap review against the domain map (Planned).

| | |
|---|---|
| **Issue** | Owner request 2026-11-25. voidbrain/openbando is not a solution component, so the dashboard does not show its work, and nothing says which domains the projects share (maps and geo, Blackbox telemetry, 3D, UI components, fleet and batteries), so two projects can build the same thing twice or extract a package nobody shares. |
| **Reproduce** | `.solution.json` on main before this record has no `openbando`; no page lists the projects' domains. |
| **Check** | `openbando` is in `.solution.json` with emoji 🏚️ and its backlog reads in the dashboard; [docs/DOMAINS.md](DOMAINS.md) lists every component's modules with code links and the shared domains with who has or needs them, and states that a shared package is extracted only when two projects really share the code; the gap review reads the page (F-013-T02). |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | PRs |
|---|---|---|---|---|---|---|
| 🟢 Small | <a id="f-013-t02"></a>F-013-T02 — First gap review against the domain map | 0.5 h | 0 h | 0.5 h | Planned | — |
| 🟢 Small | **Total** | 1.5 h | 0 h (0 of 2 steps recorded) | 0.5 h | 1 of 2 completed | |

<details><summary>Done steps (1)</summary>

| Effort | Step | Estimate | Actual | Status | PRs |
|---|---|---|---|---|---|
| — | <a id="f-013-t01"></a>F-013-T01 — Add openbando to the solution and write the domain map | 1 h | 0 h | Completed | [PR #46](https://github.com/voidbrain/coordinator/pull/46) |

</details>

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
### <a id="f-018"></a>[✨ F-018](#top)

**Producer-neutral alert contract: one shape for any producer NERV delivers**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔹 P3 | 🟡 Medium | 3 h agent + 0.25 h owner | — | — | 🤖 | — | — |

💻 **→** Next: F-018-T02 — Write the side-change proposals for the eight differences from nerv:F-122 (Planned).

| | |
|---|---|
| **Issue** | Cross-project audit 2026-11-26, proposal 9, accepted by the owner 2026-11-26. fpvbuddy:F-013 (battery storage alerts) and nerv:F-101-T09 reuse "nerv:F-122's contract", but [F-122's design](https://github.com/voidbrain/nerv/blob/353fe20/docs/decisions/grover-alert-delivery.md) is Grover-only: entries without `roomId` are skipped, config and ledger are `grover`, and night classes come from Grover key shapes. [fpvbuddy:F-013-T01](https://github.com/voidbrain/FPVBuddy/blob/13a259d/docs/work/tasks/F-013-T01.json) already asks what replaces `roomId`. [DOMAINS](DOMAINS.md#distributed-contracts) says the alert contract generalises when a second producer sends alerts. |
| **Reproduce** | Read nerv's `docs/decisions/grover-alert-delivery.md` and fpvbuddy:F-013-T01: no written shape covers a producer other than Grover; [SOLUTION](SOLUTION.md) names `grover_alerts` only. |
| **Check** | [SOLUTION](SOLUTION.md) has one alert contract for any producer: key, level, message, since, an optional scope that replaces `roomId`, and a serious/minor table per producer (grover, fpvbuddy), with the DOMAINS "Distributed contracts" Alerts row pointing at it (F-018-T01); the nerv step that generalises the poller, and any producer change, is proposed to its owning repository through the gap review (F-018-T02), and the owner decides which side moves (F-018-T03). |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | Who | PRs |
|---|---|---|---|---|---|---|---|:---:|---|
| 🟢 Small | <a id="f-018-t02"></a>F-018-T02 — Write the side-change proposals for the eight differences from nerv:F-122 | 0.5 h | 0 h | 0.5 h | Planned | — | [F-018-T03](#f-018-t03) | 🤖 | [PR #77](https://github.com/voidbrain/coordinator/pull/77) plan; [PR #85](https://github.com/voidbrain/coordinator/pull/85) split |
| 🟡 Medium | <a id="f-018-t04"></a>F-018-T04 — Add a heartbeat and the producer fallback to the alert contract | 2 h | 0 h | 2 h | Planned | — | [F-018-T05](#f-018-t05) | 🤖 | [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan |
| 🟢 Small | <a id="f-018-t05"></a>F-018-T05 — Write the heartbeat and fallback proposals for the producers and NERV | 0.5 h | 0 h | 0.5 h | Planned | [F-018-T04](#f-018-t04) | [F-018-T03](#f-018-t03) | ⏳ 🤖 | [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan |
| 🟢 Small | <a id="f-018-t03"></a>F-018-T03 — Owner: decide which side moves for each alert-contract proposal | 0 h | 0 h | 0 h agent + 0.25 h owner | Planned | [F-018-T02](#f-018-t02), [F-018-T05](#f-018-t05) | — | ⏳ 🤔 | [PR #85](https://github.com/voidbrain/coordinator/pull/85) split |
| 🟡 Medium | **Total** | 4.5 h | 0 h (0 of 5 steps recorded) | 3 h agent + 0.25 h owner | 1 of 5 completed | | | | |

<details><summary>Done steps (1)</summary>

| Effort | Step | Estimate | Actual | Status | PRs |
|---|---|---|---|---|---|
| — | <a id="f-018-t01"></a>F-018-T01 — Write the producer-neutral alert contract in SOLUTION | 1.5 h | 0 h | Completed | [PR #77](https://github.com/voidbrain/coordinator/pull/77) plan; [PR #79](https://github.com/voidbrain/coordinator/pull/79) contract; [PR #81](https://github.com/voidbrain/coordinator/pull/81) close |

</details>

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-018.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-018-T01: [PR #77](https://github.com/voidbrain/coordinator/pull/77) plan; [PR #79](https://github.com/voidbrain/coordinator/pull/79) contract; [PR #81](https://github.com/voidbrain/coordinator/pull/81) close · F-018-T02: [PR #77](https://github.com/voidbrain/coordinator/pull/77) plan; [PR #85](https://github.com/voidbrain/coordinator/pull/85) split · F-018-T03: [PR #85](https://github.com/voidbrain/coordinator/pull/85) split · F-018-T04: [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan · F-018-T05: [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan. [#92](https://github.com/voidbrain/coordinator/pull/92) (plan); [#77](https://github.com/voidbrain/coordinator/pull/77) (plan); [#79](https://github.com/voidbrain/coordinator/pull/79) (F-018-T01 contract); [#81](https://github.com/voidbrain/coordinator/pull/81) (close F-018-T01); [#85](https://github.com/voidbrain/coordinator/pull/85) (split F-018-T02 and F-018-T03); [NERV practices transfer report](reviews/2026-11-26-nerv-practices-transfer.md) (proposal 2); cross-project audit [2026-11-26](audits/2026-11-26-cross-project.md), proposal 9; owner acceptance 2026-11-26 |
| Components | nerv:F-122, nerv:F-101, fpvbuddy:F-013, grover:F-008 |
| Opened | 2026-11-26 |
| Verification | Pending |
| Reviewed | 2026-11-26 |

</details>

---
### <a id="f-019"></a>[✨ F-019](#top)

**Turn on the dormant procedure settings: reviews, work usage, behaviour runner**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔹 P3 | 🟢 Small | 1 h | — | — | 🤖 | — | — |

💻 **→** Next: F-019-T03 — First token and skills reviews (Planned).

| | |
|---|---|
| **Issue** | The 2026-11-26 dormant-checks sweep (`docs/audits/2026-11-26-dormant-checks.md`, rows S1, S2, S3, S5) found no periodic reviews (`reviews` unset), work-usage measurement off and no `behaviour.runner` here; this repository measures no coverage. |
| **Reproduce** | `.harness.json` on `main` `2f93786`: no `reviews`, `workUsage.enabled: false`, `behaviour` `{times: 3}`, no `coverage`. |
| **Check** | `.harness.json` sets `reviews` (token, architecture, skills at 30 days), `workUsage.enabled: true` and `behaviour.runner`; the first architecture review with its outside-landscape comparison and the owner's seven leads of 2026-11-26 is `docs/reviews/architecture/2026-11-26.md`. Coverage stays unmeasured (decision below). First token and skills reviews: F-019-T03. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | PRs |
|---|---|---|---|---|---|---|
| 🟢 Small | <a id="f-019-t03"></a>F-019-T03 — First token and skills reviews | 1 h | 0 h | 1 h | Planned | — |
| 🟢 Small | **Total** | 1.75 h | 0 h (0 of 3 steps recorded) | 1 h | 2 of 3 completed | |

<details><summary>Done steps (2)</summary>

| Effort | Step | Estimate | Actual | Status | PRs |
|---|---|---|---|---|---|
| — | <a id="f-019-t01"></a>F-019-T01 — Reviews, work usage and behaviour runner settings | 0.25 h | 0 h | Completed | [PR #88](https://github.com/voidbrain/coordinator/pull/88) settings on |
| — | <a id="f-019-t02"></a>F-019-T02 — First architecture review with outside-landscape comparison and the owner's leads | 0.5 h | 0 h | Completed | [PR #88](https://github.com/voidbrain/coordinator/pull/88) first architecture review |

</details>

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-019.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-019-T01: [PR #88](https://github.com/voidbrain/coordinator/pull/88) settings on · F-019-T02: [PR #88](https://github.com/voidbrain/coordinator/pull/88) first architecture review. [#88](https://github.com/voidbrain/coordinator/pull/88); [#94](https://github.com/voidbrain/coordinator/pull/94) |
| Opened | 2026-11-26 |
| Verification | Pending |
| Reviewed | 2026-11-26 |

</details>

---
### <a id="f-020"></a>[✨ F-020](#top)

**Coherence review: docs and procedures consistent, clear and fluent, per repo and across repos**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔹 P3 | 🔴 Large | 6.25 h agent + 0.5 h owner | — | — | 🤖 | — | — |

💻 **→** Next: F-020-T03 — Measure friction: behaviour checks in 2 or 3 representative repositories plus the friction logs (Planned).

| | |
|---|---|
| **Issue** | On 2026-11-26 about 15 records and 3 procedures were added across project-harness, the coordinator and the projects in one day. Evidence that the rule set grew faster than it was kept coherent: size warnings (project-harness `rule-review.md` about 2,300 of 2,000 tokens; records over budget: project-harness F-096, nerv F-125, coordinator F-016); the same topic in several places (audit cadence: project-harness F-104-T03 and F-105, [cross-project audit](agents/cross-project-audit.md) check 5, per-project audit settings); agent slips the same day (a silently forked copied harness file, a reversed battery-core wording, a skipped failing-first test, an edit in NERV's primary checkout); the owner needed plain-language re-explanations of decision questions (project-harness F-102-T01, coordinator B-007, nerv F-132-T04 options). |
| **Reproduce** | `npm run check:backlog` and `npm run check:rules` in project-harness, nerv and the coordinator at 2026-11-26 report the size warnings above; grep the audit cadence in the three places named; the slips and the re-explanations are in the 2026-11-26 sessions' PR threads and chat. |
| **Check** | One page per repository and one cross-repository page under `docs/reviews/2026-11-coherence/` list contradictions, duplicate rules, dead links, terms used two ways, procedures unreachable from AGENTS.md, pages and records over budget and decision questions the owner cannot answer as written (F-020-T01, T02); the friction evidence names the behaviour runs used (F-020-T03); numbered consolidation proposals keep every requirement (F-020-T04); the owner decided each (F-020-T05); the freeze in the Next action is lifted (F-020-T06). |
| **Note** | 2026-11-26, owner approval in chat ("ok"): a decision proposal, [live index for backlogs and dashboard](decisions/live-index.md), options A (small fixes), B (live index in NERV, git stays the source; recommended, read-only phase 1 first) and C (records in a database); the owner's choice is recorded there and here. 2026-11-26, owner instruction (the freeze does not block a review row): the Tiiny AI Pocket Lab is a watch lead in the [architecture review](work/records/reviews/architecture/2026-11-26.md), [PR #107](https://github.com/voidbrain/coordinator/pull/107). Revisit triggers are listed there. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | Who | PRs |
|---|---|---|---|---|---|---|---|:---:|---|
| 🟡 Medium | <a id="f-020-t03"></a>F-020-T03 — Measure friction: behaviour checks in 2 or 3 representative repositories plus the friction logs | 3 h | 0 h | 3 h | Planned | — | [F-020-T04](#f-020-t04) | 🤖 | [PR #89](https://github.com/voidbrain/coordinator/pull/89) plan |
| 🟡 Medium | <a id="f-020-t04"></a>F-020-T04 — Consolidation proposals per repository, as proposals to each owning repository | 3 h | 0 h | 3 h | Planned | [F-020-T03](#f-020-t03) | [F-020-T05](#f-020-t05) | ⏳ 🤖 | [PR #89](https://github.com/voidbrain/coordinator/pull/89) plan |
| 🟢 Small | <a id="f-020-t05"></a>F-020-T05 — Owner: accept or reject each proposal; decide the freeze lines for the other repositories | 0 h | 0 h | 0 h agent + 0.5 h owner | Planned | [F-020-T04](#f-020-t04) | [F-020-T06](#f-020-t06) | ⏳ 🤔 | [PR #89](https://github.com/voidbrain/coordinator/pull/89) plan |
| 🟢 Small | <a id="f-020-t06"></a>F-020-T06 — Lift the freeze on new procedures here and record the outcome | 0.25 h | 0 h | 0.25 h | Planned | [F-020-T05](#f-020-t05) | — | ⏳ 🤖 | [PR #89](https://github.com/voidbrain/coordinator/pull/89) plan |
| 🔴 Large | **Total** | 12.25 h | 0 h (0 of 6 steps recorded) | 6.25 h agent + 0.5 h owner | 2 of 6 completed | | | | |

<details><summary>Done steps (2)</summary>

| Effort | Step | Estimate | Actual | Status | PRs |
|---|---|---|---|---|---|
| — | <a id="f-020-t01"></a>F-020-T01 — Per-repo coherence read by a fresh-context agent, one checklist item per repository (9) | 4 h | 0 h | Completed | [PR #89](https://github.com/voidbrain/coordinator/pull/89) plan; [PR #95](https://github.com/voidbrain/coordinator/pull/95) coherence read, nine pages; [PR #96](https://github.com/voidbrain/coordinator/pull/96) close |
| — | <a id="f-020-t02"></a>F-020-T02 — Cross-repo pass: rules that differ without a project marker, one owner per topic | 2 h | 0 h | Completed | [PR #89](https://github.com/voidbrain/coordinator/pull/89) plan; [PR #105](https://github.com/voidbrain/coordinator/pull/105) cross-repository pass; [PR #106](https://github.com/voidbrain/coordinator/pull/106) close |

</details>

<details>
<summary>Next action, estimates and PR history</summary>

[Full notes & evidence](work/records/F-020.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-020-T01: [PR #89](https://github.com/voidbrain/coordinator/pull/89) plan; [PR #95](https://github.com/voidbrain/coordinator/pull/95) coherence read, nine pages; [PR #96](https://github.com/voidbrain/coordinator/pull/96) close · F-020-T02: [PR #89](https://github.com/voidbrain/coordinator/pull/89) plan; [PR #105](https://github.com/voidbrain/coordinator/pull/105) cross-repository pass; [PR #106](https://github.com/voidbrain/coordinator/pull/106) close · F-020-T03: [PR #89](https://github.com/voidbrain/coordinator/pull/89) plan · F-020-T04: [PR #89](https://github.com/voidbrain/coordinator/pull/89) plan · F-020-T05: [PR #89](https://github.com/voidbrain/coordinator/pull/89) plan · F-020-T06: [PR #89](https://github.com/voidbrain/coordinator/pull/89) plan. [#110](https://github.com/voidbrain/coordinator/pull/110) (live index decision proposal); [#105](https://github.com/voidbrain/coordinator/pull/105) (F-020-T02 cross-repository pass); [#102](https://github.com/voidbrain/coordinator/pull/102) (hidden-code sweep, proposal P-HC1); [#101](https://github.com/voidbrain/coordinator/pull/101) (item image attach row, owner instructions 2026-11-26); [#92](https://github.com/voidbrain/coordinator/pull/92) (plan); [#89](https://github.com/voidbrain/coordinator/pull/89) (plan); [#91](https://github.com/voidbrain/coordinator/pull/91) (order position, owner instruction 2026-11-26); owner approval 2026-11-26 (chat "ok"); [#94](https://github.com/voidbrain/coordinator/pull/94); [#95](https://github.com/voidbrain/coordinator/pull/95) (F-020-T01 coherence read); [#108](https://github.com/voidbrain/coordinator/pull/108); [#109](https://github.com/voidbrain/coordinator/pull/109) |
| Components | project-harness:F-096, project-harness:F-104, project-harness:F-105, nerv:F-125, nerv:F-132 |
| Opened | 2026-11-26 |
| Verification | Pending |
| Reviewed | 2026-11-26 |

</details>

---
### <a id="f-021"></a>[✨ F-021](#top)

**Solution-wide inventories of durable data and of credentials**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔹 P3 | 🟡 Medium | 3 h | — | — | 🤖 | — | — |

💻 **→** Next: F-021-T01 — Table of durable data and backups (Planned).

| | |
|---|---|
| **Issue** | Durable data lives in several components with different backup states (nerv F-062: snapshots, off-host copies, owner drill pending; grover F-010: backup command, no schedule, SD card; fpvbuddy data until it moves; the hobo server), and credentials are spread over components (Telegram, APNs, Gmail OAuth, GitHub token, `OPENBANDO_AI_KEY`, hobo routing keys, bricks npm trusted publishing). No page lists them, so the owner cannot see which data has no restore drill or which credential has no revocation path. Evidence: [NERV practices transfer report](https://github.com/voidbrain/coordinator/blob/main/docs/reviews/2026-11-26-nerv-practices-transfer.md), class C items C4 and C5; situation-gap rows X3 and X4; missing practice M8. Owner decision 2026-11-26 in chat: "NERV practices inventory accept all" (all 22 proposals of the [report](https://github.com/voidbrain/coordinator/blob/main/docs/reviews/2026-11-26-nerv-practices-transfer.md); this record is proposal 15). |
| **Reproduce** | Read [SOLUTION](https://github.com/voidbrain/coordinator/blob/main/docs/SOLUTION.md): no table of durable data, backup schedule, off-host copy or restore drill, and no list of credentials. |
| **Check** | SOLUTION has a table of durable data (holder, what, backup schedule, off-host copy, last restore drill with a link or "never") (F-021-T01) and a table of credentials (name, holder component, place, rotation date, how to revoke; never a value) (F-021-T02); each row cites the record that owns the fix; unknown cells say unknown; the tables are linked from DOMAINS and the cross-project audit page reads them. |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | PRs |
|---|---|---|---|---|---|---|
| 🟡 Medium | <a id="f-021-t01"></a>F-021-T01 — Table of durable data and backups | 1.5 h | 0 h | 1.5 h | Planned | [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan |
| 🟡 Medium | <a id="f-021-t02"></a>F-021-T02 — Table of credentials | 1.5 h | 0 h | 1.5 h | Planned | [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan |
| 🟡 Medium | **Total** | 3 h | 0 h (0 of 2 steps recorded) | 3 h | 0 of 2 completed | |

<details>
<summary>Next action, estimates and evidence</summary>

[Full notes & evidence](work/records/F-021.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-021-T01: [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan · F-021-T02: [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan. [#92](https://github.com/voidbrain/coordinator/pull/92) (plan); [report](https://github.com/voidbrain/coordinator/blob/main/docs/reviews/2026-11-26-nerv-practices-transfer.md); owner decision 2026-11-26 |
| Opened | 2026-11-26 |
| Verification | Pending |
| Reviewed | 2026-11-26 |

</details>

---
### <a id="f-022"></a>[✨ F-022](#top)

**GitHub security settings baseline for the nine repositories**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔶 P2 | 🟢 Small | 1 h agent + 0.5 h owner | — | — | 🤖 | — | — |

💻 **→** Next: F-022-T01 — Write the baseline and the cross-project audit check (Planned).

| | |
|---|---|
| **Issue** | Secret scanning and push protection are on in five of the nine repositories and missing in project-harness, coordinator, gauntlet-protocol and grover (all public, so free); Dependabot alerts are on in three and security updates in two; CodeQL runs in nerv and openbando only. A pushed token in a public repository, or a known CVE, goes unseen. Repository settings are the owner's to change. Evidence: [NERV practices transfer report](https://github.com/voidbrain/coordinator/blob/main/docs/reviews/2026-11-26-nerv-practices-transfer.md), class C item C6; missing practices M1, M2, M7; situation-gap row X2; N3. Owner decision 2026-11-26 in chat: "NERV practices inventory accept all" (all 22 proposals of the [report](https://github.com/voidbrain/coordinator/blob/main/docs/reviews/2026-11-26-nerv-practices-transfer.md); this record is proposal 7). |
| **Reproduce** | `gh api repos/voidbrain/<repo> --jq .security_and_analysis` for each of the nine repositories shows the gaps listed in the report. |
| **Check** | SOLUTION states one baseline (secret scanning, push protection, Dependabot alerts and security updates, CodeQL default setup where code exists) and the cross-project audit checks it per repository (F-022-T01); the owner applies it with copy-paste commands and the audit shows no gap (F-022-T02). |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | Depends on | Unlocks | Who | PRs |
|---|---|---|---|---|---|---|---|:---:|---|
| 🟢 Small | <a id="f-022-t01"></a>F-022-T01 — Write the baseline and the cross-project audit check | 1 h | 0 h | 1 h | Planned | — | [F-022-T02](#f-022-t02) | 🤖 | [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan |
| 🟢 Small | <a id="f-022-t02"></a>F-022-T02 — Owner: apply the security baseline to the repositories | 0 h | 0 h | 0 h agent + 0.5 h owner | Planned | [F-022-T01](#f-022-t01) | — | ⏳ 🧑‍🔧 | [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan |
| 🟢 Small | **Total** | 1 h | 0 h (0 of 2 steps recorded) | 1 h agent + 0.5 h owner | 0 of 2 completed | | | | |

<details>
<summary>Next action, estimates and evidence</summary>

[Full notes & evidence](work/records/F-022.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-022-T01: [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan · F-022-T02: [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan. [#92](https://github.com/voidbrain/coordinator/pull/92) (plan); [report](https://github.com/voidbrain/coordinator/blob/main/docs/reviews/2026-11-26-nerv-practices-transfer.md); owner decision 2026-11-26 |
| Opened | 2026-11-26 |
| Verification | Pending |
| Reviewed | 2026-11-26 |

</details>

---
### <a id="f-023"></a>[✨ F-023](#top)

**SBOM as a CI artifact in the coordinator**

| Status | Priority | Effort | Remaining | Depends on | Unlocks | Agent | Procedures | Decisions |
|---|---|---|---|---|---|:---:|:---:|:---:|
| 🔴 Open | 🔹 P3 | 🟢 Small | 0.5 h | — | — | 🤖 | — | — |

💻 **→** Next: F-023-T01 — SBOM step in the coordinator CI (Planned).

| | |
|---|---|
| **Issue** | Seven of the nine repositories attach a CycloneDX SBOM generated from the lock file to CI; the coordinator and gauntlet-protocol do not. Evidence: [NERV practices transfer report](https://github.com/voidbrain/coordinator/blob/main/docs/reviews/2026-11-26-nerv-practices-transfer.md), class A item A8; missing practice M6. Owner decision 2026-11-26 in chat: "NERV practices inventory accept all" (all 22 proposals of the [report](https://github.com/voidbrain/coordinator/blob/main/docs/reviews/2026-11-26-nerv-practices-transfer.md); this record is proposal 16). |
| **Reproduce** | Read `.github/workflows/ci.yml`: no SBOM step. |
| **Check** | CI generates a CycloneDX SBOM from `package-lock.json` and uploads it as an artifact, the same way as the Angular template step (F-023-T01). |

**Feature steps**

| Effort | Step | Estimate | Actual | Remaining | Status | PRs |
|---|---|---|---|---|---|---|
| 🟢 Small | <a id="f-023-t01"></a>F-023-T01 — SBOM step in the coordinator CI | 0.5 h | 0 h | 0.5 h | Planned | [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan |
| 🟢 Small | **Total** | 0.5 h | 0 h (0 of 1 steps recorded) | 0.5 h | 0 of 1 completed | |

<details>
<summary>Next action, estimates and evidence</summary>

[Full notes & evidence](work/records/F-023.md)

| Field | Value |
|---|---|
| PR / evidence | Steps: F-023-T01: [PR #92](https://github.com/voidbrain/coordinator/pull/92) plan. [#92](https://github.com/voidbrain/coordinator/pull/92) (plan); [report](https://github.com/voidbrain/coordinator/blob/main/docs/reviews/2026-11-26-nerv-practices-transfer.md); owner decision 2026-11-26 |
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
