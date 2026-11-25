# Solution order

The owner's order of work across all repositories: one reference per line, top = next. It holds references only; each item's status, readiness and blockers come from its own backlog and show in the [overview](SOLUTION-OVERVIEW.md) after `npm run solution:refresh`.

## Rules

- Agents take the first item that is ready and unblocked (State Ready, marked ▶ in the overview). <!-- project -->
- Work not listed here follows each repository's own priority. <!-- project -->
- Reordering is an owner instruction, landed as a small PR that changes only this list. <!-- project -->
- The order never skips a prerequisite or an owner decision: an item waiting on either is passed over until it is ready, not forced. <!-- project -->
- Ready comes from each component's own markup: ⏳ and 🧑 cells, Depends on and the record's status in a generated ledger; only the status and the "Human action required" line in an authored four-column backlog, which has no Depends on, so such a record can show Ready while it waits on something written only in its prose. Before starting an item, read its record and check its prerequisites there. <!-- project -->
- An item may be ordered before its record merges: its note starts with "pending: <where it is>", and the note goes when the record lands. <!-- project -->
- Format: the template's (harness 10.12.1, F-004-T02), one `N. repo:ID — note` per line between the order markers, numbered from 1; `.solution.json` names this file in `order`, and `node tools/solution.mjs check` and `npm run check:order` both validate it. <!-- project -->
- References only (`repo:ID`, a record or a step such as `nerv:F-005-T29`; this repository's own records are `solution:F-002`, as the template names it), with an optional short note on why it sits here; no status. A closed or archived item is removed in the next reorder or refresh PR. <!-- project -->

## Order

Set by the owner on 2026-11-24 (F-002): the proposed order kept as 1–17, `grover:F-005` removed for now, and the day's new work appended. Reordered on the owner's instruction of 2026-11-25: items whose next open work is agent work first, then items whose next step is the owner's, each group in its previous relative order. Items whose note starts with "pending" are ordered but their record has not merged yet; they show as Pending until it does, and the note is removed then.

<!-- order:start -->
1. nerv:B-118 — Windows CI limit: every NERV PR waits on it
2. nerv:B-124 — re-target fences the running main too early (P1, relocation safety)
3. nerv:B-125 — replayable signed Kaji reply (P2, security)
4. nerv:F-016 — relocate the coordinator without split brain (after B-124)
5. nerv:B-091 — prerequisite of nerv:F-005-T29
6. nerv:F-005 — remote workers (after B-091)
7. nerv:B-119 — prerequisite of nerv:F-006
8. nerv:B-082 — Windows logon task from SSH, 0.25 h left
9. grover:F-008 — alerts NERV can deliver (cross-repository)
10. nerv:F-120 — Gauntlet coverage of NERV capabilities (cross-repository)
11. nerv:F-122 — Grover alert delivery, unblocks grover:F-008
12. nerv:F-123 — MCP connection to Grover's hub
13. fpvbuddy:F-005 — M1 FPV battery core; T02 waits on nerv:F-101-T04
14. nerv:F-121 — printed parts per drone, print by chat
15. gauntlet-protocol:F-018 — italian-quality-v1 pack
16. gauntlet-protocol:F-019 — cad-3d-v1 pack
17. gauntlet-protocol:F-020 — code-review-v1 pack
18. grover:F-011 — implemented P1 feed cycle; owner try-out pending
19. grover:F-004 — implemented P1 probe calibration
20. nerv:F-006 — orchestration across nodes (after B-119)
21. grover:F-003 — hardware bring-up on the Pi (P1, needs the device)
<!-- order:end -->
