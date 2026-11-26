# voidbrain solution

This repository owns solution outcomes, shared contracts and integration acceptance. Components own implementation and their own backlogs. The [manifest](../.solution.json) names sources; the [solution backlog](BACKLOG.md) owns integration status; [solution-profile guidance](agents/solution-profile.md) defines aggregation. The [dashboard](SOLUTION-DASHBOARD.md) is generated evidence, not an editable second ledger.

## Components and contracts

| ID | Repository | Owns | Meets other components through |
|---|---|---|---|
| `nerv` | [voidbrain/nerv](https://github.com/voidbrain/nerv) | NERV Agency: local agent runtime, bases and nodes, dashboard, companion, packs | MCP client of Grover's hub; runs its own Gauntlet packs (`evals/gauntlet/`) with the vendored gauntlet-protocol package; harness consumer |
| `gauntlet-protocol` | [voidbrain/gauntlet-protocol](https://github.com/voidbrain/gauntlet-protocol) | Capability-scoped AI evaluation library and CLI, packs and evidence ledger | Its library, CLI, pack and ledger formats, vendored by NERV as a release tarball; harness consumer |
| `project-harness` | [voidbrain/project-harness](https://github.com/voidbrain/project-harness) | The reusable harness template: rules, backlog tools, solution profile | Releases (tags `vX.Y.Z`) each component reconciles to; it never depends on them |
| `fpvbuddy` | [voidbrain/FPVBuddy](https://github.com/voidbrain/FPVBuddy) | FPV companion app (Angular) | Planned alert producer for NERV ([alert contract](#alert-contract), fpvbuddy:F-013); harness consumer |
| `openbando` | [voidbrain/openbando](https://github.com/voidbrain/openbando) | OpenBando: browser app (Angular, Three.js, Leaflet) to build abandoned places in 3D from the map, replay real FPV flights from Betaflight Blackbox logs and DVR, fly a simulator and share | No contract recorded yet; harness consumer |
| `grover` | [voidbrain/Grover](https://github.com/voidbrain/Grover) | Grow-tent controller: hub, Pi agent, client | MCP tool surface used by NERV, alerts included (`grover_alerts`; tool table in Grover's `docs/DESIGN.md`, "NERV"; shape in the [alert contract](#alert-contract)); harness consumer |
| `hobo` | [voidbrain/hobo](https://github.com/voidbrain/hobo) | Hobo: trip planner (Angular, Leaflet, OpenRouteService): places, trips, routes and variants | Planned MCP surface for NERV (places, trips, route totals; hobo:F-011); maps/geo a candidate shared package with openbando (hobo:F-012); shared UI from bricks (solution:F-012); harness consumer |
| `bricks` | [voidbrain/bricks](https://github.com/voidbrain/bricks) | 🧱 Bricks: shared Angular UI library `@voidbrain/bricks` (Angular 22): tokens (primitive → semantic → component), themes (base, plain, eva), foundations, components, patterns and the genUI surface catalogue. UI only: no domain logic, maps or routing | Its package, consumed by nerv, hobo, grover and fpvbuddy (solution:F-012); the genUI contract keeps nerv's `shared/surface.ts` version 1 (component ids, schemas, validation); published on public npm with trusted publishing (bricks:F-004, not yet); harness consumer |

Which domains each component covers, and which ones two or more share, is in the [domain map](DOMAINS.md).

Screens are owned by their project; NERV integrates via MCP: surface cards (🧱 bricks surfaces) and MCP Apps/links; no duplicate views (owner decision 2026-11-25; details in the [domain map](DOMAINS.md#the-rule-for-screens)). A project that NERV shows publishes MCP tools returning surface-typed data, and an MCP Apps page or a link for full screens.

Contracts are owned by the component that publishes them; this table links, it does not copy. A change to a published surface is announced in the publisher's backlog and, when a consumer must follow, recorded here as a coordination record with `Components` links.

### Version compatibility

| Consumer | Depends on | Pinned by |
|---|---|---|
| Every component | project-harness release | `version` in its `.harness.json` (all nine on 10.21.4 on 2026-11-26: nerv, gauntlet-protocol, project-harness, fpvbuddy, grover, openbando, hobo, bricks and this repository; read from the dashboard) |
| nerv | Grover hub MCP tools | Grover's MCP tool names and `PROTOCOL_VERSION` (MQTT, inside Grover) |
| nerv | gauntlet-protocol | the vendored package `@voidbrain/gauntlet-protocol` in nerv's `package.json` (0.11.1 on 2026-11-26, `vendor/voidbrain-gauntlet-protocol-0.11.1.tgz`), used by `tools/gauntlet.mjs` |

The pinned values above are a dated reading, not live status; the owning repositories are authoritative.

## Alert contract

One shape for every producer whose alerts NERV delivers (solution:F-018). It generalises the Grover-only design of nerv:F-122 ([grover-alert-delivery](https://github.com/voidbrain/nerv/blob/f71140b4/docs/decisions/grover-alert-delivery.md), read at nerv `f71140b4`) so that a second producer, FPVBuddy's battery storage alerts (fpvbuddy:F-013, nerv:F-101-T09), needs no second delivery path. Read 2026-11-26 at grover `080194c` (`packages/contracts/src/api.ts` `Alert`, `apps/hub/src/alerts.ts`, `feeder.ts`, `store.ts`, `mcp.ts`) and fpvbuddy `6043323` (F-013 and its steps). Each producer owns its key grammar and its texts; this section owns the shape, the lifecycle and the delivery rules both sides agree on. Nothing here is implemented yet: the side changes are proposed through F-018-T02.

### Transport

The producer exposes a read-only MCP tool, annotated `readOnlyHint: true`, that takes no arguments and answers with a **snapshot of the alerts open now**, newest first (`grover_alerts` today; FPVBuddy's tool from fpvbuddy:F-013-T03). There is no history, cursor or notification: a clear is the key's absence. NERV reaches the tool through its MCP registry (nerv:F-123: deny by default, a grant pinned to the tool's description, reachability reported) and polls it; it never subscribes to a producer's own socket.

### Fields

The answer is an envelope:

| Field | Required | Meaning |
|---|---|---|
| `contract` | yes | `"alerts/1"`. A consumer refuses a major version it does not know (see [Versioning](#versioning)). |
| `producer` | yes | The producer kind: `grover`, `fpvbuddy`, later `openbando`, `hobo`. It selects the night-class table below. The consumer's own registered server id, not this field, names the producer instance in its ledger, so two Grover hubs are two instances of one kind. |
| `alerts` | yes | The open alerts, newest `since` first; empty when nothing is open. |

Each alert:

| Field | Required | Meaning |
|---|---|---|
| `key` | yes | Names the condition, in the producer's grammar (`probe:tank-water:below`, `battery:b-7:storage`). Stable while the condition lasts. At most 200 characters, no whitespace. |
| `since` | yes | Integer milliseconds since the Unix epoch (UTC) when this episode was raised. Stored by the producer, so it survives a producer restart. |
| `level` | yes | `warn` or `bad`: the producer's own severity, in the meaning its table below states. It is not the night class. |
| `message` | yes | Plain text for the owner, in the producer's words and language. Untrusted: shown, never put into a planner prompt; the consumer strips control characters and caps it at 300 characters. |
| `scope` | no | A short label for where it happens, shown in the delivery line (`tent-a`). Replaces Grover's required `roomId`; a producer with no natural place (a battery) leaves it out. |
| `subject` | no | `{ "type": "...", "id": "..." }`: the thing the alert is about (`pot`, `probe`, `agent`, `battery`), for a link or a later query. |
| `context` | no | Producer-specific flat facts (string, number, boolean or null values only), read only by that producer's night-class rule; Grover's `roomId`, `potId` and, if it adds it, the probe's kind. Any other consumer ignores it. |
| `repeat` | no | `{ "n": 1, "at": <ms> }`: the episode is still open and the producer asks for a reminder. `n` starts at 1 and only grows within an episode; `at` is when this reminder became due. Absent on an alert that is never repeated. |
| `announceClear` | no | Default `true`. `false` records the clear in the inbox only, without a push or Telegram message: for an alert the owner clears by their own action (storing a battery). |

### Lifecycle

An **episode** is `(producer instance, key, since)`.

- **Raise**: a key appears with a `since` the consumer has not seen. Delivered once.
- **Refresh**: the same `(key, since)` with a new `message` or `level`. Not a new alert: the consumer keeps the latest text for the clear. One exception: a level that rises from `warn` to `bad` on an open episode is delivered once as an escalation (Grover's `feed:<pot>` can do this, a refused feed followed by a stopped one under the same key). A level that falls is not delivered.
- **Repeat**: the same `(key, since)` with a `repeat.n` higher than the last one delivered. One reminder is delivered for the highest new `n` (a consumer that missed several sends one, not each); no clear is sent between reminders. A producer that wants a daily nudge uses `repeat`; it never closes and reopens the key, which would deliver a clear each day.
- **Clear**: the episode is absent from **two consecutive successful** snapshots (a missing key, or the same key with another `since`). Delivered once, following the route its alert took, unless `announceClear` is `false`. The same key raised later with a new `since` is a new episode.
- A failed poll (unreachable, timeout, suspended grant, an answer that is not the envelope) changes no episode: absence from a failed poll is never a clear.
- Holding an alert against flapping is the producer's job (Grover's hysteresis, grover:F-008-T02); the consumer's two-poll confirmation only absorbs a key that vanishes once.

### Dedup and episodes

- The consumer keeps one ledger row per episode, durably, replicated so a coordinator handover does not deliver twice. Each delivery has a deterministic id, `<instance>:<key>:<since>:raised`, `…:escalated`, `…:repeat-<n>`, `…:cleared`, inserted once. A restart, a crash between the poll and a send, or a second base cannot deliver the same one twice.
- Deduplicating by `key` alone is wrong (it swallows a real re-raise); deduplicating in memory is wrong (a restart resends everything).
- An episode raised and cleared between two polls is never seen. Accepted: producers that need it add a history with a cursor in a later major version.
- An entry that does not match the schema is skipped and counted (`nerv doctor`), without blocking the valid entries of the same snapshot.

### Delivery expectations

NERV's rules, which bind every producer alike:

- **Inbox** at once, always, quiet hours included: the delivery row is the durable record.
- **Push first, Telegram as fallback** (nerv:F-004-T09; the same order for briefs and update notices in nerv:F-133): a phone push first; Telegram when the push fails, no device is subscribed, or the alert is not opened within about 10 minutes. A clear goes to Telegram only when its alert did.
- **Quiet hours** 22:00 to 07:00 in the owner's timezone (nerv:F-122 owner decision 2026-11-25): a serious alert, its escalation and its clear go out at once; a minor one is held from push and Telegram and the night's held items go out at 07:00 as one message. Serious or minor is decided by the producer's table below, never by `level` alone. An unknown key shape, an unknown producer or a missing fact counts as serious.
- **First poll of an instance** and the first poll after an outage: alerts not yet in the ledger go out once as one listing message, each with its own ledger row.
- **Unreachable producer**: one message after 15 minutes without contact, one when contact returns; never a clear.
- **Delivery line**: `<Producer> · <scope>: <message>` (or `<Producer>: <message>` without a scope); a clear says how long the episode lasted.

### Night classes per producer

**grover** (from nerv:F-122's table; key grammar and levels as the hub raises them, to be pinned by grover:F-008-T04):

| Key shape | `level` | Class at night |
|---|---|---|
| `probe:<id>:below` or `:above`, probe kind `ph` or `ec` | `warn` | Serious |
| `feed:<pot>` as `bad` (stopped partway, all switched off) | `bad` | Serious |
| `probe:<id>:below` or `:above`, kind `air_temperature`, `water_temperature` or `water_level` | `warn` | Minor |
| `feed:<pot>` as `warn` (an automatic feed refused) | `warn` | Minor |
| `agent:<id>` (offline) | `bad` | Minor |
| Any other shape, or a probe whose kind cannot be read | any | Serious |

**fpvbuddy** (storage reminders, fpvbuddy:F-013):

| Key shape | `level` | Class at night |
|---|---|---|
| `battery:<id>:storage` | `warn` | Minor (raised and repeated at 21:00, before the window; a late one waits until 07:00) |
| Any other shape | any | Serious |

`openbando` (deadlines) and `hobo` (departures) are future producers: no table until they have an alert record of their own, and until then any alert of theirs counts as serious.

### How the producers map

| Field | grover (`grover_alerts`) | fpvbuddy (storage, fpvbuddy:F-013) |
|---|---|---|
| `producer` | `grover`; today the tool answers a bare array, read as legacy (below) | `fpvbuddy` |
| `key` | `probe:<id>:below`, `probe:<id>:above`, `feed:<pot>`, `agent:<id>` | `battery:<batteryId>:storage` |
| `since` | when the hub raised it (`Date.now()`, kept in its table) | 21:00 local on the day the battery was left charged (the next day if 21:00 had passed): the first reminder |
| `level` | `warn`: a probe out of range, an automatic feed refused; `bad`: a feed stopped partway, an agent offline | `warn` |
| `message` | the hub's text (`Water tank low (12, alert below 15): refill it. …`) | NERV's wording today, Italian or English: `Metti in storage batteria #3 (charged)` / `Store battery #3 (charged)` |
| `scope` | the room id (`tent-a`) | left out |
| `subject` | `{pot, <potId>}` when `potId` is set, else `{probe}` or `{agent}` from the key | `{battery, <batteryId>}` |
| `context` | `{ roomId, potId }`; the probe kind once the hub adds it, else NERV reads it from `grover_overview` | none |
| `repeat` | never | absent on the first reminder; `{n: 1, at}` at 21:00 five days later; then `n` + 1 at 21:00 each day |
| Clear | the hub deletes the row when the condition clears | the battery is stored or retired: the key disappears |
| `announceClear` | `true` | `false` (the owner stored it) |

A battery stored and later left charged again gets a new `since`: a new episode, after the old one cleared.

### Versioning

- `contract` is `alerts/<major>`. Adding an optional field, a key shape or a producer is not a new major; consumers ignore fields they do not know. Changing a required field, the meaning of `since`, `level` or `repeat`, or the lifecycle above is a new major, written here first, with a coordination record naming both sides.
- A producer that changes its key grammar or the meaning of its levels names the consumer record (nerv:F-122) in its PR and updates its row above in the same coordination change (grover:F-008-T04 already requires this on Grover's side).
- **Legacy**: Grover's bare array (no envelope, `roomId` and `potId` instead of `scope`, `subject` and `context`) is read as `alerts/1` from producer `grover`, mapped as in the table above, until Grover answers with the envelope. No other producer gets a legacy form.

### Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://github.com/voidbrain/coordinator/blob/main/docs/SOLUTION.md#alert-contract",
  "title": "Open alerts snapshot, alerts/1",
  "type": "object",
  "required": ["contract", "producer", "alerts"],
  "properties": {
    "contract": { "const": "alerts/1" },
    "producer": { "type": "string", "pattern": "^[a-z][a-z0-9-]{0,31}$" },
    "alerts": { "type": "array", "items": { "$ref": "#/$defs/alert" } }
  },
  "$defs": {
    "alert": {
      "type": "object",
      "required": ["key", "since", "level", "message"],
      "properties": {
        "key": { "type": "string", "minLength": 1, "maxLength": 200, "pattern": "^\\S+$" },
        "since": { "type": "integer", "minimum": 0 },
        "level": { "enum": ["warn", "bad"] },
        "message": { "type": "string", "minLength": 1 },
        "scope": { "type": "string", "minLength": 1, "maxLength": 64 },
        "subject": {
          "type": "object",
          "required": ["type", "id"],
          "properties": {
            "type": { "type": "string", "pattern": "^[a-z][a-z0-9_-]{0,31}$" },
            "id": { "type": "string", "minLength": 1, "maxLength": 128 }
          },
          "additionalProperties": false
        },
        "context": {
          "type": "object",
          "additionalProperties": { "type": ["string", "number", "boolean", "null"] }
        },
        "repeat": {
          "type": "object",
          "required": ["n", "at"],
          "properties": {
            "n": { "type": "integer", "minimum": 1 },
            "at": { "type": "integer", "minimum": 0 }
          },
          "additionalProperties": false
        },
        "announceClear": { "type": "boolean", "default": true }
      }
    }
  }
}
```

### Differences from nerv:F-122's design, for F-018-T02

| # | nerv:F-122 today | This contract | Side that would move |
|---|---|---|---|
| 1 | Bare array from `grover_alerts`; config key and ledger tables named `grover` | Envelope with `contract` and `producer`; producer-scoped config and ledger (instance, key, since), Grover's bare array read as legacy | nerv (poller, config, ledger); grover optionally answers with the envelope |
| 2 | Entries without `roomId` are skipped | `scope` optional; `roomId` and `potId` move to `scope`, `subject` and `context` | nerv |
| 3 | No repeats: a changed `since` is a new episode and the old one is cleared | `repeat` delivers a reminder of an open episode without a clear | nerv; fpvbuddy:F-013 uses it |
| 4 | A level change on an open episode sends nothing | A rise from `warn` to `bad` is delivered once as an escalation | nerv (owner decides) |
| 5 | Every clear is announced | `announceClear: false` records the clear in the inbox only | nerv; fpvbuddy:F-013 sets it (owner decides) |
| 6 | Night class from Grover key shapes only | Night class from the producer's table; unknown producer or shape is serious | nerv |
| 7 | Delivery line `Grover · <roomId>: …` | `<Producer> · <scope>: …`, scope optional | nerv |
| 8 | Probe kind read from `grover_overview` | Probe kind may come in `context` (`probeKind`) when the hub adds it; overview stays the fallback | grover (optional), nerv |

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

The coordinator-only procedures (copied only here since harness 10.24.2): [solution refresh](agents/solution-refresh.md) (refresh, verification, adoption in CI), [solution dashboard](agents/solution-dashboard.md) (how the dashboard reads each backlog) and [solution gaps](agents/solution-gaps.md) (the gap review).

## MCP and execution environments

Use [MCP guidance](agents/mcp.md). No MCP selection is recorded for the coordinator: it needs only `git`, `gh` and Node. A shared recommendation does not grant every agent access to every component or device.
