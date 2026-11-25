<!-- generated: project-harness solution dashboard; edit owning backlogs, not this file -->
# voidbrain solution dashboard

Snapshot: 2026-11-25T11:59:49.071Z. Read-only aggregation; no combined completion percentage. Solution integration status is independent of component status.

| Source | Revision | Snapshot state |
|---|---|---|
| solution | [122f5c288e53](https://github.com/voidbrain/coordinator/commit/122f5c288e53ca6c5527bf9070ba717aec964207) | Committed snapshot; requested working checkout; local checkout, not fetched |
| nerv | [896182392525](https://github.com/voidbrain/nerv/commit/896182392525573e79df323165575c85ad0d3d00) | Committed snapshot; requested main; GitHub |
| gauntlet-protocol | [2339e413222c](https://github.com/voidbrain/gauntlet-protocol/commit/2339e413222c65a205cf8dc0f94d00f704cca7af) | Committed snapshot; requested main; GitHub |
| project-harness | [8f79b3c14d98](https://github.com/voidbrain/project-harness/commit/8f79b3c14d9808b47acb9e9119bdd6ce60fa39ad) | Committed snapshot; requested main; GitHub |
| fpvbuddy | [9ba5e862a7e5](https://github.com/voidbrain/FPVBuddy/commit/9ba5e862a7e51cf2169868192db7eddb7b320e60) | Committed snapshot; requested main; GitHub |
| grover | [5265cd523289](https://github.com/voidbrain/Grover/commit/5265cd5232896893b2c76bfa1b54d722262a6c1c) | Committed snapshot; requested main; GitHub |

## Owner view

Open work per project, by what it waits on. Remaining hours are each project's own estimate (below).

| Project | Ready | Waiting for the owner | Blocked | Waiting on other work | Remaining |
|---|---|---|---|---|---|
| solution | 5 | 1 | 1 | 2 | 5.25 h |
| 𖣂 nerv | 60 | 18 | 13 | 31 | 115.5 h |
| 🤖 gauntlet-protocol | 3 | 0 | 0 | 6 | 8.75 h |
| 🦺 project-harness | 1 | 0 | 0 | 0 | 0.25 h |
| 🚁 fpvbuddy | 2 | 0 | 0 | 2 | 3 h |
| 🪴 grover | 7 | 12 | 23 | 3 | 31 h |

## Solution order

The owner's order (docs/solution-order.md): take the first ready item; it never skips a prerequisite or an owner decision.

| # | Item | Title | Status | Priority | Remaining | State | Note |
|---|---|---|---|---|---|---|---|
| 1 | nerv:B-118 | Windows CI: the test step runs into its 18-minute limit | Open | 🔺 P1 | 5 h | Ready (verification) | Windows CI limit: every NERV PR waits on it |
| 2 | nerv:B-124 | A re-target `kaji relocate` signs fences the running main before the target's checks run | Closed | — | — | ✅ Done: closed 2026-11-25 in [docs/archive/backlog-2026.md](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/archive/backlog-2026.md#b-124) | re-target fences the running main too early (P1, relocation safety) |
| 3 | nerv:B-125 | A signed Kaji reply is not bound to its request, so an old epoch-push reply can be replayed | Implemented | 🔶 P2 | 2 h | Ready (verification) | replayable signed Kaji reply (P2, security) |
| 4 | nerv:F-016 | Relocate the logical coordinator without split brain | Open | 🔺 P1 | 1.75 h agent + 1 h owner | **Ready — next** | relocate the coordinator without split brain (after B-124) |
| 5 | nerv:B-091 | Windows: a fenced stop ends uncertain after a SQLite "disk I/O error" while recording it | Open | 🔶 P2 | 3 h | Ready (verification) | prerequisite of nerv:F-005-T29 |
| 6 | nerv:F-005 | Discover, install and operate enrolled remote workers | Open | 🔺 P1 | 3.5 h | Ready (verification) | remote workers (after B-091) |
| 7 | nerv:B-119 | Placement probes longer than 15 s are cut off by the HTTP server | Closed | — | — | ✅ Done: closed 2026-11-25 in [docs/archive/backlog-2026.md](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/archive/backlog-2026.md#b-119) | prerequisite of nerv:F-006 |
| 8 | grover:F-008 | Alerts for NERV: out-of-range values, offline agent, faults | Open | 🔶 P2 | 0.25 h owner | Blocked: owner step grover:F-005-T01 | alerts NERV can deliver (cross-repository) |
| 9 | nerv:F-120 | Gauntlet coverage of NERV capabilities | Open | 🔶 P2 | 5 h | Ready | Gauntlet coverage of NERV capabilities (cross-repository) |
| 10 | nerv:F-122 | Deliver Grover alerts | Open | 🔹 P3 | 4 h agent + 0.5 h owner | Ready (verification) | Grover alert delivery, unblocks grover:F-008 |
| 11 | nerv:F-123 | Connect NERV to Grover's hub over MCP | Open | 🔹 P3 | 2.5 h agent + 0.5 h owner | Ready (verification) | MCP connection to Grover's hub |
| 12 | fpvbuddy:F-005 | M1 — FPV battery core package | Open | 🔶 P2 | 3 h | Ready | M1 FPV battery core; T02 waits on nerv:F-101-T04 |
| 13 | nerv:F-121 | Printed parts per drone: "print Smoke's feet" | Open | 🔹 P3 | 0.5 h owner | Ready (verification) | printed parts per drone, print by chat |
| 14 | grover:F-011 | Feed cycle per pot: supply tanks, mixing tank, pot pumps | Implemented | 🔺 P1 | 0.5 h agent + 0.5 h owner | Owner: Procedure | implemented P1 feed cycle; owner try-out pending |
| 15 | grover:F-004 | Calibrate analog probes (volts to pH and EC) | Implemented | 🔺 P1 | 0.25 h agent + 1 h owner | Blocked: owner step grover:F-005-T01 | implemented P1 probe calibration |
| 16 | nerv:F-006 | Orchestrate agents and models across nodes | Open | 🔺 P1 | 0 h | Ready (verification) | orchestration across nodes (after B-119) |
| 17 | grover:F-003 | Hardware bring-up on the Raspberry Pi | Open | 🔺 P1 | 2.5 h agent + 4.5 h owner | Owner: Decision | hardware bring-up on the Pi (P1, needs the device) |

## Waiting for the owner

| Item | Kind | Title |
|---|---|---|
| solution:F-004-T04 | Procedure | Owner takes Proposal 4 (the overview's layout the dashboard lacks) to a project-harness session |
| nerv:F-062-T07 | Procedure | Owner runs the restore drill on NERV-01 from a real off-host copy |
| nerv:F-011-T02 | Procedure | Live menu, service-button and login acceptance on the Mac |
| nerv:F-004-T06 | Procedure | Phone install and push acceptance |
| nerv:F-012-T05 | Procedure | Edge cases and real-host acceptance |
| nerv:F-016-T09 | Procedure | Step 5b — Two-device relocation acceptance |
| nerv:F-086-T04 | Procedure | Owner check with the owner's account |
| nerv:F-087-T04 | Procedure | Owner check on the real printer |
| nerv:F-092-T04 | Procedure | Owner check on the Mac |
| nerv:B-057-T02 | Procedure | Owner live check: rotated certificate message (part D step 1) |
| nerv:B-068-T02 | Procedure | Owner check: Stop then Start from the companion |
| nerv:B-122-T02 | Procedure | Owner updates NERV-01 and sees the foreground reason |
| nerv:B-123-T02 | Procedure | Owner: Update now shows the updater's status in Health |
| nerv:B-128-T02 | Procedure | Owner: scan the Settings pairing QR from the Mac with the phone |
| nerv:F-098-T04 | Procedure | Live check with a real crash |
| nerv:F-060-T01 | Procedure | herdr-core trial in the development workspace |
| nerv:F-116-T02 | Decision | Owner decision: build model splitting or close |
| nerv:F-007-T05 | Procedure | Step 2c — Voice corpus evaluation run and report |
| nerv:B-056-T02 | Procedure | Owner live check: refused and unconfirmed renewal in the companion |
| grover:F-005-T01 | Procedure | Owner installs hub and agent on the Pi behind Tailscale |
| grover:F-003-T01 | Decision | Owner chooses the water-level sensor |
| grover:F-011-T02 | Procedure | Owner tries a feed on the simulated rig on the dev stack |
| grover:F-006-T02 | Procedure | Owner tries the Setup pages on the dev stack |
| grover:F-007-T02 | Procedure | Owner tries Switch to bloom and the light line on the dev stack |
| grover:F-013-T02 | Procedure | Owner tries the plant cycle on the dev stack |
| grover:F-014-T02 | Procedure | Owner tries the plant page on the dev stack |
| grover:F-015-T02 | Procedure | Owner tries the rig map on a phone and a laptop, light and dark on the dev stack |
| grover:F-016-T02 | Procedure | Owner tries weekday schedules on the dev stack |
| grover:F-018-T01 | Procedure | Owner writes down the pump wiring (L298N inputs on MCP23017 pins) |
| grover:B-009-T01 | Decision | Owner decides on closing the eight v1 Dependabot PRs |
| grover:F-017-T03 | Procedure | Owner picks the nutrient colours |

## Blocked

| Item | Root cause |
|---|---|
| solution:F-004-T05 | owner step solution:F-004-T04, in this project |
| nerv:F-011-T05 | owner step nerv:F-011-T02, in this project |
| nerv:F-011-T03 | owner step nerv:F-011-T02, in this project |
| nerv:F-011-T06 | owner step nerv:F-011-T02, in this project |
| nerv:F-004-T07 | owner step nerv:F-004-T06, in this project |
| nerv:F-004-T09 | owner step nerv:F-004-T06, in this project |
| nerv:F-012-T06 | owner step nerv:F-012-T05, in this project |
| nerv:F-016-T11 | owner step nerv:F-016-T09, in this project |
| nerv:F-101-T04 | owner step nerv:F-098-T04, in this project |
| nerv:F-101-T05 | owner step nerv:F-098-T04, in this project |
| nerv:F-101-T06 | owner step nerv:F-098-T04, in this project |
| nerv:F-060-T03 | owner step nerv:F-060-T01, in this project |
| nerv:F-060-T02 | owner step nerv:F-060-T01, in this project |
| nerv:F-007-T10 | owner step nerv:F-007-T05, in this project |
| grover:F-005-T02 | owner step grover:F-005-T01, in this project |
| grover:F-005-T03 | owner step grover:F-005-T01, in this project |
| grover:F-003-T02 | owner step grover:F-005-T01, in this project |
| grover:F-003-T03 | owner step grover:F-003-T01, in this project |
| grover:F-003-T04 | owner step grover:F-005-T01, in this project |
| grover:F-003-T05 | owner step grover:F-005-T01, in this project |
| grover:F-004-T02 | owner step grover:F-005-T01, in this project |
| grover:F-004-T03 | owner step grover:F-005-T01, in this project |
| grover:F-011-T03 | owner step grover:F-011-T02, in this project |
| grover:F-008-T03 | owner step grover:F-005-T01, in this project |
| grover:F-012-T02 | owner step grover:F-005-T01, in this project |
| grover:F-012-T03 | owner step grover:F-005-T01, in this project |
| grover:F-006-T03 | owner step grover:F-006-T02, in this project |
| grover:F-007-T03 | owner step grover:F-007-T02, in this project |
| grover:F-013-T03 | owner step grover:F-013-T02, in this project |
| grover:F-014-T03 | owner step grover:F-014-T02, in this project |
| grover:F-015-T03 | owner step grover:F-015-T02, in this project |
| grover:F-016-T03 | owner step grover:F-016-T02, in this project |
| grover:F-018-T03 | owner step grover:F-018-T01, in this project |
| grover:F-018-T04 | owner step grover:F-018-T01, in this project |
| grover:F-019-T03 | owner step grover:F-005-T01, in this project |
| grover:B-009-T02 | owner step grover:B-009-T01, in this project |
| grover:F-017-T04 | owner step grover:F-017-T03, in this project |

## Nothing to do

Every project has ready work.

## Agent runway

Agent hours that can run before work reaches a block: open agent work that is ready, or waits only on work that can itself run, across repositories. Hours are each project's own estimate; a prerequisite the reader cannot resolve is a block, never assumed done.

| Project | Runway | First blocks reached | Owner hours for the next layer |
|---|---|---|---|
| solution | 3 h | owner step solution:F-004-T04; owner step solution:F-006-T02 | 0.75 h |
| 𖣂 nerv | 92.5 h | owner step nerv:F-062-T07; owner step nerv:F-011-T02; owner step nerv:F-004-T06; owner step nerv:F-012-T05; owner step nerv:F-016-T09; owner step nerv:F-082-T04; owner step nerv:F-083-T09; owner step nerv:F-088-T04; owner step nerv:F-117-T05; owner step nerv:F-089-T03; owner step nerv:F-090-T03; owner step nerv:F-094-T04; owner step nerv:B-099-T03; owner step nerv:F-086-T04; owner step nerv:F-087-T04; owner step nerv:F-092-T04; owner step nerv:B-057-T02; owner step nerv:B-068-T02; owner step nerv:B-122-T02; owner step nerv:B-123-T02; owner step nerv:B-128-T02; owner step nerv:F-123-T02; owner step nerv:F-098-T04; owner step nerv:F-060-T01; owner step nerv:F-116-T02; owner step nerv:F-007-T05; owner step nerv:F-122-T03; owner step nerv:B-056-T02 | 11.75 h |
| 🤖 gauntlet-protocol | 2.25 h | owner step gauntlet-protocol:F-022-T02; owner step gauntlet-protocol:F-021-T02 | 0.75 h |
| 🦺 project-harness | 0.25 h | — | 0 h |
| 🚁 fpvbuddy | 3 h | — | 0 h |
| 🪴 grover | 10.5 h | owner step grover:F-005-T01; owner step grover:F-003-T01; owner step grover:F-011-T02; owner step grover:F-006-T02; owner step grover:F-007-T02; owner step grover:F-013-T02; owner step grover:F-014-T02; owner step grover:F-015-T02; owner step grover:F-016-T02; owner step grover:F-018-T01; owner step grover:B-009-T01; owner step grover:F-017-T03 | 5.5 h |
| **Solution** | 111.5 h | 44 | 18.75 h |

## Audits, reviews and harness

Each project's own evidence at its resolved commit: the newest audit against its interval (`audit.days`), each periodic review (`reviews.<name>.days`) and its harness release against the latest template release (latest release of voidbrain/project-harness). Missing evidence reads as unknown, never as current.

| Project | Harness | Last audit | Reviews | Notes |
|---|---|---|---|---|
| solution | v10.20.1 (latest) | no complete full audit; next 2026-12-01 | — | — |
| 𖣂 nerv | **v10.9.0, behind v10.20.1** | 2026-11-20 (full); next 2026-11-27 | token: next 2026-12-16; architecture: next 2026-12-16; skills: next 2026-12-24 | — |
| 🤖 gauntlet-protocol | **v10.20.0, behind v10.20.1** | 2026-11-22 (full); next 2026-11-29 | token: next 2026-12-22; architecture: next 2026-12-22; skills: next 2026-12-24 | — |
| 🦺 project-harness | v10.20.1 (latest) | 2026-11-22 (full); next 2026-11-29 | token: next 2026-12-22; architecture: next 2026-12-22; skills: next 2026-12-24 | — |
| 🚁 fpvbuddy | **v10.20.0, behind v10.20.1** | 2026-11-22 (full); next 2026-11-29 | — | — |
| 🪴 grover | **v10.20.0, behind v10.20.1** | no complete full audit; next 2026-12-01 | — | — |

## Gap review

Proposals only, each naming the repository that would own the fix: the coordinator never creates or edits a record in a component; an accepted proposal is created by its owning repository (`docs/agents/solution-gaps.md`). The cross-repository kind is a text heuristic.

| Kind | Where | Evidence | Proposal |
|---|---|---|---|
| Cross-repository need with no counterpart (text heuristic) | nerv:F-120 | "General domain packs (coding, embedded, logic, Italian quality, 3D printing, image generation) were requested from gauntlet-protocol the sa…"; gauntlet-protocol has no open record that names nerv | gauntlet-protocol: a record for what nerv:F-120 needs from it, or nerv: drop the dependency |
| Behind the harness | nerv .harness.json | nerv is on v10.9.0; the latest template release is v10.20.1 | nerv: a record "Reconcile to harness v10.20.1", done in a session of that repository |
| Behind the harness | gauntlet-protocol .harness.json | gauntlet-protocol is on v10.20.0; the latest template release is v10.20.1 | gauntlet-protocol: a record "Reconcile to harness v10.20.1", done in a session of that repository |
| Behind the harness | fpvbuddy .harness.json | fpvbuddy is on v10.20.0; the latest template release is v10.20.1 | fpvbuddy: a record "Reconcile to harness v10.20.1", done in a session of that repository |
| Behind the harness | grover .harness.json | grover is on v10.20.0; the latest template release is v10.20.1 | grover: a record "Reconcile to harness v10.20.1", done in a session of that repository |

<details><summary>solution: 9 open steps</summary>

| Step | Title | Status | Remaining | Who | Depends on |
|---|---|---|---|---|---|
| solution:B-002-T01 | Make check:fast supply or ask for GH&#95;TOKEN | Planned | 0.5 h | 🤖 | — |
| solution:B-003-T01 | Check that both scheduled workflows have run on their schedule | Planned | 0.25 h | 🤖 | — |
| solution:F-004-T04 | Owner takes Proposal 4 (the overview's layout the dashboard lacks) to a project-harness session | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| solution:F-004-T05 | Retire the overview tool once a template release covers Proposal 4 | Planned | 1.5 h | ⏳ 🤖 | F-004-T04 |
| solution:F-006-T01 | Record the grover&#95;alerts contract and its end-to-end check in docs/SOLUTION.md (waits on grover:F-008) | Planned | 1 h | 🤖 | — |
| solution:F-006-T02 | Owner sees a Grover alert arrive through NERV | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-006-T01 |
| solution:F-007-T01 | Name the Gauntlet release NERV needs for its new cases in docs/SOLUTION.md (waits on nerv:F-120) | Planned | 0.5 h | 🤖 | — |
| solution:F-007-T02 | Link a Gauntlet run of the new NERV cases as acceptance | Planned | 0.5 h | ⏳ 🤖 | F-007-T01 |
| solution:F-009-T01 | Reconcile to the latest harness and read built backlog views | Implemented; verification pending | 0.25 h | 🤖 | — |

</details>

<details><summary>nerv: 122 open steps</summary>

| Step | Title | Status | Remaining | Who | Depends on |
|---|---|---|---|---|---|
| nerv:B-091-T01 | Name the failing journal write in a Windows stop and make the receipt complete | Implemented; verification pending | 3 h | 🤖 | — |
| nerv:F-005-T15 | T06h — Upgrades that raise the schema version | Implemented; verification pending | 0.5 h | 🤖 | — |
| nerv:F-005-T29 | T11d — Upgrades, prerequisites, update policy and platform lifecycle on the device matrix | Ready | 2.5 h | ⏳ 🤖 | B-091-T01 |
| nerv:F-005-T36 | Record the evidence of F-005-T29 and close it | Planned | 0.25 h | ⏳ 🤖 | F-005-T29 |
| nerv:F-005-T30 | T11e — Parent acceptance and closure reconciliation | Planned | 0.25 h | ⏳ 🤖 | F-005-T36 |
| nerv:F-006-T29 | Rerun the P3 role cases with role-sized probes and update the report | Implemented; verification pending | 0 h | 🤖 | — |
| nerv:F-006-T31 | Rerun the P3 Misato cases with the fixed probe budget and update the report | Implemented; verification pending | 0 h | 🤖 | — |
| nerv:B-118-T01 | Make the Windows test step fit its limit with margin | Implemented; verification pending | 0.5 h | 🤖 | — |
| nerv:B-118-T02 | Worker-link test files always exit; find why they time out on Windows | Implemented; verification pending | 0.5 h | 🤖 | — |
| nerv:B-118-T03 | Other Runtime test files always exit; failing tests named in a stopped run | Implemented; verification pending | 2 h | ⏳ 🤖 | B-118-T02 |
| nerv:B-118-T04 | Cut the Windows cost of the coordinator test files | Implemented; verification pending | 2 h | ⏳ 🤖 | B-118-T03 |
| nerv:F-062-T07 | Owner runs the restore drill on NERV-01 from a real off-host copy | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| nerv:F-011-T02 | Live menu, service-button and login acceptance on the Mac | Planned | 0 h agent + 0.5 h owner | 🧑‍🔧 | — |
| nerv:F-011-T05 | Record the evidence of F-011-T02 and close it | Planned | 0.25 h | ⏳ 🤖 | F-011-T02 |
| nerv:F-011-T03 | Live notification permission acceptance | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-011-T05 |
| nerv:F-011-T06 | Record the evidence of F-011-T03 and close it | Planned | 0.25 h | ⏳ 🤖 | F-011-T03 |
| nerv:F-124-T01 | Shared delivery state across Telegram and the phone app | Planned | 2 h | 🤖 | — |
| nerv:F-124-T02 | An approval answered in Telegram or the app clears the other | Planned | 2 h | ⏳ 🤖 | F-124-T01 |
| nerv:F-124-T03 | A reminder opened on the phone is not re-sent on Telegram | Planned | 1.5 h | ⏳ 🤖 | F-124-T01 |
| nerv:F-124-T04 | Chat with Midori in the phone app | Planned | 6 h | ⏳ 🤖 | F-124-T02, F-124-T03 |
| nerv:F-004-T06 | Phone install and push acceptance | Ready | 0 h agent + 0.5 h owner | 🧑‍🔧 | — |
| nerv:F-004-T07 | Record the evidence of F-004-T06 and close it | Planned | 0.25 h | ⏳ 🤖 | F-004-T06 |
| nerv:F-004-T09 | Delivery order: push first, Telegram as fallback | Planned | 2 h | ⏳ 🤖 | F-004-T06, F-124-T01 |
| nerv:F-012-T05 | Edge cases and real-host acceptance | Planned | 0 h agent + 0.5 h owner | 🧑‍🔧 | — |
| nerv:F-012-T06 | Record the evidence of F-012-T05 and close it | Planned | 0.25 h | ⏳ 🤖 | F-012-T05 |
| nerv:F-016-T09 | Step 5b — Two-device relocation acceptance | Planned | 0 h agent + 1 h owner | 🧑‍🔧 | — |
| nerv:F-016-T21 | Export the seed snapshot off serve's event loop | Planned | 1.5 h | 🤖 | — |
| nerv:F-016-T11 | Record the evidence of F-016-T09 and close it | Planned | 0.25 h | ⏳ 🤖 | F-016-T09 |
| nerv:F-082-T02 | Checklist card in the dashboard chat | Implemented; verification pending | 0 h | 🤖 | — |
| nerv:F-082-T04 | Owner check: add by Telegram, tick on the dashboard | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-082-T02 |
| nerv:F-083-T07 | Timers in a cooking session | Implemented; verification pending | 0.5 h | 🤖 | — |
| nerv:F-083-T10 | Recipe photos | Implemented; verification pending | 0.5 h | 🤖 | — |
| nerv:F-083-T08 | Hands-free cooking by voice | Planned | 0.5 h | ⏳ 🤖 | F-083-T07 |
| nerv:F-083-T09 | Owner check: a recipe cooked hands-free | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-083-T07 |
| nerv:F-120-T01 | Catch-up Gauntlet coverage review of closed features | Planned | 1.5 h | 🤖 | — |
| nerv:F-120-T03 | Adopt the Gauntlet domain packs when released | Planned | 0.5 h | 🤖 | — |
| nerv:F-120-T02 | First system-pack cases for recent features | Planned | 3 h | ⏳ 🤖 | F-120-T01 |
| nerv:F-088-T03 | Report and conflicts | Implemented; verification pending | 0.5 h | 🤖 | — |
| nerv:F-088-T04 | Owner check on the storage base | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-088-T03 |
| nerv:B-108-T01 | Update now runs from a detached helper outside the service | Implemented; verification pending | 0.25 h | 🤖 | — |
| nerv:B-108-T02 | The restarted service reports the updater result in the inbox and on the dashboard | Implemented; verification pending | 0.25 h | ⏳ 🤖 | B-108-T01 |
| nerv:F-102-T03 | Apply at the announced time and report | Implemented; verification pending | 0.75 h | 🤖 | — |
| nerv:F-102-T04 | Live check: one automatic update | Planned | 0.25 h | ⏳ 🤖 | F-102-T03, B-108-T01, B-108-T02 |
| nerv:B-111-T01 | Record health samples in serve, where the server is given a Runtime | Implemented; verification pending | 0.25 h | 🤖 | — |
| nerv:F-103-T02 | Per-link load between bases | Implemented; verification pending | 1.5 h | 🤖 | — |
| nerv:F-103-T04 | 24-hour baseline with both bases | Planned | 0.25 h | ⏳ 🤖 | B-111-T01 |
| nerv:F-117-T03 | nerv update repairs a stale build or an unloaded service | Planned | 1 h | 🤖 | — |
| nerv:F-117-T04 | Docs and help for nerv update | Planned | 0.5 h | 🤖 | — |
| nerv:F-117-T05 | Owner runs nerv update on NERV-01 | Planned | 0.25 h owner | ⏳ 🧑‍🔧 | F-117-T03 |
| nerv:F-118-T04 | Phone procedure: Tailscale serve, pairing and push, then the owner check | Planned | 0.5 h | 🤖 | — |
| nerv:F-089-T04 | Bind a live browser driver to the click adapter | Implemented; verification pending | 0 h | 🤖 | — |
| nerv:F-089-T03 | Owner check on a real page | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-089-T04 |
| nerv:F-090-T04 | Resume automatically when a session limit resets | Implemented; verification pending | 0 h | 🤖 | — |
| nerv:F-090-T03 | Owner check on a real interrupted session | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-090-T04 |
| nerv:F-093-T03 | Shared adapter for F-012 and F-092 | Implemented; verification pending | 0 h | 🤖 | — |
| nerv:F-094-T03 | Report and recovery | Planned | 0.5 h | 🤖 | — |
| nerv:F-094-T04 | Owner check on the Mac | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-094-T03 |
| nerv:F-106-T03 | Domain tool schemas offered by intent | Implemented; verification pending | 2 h | 🤖 | — |
| nerv:B-099-T02 | EVA jobs can run as a dedicated job user; everything it runs ends with the job | Implemented; verification pending | 4 h | 🤖 | — |
| nerv:B-099-T03 | Owner setup on NERV-01: the &#95;nervjob user, the shared folder and the sudo rule | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | B-099-T02 |
| nerv:B-099-T04 | Live check on NERV-01: the escapes the review found leave nothing running | Planned | 1.5 h | ⏳ 🤖 | B-099-T03 |
| nerv:F-049-T08 | Pilot trust stage caps the class | Implemented; verification pending | 0.75 h | 🤖 | — |
| nerv:F-049-T09 | Dashboard shows instances per class | Implemented; verification pending | 0.25 h | 🤖 | — |
| nerv:F-049-T10 | Linux host enforcement and join tests in CI | Implemented; verification pending | 0.75 h | 🤖 | — |
| nerv:F-049-T12 | Run the first EVA job on the Linux host | Planned | 1.5 h | ⏳ 🤖 | F-049-T10 |
| nerv:F-049-T14 | Actions run in EVA instances; the in-process executor goes | Planned | 16 h | ⏳ 🤖 | B-099-T02, F-049-T10 |
| nerv:F-008-T12 | Live check with real batteries | Planned | 0.25 h | 🤖 | — |
| nerv:F-008-T14 | Battery status list in Telegram | Implemented; verification pending | 0.5 h | 🤖 | — |
| nerv:B-066-T02 | Decouple worker-link frame verification from per-frame nervous IPC | Implemented; verification pending | 0.5 h | 🤖 | — |
| nerv:B-066-T03 | Find why worker-link tests still lose the connection under load | Implemented; verification pending | 0.25 h | 🤖 | — |
| nerv:B-120-T01 | kaji promote removes its marker before it starts the service | Implemented; verification pending | 0 h | 🤖 | — |
| nerv:B-136-T01 | Name why the planner's first chat reply is invalid and fix it | Planned | 1.5 h | 🤖 | — |
| nerv:F-086-T04 | Owner check with the owner's account | Planned | 0 h agent + 0.5 h owner | 🧑‍🔧 | — |
| nerv:F-087-T04 | Owner check on the real printer | Planned | 0 h agent + 0.5 h owner | 🧑‍🔧 | — |
| nerv:F-092-T04 | Owner check on the Mac | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| nerv:B-057-T02 | Owner live check: rotated certificate message (part D step 1) | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| nerv:B-068-T02 | Owner check: Stop then Start from the companion | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| nerv:B-107-T01 | Pilot cards 2 per row with stacked name inputs and a contained Model select | Implemented; verification pending | 1 h | 🤖 | — |
| nerv:B-113-T01 | Dashboard sessions survive the restart an update makes; the button waits for the new revision | Implemented; verification pending | 0.5 h | 🤖 | — |
| nerv:B-122-T02 | Owner updates NERV-01 and sees the foreground reason | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| nerv:B-123-T02 | Owner: Update now shows the updater's status in Health | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| nerv:B-128-T02 | Owner: scan the Settings pairing QR from the Mac with the phone | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| nerv:B-129-T01 | Run doctor calls GET /api/doctor and shows the answer next to the button | Implemented; verification pending | 1 h | 🤖 | — |
| nerv:B-134-T01 | Default VAPID subject Apple accepts, push failures logged, Phone push line in Health | Implemented; verification pending | 0 h | 🤖 | — |
| nerv:B-135-T01 | A slow or failing doctor probe is named as such, not as an ownership refusal | Implemented; verification pending | 0 h | 🤖 | — |
| nerv:B-125-T01 | Bind every signed Kaji reply to the request it answers | Implemented; verification pending | 2 h | 🤖 | — |
| nerv:F-109-T02 | Store a pilot's call name and second name through a validated interface | Implemented; verification pending | 1 h | 🤖 | — |
| nerv:F-109-T03 | Persona card layout with one Apply for every change | Implemented; verification pending | 1.5 h | 🤖 | F-109-T02 |
| nerv:F-109-T04 | Silhouette image on the persona card | Planned | 0.5 h | ⏳ 🤖 | F-109-T03 |
| nerv:F-110-T03 | Dashboard settings panel for the chosen settings | Implemented; verification pending | 2 h | 🤖 | — |
| nerv:F-110-T04 | Brief time, time zone, Sync Ratio threshold and Telegram freshness window through the same interface | Planned | 1.5 h | ⏳ 🤖 | F-110-T03 |
| nerv:F-110-T05 | Common settings for every base, with a per-base override | Planned | 2 h | ⏳ 🤖 | F-110-T04 |
| nerv:F-113-T03 | Gauntlet comparison of prompt size and task success with the compact index | Planned | 1 h | 🤖 | — |
| nerv:F-123-T01 | Register a remote MCP server on the tailnet | Implemented; verification pending | 2.5 h | 🤖 | — |
| nerv:F-123-T02 | Owner check: NERV lists the Grover tools | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-123-T01 |
| nerv:F-099-T04 | Read a diyfpv.com build through the browser adapter | Implemented; verification pending | 0 h | 🤖 | — |
| nerv:B-133-T01 | Name why the cache probe answered in 698 ms on Windows CI and fix or bound it | Planned | 1 h | 🤖 | — |
| nerv:F-121-T04 | Send the part file with the print job | Implemented; verification pending | 0 h | 🤖 | — |
| nerv:F-121-T03 | Owner: enter the parts and print one | Planned | 0 h agent + 0.5 h owner | ⏳ 🤖 | F-121-T04, B-133-T01 |
| nerv:F-098-T04 | Live check with a real crash | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| nerv:F-101-T04 | Create/wire the FPVBuddy core repository and move the core into it | Planned | 2 h | ⏳ 🤖 | F-098-T04 |
| nerv:F-101-T05 | NERV FPV pack uses the FPV core package | Planned | 1.5 h | ⏳ 🤖 | F-101-T04 |
| nerv:F-101-T06 | Dashboard uses the FPV core's web components | Planned | 1.5 h | ⏳ 🤖 | F-101-T05 |
| nerv:B-072-T01 | Native TLS key generation: timeout told apart from missing openssl, no flaky Windows CI | Implemented; verification pending | 0.25 h | 🤖 | — |
| nerv:B-076-T01 | Name the cause of each scattered CI failure of 2026-11-18 | Implemented; verification pending | 0.25 h | 🤖 | — |
| nerv:B-127-T01 | Name what the F-118-T02 browser test waits on under load and fix or bound it | Planned | 1 h | 🤖 | — |
| nerv:B-094-T03 | A remote result that arrived before Misato's reply is in that reply | Implemented; verification pending | 1.5 h | 🤖 | — |
| nerv:B-137-T01 | Add a drone by chat with its model and version | Planned | 1.5 h | 🤖 | — |
| nerv:F-060-T01 | herdr-core trial in the development workspace | Planned | 0 h agent + 2 h owner | 🧑‍🔧 | — |
| nerv:F-060-T03 | Record the evidence of F-060-T01 and close it | Planned | 0.25 h | ⏳ 🤖 | F-060-T01 |
| nerv:F-060-T02 | Answer the five questions and per-record outcomes | Planned | 0.25 h | ⏳ 🤖 | F-060-T03 |
| nerv:F-116-T02 | Owner decision: build model splitting or close | Planned | 0 h agent + 0.25 h owner | 🤔 | — |
| nerv:F-007-T05 | Step 2c — Voice corpus evaluation run and report | Planned | 0 h agent + 0.5 h owner | 🧑‍🔧 | — |
| nerv:F-007-T10 | Record the evidence of F-007-T05 and close it | Planned | 0.25 h | ⏳ 🤖 | F-007-T05 |
| nerv:F-122-T01 | Design Grover alert delivery | Implemented; verification pending | 1 h | 🤖 | — |
| nerv:F-122-T02 | Deliver Grover alerts through NERV's channels | Planned | 3 h | ⏳ 🤖 | F-122-T01, F-123-T01 |
| nerv:F-122-T03 | Owner check: a real Grover alert arrives | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-122-T02 |
| nerv:B-056-T02 | Owner live check: refused and unconfirmed renewal in the companion | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| nerv:B-096-T01 | Draw the apartment → Debrief route for a sortie that ends at the owner's decision | Implemented; verification pending | 0 h | 🤖 | — |
| nerv:B-110-T01 | One Update now, in Health beside the availability line, only when an update is available | Implemented; verification pending | 0.25 h | 🤖 | — |
| nerv:B-112-T01 | Sephirot: routes light only when taken; answer route after planning; full map; loops when taken | Implemented; verification pending | 0.25 h | 🤖 | — |
| nerv:B-130-T01 | An unused Misato's Apt keeps its normal look in a finished sortie's flow | Implemented; verification pending | 0.25 h | 🤖 | — |

</details>

<details><summary>gauntlet-protocol: 9 open steps</summary>

| Step | Title | Status | Remaining | Who | Depends on |
|---|---|---|---|---|---|
| gauntlet-protocol:B-003-T01 | Timeout verdict without waiting for cleanup | Implemented; verification pending | 0.25 h | 🤖 | — |
| gauntlet-protocol:F-022-T01 | Propose packs or skips for the remaining areas | Planned | 1 h | 🤖 | — |
| gauntlet-protocol:F-022-T02 | Decide packs or skips for the remaining areas | Planned | 0 h agent + 0.25 h owner | ⏳ 🤔 | F-022-T01 |
| gauntlet-protocol:F-022-T03 | Record the outcome | Planned | 0.5 h | ⏳ 🤖 | F-022-T02 |
| gauntlet-protocol:F-021-T01 | Draft the image-generation design decision | Planned | 1 h | 🤖 | — |
| gauntlet-protocol:F-021-T02 | Decide the image-generation design | Planned | 0 h agent + 0.5 h owner | ⏳ 🤔 | F-021-T01 |
| gauntlet-protocol:F-021-T03 | Image-generation runner | Planned | 3 h | ⏳ 🤖 | F-021-T02 |
| gauntlet-protocol:F-021-T04 | Image grader and pack | Planned | 2 h | ⏳ 🤖 | F-021-T03 |
| gauntlet-protocol:F-021-T05 | Release image-generation-v1 | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-021-T04 |

</details>

<details><summary>project-harness: 1 open step</summary>

| Step | Title | Status | Remaining | Who | Depends on |
|---|---|---|---|---|---|
| project-harness:F-096-T06 | Transition and release | Implemented; verification pending | 0.25 h | 🤖 | — |

</details>

<details><summary>fpvbuddy: 4 open steps</summary>

| Step | Title | Status | Remaining | Who | Depends on |
|---|---|---|---|---|---|
| fpvbuddy:F-005-T02 | Bring the battery core and its tests into the package | Planned | 1.5 h | 🤖 | — |
| fpvbuddy:F-005-T03 | Document the core's public API | Planned | 0.5 h | ⏳ 🤖 | F-005-T02 |
| fpvbuddy:F-005-T04 | Install check without the FPVBuddy app | Planned | 1 h | ⏳ 🤖 | F-005-T02 |
| fpvbuddy:F-006-T01 | Reconcile harness files v10.9.0 -&gt; v10.20.0 | Implemented; verification pending | 0 h | 🤖 | — |

</details>

<details><summary>grover: 45 open steps</summary>

| Step | Title | Status | Remaining | Who | Depends on |
|---|---|---|---|---|---|
| grover:F-005-T01 | Owner installs hub and agent on the Pi behind Tailscale | Ready | 0 h agent + 1.25 h owner | 🧑‍🔧 | — |
| grover:F-005-T02 | Owner checks NERV lists the Grover tools (waits on nerv:F-123-T02) | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-005-T01 |
| grover:F-005-T03 | Fix the README and service files from the first install | Planned | 0.5 h | ⏳ 🤖 | F-005-T01 |
| grover:F-003-T01 | Owner chooses the water-level sensor | Ready | 0 h agent + 0.5 h owner | 🤔 | — |
| grover:F-003-T02 | Owner runs bring-up steps 1–4 on the Pi (buses, bindings, reads, switches) | Planned | 0 h agent + 2 h owner | ⏳ 🧑‍🔧 | F-005-T01 |
| grover:F-003-T03 | Driver for the chosen level sensor | Planned | 2 h | ⏳ 🤖 | F-003-T01 |
| grover:F-003-T04 | Owner runs bring-up steps 5–6 on the Pi (pump calibration, levels, a first feed, safety) | Planned | 0 h agent + 2 h owner | ⏳ 🧑‍🔧 | F-003-T02, F-003-T03 |
| grover:F-003-T05 | Record the bring-up results; open B- records for driver faults | Planned | 0.5 h | ⏳ 🤖 | F-003-T04 |
| grover:F-004-T02 | Owner calibrates the real pH and EC probes on the Pi | Planned | 0 h agent + 1 h owner | ⏳ 🧑‍🔧 | F-003-T02 |
| grover:F-004-T03 | Record the calibration result; fix what it found | Planned | 0.25 h | ⏳ 🤖 | F-004-T02 |
| grover:B-008-T01 | Find why the feed e2e test fails now and then | Ready | 1 h | 🤖 | — |
| grover:B-008-T02 | Failing test if the feed logic is wrong, then the fix | Planned | 1 h | ⏳ 🤖 | B-008-T01 |
| grover:F-011-T02 | Owner tries a feed on the simulated rig on the dev stack | Ready | 0 h agent + 0.5 h owner | 🧑‍🔧 | — |
| grover:F-011-T03 | Record the try of a feed; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-011-T02 |
| grover:B-006-T01 | Failing agent test, then run a cached config of the previous protocol | Ready | 1 h | 🤖 | — |
| grover:F-008-T03 | Owner sees a Grover alert delivered by NERV (waits on nerv:F-122-T02) | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-005-T01 |
| grover:F-012-T02 | Owner imports the old records on the Pi and enters the generation-2 plant | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-005-T01 |
| grover:F-012-T03 | Record the try of the import; fix what it found | Planned | 0.25 h | ⏳ 🤖 | F-012-T02 |
| grover:F-006-T02 | Owner tries the Setup pages on the dev stack | Ready | 0 h agent + 0.5 h owner | 🧑‍🔧 | — |
| grover:F-006-T03 | Record the try of the Setup pages; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-006-T02 |
| grover:F-007-T02 | Owner tries Switch to bloom and the light line on the dev stack | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| grover:F-007-T03 | Record the try of Switch to bloom; fix what it found | Planned | 0.25 h | ⏳ 🤖 | F-007-T02 |
| grover:F-013-T02 | Owner tries the plant cycle on the dev stack | Ready | 0 h agent + 0.5 h owner | 🧑‍🔧 | — |
| grover:F-013-T03 | Record the try of the plant cycle; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-013-T02 |
| grover:F-014-T02 | Owner tries the plant page on the dev stack | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| grover:F-014-T03 | Record the try of the plant page; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-014-T02 |
| grover:F-015-T02 | Owner tries the rig map on a phone and a laptop, light and dark on the dev stack | Ready | 0 h agent + 0.5 h owner | 🧑‍🔧 | — |
| grover:F-015-T03 | Record the try of the rig map; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-015-T02 |
| grover:F-016-T02 | Owner tries weekday schedules on the dev stack | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| grover:F-016-T03 | Record the try of weekday schedules; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-016-T02 |
| grover:F-018-T01 | Owner writes down the pump wiring (L298N inputs on MCP23017 pins) | Ready | 0 h agent + 0.5 h owner | 🧑‍🔧 | — |
| grover:F-018-T03 | Owner runs each pump forward and stops it on the Pi | Planned | 0 h agent + 1 h owner | ⏳ 🧑‍🔧 | F-018-T01, F-005-T01 |
| grover:F-018-T04 | Record the pump device check; fix what it found | Planned | 0.25 h | ⏳ 🤖 | F-018-T03 |
| grover:F-019-T01 | Web app manifest and icons | Implemented; verification pending | 0 h | 🤖 | — |
| grover:F-019-T02 | Service worker for the app shell | Implemented; verification pending | 0 h | 🤖 | F-019-T01 |
| grover:F-019-T03 | Owner installs the app on the phone | Ready | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-019-T02, F-005-T01 |
| grover:F-010-T01 | Downsample old readings | Ready | 1.5 h | 🤖 | — |
| grover:F-010-T02 | Backup command for the hub database | Ready | 1 h | 🤖 | — |
| grover:F-009-T01 | Playwright against the dev stack: the dashboard renders the demo tent | Ready | 2 h | 🤖 | — |
| grover:F-009-T02 | Browser scenarios: run a pump, switch the mode, axe scan | Planned | 2 h | ⏳ 🤖 | F-009-T01 |
| grover:F-009-T03 | Run the browser suite in CI | Planned | 1 h | ⏳ 🤖 | F-009-T02 |
| grover:B-009-T01 | Owner decides on closing the eight v1 Dependabot PRs | Ready | 0 h agent + 0.25 h owner | 🤔 | — |
| grover:B-009-T02 | Close the v1 Dependabot PRs and delete their branches | Planned | 0.25 h | ⏳ 🤖 | B-009-T01 |
| grover:F-017-T03 | Owner picks the nutrient colours | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — |
| grover:F-017-T04 | Record the colour choice; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-017-T03 |

</details>

## Remaining effort

Hours each backlog still holds, as each project's own, uncalibrated estimate. The solution line adds them; it is no completion measure.

| Source | Agent | Owner | From | Open records by priority | Open records by size |
|---|---|---|---|---|---|
| solution | 4.5 h | 0.75 h | totals line | 🔶 P2: 3, 🔹 P3: 3 | 🟢 Small: 5, 🟡 Medium: 1 |
| nerv | 103 h | 12.5 h | totals line | 🔺 P1: 8, 🔶 P2: 36, 🔹 P3: 24 | 🟢 Small: 46, 🟡 Medium: 15, 🔴 Large: 5, 🟣 Very large: 2 |
| gauntlet-protocol | 7.75 h | 1 h | totals line | 🔶 P2: 1, 🔹 P3: 2 | 🟢 Small: 1, 🟡 Medium: 1, 🔴 Large: 1 |
| project-harness | 0.25 h | 0 h | totals line | 🔶 P2: 1 | 🟢 Small: 1 |
| fpvbuddy | 3 h | 0 h | Remaining cells of 2 open records | 🔶 P2: 1, 🔹 P3: 1 | 🟢 Small: 1, 🟡 Medium: 1 |
| grover | 18.25 h | 12.75 h | totals line | 🔺 P1: 4, 🔶 P2: 11, 🔹 P3: 5 | 🟢 Small: 16, 🟡 Medium: 3, 🔴 Large: 1 |
| **Solution** | 136.75 h | 27 h | 6 of 6 backlogs | | |

## Integration outcomes

| Record | Outcome | Status | Human action | Effort | Component links |
|---|---|---|---|---|---|
| [solution:B-002](https://github.com/voidbrain/coordinator/blob/122f5c288e53ca6c5527bf9070ba717aec964207/docs/BACKLOG.md#b-002) | check:fast fails with a bare HTTP 403 when GH_TOKEN is unset | Open | No | 🟢 Small | — |
| [solution:B-003](https://github.com/voidbrain/coordinator/blob/122f5c288e53ca6c5527bf9070ba717aec964207/docs/BACKLOG.md#b-003) | Neither scheduled workflow has run on its schedule yet | Investigate | No | 🟢 Small | — |
| [solution:F-004](https://github.com/voidbrain/coordinator/blob/122f5c288e53ca6c5527bf9070ba717aec964207/docs/BACKLOG.md#f-004) | Propose the solution order, hours, runway, gap review, cross-repository dependencies and on-demand backlog views to the template | Open | Procedure | 🟡 Medium | — |
| [solution:F-006](https://github.com/voidbrain/coordinator/blob/122f5c288e53ca6c5527bf9070ba717aec964207/docs/BACKLOG.md#f-006) | NERV delivers Grover alerts end to end | Open | No | 🟢 Small | grover:F-008 |
| [solution:F-007](https://github.com/voidbrain/coordinator/blob/122f5c288e53ca6c5527bf9070ba717aec964207/docs/BACKLOG.md#f-007) | NERV capability coverage in the Gauntlet across both repositories | Open | No | 🟢 Small | nerv:F-120 |
| [solution:F-009](https://github.com/voidbrain/coordinator/blob/122f5c288e53ca6c5527bf9070ba717aec964207/docs/BACKLOG.md#f-009) | Reconcile to the latest harness and read built backlog views | Implemented | No | 🟢 Small | project-harness:F-096 |

## Component work

| Record | Item | Status | Human action | Effort | Reviewed |
|---|---|---|---|---|---|
| [nerv:B-091](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-091) | Windows: a fenced stop ends uncertain after a SQLite "disk I/O error" while recording it | Open | No | 🟡 Medium | 2026-11-25 |
| [nerv:F-005](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-005) | Discover, install and operate enrolled remote workers | Open | No | 🟡 Medium | 2026-11-18 |
| [nerv:F-006](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-006) | Orchestrate agents and models across nodes | Open | No | 🟢 Small | 2026-11-25 |
| [nerv:B-118](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-118) | Windows CI: the test step runs into its 18-minute limit | Open | No | 🔴 Large | 2026-11-25 |
| [nerv:F-062](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-062) | Backup and restore: agreed loss bounds, off-host snapshots and a restore drill | Open | Procedure | 🟢 Small | 2026-11-18 |
| [nerv:F-011](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-011) | Native macOS menu-bar companion without Electron | Implemented | Procedure | 🟢 Small | 2026-11-10 |
| [nerv:F-124](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-124) | Fuse Midori's Telegram and the phone app into one conversation | Open | No | 🟣 Very large | 2026-11-25 |
| [nerv:F-004](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-004) | Angular PWA and validated GenUI | Open | Procedure | 🟡 Medium | 2026-11-25 |
| [nerv:F-012](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-012) | Resume a specific paused job after its provider limit resets | Open | Procedure | 🟢 Small | 2026-11-21 |
| [nerv:F-016](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-016) | Relocate the logical coordinator without split brain | Open | Procedure | 🟡 Medium | 2026-11-25 |
| [nerv:F-082](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-082) | Lists: add items by chat or Telegram, recall them as a checklist card | Open | No | 🟢 Small | 2026-11-21 |
| [nerv:F-083](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-083) | Saved recipes: keep them by category, recall them, compute only from saved values | Open | No | 🟡 Medium | 2026-11-18 |
| [nerv:F-120](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-120) | Gauntlet coverage of NERV capabilities | Open | No | 🔴 Large | 2026-11-24 |
| [nerv:F-088](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-088) | Storage base: copy files from a known removable card when it is inserted | Open | No | 🟢 Small | 2026-11-18 |
| [nerv:B-108](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-108) | Dashboard "Update now" and the scheduled apply cannot update the service they run in | Implemented | No | 🟢 Small | 2026-11-24 |
| [nerv:F-102](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-102) | Scheduled automatic updates with advance notice | Open | No | 🟢 Small | 2026-11-18 |
| [nerv:B-111](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-111) | The live service never records health samples: "No health samples yet" forever | Implemented | No | 🟢 Small | 2026-11-23 |
| [nerv:F-103](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-103) | Service health and link load between bases, measured | Open | No | 🟡 Medium | 2026-11-21 |
| [nerv:F-117](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-117) | One command to update a base: `nerv update` | Open | No | 🟡 Medium | 2026-11-24 |
| [nerv:F-118](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-118) | Pair a phone once: device sign-in with a 90-day sliding limit | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-089](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-089) | Browser control: act on a named control in an open page | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-090](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-090) | Resume interrupted coding work without the editor | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-093](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-093) | Desktop control: click a named control in an app on screen | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-094](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-094) | App workflows: open an app, open a file, save it as another file | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-106](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-106) | Per-turn prompt size on the local route, then deferred domain tool loading | Open | No | 🟡 Medium | 2026-11-18 |
| [nerv:B-099](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-099) | An EVA-03 job's child in its own session survives the job's timeout and cancellation | Open | No | 🔴 Large | 2026-11-19 |
| [nerv:F-049](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-049) | EVA instances: an EVA is a class, each job gets a fresh sandbox | Open | No | 🟣 Very large | 2026-11-18 |
| [nerv:F-008](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-008) | FPV batteries: registry, charge state, resistance checks and storage reminders | Open | No | 🟢 Small | 2026-11-21 |
| [nerv:B-066](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-066) | Worker-link heartbeat verification awaits nervous SQLite IPC on every frame | Open | No | 🟢 Small | 2026-11-25 |
| [nerv:B-120](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-120) | `kaji promote` starts the service before removing its marker, so the service can refuse to start | Implemented | No | 🟢 Small | 2026-11-24 |
| [nerv:B-136](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-136) | `nerv chat` gets an "(invalid reply)" from the planner before every answer | Open | No | 🟡 Medium | 2026-11-25 |
| [nerv:F-086](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-086) | Gmail: search and read, then draft and send behind approval | Open | Procedure | 🟢 Small | 2026-11-21 |
| [nerv:F-087](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-087) | 3D printing: slice a model with a material profile and send it to the printer | Open | Procedure | 🟢 Small | 2026-11-18 |
| [nerv:F-092](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-092) | Record desktop input and replay it | Open | Procedure | 🟢 Small | 2026-11-21 |
| [nerv:B-057](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-057) | Companion error messages are Italian only and do not say what went wrong | Open | Procedure | 🟢 Small | 2026-11-13 |
| [nerv:B-068](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-068) | Companion keeps Start NERV disabled after Stop NERV | Open | Procedure | 🟢 Small | 2026-11-18 |
| [nerv:B-107](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-107) | Pilot cards: model select leaves its card and name inputs are too narrow to read | Implemented | Procedure | 🟢 Small | 2026-11-23 |
| [nerv:B-113](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-113) | Updating from the dashboard signs it out, then offers a stale Update now that fails | Implemented | Procedure | 🟢 Small | 2026-11-23 |
| [nerv:B-122](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-122) | Update now is refused with "ownership is unknown" while NERV runs as a foreground `nerv launch` | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [nerv:B-123](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-123) | After Update now the dashboard never shows the updater's result | Implemented | Procedure | 🟢 Small | 2026-11-25 |
| [nerv:B-128](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-128) | Settings → Pair a device on a 127.0.0.1 dashboard puts a loopback address in the QR, which a phone cannot open | Implemented | Procedure | 🟢 Small | 2026-11-25 |
| [nerv:B-129](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-129) | Health → Run doctor logs a canned "all ok" line and never asks the service | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [nerv:B-134](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-134) | Every Web Push to Apple fails with 403 BadJwtToken, and the failure is invisible | Implemented | Procedure | 🟢 Small | 2026-11-25 |
| [nerv:B-135](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-135) | Update now on a busy Mac is refused as an ownership problem when NERV's health check is slow | Implemented | Procedure | 🟢 Small | 2026-11-25 |
| [nerv:B-125](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-125) | A signed Kaji reply is not bound to its request, so an old epoch-push reply can be replayed | Implemented | Procedure | 🟡 Medium | 2026-11-25 |
| [nerv:F-109](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-109) | Pilots as persona cards with editable names and one Apply | Open | No | 🟡 Medium | 2026-11-20 |
| [nerv:F-110](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-110) | Owner settings in the dashboard for values that are fixed today | Open | No | 🔴 Large | 2026-11-19 |
| [nerv:F-113](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-113) | Compact tool index with details on request | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-123](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-123) | Connect NERV to Grover's hub over MCP | Open | No | 🟡 Medium | 2026-11-24 |
| [nerv:F-099](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-099) | FPV build knowledge: components and wiring from cited sources | Open | No | 🟢 Small | 2026-11-18 |
| [nerv:B-133](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-133) | Windows CI: the F-121-T04 cache probe answered in 698 ms while its test allows 300 ms | Open | No | 🟢 Small | 2026-11-25 |
| [nerv:F-121](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-121) | Printed parts per drone: "print Smoke's feet" | Open | No | 🟢 Small | 2026-11-25 |
| [nerv:F-098](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-098) | FPV fleet diary: crashes, parts, spares and photos | Open | Procedure | 🟢 Small | 2026-11-24 |
| [nerv:F-101](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-101) | Share the FPV battery manager outside NERV | Open | No | 🔴 Large | 2026-11-20 |
| [nerv:B-072](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-072) | Windows CI: native TLS tests fail when openssl takes over 15 s | Open | No | 🟢 Small | 2026-11-18 |
| [nerv:B-076](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-076) | CI 2026-11-18: scattered one-off failures in unrelated tests on Windows and Linux | Open | No | 🟢 Small | 2026-11-25 |
| [nerv:B-127](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-127) | F-118-T02 browser test times out when it runs together with many test files | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:B-094](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-094) | Remote action wording: a doubled full stop, "queued" for a finished job, "offline" for a revoked base | Open | No | 🟡 Medium | 2026-11-19 |
| [nerv:B-137](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-137) | Fleet chat reads a new drone's model and version as part categories | Open | No | 🟡 Medium | 2026-11-25 |
| [nerv:F-060](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-060) | Spike: herdr-core as a coding-agent terminal runtime | Investigate | Procedure | 🟢 Small | 2026-11-06 |
| [nerv:F-116](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-116) | Split a model too big for one base across bases | Open | Decision | 🟢 Small | 2026-11-22 |
| [nerv:F-007](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-007) | Voice and evaluated skill improvement | Open | Procedure | 🟢 Small | 2026-11-15 |
| [nerv:F-122](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#f-122) | Deliver Grover alerts | Open | Decision | 🟡 Medium | 2026-11-24 |
| [nerv:B-056](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-056) | A renewal the companion refuses on the Mac says it was not confirmed | Implemented | Procedure | 🟢 Small | 2026-11-13 |
| [nerv:B-096](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-096) | Sephirot flow: a sortie that stops at Misato's apartment has no route to Debrief | Implemented | Procedure | 🟢 Small | 2026-11-19 |
| [nerv:B-110](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-110) | Dashboard offers Update now when already up to date, away from the update status | Implemented | Procedure | 🟢 Small | 2026-11-23 |
| [nerv:B-112](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-112) | Sephirot flow lights routes the sortie did not take and hides the map when no sortie is selected | Implemented | Procedure | 🟢 Small | 2026-11-23 |
| [nerv:B-130](https://github.com/voidbrain/nerv/blob/896182392525573e79df323165575c85ad0d3d00/docs/BACKLOG.md#b-130) | A finished sortie that never needed approval shows Misato's Apt faded as skipped, unlike the other unvisited steps | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [gauntlet-protocol:B-003](https://github.com/voidbrain/gauntlet-protocol/blob/2339e413222c65a205cf8dc0f94d00f704cca7af/docs/BACKLOG.md#b-003) | Coding grader blocks at a timeout while a leftover process keeps writing | Open | No | 🟢 Small | 2026-11-25 |
| [gauntlet-protocol:F-022](https://github.com/voidbrain/gauntlet-protocol/blob/2339e413222c65a205cf8dc0f94d00f704cca7af/docs/BACKLOG.md#f-022) | Packs or recorded skips for estimation, research, scheduling-time and backlog-management | Open | No | 🟡 Medium | 2026-11-24 |
| [gauntlet-protocol:F-021](https://github.com/voidbrain/gauntlet-protocol/blob/2339e413222c65a205cf8dc0f94d00f704cca7af/docs/BACKLOG.md#f-021) | image-generation-v1: runner and grader after a design decision | Open | No | 🔴 Large | 2026-11-24 |
| [project-harness:F-096](https://github.com/voidbrain/project-harness/blob/8f79b3c14d9808b47acb9e9119bdd6ce60fa39ad/docs/BACKLOG.md#f-096) | Stop committing generated backlog views | Open | No | 🟢 Small | 2026-11-25 |
| [fpvbuddy:F-005](https://github.com/voidbrain/FPVBuddy/blob/9ba5e862a7e51cf2169868192db7eddb7b320e60/docs/BACKLOG.md#f-005) | M1 — FPV battery core package | Open | No | 🟡 Medium | 2026-11-25 |
| [fpvbuddy:F-006](https://github.com/voidbrain/FPVBuddy/blob/9ba5e862a7e51cf2169868192db7eddb7b320e60/docs/BACKLOG.md#f-006) | Reconcile project-harness v10.9.0 → v10.20.0 | Open | No | 🟢 Small | 2026-11-25 |
| [grover:F-005](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-005) | Deploy hub and agent on the Pi behind Tailscale | Open | Procedure | 🟢 Small | 2026-11-25 |
| [grover:F-003](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-003) | Hardware bring-up on the Raspberry Pi | Open | Decision | 🟡 Medium | 2026-11-24 |
| [grover:F-004](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-004) | Calibrate analog probes (volts to pH and EC) | Implemented | No | 🟢 Small | 2026-11-24 |
| [grover:B-008](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#b-008) | The feed end-to-end test fails now and then on CI: feed done, mixing tank not emptied | Investigate | No | 🟡 Medium | 2026-11-25 |
| [grover:F-011](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-011) | Feed cycle per pot: supply tanks, mixing tank, pot pumps | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:B-006](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#b-006) | An upgraded agent drops its cached config until the hub answers | Open | No | 🟢 Small | 2026-11-24 |
| [grover:F-008](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-008) | Alerts for NERV: out-of-range values, offline agent, faults | Open | No | 🟢 Small | 2026-11-25 |
| [grover:F-012](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-012) | Plants and strains: origin, generation, breeder, ancestry | Implemented | No | 🟢 Small | 2026-11-24 |
| [grover:F-006](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-006) | Set-up screens in the client | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-007](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-007) | Lights follow the grow calendar; Switch to bloom | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-013](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-013) | Plant cycle: nursery, cuttings, harvest, a plant per pot, phase per plant | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-014](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-014) | Plant page with statistics, as in the old app | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-015](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-015) | Rig map: the tent as a live diagram, with its controls | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-016](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-016) | Schedules by day of week, weekends apart | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-018](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-018) | Pumps through an L298N driver (two pins on the MCP23017) | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-019](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-019) | Install Grover as a web app on the phone | Implemented | No | 🟢 Small | 2026-11-24 |
| [grover:F-010](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-010) | Hub data retention and backups | Open | No | 🟡 Medium | 2026-11-24 |
| [grover:F-009](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-009) | Browser tests and accessibility checks for the client | Open | No | 🔴 Large | 2026-11-24 |
| [grover:B-009](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#b-009) | Eight Dependabot PRs from 2021 to 2023 still open against the removed v1 tree | Open | Decision | 🟢 Small | 2026-11-25 |
| [grover:F-017](https://github.com/voidbrain/Grover/blob/5265cd5232896893b2c76bfa1b54d722262a6c1c/docs/BACKLOG.md#f-017) | Nutrient colours: each supply tank in its nutrient's real colour | Implemented | Procedure | 🟢 Small | 2026-11-24 |

## Source and link problems

None detected. This does not verify semantic ownership, integration behaviour or real-device acceptance.
