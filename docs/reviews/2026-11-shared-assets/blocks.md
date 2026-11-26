# Blocks: shared-logic inventory

Step [solution:F-016-T08](../../work/tasks/F-016-T08.json). Is 🧊 blocks due, and with which package? hobo at `735e8af`, openbando at `c18cfd1`, read in code under the [blocks criterion](../../DOMAINS.md#the-blocks-criterion): code imported by two or more projects.

## Verdict: not yet

No geo or routing function exists in both projects that both would import today. Do not create `voidbrain/blocks` yet. The two projects work at different scales on different problems: hobo routes between places across a trip; openbando projects a single site between degrees and local metres. The only real overlap is address geocoding, and it is not shared code yet (below).

## Evidence: the maps domain, function by function

| Concern | 🗺️ hobo | 🏚️ openbando | Shared? |
|---|---|---|---|
| Map rendering | Leaflet markers and route lines, `src/app/maps/map-view.ts:11, 83-181` | Leaflet editor with street and satellite tiles, `src/app/ui/studio/bando-editor.ts:20, 1602-1701` | No. Both use the `leaflet` library (`^1.9.4`) directly with different layers; a wrapper would add code, not remove it |
| Routing, matrix, travel profiles, leg cache | `src/app/maps/map-provider.ts` (`MapProvider`, `cachedMapProvider`, request validation), `server/ors-provider.ts`, `server/osrm-provider.ts` | None | hobo only |
| Route totals, trips, places | `src/app/core/route-totals.ts`, `trip.ts`, `place.ts` | None | hobo only |
| Projection between degrees and local metres, calibration solve, rotation, course | None | `src/app/core/geo.ts:6-130` (`toLocalAt`, `toGeoAt`, `solveCalibration`, `courseDegrees`, `rotateCalibrationAbout`) | openbando only |
| Coordinates typed by a person (decimal or degrees, minutes, seconds) | None (hobo parses provider `[lng, lat]` pairs, `server/ors-provider.ts:57`, `server/osrm-provider.ts:55`) | `parseLatLon`, `geo.ts:134` | openbando only |
| Address geocoding | Through the provider adapter on the server: OpenRouteService `/geocode/search` (`server/ors-provider.ts:439`); Nominatim or Photon planned later (hobo:F-013) | In the browser: Nominatim with its one-request-a-second policy (`src/app/services/geo.service.ts:64-74`) and coarser fallback queries (`coarserQueries`, `geo.ts:170`) | **Not yet**: different services and different sides (server and browser). The candidate once hobo:F-013 adds a Nominatim geocoder |
| Building footprints, satellite ground, elevation, terrain | None | Overpass footprints (`geo.service.ts:57`), `satellite.ts`, `elevation.ts`, `terrain.ts` | openbando only |
| The point type | `GeoPoint {lat, lng}` (`place.ts:6`) and `MapPoint {lat, lng}` (`map-provider.ts:6`) | `GeoPoint {lat, lon}` (`models.ts:16`) | Same idea, different field names; not worth a package on its own |

**Trigger to revisit.** When hobo:F-013 implements a Nominatim (or Photon) geocoder, compare it with openbando's `geo.service.ts` geocode and `coarserQueries`. If both would import the same client, a first `geo` package in blocks could hold: the Nominatim client with its rate policy, query coarsening, `parseLatLon`, and one point type (with the `lng`/`lon` naming settled). That comparison is the hobo:F-013 session's, through a coordination record here.

## The other candidates, as recorded

- **FPV battery core** (fpvbuddy:F-005, `@fpvbuddy/fpv-core`): fpvbuddy's own package, not a blocks candidate. Owner decision 2026-11-26: NERV never imports the FPV core (nerv:F-101-T05 cancelled); nerv's FPV data moves to fpvbuddy behind its MCP server (nerv:F-101-T08) and NERV reaches it over MCP only.
- **Alert contract** (grover:F-008, nerv:F-122, fpvbuddy:F-013): a distributed contract in prose (`alerts/1`, [SOLUTION](../../SOLUTION.md#alert-contract)). It becomes a blocks contracts package only once producer and consumer import shared TypeScript types or validators; today Grover checks its own shape (`apps/hub/test/alert-contract.test.ts`) and nothing is imported across repositories.
- **Telemetry and Blackbox**: openbando's parser and fpvbuddy:F-014's analyzer read the same logs, but neither imports the other's code; unchanged, as the [shared domains](../../DOMAINS.md#shared-domains) table says.
- **openbando's own blocks** (`src/app/core/blocks.ts`, Bando building blocks: reusable 3D pieces of a site) are unrelated to 🧊 blocks.

## Domain map corrections (made in this change)

- Shared domains, "Maps and geo": hobo's `src/app/maps` also holds the routing provider interface, the leg cache and request validation, and both projects geocode addresses (hobo through its server, openbando in the browser); the Extraction column now gives this verdict and its trigger.
- openbando's module table: the site-edit assistant (`ai-commands.ts`, `ai-prompt.ts`, `ai-server.ts`, `ai.service.ts`) was missing; it is the project's model-facing module ([openbando inventory](gauntlet-openbando.md)).

## Proposals

| # | Repo | Record or step | Estimate |
|---|---|---|---|
| 1 | 🗺️ hobo | **hobo:F-012-T01** (exists), "Compare and propose": close it with this page as the comparison and its reason ("nothing both projects would import today"), and add the trigger above to hobo:F-013's Check, as its own acceptance asks ("If nothing would be imported by both, close the step with the reason") | 0.25 h agent |
| 2 | 🗺️ hobo | **New B record or a step of the owning feature (hobo:F-007)**, "One `[lng, lat]` pair parser for both routing providers". Issue: `parseLngLatPair` is written twice, in `server/ors-provider.ts:57` and `server/osrm-provider.ts:55`, and `GeoPoint` and `MapPoint` are two names for one shape. Inside one project, so the [rule for shared code](../../DOMAINS.md#the-rule-for-shared-code) applies, not blocks. Check: one parser and one point type, the providers' fixture tests unchanged | 0.5 h agent |

No coordinator record is proposed to create blocks: the criterion is not met.
