# Proposal for the harness template: cross-reference and audit-cadence gap kinds

Written 2026-11-26 in voidbrain/coordinator (`coordinator:F-017-T03`) for the owner to take to a project-harness session. Nothing here changes the template. The template's own session decides, records and releases. Until a release adopts it, the coordinator runs checks 1 and 5 of its [cross-project audit](../agents/cross-project-audit.md) by hand.

## Problem

The first cross-project audit ([2026-11-26](../audits/2026-11-26-cross-project.md)) found by hand what the solution tool (`tools/solution.mjs`, from the solution profile) could have reported on every refresh. What the dashboard already covers, and what it misses:

| Check | Already in the dashboard (10.21.4) | Missed on 2026-11-26 |
|---|---|---|
| 1. Cross-references | "Prerequisite missing or unknown"; "Waits on work that is done", only when **every** prerequisite of a waiting step is done | coordinator:F-007-T01 waited on nerv:F-120-T01, T02 and T03; T01 and T03 were closed, T02 open, so no gap fired and nothing said to record the two in `externalMet` (proposal 4). A `dependsOn` on a **cancelled** step reads as an unfinished prerequisite, not as stale (nerv:F-101-T05 was cited this way). A wait written only in prose ("waits on bricks being published", hobo:F-010-T02; the order note on fpvbuddy:F-005) is not read (proposals 3, 5) |
| 5. Audit cadence | "Audits, reviews and harness": last audit, "no complete full audit", next date per project | No numbered gap, so nothing is proposed to the owning repository; `audit.enforce` is not shown, so "a full baseline exists but enforce is off" (nerv, fpvbuddy, gauntlet-protocol; proposal 17) and "never fully audited" (grover, hobo, bricks, the coordinator; proposal 16) are read off the table by hand |

## Proposed generic feature

Three gap kinds, numbered with the others, each naming the repository that owns the fix. Nothing names a particular project.

1. **Prerequisite met but not recorded** (replaces the all-or-nothing case of "Waits on work that is done"): per prerequisite of another repository that is done and not in the waiting step's `externalMet`, whatever the state of its other prerequisites. Proposal: `<repo>: record <dep> in externalMet on <step>`.
2. **Depends on cancelled work**: a `dependsOn` or Depends on naming an item whose status is cancelled (or a closed record whose resolution says cancelled). Proposal: `<repo>: give <step> a new prerequisite, or cancel it`.
3. **Audit cadence**: from the data `projectHealth` already reads, plus `audit.enforce` from `.harness.json`:
   - *never fully audited* (no manifest of `kind: full` with no blocked area): proposal "run the next audit as kind full";
   - *full audit overdue* (last full older than `audit.days`): proposal "run the full audit";
   - *full audit exists, enforce off*: proposal "turn `audit.enforce` on".

   The "Audits, reviews and harness" table gains `enforce on` or `enforce off` in its Last audit cell.

Optional, as a text heuristic like the cross-repository kind (a prompt to check, never proof): a sentence in an open record's Next action or Check, or in the solution order's note, that names a `repo:ID` together with a waiting word (waits, after, blocked by) where that item is done or cancelled. Proposal: the owning repository rewrites the wait.

Left to the hand check: **delivered but still open** (another repository's PR delivered the work while its step stays open, fpvbuddy:F-005 and nerv:F-101-T04 on 2026-11-26). It needs reading PRs and code, not backlogs.

## Acceptance (for the template's session to refine)

- A fixture solution in the solution profile's tests produces each new kind once: a step with one of two external prerequisites done and unrecorded; a step depending on a cancelled step; components with no full audit, an overdue full audit, and a full audit with `enforce` off. A component with a current full audit and `enforce` on produces none.
- The existing kinds keep their results on the existing fixtures ("Waits on work that is done" still fires when every prerequisite is done).
- Nothing is required of a component that declares no `audit` settings: the defaults (`days` 7, `enforce` off) apply and the gap reads as a proposal, not a failure.
