# Gauntlet inventory: hobo

Step [solution:F-016-T06](../../work/tasks/F-016-T06.json). hobo at `origin/main` `735e8af`. hobo has no `evals/gauntlet/` directory and does not pin gauntlet-protocol.

## What is model-facing

hobo calls no model: places, trips, route totals, what-if comparisons and the routing providers are deterministic code (`src/app/core/route-totals.ts`, `src/app/core/trip.ts`, `server/ors-provider.ts`, `server/osrm-provider.ts`). Its model-facing surface is the planned MCP server on the local service, hobo:F-011 (`list_places`, `get_trip`, `trip_totals`, read-only; F-011-T01 the endpoint, F-011-T02 the owner's check from NERV's chat), which NERV's models call (nerv:F-131-T03). A planned future alert producer (departures, [Distributed contracts](../../DOMAINS.md#distributed-contracts)) is deterministic too.

## Capabilities and their mapping

| Capability | Mapping |
|---|---|
| Choosing `list_places`, `get_trip` or `trip_totals` and its scope (a day, selected days, the whole trip), EN and IT | **hobo-v1** (proposal 1). tool-use-v1 tests the format with invented tools only |
| Answering from a `trip_totals` payload: km and minutes of a day or a leg, exactly as returned | **hobo-v1**, exact-json |
| Arrival or departure times from a start time and the totals ("leaving at 08:30, when do we reach the third stop?") | **scheduling-time-v1** (gauntlet-protocol:F-023, planned) for the date and time arithmetic; hobo-v1 cases put the trip's own numbers in the prompt. This is the scheduling-time gap gauntlet-protocol:F-022 closed with F-023 |
| Route totals, what-if, providers, leg cache | **Skip**: deterministic, tested against hand calculations and fixtures |
| Google place data (hobo:F-014), self-hosted routing (hobo:F-013) | **Skip**: no model |

## Proposals

| # | Repo | Record or step to create | Estimate |
|---|---|---|---|
| 1 | 🗺️ hobo | **hobo:F-011-T03** (next free step), "Gauntlet cases for the MCP tools (hobo-v1)". Check: `evals/gauntlet/hobo-v1.json`, model layer, regression and holdout splits, EN and IT, exact-json, invented places and trips; tool choice and scope, answers from a `trip_totals` payload, and arrival times from a start time; `gauntlet validate` in CI from a pinned devDependency; a test that every tool a case names is registered by the F-011-T01 endpoint; the skips above recorded in `docs/DESIGN.md`. Depends on F-011-T01. NERV runs it: [nerv](gauntlet-nerv.md) proposal 3 | 1.75 h agent |

A step of hobo:F-011 rather than a new record: the three tools are small, and their cases belong with the endpoint that adds them.
