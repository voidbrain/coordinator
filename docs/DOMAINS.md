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

## Shared assets

The solution has three shared assets. The same three rules hold for each: who owns what, check the asset first, and record a deliberate skip. The [rule for shared code](#the-rule-for-shared-code) and the [rule for screens](#the-rule-for-screens) above still apply; this section does not restate them.

| Asset | Holds | The owning project | The shared repository | The consumer | Model-facing |
|---|---|---|---|---|---|
| 🧱 bricks (`voidbrain/bricks`) | UI: tokens, themes, components, genUI surfaces and their surface types | Builds its own screens with bricks and keeps them (rule for screens) | Tokens, themes, components and surfaces that two or more projects use; components added only on real demand | Pins `@voidbrain/bricks` and renders with it in its own theme (NERV renders other projects' surface cards with it) | No |
| 🧊 blocks (`voidbrain/blocks`) | Shared domain logic, one package per domain, and typed contract code; the repository is created with its first really shared package | Keeps its domain logic until a second project imports it | Packages imported by two or more projects (criterion below) | Pins and imports the package | No |
| 🤖 Gauntlet (`voidbrain/gauntlet-protocol`) | Model qualification | Writes its own domain cases in its repository, for example `evals/gauntlet/<project>-v1.json` (NERV's `evals/gauntlet/system-v1.json`) | gauntlet-protocol: the runners, the graders and the general packs (coding, tool-use, structured-output, long-context, italian-quality and the others) | NERV picks models per capability from the Gauntlet results | Qualifies the model-facing work of every project |

### The blocks criterion

Owner decisions of 2026-11-25 (blocks) and 2026-11-26 (criterion and FPV core).

- **Code imported by two or more projects** goes to a blocks package. Before then it stays in the project that has it, under the rule for shared code.
- **Anything reached through MCP stays in its owning project.** A consumer that calls another project's MCP tools does not import that project's code, so nothing moves to blocks. Example: the FPVBuddy battery core ([fpvbuddy:F-005](https://github.com/voidbrain/FPVBuddy/blob/main/docs/BACKLOG.md#f-005)) is FPVBuddy's own package, not a blocks candidate: NERV never imports the FPV core (nerv:F-101-T05 cancelled) and reaches FPV data over FPVBuddy's MCP server only (nerv:F-101-T08).
- **Typed contract code** (TypeScript types or validators for an MCP message format) that the producer and the consumer both import is code imported by two projects: it goes to a contracts package in blocks.
- **Surface types stay in bricks**, with the surfaces that render them.
- **A prose or JSON-schema contract** is not code: it stays where its producer writes it and is listed under [Distributed contracts](#distributed-contracts).

### Check first

New work that needs UI, domain logic another project already has, or a model-facing feature or MCP tool checks the shared asset first: the bricks components and surfaces, the blocks packages and the [shared domains](#shared-domains) table, and the Gauntlet's general packs and the project's own cases. When what it needs is missing, it is proposed in the shared repository (or, for a Gauntlet case, in the owning project's pack) through the [gap review](agents/gap-review.md); the project never writes a private copy. A model-facing feature or MCP tool ships with a Gauntlet case or a recorded skip.

### Recorded skips

A project that deliberately does not use a shared asset for a piece of work records a skip with its reason in that work's record in its own backlog (for example `Skip: Gauntlet, no model in the loop`). A skip that holds for a whole project or asset is listed here. The gap review treats a recorded skip as covered.

| Asset or project | Skips | Reason | Recorded |
|---|---|---|---|
| 🧱 bricks | Gauntlet | Not model-facing: UI only | 2026-11-26, [F-016](BACKLOG.md#f-016) |
| 🧊 blocks | Gauntlet | Not model-facing: domain logic and typed contracts only | 2026-11-26, [F-016](BACKLOG.md#f-016) |

## Distributed contracts

Contracts written as prose or JSON schema between a producer and a consumer, most of them NERV's MCP integration contract. The producer owns the text; this table links it. A contract moves to a blocks contracts package only once both sides import shared TypeScript types or validators (the blocks criterion above).

| Contract | Producer | Consumer | Written in | Records |
|---|---|---|---|---|
| Alerts | 🪴 grover (`grover_alerts`) | 𖣂 nerv | Grover's `docs/DESIGN.md`, "NERV" (tool table); [SOLUTION](SOLUTION.md) | grover:F-008, nerv:F-122. Generalised when a second producer sends alerts (fpvbuddy battery warnings, openbando deadlines, hobo departures) |
| FPV data tools | 🚁 fpvbuddy (MCP server) | 𖣂 nerv | Not written yet: the records describe it | nerv:F-101-T08 to nerv:F-101-T10 |

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
| Fleet, batteries and crashes | 𖣂 nerv FPV pack ([fleet.ts](https://github.com/voidbrain/nerv/blob/main/src/fleet.ts), [batteries.ts](https://github.com/voidbrain/nerv/blob/main/src/batteries.ts)); 🚁 fpvbuddy battery views | Moves from nerv's FPV pack to 🚁 fpvbuddy | A move, not a shared package: the battery core is 🚁 fpvbuddy's own package, its views live in fpvbuddy, and NERV reaches the data over fpvbuddy's MCP server only (nerv:F-101-T08; [blocks criterion](#the-blocks-criterion)); nerv's FPV pack views retire once the data moves (rule for screens above) |

## Keeping it current

A session that adds a component, or a module that owns a domain, updates this page in the same change. The [gap review](agents/gap-review.md) reads it: a domain whose Has column gains a second project is reported as an extraction candidate.
