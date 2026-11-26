# Cross-project audit, 2026-11-26

First run of the [cross-project audit](../agents/cross-project-audit.md) (`solution:F-017-T02`). Scoped report: the cross-repository backlog and the solution documentation (areas `backlog` and `documentation`); it is not a full audit of this repository or of any component. It reads and proposes only: nothing was created or changed in a component.

## Baseline

Coordinator `main` `7974408` (after #73, refresh of 2026-11-26 08:49 UTC). Components read at `origin/main` after `git fetch`, local checkouts untouched:

| Component | Revision | Component | Revision |
|---|---|---|---|
| 𖣂 nerv | `353fe20` | 🪴 grover | `1d04cb7` |
| 🤖 gauntlet-protocol | `f209281` | 🏚️ openbando | `0e45030` |
| 🦺 project-harness | `9ea30a2` | 🗺️ hobo | `66a4706` |
| 🚁 fpvbuddy | `d8b4432` (findings read at `13a259d`; the later commits only close F-102) | 🧱 bricks | `616bb47` (findings read at `d05d719`; the later commit is F-006-T07) |

## Method

Every task file (`docs/work/tasks/*.json`) and record of each component and of this repository was indexed with its status, archives included. Each `repo:ID` in an open step's `dependsOn`, and each `repo:ID` or `Repo ID` mention in an open record or step, was resolved against the owning backlog (checks 1 and 2). The dated decisions of [DOMAINS](../DOMAINS.md) and the [solution order](../solution-order.md) were compared with the open FPV, alert, UI and geo work (check 2). Grover's `apps/hub/src/alerts.ts`, `feeder.ts`, `mcp.ts`, `packages/contracts/src/api.ts` and `docs/DESIGN.md` were compared with nerv's `docs/decisions/grover-alert-delivery.md` and F-122; fpvbuddy F-009 to F-017 with nerv F-101-T06 to T11 (check 3). The [shared-asset checks](../agents/gap-review.md#shared-asset-checks) ran by hand (check 4). Audit manifests and `.harness.json` `audit` settings were read per repository (check 5). npm and the bricks release runs were read for the publish state. The generated gap review of the same refresh found one item, nerv on harness v10.21.3 (latest v10.21.4); it is the gap review's and is not repeated below.

## Earlier findings

| 2026-11-26 finding | Now |
|---|---|
| nerv:F-101-T05 had NERV import the FPV core | Fixed: cancelled (nerv#792), every fpvbuddy record cites it |
| fpvbuddy:F-005 waited on nerv:F-101-T04 | Fixed: fpvbuddy:F-005-T02 "waits on nothing in NERV", implemented in FPVBuddy#17. The NERV side is still open: proposal 1 |

## Results per check

| Check | Result |
|---|---|
| 1. Cross-references | 4 findings (proposals 1–4). No missing ID. Mentions of closed items as dated evidence are false positives (below) |
| 2. Decisions | 4 findings (proposals 5–8) |
| 3. Contracts | 4 findings (proposals 9–12); grover alert shape and nerv's parser agree today |
| 4. Duplication | 3 findings (proposals 13–15). Blocks: no code imported by two projects, no finding. Gauntlet: the uncovered MCP tools are already planned in solution:F-016-T03 to T07, no new proposal |
| 5. Audit cadence | 2 findings (proposals 16–17); none overdue today |

## Findings and proposals

Each row: the owning repository, the evidence, and the exact change proposed. The owner accepts or rejects each; an accepted one is made by a session in its own repository.

| # | Owner | Finding and evidence | Proposed change |
|---|---|---|---|
| 1 | 𖣂 nerv | Delivered but open: [nerv:F-101-T04](https://github.com/voidbrain/nerv/blob/353fe20/docs/work/tasks/F-101-T04.json) (move the core to FPVBuddy) is planned, but FPVBuddy#17 delivered the battery core ([fpvbuddy:F-005-T02](https://github.com/voidbrain/FPVBuddy/blob/13a259d/docs/work/tasks/F-005-T02.json), implemented) and fleet, spares and crashes are fpvbuddy:F-010. It still depends on nerv:F-098-T04, a live crash check of NERV code F-101-T11 removes, and holds F-101-T07 and F-101-T08 back | Close F-101-T04 as met by fpvbuddy:F-005-T02 (record it in `externalMet`, fleet part owned by fpvbuddy:F-010-T04, already in T08); F-101-T07 and T08 depend on fpvbuddy:F-005-T02 instead. Owner decides whether nerv:F-098-T04 and F-008-T12 (live checks of NERV FPV code due for removal) are cancelled or kept |
| 2 | 🧱 bricks | Delivered but open: [bricks:F-004-T05 and T06](https://github.com/voidbrain/bricks/blob/d05d719/docs/work/records/F-004.md) (enable trusted publishing; first publish and install check) are planned, but `@voidbrain/bricks` 0.3.0 was published by `release.yml` with trusted publishing ([run 45722880536](https://github.com/voidbrain/bricks/actions/runs/45722880536), npm 2026-11-25 23:44 UTC; 0.1.0 is on npm too). grover:F-020-T03 waits on bricks:F-003-T01, implemented and shipped | Record F-004-T05 done (the run proves it); rewrite F-004-T06 as "first trusted publish (0.3.0) and an install check" and close it after the check; close the implemented F-003 steps on their green CI so grover:F-020-T03 shows ready |
| 3 | 🗺️ hobo | Stale wait: [hobo:F-010-T02](https://github.com/voidbrain/hobo/blob/66a4706/docs/work/tasks/F-010-T02.json) "waits on bricks (coordinator solution:F-012) being published": bricks is published (proposal 2), and Hobo's adoption is bricks:F-007 | F-010-T02 `dependsOn` bricks:F-007-T03 (Hobo migration note and release) instead of the prose wait on solution:F-012 |
| 4 | 🚦 coordinator | Met dependency: [solution:F-007-T01](../work/tasks/F-007-T01.json) depends on nerv:F-120-T01 and nerv:F-120-T03, both closed (nerv#752, nerv#749) | Record both in `externalMet`; it still waits on nerv:F-120-T02 |
| 5 | 🚦 coordinator | Stale order note: [solution order](../solution-order.md) item `fpvbuddy:F-005` says "T02 waits on nerv:F-101-T04"; fpvbuddy:F-005-T02 waits on nothing in NERV and is implemented | Owner-instructed order PR: the note becomes "M1 FPV battery core; T02 to T04 implemented, verification" |
| 6 | 🚦 coordinator | Stale pages: [DOMAINS](../DOMAINS.md) lists 🗺️ hobo as planned with no modules, but it is a component with code (Leaflet [maps](https://github.com/voidbrain/hobo/tree/66a4706/src/app/maps), ORS and OSRM routing in [server](https://github.com/voidbrain/hobo/tree/66a4706/server), places); it calls bricks "unpublished" (0.3.0 is on npm); the Telemetry row does not say nerv's `blackbox.ts` moves to fpvbuddy (fpvbuddy:F-014); the FPV data tools row names only nerv steps; hobo's MCP server (hobo:F-011, consumed by nerv:F-131-T03) is a producer missing from Distributed contracts and from check 3's pairs. AGENTS.md's component list lacks hobo and bricks | One coordinator step: hobo's module table; Maps and Routing rows with hobo under Has (extraction still "not yet": nothing is imported by two projects); bricks published; Telemetry row; FPV data tools row naming fpvbuddy:F-009, F-011 to F-015, F-017; a Hobo MCP contract row; the hobo pair in check 3; AGENTS.md component list |
| 7 | 🗺️ hobo | Plan against a later decision: [hobo:F-012-T01](https://github.com/voidbrain/hobo/blob/66a4706/docs/work/tasks/F-012-T01.json) raises a maps/geo package "in the coordinator, which owns cross-repository packages"; since 2026-11-25 shared domain logic lives in 🧊 blocks, only for code two projects import (DOMAINS, blocks criterion) | Rewrite T01's acceptance: compare `src/app/maps` with openbando's `core/geo.ts`; a function both would import is proposed as a blocks package through a coordination record here; otherwise close with the reason |
| 8 | 🚁 fpvbuddy | Plan against a later decision: [fpvbuddy:F-009-T03](https://github.com/voidbrain/FPVBuddy/blob/13a259d/docs/work/tasks/F-009-T03.json) validates surface data against "nerv shared/surface.ts version 1"; since 2026-11-26 surface types stay in bricks, which ships the four surfaces with their schemas (bricks:F-002-T02) | Validate against `@voidbrain/bricks` surface schemas; a missing surface type stays a bricks proposal |
| 9 | 🚦 coordinator | Contract silent for a second producer: fpvbuddy:F-013 (storage alerts) and nerv:F-101-T09 reuse "nerv:F-122's contract", but [F-122's design](https://github.com/voidbrain/nerv/blob/353fe20/docs/decisions/grover-alert-delivery.md) is Grover-only: entries without `roomId` are skipped, config and ledger are `grover`, and night classes come from Grover key shapes. [fpvbuddy:F-013-T01](https://github.com/voidbrain/FPVBuddy/blob/13a259d/docs/work/tasks/F-013-T01.json) already asks what replaces `roomId`. DOMAINS says the alert contract generalises when a second producer sends alerts | New coordination record "Producer-neutral alert contract" (Components nerv:F-122, nerv:F-101-T09, fpvbuddy:F-013, grover:F-008): one step writes the shape (key, level, message, since, optional scope, a serious/minor table per producer) in SOLUTION and proposes the nerv step that generalises the poller; the owner decides which side moves |
| 10 | 🪴 grover | Contract written on one side only: the key grammar and levels NERV classifies by (`probe:<id>:below/above`, `feed:<pot>` warn when refused and bad when stopped, `agent:<id>`) are in a code comment ([api.ts](https://github.com/voidbrain/Grover/blob/1d04cb7/packages/contracts/src/api.ts)) and NERV's decision page; Grover's [DESIGN.md "NERV"](https://github.com/voidbrain/Grover/blob/1d04cb7/docs/DESIGN.md#nerv) lists tool names only | New step grover:F-008-T04 "Write the alert contract for NERV": the shape, key grammar and level meaning in DESIGN.md, a test pinning them; a change to them names nerv:F-122 |
| 11 | 𖣂 nerv | Missing prerequisites: [F-101-T10](https://github.com/voidbrain/nerv/blob/353fe20/docs/work/tasks/F-101-T10.json) "starts only when [FPVBuddy's tools] exist" but `dependsOn` lacks fpvbuddy:F-009-T02, F-012-T01, F-012-T02, F-012-T03, F-014-T02, F-015-T05; F-101-T09 lacks fpvbuddy:F-013-T03; F-101-T08 lacks fpvbuddy:F-017-T03 (import report) and F-016-T03 (backup, its durability acceptance). FPVBuddy's writes take a request id for retries (fpvbuddy:F-012-T01) that T10 does not mention | Add those `dependsOn` entries; T10 gains "writes pass a request id so a retried call applies once" |
| 12 | 𖣂 nerv | Owner check shown ready too early: [F-122-T03](https://github.com/voidbrain/nerv/blob/353fe20/docs/work/tasks/F-122-T03.json) (a real alert on the rig) and F-123-T02 do not depend on the deployed hub (grover:F-005-T01, owner step); one observation also closes grover:F-008-T03 and solution:F-006-T02 | F-122-T03 depends on grover:F-005-T01 and names grover:F-008-T03 and solution:F-006-T02 as done together; F-123-T02 the same if its check needs the Pi |
| 13 | 𖣂 nerv | Duplicates bricks: NERV keeps its surface catalogue and renderer ([shared/surface.ts](https://github.com/voidbrain/nerv/blob/353fe20/shared/surface.ts), [surface-renderer.ts](https://github.com/voidbrain/nerv/blob/353fe20/web/src/surface-renderer.ts); F-130's inventory says "kept") while bricks ships the same four surfaces with the same contract; no recorded skip | A nerv:F-130 step renders chat surfaces with bricks' `bx-surface` and retires the renderer, or a recorded skip with its reason |
| 14 | 🏚️ openbando | Own design system ([design-system](https://github.com/voidbrain/openbando/tree/0e45030/design-system)), no bricks record and no recorded skip; bricks has no openbando inventory (F-006 to F-009 cover nerv, hobo, grover, fpvbuddy) | Record `Skip: bricks` with its reason, or open an adoption record (then bricks gets an openbando inventory). Recommended: the skip, since bricks adds components only on real demand |
| 15 | 🚁 fpvbuddy | Check first not done: [fpvbuddy:F-014-T01](https://github.com/voidbrain/FPVBuddy/blob/13a259d/docs/work/tasks/F-014-T01.json) copies NERV's Blackbox CSV analyzer into the core; openbando already parses Blackbox logs ([log-parser.ts](https://github.com/voidbrain/openbando/blob/0e45030/src/app/core/flight/log-parser.ts)). Not a blocks case: neither imports the other | T01 acceptance adds a comparison with openbando's parser, recording reuse or why not |
| 16 | 🪴 grover, 🗺️ hobo, 🧱 bricks, 🚦 coordinator | Never fully audited by manifest kind: only `scoped` reports (hobo and bricks: scoped baselines that checked all eight areas, 2026-11-25; grover and coordinator: baseline with delivery blocked plus a delivery report) | Each runs its next audit as `kind: full`, then turns `audit.enforce` on; for the coordinator, a step here |
| 17 | 𖣂 nerv, 🚁 fpvbuddy, 🤖 gauntlet-protocol | A full baseline exists but `audit.enforce` is off; nerv's last full (2026-11-20) is due 2026-11-27 | Each turns `audit.enforce` on in its `.harness.json`; nerv runs its full audit by 2026-11-27 |

## Audit cadence

Interval 7 days everywhere (`days` default). Dates are manifest `reviewed` dates; a report counts by its manifest `kind`, never its file name.

| Repository | Last full | Last any | Due or state | Enforce |
|---|---|---|---|---|
| 𖣂 nerv | 2026-11-20 | 2026-11-20 | due 2026-11-27 | off |
| 🤖 gauntlet-protocol | 2026-11-22 (file named "reconcile") | 2026-11-22 | due 2026-11-29 | off |
| 🦺 project-harness | 2026-11-22 | 2026-11-22 | due 2026-11-29 | on |
| 🚁 fpvbuddy | 2026-11-22 (file named "baseline") | 2026-11-22 | due 2026-11-29 | off |
| 🏚️ openbando | 2026-11-23 | 2026-11-23 | due 2026-11-30 | on |
| 🪴 grover | never | 2026-11-25 (scoped) | never fully audited | off |
| 🗺️ hobo | never | 2026-11-25 (scoped) | never fully audited | off |
| 🧱 bricks | never | 2026-11-25 (scoped) | never fully audited | off |
| 🚦 coordinator | never | 2026-11-25 (scoped) | never fully audited; `check:audits` fresh per area | off |

Correction to F-017's Issue (2026-11-26): fpvbuddy and gauntlet-protocol do have full audits by manifest kind; their file names say "baseline" and "reconcile". The checker validates the manifest, not whether the review behind it was full.

## False positives

| Mention | Why it is not a finding |
|---|---|
| nerv:F-101-T05 (cancelled) in fpvbuddy F-005, F-008, F-010, F-012 to F-017 and coordinator F-016, F-017 | Cited as the dated decision, not a dependency |
| fpvbuddy:F-008-T07 (closed) in nerv F-101, F-101-T06, T07, F-130 | Cited as the 2026-11-25 owner decision |
| project-harness:F-075 in nerv:F-101; project-harness:F-032 in openbando:F-039 | Archived items cited as history |
| coordinator F-006 citing nerv:F-122-T01, F-123-T01, grover:F-008-T02 (closed) | Evidence of delivered steps; F-006-T01's open prerequisites are grover:F-008-T03 and nerv:F-122-T02 |
| Gauntlet coverage of fpvbuddy, grover, hobo and openbando MCP tools and model features | No case or skip yet, but each is planned in solution:F-016-T04 to T07 (nerv in F-016-T03 and nerv:F-120) |
| Two Leaflet users (openbando, hobo) and two Blackbox readers (openbando, nerv moving to fpvbuddy) | Not a blocks case: no code is imported by two projects; covered as page corrections (6) and a check-first step (15) |

## Limits

Checks 1 to 3 read text: a dependency written without a `repo:ID`, or a decision made only in a conversation, is not seen. Record statuses were read from task files and archives at the revisions above; a step implemented on a branch not yet merged is not seen. Contracts were compared on paper and in code, not run end to end (that is solution:F-006 and nerv:F-122-T02's test). Gauntlet coverage was not inventoried per tool here; F-016-T03 to T07 do that. No full audit of any repository was performed.
