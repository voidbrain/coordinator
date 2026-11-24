<!-- generated: project-harness solution dashboard; edit owning backlogs, not this file -->
# voidbrain solution dashboard

Snapshot: 2026-11-24T21:20:33.754Z. Read-only aggregation; no combined completion percentage. Solution integration status is independent of component status.

| Source | Revision | Snapshot state |
|---|---|---|
| solution | [e03eb0cd21c1](https://github.com/voidbrain/coordinator/commit/e03eb0cd21c19321833f0da31cdcbea7addcec66) | Local changes — not a committed snapshot; requested working checkout; local checkout, not fetched |
| nerv | [ccf8adf586e1](https://github.com/voidbrain/nerv/commit/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316) | Committed snapshot; requested main; GitHub |
| gauntlet-protocol | [aadb60e840b6](https://github.com/voidbrain/gauntlet-protocol/commit/aadb60e840b6e4d34f5a5d2f02ba067d5aaf7ea2) | Committed snapshot; requested main; GitHub |
| project-harness | [7ae24ea9ee87](https://github.com/voidbrain/project-harness/commit/7ae24ea9ee875ac1076f908ceedf786b862f8ad2) | Committed snapshot; requested main; GitHub |
| fpvbuddy | [e8bbff61283f](https://github.com/voidbrain/FPVBuddy/commit/e8bbff61283fe523e4a5be2f269c34b0f5c21e29) | Committed snapshot; requested main; GitHub |
| grover | [77851b12718e](https://github.com/voidbrain/Grover/commit/77851b12718ee6e90263758cfc218dea6f87e218) | Committed snapshot; requested main; GitHub |

## Integration outcomes

| Record | Outcome | Status | Human action | Effort | Component links |
|---|---|---|---|---|---|
| [solution:F-001](BACKLOG.md#f-001) | Coordinator repository with harness v10.9.0, the solution profile, the solution order and the gap review | Implemented | No | 🟢 Small | — |
| [solution:F-002](BACKLOG.md#f-002) | Owner sets the first solution order | Open | Decision | 🟢 Small | — |
| [solution:F-003](BACKLOG.md#f-003) | Owner accepts or rejects the first gap-review proposals | Open | Decision | 🟢 Small | — |
| [solution:F-004](BACKLOG.md#f-004) | Propose the solution order, the gap review and on-demand backlog views to the template | Open | Procedure | 🟢 Small | — |
| [solution:F-005](BACKLOG.md#f-005) | Decide how often the views are refreshed | Open | Decision | 🟢 Small | — |
| [solution:F-006](BACKLOG.md#f-006) | NERV delivers Grover alerts end to end | Open | No | 🟡 Medium | grover:F-008 |
| [solution:F-007](BACKLOG.md#f-007) | NERV capability coverage in the Gauntlet across both repositories | Open | No | 🟢 Small | nerv:F-120 |

## Component work

| Record | Item | Status | Human action | Effort | Reviewed |
|---|---|---|---|---|---|
| [nerv:B-091](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-091) | Windows: a fenced stop ends uncertain after a SQLite "disk I/O error" while recording it | Open | No | 🟡 Medium | 2026-11-21 |
| [nerv:F-005](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-005) | Discover, install and operate enrolled remote workers | Open | No | 🟡 Medium | 2026-11-18 |
| [nerv:B-119](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-119) | Placement probes longer than 15 s are cut off by the HTTP server | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-006](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-006) | Orchestrate agents and models across nodes | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-021](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-021) | MCP and standardized tool/expert protocol | Open | No | 🟢 Small | 2026-11-13 |
| [nerv:B-121](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-121) | A re-targeted move can take over from a standby older than an epoch that ran | Implemented | No | 🟢 Small | 2026-11-24 |
| [nerv:B-124](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-124) | A re-target `kaji relocate` signs fences the running main before the target's checks run | Open | No | 🟡 Medium | 2026-11-24 |
| [nerv:F-016](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-016) | Relocate the logical coordinator without split brain | Open | No | 🟡 Medium | 2026-11-24 |
| [nerv:B-082](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-082) | Windows: a service installed from an SSH session cannot register its logon task | Open | No | 🟢 Small | 2026-11-21 |
| [nerv:B-118](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-118) | Windows CI: the test step runs into its 18-minute limit | Open | No | 🟡 Medium | 2026-11-24 |
| [nerv:F-062](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-062) | Backup and restore: agreed loss bounds, off-host snapshots and a restore drill | Open | Procedure | 🟢 Small | 2026-11-18 |
| [nerv:F-011](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-011) | Native macOS menu-bar companion without Electron | Implemented | Procedure | 🟢 Small | 2026-11-10 |
| [nerv:F-004](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-004) | Angular PWA and validated GenUI | Open | Procedure | 🟢 Small | 2026-11-12 |
| [nerv:F-012](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-012) | Resume a specific paused job after its provider limit resets | Open | Procedure | 🟢 Small | 2026-11-21 |
| [nerv:F-082](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-082) | Lists: add items by chat or Telegram, recall them as a checklist card | Open | No | 🟢 Small | 2026-11-21 |
| [nerv:F-083](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-083) | Saved recipes: keep them by category, recall them, compute only from saved values | Open | No | 🟡 Medium | 2026-11-18 |
| [nerv:F-120](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-120) | Gauntlet coverage of NERV capabilities | Open | No | 🔴 Large | 2026-11-24 |
| [nerv:F-088](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-088) | Storage base: copy files from a known removable card when it is inserted | Open | No | 🟢 Small | 2026-11-18 |
| [nerv:B-108](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-108) | Dashboard "Update now" and the scheduled apply cannot update the service they run in | Implemented | No | 🟢 Small | 2026-11-24 |
| [nerv:F-102](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-102) | Scheduled automatic updates with advance notice | Open | No | 🟢 Small | 2026-11-18 |
| [nerv:B-111](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-111) | The live service never records health samples: "No health samples yet" forever | Implemented | No | 🟢 Small | 2026-11-23 |
| [nerv:F-103](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-103) | Service health and link load between bases, measured | Open | No | 🟡 Medium | 2026-11-21 |
| [nerv:F-117](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-117) | One command to update a base: `nerv update` | Open | No | 🟡 Medium | 2026-11-24 |
| [nerv:F-118](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-118) | Pair a phone once: device sign-in with a 90-day sliding limit | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-090](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-090) | Resume interrupted coding work without the editor | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-093](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-093) | Desktop control: click a named control in an app on screen | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-094](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-094) | App workflows: open an app, open a file, save it as another file | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-106](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-106) | Per-turn prompt size on the local route, then deferred domain tool loading | Open | No | 🟡 Medium | 2026-11-18 |
| [nerv:B-099](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-099) | An EVA-03 job's child in its own session survives the job's timeout and cancellation | Open | No | 🔴 Large | 2026-11-19 |
| [nerv:F-049](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-049) | EVA instances: an EVA is a class, each job gets a fresh sandbox | Open | No | 🟣 Very large | 2026-11-18 |
| [nerv:F-008](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-008) | FPV batteries: registry, charge state, resistance checks and storage reminders | Open | No | 🟢 Small | 2026-11-21 |
| [nerv:B-066](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-066) | Worker-link heartbeat verification awaits nervous SQLite IPC on every frame | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:B-120](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-120) | `kaji promote` starts the service before removing its marker, so the service can refuse to start | Implemented | No | 🟢 Small | 2026-11-24 |
| [nerv:B-123](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-123) | After Update now the dashboard never shows the updater's result | Implemented | No | 🟡 Medium | 2026-11-24 |
| [nerv:B-125](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-125) | A signed Kaji reply is not bound to its request, so an old epoch-push reply can be replayed | Open | No | 🟡 Medium | 2026-11-24 |
| [nerv:B-126](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-126) | Windows CI: `pilot-model.test.ts` fails with "nervous process not ready; nothing was sent." | Open | No | 🟡 Medium | 2026-11-24 |
| [nerv:F-086](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-086) | Gmail: search and read, then draft and send behind approval | Open | Procedure | 🟢 Small | 2026-11-21 |
| [nerv:F-087](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-087) | 3D printing: slice a model with a material profile and send it to the printer | Open | Procedure | 🟢 Small | 2026-11-18 |
| [nerv:F-089](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-089) | Browser control: act on a named control in an open page | Open | Decision | 🟢 Small | 2026-11-24 |
| [nerv:F-092](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-092) | Record desktop input and replay it | Open | Procedure | 🟢 Small | 2026-11-21 |
| [nerv:B-057](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-057) | Companion error messages are Italian only and do not say what went wrong | Open | Procedure | 🟢 Small | 2026-11-13 |
| [nerv:B-068](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-068) | Companion keeps Start NERV disabled after Stop NERV | Open | Procedure | 🟢 Small | 2026-11-18 |
| [nerv:B-107](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-107) | Pilot cards: model select leaves its card and name inputs are too narrow to read | Implemented | Procedure | 🟢 Small | 2026-11-23 |
| [nerv:B-113](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-113) | Updating from the dashboard signs it out, then offers a stale Update now that fails | Implemented | Procedure | 🟢 Small | 2026-11-23 |
| [nerv:B-122](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-122) | Update now is refused with "ownership is unknown" while NERV runs as a foreground `nerv launch` | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [nerv:B-128](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-128) | Settings → Pair a device on a 127.0.0.1 dashboard puts a loopback address in the QR, which a phone cannot open | Implemented | Procedure | 🟡 Medium | 2026-11-24 |
| [nerv:F-115](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-115) | Grouped, alphabetical CLI help | Open | No | 🟢 Small | 2026-11-20 |
| [nerv:F-109](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-109) | Pilots as persona cards with editable names and one Apply | Open | No | 🟡 Medium | 2026-11-20 |
| [nerv:F-110](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-110) | Owner settings in the dashboard for values that are fixed today | Open | No | 🔴 Large | 2026-11-19 |
| [nerv:F-113](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-113) | Compact tool index with details on request | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-098](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-098) | FPV fleet diary: crashes, parts, spares and photos | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-099](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-099) | FPV build knowledge: components and wiring from cited sources | Open | No | 🟢 Small | 2026-11-18 |
| [nerv:F-121](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-121) | Printed parts per drone: "print Smoke's feet" | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:F-101](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-101) | Share the FPV battery manager outside NERV | Open | No | 🔴 Large | 2026-11-20 |
| [nerv:B-072](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-072) | Windows CI: native TLS tests fail when openssl takes over 15 s | Open | No | 🟢 Small | 2026-11-18 |
| [nerv:B-076](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-076) | CI 2026-11-18: scattered one-off failures in unrelated tests on Windows and Linux | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:B-127](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-127) | F-118-T02 browser test times out when it runs together with many test files | Open | No | 🟢 Small | 2026-11-24 |
| [nerv:B-094](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-094) | Remote action wording: a doubled full stop, "queued" for a finished job, "offline" for a revoked base | Open | No | 🟡 Medium | 2026-11-19 |
| [nerv:F-060](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-060) | Spike: herdr-core as a coding-agent terminal runtime | Investigate | Procedure | 🟢 Small | 2026-11-06 |
| [nerv:F-116](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-116) | Split a model too big for one base across bases | Open | Decision | 🟢 Small | 2026-11-22 |
| [nerv:F-007](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#f-007) | Voice and evaluated skill improvement | Open | Procedure | 🟢 Small | 2026-11-15 |
| [nerv:B-056](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-056) | A renewal the companion refuses on the Mac says it was not confirmed | Implemented | Procedure | 🟢 Small | 2026-11-13 |
| [nerv:B-096](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-096) | Sephirot flow: a sortie that stops at Misato's apartment has no route to Debrief | Implemented | Procedure | 🟢 Small | 2026-11-19 |
| [nerv:B-110](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-110) | Dashboard offers Update now when already up to date, away from the update status | Implemented | Procedure | 🟢 Small | 2026-11-23 |
| [nerv:B-112](https://github.com/voidbrain/nerv/blob/ccf8adf586e152bbcdcaa30e940b4de6b9fb4316/docs/BACKLOG.md#b-112) | Sephirot flow lights routes the sortie did not take and hides the map when no sortie is selected | Implemented | Procedure | 🟢 Small | 2026-11-23 |
| [grover:F-013](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-013) | Plant cycle: nursery, cuttings, harvest, a plant per pot, phase per plant | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:B-004](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#b-004) | A probe read was stored only when the agent's reading event arrived | Implemented | No | 🟢 Small | 2026-11-24 |
| [grover:B-005](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#b-005) | Run on a pump queued another run on each click while it ran | Implemented | No | 🟢 Small | 2026-11-24 |
| [grover:F-011](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-011) | Feed cycle per pot: supply tanks, mixing tank, pot pumps | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-012](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-012) | Plants and strains: origin, generation, breeder, ancestry | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-015](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-015) | Rig map: the tent as a live diagram, with its controls | Open | No | 🟡 Medium | 2026-11-24 |
| [grover:F-016](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-016) | Schedules by day of week, weekends apart | Open | No | 🟡 Medium | 2026-11-24 |
| [grover:F-017](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-017) | Nutrient colours: each supply tank in its nutrient's real colour | Open | No | 🟢 Small | 2026-11-24 |
| [grover:F-018](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-018) | Pumps through an L298N driver (two pins on the MCP23017) | Open | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-019](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-019) | Install Grover as a web app on the phone | Open | No | 🟢 Small | 2026-11-24 |
| [grover:F-003](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-003) | Hardware bring-up on the Raspberry Pi | Open | Procedure | 🟡 Medium | 2026-11-24 |
| [grover:F-014](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-014) | Plant page with statistics, as in the old app | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-004](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-004) | Calibrate analog probes (volts to pH and EC) | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-005](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-005) | Deploy hub and agent on the Pi behind Tailscale | Open | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-006](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-006) | Set-up screens in the client | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-007](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-007) | Lights follow the grow calendar; Switch to bloom | Implemented | Procedure | 🟢 Small | 2026-11-24 |
| [grover:F-008](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-008) | Alerts for NERV: out-of-range values, offline agent, faults | Open | No | 🟡 Medium | 2026-11-24 |
| [grover:F-009](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-009) | Browser tests and accessibility checks for the client | Open | No | 🟡 Medium | 2026-11-24 |
| [grover:B-002](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#b-002) | `check:conventions` does not see the client in this monorepo | Open | No | 🟢 Small | 2026-11-24 |
| [grover:F-010](https://github.com/voidbrain/Grover/blob/77851b12718ee6e90263758cfc218dea6f87e218/docs/BACKLOG.md#f-010) | Hub data retention and backups | Open | No | 🟢 Small | 2026-11-24 |

## Source and link problems

None detected. This does not verify semantic ownership, integration behaviour or real-device acceptance.
