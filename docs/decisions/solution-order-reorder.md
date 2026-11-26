# How a reorder becomes a reviewed PR (decision)

Owner decision, 2026-11-27 ~00:10 CET, in chat ("ok" to the recommendation): **(b) NERV opens the reorder PR**, using its existing PR tool behind an approval card (the owner approves the new order). The coordinator's live index stays read-only (F-024: the index never writes a record). Decided before the options page was written, so this note records the choice and its guard rails, not a comparison.

## Write path

1. NERV's live index card (nerv:F-150) sends the ordered list of references and the base it loaded.
2. NERV shows an approval card with the new order; the owner approves.
3. NERV opens a PR changing `docs/solution-order.md` with its existing PR tool. The owner reviews and merges it; neither NERV nor the coordinator merges it.

## Guard rails

- Reject an unknown or duplicated item, and a stale list (the list changed since the card loaded it), with a message the card can show.
- Change only the numbered lines between the order markers; keep each note; the result passes `node tools/solution.mjs check`.
- Open a PR, never write `main`, never merge.

Recorded in F-025-T01 (this note) and F-025-T02 (the decision). T03 builds the validated rewrite the PR carries; T04 is the owner's try.
