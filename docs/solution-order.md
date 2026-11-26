# Solution order

The owner's order of work across all repositories: one reference per line, top = next. It holds references only; each item's status, readiness and blockers come from its own backlog and show in the [dashboard](SOLUTION-DASHBOARD.md) after `npm run solution:refresh`.

## Rules

- Agents take the first item that is ready and unblocked (State Ready, marked ▶ in the dashboard). <!-- project -->
- Work not listed here follows each repository's own priority. <!-- project -->
- Reordering is an owner instruction, landed as a small PR that changes only this list. <!-- project -->
- The order never skips a prerequisite or an owner decision: an item waiting on either is passed over until it is ready, not forced. <!-- project -->
- Ready comes from each component's own markup: ⏳ and 🧑 cells, Depends on and the record's status in a generated ledger; only the status and the "Human action required" line in an authored four-column backlog, which has no Depends on, so such a record can show Ready while it waits on something written only in its prose. Before starting an item, read its record and check its prerequisites there. <!-- project -->
- An item may be ordered before its record merges: its note starts with "pending: <where it is>", and the note goes when the record lands. <!-- project -->
- Format: the template's (harness 10.12.1, F-004-T02), one `N. repo:ID — note` per line between the order markers, numbered from 1; `.solution.json` names this file in `order`, and `node tools/solution.mjs check` validates it (CI runs it offline for the format; `npm run check:solution` also checks each reference on GitHub). <!-- project -->
- References only (`repo:ID`, a record or a step such as `nerv:F-005-T29`; this repository's own records are `solution:F-002`, as the template names it), with an optional short note on why it sits here; no status. A closed or archived item is removed in the next reorder or refresh PR. <!-- project -->

## Order

Set by the owner on 2026-11-24 (F-002): the proposed order kept as 1–17, `grover:F-005` removed for now, and the day's new work appended. Reordered on the owner's instruction of 2026-11-25: items whose next open work is agent work first, then items whose next step is the owner's, each group in its previous relative order. Items whose note starts with "pending" are ordered but their record has not merged yet; they show as Pending until it does, and the note is removed then. 2026-11-26: solution:F-016 added at 7 on the owner's instruction. 2026-11-26: solution:F-017 added at 8 on the owner's instruction. 2026-11-26: solution:F-020 added after solution:F-017 on the owner's instruction.

<!-- order:start -->
1. nerv:F-016 — relocate the coordinator without split brain (after B-124)
2. nerv:B-091 — prerequisite of nerv:F-005-T29
3. nerv:F-005 — remote workers (after B-091)
4. grover:F-008 — alerts NERV can deliver (cross-repository)
5. nerv:F-120 — Gauntlet coverage of NERV capabilities (cross-repository)
6. solution:F-020 — coherence review: docs and procedures consistent and clear; freeze on new procedures until done
7. nerv:F-122 — Grover alert delivery, unblocks grover:F-008
8. nerv:F-123 — MCP connection to Grover's hub
9. nerv:F-121 — printed parts per drone, print by chat
10. grover:F-011 — implemented P1 feed cycle; owner try-out pending
11. grover:F-004 — implemented P1 probe calibration
12. nerv:F-006 — orchestration across nodes (after B-119)
13. grover:F-003 — hardware bring-up on the Pi (P1, needs the device)
<!-- order:end -->
