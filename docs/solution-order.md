# Solution order

The owner's order of work across all repositories: one reference per line, top = next. It holds references only; each item's status, readiness and blockers come from its own backlog and show in the [overview](SOLUTION-OVERVIEW.md) after `npm run solution:refresh`.

## Rules

- Agents take the first item that is ready and unblocked (State Ready, marked ▶ in the overview). <!-- project -->
- Work not listed here follows each repository's own priority. <!-- project -->
- Reordering is an owner instruction, landed as a small PR that changes only this list. <!-- project -->
- The order never skips a prerequisite or an owner decision: an item waiting on either is passed over until it is ready, not forced. <!-- project -->
- Ready comes from each component's own markup: ⏳ and 🧑 cells, Depends on and the record's status in a generated ledger; only the status and the "Human action required" line in an authored four-column backlog, which has no Depends on, so such a record can show Ready while it waits on something written only in its prose. Before starting an item, read its record and check its prerequisites there. <!-- project -->
- References only (`repo:ID`, a record or a step such as `nerv:F-005-T29`), with an optional short note on why it sits here; no status. A closed or archived item is removed in the next reorder or refresh PR. <!-- project -->

## Order

Proposal of 2026-11-24, seeded from the components' open P1 and P2 work, prerequisites before what they unlock, for the owner to reorder.

<!-- order:start -->
1. `nerv:B-118` — Windows CI limit: every NERV PR waits on it
2. `nerv:B-121` — implemented P1; its verification unlocks B-124
3. `nerv:B-124` — re-target fences the running main too early (P1, relocation safety)
4. `nerv:B-125` — replayable signed Kaji reply (P2, security)
5. `grover:B-005` — implemented P1; closes on CI
6. `grover:F-011` — implemented P1 feed cycle; owner try-out pending
7. `grover:F-004` — implemented P1 probe calibration
8. `nerv:F-016` — relocate the coordinator without split brain (after B-124)
9. `nerv:B-091` — prerequisite of nerv:F-005-T29
10. `nerv:F-005` — remote workers (after B-091)
11. `nerv:B-119` — prerequisite of nerv:F-006
12. `nerv:F-006` — orchestration across nodes (after B-119)
13. `nerv:F-021` — MCP protocol, 0.25 h left
14. `nerv:B-082` — Windows logon task from SSH, 0.25 h left
15. `grover:F-003` — hardware bring-up on the Pi (P1, needs the device)
16. `grover:F-008` — alerts NERV can deliver (cross-repository)
17. `nerv:F-120` — Gauntlet coverage of NERV capabilities (cross-repository)
18. `grover:F-005` — deploy hub and agent on the Pi
<!-- order:end -->
