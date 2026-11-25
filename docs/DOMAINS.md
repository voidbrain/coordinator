# Domain map

What each project is made of, and which domains two or more projects share. Components and contracts are in [SOLUTION](SOLUTION.md); this page says where the code for a domain lives, so a session can see when two projects are about to write the same thing twice. Links point at each repository's `main`; the owning repository is authoritative.

## The rule for shared code

A shared package (for example `@voidbrain/geo` or a Blackbox log parser) is extracted only when two projects really share the code: both have it, or one has it and the other has a recorded step to build it. It is never designed upfront. Until then, a domain row below names who has it and who needs it, and nothing more.

When extraction is due, it is a coordination record in [this backlog](BACKLOG.md) with `Components` links; the package itself is built in the repository that owns it.

Where shared code goes: UI (tokens, themes, components, genUI surfaces) in 🧱 bricks (`voidbrain/bricks`, `@voidbrain/bricks`); shared domain logic in a separate monorepo, 🧊 blocks (`voidbrain/blocks`, npm workspaces, one package per domain such as `@voidbrain/geo` or `@voidbrain/blackbox`), created only when its first package is really shared (owner decision 2026-11-25). Bricks never holds domain logic, and blocks never holds UI.

## The rule for screens

Screens are owned by their project; NERV integrates via MCP: surface cards (🧱 bricks surfaces) and MCP Apps/links; no duplicate views (owner decision 2026-11-25).

- Each project builds its own screens with 🧱 bricks. NERV keeps no copy of another project's views.
- **Surface cards in chat**: the project's MCP tools return structured data with a surface type; NERV renders it with the matching 🧱 bricks surface component in NERV's theme.
- **Full screens**: an MCP Apps page the project's MCP server provides, which NERV displays, or a link to the project's own page.
- A view NERV already has for another project's domain retires once that domain's code has moved to the owning project.

## Projects

### 𖣂 nerv

