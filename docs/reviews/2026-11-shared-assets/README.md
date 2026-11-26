# Shared-asset inventories, 2026-11

The per-project inventories of [solution:F-016](../../BACKLOG.md#f-016), made on 2026-11-26 under the [shared-asset checks](../../agents/gap-review.md#shared-asset-checks) of the gap review. Nothing here changes a component. Each proposal names the repository that would own it and the record or step a session there would create; the owner accepts or rejects each in the gap review.

## Baseline

Each repository was read at `origin/main` on 2026-11-26 from a fresh shallow clone; no checkout and no component was edited. NERV was read only at `origin/main`, never from a working branch.

| Component | Revision | Component | Revision |
|---|---|---|---|
| 𖣂 nerv | `0c9bfe9` | 🗺️ hobo | `735e8af` |
| 🪴 grover | `07d7334` | 🏚️ openbando | `c18cfd1` |
| 🚁 fpvbuddy | `0da6d05` | 🤖 gauntlet-protocol | `67ef7e6` (release 0.11.1) |

The Gauntlet as read: the general packs in `examples/` (smoke, smoke-schema, general-assistant-expanded, structured-output-robustness, tool-use, multi-step-agent, refusal-permission, bilingual-it-en, italian-quality, long-context, logic-math, coding, embedded, cad-3d, code-review, image-generation) and the planned packs scheduling-time (gauntlet-protocol:F-023), estimation (gauntlet-protocol:F-024), research (gauntlet-protocol:F-025) and image generation (gauntlet-protocol:F-021). Graders: `exact-json-v1` (a deep, order-sensitive equality: `src/index.ts:1234`, `isDeepStrictEqual`), `rubric`, `defects` and the image judge of F-021. A project validates its own pack with `gauntlet validate` from the pinned package.

## Pages

| Step | Page | Proposals |
|---|---|---|
| F-016-T03 | [Gauntlet: nerv](gauntlet-nerv.md) | 4 |
| F-016-T04 | [Gauntlet: grover](gauntlet-grover.md) | 1 |
| F-016-T05 | [Gauntlet: fpvbuddy](gauntlet-fpvbuddy.md) | 3 |
| F-016-T06 | [Gauntlet: hobo](gauntlet-hobo.md) | 1 |
| F-016-T07 | [Gauntlet: openbando](gauntlet-openbando.md) | 1 |
| F-016-T08 | [Blocks: shared logic](blocks.md) | 2 (verdict: not yet) |
| F-016-T09 | [Packs and graders for gauntlet-protocol](gauntlet-protocol.md) | 3, and consumer notes on four planned packs |

Record IDs: a proposal for a new record says "new F record" and leaves the number to the session that creates it, because sessions in those repositories can take IDs at the same time. A proposed step in an existing record names the next free step at the revision above.
