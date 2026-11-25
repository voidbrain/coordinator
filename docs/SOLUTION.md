# voidbrain solution

This repository owns solution outcomes, shared contracts and integration acceptance. Components own implementation and their own backlogs. The [manifest](../.solution.json) names sources; the [solution backlog](BACKLOG.md) owns integration status; [solution-profile guidance](agents/solution-profile.md) defines aggregation. The [dashboard](SOLUTION-DASHBOARD.md) is generated evidence, not an editable second ledger.

## Components and contracts

| ID | Repository | Owns | Meets other components through |
|---|---|---|---|
| `nerv` | [voidbrain/nerv](https://github.com/voidbrain/nerv) | NERV Agency: local agent runtime, bases and nodes, dashboard, companion, packs | MCP client of Grover's hub; runs its own Gauntlet packs (`evals/gauntlet/`) with the vendored gauntlet-protocol package; harness consumer |
| `gauntlet-protocol` | [voidbrain/gauntlet-protocol](https://github.com/voidbrain/gauntlet-protocol) | Capability-scoped AI evaluation library and CLI, packs and evidence ledger | Its library, CLI, pack and ledger formats, vendored by NERV as a release tarball; harness consumer |
| `project-harness` | [voidbrain/project-harness](https://github.com/voidbrain/project-harness) | The reusable harness template: rules, backlog tools, solution profile | Releases (tags `vX.Y.Z`) each component reconciles to; it never depends on them |
| `fpvbuddy` | [voidbrain/FPVBuddy](https://github.com/voidbrain/FPVBuddy) | FPV companion app (Angular) | No contract recorded yet; harness consumer |
| `openbando` | [voidbrain/openbando](https://github.com/voidbrain/openbando) | OpenBando: browser app (Angular, Three.js, Leaflet) to build abandoned places in 3D from the map, replay real FPV flights from Betaflight Blackbox logs and DVR, fly a simulator and share | No contract recorded yet; harness consumer |
| `grover` | [voidbrain/Grover](https://github.com/voidbrain/Grover) | Grow-tent controller: hub, Pi agent, client | MCP tool surface used by NERV, alerts included (`grover_alerts`; tool table in Grover's `docs/DESIGN.md`, "NERV"); harness consumer |
| `hobo` | [voidbrain/hobo](https://github.com/voidbrain/hobo) | Hobo: trip planner (Angular, Leaflet, OpenRouteService): places, trips, routes and variants | Planned MCP surface for NERV (places, trips, route totals; hobo:F-011); maps/geo a candidate shared package with openbando (hobo:F-012); shared UI from bricks (solution:F-012); harness consumer |
| `bricks` | [voidbrain/bricks](https://github.com/voidbrain/bricks) | 🧱 Bricks: shared Angular UI library `@voidbrain/bricks` (Angular 22): tokens (primitive → semantic → component), themes (base, plain, eva), foundations, components, patterns and the genUI surface catalogue. UI only: no domain logic, maps or routing | Its package, consumed by nerv, hobo, grover and fpvbuddy (solution:F-012); the genUI contract keeps nerv's `shared/surface.ts` version 1 (component ids, schemas, validation); published on public npm with trusted publishing (bricks:F-004, not yet); harness consumer |

Which domains each component covers, and which ones two or more share, is in the [domain map](DOMAINS.md).

Contracts are owned by the component that publishes them; this table links, it does not copy. A change to a published surface is announced in the publisher's backlog and, when a consumer must follow, recorded here as a coordination record with `Components` links.

### Version compatibility

| Consumer | Depends on | Pinned by |
|---|---|---|
| Every component | project-harness release | `version` in its `.harness.json` (nerv 10.7.0, gauntlet-protocol 10.9.0, fpvbuddy 10.3.0, grover 10.9.0 on 2026-11-24, openbando 10.8.1 on 2026-11-25, hobo 10.21.3 on 2026-11-25) |
| nerv | Grover hub MCP tools | Grover's MCP tool names and `PROTOCOL_VERSION` (MQTT, inside Grover) |
| nerv | gauntlet-protocol | the vendored package `@voidbrain/gauntlet-protocol` in nerv's `package.json` (0.9.1 on 2026-11-24), used by `tools/gauntlet.mjs` |

The pinned values above are a dated reading, not live status; the owning repositories are authoritative.

## Integration acceptance

| Join | Observable check | Where it can run |
|---|---|---|
| NERV ↔ Grover | NERV lists Grover's MCP tools and reads `grover_overview` from a running hub | A base with network access to the hub (Tailscale) |
| NERV ↔ gauntlet-protocol | A Gauntlet run of NERV's pack completes and its ledger entry is recorded | A NERV base with the Gauntlet installed |
| Harness ↔ components | Each component's `check:freshness` reports its template release with no conflicts | Each component's CI |

Component CI is evidence for its own scope. The solution may wait for component releases before verifying integration; it never holds an independently complete component record open.

## Work tracking

Use ordinary B-/F- IDs in this repository's backlog. A solution record's Issue, next action and closure describe coordination, contracts or integration owned here. Add `| Components | nerv:F-120, grover:F-008 |` to its metadata table to link implementation work, with exact manifest IDs. A component may link back using a `Solution` metadata field; do not copy statuses or histories between ledgers.

The owner steers across repositories with the [solution order](solution-order.md). A component step that needs another repository's step names it as `repo:ID` in its Depends on (owner decision 2026-11-24: every project uses step-level dependencies); in this repository a step's `dependsOn` takes `repo:STEP-ID`; prose such as "waits on repo:ID" is not read. The views are refreshed hourly as a PR (F-008; hourly since the owner decision of 2026-11-25, B-004), and a run that changes only the snapshot time or this repository's own revision opens none. Run `npm run solution:refresh` to regenerate the dashboard from GitHub (it reads each component's `main` at one resolved commit) and drop Done order items. `npm run check:solution` reads local checkouts instead. Commit the views only after reviewing their revisions and problems. A failed source stays Unknown and the command exits non-zero, even when a partial view is written.

## MCP and execution environments

Use [MCP guidance](agents/mcp.md). No MCP selection is recorded for the coordinator: it needs only `git`, `gh` and Node. A shared recommendation does not grant every agent access to every component or device.