| Module | Domain | Code |
|---|---|---|
| Runtime, planner and executors | Local agent runtime: Misato's planning, EVA jobs, routes, approvals | [runtime.ts](https://github.com/voidbrain/nerv/blob/main/src/runtime.ts), [misato.ts](https://github.com/voidbrain/nerv/blob/main/src/misato.ts), [eva-runner.ts](https://github.com/voidbrain/nerv/blob/main/src/eva-runner.ts) |
| Bases and nodes | Node lifecycle, pairing, coordinator lease and replication | [node-lifecycle.ts](https://github.com/voidbrain/nerv/blob/main/src/node-lifecycle.ts), [coordinator-serve.ts](https://github.com/voidbrain/nerv/blob/main/src/coordinator-serve.ts) |
| Storage and ledger | SQLite store, ledger, memory | [store.ts](https://github.com/voidbrain/nerv/blob/main/src/store.ts), [ledger.ts](https://github.com/voidbrain/nerv/blob/main/src/ledger.ts), [memory.ts](https://github.com/voidbrain/nerv/blob/main/src/memory.ts) |
| Integrations | MCP client (Grover's hub), Telegram, voice | [mcp.ts](https://github.com/voidbrain/nerv/blob/main/src/mcp.ts), [telegram.ts](https://github.com/voidbrain/nerv/blob/main/src/telegram.ts), [voice.ts](https://github.com/voidbrain/nerv/blob/main/src/voice.ts) |
| Packs | Cooking, 3D printing, FPV; pilots | [packs.ts](https://github.com/voidbrain/nerv/blob/main/src/packs.ts), [cooking-pack.ts](https://github.com/voidbrain/nerv/blob/main/src/cooking-pack.ts), [print-job.ts](https://github.com/voidbrain/nerv/blob/main/src/print-job.ts), [fpv-pack.ts](https://github.com/voidbrain/nerv/blob/main/src/fpv-pack.ts), [pilots.ts](https://github.com/voidbrain/nerv/blob/main/src/pilots.ts) |
| FPV pack | Fleet, batteries and battery health, builds, Blackbox vibration analysis | [fleet.ts](https://github.com/voidbrain/nerv/blob/main/src/fleet.ts), [batteries.ts](https://github.com/voidbrain/nerv/blob/main/src/batteries.ts), [battery-health.ts](https://github.com/voidbrain/nerv/blob/main/src/battery-health.ts), [fpv-builds.ts](https://github.com/voidbrain/nerv/blob/main/src/fpv-builds.ts), [blackbox.ts](https://github.com/voidbrain/nerv/blob/main/src/blackbox.ts) |
| Surfaces (genUI) | Surface catalogue and its renderer | [shared/surface.ts](https://github.com/voidbrain/nerv/blob/main/shared/surface.ts), [web/src/surface-renderer.ts](https://github.com/voidbrain/nerv/blob/main/web/src/surface-renderer.ts) |
| Dashboard | Web dashboard (Angular) | [web/src](https://github.com/voidbrain/nerv/tree/main/web/src) |
| macOS companion | Menu bar app | [native](https://github.com/voidbrain/nerv/tree/main/native) |
| Evaluations | Gauntlet packs | [evals/gauntlet](https://github.com/voidbrain/nerv/tree/main/evals/gauntlet) |

### 🤖 gauntlet-protocol

| Module | Domain | Code |
|---|---|---|
| Engine | Capability-scoped evaluation runs | [engine.ts](https://github.com/voidbrain/gauntlet-protocol/blob/main/src/engine.ts), [rubric.ts](https://github.com/voidbrain/gauntlet-protocol/blob/main/src/rubric.ts) |
| Evidence ledger | Run evidence and resource samples | [ledger.ts](https://github.com/voidbrain/gauntlet-protocol/blob/main/src/ledger.ts), [telemetry.ts](https://github.com/voidbrain/gauntlet-protocol/blob/main/src/telemetry.ts) (machine resources, not flight telemetry) |
| CLI | Command line | [bin](https://github.com/voidbrain/gauntlet-protocol/tree/main/bin) |

### 🦺 project-harness

| Module | Domain | Code |
|---|---|---|
| Core template | Rules, backlog tools, checks for every stack | [core](https://github.com/voidbrain/project-harness/tree/main/core) |
| Angular stack | Angular conventions, ESLint, Prettier, CI | [angular](https://github.com/voidbrain/project-harness/tree/main/angular) |
| Solution profile | Coordinator tools and dashboard | [solution](https://github.com/voidbrain/project-harness/tree/main/solution) |
| Skills | Shared agent skills | [skills](https://github.com/voidbrain/project-harness/tree/main/skills) |

### 🚁 fpvbuddy

| Module | Domain | Code |
|---|---|---|
| FPV core | Shared FPV logic package (`@fpvbuddy/fpv-core`, a stub today) | [src/fpv-core](https://github.com/voidbrain/FPVBuddy/tree/main/src/fpv-core) |
| Batteries | Battery views | [src/app/pages/batteries](https://github.com/voidbrain/FPVBuddy/tree/main/src/app/pages/batteries) |
| On-device models | Model loading and a vision worker | [model.service.ts](https://github.com/voidbrain/FPVBuddy/blob/main/src/app/services/model.service.ts), [vlm-worker.ts](https://github.com/voidbrain/FPVBuddy/blob/main/src/workers/vlm-worker.ts) |
| Shared UI | App shell and shared components | [src/app/shared](https://github.com/voidbrain/FPVBuddy/tree/main/src/app/shared) |

### 🪴 grover

| Module | Domain | Code |
|---|---|---|
| Hub | Plant cycle, alerts, MCP tool surface | [apps/hub](https://github.com/voidbrain/Grover/tree/main/apps/hub), [mcp.ts](https://github.com/voidbrain/Grover/blob/main/apps/hub/src/mcp.ts), [alerts.ts](https://github.com/voidbrain/Grover/blob/main/apps/hub/src/alerts.ts) |
| Pi agent | Sensors and actuators | [apps/agent](https://github.com/voidbrain/Grover/tree/main/apps/agent), [drivers](https://github.com/voidbrain/Grover/tree/main/apps/agent/src/drivers) |
| Client | Web client (Angular) | [apps/client](https://github.com/voidbrain/Grover/tree/main/apps/client) |
| Contracts | MQTT, API, dosing, lighting, calibration types | [packages/contracts](https://github.com/voidbrain/Grover/tree/main/packages/contracts/src) |

### 🏚️ openbando

| Module | Domain | Code |
|---|---|---|
| Geo and map | Leaflet map, calibration maths, satellite ground, elevation and terrain | [core/geo.ts](https://github.com/voidbrain/openbando/blob/main/src/app/core/geo.ts), [geo.service.ts](https://github.com/voidbrain/openbando/blob/main/src/app/services/geo.service.ts), [satellite.ts](https://github.com/voidbrain/openbando/blob/main/src/app/core/satellite.ts), [elevation.ts](https://github.com/voidbrain/openbando/blob/main/src/app/core/elevation.ts), [terrain.ts](https://github.com/voidbrain/openbando/blob/main/src/app/core/terrain.ts) |
| Flight and Blackbox | Betaflight Blackbox log parsing, flight analysis, replay, DVR sync, live link | [core/flight](https://github.com/voidbrain/openbando/tree/main/src/app/core/flight), [log-parse.worker.ts](https://github.com/voidbrain/openbando/blob/main/src/app/services/log-parse.worker.ts), [core/sync](https://github.com/voidbrain/openbando/tree/main/src/app/core/sync), [core/live](https://github.com/voidbrain/openbando/tree/main/src/app/core/live), [drawing/blackbox.ts](https://github.com/voidbrain/openbando/blob/main/src/app/core/drawing/blackbox.ts) |
| 3D scene | Three.js scene, site model, drone rig, path and race rendering | [src/app/three](https://github.com/voidbrain/openbando/tree/main/src/app/three) |
| Building | Bando blocks, elements, layers, studio editor, AI blocks | [blocks.ts](https://github.com/voidbrain/openbando/blob/main/src/app/core/blocks.ts), [ui/studio](https://github.com/voidbrain/openbando/tree/main/src/app/ui/studio), [ai-blocks.ts](https://github.com/voidbrain/openbando/blob/main/src/app/core/ai-blocks.ts), [library](https://github.com/voidbrain/openbando/tree/main/library) |
| Simulator and radio | Drone physics, collider, radio input, racing | [core/sim](https://github.com/voidbrain/openbando/tree/main/src/app/core/sim), [core/radio](https://github.com/voidbrain/openbando/tree/main/src/app/core/radio), [core/racing](https://github.com/voidbrain/openbando/tree/main/src/app/core/racing) |
| Share and storage | Sharing with or without the address, backup, state stores | [share.ts](https://github.com/voidbrain/openbando/blob/main/src/app/core/share.ts), [backup.ts](https://github.com/voidbrain/openbando/blob/main/src/app/core/backup.ts), [src/app/state](https://github.com/voidbrain/openbando/tree/main/src/app/state) |
| Design system | Tokens and components | [design-system](https://github.com/voidbrain/openbando/tree/main/design-system) |

### 🗺️ hobo (planned)

Not a component yet; its modules are listed here once its repository exists.

### 🧱 bricks

| Module | Domain | Code |
|---|---|---|
| Tokens and themes | Design tokens in three layers; themes base, plain (neutral) and eva (NERV's EVA look) | [styles](https://github.com/voidbrain/bricks/tree/main/projects/bricks/styles), [tokens](https://github.com/voidbrain/bricks/tree/main/projects/bricks/tokens), [themes](https://github.com/voidbrain/bricks/tree/main/projects/bricks/themes) |
| UI components and genUI surfaces | `bx-card`, `bx-badge`; nerv's four surface cards with the same contract, and `bx-surface` | [components](https://github.com/voidbrain/bricks/tree/main/projects/bricks/components), [surfaces](https://github.com/voidbrain/bricks/tree/main/projects/bricks/surfaces) |

## Shared domains

"Has" means the code exists on `main`; "needs" means a recorded or planned need; "idea" means nothing is recorded yet. A domain shared by two projects that both have code is a candidate for extraction under the rule above, not before.

| Domain | Has | Needs or plans | Extraction |
|---|---|---|---|
| Maps and geo | 🏚️ openbando: Leaflet, calibration maths in [core/geo.ts](https://github.com/voidbrain/openbando/blob/main/src/app/core/geo.ts) | 🗺️ hobo (planned); an M5 FPV compass (idea; openbando's [camera-compass.ts](https://github.com/voidbrain/openbando/blob/main/src/app/core/drawing/camera-compass.ts) is the nearest code) | Not yet: one project has code |
| Routing and places | — | 🗺️ hobo (planned) | Not yet |
| Telemetry and Blackbox | 🏚️ openbando: log parser, analysis, replay ([core/flight](https://github.com/voidbrain/openbando/tree/main/src/app/core/flight)); 𖣂 nerv FPV pack: vibration analysis ([blackbox.ts](https://github.com/voidbrain/nerv/blob/main/src/blackbox.ts)) | 🚁 fpvbuddy | Candidate: two projects read Blackbox logs; compare the parsers before proposing a shared one |
| 3D (three.js) | 🏚️ openbando ([src/app/three](https://github.com/voidbrain/openbando/tree/main/src/app/three)) | — | Not yet |
| UI components and genUI surfaces | 𖣂 nerv: [shared/surface.ts](https://github.com/voidbrain/nerv/blob/main/shared/surface.ts) catalogue (`nerv-status-card`, `nerv-notice-card`, `nerv-checklist-card`, `nerv-recipe-card`), rendered by [web/src/surface-renderer.ts](https://github.com/voidbrain/nerv/blob/main/web/src/surface-renderer.ts); 🧱 bricks: tokens, themes base/plain/eva and the same four surfaces as Angular components ([projects/bricks](https://github.com/voidbrain/bricks/tree/main/projects/bricks), first content 2026-11-25, unpublished); 🏚️ openbando [design-system](https://github.com/voidbrain/openbando/tree/main/design-system) | Consumers nerv (nerv:F-130), hobo, grover and fpvbuddy | 🧱 bricks, started early at the owner's request ([coordinator:F-012](BACKLOG.md#f-012)); components added only on real demand |
| Fleet, batteries and crashes | 𖣂 nerv FPV pack ([fleet.ts](https://github.com/voidbrain/nerv/blob/main/src/fleet.ts), [batteries.ts](https://github.com/voidbrain/nerv/blob/main/src/batteries.ts)); 🚁 fpvbuddy battery views | Moves from nerv's FPV pack to 🚁 fpvbuddy | A move, not a shared package; the battery and fleet views live in 🚁 fpvbuddy and nerv's FPV pack views retire once the core moves (nerv:F-101-T04; rule for screens above) |

## Keeping it current

A session that adds a component, or a module that owns a domain, updates this page in the same change. The [gap review](agents/gap-review.md) reads it: a domain whose Has column gains a second project is reported as an extraction candidate.
