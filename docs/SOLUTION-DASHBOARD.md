<!-- generated: project-harness solution dashboard; edit owning backlogs, not this file -->
# voidbrain solution dashboard

Snapshot: 2026-11-25T23:37:06.839Z. Read-only aggregation; no combined completion percentage. Solution integration status is independent of component status.

| Source | Revision | Snapshot state |
|---|---|---|
| coordinator | [34231e6a1d50](https://github.com/voidbrain/coordinator/commit/34231e6a1d50da3c125a8e14663e008a05ca83d2) | Committed snapshot; requested working checkout; local checkout, not fetched |
| nerv | [ba0a7b0b535d](https://github.com/voidbrain/nerv/commit/ba0a7b0b535d3342a830a5185baacda99494f8b9) | Committed snapshot; requested main; GitHub; view published on backlog-views at d95199d022be |
| gauntlet-protocol | [5a1e306c9c60](https://github.com/voidbrain/gauntlet-protocol/commit/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea) | Committed snapshot; requested main; GitHub |
| project-harness | [e118aa537031](https://github.com/voidbrain/project-harness/commit/e118aa5370314617dd6ef9c9d0bb0c57e897578a) | Committed snapshot; requested main; GitHub |
| fpvbuddy | [9c545c0312ab](https://github.com/voidbrain/FPVBuddy/commit/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e) | Committed snapshot; requested main; GitHub |
| grover | [ae360a6f91ff](https://github.com/voidbrain/Grover/commit/ae360a6f91ff276120db592b5a05a43d448e9dc6) | Committed snapshot; requested main; GitHub |
| openbando | [791a376b5f76](https://github.com/voidbrain/openbando/commit/791a376b5f7663d15ced4d89bf575be0643e0d93) | Committed snapshot; requested main; GitHub |
| hobo | [e1669bbca975](https://github.com/voidbrain/hobo/commit/e1669bbca975c1b861ce2b0fbd5543ed8802dbea) | Committed snapshot; requested main; GitHub |
| bricks | [9fada392b34b](https://github.com/voidbrain/bricks/commit/9fada392b34b27ef62e5e326a41147de82b387ab) | Committed snapshot; requested main; GitHub |

## Summary

Open work per project. Doable agent h is the agent runway (below): agent work whose prerequisites are done or doable, across projects. Owner h is the owner time the backlog still holds. Hours are each project's own estimates, not cross-calibrated; no completion percentage.

| Project | Open records | Doable agent h | Owner h | Blocked | Harness | Next audit |
|---|---:|---:|---:|---:|---|---|
| 🚦 coordinator | 11 | 8.25 | 1 | 3 | v10.21.2, behind v10.21.3 | 2026-12-01 |
| 𖣂 nerv | 82 | 161 | 16.25 | 16 | v10.21.3 (latest) | 2026-11-27 |
| 🤖 gauntlet-protocol | 4 | 3.25 | 1 | 3 | v10.20.0, behind v10.21.3 | 2026-11-29 |
| 🦺 project-harness | 1 | 0.25 | 0 | 0 | v10.21.3 (latest) | 2026-11-29 |
| 🚁 fpvbuddy | 8 | 46.25 | 1.75 | 0 | v10.20.0, behind v10.21.3 | 2026-11-29 |
| 🪴 grover | 23 | 23.75 | 13.25 | 15 | v10.20.0, behind v10.21.3 | 2026-12-01 |
| 🏚️ openbando | 21 | 0 + 9 without hours | Unknown | 1 | v10.8.1, behind v10.21.3 | 2026-11-30 |
| 🗺️ hobo | 14 | 45.25 | 2.5 | 2 | v10.21.3 (latest) | 2026-12-02 |
| 🧱 bricks | 9 | 35 | 0.5 | 5 | v10.21.3 (latest) | 2026-12-02 |
| **Solution** | 173 | **at least 323** | **at least 36.25** | 45 | latest v10.21.3 | |

Remaining in all backlogs: at least 369.5 h agent + at least 36.25 h owner.

## Solution order

The owner's order (docs/solution-order.md): take the first ready item; it never skips a prerequisite or an owner decision. ▶ = the next item to do: the first item an agent can start now, not one that only awaits its verification or closure. Read the record before starting.

| # | | Item | Title | Status / state | Agent h | Owner h | Open prerequisites | Note |
|---:|---|---|---|---|---:|---:|---|---|
| 1 | 𖣂 | [nerv:B-118](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-118) | Windows CI: the test step runs into its 18-minute limit | Open: Ready (verification) | 5 | 0 | [nerv:B-118-T03](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-118-t03) waits on [nerv:B-118-T02](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-118-t02); [nerv:B-118-T04](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-118-t04) waits on [nerv:B-118-T03](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-118-t03) | Windows CI limit: every NERV PR waits on it |
| 2 | 𖣂 | nerv:B-125 | A signed Kaji reply is not bound to its request, so an old epoch-push reply can… | Closed: ✅ Done: closed 2026-11-26 in [docs/archive/backlog-2026.md](https://github.com/voidbrain/nerv/blob/ba0a7b0b535d3342a830a5185baacda99494f8b9/docs/archive/backlog-2026.md#b-125) | — | — | — | replayable signed Kaji reply (P2, security) |
| 3 | 𖣂 | [nerv:F-016](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-016) | Relocate the logical coordinator without split brain | Open: Owner: Procedure | 1.75 | 1 | [nerv:F-016-T11](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-016-t11) waits on [nerv:F-016-T09](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-016-t09) | relocate the coordinator without split brain (after B-124) |
| 4 | 𖣂 | [nerv:B-091](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-091) | Windows: a fenced stop ends uncertain after a SQLite "disk I/O error" while rec… | Open: Ready (verification) | 3 | 0 | — | prerequisite of nerv:F-005-T29 |
| 5 | 𖣂 | [nerv:F-005](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-005) | Discover, install and operate enrolled remote workers | Open: Ready (verification) | 3.5 | 0 | [nerv:F-005-T29](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-005-t29) waits on [nerv:B-091-T01](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-091-t01); [nerv:F-005-T36](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-005-t36) waits on [nerv:F-005-T29](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-005-t29); [nerv:F-005-T30](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-005-t30) waits on [nerv:F-005-T36](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-005-t36) | remote workers (after B-091) |
| 6 | 🪴 | [grover:F-008](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-008) | Alerts for NERV: out-of-range values, offline agent, faults | Open: Blocked: owner step grover:F-005-T01 | 0 | 0.25 | [grover:F-008-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-008-t03) waits on [grover:F-005-T01](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-005-t01) | alerts NERV can deliver (cross-repository) |
| 7 | 𖣂 | [nerv:F-120](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-120) | Gauntlet coverage of NERV capabilities | Open: ▶ Ready | 3 | 0.5 | — | Gauntlet coverage of NERV capabilities (cross-repository) |
| 8 | 𖣂 | [nerv:F-122](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-122) | Deliver Grover alerts | Open: Blocked: owner step nerv:F-004-T10 | 3.5 | 0.5 | [nerv:F-122-T02](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-122-t02) waits on [nerv:F-004-T10](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-004-t10); [nerv:F-122-T03](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-122-t03) waits on [nerv:F-122-T02](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-122-t02) | Grover alert delivery, unblocks grover:F-008 |
| 9 | 𖣂 | [nerv:F-123](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-123) | Connect NERV to Grover's hub over MCP | Open: Owner: Procedure | 0 | 0.5 | — | MCP connection to Grover's hub |
| 10 | 🚁 | [fpvbuddy:F-005](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-005) | M1 — FPV battery core package | Open: Ready | 3 | 0 | [fpvbuddy:F-005-T03](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-005-t03) waits on [fpvbuddy:F-005-T02](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-005-t02); [fpvbuddy:F-005-T04](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-005-t04) waits on [fpvbuddy:F-005-T02](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-005-t02) | M1 FPV battery core; T02 waits on nerv:F-101-T04 |
| 11 | 𖣂 | [nerv:F-121](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-121) | Printed parts per drone: "print Smoke's feet" | Open: Ready (verification) | 0 | 0.5 | [nerv:F-121-T03](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-121-t03) waits on [nerv:F-121-T04](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-121-t04); [nerv:F-121-T03](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-121-t03) waits on [nerv:B-133-T01](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-133-t01) | printed parts per drone, print by chat |
| 12 | 🪴 | [grover:F-011](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-011) | Feed cycle per pot: supply tanks, mixing tank, pot pumps | Implemented: Owner: Procedure | 0.5 | 0.5 | [grover:F-011-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-011-t03) waits on [grover:F-011-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-011-t02) | implemented P1 feed cycle; owner try-out pending |
| 13 | 🪴 | [grover:F-004](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-004) | Calibrate analog probes (volts to pH and EC) | Implemented: Blocked: owner step grover:F-005-T01 | 0.25 | 1 | [grover:F-004-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-004-t02) waits on [grover:F-003-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003-t02); [grover:F-004-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-004-t03) waits on [grover:F-004-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-004-t02) | implemented P1 probe calibration |
| 14 | 𖣂 | [nerv:F-006](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-006) | Orchestrate agents and models across nodes | Open: Ready (verification) | 0 | 0 | — | orchestration across nodes (after B-119) |
| 15 | 🪴 | [grover:F-003](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003) | Hardware bring-up on the Raspberry Pi | Open: Owner: Decision | 2.5 | 4.5 | [grover:F-003-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003-t02) waits on [grover:F-005-T01](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-005-t01); [grover:F-003-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003-t03) waits on [grover:F-003-T01](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003-t01); [grover:F-003-T04](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003-t04) waits on [grover:F-003-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003-t02); and 2 more | hardware bring-up on the Pi (P1, needs the device) |

## Blocked

Agent work that cannot start, per project, with the first block its chain reaches: an owner step, a prerequisite (in this or another project), an unknown prerequisite, a cycle, a record marked Blocked or an external wait not yet recorded.

| Project | Blocked item | Title | Waits on | Kind |
|---|---|---|---|---|
| 🚦 coordinator | [solution:F-006-T01](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-006-t01) | Record the grover&#95;alerts contract and its end-to-end check in doc… | [grover:F-005-T01](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-005-t01) | owner procedure |
| 🚦 coordinator | [solution:F-007-T01](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-007-t01) | Name the Gauntlet release NERV needs for its new cases in docs/SOLUTI… | [nerv:F-120-T03](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-120-t03) | owner procedure |
| 🚦 coordinator | [solution:F-007-T02](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-007-t02) | Link a Gauntlet run of the new NERV cases as acceptance | [nerv:F-120-T03](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-120-t03) | owner procedure |
| 𖣂 nerv | [nerv:F-011-T05](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-011-t05) | Record the evidence of F-011-T02 and close it | [nerv:F-011-T02](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-011-t02) | owner procedure |
| 𖣂 nerv | [nerv:F-011-T06](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-011-t06) | Record the evidence of F-011-T03 and close it | [nerv:F-011-T02](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-011-t02) | owner procedure |
| 𖣂 nerv | [nerv:F-004-T07](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-004-t07) | Record the evidence of F-004-T06 and close it | [nerv:F-004-T06](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-004-t06) | owner procedure |
| 𖣂 nerv | [nerv:F-012-T06](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-012-t06) | Record the evidence of F-012-T05 and close it | [nerv:F-012-T05](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-012-t05) | owner procedure |
| 𖣂 nerv | [nerv:F-016-T11](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-016-t11) | Record the evidence of F-016-T09 and close it | [nerv:F-016-T09](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-016-t09) | owner procedure |
| 𖣂 nerv | [nerv:B-099-T04](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-099-t04) | Live check on NERV-01: the escapes the review found leave nothing run… | [nerv:B-099-T03](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-099-t03) | owner procedure |
| 𖣂 nerv | [nerv:F-101-T04](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-101-t04) | Create/wire the FPVBuddy core repository and move the core into it | [nerv:F-098-T04](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-098-t04) | owner procedure |
| 𖣂 nerv | [nerv:F-101-T05](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-101-t05) | NERV FPV pack uses the FPV core package | [nerv:F-098-T04](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-098-t04) | owner procedure |
| 𖣂 nerv | [nerv:F-101-T07](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-101-t07) | Retire NERV's FPV pack views and connect NERV to FPVBuddy's MCP server | [nerv:F-098-T04](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-098-t04) | owner procedure |
| 𖣂 nerv | [nerv:F-101-T06](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-101-t06) | NERV shows FPV data through FPVBuddy's MCP tools and surfaces | [nerv:F-098-T04](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-098-t04) | owner procedure |
| 𖣂 nerv | [nerv:F-131-T03](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-131-t03) | Default quick commands for FPVBuddy, Hobo and Grover | [nerv:F-098-T04](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-098-t04) | owner procedure |
| 𖣂 nerv | [nerv:F-126-T04](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-126-t04) | Switch the configured chat model to gemma4:26b | [nerv:F-126-T03](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-126-t03) | owner decision |
| 𖣂 nerv | [nerv:F-122-T02](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-122-t02) | Deliver Grover alerts through NERV's channels | [nerv:F-004-T10](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-004-t10) | owner procedure |
| 𖣂 nerv | [nerv:F-060-T03](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-060-t03) | Record the evidence of F-060-T01 and close it | [nerv:F-060-T01](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-060-t01) | owner procedure |
| 𖣂 nerv | [nerv:F-060-T02](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-060-t02) | Answer the five questions and per-record outcomes | [nerv:F-060-T01](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-060-t01) | owner procedure |
| 𖣂 nerv | [nerv:F-007-T10](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-007-t10) | Record the evidence of F-007-T05 and close it | [nerv:F-007-T05](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-007-t05) | owner procedure |
| 🤖 gauntlet-protocol | [gauntlet-protocol:F-022-T03](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#f-022-t03) | Record the outcome | [gauntlet-protocol:F-022-T02](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#f-022-t02) | owner decision |
| 🤖 gauntlet-protocol | [gauntlet-protocol:F-021-T03](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#f-021-t03) | Image-generation runner | [gauntlet-protocol:F-021-T02](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#f-021-t02) | owner decision |
| 🤖 gauntlet-protocol | [gauntlet-protocol:F-021-T04](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#f-021-t04) | Image grader and pack | [gauntlet-protocol:F-021-T02](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#f-021-t02) | owner decision |
| 🪴 grover | [grover:F-005-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-005-t03) | Fix the README and service files from the first install | [grover:F-005-T01](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-005-t01) | owner procedure |
| 🪴 grover | [grover:F-003-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003-t03) | Driver for the chosen level sensor | [grover:F-003-T01](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003-t01) | owner decision |
| 🪴 grover | [grover:F-003-T05](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003-t05) | Record the bring-up results; open B- records for driver faults | [grover:F-005-T01](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-005-t01) | owner procedure |
| 🪴 grover | [grover:F-004-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-004-t03) | Record the calibration result; fix what it found | [grover:F-005-T01](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-005-t01) | owner procedure |
| 🪴 grover | [grover:F-011-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-011-t03) | Record the try of a feed; fix what it found | [grover:F-011-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-011-t02) | owner procedure |
| 🪴 grover | [grover:F-012-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-012-t03) | Record the try of the import; fix what it found | [grover:F-005-T01](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-005-t01) | owner procedure |
| 🪴 grover | [grover:F-006-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-006-t03) | Record the try of the Setup pages; fix what it found | [grover:F-006-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-006-t02) | owner procedure |
| 🪴 grover | [grover:F-007-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-007-t03) | Record the try of Switch to bloom; fix what it found | [grover:F-007-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-007-t02) | owner procedure |
| 🪴 grover | [grover:F-013-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-013-t03) | Record the try of the plant cycle; fix what it found | [grover:F-013-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-013-t02) | owner procedure |
| 🪴 grover | [grover:F-014-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-014-t03) | Record the try of the plant page; fix what it found | [grover:F-014-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-014-t02) | owner procedure |
| 🪴 grover | [grover:F-015-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-015-t03) | Record the try of the rig map; fix what it found | [grover:F-015-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-015-t02) | owner procedure |
| 🪴 grover | [grover:F-016-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-016-t03) | Record the try of weekday schedules; fix what it found | [grover:F-016-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-016-t02) | owner procedure |
| 🪴 grover | [grover:F-018-T04](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-018-t04) | Record the pump device check; fix what it found | [grover:F-018-T01](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-018-t01) | owner procedure |
| 🪴 grover | [grover:B-009-T02](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#b-009-t02) | Close the v1 Dependabot PRs and delete their branches | [grover:B-009-T01](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#b-009-t01) | owner decision |
| 🪴 grover | [grover:F-017-T04](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-017-t04) | Record the colour choice; fix what it found | [grover:F-017-T03](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-017-t03) | owner procedure |
| 🏚️ openbando | [openbando:F-039](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-039) | Coverage of the browser tests in the coverage table | [openbando:F-039](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-039) | record marked Blocked |
| 🗺️ hobo | [hobo:F-008-T04](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-008-t04) | Read-only share link | [hobo:F-008-T03](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-008-t03) | owner decision |
| 🗺️ hobo | [hobo:F-014-T02](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-014-t02) | Google place-details provider | [hobo:F-014-T01](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-014-t01) | owner decision |
| 🧱 bricks | [bricks:F-004-T06](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-004-t06) | First publish of 0.1.0 and an install check | [bricks:F-004-T05](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-004-t05) | owner procedure |
| 🧱 bricks | [bricks:F-006-T03](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-006-t03) | Migration note for NERV and the release that carries it | [bricks:F-004-T05](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-004-t05) | owner procedure |
| 🧱 bricks | [bricks:F-008-T02](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-008-t02) | Migration note for Grover and the release that carries it | [bricks:F-004-T05](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-004-t05) | owner procedure |
| 🧱 bricks | [bricks:F-009-T02](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-009-t02) | Migration note for FPVBuddy (after its Angular 22 upgrade) and the re… | [bricks:F-004-T05](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-004-t05) | owner procedure |
| 🧱 bricks | [bricks:F-007-T03](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-007-t03) | Migration note for Hobo and the release that carries it | [bricks:F-007-T02](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-007-t02) | owner decision |

## Nothing to do

Projects with no doable agent work, and why.

| Project | Why |
|---|---|
| — | Every project has doable agent work |

## Waiting for the owner

Records and steps whose next move is an owner procedure (🧑‍🔧) or decision (🤔). Owner time is the record's own. Open the link for the exact instructions.

| Item | Title | Kind | Priority | Owner time | Next |
|---|---|---|---|---|---|
| [nerv:F-062](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-062) | Backup and restore: agreed loss bounds, off-host snapshots and a restore drill | Procedure | 🔺 P1 | 0.25 h | F-062-T07: Owner runs the restore drill on NERV-01 from a real off-host copy |
| [nerv:F-011](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-011) | Native macOS menu-bar companion without Electron | Procedure | 🔺 P1 | 0.75 h | F-011-T02: Live menu, service-button and login acceptance on the Mac |
| [nerv:F-004](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-004) | Angular PWA and validated GenUI | Procedure | 🔺 P1 | 1 h | F-004-T06: Phone install and push acceptance; F-004-T10: Owner check: push first, Telegram as fallback on the phone |
| [nerv:F-012](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-012) | Resume a specific paused job after its provider limit resets | Procedure | 🔺 P1 | 0.5 h | F-012-T05: Edge cases and real-host acceptance |
| [nerv:F-016](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-016) | Relocate the logical coordinator without split brain | Procedure | 🔺 P1 | 1 h | F-016-T09: Step 5b — Two-device relocation acceptance |
| [nerv:F-120](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-120) | Gauntlet coverage of NERV capabilities | Procedure | 🔶 P2 | 0.5 h | F-120-T03: Adopt the Gauntlet domain packs when released |
| [nerv:F-086](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-086) | Gmail: search and read, then draft and send behind approval | Procedure | 🔶 P2 | 0.5 h | F-086-T04: Owner check with the owner's account |
| [nerv:F-087](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-087) | 3D printing: slice a model with a material profile and send it to the printer | Procedure | 🔶 P2 | 0.5 h | F-087-T04: Owner check on the real printer |
| [nerv:F-092](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-092) | Record desktop input and replay it | Procedure | 🔶 P2 | 0.25 h | F-092-T04: Owner check on the Mac |
| [nerv:B-057](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-057) | Companion error messages are Italian only and do not say what went wrong | Procedure | 🔶 P2 | 0.25 h | B-057-T02: Owner live check: rotated certificate message (part D step 1) |
| [nerv:B-068](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-068) | Companion keeps Start NERV disabled after Stop NERV | Procedure | 🔶 P2 | 0.25 h | B-068-T02: Owner check: Stop then Start from the companion |
| [nerv:B-107](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-107) | Pilot cards: model select leaves its card and name inputs are too narrow to read | Procedure | 🔶 P2 | — | After the update flow rebuilds `dist/web` and restarts `nerv`, open the dashboard, hard-reload (Cmd+Shift+R) and check the Marduk Institute… |
| [nerv:B-113](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-113) | Updating from the dashboard signs it out, then offers a stale Update now that f… | Procedure | 🔶 P2 | — | After this ships, press Update now with the next update: the dashboard stays signed in, shows Updating… until NERV answers on the new revis… |
| [nerv:B-122](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-122) | Update now is refused with "ownership is unknown" while NERV runs as a foregrou… | Procedure | 🔶 P2 | 0.25 h | B-122-T02: Owner updates NERV-01 and sees the foreground reason |
| [nerv:B-123](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-123) | After Update now the dashboard never shows the updater's result | Procedure | 🔶 P2 | 0.25 h | B-123-T02: Owner: Update now shows the updater's status in Health |
| [nerv:B-128](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-128) | Settings → Pair a device on a 127.0.0.1 dashboard puts a loopback address in th… | Procedure | 🔶 P2 | 0.25 h | B-128-T02: Owner: scan the Settings pairing QR from the Mac with the phone |
| [nerv:B-129](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-129) | Health → Run doctor logs a canned "all ok" line and never asks the service | Procedure | 🔶 P2 | — | After the update reaches the service, on the Mac run `nerv open dashboard`, Health → Run doctor: under the button a block reads "Doctor · a… |
| [nerv:B-134](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-134) | Every Web Push to Apple fails with 403 BadJwtToken, and the failure is invisible | Procedure | 🔶 P2 | 0 h | After the update reaches the service, follow the phone push procedure with the `nerv remind` command there: the iPhone shows the notificati… |
| [nerv:B-135](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-135) | Update now on a busy Mac is refused as an ownership problem when NERV's health … | Procedure | 🔶 P2 | 0 h | After the update reaches the service, press Update now in the dashboard while the Mac is busy (for example during a full `npm test` in anot… |
| [nerv:B-142](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-142) | Dashboard Health: the service sample and link rows are built outside the table … | Procedure | 🔶 P2 | — | After the update reaches the service, on the Mac run `nerv open dashboard` and look at Health (phone too, from the Home Screen app): "Servi… |
| [nerv:F-098](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-098) | FPV fleet diary: crashes, parts, spares and photos | Procedure | 🔹 P3 | 0.25 h | F-098-T04: Live check with a real crash |
| [nerv:F-060](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-060) | Spike: herdr-core as a coding-agent terminal runtime | Procedure | 🔹 P3 | 2 h | F-060-T01: herdr-core trial in the development workspace |
| [nerv:F-116](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-116) | Split a model too big for one base across bases | Decision | 🔹 P3 | 0.25 h | F-116-T02: Owner decision: build model splitting or close |
| [nerv:F-007](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-007) | Voice and evaluated skill improvement | Procedure | 🔹 P3 | 0.5 h | F-007-T05: Step 2c — Voice corpus evaluation run and report |
| [nerv:F-123](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-123) | Connect NERV to Grover's hub over MCP | Procedure | 🔹 P3 | 0.5 h | F-123-T02: Owner check: NERV lists the Grover tools |
| [nerv:B-056](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-056) | A renewal the companion refuses on the Mac says it was not confirmed | Procedure | 🔹 P3 | 0.25 h | B-056-T02: Owner live check: refused and unconfirmed renewal in the companion |
| [nerv:B-096](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-096) | Sephirot flow: a sortie that stops at Misato's apartment has no route to Debrief | Procedure | 🔹 P3 | 0 h | Look at the live dashboard: NERV-01 runs `477d6afc` since 2026-11-19, which has this fix. |
| [nerv:B-110](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-110) | Dashboard offers Update now when already up to date, away from the update status | Procedure | 🔹 P3 | — | When the next update is available, open the dashboard: Health shows Update now beside "Update availability"; Settings has no update button;… |
| [nerv:B-112](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-112) | Sephirot flow lights routes the sortie did not take and hides the map when no s… | Procedure | 🔹 P3 | — | After the update, open a few sorties (S-6AD9, one answered without an action, one that asked you something) and deselect: check the routes … |
| [nerv:B-130](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-130) | A finished sortie that never needed approval shows Misato's Apt faded as skippe… | Procedure | 🔹 P3 | — | After the update reaches the service, on the Mac run `nerv open dashboard` and select a finished sortie the MAGI granted without asking you… |
| [nerv:B-141](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-141) | Dashboard: the updater status is lost among the Health rows, and Settings is mi… | Procedure | 🔹 P3 | — | After the update reaches the service, on the Mac run `nerv open dashboard`: an updater status under Update availability is a bordered box i… |
| [grover:F-005](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-005) | Deploy hub and agent on the Pi behind Tailscale | Procedure | 🔶 P2 | 1.5 h | F-005-T01: Owner installs hub and agent on the Pi behind Tailscale |
| [grover:F-003](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003) | Hardware bring-up on the Raspberry Pi | Decision | 🔺 P1 | 4.5 h | F-003-T01: Owner chooses the water-level sensor |
| [grover:F-011](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-011) | Feed cycle per pot: supply tanks, mixing tank, pot pumps | Procedure | 🔺 P1 | 0.5 h | F-011-T02: Owner tries a feed on the simulated rig on the dev stack |
| [grover:F-006](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-006) | Set-up screens in the client | Procedure | 🔶 P2 | 0.5 h | F-006-T02: Owner tries the Setup pages on the dev stack |
| [grover:F-007](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-007) | Lights follow the grow calendar; Switch to bloom | Procedure | 🔶 P2 | 0.25 h | F-007-T02: Owner tries Switch to bloom and the light line on the dev stack |
| [grover:F-013](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-013) | Plant cycle: nursery, cuttings, harvest, a plant per pot, phase per plant | Procedure | 🔶 P2 | 0.5 h | F-013-T02: Owner tries the plant cycle on the dev stack |
| [grover:F-014](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-014) | Plant page with statistics, as in the old app | Procedure | 🔶 P2 | 0.25 h | F-014-T02: Owner tries the plant page on the dev stack |
| [grover:F-015](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-015) | Rig map: the tent as a live diagram, with its controls | Procedure | 🔶 P2 | 0.5 h | F-015-T02: Owner tries the rig map on a phone and a laptop, light and dark on the dev stack |
| [grover:F-016](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-016) | Schedules by day of week, weekends apart | Procedure | 🔶 P2 | 0.25 h | F-016-T02: Owner tries weekday schedules on the dev stack |
| [grover:F-018](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-018) | Pumps through an L298N driver (two pins on the MCP23017) | Procedure | 🔶 P2 | 1.5 h | F-018-T01: Owner writes down the pump wiring (L298N inputs on MCP23017 pins) |
| [grover:B-009](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#b-009) | Eight Dependabot PRs from 2021 to 2023 still open against the removed v1 tree | Decision | 🔹 P3 | 0.25 h | B-009-T01: Owner decides on closing the eight v1 Dependabot PRs |
| [grover:F-017](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-017) | Nutrient colours: each supply tank in its nutrient's real colour | Procedure | 🔹 P3 | 0.25 h | F-017-T03: Owner picks the nutrient colours |
| [openbando:B-009](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-009) | Simulator and selected-flight/video regression | Procedure | 🔶 P2 | — | Manually check simulator entry, collisions and selected-flight/video replay: steps and expected results. |
| [openbando:B-017](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-017) | Villetta replay misalignment with video | Procedure | 🔶 P2 | — | Pin the demo flight at your three moments on the live site (since #258) and say whether the replay then follows the video: steps and expect… |
| [openbando:B-018](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-018) | Hidden-origin GPS projection distorts flight paths | Procedure | 🔺 P1 | — | Compare the corrected path with the real flight and test real GPS devices: steps and expected results. |
| [openbando:B-028](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-028) | New bando: grey map after a hidden bando, full addresses not found, Generate be… | Procedure | 🔶 P2 | — | On the live site after merge: open a hidden bando, then New; search a full street address; check the map, the matches list and Generate: st… |
| [openbando:F-001](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-001) | Cut/Wing for diagonal basement outlines | Procedure | 🔶 P2 | — | Review diagonal Cut/Wing editing and saved/imported outlines: steps and expected results. |
| [openbando:F-009](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-009) | Racing on real devices | Procedure | 🔶 P2 | — | Run the two-device race/GPS field checklist with real telemetry feeds: steps and expected results. |
| [openbando:F-025](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-025) | Rework the Fly checklist | Decision | 🔹 P3 | — | Say what the Fly checklist should do differently (steps, order, what it checks, when it opens): options and the reply to send. |
| [openbando:F-026](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-026) | Rework the panels' "?" tips: what they cover, checked automatically | Decision | 🔹 P3 | — | Choose A (title-based tips), B (a tip per control) or C (remove tips): options and the reply to send. |
| [openbando:F-031](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-031) | Clips and films say when their sources changed since recording | Procedure | 🔹 P3 | — | Re-record and review the guide clips and Welcome films: steps and expected results. |
| [openbando:F-033](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-033) | Full impact map: chains, content, couplings, outside the repository, as a reada… | Procedure | 🔶 P2 | — | Read `docs/agents/impact-map.md` and say what is missing or wrong: it is meant to list everything that follows a change. |
| [openbando:F-053](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-053) | Rebuild a bando as a point cloud from a flight's video, placed by its blackbox … | Decision | 🔹 P3 | — | Choose survey pass and import tool, in-app reconstruction, or stop: options and results. |
| [hobo:F-008](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-008) | Share and export | Decision | 🔹 P3 | 0.5 h | F-008-T03: Owner decides how a read-only link is served |
| [hobo:F-014](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-014) | Google Maps place data (optional, later) | Decision | 🔹 P3 | 0.25 h | F-014-T01: Owner decides whether to add Google place data |

## Agent runway

Agent hours that can run before work reaches a block: open agent work that is ready, or waits only on work that can itself run, across repositories. Hours are each project's own estimate; a prerequisite the reader cannot resolve is a block, never assumed done.

| Project | Runway | First blocks reached | Owner hours for the next layer |
|---|---|---|---|
| 🚦 coordinator | 8.25 h | owner step grover:F-005-T01; owner step nerv:F-120-T03; owner step solution:F-012-T07 | 0.5 h |
| 𖣂 nerv | 161 h | owner step nerv:F-062-T07; owner step nerv:F-011-T02; owner step nerv:F-004-T06; owner step nerv:F-004-T10; owner step nerv:F-012-T05; owner step nerv:F-016-T09; owner step nerv:F-082-T04; owner step nerv:F-083-T09; owner step nerv:F-120-T03; owner step nerv:F-088-T04; owner step nerv:F-117-T05; owner step nerv:F-130-T14; owner step nerv:F-089-T03; owner step nerv:F-090-T03; owner step nerv:F-094-T04; owner step nerv:B-099-T03; owner step nerv:B-147-T03; owner step nerv:F-086-T04; owner step nerv:F-087-T04; owner step nerv:F-092-T04; owner step nerv:B-057-T02; owner step nerv:B-068-T02; owner step nerv:B-122-T02; owner step nerv:B-123-T02; owner step nerv:B-128-T02; owner step nerv:F-129-T03; owner step nerv:F-098-T04; owner step nerv:F-126-T03; owner step nerv:F-060-T01; owner step nerv:F-116-T02; owner step nerv:F-007-T05; owner step nerv:F-123-T02; owner step nerv:B-056-T02 | 14.5 h |
| 🤖 gauntlet-protocol | 3.25 h | owner step gauntlet-protocol:F-022-T02; owner step gauntlet-protocol:F-021-T02 | 0.75 h |
| 🦺 project-harness | 0.25 h | — | 0 h |
| 🚁 fpvbuddy | 46.25 h | owner step fpvbuddy:F-007-T04; owner step fpvbuddy:F-008-T08; owner step fpvbuddy:F-009-T05; owner step fpvbuddy:F-011-T07 | 1.75 h |
| 🪴 grover | 23.75 h | owner step grover:F-005-T01; owner step grover:F-003-T01; owner step grover:F-011-T02; owner step grover:F-006-T02; owner step grover:F-007-T02; owner step grover:F-013-T02; owner step grover:F-014-T02; owner step grover:F-015-T02; owner step grover:F-016-T02; owner step grover:F-018-T01; owner step grover:F-020-T08; owner step grover:B-009-T01; owner step grover:F-017-T03 | 6 h |
| 🏚️ openbando | 0 h; not estimated: openbando:B-045, openbando:B-050, openbando:B-051, openbando:F-021, openbando:F-024, openbando:F-040, openbando:F-041, openbando:F-042, openbando:F-043 | owner step openbando:B-009; owner step openbando:B-017; owner step openbando:B-018; owner step openbando:B-028; owner step openbando:F-001; owner step openbando:F-009; owner step openbando:F-025; owner step openbando:F-026; owner step openbando:F-031; owner step openbando:F-033; record marked Blocked: openbando:F-039; owner step openbando:F-053 | 0 h; not estimated: openbando:B-009, openbando:B-017, openbando:B-018, openbando:B-028, openbando:F-001, openbando:F-009, openbando:F-025, openbando:F-026, openbando:F-031, openbando:F-033, openbando:F-053 |
| 🗺️ hobo | 45.25 h | owner step hobo:F-007-T04; owner step hobo:F-008-T03; owner step hobo:F-011-T02; owner step hobo:F-013-T03; owner step hobo:F-014-T01 | 2.25 h |
| 🧱 bricks | 35 h | owner step bricks:F-004-T05; owner step bricks:F-007-T02 | 0.5 h |
| **Solution** | at least 323 h | 72 | at least 26.25 h |

## Audits, reviews and harness

Each project's own evidence at its resolved commit: the newest audit against its interval (`audit.days`), each periodic review (`reviews.<name>.days`) and its harness release against the latest template release (latest release of voidbrain/project-harness). Missing evidence reads as unknown, never as current.

| Project | Harness | Last audit | Reviews | Notes |
|---|---|---|---|---|
| 🚦 coordinator | **v10.21.2, behind v10.21.3** | 2026-11-25 (scoped), no complete full audit; next 2026-12-01 | — | — |
| 𖣂 nerv | v10.21.3 (latest) | 2026-11-20 (full); next 2026-11-27 | token: next 2026-12-16; architecture: next 2026-12-16; skills: next 2026-12-24 | — |
| 🤖 gauntlet-protocol | **v10.20.0, behind v10.21.3** | 2026-11-22 (full); next 2026-11-29 | token: next 2026-12-22; architecture: next 2026-12-22; skills: next 2026-12-24 | — |
| 🦺 project-harness | v10.21.3 (latest) | 2026-11-22 (full); next 2026-11-29 | token: next 2026-12-22; architecture: next 2026-12-22; skills: next 2026-12-24 | — |
| 🚁 fpvbuddy | **v10.20.0, behind v10.21.3** | 2026-11-22 (full); next 2026-11-29 | — | — |
| 🪴 grover | **v10.20.0, behind v10.21.3** | 2026-11-25 (scoped), no complete full audit; next 2026-12-01 | — | — |
| 🏚️ openbando | **v10.8.1, behind v10.21.3** | 2026-11-23 (full); next 2026-11-30 | — | — |
| 🗺️ hobo | v10.21.3 (latest) | 2026-11-25 (scoped), no complete full audit; next 2026-12-02 | — | — |
| 🧱 bricks | v10.21.3 (latest) | 2026-11-25 (scoped), no complete full audit; next 2026-12-02 | — | — |

## Gap review

Proposals only, each naming the repository that would own the fix: the coordinator never creates or edits a record in a component; an accepted proposal is created by its owning repository (`docs/agents/solution-gaps.md`). The cross-repository kind is a text heuristic.

| # | Kind | Where | Evidence | Proposal |
|---:|---|---|---|---|
| 1 | Behind the harness | solution .harness.json | solution is on v10.21.2; the latest template release is v10.21.3 | solution: a record "Reconcile to harness v10.21.3", done in a session of that repository |
| 2 | Behind the harness | gauntlet-protocol .harness.json | gauntlet-protocol is on v10.20.0; the latest template release is v10.21.3 | gauntlet-protocol: a record "Reconcile to harness v10.21.3", done in a session of that repository |
| 3 | Behind the harness | fpvbuddy .harness.json | fpvbuddy is on v10.20.0; the latest template release is v10.21.3 | fpvbuddy: a record "Reconcile to harness v10.21.3", done in a session of that repository |
| 4 | Behind the harness | grover .harness.json | grover is on v10.20.0; the latest template release is v10.21.3 | grover: a record "Reconcile to harness v10.21.3", done in a session of that repository |
| 5 | Behind the harness | openbando .harness.json | openbando is on v10.8.1; the latest template release is v10.21.3 | openbando: a record "Reconcile to harness v10.21.3", done in a session of that repository |

## Open work by repository

Each open record in its backlog's order. State: Ready = an agent can start its next open step now; the owner's turn, waiting and blocked work as in the solution order. Owner h reads unknown where the record owes owner work its Remaining cell does not state.

### 🚦 coordinator

| Item | Title | Status | Priority | Open steps | Agent h | Owner h | State |
|---|---|---|---|---:|---:|---:|---|
| [solution:B-002](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#b-002) | check:fast fails with a bare HTTP 403 when GH_TOKEN is unset | Open | 🔹 P3 | 1 | 0.5 | 0 | Ready |
| [solution:B-003](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#b-003) | Neither scheduled workflow has run on its schedule yet | Investigate | 🔹 P3 | 1 | 0.25 | 0 | Ready |
| [solution:B-004](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#b-004) | An hourly refresh would open a PR every hour: the coordinator's own revision ro… | Implemented | 🔹 P3 | 1 | 0 | 0 | Ready (verification) |
| [solution:F-006](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-006) | NERV delivers Grover alerts end to end | Open | 🔶 P2 | 2 | 1 | 0.5 | Blocked: owner step grover:F-005-T01 |
| [solution:F-007](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-007) | NERV capability coverage in the Gauntlet across both repositories | Open | 🔶 P2 | 2 | 1 | 0 | Blocked: owner step nerv:F-120-T03 |
| [solution:F-009](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-009) | Reconcile to the latest harness and read built backlog views | Implemented | 🔹 P3 | 1 | 0.25 | 0 | Ready (verification) |
| [solution:F-011](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-011) | Reconcile to harness 10.21.2: the dashboard's five overview gaps and the coordi… | Implemented | 🔹 P3 | 1 | 0 | 0 | Ready (verification) |
| [solution:F-012](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-012) | Bricks 🧱: shared UI library for the voidbrain projects | Open | 🔹 P3 | 7 | 6 | 0.5 | Ready |
| [solution:F-013](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-013) | OpenBando 🏚️ in the solution, and a domain map | Open | 🔹 P3 | 2 | 0.5 | 0 | Ready (verification) |
| [solution:F-014](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-014) | Owner accepts or rejects the 2026-11-26 gap-review proposals | Open | 🔹 P3 | 1 | 0.25 | 0 | Ready |
| [solution:F-015](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-015) | Reconcile project-harness v10.21.2 → v10.21.3 | Open | 🔹 P3 | 1 | 0.5 | 0 | Ready |

<details><summary>🚦 coordinator: 20 open steps</summary>

| Step | Title | Status | Remaining | Who | Depends on | State |
|---|---|---|---|---|---|---|
| solution:B-002-T01 | Make check:fast supply or ask for GH&#95;TOKEN | Planned | 0.5 h | 🤖 | — | Ready |
| solution:B-003-T01 | Check that both scheduled workflows have run on their schedule | Planned | 0.25 h | 🤖 | — | Ready |
| solution:B-004-T01 | Refresh hourly; a run with only the snapshot and the coordinator's revision opens no PR | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| solution:F-006-T01 | Record the grover&#95;alerts contract and its end-to-end check in docs/SOLUTION.md (waits on grover:F-008-T03 and nerv:F-122-T02) | Planned | 1 h | ⏳ 🤖 | grover:F-008-T03, nerv:F-122-T02 | Blocked: owner step grover:F-005-T01 |
| solution:F-006-T02 | Owner sees a Grover alert arrive through NERV | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-006-T01 | Blocked: owner step grover:F-005-T01 |
| solution:F-007-T01 | Name the Gauntlet release NERV needs for its new cases in docs/SOLUTION.md (waits on nerv:F-120) | Planned | 0.5 h | ⏳ 🤖 | nerv:F-120-T01, nerv:F-120-T02, nerv:F-120-T03 | Blocked: owner step nerv:F-120-T03 |
| solution:F-007-T02 | Link a Gauntlet run of the new NERV cases as acceptance | Planned | 0.5 h | ⏳ 🤖 | F-007-T01 | Blocked: owner step nerv:F-120-T03 |
| solution:F-009-T01 | Reconcile to the latest harness and read built backlog views | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| solution:F-011-T01 | Copy the 10.21.2 solution files, label the coordinator and regenerate the dashboard | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| solution:F-012-T01 | Angular version contract: every UI component on Angular 22 | Planned | 0.5 h | 🤖 | — | Ready |
| solution:F-012-T04 | Owner: create the voidbrain/bricks library repository | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| solution:F-012-T02 | Design-token contract matching NERV's style guide | Planned | 2 h | ⏳ 🤖 | F-012-T01 | Waiting on solution:F-012-T01 |
| solution:F-012-T03 | Shared component contract from what the NERV dashboard migration produced | Planned | 2 h | ⏳ 🤖 | F-012-T02, nerv:F-130-T02, nerv:F-130-T05, nerv:F-130-T09 | Waiting on solution:F-012-T02 |
| solution:F-012-T05 | Add voidbrain/bricks to the solution and propose its adoption | Ready | 0.5 h | ⏳ 🤖 | F-012-T04 | Waiting on solution:F-012-T04 |
| solution:F-012-T06 | Integration acceptance: the UI projects on one library release | Planned | 1 h | ⏳ 🤖 | F-012-T05, nerv:F-130-T13, hobo:F-010-T02, grover:F-020-T07, fpvbuddy:F-008-T06 | Waiting on solution:F-012-T05 |
| solution:F-012-T07 | Owner: look at the three apps side by side | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-012-T06 | Waiting on solution:F-012-T06 |
| solution:F-013-T01 | Add openbando to the solution and write the domain map | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| solution:F-013-T02 | First gap review against the domain map | Planned | 0.5 h | ⏳ 🤖 | F-013-T01 | Waiting on solution:F-013-T01 |
| solution:F-014-T02 | Confirm after the refresh that each accepted gap is gone (proposal 15 once openbando's reconcile lands) | Planned | 0.25 h | 🤖 | — | Ready |
| solution:F-015-T01 | Reconcile harness files v10.21.2 -&gt; v10.21.3 | Planned | 0.5 h | 🤖 | — | Ready |

</details>

### 𖣂 nerv

| Item | Title | Status | Priority | Open steps | Agent h | Owner h | State |
|---|---|---|---|---:|---:|---:|---|
| [nerv:B-091](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-091) | Windows: a fenced stop ends uncertain after a SQLite "disk I/O error" while rec… | Open | 🔶 P2 | 1 | 3 | 0 | Ready (verification) |
| [nerv:F-005](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-005) | Discover, install and operate enrolled remote workers | Open | 🔺 P1 | 4 | 3.5 | 0 | Ready (verification) |
| [nerv:F-006](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-006) | Orchestrate agents and models across nodes | Open | 🔺 P1 | 2 | 0 | 0 | Ready (verification) |
| [nerv:B-143](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-143) | A relative reminder time counts from the model step that writes the call, not f… | Implemented | 🔺 P1 | 1 | 1.5 | 0 | Ready (verification) |
| [nerv:B-118](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-118) | Windows CI: the test step runs into its 18-minute limit | Open | 🔺 P1 | 4 | 5 | 0 | Ready (verification) |
| [nerv:F-062](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-062) | Backup and restore: agreed loss bounds, off-host snapshots and a restore drill | Open | 🔺 P1 | 1 | 0 | 0.25 | Owner: Procedure |
| [nerv:F-011](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-011) | Native macOS menu-bar companion without Electron | Implemented | 🔺 P1 | 4 | 0.5 | 0.75 | Owner: Procedure |
| [nerv:F-004](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-004) | Angular PWA and validated GenUI | Open | 🔺 P1 | 3 | 0.25 | 1 | Owner: Procedure |
| [nerv:F-012](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-012) | Resume a specific paused job after its provider limit resets | Open | 🔺 P1 | 2 | 0.25 | 0.5 | Owner: Procedure |
| [nerv:F-016](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-016) | Relocate the logical coordinator without split brain | Open | 🔺 P1 | 3 | 1.75 | 1 | Owner: Procedure |
| [nerv:F-082](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-082) | Lists: add items by chat or Telegram, recall them as a checklist card | Open | 🔶 P2 | 2 | 0 | 0.25 | Ready (verification) |
| [nerv:F-083](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-083) | Saved recipes: keep them by category, recall them, compute only from saved valu… | Open | 🔶 P2 | 4 | 1.5 | 0.25 | Ready (verification) |
| [nerv:F-120](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-120) | Gauntlet coverage of NERV capabilities | Open | 🔶 P2 | 2 | 3 | 0.5 | Ready |
| [nerv:F-088](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-088) | Storage base: copy files from a known removable card when it is inserted | Open | 🔶 P2 | 2 | 0.5 | 0.5 | Ready (verification) |
| [nerv:B-108](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-108) | Dashboard "Update now" and the scheduled apply cannot update the service they r… | Implemented | 🔶 P2 | 2 | 0.5 | 0 | Ready (verification) |
| [nerv:F-102](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-102) | Scheduled automatic updates with advance notice | Open | 🔶 P2 | 2 | 1 | 0 | Ready (verification) |
| [nerv:B-111](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-111) | The live service never records health samples: "No health samples yet" forever | Implemented | 🔶 P2 | 1 | 0.25 | 0 | Ready (verification) |
| [nerv:F-103](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-103) | Service health and link load between bases, measured | Open | 🔶 P2 | 2 | 1.75 | 0 | Ready (verification) |
| [nerv:F-117](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-117) | One command to update a base: `nerv update` | Open | 🔶 P2 | 3 | 1.5 | 0.25 | Ready |
| [nerv:F-130](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-130) | Migrate the dashboard into the Angular workspace | Open | 🔶 P2 | 16 | 50 | 1.5 | Ready |
| [nerv:F-118](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-118) | Pair a phone once: device sign-in with a 90-day sliding limit | Open | 🔶 P2 | 1 | 0.5 | 0 | Ready |
| [nerv:F-089](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-089) | Browser control: act on a named control in an open page | Open | 🔶 P2 | 2 | 0 | 0.25 | Ready (verification) |
| [nerv:F-090](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-090) | Resume interrupted coding work without the editor | Open | 🔶 P2 | 2 | 0 | 0.25 | Ready (verification) |
| [nerv:F-093](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-093) | Desktop control: click a named control in an app on screen | Open | 🔶 P2 | 1 | 0 | 0 | Ready (verification) |
| [nerv:F-094](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-094) | App workflows: open an app, open a file, save it as another file | Open | 🔶 P2 | 2 | 0.5 | 0.25 | Ready |
| [nerv:F-106](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-106) | Per-turn prompt size on the local route, then deferred domain tool loading | Open | 🔶 P2 | 1 | 2 | 0 | Ready (verification) |
| [nerv:F-128](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-128) | Coding jobs measure their instruction load and hand off between steps | Open | 🔶 P2 | 3 | 6.5 | 0 | Ready |
| [nerv:B-099](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-099) | An EVA-03 job's child in its own session survives the job's timeout and cancell… | Open | 🔶 P2 | 3 | 5.5 | 0.25 | Ready (verification) |
| [nerv:F-049](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-049) | EVA instances: an EVA is a class, each job gets a fresh sandbox | Open | 🔶 P2 | 5 | 19.25 | 0 | Ready (verification) |
| [nerv:F-008](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-008) | FPV batteries: registry, charge state, resistance checks and storage reminders | Open | 🔶 P2 | 2 | 0.75 | 0 | Ready |
| [nerv:B-066](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-066) | Worker-link heartbeat verification awaits nervous SQLite IPC on every frame | Open | 🔶 P2 | 2 | 0.75 | 0 | Ready (verification) |
| [nerv:B-120](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-120) | `kaji promote` starts the service before removing its marker, so the service ca… | Implemented | 🔶 P2 | 1 | 0 | 0 | Ready (verification) |
| [nerv:B-138](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-138) | `nerv chat` answers a fleet question with a generic greeting, ignoring the `fle… | Implemented | 🔶 P2 | 0 | 0 | 0 | Ready (to close) |
| [nerv:B-144](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-144) | The dashboard rewrites the EVA cages on every poll, so their images reload with… | Implemented | 🔶 P2 | 1 | 1 | 0 | Ready (verification) |
| [nerv:B-136](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-136) | `nerv chat` gets an "(invalid reply)" from the planner before every answer | Implemented | 🔶 P2 | 1 | 1.5 | 0 | Ready (verification) |
| [nerv:B-140](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-140) | "Update now" refused with "Update check timed out.": every update-check git com… | Implemented | 🔶 P2 | 1 | 1.5 | 0 | Ready (verification) |
| [nerv:B-145](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-145) | The dashboard rewrites whole sections on every poll, so Web Inspector collapses… | Implemented | 🔶 P2 | 1 | 3 | 0 | Ready (verification) |
| [nerv:B-146](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-146) | Settings stacks into one column on a phone, and Enable notifications sits again… | Implemented | 🔶 P2 | 1 | 1.5 | 0 | Ready (verification) |
| [nerv:B-147](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-147) | The dashboard's flow and arrows miss short EVA actions | Open | 🔶 P2 | 3 | 4 | 0.25 | Waiting on nerv:F-130-T07 |
| [nerv:F-086](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-086) | Gmail: search and read, then draft and send behind approval | Open | 🔶 P2 | 1 | 0 | 0.5 | Owner: Procedure |
| [nerv:F-087](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-087) | 3D printing: slice a model with a material profile and send it to the printer | Open | 🔶 P2 | 1 | 0 | 0.5 | Owner: Procedure |
| [nerv:F-092](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-092) | Record desktop input and replay it | Open | 🔶 P2 | 1 | 0 | 0.25 | Owner: Procedure |
| [nerv:B-057](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-057) | Companion error messages are Italian only and do not say what went wrong | Open | 🔶 P2 | 1 | 0 | 0.25 | Owner: Procedure |
| [nerv:B-068](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-068) | Companion keeps Start NERV disabled after Stop NERV | Open | 🔶 P2 | 1 | 0 | 0.25 | Owner: Procedure |
| [nerv:B-107](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-107) | Pilot cards: model select leaves its card and name inputs are too narrow to read | Implemented | 🔶 P2 | 1 | 1 | unknown | Ready (verification) |
| [nerv:B-113](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-113) | Updating from the dashboard signs it out, then offers a stale Update now that f… | Implemented | 🔶 P2 | 1 | 0.5 | unknown | Ready (verification) |
| [nerv:B-122](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-122) | Update now is refused with "ownership is unknown" while NERV runs as a foregrou… | Implemented | 🔶 P2 | 1 | 0 | 0.25 | Owner: Procedure |
| [nerv:B-123](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-123) | After Update now the dashboard never shows the updater's result | Implemented | 🔶 P2 | 1 | 0 | 0.25 | Owner: Procedure |
| [nerv:B-128](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-128) | Settings → Pair a device on a 127.0.0.1 dashboard puts a loopback address in th… | Implemented | 🔶 P2 | 1 | 0 | 0.25 | Owner: Procedure |
| [nerv:B-129](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-129) | Health → Run doctor logs a canned "all ok" line and never asks the service | Implemented | 🔶 P2 | 1 | 1 | unknown | Ready (verification) |
| [nerv:B-134](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-134) | Every Web Push to Apple fails with 403 BadJwtToken, and the failure is invisible | Implemented | 🔶 P2 | 1 | 0 | 0 | Ready (verification) |
| [nerv:B-135](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-135) | Update now on a busy Mac is refused as an ownership problem when NERV's health … | Implemented | 🔶 P2 | 1 | 0 | 0 | Ready (verification) |
| [nerv:B-142](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-142) | Dashboard Health: the service sample and link rows are built outside the table … | Implemented | 🔶 P2 | 1 | 1 | unknown | Ready (verification) |
| [nerv:F-125](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-125) | Reconcile to the latest harness and enable built backlog views | Open | 🔹 P3 | 1 | 0.5 | 0 | Ready (verification) |
| [nerv:F-109](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-109) | Pilots as persona cards with editable names and one Apply | Open | 🔹 P3 | 3 | 3 | 0 | Ready (verification) |
| [nerv:F-129](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-129) | The sortie view shows model thinking time next to EVA activity | Open | 🔹 P3 | 3 | 4 | 0.25 | Ready |
| [nerv:F-110](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-110) | Owner settings in the dashboard for values that are fixed today | Open | 🔹 P3 | 3 | 5.5 | 0 | Ready (verification) |
| [nerv:F-124](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-124) | Fuse Midori's Telegram and the phone app into one conversation | Open | 🔹 P3 | 2 | 8 | 0 | Ready |
| [nerv:F-098](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-098) | FPV fleet diary: crashes, parts, spares and photos | Open | 🔹 P3 | 1 | 0 | 0.25 | Owner: Procedure |
| [nerv:F-101](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-101) | Share the FPV battery manager outside NERV | Open | 🔹 P3 | 4 | 6.5 | 0 | Blocked: owner step nerv:F-098-T04 |
| [nerv:F-131](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-131) | Quick commands: shortcut buttons that show other projects' cards through MCP | Open | 🔹 P3 | 4 | 7.5 | 0.5 | Ready |
| [nerv:F-113](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-113) | Compact tool index with details on request | Open | 🔹 P3 | 1 | 1 | 0 | Ready |
| [nerv:F-126](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-126) | Evaluate gemma4:26b as the local chat model instead of gemma4:12b | Open | 🔹 P3 | 3 | 2.75 | 0.25 | Ready |
| [nerv:F-099](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-099) | FPV build knowledge: components and wiring from cited sources | Open | 🔹 P3 | 1 | 0 | 0 | Ready (verification) |
| [nerv:B-133](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-133) | Windows CI: the F-121-T04 cache probe answered in 698 ms while its test allows … | Open | 🔹 P3 | 1 | 1 | 0 | Ready |
| [nerv:F-121](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-121) | Printed parts per drone: "print Smoke's feet" | Open | 🔹 P3 | 2 | 0 | 0.5 | Ready (verification) |
| [nerv:F-122](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-122) | Deliver Grover alerts | Open | 🔹 P3 | 2 | 3.5 | 0.5 | Blocked: owner step nerv:F-004-T10 |
| [nerv:B-072](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-072) | Windows CI: native TLS tests fail when openssl takes over 15 s | Open | 🔹 P3 | 1 | 0.25 | 0 | Ready (verification) |
| [nerv:B-076](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-076) | CI 2026-11-18: scattered one-off failures in unrelated tests on Windows and Lin… | Open | 🔹 P3 | 1 | 0.25 | 0 | Ready (verification) |
| [nerv:B-127](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-127) | F-118-T02 browser test times out when it runs together with many test files | Open | 🔹 P3 | 1 | 1 | 0 | Ready |
| [nerv:B-137](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-137) | Fleet chat reads a new drone's model and version as part categories | Implemented | 🔹 P3 | 0 | 0 | 0 | Ready (to close) |
| [nerv:B-094](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-094) | Remote action wording: a doubled full stop, "queued" for a finished job, "offli… | Open | 🔹 P3 | 1 | 1.5 | 0 | Ready (verification) |
| [nerv:F-060](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-060) | Spike: herdr-core as a coding-agent terminal runtime | Investigate | 🔹 P3 | 3 | 0.5 | 2 | Owner: Procedure |
| [nerv:F-116](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-116) | Split a model too big for one base across bases | Open | 🔹 P3 | 1 | 0 | 0.25 | Owner: Decision |
| [nerv:F-007](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-007) | Voice and evaluated skill improvement | Open | 🔹 P3 | 2 | 0.25 | 0.5 | Owner: Procedure |
| [nerv:F-123](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-123) | Connect NERV to Grover's hub over MCP | Open | 🔹 P3 | 1 | 0 | 0.5 | Owner: Procedure |
| [nerv:B-056](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-056) | A renewal the companion refuses on the Mac says it was not confirmed | Implemented | 🔹 P3 | 1 | 0 | 0.25 | Owner: Procedure |
| [nerv:B-096](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-096) | Sephirot flow: a sortie that stops at Misato's apartment has no route to Debrief | Implemented | 🔹 P3 | 1 | 0 | 0 | Ready (verification) |
| [nerv:B-110](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-110) | Dashboard offers Update now when already up to date, away from the update status | Implemented | 🔹 P3 | 1 | 0.25 | unknown | Ready (verification) |
| [nerv:B-112](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-112) | Sephirot flow lights routes the sortie did not take and hides the map when no s… | Implemented | 🔹 P3 | 1 | 0.25 | unknown | Ready (verification) |
| [nerv:B-130](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-130) | A finished sortie that never needed approval shows Misato's Apt faded as skippe… | Implemented | 🔹 P3 | 1 | 0.25 | unknown | Ready (verification) |
| [nerv:B-141](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-141) | Dashboard: the updater status is lost among the Health rows, and Settings is mi… | Implemented | 🔹 P3 | 1 | 1.5 | unknown | Ready (verification) |

<details><summary>𖣂 nerv: 156 open steps</summary>

| Step | Title | Status | Remaining | Who | Depends on | State |
|---|---|---|---|---|---|---|
| nerv:B-091-T01 | Name the failing journal write in a Windows stop and make the receipt complete | Implemented; verification pending | 3 h | 🤖 | — | Ready (verification) |
| nerv:F-005-T15 | T06h — Upgrades that raise the schema version | Implemented; verification pending | 0.5 h | 🤖 | — | Ready (verification) |
| nerv:F-005-T29 | T11d — Upgrades, prerequisites, update policy and platform lifecycle on the device matrix | Ready | 2.5 h | ⏳ 🤖 | B-091-T01 | Waiting on nerv:B-091-T01 |
| nerv:F-005-T36 | Record the evidence of F-005-T29 and close it | Planned | 0.25 h | ⏳ 🤖 | F-005-T29 | Waiting on nerv:F-005-T29 |
| nerv:F-005-T30 | T11e — Parent acceptance and closure reconciliation | Planned | 0.25 h | ⏳ 🤖 | F-005-T36 | Waiting on nerv:F-005-T36 |
| nerv:F-006-T29 | Rerun the P3 role cases with role-sized probes and update the report | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| nerv:F-006-T31 | Rerun the P3 Misato cases with the fixed probe budget and update the report | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| nerv:B-143-T01 | Anchor relative reminder times to the request time | Implemented; verification pending | 1.5 h | 🤖 | — | Ready (verification) |
| nerv:B-118-T01 | Make the Windows test step fit its limit with margin | Implemented; verification pending | 0.5 h | 🤖 | — | Ready (verification) |
| nerv:B-118-T02 | Worker-link test files always exit; find why they time out on Windows | Implemented; verification pending | 0.5 h | 🤖 | — | Ready (verification) |
| nerv:B-118-T03 | Other Runtime test files always exit; failing tests named in a stopped run | Implemented; verification pending | 2 h | ⏳ 🤖 | B-118-T02 | Waiting on nerv:B-118-T02 |
| nerv:B-118-T04 | Cut the Windows cost of the coordinator test files | Implemented; verification pending | 2 h | ⏳ 🤖 | B-118-T03 | Waiting on nerv:B-118-T03 |
| nerv:F-062-T07 | Owner runs the restore drill on NERV-01 from a real off-host copy | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:F-011-T02 | Live menu, service-button and login acceptance on the Mac | Planned | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:F-011-T05 | Record the evidence of F-011-T02 and close it | Planned | 0.25 h | ⏳ 🤖 | F-011-T02 | Blocked: owner step nerv:F-011-T02 |
| nerv:F-011-T03 | Live notification permission acceptance | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-011-T05 | Blocked: owner step nerv:F-011-T02 |
| nerv:F-011-T06 | Record the evidence of F-011-T03 and close it | Planned | 0.25 h | ⏳ 🤖 | F-011-T03 | Blocked: owner step nerv:F-011-T02 |
| nerv:F-004-T06 | Phone install and push acceptance | Ready | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:F-004-T10 | Owner check: push first, Telegram as fallback on the phone | Planned | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:F-004-T07 | Record the evidence of F-004-T06 and close it | Planned | 0.25 h | ⏳ 🤖 | F-004-T06 | Blocked: owner step nerv:F-004-T06 |
| nerv:F-012-T05 | Edge cases and real-host acceptance | Planned | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:F-012-T06 | Record the evidence of F-012-T05 and close it | Planned | 0.25 h | ⏳ 🤖 | F-012-T05 | Blocked: owner step nerv:F-012-T05 |
| nerv:F-016-T09 | Step 5b — Two-device relocation acceptance | Planned | 0 h agent + 1 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:F-016-T21 | Export the seed snapshot off serve's event loop | Planned | 1.5 h | 🤖 | — | Ready |
| nerv:F-016-T11 | Record the evidence of F-016-T09 and close it | Planned | 0.25 h | ⏳ 🤖 | F-016-T09 | Blocked: owner step nerv:F-016-T09 |
| nerv:F-082-T02 | Checklist card in the dashboard chat | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| nerv:F-082-T04 | Owner check: add by Telegram, tick on the dashboard | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-082-T02 | Waiting on nerv:F-082-T02 |
| nerv:F-083-T07 | Timers in a cooking session | Implemented; verification pending | 0.5 h | 🤖 | — | Ready (verification) |
| nerv:F-083-T10 | Recipe photos | Implemented; verification pending | 0.5 h | 🤖 | — | Ready (verification) |
| nerv:F-083-T08 | Hands-free cooking by voice | Planned | 0.5 h | ⏳ 🤖 | F-083-T07 | Waiting on nerv:F-083-T07 |
| nerv:F-083-T09 | Owner check: a recipe cooked hands-free | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-083-T07 | Waiting on nerv:F-083-T07 |
| nerv:F-120-T02 | First system-pack cases for recent features | Planned | 3 h | 🤖 | — | Ready |
| nerv:F-120-T03 | Adopt the Gauntlet domain packs when released | Implemented; verification pending | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:F-088-T03 | Report and conflicts | Implemented; verification pending | 0.5 h | 🤖 | — | Ready (verification) |
| nerv:F-088-T04 | Owner check on the storage base | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-088-T03 | Waiting on nerv:F-088-T03 |
| nerv:B-108-T01 | Update now runs from a detached helper outside the service | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| nerv:B-108-T02 | The restarted service reports the updater result in the inbox and on the dashboard | Implemented; verification pending | 0.25 h | ⏳ 🤖 | B-108-T01 | Waiting on nerv:B-108-T01 |
| nerv:F-102-T03 | Apply at the announced time and report | Implemented; verification pending | 0.75 h | 🤖 | — | Ready (verification) |
| nerv:F-102-T04 | Live check: one automatic update | Planned | 0.25 h | ⏳ 🤖 | F-102-T03, B-108-T01, B-108-T02 | Waiting on nerv:F-102-T03 |
| nerv:B-111-T01 | Record health samples in serve, where the server is given a Runtime | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| nerv:F-103-T02 | Per-link load between bases | Implemented; verification pending | 1.5 h | 🤖 | — | Ready (verification) |
| nerv:F-103-T04 | 24-hour baseline with both bases | Planned | 0.25 h | ⏳ 🤖 | B-111-T01 | Waiting on nerv:B-111-T01 |
| nerv:F-117-T03 | nerv update repairs a stale build or an unloaded service | Planned | 1 h | 🤖 | — | Ready |
| nerv:F-117-T04 | Docs and help for nerv update | Planned | 0.5 h | 🤖 | — | Ready |
| nerv:F-117-T05 | Owner runs nerv update on NERV-01 | Planned | 0.25 h owner | ⏳ 🧑‍🔧 | F-117-T03 | Waiting on nerv:F-117-T03 |
| nerv:F-130-T18 | Upgrade NERV's Angular 22.2.6 → 22.3+ and consume @voidbrain/bricks | Planned | 2 h | 🤖 | — | Ready |
| nerv:F-130-T02 | Health section in Angular | Planned | 3 h | ⏳ 🤖 | F-130-T18 | Waiting on nerv:F-130-T18 |
| nerv:F-130-T03 | Settings section in Angular: schedule, update policy, models reload, devices and pairing | Planned | 4 h | ⏳ 🤖 | F-130-T18 | Waiting on nerv:F-130-T18 |
| nerv:F-130-T04 | Push and the service worker move to the workspace | Planned | 4 h | ⏳ 🤖 | F-130-T18 | Waiting on nerv:F-130-T18 |
| nerv:F-130-T05 | At-a-glance strip and Misato's apartment (approvals, questions, memory) | Planned | 4 h | ⏳ 🤖 | F-130-T18 | Waiting on nerv:F-130-T18 |
| nerv:F-130-T06 | Sorties list, filter and Misato plan detail | Planned | 3 h | ⏳ 🤖 | F-130-T18 | Waiting on nerv:F-130-T18 |
| nerv:F-130-T07 | Sephirot sortie flow, MAGI and timeline | Planned | 4 h | ⏳ 🤖 | F-130-T06, F-130-T18 | Waiting on nerv:F-130-T06 |
| nerv:F-130-T08 | Comms chat, slash commands and the away debrief | Planned | 4 h | ⏳ 🤖 | F-130-T18 | Waiting on nerv:F-130-T18 |
| nerv:F-130-T09 | Coming up, models and budget tabs | Planned | 2.5 h | ⏳ 🤖 | F-130-T18 | Waiting on nerv:F-130-T18 |
| nerv:F-130-T10 | EVA cages, pilots, tools and skills | Planned | 3 h | ⏳ 🤖 | F-130-T18 | Waiting on nerv:F-130-T18 |
| nerv:F-130-T11 | Bases map, chronicle and Lilith | Planned | 4 h | ⏳ 🤖 | F-130-T18 | Waiting on nerv:F-130-T18 |
| nerv:F-130-T12 | Header chrome and demo mode | Planned | 3.5 h | ⏳ 🤖 | F-130-T18 | Waiting on nerv:F-130-T18 |
| nerv:F-130-T16 | Simple view: chat, essentials and a link to the full dashboard | Planned | 3 h | ⏳ 🤖 | F-130-T02, F-130-T04, F-130-T05, F-130-T08, F-130-T12, F-130-T18 | Waiting on nerv:F-130-T02 |
| nerv:F-130-T17 | Reminders and inbox as workspace components | Planned | 2 h | ⏳ 🤖 | F-130-T18 | Waiting on nerv:F-130-T18 |
| nerv:F-130-T13 | Retire the old dashboard | Planned | 4 h | ⏳ 🤖 | F-130-T02, F-130-T03, F-130-T04, F-130-T05, F-130-T06, F-130-T07, F-130-T08, F-130-T09, F-130-T10, F-130-T11, F-130-T12, F-130-T16, F-130-T17 | Waiting on nerv:F-130-T02 |
| nerv:F-130-T14 | Owner: check the full dashboard and the simple view on the Mac and the installed phone app | Planned | 0 h agent + 1.5 h owner | ⏳ 🧑‍🔧 | F-130-T13 | Waiting on nerv:F-130-T13 |
| nerv:F-118-T04 | Phone procedure: Tailscale serve, pairing and push, then the owner check | Planned | 0.5 h | 🤖 | — | Ready |
| nerv:F-089-T04 | Bind a live browser driver to the click adapter | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| nerv:F-089-T03 | Owner check on a real page | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-089-T04 | Waiting on nerv:F-089-T04 |
| nerv:F-090-T04 | Resume automatically when a session limit resets | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| nerv:F-090-T03 | Owner check on a real interrupted session | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-090-T04 | Waiting on nerv:F-090-T04 |
| nerv:F-093-T03 | Shared adapter for F-012 and F-092 | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| nerv:F-094-T03 | Report and recovery | Planned | 0.5 h | 🤖 | — | Ready |
| nerv:F-094-T04 | Owner check on the Mac | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-094-T03 | Waiting on nerv:F-094-T03 |
| nerv:F-106-T03 | Domain tool schemas offered by intent | Implemented; verification pending | 2 h | 🤖 | — | Ready (verification) |
| nerv:F-128-T01 | Measure a coding job's instruction load and refuse a route that cannot hold it | Planned | 2.5 h | 🤖 | — | Ready |
| nerv:F-128-T02 | Run long coding jobs as steps with a persisted handoff | Planned | 3 h | ⏳ 🤖 | F-128-T01 | Waiting on nerv:F-128-T01 |
| nerv:F-128-T03 | Run a split coding job on a scratch repository and record it | Planned | 1 h | ⏳ 🤖 | F-128-T02 | Waiting on nerv:F-128-T02 |
| nerv:B-099-T02 | EVA jobs can run as a dedicated job user; everything it runs ends with the job | Implemented; verification pending | 4 h | 🤖 | — | Ready (verification) |
| nerv:B-099-T03 | Owner setup on NERV-01: the &#95;nervjob user, the shared folder and the sudo rule | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | B-099-T02 | Waiting on nerv:B-099-T02 |
| nerv:B-099-T04 | Live check on NERV-01: the escapes the review found leave nothing running | Planned | 1.5 h | ⏳ 🤖 | B-099-T03 | Waiting on nerv:B-099-T03 |
| nerv:F-049-T08 | Pilot trust stage caps the class | Implemented; verification pending | 0.75 h | 🤖 | — | Ready (verification) |
| nerv:F-049-T09 | Dashboard shows instances per class | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| nerv:F-049-T10 | Linux host enforcement and join tests in CI | Implemented; verification pending | 0.75 h | 🤖 | — | Ready (verification) |
| nerv:F-049-T12 | Run the first EVA job on the Linux host | Planned | 1.5 h | ⏳ 🤖 | F-049-T10 | Waiting on nerv:F-049-T10 |
| nerv:F-049-T14 | Actions run in EVA instances; the in-process executor goes | Planned | 16 h | ⏳ 🤖 | B-099-T02, F-049-T10 | Waiting on nerv:B-099-T02 |
| nerv:F-008-T12 | Live check with real batteries | Planned | 0.25 h | 🤖 | — | Ready |
| nerv:F-008-T14 | Battery status list in Telegram | Implemented; verification pending | 0.5 h | 🤖 | — | Ready (verification) |
| nerv:B-066-T02 | Decouple worker-link frame verification from per-frame nervous IPC | Implemented; verification pending | 0.5 h | 🤖 | — | Ready (verification) |
| nerv:B-066-T03 | Find why worker-link tests still lose the connection under load | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| nerv:B-120-T01 | kaji promote removes its marker before it starts the service | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| nerv:B-144-T01 | Leave the EVA cages in place when a poll changes nothing | Implemented; verification pending | 1 h | 🤖 | — | Ready (verification) |
| nerv:B-136-T01 | Name why the planner's first chat reply is invalid and fix it | Implemented; verification pending | 1.5 h | 🤖 | — | Ready (verification) |
| nerv:B-140-T01 | Give the update check's network git commands their own budget, retry a failed fetch, name the command in a timeout | Implemented; verification pending | 1.5 h | 🤖 | — | Ready (verification) |
| nerv:B-145-T01 | Update only changed values in the sections that rewrote the most DOM | Implemented; verification pending | 3 h | 🤖 | — | Ready (verification) |
| nerv:B-146-T01 | Two-column Settings on a phone; Enable notifications spaced and only when possible | Implemented; verification pending | 1.5 h | 🤖 | — | Ready (verification) |
| nerv:B-147-T01 | Failing test: a 21 ms EVA action lights its flow arrow | Planned | 1 h | ⏳ 🤖 | F-130-T07 | Waiting on nerv:F-130-T07 |
| nerv:B-147-T02 | Replay the sortie's events in the flow with a minimum visible time per step | Planned | 3 h | ⏳ 🤖 | B-147-T01 | Waiting on nerv:B-147-T01 |
| nerv:B-147-T03 | Owner: see a short EVA action light the flow on the iPhone | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | B-147-T02 | Waiting on nerv:B-147-T02 |
| nerv:F-086-T04 | Owner check with the owner's account | Planned | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:F-087-T04 | Owner check on the real printer | Planned | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:F-092-T04 | Owner check on the Mac | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:B-057-T02 | Owner live check: rotated certificate message (part D step 1) | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:B-068-T02 | Owner check: Stop then Start from the companion | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:B-107-T01 | Pilot cards 2 per row with stacked name inputs and a contained Model select | Implemented; verification pending | 1 h | 🤖 | — | Ready (verification) |
| nerv:B-113-T01 | Dashboard sessions survive the restart an update makes; the button waits for the new revision | Implemented; verification pending | 0.5 h | 🤖 | — | Ready (verification) |
| nerv:B-122-T02 | Owner updates NERV-01 and sees the foreground reason | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:B-123-T02 | Owner: Update now shows the updater's status in Health | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:B-128-T02 | Owner: scan the Settings pairing QR from the Mac with the phone | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:B-129-T01 | Run doctor calls GET /api/doctor and shows the answer next to the button | Implemented; verification pending | 1 h | 🤖 | — | Ready (verification) |
| nerv:B-134-T01 | Default VAPID subject Apple accepts, push failures logged, Phone push line in Health | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| nerv:B-135-T01 | A slow or failing doctor probe is named as such, not as an ownership refusal | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| nerv:B-142-T01 | Render the Health service sample and link rows as table rows | Implemented; verification pending | 1 h | 🤖 | — | Ready (verification) |
| nerv:F-125-T02 | Enable built backlog views and log view incidents over about 10 merged PRs | Implemented; verification pending | 0.5 h | 🤖 | — | Ready (verification) |
| nerv:F-109-T02 | Store a pilot's call name and second name through a validated interface | Implemented; verification pending | 1 h | 🤖 | — | Ready (verification) |
| nerv:F-109-T03 | Persona card layout with one Apply for every change | Implemented; verification pending | 1.5 h | 🤖 | F-109-T02 | Ready (verification) |
| nerv:F-109-T04 | Silhouette image on the persona card | Planned | 0.5 h | ⏳ 🤖 | F-109-T03 | Waiting on nerv:F-109-T03 |
| nerv:F-129-T01 | List a sortie's model rounds with role, model and duration | Planned | 2 h | 🤖 | — | Ready |
| nerv:F-129-T02 | Show model thinking rows in the dashboard sortie view | Planned | 2 h | ⏳ 🤖 | F-129-T01 | Waiting on nerv:F-129-T01 |
| nerv:F-129-T03 | Owner: check model thinking rows on a live sortie | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-129-T02 | Waiting on nerv:F-129-T02 |
| nerv:F-110-T03 | Dashboard settings panel for the chosen settings | Implemented; verification pending | 2 h | 🤖 | — | Ready (verification) |
| nerv:F-110-T04 | Brief time, time zone, Sync Ratio threshold and Telegram freshness window through the same interface | Planned | 1.5 h | ⏳ 🤖 | F-110-T03 | Waiting on nerv:F-110-T03 |
| nerv:F-110-T05 | Common settings for every base, with a per-base override | Planned | 2 h | ⏳ 🤖 | F-110-T04 | Waiting on nerv:F-110-T04 |
| nerv:F-124-T02 | An approval answered in Telegram or the app clears the other | Planned | 2 h | 🤖 | — | Ready |
| nerv:F-124-T04 | Chat with Midori in the phone app | Planned | 6 h | ⏳ 🤖 | F-124-T02 | Waiting on nerv:F-124-T02 |
| nerv:F-098-T04 | Live check with a real crash | Planned | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:F-101-T04 | Create/wire the FPVBuddy core repository and move the core into it | Planned | 2 h | ⏳ 🤖 | F-098-T04 | Blocked: owner step nerv:F-098-T04 |
| nerv:F-101-T05 | NERV FPV pack uses the FPV core package | Planned | 1.5 h | ⏳ 🤖 | F-101-T04 | Blocked: owner step nerv:F-098-T04 |
| nerv:F-101-T07 | Retire NERV's FPV pack views and connect NERV to FPVBuddy's MCP server | Planned | 2 h | ⏳ 🤖 | F-101-T04, F-101-T05, fpvbuddy:F-009-T02 | Blocked: owner step nerv:F-098-T04 |
| nerv:F-101-T06 | NERV shows FPV data through FPVBuddy's MCP tools and surfaces | Planned | 1 h | ⏳ 🤖 | F-101-T07, fpvbuddy:F-009-T03, fpvbuddy:F-009-T04 | Blocked: owner step nerv:F-098-T04 |
| nerv:F-131-T01 | Quick-command list and run API over MCP | Planned | 3 h | 🤖 | — | Ready |
| nerv:F-131-T02 | Quick-command buttons in the simple view and the full dashboard | Planned | 3 h | ⏳ 🤖 | F-131-T01, F-130-T16 | Waiting on nerv:F-131-T01 |
| nerv:F-131-T03 | Default quick commands for FPVBuddy, Hobo and Grover | Planned | 1.5 h | ⏳ 🤖 | F-131-T02, F-101-T07, fpvbuddy:F-009-T03, hobo:F-011-T01, fpvbuddy:F-011-T03, fpvbuddy:F-011-T05 | Blocked: owner step nerv:F-098-T04 |
| nerv:F-131-T04 | Owner: use the quick commands on the Mac and the iPhone | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-131-T03 | Blocked: owner step nerv:F-098-T04 |
| nerv:F-113-T03 | Gauntlet comparison of prompt size and task success with the compact index | Planned | 1 h | 🤖 | — | Ready |
| nerv:F-126-T02 | Rerun the gemma4:12b quality evidence with gemma4:26b | Planned | 2 h | 🤖 | — | Ready |
| nerv:F-126-T03 | Owner decides whether to switch the chat model to gemma4:26b | Planned | 0 h agent + 0.25 h owner | ⏳ 🤔 | F-126-T02 | Waiting on nerv:F-126-T02 |
| nerv:F-126-T04 | Switch the configured chat model to gemma4:26b | Planned | 0.75 h | ⏳ 🤖 | F-126-T03 | Waiting on nerv:F-126-T03 |
| nerv:F-099-T04 | Read a diyfpv.com build through the browser adapter | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| nerv:B-133-T01 | Name why the cache probe answered in 698 ms on Windows CI and fix or bound it | Planned | 1 h | 🤖 | — | Ready |
| nerv:F-121-T04 | Send the part file with the print job | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| nerv:F-121-T03 | Owner: enter the parts and print one | Planned | 0 h agent + 0.5 h owner | ⏳ 🤖 | F-121-T04, B-133-T01 | Waiting on nerv:F-121-T04 |
| nerv:F-122-T02 | Deliver Grover alerts through NERV's channels | Planned | 3.5 h | ⏳ 🤖 | F-004-T10 | Blocked: owner step nerv:F-004-T10 |
| nerv:F-122-T03 | Owner check: a real Grover alert arrives | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-122-T02 | Blocked: owner step nerv:F-004-T10 |
| nerv:B-072-T01 | Native TLS key generation: timeout told apart from missing openssl, no flaky Windows CI | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| nerv:B-076-T01 | Name the cause of each scattered CI failure of 2026-11-18 | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| nerv:B-127-T01 | Name what the F-118-T02 browser test waits on under load and fix or bound it | Planned | 1 h | 🤖 | — | Ready |
| nerv:B-094-T03 | A remote result that arrived before Misato's reply is in that reply | Implemented; verification pending | 1.5 h | 🤖 | — | Ready (verification) |
| nerv:F-060-T01 | herdr-core trial in the development workspace | Planned | 0 h agent + 2 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:F-060-T03 | Record the evidence of F-060-T01 and close it | Planned | 0.25 h | ⏳ 🤖 | F-060-T01 | Blocked: owner step nerv:F-060-T01 |
| nerv:F-060-T02 | Answer the five questions and per-record outcomes | Planned | 0.25 h | ⏳ 🤖 | F-060-T03 | Blocked: owner step nerv:F-060-T01 |
| nerv:F-116-T02 | Owner decision: build model splitting or close | Planned | 0 h agent + 0.25 h owner | 🤔 | — | Owner: Decision |
| nerv:F-007-T05 | Step 2c — Voice corpus evaluation run and report | Planned | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:F-007-T10 | Record the evidence of F-007-T05 and close it | Planned | 0.25 h | ⏳ 🤖 | F-007-T05 | Blocked: owner step nerv:F-007-T05 |
| nerv:F-123-T02 | Owner check: NERV lists the Grover tools | Planned | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:B-056-T02 | Owner live check: refused and unconfirmed renewal in the companion | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| nerv:B-096-T01 | Draw the apartment → Debrief route for a sortie that ends at the owner's decision | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| nerv:B-110-T01 | One Update now, in Health beside the availability line, only when an update is available | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| nerv:B-112-T01 | Sephirot: routes light only when taken; answer route after planning; full map; loops when taken | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| nerv:B-130-T01 | An unused Misato's Apt keeps its normal look in a finished sortie's flow | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| nerv:B-141-T01 | Make the updater status stand out and split Settings into two columns | Implemented; verification pending | 1.5 h | 🤖 | — | Ready (verification) |

</details>

### 🤖 gauntlet-protocol

| Item | Title | Status | Priority | Open steps | Agent h | Owner h | State |
|---|---|---|---|---:|---:|---:|---|
| [gauntlet-protocol:B-003](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#b-003) | Coding grader blocks at a timeout while a leftover process keeps writing | Open | 🔶 P2 | 1 | 0.25 | 0 | Ready (verification) |
| [gauntlet-protocol:F-075](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#f-075) | Reconcile project-harness v10.20.0 → v10.21.3 | Open | 🔹 P3 | 1 | 1 | 0 | Ready |
| [gauntlet-protocol:F-022](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#f-022) | Packs or recorded skips for estimation, research, scheduling-time and backlog-m… | Open | 🔹 P3 | 3 | 1.5 | 0.25 | Ready |
| [gauntlet-protocol:F-021](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#f-021) | image-generation-v1: runner and grader after a design decision | Open | 🔹 P3 | 5 | 6 | 0.75 | Ready |

<details><summary>🤖 gauntlet-protocol: 10 open steps</summary>

| Step | Title | Status | Remaining | Who | Depends on | State |
|---|---|---|---|---|---|---|
| gauntlet-protocol:B-003-T01 | Timeout verdict without waiting for cleanup | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| gauntlet-protocol:F-075-T01 | Reconcile harness files v10.20.0 -&gt; v10.21.3 | Planned | 1 h | 🤖 | — | Ready |
| gauntlet-protocol:F-022-T01 | Propose packs or skips for the remaining areas | Planned | 1 h | 🤖 | — | Ready |
| gauntlet-protocol:F-022-T02 | Decide packs or skips for the remaining areas | Planned | 0 h agent + 0.25 h owner | ⏳ 🤔 | F-022-T01 | Waiting on gauntlet-protocol:F-022-T01 |
| gauntlet-protocol:F-022-T03 | Record the outcome | Planned | 0.5 h | ⏳ 🤖 | F-022-T02 | Waiting on gauntlet-protocol:F-022-T02 |
| gauntlet-protocol:F-021-T01 | Draft the image-generation design decision | Planned | 1 h | 🤖 | — | Ready |
| gauntlet-protocol:F-021-T02 | Decide the image-generation design | Planned | 0 h agent + 0.5 h owner | ⏳ 🤔 | F-021-T01 | Waiting on gauntlet-protocol:F-021-T01 |
| gauntlet-protocol:F-021-T03 | Image-generation runner | Planned | 3 h | ⏳ 🤖 | F-021-T02 | Waiting on gauntlet-protocol:F-021-T02 |
| gauntlet-protocol:F-021-T04 | Image grader and pack | Planned | 2 h | ⏳ 🤖 | F-021-T03 | Waiting on gauntlet-protocol:F-021-T03 |
| gauntlet-protocol:F-021-T05 | Release image-generation-v1 | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-021-T04 | Waiting on gauntlet-protocol:F-021-T04 |

</details>

### 🦺 project-harness

| Item | Title | Status | Priority | Open steps | Agent h | Owner h | State |
|---|---|---|---|---:|---:|---:|---|
| [project-harness:F-096](https://github.com/voidbrain/project-harness/blob/e118aa5370314617dd6ef9c9d0bb0c57e897578a/docs/BACKLOG.md#f-096) | Stop committing generated backlog views | Open | 🔶 P2 | 1 | 0.25 | 0 | Ready (verification) |

<details><summary>🦺 project-harness: 1 open step</summary>

| Step | Title | Status | Remaining | Who | Depends on | State |
|---|---|---|---|---|---|---|
| project-harness:F-096-T06 | Transition and release | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |

</details>

### 🚁 fpvbuddy

| Item | Title | Status | Priority | Open steps | Agent h | Owner h | State |
|---|---|---|---|---:|---:|---:|---|
| [fpvbuddy:F-005](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-005) | M1 — FPV battery core package | Open | 🔶 P2 | 3 | 3 | 0 | Ready |
| [fpvbuddy:F-006](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-006) | Reconcile project-harness v10.9.0 → v10.20.0 | Open | 🔹 P3 | 1 | 0 | 0 | Ready (verification) |
| [fpvbuddy:F-007](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-007) | Upgrade Angular 21 → 22 | Implemented | 🔹 P3 | 3 | 0.25 | 0.25 | Ready (verification) |
| [fpvbuddy:F-008](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-008) | Adopt 🧱 bricks | Open | 🔹 P3 | 7 | 12.5 | 0.5 | Waiting on fpvbuddy:F-007-T03 |
| [fpvbuddy:F-009](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-009) | Show FPVBuddy's batteries in NERV over MCP | Open | 🔹 P3 | 5 | 8 | 0.5 | Waiting on fpvbuddy:F-005-T02 |
| [fpvbuddy:F-010](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-010) | M2 core: fleet, spares and crashes | Open | 🔶 P2 | 5 | 9.5 | 0 | Waiting on fpvbuddy:F-005-T02 |
| [fpvbuddy:F-011](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-011) | MCP tools for fleet, spares and crashes | Open | 🔹 P3 | 7 | 12 | 0.5 | Waiting on fpvbuddy:F-009-T02 |
| [fpvbuddy:F-102](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-102) | Reconcile project-harness v10.20.0 → v10.21.3 | Open | 🔹 P3 | 1 | 1 | 0 | Ready |

<details><summary>🚁 fpvbuddy: 32 open steps</summary>

| Step | Title | Status | Remaining | Who | Depends on | State |
|---|---|---|---|---|---|---|
| fpvbuddy:F-005-T02 | Bring the battery core and its tests into the package | Planned | 1.5 h | 🤖 | — | Ready |
| fpvbuddy:F-005-T03 | Document the core's public API | Planned | 0.5 h | ⏳ 🤖 | F-005-T02 | Waiting on fpvbuddy:F-005-T02 |
| fpvbuddy:F-005-T04 | Install check without the FPVBuddy app | Planned | 1 h | ⏳ 🤖 | F-005-T02 | Waiting on fpvbuddy:F-005-T02 |
| fpvbuddy:F-006-T01 | Reconcile harness files v10.9.0 -&gt; v10.20.0 | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| fpvbuddy:F-007-T02 | Run ng update to 22 and apply its migrations | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| fpvbuddy:F-007-T03 | CI and offline build check on 22 | Implemented; verification pending | 0.25 h | 🤖 | F-007-T02 | Ready (verification) |
| fpvbuddy:F-007-T04 | Owner: open the upgraded app on the phone | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-007-T03 | Waiting on fpvbuddy:F-007-T03 |
| fpvbuddy:F-008-T01 | Check the bricks mapping against its first release | Planned | 1 h | ⏳ 🤖 | F-007-T03 | Waiting on fpvbuddy:F-007-T03 |
| fpvbuddy:F-008-T02 | Pin @voidbrain/bricks and adopt its tokens with an FPVBuddy theme | Planned | 2.5 h | ⏳ 🤖 | F-008-T01 | Waiting on fpvbuddy:F-008-T01 |
| fpvbuddy:F-008-T03 | Primitives: buttons, input, filter toggles and badges | Planned | 2 h | ⏳ 🤖 | F-008-T02 | Waiting on fpvbuddy:F-008-T02 |
| fpvbuddy:F-008-T04 | Shell: header, panels and bottom navigation | Planned | 2 h | ⏳ 🤖 | F-008-T03 | Waiting on fpvbuddy:F-008-T03 |
| fpvbuddy:F-008-T05 | Batteries page: status rows, filters and empty state | Planned | 2 h | ⏳ 🤖 | F-008-T04 | Waiting on fpvbuddy:F-008-T04 |
| fpvbuddy:F-008-T06 | Contribute missing generic pieces to bricks | Planned | 3 h | ⏳ 🤖 | F-008-T05 | Waiting on fpvbuddy:F-008-T05 |
| fpvbuddy:F-008-T08 | Owner: look at FPVBuddy on bricks on the phone | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-008-T06 | Waiting on fpvbuddy:F-008-T06 |
| fpvbuddy:F-009-T01 | Plan FPVBuddy's MCP server: where it runs, its data and tools | Planned | 1 h | ⏳ 🤖 | F-005-T02 | Waiting on fpvbuddy:F-005-T02 |
| fpvbuddy:F-009-T02 | MCP server with read-only battery tools | Planned | 3 h | ⏳ 🤖 | F-009-T01 | Waiting on fpvbuddy:F-009-T01 |
| fpvbuddy:F-009-T03 | Battery tools return surface-typed data for bricks surface cards | Planned | 2 h | ⏳ 🤖 | F-009-T02, F-008-T02 | Waiting on fpvbuddy:F-009-T02 |
| fpvbuddy:F-009-T04 | Full battery screen for NERV: MCP Apps page or link | Planned | 2 h | ⏳ 🤖 | F-009-T02, F-008-T05 | Waiting on fpvbuddy:F-009-T02 |
| fpvbuddy:F-009-T05 | Owner: see FPVBuddy's battery card and full screen in NERV | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-009-T03, F-009-T04 | Waiting on fpvbuddy:F-009-T03 |
| fpvbuddy:F-010-T01 | Fleet and parts in the core | Planned | 2.5 h | ⏳ 🤖 | F-005-T02 | Waiting on fpvbuddy:F-005-T02 |
| fpvbuddy:F-010-T02 | Spares and warehouse in the core | Planned | 2 h | ⏳ 🤖 | F-010-T01 | Waiting on fpvbuddy:F-010-T01 |
| fpvbuddy:F-010-T03 | Crashes and the crash-to-battery-damage link in the core | Planned | 2.5 h | ⏳ 🤖 | F-010-T02, F-005-T02 | Waiting on fpvbuddy:F-010-T02 |
| fpvbuddy:F-010-T04 | Fleet import in the core | Planned | 2 h | ⏳ 🤖 | F-010-T01, F-010-T02 | Waiting on fpvbuddy:F-010-T01 |
| fpvbuddy:F-010-T05 | Document the fleet, spares and crash API | Planned | 0.5 h | ⏳ 🤖 | F-010-T03, F-010-T04, F-005-T03 | Waiting on fpvbuddy:F-010-T03 |
| fpvbuddy:F-011-T01 | Read-only MCP tools: list drones and drone detail | Planned | 2 h | ⏳ 🤖 | F-009-T02, F-010-T01 | Waiting on fpvbuddy:F-009-T02 |
| fpvbuddy:F-011-T02 | Read-only MCP tools: spares by category and recent crashes | Planned | 1.5 h | ⏳ 🤖 | F-011-T01, F-010-T02, F-010-T03 | Waiting on fpvbuddy:F-011-T01 |
| fpvbuddy:F-011-T03 | Fleet tools return surface-typed data for bricks surface cards | Planned | 2 h | ⏳ 🤖 | F-011-T02, F-009-T03 | Waiting on fpvbuddy:F-011-T02 |
| fpvbuddy:F-011-T04 | Drones and warehouse screens in FPVBuddy, built with bricks | Planned | 3 h | ⏳ 🤖 | F-010-T03, F-008-T05 | Waiting on fpvbuddy:F-010-T03 |
| fpvbuddy:F-011-T05 | Full drones and warehouse screens for NERV: MCP Apps page or link | Planned | 1.5 h | ⏳ 🤖 | F-011-T04, F-009-T04 | Waiting on fpvbuddy:F-011-T04 |
| fpvbuddy:F-011-T06 | Write tool: log a crash, gated as an action needing approval | Planned | 2 h | ⏳ 🤖 | F-011-T02, F-010-T03 | Waiting on fpvbuddy:F-011-T02 |
| fpvbuddy:F-011-T07 | Owner: see drones, warehouse and a logged crash in NERV | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-011-T03, F-011-T05, F-011-T06 | Waiting on fpvbuddy:F-011-T03 |
| fpvbuddy:F-102-T01 | Reconcile harness files v10.20.0 -&gt; v10.21.3 | Planned | 1 h | 🤖 | — | Ready |

</details>

### 🪴 grover

| Item | Title | Status | Priority | Open steps | Agent h | Owner h | State |
|---|---|---|---|---:|---:|---:|---|
| [grover:B-008](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#b-008) | The feed end-to-end test fails now and then on CI: feed done, mixing tank not e… | Implemented | 🔺 P1 | 2 | 0 | 0 | Ready (verification) |
| [grover:F-005](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-005) | Deploy hub and agent on the Pi behind Tailscale | Open | 🔶 P2 | 3 | 0.5 | 1.5 | Owner: Procedure |
| [grover:F-003](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003) | Hardware bring-up on the Raspberry Pi | Open | 🔺 P1 | 5 | 2.5 | 4.5 | Owner: Decision |
| [grover:F-004](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-004) | Calibrate analog probes (volts to pH and EC) | Implemented | 🔺 P1 | 2 | 0.25 | 1 | Blocked: owner step grover:F-005-T01 |
| [grover:F-011](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-011) | Feed cycle per pot: supply tanks, mixing tank, pot pumps | Implemented | 🔺 P1 | 2 | 0.5 | 0.5 | Owner: Procedure |
| [grover:B-006](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#b-006) | An upgraded agent drops its cached config until the hub answers | Open | 🔶 P2 | 1 | 1 | 0 | Ready |
| [grover:B-010](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#b-010) | Held threshold alerts read as if the value were still past the threshold, and t… | Implemented | 🔶 P2 | 1 | 0.25 | 0 | Ready (verification) |
| [grover:F-008](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-008) | Alerts for NERV: out-of-range values, offline agent, faults | Open | 🔶 P2 | 1 | 0 | 0.25 | Blocked: owner step grover:F-005-T01 |
| [grover:F-012](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-012) | Plants and strains: origin, generation, breeder, ancestry | Implemented | 🔶 P2 | 2 | 0.25 | 0.5 | Blocked: owner step grover:F-005-T01 |
| [grover:F-006](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-006) | Set-up screens in the client | Implemented | 🔶 P2 | 2 | 0.5 | 0.5 | Owner: Procedure |
| [grover:F-007](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-007) | Lights follow the grow calendar; Switch to bloom | Implemented | 🔶 P2 | 2 | 0.25 | 0.25 | Owner: Procedure |
| [grover:F-013](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-013) | Plant cycle: nursery, cuttings, harvest, a plant per pot, phase per plant | Implemented | 🔶 P2 | 2 | 0.5 | 0.5 | Owner: Procedure |
| [grover:F-014](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-014) | Plant page with statistics, as in the old app | Implemented | 🔶 P2 | 2 | 0.5 | 0.25 | Owner: Procedure |
| [grover:F-015](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-015) | Rig map: the tent as a live diagram, with its controls | Implemented | 🔶 P2 | 2 | 0.5 | 0.5 | Owner: Procedure |
| [grover:F-016](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-016) | Schedules by day of week, weekends apart | Implemented | 🔶 P2 | 2 | 0.5 | 0.25 | Owner: Procedure |
| [grover:F-018](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-018) | Pumps through an L298N driver (two pins on the MCP23017) | Implemented | 🔶 P2 | 3 | 0.25 | 1.5 | Owner: Procedure |
| [grover:F-019](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-019) | Install Grover as a web app on the phone | Implemented | 🔹 P3 | 3 | 0 | 0.25 | Ready (verification) |
| [grover:F-099](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-099) | Reconcile project-harness v10.20.0 → v10.21.3 | Open | 🔹 P3 | 1 | 1 | 0 | Ready |
| [grover:F-010](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-010) | Hub data retention and backups | Open | 🔹 P3 | 2 | 2.5 | 0 | Ready |
| [grover:F-009](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-009) | Browser tests and accessibility checks for the client | Open | 🔹 P3 | 3 | 5 | 0 | Ready |
| [grover:F-020](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-020) | Adopt 🧱 bricks in the client | Open | 🔹 P3 | 6 | 14 | 0.5 | Waiting on bricks:F-003-T01 |
| [grover:B-009](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#b-009) | Eight Dependabot PRs from 2021 to 2023 still open against the removed v1 tree | Open | 🔹 P3 | 2 | 0.25 | 0.25 | Owner: Decision |
| [grover:F-017](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-017) | Nutrient colours: each supply tank in its nutrient's real colour | Implemented | 🔹 P3 | 2 | 0.5 | 0.25 | Owner: Procedure |

<details><summary>🪴 grover: 53 open steps</summary>

| Step | Title | Status | Remaining | Who | Depends on | State |
|---|---|---|---|---|---|---|
| grover:B-008-T01 | Find why the feed e2e test fails now and then | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| grover:B-008-T02 | Failing test if the feed logic is wrong, then the fix | Implemented; verification pending | 0 h | ⏳ 🤖 | B-008-T01 | Waiting on grover:B-008-T01 |
| grover:F-005-T01 | Owner installs hub and agent on the Pi behind Tailscale | Ready | 0 h agent + 1.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| grover:F-005-T02 | Owner checks NERV lists the Grover tools (waits on nerv:F-123-T02) | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-005-T01 | Blocked: owner step grover:F-005-T01 |
| grover:F-005-T03 | Fix the README and service files from the first install | Planned | 0.5 h | ⏳ 🤖 | F-005-T01 | Blocked: owner step grover:F-005-T01 |
| grover:F-003-T01 | Owner chooses the water-level sensor | Ready | 0 h agent + 0.5 h owner | 🤔 | — | Owner: Decision |
| grover:F-003-T02 | Owner runs bring-up steps 1–4 on the Pi (buses, bindings, reads, switches) | Planned | 0 h agent + 2 h owner | ⏳ 🧑‍🔧 | F-005-T01 | Blocked: owner step grover:F-005-T01 |
| grover:F-003-T03 | Driver for the chosen level sensor | Planned | 2 h | ⏳ 🤖 | F-003-T01 | Blocked: owner step grover:F-003-T01 |
| grover:F-003-T04 | Owner runs bring-up steps 5–6 on the Pi (pump calibration, levels, a first feed, safety) | Planned | 0 h agent + 2 h owner | ⏳ 🧑‍🔧 | F-003-T02, F-003-T03 | Blocked: owner step grover:F-005-T01 |
| grover:F-003-T05 | Record the bring-up results; open B- records for driver faults | Planned | 0.5 h | ⏳ 🤖 | F-003-T04 | Blocked: owner step grover:F-005-T01 |
| grover:F-004-T02 | Owner calibrates the real pH and EC probes on the Pi | Planned | 0 h agent + 1 h owner | ⏳ 🧑‍🔧 | F-003-T02 | Blocked: owner step grover:F-005-T01 |
| grover:F-004-T03 | Record the calibration result; fix what it found | Planned | 0.25 h | ⏳ 🤖 | F-004-T02 | Blocked: owner step grover:F-005-T01 |
| grover:F-011-T02 | Owner tries a feed on the simulated rig on the dev stack | Ready | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| grover:F-011-T03 | Record the try of a feed; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-011-T02 | Blocked: owner step grover:F-011-T02 |
| grover:B-006-T01 | Failing agent test, then run a cached config of the previous protocol | Ready | 1 h | 🤖 | — | Ready |
| grover:B-010-T01 | Failing test, then held-alert wording and threshold tolerance | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| grover:F-008-T03 | Owner sees a Grover alert delivered by NERV (waits on nerv:F-122-T02) | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-005-T01 | Blocked: owner step grover:F-005-T01 |
| grover:F-012-T02 | Owner imports the old records on the Pi and enters the generation-2 plant | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-005-T01 | Blocked: owner step grover:F-005-T01 |
| grover:F-012-T03 | Record the try of the import; fix what it found | Planned | 0.25 h | ⏳ 🤖 | F-012-T02 | Blocked: owner step grover:F-005-T01 |
| grover:F-006-T02 | Owner tries the Setup pages on the dev stack | Ready | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| grover:F-006-T03 | Record the try of the Setup pages; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-006-T02 | Blocked: owner step grover:F-006-T02 |
| grover:F-007-T02 | Owner tries Switch to bloom and the light line on the dev stack | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| grover:F-007-T03 | Record the try of Switch to bloom; fix what it found | Planned | 0.25 h | ⏳ 🤖 | F-007-T02 | Blocked: owner step grover:F-007-T02 |
| grover:F-013-T02 | Owner tries the plant cycle on the dev stack | Ready | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| grover:F-013-T03 | Record the try of the plant cycle; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-013-T02 | Blocked: owner step grover:F-013-T02 |
| grover:F-014-T02 | Owner tries the plant page on the dev stack | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| grover:F-014-T03 | Record the try of the plant page; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-014-T02 | Blocked: owner step grover:F-014-T02 |
| grover:F-015-T02 | Owner tries the rig map on a phone and a laptop, light and dark on the dev stack | Ready | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| grover:F-015-T03 | Record the try of the rig map; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-015-T02 | Blocked: owner step grover:F-015-T02 |
| grover:F-016-T02 | Owner tries weekday schedules on the dev stack | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| grover:F-016-T03 | Record the try of weekday schedules; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-016-T02 | Blocked: owner step grover:F-016-T02 |
| grover:F-018-T01 | Owner writes down the pump wiring (L298N inputs on MCP23017 pins) | Ready | 0 h agent + 0.5 h owner | 🧑‍🔧 | — | Owner: Procedure |
| grover:F-018-T03 | Owner runs each pump forward and stops it on the Pi | Planned | 0 h agent + 1 h owner | ⏳ 🧑‍🔧 | F-018-T01, F-005-T01 | Blocked: owner step grover:F-018-T01 |
| grover:F-018-T04 | Record the pump device check; fix what it found | Planned | 0.25 h | ⏳ 🤖 | F-018-T03 | Blocked: owner step grover:F-018-T01 |
| grover:F-019-T01 | Web app manifest and icons | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| grover:F-019-T02 | Service worker for the app shell | Implemented; verification pending | 0 h | 🤖 | F-019-T01 | Ready (verification) |
| grover:F-019-T03 | Owner installs the app on the phone | Ready | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-019-T02, F-005-T01 | Blocked: owner step grover:F-005-T01 |
| grover:F-099-T01 | Reconcile harness files v10.20.0 -&gt; v10.21.3 | Planned | 1 h | 🤖 | — | Ready |
| grover:F-010-T01 | Downsample old readings | Ready | 1.5 h | 🤖 | — | Ready |
| grover:F-010-T02 | Backup command for the hub database | Ready | 1 h | 🤖 | — | Ready |
| grover:F-009-T01 | Playwright against the dev stack: the dashboard renders the demo tent | Ready | 2 h | 🤖 | — | Ready |
| grover:F-009-T02 | Browser scenarios: run a pump, switch the mode, axe scan | Planned | 2 h | ⏳ 🤖 | F-009-T01 | Waiting on grover:F-009-T01 |
| grover:F-009-T03 | Run the browser suite in CI | Planned | 1 h | ⏳ 🤖 | F-009-T02 | Waiting on grover:F-009-T02 |
| grover:F-020-T03 | Primitives: buttons, inputs, selects, switch and badges | Planned | 3 h | ⏳ 🤖 | bricks:F-003-T01 | Waiting on bricks:F-003-T01 |
| grover:F-020-T04 | Setup pages: form field, data table, card and confirm dialog | Planned | 3 h | ⏳ 🤖 | F-020-T03, bricks:F-003-T02, bricks:F-003-T04, bricks:F-003-T06 | Waiting on grover:F-020-T03 |
| grover:F-020-T05 | Dashboard and room card: card, status rows, empty state, dialog | Planned | 3 h | ⏳ 🤖 | F-020-T04, bricks:F-003-T04, bricks:F-003-T05 | Waiting on grover:F-020-T04 |
| grover:F-020-T06 | Plant page, probe page and rig map on bricks | Planned | 2 h | ⏳ 🤖 | F-020-T05 | Waiting on grover:F-020-T05 |
| grover:F-020-T07 | Contribute segmented control and stat tile to bricks, then use them | Planned | 3 h | ⏳ 🤖 | F-020-T06 | Waiting on grover:F-020-T06 |
| grover:F-020-T08 | Owner: look at the client on bricks, phone and desktop | Planned | 0 h agent + 0.5 h owner | ⏳ 🧑‍🔧 | F-020-T07 | Waiting on grover:F-020-T07 |
| grover:B-009-T01 | Owner decides on closing the eight v1 Dependabot PRs | Ready | 0 h agent + 0.25 h owner | 🤔 | — | Owner: Decision |
| grover:B-009-T02 | Close the v1 Dependabot PRs and delete their branches | Planned | 0.25 h | ⏳ 🤖 | B-009-T01 | Blocked: owner step grover:B-009-T01 |
| grover:F-017-T03 | Owner picks the nutrient colours | Ready | 0 h agent + 0.25 h owner | 🧑‍🔧 | — | Owner: Procedure |
| grover:F-017-T04 | Record the colour choice; fix what it found | Planned | 0.5 h | ⏳ 🤖 | F-017-T03 | Blocked: owner step grover:F-017-T03 |

</details>

### 🏚️ openbando

| Item | Title | Status | Priority | Open steps | Agent h | Owner h | State |
|---|---|---|---|---:|---:|---:|---|
| [openbando:B-009](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-009) | Simulator and selected-flight/video regression | Implemented | 🔶 P2 | 0 | — | — | Owner: Procedure |
| [openbando:B-017](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-017) | Villetta replay misalignment with video | Implemented | 🔶 P2 | 0 | — | — | Owner: Procedure |
| [openbando:B-018](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-018) | Hidden-origin GPS projection distorts flight paths | Implemented | 🔺 P1 | 0 | — | — | Owner: Procedure |
| [openbando:B-028](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-028) | New bando: grey map after a hidden bando, full addresses not found, Generate be… | Implemented | 🔶 P2 | 0 | — | — | Owner: Procedure |
| [openbando:B-045](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-045) | After a timeline click the video can stay stuck on an old frame | Investigate | 🔶 P2 | 0 | — | — | Ready |
| [openbando:B-050](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-050) | Investigate delayed AI replies against a changed editor draft | Investigate | 🔶 P2 | 0 | — | — | Ready |
| [openbando:B-051](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-051) | Investigate an Auto-sync result after changing its video/log pair | Investigate | 🔶 P2 | 0 | — | — | Ready |
| [openbando:F-001](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-001) | Cut/Wing for diagonal basement outlines | Implemented | 🔶 P2 | 0 | — | — | Owner: Procedure |
| [openbando:F-009](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-009) | Racing on real devices | Implemented | 🔶 P2 | 0 | — | — | Owner: Procedure |
| [openbando:F-021](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-021) | Move the take-off pad in the editor | Open | 🔹 P3 | 0 | — | — | Ready |
| [openbando:F-024](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-024) | Take-off pad indoors, on an upper floor or on a flat roof | Open | 🔹 P3 | 0 | — | — | Ready |
| [openbando:F-025](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-025) | Rework the Fly checklist | Open | 🔹 P3 | 0 | — | — | Owner: Decision |
| [openbando:F-026](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-026) | Rework the panels' "?" tips: what they cover, checked automatically | Open | 🔹 P3 | 0 | — | — | Owner: Decision |
| [openbando:F-031](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-031) | Clips and films say when their sources changed since recording | Implemented | 🔹 P3 | 0 | — | — | Owner: Procedure |
| [openbando:F-033](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-033) | Full impact map: chains, content, couplings, outside the repository, as a reada… | Implemented | 🔶 P2 | 0 | — | — | Owner: Procedure |
| [openbando:F-039](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-039) | Coverage of the browser tests in the coverage table | Blocked | ◻️ P3 | 0 | — | — | Blocked: record marked Blocked: openbando:F-039 |
| [openbando:F-040](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-040) | Adjust the replay drone's position in 3D, height included | Open | 🔶 P2 | 0 | — | — | Ready |
| [openbando:F-041](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-041) | Align a replay to the model automatically, with a confidence level | Open | 🔹 P3 | 0 | — | — | Ready |
| [openbando:F-042](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-042) | Right-click in the editor's 3D view: the same context menu as on the plan | Open | 🔹 P3 | 0 | — | — | Ready |
| [openbando:F-043](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-043) | Line tools also draw by click A, live preview, click B (keeping the drag) | Open | 🔹 P3 | 0 | — | — | Ready |
| [openbando:F-053](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-053) | Rebuild a bando as a point cloud from a flight's video, placed by its blackbox … | Open | 🔹 P3 | 0 | — | — | Owner: Decision |

### 🗺️ hobo

| Item | Title | Status | Priority | Open steps | Agent h | Owner h | State |
|---|---|---|---|---:|---:|---:|---|
| [hobo:F-007](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-007) | Map provider adapter: Leaflet and OpenRouteService | Open | 🔶 P2 | 4 | 7 | 0.25 | Waiting on hobo:F-002-T01 |
| [hobo:F-002](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-002) | Places: collect and organise | Open | 🔶 P2 | 5 | 6.5 | 0 | Ready (verification) |
| [hobo:F-003](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-003) | Trips: dates, start and end, stops | Open | 🔶 P2 | 3 | 5 | 0 | Waiting on hobo:F-002-T01 |
| [hobo:F-004](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-004) | Routing totals per leg, per day and per trip | Open | 🔶 P2 | 3 | 4.25 | 0 | Ready (verification) |
| [hobo:F-001](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-001) | Angular scaffold and project harness | Implemented | 🔶 P2 | 1 | 0 | 0 | Ready (verification) |
| [hobo:F-008](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-008) | Share and export | Open | 🔹 P3 | 4 | 6.5 | 0.5 | Owner: Decision |
| [hobo:F-009](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-009) | Multi-user editing (deferred) | Open | 🔹 P3 | 1 | 0 | 0.25 | Blocked: owner step hobo:F-008-T03 |
| [hobo:F-012](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-012) | Shared maps/geo package with openbando (candidate) | Open | 🔹 P3 | 1 | 1 | 0 | Waiting on hobo:F-007-T02 |
| [hobo:F-005](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-005) | What-if: compare another order or set of stops | Open | 🔹 P3 | 2 | 4 | 0 | Waiting on hobo:F-004-T02 |
| [hobo:F-006](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-006) | Variants: tabs per trip for A/B testing | Open | 🔹 P3 | 2 | 3.5 | 0 | Waiting on hobo:F-003-T01 |
| [hobo:F-010](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-010) | Shared UI built to move to 🧱 bricks | Open | 🔹 P3 | 2 | 3.5 | 0 | Ready |
| [hobo:F-011](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-011) | NERV integration: MCP server for places, trips and totals | Open | 🔹 P3 | 2 | 2.5 | 0.25 | Waiting on hobo:F-002-T01 |
| [hobo:F-013](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-013) | Self-hosted routing and geocoding (later) | Open | 🔹 P3 | 3 | 4 | 1 | Waiting on hobo:F-007-T01 |
| [hobo:F-014](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-014) | Google Maps place data (optional, later) | Open | 🔹 P3 | 2 | 2 | 0.25 | Owner: Decision |

<details><summary>🗺️ hobo: 35 open steps</summary>

| Step | Title | Status | Remaining | Who | Depends on | State |
|---|---|---|---|---|---|---|
| hobo:F-007-T01 | Adapter interface, local config and leg cache | Planned | 2 h | ⏳ 🤖 | F-002-T01 | Waiting on hobo:F-002-T01 |
| hobo:F-007-T02 | Leaflet map component | Planned | 2 h | ⏳ 🤖 | F-007-T01 | Waiting on hobo:F-007-T01 |
| hobo:F-007-T03 | OpenRouteService provider | Planned | 3 h | ⏳ 🤖 | F-007-T01 | Waiting on hobo:F-007-T01 |
| hobo:F-007-T04 | Owner adds an OpenRouteService key and checks a live route | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-007-T03 | Waiting on hobo:F-007-T03 |
| hobo:F-002-T01 | Local store service and place model | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| hobo:F-002-T03 | Place images | Implemented; verification pending | 0 h | ⏳ 🤖 | F-002-T01 | Waiting on hobo:F-002-T01 |
| hobo:F-002-T02 | Place list and form | Planned | 2.5 h | ⏳ 🤖 | F-002-T01 | Waiting on hobo:F-002-T01 |
| hobo:F-002-T04 | Place location | Planned | 2 h | ⏳ 🤖 | F-002-T02, F-007-T02, F-007-T03 | Waiting on hobo:F-002-T02 |
| hobo:F-002-T05 | Categories and tags | Planned | 2 h | ⏳ 🤖 | F-002-T02 | Waiting on hobo:F-002-T02 |
| hobo:F-003-T01 | Trip model and API | Implemented; verification pending | 0 h | ⏳ 🤖 | F-002-T01 | Waiting on hobo:F-002-T01 |
| hobo:F-003-T02 | Trip editor | Planned | 3 h | ⏳ 🤖 | F-003-T01, F-002-T02 | Waiting on hobo:F-003-T01 |
| hobo:F-003-T03 | Reorder stops and move them between days | Planned | 2 h | ⏳ 🤖 | F-003-T02 | Waiting on hobo:F-003-T02 |
| hobo:F-004-T01 | Pure totals | Implemented; verification pending | 0.25 h | 🤖 | — | Ready (verification) |
| hobo:F-004-T02 | Legs through the adapter | Planned | 2 h | ⏳ 🤖 | F-004-T01, F-003-T02, F-007-T03 | Waiting on hobo:F-004-T01 |
| hobo:F-004-T03 | Day filter, summary and route on the map | Planned | 2 h | ⏳ 🤖 | F-004-T02, F-007-T02 | Waiting on hobo:F-004-T02 |
| hobo:F-001-T01 | Scaffold the app and apply harness v10.21.3 | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| hobo:F-008-T03 | Owner decides how a read-only link is served | Ready | 0 h agent + 0.5 h owner | 🤔 | — | Owner: Decision |
| hobo:F-008-T01 | GPX and KML export | Planned | 2 h | ⏳ 🤖 | F-004-T02 | Waiting on hobo:F-004-T02 |
| hobo:F-008-T02 | PDF itinerary | Planned | 2 h | ⏳ 🤖 | F-004-T03 | Waiting on hobo:F-004-T03 |
| hobo:F-008-T04 | Read-only share link | Planned | 2.5 h | ⏳ 🤖 | F-008-T03, F-003-T01, F-004-T03 | Blocked: owner step hobo:F-008-T03 |
| hobo:F-009-T01 | Owner decides whether and when to plan multi-user editing | Planned | 0 h agent + 0.25 h owner | ⏳ 🤔 | F-008-T04 | Blocked: owner step hobo:F-008-T03 |
| hobo:F-012-T01 | Compare and propose | Planned | 1 h | ⏳ 🤖 | F-007-T02 | Waiting on hobo:F-007-T02 |
| hobo:F-005-T01 | Pure what-if evaluation | Planned | 1.5 h | ⏳ 🤖 | F-004-T02 | Waiting on hobo:F-004-T02 |
| hobo:F-005-T02 | What-if panel | Planned | 2.5 h | ⏳ 🤖 | F-005-T01 | Waiting on hobo:F-005-T01 |
| hobo:F-006-T01 | Variant model | Planned | 1.5 h | ⏳ 🤖 | F-003-T01 | Waiting on hobo:F-003-T01 |
| hobo:F-006-T02 | Variant tabs and comparison | Planned | 2 h | ⏳ 🤖 | F-006-T01, F-004-T03 | Waiting on hobo:F-006-T01 |
| hobo:F-010-T01 | Bricks-ready contract and check | Ready | 1.5 h | 🤖 | — | Ready |
| hobo:F-010-T02 | Move shared components to bricks | Planned | 2 h | ⏳ 🤖 | F-010-T01 | Waiting on hobo:F-010-T01 |
| hobo:F-011-T01 | MCP endpoint in the local service | Planned | 2.5 h | ⏳ 🤖 | F-002-T01, F-003-T01, F-004-T01, F-004-T02 | Waiting on hobo:F-002-T01 |
| hobo:F-011-T02 | Owner connects Hobo to NERV and checks it from chat | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-011-T01 | Waiting on hobo:F-011-T01 |
| hobo:F-013-T01 | OSRM provider | Planned | 2 h | ⏳ 🤖 | F-007-T01 | Waiting on hobo:F-007-T01 |
| hobo:F-013-T02 | Nominatim or Photon geocoding provider | Planned | 2 h | ⏳ 🤖 | F-007-T01 | Waiting on hobo:F-007-T01 |
| hobo:F-013-T03 | Owner runs OSRM and Photon on the base | Planned | 0 h agent + 1 h owner | ⏳ 🧑‍🔧 | F-013-T01, F-013-T02 | Waiting on hobo:F-013-T01 |
| hobo:F-014-T01 | Owner decides whether to add Google place data | Ready | 0 h agent + 0.25 h owner | 🤔 | — | Owner: Decision |
| hobo:F-014-T02 | Google place-details provider | Planned | 2 h | ⏳ 🤖 | F-014-T01 | Blocked: owner step hobo:F-014-T01 |

</details>

### 🧱 bricks

| Item | Title | Status | Priority | Open steps | Agent h | Owner h | State |
|---|---|---|---|---:|---:|---:|---|
| [bricks:F-005](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-005) | Semantic versioning and a changelog | Open | 🔶 P2 | 2 | 1 | 0 | Ready (verification) |
| [bricks:F-004](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-004) | Publish the package on npm with trusted publishing | Open | 🔶 P2 | 4 | 2 | 0.25 | Ready (verification) |
| [bricks:F-001](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-001) | Workspace, harness and repository setup | Implemented | 🔶 P2 | 1 | 0 | 0 | Ready (verification) |
| [bricks:F-002](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-002) | First content: tokens, themes and NERV's genUI surfaces | Implemented | 🔶 P2 | 3 | 0 | 0 | Ready (verification) |
| [bricks:F-006](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-006) | NERV adoption: what bricks ships for NERV | Open | 🔶 P2 | 3 | 9 | 0 | Ready |
| [bricks:F-008](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-008) | Grover adoption: what bricks ships for Grover | Open | 🔹 P3 | 2 | 4 | 0 | Ready |
| [bricks:F-009](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-009) | FPVBuddy adoption: what bricks ships for FPVBuddy | Open | 🔹 P3 | 2 | 4 | 0 | Ready |
| [bricks:F-007](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-007) | Hobo adoption: what bricks ships for Hobo | Open | 🔹 P3 | 3 | 5 | 0.25 | Ready |
| [bricks:F-003](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-003) | Components, patterns and the live-view helper, on demand | Open | 🔹 P3 | 7 | 21 | 0 | Ready (verification) |

<details><summary>🧱 bricks: 27 open steps</summary>

| Step | Title | Status | Remaining | Who | Depends on | State |
|---|---|---|---|---|---|---|
| bricks:F-005-T01 | CHANGELOG.md and the version-to-changelog check | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| bricks:F-005-T02 | Release procedure: version, changelog, tag | Planned | 1 h | ⏳ 🤖 | F-005-T01 | Waiting on bricks:F-005-T01 |
| bricks:F-004-T01 | Registry decision: public npm with trusted publishing | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| bricks:F-004-T04 | Release workflow with npm trusted publishing | Implemented; verification pending | 0 h | 🤖 | F-005-T01 | Ready (verification) |
| bricks:F-004-T05 | Owner enables trusted publishing for voidbrain/bricks | Planned | 0 h agent + 0.25 h owner | ⏳ 🧑‍🔧 | F-004-T04 | Waiting on bricks:F-004-T04 |
| bricks:F-004-T06 | First publish of 0.1.0 and an install check | Planned | 2 h | ⏳ 🤖 | F-004-T05, F-005-T02 | Waiting on bricks:F-004-T05 |
| bricks:F-001-T01 | Scaffold the workspace and apply harness v10.21.3 | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| bricks:F-002-T01 | Tokens, foundations and the base, plain and eva themes | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| bricks:F-002-T02 | Port the four genUI surface cards with their schemas and validation | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| bricks:F-002-T03 | Catalogue in all three themes with axe in CI | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| bricks:F-006-T01 | Inventory NERV's UI against bricks | Planned | 2 h | 🤖 | — | Ready |
| bricks:F-006-T02 | Eva light mode and the five accents as theme variants | Planned | 5 h | ⏳ 🤖 | F-006-T01 | Waiting on bricks:F-006-T01 |
| bricks:F-006-T03 | Migration note for NERV and the release that carries it | Planned | 2 h | ⏳ 🤖 | F-006-T01, F-004-T06 | Waiting on bricks:F-006-T01 |
| bricks:F-008-T01 | Inventory Grover's UI against bricks | Planned | 2 h | 🤖 | — | Ready |
| bricks:F-008-T02 | Migration note for Grover and the release that carries it | Planned | 2 h | ⏳ 🤖 | F-008-T01, F-004-T06 | Waiting on bricks:F-008-T01 |
| bricks:F-009-T01 | Inventory FPVBuddy's UI against bricks | Planned | 2 h | 🤖 | — | Ready |
| bricks:F-009-T02 | Migration note for FPVBuddy (after its Angular 22 upgrade) and the release that carries it | Planned | 2 h | ⏳ 🤖 | F-009-T01, F-004-T06 | Waiting on bricks:F-009-T01 |
| bricks:F-007-T01 | Inventory Hobo's UI and map its tokens | Planned | 2 h | 🤖 | — | Ready |
| bricks:F-007-T02 | Owner picks Hobo's look: base or a Hobo theme | Planned | 0 h agent + 0.25 h owner | ⏳ 🤔 | F-007-T01 | Waiting on bricks:F-007-T01 |
| bricks:F-007-T03 | Migration note for Hobo and the release that carries it | Planned | 3 h | ⏳ 🤖 | F-007-T02, F-004-T06 | Waiting on bricks:F-007-T02 |
| bricks:F-003-T01 | Primitives: button, input, select, toggle, tag | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| bricks:F-003-T03 | Live-view helper: render once, update changed values, keyed rows | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| bricks:F-003-T07 | Foundations: layout and icons | Implemented; verification pending | 0 h | 🤖 | — | Ready (verification) |
| bricks:F-003-T02 | Components: form field, list row, tabs | Planned | 5 h | ⏳ 🤖 | F-003-T01 | Waiting on bricks:F-003-T01 |
| bricks:F-003-T04 | Dialog and toast | Planned | 5 h | ⏳ 🤖 | F-003-T01 | Waiting on bricks:F-003-T01 |
| bricks:F-003-T05 | Patterns: status row, approval card, empty state | Planned | 5 h | ⏳ 🤖 | F-003-T01 | Waiting on bricks:F-003-T01 |
| bricks:F-003-T06 | Patterns: data table and filters | Planned | 6 h | ⏳ 🤖 | F-003-T02 | Waiting on bricks:F-003-T02 |

</details>

## Remaining effort

Hours each backlog still holds, as each project's own, uncalibrated estimate. The solution line adds them; it is no completion measure.

| Source | Agent | Owner | From | Open records by priority | Open records by size |
|---|---|---|---|---|---|
| 🚦 coordinator | 10.25 h | 1 h | totals line | 🔶 P2: 2, 🔹 P3: 9 | 🟢 Small: 10, 🔴 Large: 1 |
| 𖣂 nerv | 176.75 h | 16.25 h | totals line | 🔺 P1: 9, 🔶 P2: 44, 🔹 P3: 29 | 🟢 Small: 53, 🟡 Medium: 20, 🔴 Large: 7, 🟣 Very large: 2 |
| 🤖 gauntlet-protocol | 8.75 h | 1 h | totals line | 🔶 P2: 1, 🔹 P3: 3 | 🟢 Small: 2, 🟡 Medium: 1, 🔴 Large: 1 |
| 🦺 project-harness | 0.25 h | 0 h | totals line | 🔶 P2: 1 | 🟢 Small: 1 |
| 🚁 fpvbuddy | 46.25 h | 1.75 h | Remaining cells of 8 open records | 🔶 P2: 2, 🔹 P3: 6 | 🟢 Small: 3, 🟡 Medium: 1, 🔴 Large: 1, 🟣 Very large: 3 |
| 🪴 grover | 31.5 h | 13.25 h | totals line | 🔺 P1: 4, 🔶 P2: 12, 🔹 P3: 7 | 🟢 Small: 19, 🟡 Medium: 2, 🔴 Large: 1, 🟣 Very large: 1 |
| 🏚️ openbando | Unknown | Unknown | no totals line or Remaining cells | 🔺 P1: 1, 🔶 P2: 10, ◻️ P3: 1, 🔹 P3: 9 | 🟢 Small: 8, 🟡 Medium: 9, 🔴 Large: 4 |
| 🗺️ hobo | 49.75 h | 2.5 h | totals line | 🔶 P2: 5, 🔹 P3: 9 | 🟢 Small: 3, 🟡 Medium: 6, 🔴 Large: 5 |
| 🧱 bricks | 46 h | 0.5 h | totals line | 🔶 P2: 5, 🔹 P3: 4 | 🟢 Small: 3, 🟡 Medium: 3, 🔴 Large: 1, 🟣 Very large: 2 |
| **Solution** | at least 369.5 h | at least 36.25 h | 8 of 9 backlogs | | |

## Integration outcomes

| Record | Outcome | Status | Human action | Effort | Component links |
|---|---|---|---|---|---|
| [solution:B-002](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#b-002) | check:fast fails with a bare HTTP 403 when GH_TOKEN is unset | Open | No | 🟢 Small | — |
| [solution:B-003](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#b-003) | Neither scheduled workflow has run on its schedule yet | Investigate | No | 🟢 Small | — |
| [solution:B-004](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#b-004) | An hourly refresh would open a PR every hour: the coordinator's own revision row was not ignored | Implemented | No | 🟢 Small | — |
| [solution:F-006](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-006) | NERV delivers Grover alerts end to end | Open | No | 🟢 Small | grover:F-008, nerv:F-122, nerv:F-123 |
| [solution:F-007](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-007) | NERV capability coverage in the Gauntlet across both repositories | Open | No | 🟢 Small | nerv:F-120 |
| [solution:F-009](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-009) | Reconcile to the latest harness and read built backlog views | Implemented | No | 🟢 Small | project-harness:F-096 |
| [solution:F-011](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-011) | Reconcile to harness 10.21.2: the dashboard's five overview gaps and the coordinator label | Implemented | No | 🟢 Small | — |
| [solution:F-012](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-012) | Bricks 🧱: shared UI library for the voidbrain projects | Open | No | 🔴 Large | nerv:F-130, hobo:F-010, grover:F-020, fpvbuddy:F-007, fpvbuddy:F-008, bricks:F-001, bricks:F-002, bricks:F-004 |
| [solution:F-013](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-013) | OpenBando 🏚️ in the solution, and a domain map | Open | No | 🟢 Small | — |
| [solution:F-014](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-014) | Owner accepts or rejects the 2026-11-26 gap-review proposals | Open | No | 🟢 Small | nerv:F-120, openbando:B-009, openbando:F-026, gauntlet-protocol:F-075, fpvbuddy:F-102, grover:F-099 |
| [solution:F-015](https://github.com/voidbrain/coordinator/blob/34231e6a1d50da3c125a8e14663e008a05ca83d2/docs/BACKLOG.md#f-015) | Reconcile project-harness v10.21.2 → v10.21.3 | Open | No | 🟢 Small | — |

## Component work

| Record | Item | Status | Human action | Effort | Reviewed |
|---|---|---|---|---|---|
| [nerv:B-091](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-091) | Windows: a fenced stop ends uncertain after a SQLite "disk I/O error" while recording it | Open | No | 🟡 Medium | 2026-11-25 |
| [nerv:F-005](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-005) | Discover, install and operate enrolled remote workers | Open | No | 🟡 Medium | 2026-11-18 |
| [nerv:F-006](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-006) | Orchestrate agents and models across nodes | Open | No | 🟢 Small | 2026-11-25 |
| [nerv:B-143](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-143) | A relative reminder time counts from the model step that writes the call, not from when the owner asked | Implemented | No | 🟡 Medium | 2026-11-26 |
| [nerv:B-118](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-118) | Windows CI: the test step runs into its 18-minute limit | Open | No | 🔴 Large | 2026-11-26 |
| [nerv:F-062](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-062) | Backup and restore: agreed loss bounds, off-host snapshots and a restore drill | Open | Procedure | 🟢 Small | 2026-11-18 |
| [nerv:F-011](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-011) | Native macOS menu-bar companion without Electron | Implemented | Procedure | 🟢 Small | 2026-11-10 |
| [nerv:F-004](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-004) | Angular PWA and validated GenUI | Open | Procedure | 🟢 Small | 2026-11-26 |
| [nerv:F-012](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-012) | Resume a specific paused job after its provider limit resets | Open | Procedure | 🟢 Small | 2026-11-21 |
| [nerv:F-016](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-016) | Relocate the logical coordinator without split brain | Open | Procedure | 🟡 Medium | 2026-11-25 |
| [nerv:F-082](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-082) | Lists: add items by chat or Telegram, recall them as a checklist card | Open | No | 🟢 Small | 2026-11-21 |
| [nerv:F-083](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-083) | Saved recipes: keep them by category, recall them, compute only from saved values | Open | No | 🟡 Medium | 2026-11-18 |
| [nerv:F-120](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-120) | Gauntlet coverage of NERV capabilities | Open | No | 🟡 Medium | 2026-11-25 |
| [nerv:F-088](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-088) | Storage base: copy files from a known removable card when it is inserted | Open | No | 🟢 Small | 2026-11-18 |
| [nerv:B-108](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-108) | Dashboard "Update now" and the scheduled apply cannot update the service they run in | Implemented | No | 🟢 Small | 2026-11-24 |
| [nerv:F-102](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-102) | Scheduled automatic updates with advance notice | Open | No | 🟢 Small | 2026-11-18 |
| [nerv:B-111](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-111) | The live service never records health samples: "No health samples yet" forever | Implemented | No | 🟢 Small | 2026-11-23 |
| [nerv:F-103](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-103) | Service health and link load between bases, measured | Open | No | 🟡 Medium | 2026-11-21 |
| [nerv:F-117](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-117) | One command to update a base: `nerv update` | Open | No | 🟡 Medium | 2026-11-24 |
| [nerv:F-130](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-130) | Migrate the dashboard into the Angular workspace | Open | No | 🟣 Very large | 2026-11-26 |
| [nerv:F-118](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-118) | Pair a phone once: device sign-in with a 90-day sliding limit | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-089](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-089) | Browser control: act on a named control in an open page | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-090](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-090) | Resume interrupted coding work without the editor | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-093](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-093) | Desktop control: click a named control in an app on screen | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-094](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-094) | App workflows: open an app, open a file, save it as another file | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-106](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-106) | Per-turn prompt size on the local route, then deferred domain tool loading | Open | No | 🟡 Medium | 2026-11-18 |
| [nerv:F-128](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-128) | Coding jobs measure their instruction load and hand off between steps | Open | No | 🔴 Large | 2026-11-25 |
| [nerv:B-099](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-099) | An EVA-03 job's child in its own session survives the job's timeout and cancellation | Open | No | 🔴 Large | 2026-11-19 |
| [nerv:F-049](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-049) | EVA instances: an EVA is a class, each job gets a fresh sandbox | Open | No | 🟣 Very large | 2026-11-18 |
| [nerv:F-008](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-008) | FPV batteries: registry, charge state, resistance checks and storage reminders | Open | No | 🟢 Small | 2026-11-21 |
| [nerv:B-066](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-066) | Worker-link heartbeat verification awaits nervous SQLite IPC on every frame | Open | No | 🟢 Small | 2026-11-26 |
| [nerv:B-120](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-120) | `kaji promote` starts the service before removing its marker, so the service can refuse to start | Implemented | No | 🟢 Small | 2026-11-24 |
| [nerv:B-138](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-138) | `nerv chat` answers a fleet question with a generic greeting, ignoring the `fleet.chat` result | Implemented | No | 🟢 Small | 2026-11-26 |
| [nerv:B-144](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-144) | The dashboard rewrites the EVA cages on every poll, so their images reload with no change | Implemented | No | 🟢 Small | 2026-11-26 |
| [nerv:B-136](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-136) | `nerv chat` gets an "(invalid reply)" from the planner before every answer | Implemented | No | 🟡 Medium | 2026-11-25 |
| [nerv:B-140](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-140) | "Update now" refused with "Update check timed out.": every update-check git command, the network ones included, was killed after 5 s | Implemented | No | 🟡 Medium | 2026-11-26 |
| [nerv:B-145](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-145) | The dashboard rewrites whole sections on every poll, so Web Inspector collapses what the owner expanded | Implemented | No | 🟡 Medium | 2026-11-26 |
| [nerv:B-146](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-146) | Settings stacks into one column on a phone, and Enable notifications sits against the column edge and shows when it cannot work | Implemented | No | 🟡 Medium | 2026-11-26 |
| [nerv:B-147](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-147) | The dashboard's flow and arrows miss short EVA actions | Open | No | 🟡 Medium | 2026-11-25 |
| [nerv:F-086](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-086) | Gmail: search and read, then draft and send behind approval | Open | Procedure | 🟢 Small | 2026-11-21 |
| [nerv:F-087](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-087) | 3D printing: slice a model with a material profile and send it to the printer | Open | Procedure | 🟢 Small | 2026-11-18 |
| [nerv:F-092](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-092) | Record desktop input and replay it | Open | Procedure | 🟢 Small | 2026-11-21 |
| [nerv:B-057](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-057) | Companion error messages are Italian only and do not say what went wrong | Open | Procedure | 🟢 Small | 2026-11-13 |
| [nerv:B-068](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-068) | Companion keeps Start NERV disabled after Stop NERV | Open | Procedure | 🟢 Small | 2026-11-18 |
| [nerv:B-107](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-107) | Pilot cards: model select leaves its card and name inputs are too narrow to read | Implemented | Procedure | 🟢 Small | 2026-11-23 |
| [nerv:B-113](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-113) | Updating from the dashboard signs it out, then offers a stale Update now that fails | Implemented | Procedure | 🟢 Small | 2026-11-23 |
| [nerv:B-122](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-122) | Update now is refused with "ownership is unknown" while NERV runs as a foreground `nerv launch` | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [nerv:B-123](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-123) | After Update now the dashboard never shows the updater's result | Implemented | Procedure | 🟢 Small | 2026-11-25 |
| [nerv:B-128](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-128) | Settings → Pair a device on a 127.0.0.1 dashboard puts a loopback address in the QR, which a phone cannot open | Implemented | Procedure | 🟢 Small | 2026-11-25 |
| [nerv:B-129](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-129) | Health → Run doctor logs a canned "all ok" line and never asks the service | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [nerv:B-134](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-134) | Every Web Push to Apple fails with 403 BadJwtToken, and the failure is invisible | Implemented | Procedure | 🟢 Small | 2026-11-25 |
| [nerv:B-135](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-135) | Update now on a busy Mac is refused as an ownership problem when NERV's health check is slow | Implemented | Procedure | 🟢 Small | 2026-11-25 |
| [nerv:B-142](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-142) | Dashboard Health: the service sample and link rows are built outside the table and look malformed | Implemented | Procedure | 🟢 Small | 2026-11-26 |
| [nerv:F-125](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-125) | Reconcile to the latest harness and enable built backlog views | Open | No | 🟢 Small | 2026-11-26 |
| [nerv:F-109](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-109) | Pilots as persona cards with editable names and one Apply | Open | No | 🟡 Medium | 2026-11-20 |
| [nerv:F-129](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-129) | The sortie view shows model thinking time next to EVA activity | Open | No | 🟡 Medium | 2026-11-25 |
| [nerv:F-110](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-110) | Owner settings in the dashboard for values that are fixed today | Open | No | 🔴 Large | 2026-11-19 |
| [nerv:F-124](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-124) | Fuse Midori's Telegram and the phone app into one conversation | Open | No | 🔴 Large | 2026-11-26 |
| [nerv:F-098](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-098) | FPV fleet diary: crashes, parts, spares and photos | Open | Procedure | 🟢 Small | 2026-11-26 |
| [nerv:F-101](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-101) | Share the FPV battery manager outside NERV | Open | No | 🔴 Large | 2026-11-26 |
| [nerv:F-131](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-131) | Quick commands: shortcut buttons that show other projects' cards through MCP | Open | No | 🔴 Large | 2026-11-26 |
| [nerv:F-113](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-113) | Compact tool index with details on request | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-126](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-126) | Evaluate gemma4:26b as the local chat model instead of gemma4:12b | Open | No | 🟡 Medium | 2026-11-26 |
| [nerv:F-099](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-099) | FPV build knowledge: components and wiring from cited sources | Open | No | 🟢 Small | 2026-11-18 |
| [nerv:B-133](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-133) | Windows CI: the F-121-T04 cache probe answered in 698 ms while its test allows 300 ms | Open | No | 🟢 Small | 2026-11-25 |
| [nerv:F-121](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-121) | Printed parts per drone: "print Smoke's feet" | Open | No | 🟢 Small | 2026-11-25 |
| [nerv:F-122](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-122) | Deliver Grover alerts | Open | No | 🟡 Medium | 2026-11-26 |
| [nerv:B-072](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-072) | Windows CI: native TLS tests fail when openssl takes over 15 s | Open | No | 🟢 Small | 2026-11-18 |
| [nerv:B-076](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-076) | CI 2026-11-18: scattered one-off failures in unrelated tests on Windows and Linux | Open | No | 🟢 Small | 2026-11-26 |
| [nerv:B-127](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-127) | F-118-T02 browser test times out when it runs together with many test files | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:B-137](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-137) | Fleet chat reads a new drone's model and version as part categories | Implemented | No | 🟢 Small | 2026-11-26 |
| [nerv:B-094](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-094) | Remote action wording: a doubled full stop, "queued" for a finished job, "offline" for a revoked base | Open | No | 🟡 Medium | 2026-11-19 |
| [nerv:F-060](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-060) | Spike: herdr-core as a coding-agent terminal runtime | Investigate | Procedure | 🟢 Small | 2026-11-06 |
| [nerv:F-116](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-116) | Split a model too big for one base across bases | Open | Decision | 🟢 Small | 2026-11-22 |
| [nerv:F-007](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-007) | Voice and evaluated skill improvement | Open | Procedure | 🟢 Small | 2026-11-15 |
| [nerv:F-123](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#f-123) | Connect NERV to Grover's hub over MCP | Open | Procedure | 🟢 Small | 2026-11-25 |
| [nerv:B-056](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-056) | A renewal the companion refuses on the Mac says it was not confirmed | Implemented | Procedure | 🟢 Small | 2026-11-13 |
| [nerv:B-096](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-096) | Sephirot flow: a sortie that stops at Misato's apartment has no route to Debrief | Implemented | Procedure | 🟢 Small | 2026-11-19 |
| [nerv:B-110](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-110) | Dashboard offers Update now when already up to date, away from the update status | Implemented | Procedure | 🟢 Small | 2026-11-23 |
| [nerv:B-112](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-112) | Sephirot flow lights routes the sortie did not take and hides the map when no sortie is selected | Implemented | Procedure | 🟢 Small | 2026-11-23 |
| [nerv:B-130](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-130) | A finished sortie that never needed approval shows Misato's Apt faded as skipped, unlike the other unvisited steps | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [nerv:B-141](https://github.com/voidbrain/nerv/blob/d95199d022be8ed811c18166061b9aaf6ca330c6/docs/BACKLOG.md#b-141) | Dashboard: the updater status is lost among the Health rows, and Settings is misaligned | Implemented | Procedure | 🟡 Medium | 2026-11-26 |
| [gauntlet-protocol:B-003](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#b-003) | Coding grader blocks at a timeout while a leftover process keeps writing | Open | No | 🟢 Small | 2026-11-25 |
| [gauntlet-protocol:F-075](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#f-075) | Reconcile project-harness v10.20.0 → v10.21.3 | Open | No | 🟢 Small | 2026-11-26 |
| [gauntlet-protocol:F-022](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#f-022) | Packs or recorded skips for estimation, research, scheduling-time and backlog-management | Open | No | 🟡 Medium | 2026-11-24 |
| [gauntlet-protocol:F-021](https://github.com/voidbrain/gauntlet-protocol/blob/5a1e306c9c60f59f2f1f6e1a25791f2794fa95ea/docs/BACKLOG.md#f-021) | image-generation-v1: runner and grader after a design decision | Open | No | 🔴 Large | 2026-11-24 |
| [project-harness:F-096](https://github.com/voidbrain/project-harness/blob/e118aa5370314617dd6ef9c9d0bb0c57e897578a/docs/BACKLOG.md#f-096) | Stop committing generated backlog views | Open | No | 🟢 Small | 2026-11-25 |
| [fpvbuddy:F-005](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-005) | M1 — FPV battery core package | Open | No | 🟡 Medium | 2026-11-25 |
| [fpvbuddy:F-006](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-006) | Reconcile project-harness v10.9.0 → v10.20.0 | Open | No | 🟢 Small | 2026-11-25 |
| [fpvbuddy:F-007](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-007) | Upgrade Angular 21 → 22 | Implemented | No | 🟢 Small | 2026-11-25 |
| [fpvbuddy:F-008](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-008) | Adopt 🧱 bricks | Open | No | 🟣 Very large | 2026-11-25 |
| [fpvbuddy:F-009](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-009) | Show FPVBuddy's batteries in NERV over MCP | Open | No | 🔴 Large | 2026-11-25 |
| [fpvbuddy:F-010](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-010) | M2 core: fleet, spares and crashes | Open | No | 🟣 Very large | 2026-11-25 |
| [fpvbuddy:F-011](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-011) | MCP tools for fleet, spares and crashes | Open | No | 🟣 Very large | 2026-11-25 |
| [fpvbuddy:F-102](https://github.com/voidbrain/FPVBuddy/blob/9c545c0312ab25ded6fb8fbb5f770adcb05fad9e/docs/BACKLOG.md#f-102) | Reconcile project-harness v10.20.0 → v10.21.3 | Open | No | 🟢 Small | 2026-11-26 |
| [grover:B-008](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#b-008) | The feed end-to-end test fails now and then on CI: feed done, mixing tank not emptied | Implemented | No | 🟢 Small | 2026-11-25 |
| [grover:F-005](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-005) | Deploy hub and agent on the Pi behind Tailscale | Open | Procedure | 🟢 Small | 2026-11-25 |
| [grover:F-003](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-003) | Hardware bring-up on the Raspberry Pi | Open | Decision | 🟡 Medium | 2026-11-24 |
| [grover:F-004](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-004) | Calibrate analog probes (volts to pH and EC) | Implemented | No | 🟢 Small | 2026-11-24 |
| [grover:F-011](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-011) | Feed cycle per pot: supply tanks, mixing tank, pot pumps | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:B-006](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#b-006) | An upgraded agent drops its cached config until the hub answers | Open | No | 🟢 Small | 2026-11-24 |
| [grover:B-010](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#b-010) | Held threshold alerts read as if the value were still past the threshold, and threshold checks lack float tolerance | Implemented | No | 🟢 Small | 2026-11-25 |
| [grover:F-008](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-008) | Alerts for NERV: out-of-range values, offline agent, faults | Open | No | 🟢 Small | 2026-11-25 |
| [grover:F-012](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-012) | Plants and strains: origin, generation, breeder, ancestry | Implemented | No | 🟢 Small | 2026-11-24 |
| [grover:F-006](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-006) | Set-up screens in the client | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-007](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-007) | Lights follow the grow calendar; Switch to bloom | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-013](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-013) | Plant cycle: nursery, cuttings, harvest, a plant per pot, phase per plant | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-014](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-014) | Plant page with statistics, as in the old app | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-015](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-015) | Rig map: the tent as a live diagram, with its controls | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-016](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-016) | Schedules by day of week, weekends apart | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-018](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-018) | Pumps through an L298N driver (two pins on the MCP23017) | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-019](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-019) | Install Grover as a web app on the phone | Implemented | No | 🟢 Small | 2026-11-24 |
| [grover:F-099](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-099) | Reconcile project-harness v10.20.0 → v10.21.3 | Open | No | 🟢 Small | 2026-11-26 |
| [grover:F-010](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-010) | Hub data retention and backups | Open | No | 🟡 Medium | 2026-11-24 |
| [grover:F-009](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-009) | Browser tests and accessibility checks for the client | Open | No | 🔴 Large | 2026-11-24 |
| [grover:F-020](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-020) | Adopt 🧱 bricks in the client | Open | No | 🟣 Very large | 2026-11-25 |
| [grover:B-009](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#b-009) | Eight Dependabot PRs from 2021 to 2023 still open against the removed v1 tree | Open | Decision | 🟢 Small | 2026-11-25 |
| [grover:F-017](https://github.com/voidbrain/Grover/blob/ae360a6f91ff276120db592b5a05a43d448e9dc6/docs/BACKLOG.md#f-017) | Nutrient colours: each supply tank in its nutrient's real colour | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [openbando:B-009](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-009) | Simulator and selected-flight/video regression | Implemented | Procedure | 🟢 Small | 2026-10-31 |
| [openbando:B-017](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-017) | Villetta replay misalignment with video | Implemented | Procedure | 🟢 Small | 2026-10-31 |
| [openbando:B-018](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-018) | Hidden-origin GPS projection distorts flight paths | Implemented | Procedure | 🟡 Medium | 2026-10-31 |
| [openbando:B-028](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-028) | New bando: grey map after a hidden bando, full addresses not found, Generate before a place | Implemented | Procedure | 🟢 Small | 2026-10-31 |
| [openbando:B-045](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-045) | After a timeline click the video can stay stuck on an old frame | Investigate | No | 🟡 Medium | 2026-10-31 |
| [openbando:B-050](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-050) | Investigate delayed AI replies against a changed editor draft | Investigate | No | 🟢 Small | 2026-10-31 |
| [openbando:B-051](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#b-051) | Investigate an Auto-sync result after changing its video/log pair | Investigate | No | 🟢 Small | 2026-10-31 |
| [openbando:F-001](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-001) | Cut/Wing for diagonal basement outlines | Implemented | Procedure | 🟢 Small | 2026-10-31 |
| [openbando:F-009](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-009) | Racing on real devices | Implemented | Procedure | 🟡 Medium | 2026-10-31 |
| [openbando:F-021](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-021) | Move the take-off pad in the editor | Open | No | 🟡 Medium | 2026-10-31 |
| [openbando:F-024](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-024) | Take-off pad indoors, on an upper floor or on a flat roof | Open | No | 🟢 Small | 2026-10-31 |
| [openbando:F-025](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-025) | Rework the Fly checklist | Open | Decision | 🟡 Medium | 2026-10-31 |
| [openbando:F-026](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-026) | Rework the panels' "?" tips: what they cover, checked automatically | Open | Decision | 🟡 Medium | 2026-10-31 |
| [openbando:F-031](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-031) | Clips and films say when their sources changed since recording | Implemented | Procedure | 🟡 Medium | 2026-10-31 |
| [openbando:F-033](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-033) | Full impact map: chains, content, couplings, outside the repository, as a readable page | Implemented | Procedure | 🟢 Small | 2026-10-31 |
| [openbando:F-039](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-039) | Coverage of the browser tests in the coverage table | Blocked | No | 🔴 Large | 2026-10-31 |
| [openbando:F-040](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-040) | Adjust the replay drone's position in 3D, height included | Open | No | 🟡 Medium | 2026-10-31 |
| [openbando:F-041](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-041) | Align a replay to the model automatically, with a confidence level | Open | No | 🔴 Large | 2026-10-31 |
| [openbando:F-042](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-042) | Right-click in the editor's 3D view: the same context menu as on the plan | Open | No | 🟡 Medium | 2026-10-31 |
| [openbando:F-043](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-043) | Line tools also draw by click A, live preview, click B (keeping the drag) | Open | No | 🔴 Large | 2026-10-31 |
| [openbando:F-053](https://github.com/voidbrain/openbando/blob/791a376b5f7663d15ced4d89bf575be0643e0d93/docs/BACKLOG.md#f-053) | Rebuild a bando as a point cloud from a flight's video, placed by its blackbox and GPS | Open | Decision | 🔴 Large | 2026-11-24 |
| [hobo:F-007](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-007) | Map provider adapter: Leaflet and OpenRouteService | Open | No | 🔴 Large | 2026-11-25 |
| [hobo:F-002](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-002) | Places: collect and organise | Open | No | 🔴 Large | 2026-11-25 |
| [hobo:F-003](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-003) | Trips: dates, start and end, stops | Open | No | 🔴 Large | 2026-11-25 |
| [hobo:F-004](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-004) | Routing totals per leg, per day and per trip | Open | No | 🔴 Large | 2026-11-25 |
| [hobo:F-001](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-001) | Angular scaffold and project harness | Implemented | No | 🟢 Small | 2026-11-25 |
| [hobo:F-008](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-008) | Share and export | Open | Decision | 🔴 Large | 2026-11-25 |
| [hobo:F-009](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-009) | Multi-user editing (deferred) | Open | No | 🟢 Small | 2026-11-25 |
| [hobo:F-012](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-012) | Shared maps/geo package with openbando (candidate) | Open | No | 🟢 Small | 2026-11-25 |
| [hobo:F-005](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-005) | What-if: compare another order or set of stops | Open | No | 🟡 Medium | 2026-11-25 |
| [hobo:F-006](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-006) | Variants: tabs per trip for A/B testing | Open | No | 🟡 Medium | 2026-11-25 |
| [hobo:F-010](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-010) | Shared UI built to move to 🧱 bricks | Open | No | 🟡 Medium | 2026-11-25 |
| [hobo:F-011](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-011) | NERV integration: MCP server for places, trips and totals | Open | No | 🟡 Medium | 2026-11-25 |
| [hobo:F-013](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-013) | Self-hosted routing and geocoding (later) | Open | No | 🟡 Medium | 2026-11-25 |
| [hobo:F-014](https://github.com/voidbrain/hobo/blob/e1669bbca975c1b861ce2b0fbd5543ed8802dbea/docs/BACKLOG.md#f-014) | Google Maps place data (optional, later) | Open | Decision | 🟡 Medium | 2026-11-25 |
| [bricks:F-005](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-005) | Semantic versioning and a changelog | Open | No | 🟢 Small | 2026-11-25 |
| [bricks:F-004](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-004) | Publish the package on npm with trusted publishing | Open | No | 🟡 Medium | 2026-11-25 |
| [bricks:F-001](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-001) | Workspace, harness and repository setup | Implemented | No | 🟢 Small | 2026-11-25 |
| [bricks:F-002](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-002) | First content: tokens, themes and NERV's genUI surfaces | Implemented | No | 🟢 Small | 2026-11-25 |
| [bricks:F-006](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-006) | NERV adoption: what bricks ships for NERV | Open | No | 🟣 Very large | 2026-11-25 |
| [bricks:F-008](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-008) | Grover adoption: what bricks ships for Grover | Open | No | 🟡 Medium | 2026-11-25 |
| [bricks:F-009](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-009) | FPVBuddy adoption: what bricks ships for FPVBuddy | Open | No | 🟡 Medium | 2026-11-25 |
| [bricks:F-007](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-007) | Hobo adoption: what bricks ships for Hobo | Open | No | 🔴 Large | 2026-11-25 |
| [bricks:F-003](https://github.com/voidbrain/bricks/blob/9fada392b34b27ef62e5e326a41147de82b387ab/docs/BACKLOG.md#f-003) | Components, patterns and the live-view helper, on demand | Open | No | 🟣 Very large | 2026-11-25 |

## Source and link problems

None detected. This does not verify semantic ownership, integration behaviour or real-device acceptance.
