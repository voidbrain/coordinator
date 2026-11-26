# Gauntlet inventory: nerv

Step [solution:F-016-T03](../../work/tasks/F-016-T03.json), folded into [nerv:F-120](https://github.com/voidbrain/nerv/blob/main/docs/BACKLOG.md#f-120). nerv at `origin/main` `0c9bfe9`, gauntlet-protocol pin 0.11.1.

## What is already counted

- **nerv's own pack**: `evals/gauntlet/system-v1.json` (`nerv-system-flows@1.2.0`), 8 flows: policy, ledger, conversation, channels, bases, stress, browser, script-plans. Each is a system-layer runner over fixed test files, with no model.
- **Seven accepted system cases**, not built yet: nerv:F-120-T02 (scheduling-reminders, memory-and-chronicle, pilot-routing, tool-contracts, external-project-intake, federated-handoff, coding-jobs), from the [coverage review of 2026-11-25](https://github.com/voidbrain/nerv/blob/main/docs/reviews/gauntlet-coverage/2026-11-25.md). That review classed 46 closed features; it is not repeated here.
- **General packs adopted** with the 0.11.1 pin (nerv:F-120-T03): coding, embedded, logic-math, italian-quality, cad-3d and code-review, besides the eight common packs.

This page covers what changed since that review: the features closed after it, the open records with model-facing work, and the planned packs upstream.

## Finding: no case runs a model on nerv's own tool index

Misato, the planner, answers with `{"action":{"tool","args"}}`, `{"reply"}` or `{"ask"}` over nerv's built-in tools (about 50) and the granted MCP tools (`src/misato.ts:123-129`). The general packs (tool-use, structured-output-robustness, multi-step-agent, general-assistant-expanded) test this format with invented tools. The system flows test the code around the model, without a model. No case gives a model nerv's real tool index and checks the decision. nerv:F-126 (gemma4:26b as the chat model), nerv:F-106 (prompt size per turn) and nerv:F-113 (compact tool index, whose record already asks for "a Gauntlet comparison of prompt size and task success before and after") all need that measure.

## Capabilities and their mapping

| Capability | Evidence | Mapping |
|---|---|---|
| Planner decisions over nerv's tool index, EN and IT | `src/misato.ts:123-129` | **New nerv pack**: proposal 1 |
| Relative reminder times ("in two hours" counts from when the owner asked) | nerv:B-143 (Implemented) | Proposal 1 (a planner case) and the planned scheduling-time-v1 (gauntlet-protocol:F-023) |
| FPV fleet diary, closed after the 2026-11-25 review: Italian crash and spares phrases | nerv:F-098 (archived), `src/fleet-chat.ts` | **Skip in nerv**: the data and tools move to fpvbuddy (nerv:F-101-T08, fpvbuddy:F-011); the cases go to [fpvbuddy-v1](gauntlet-fpvbuddy.md) |
| FPV batteries by chat; FPV build knowledge from cited sources | nerv:F-008, nerv:F-099 | **Skip in nerv**, same move (fpvbuddy:F-012, fpvbuddy:F-015) |
| Printed parts: "print Smoke's feet" resolves drone, part, file, count and profile | nerv:F-121 | The resolution: proposal 1, while the parts data is nerv's. The slicing: cad-3d-v1 (adopted). Whether the parts data moves to fpvbuddy with the fleet is open; see [fpvbuddy](gauntlet-fpvbuddy.md), note |
| Lists and saved recipes | nerv:F-082, nerv:F-083 | Proposal 1 at each record's closure. F-083's "compute only from saved values" also maps to estimation-v1 (gauntlet-protocol:F-024: evidence in the prompt, decline on missing figures) |
| Gmail: search, read, draft, send behind approval | nerv:F-086 | italian-quality-v1 and refusal-permission-v1 (adopted); send behind approval is a ledger flow, not a model case |
| Browser and desktop control by a named control | nerv:F-089, nerv:F-093, nerv:F-094 | No general pack, and nerv alone needs it: nerv cases (pick the named control from an accessibility snapshot, exact-json) at each record's closure |
| Record and replay desktop input | nerv:F-092 | **Skip**: no model in the loop |
| Grover alerts delivered | nerv:F-122 | **Skip**: deterministic delivery of `alerts/1` |
| Grover tools over MCP | nerv:F-123 | Covered by [grover-v1](gauntlet-grover.md), run by nerv (proposal 3) |
| Quick commands: a button calls another project's tool | nerv:F-131 | **Skip**: a fixed button-to-tool mapping, no model choice. Chat questions about the same data are covered by the project packs (proposal 3) |
| GitHub pilot | nerv:F-132 | pilot-routing (nerv:F-120-T02) and proposal 1 |
| Coding jobs' instruction load and handoffs | nerv:F-128 | The coding-jobs system case (nerv:F-120-T02), extended when F-128 lands; deterministic |
| Voice | nerv:F-007 | **Skip for now**: no active work; revisit when F-007 starts |
| Image generation | gauntlet-protocol:F-021 | **Skip**: no nerv feature generates images; the 2026-11-25 skip stands |

## Proposals

| # | Repo | Record or step to create | What it covers | Estimate |
|---|---|---|---|---|
| 1 | 𖣂 nerv | **nerv:F-120-T09** (next free step at `0c9bfe9`), "nerv-planner-v1: model-layer cases on Misato's own tool index". Issue: no case gives a model nerv's real tool index, so a model change or a tool-index change is not measured. Check: `evals/gauntlet/nerv-planner-v1.json`, model layer, regression and holdout splits, EN and IT; exact-json on the action and its arguments: reminders (relative times as in B-143), memory facts, a write tool proposed for approval, a switched-off pack's tool never chosen, an unknown request answered with `reply` or `ask`; invented data; a first owner-approved run in the ledger | F-126, F-106, F-113 (before and after), B-143, F-082, F-083, F-121, F-132 | 2.5 h agent, 0.25 h owner (first run) |
| 2 | 𖣂 nerv | **nerv:F-120-T10**, "A Gauntlet line on every open model-facing record". Check: the Check of nerv:F-082, F-083, F-086, F-089, F-093, F-094, F-121 and F-132 names its case (as in the table above); F-092, F-122, F-131 and F-007 carry a recorded skip with its reason; F-008, F-098 and F-099 record that their cases move to fpvbuddy-v1 | The closure rule F-120 asks for, applied to the open records | 0.5 h agent |
| 3 | 𖣂 nerv | **nerv:F-120-T11**, "Run the project packs nerv calls over MCP". Issue: nerv's models call grover's, fpvbuddy's and hobo's tools, and each project writes its own cases ([shared assets](../../DOMAINS.md#shared-assets)); nothing runs them against nerv's models. Check: nerv's campaign takes grover-v1, fpvbuddy-v1 and hobo-v1 from each project's tagged release, records them in the ledger like its own packs, and a project pack without a tag is refused. Depends on [grover](gauntlet-grover.md) 1, [fpvbuddy](gauntlet-fpvbuddy.md) 1 and [hobo](gauntlet-hobo.md) 1 | F-123, F-131, F-101 | 1.5 h agent |
| 4 | 𖣂 nerv | **nerv:F-120-T12**, "Adopt scheduling-time, estimation and research packs on release". Check: when gauntlet-protocol tags scheduling-time-v1, estimation-v1 or research-v1, the pin moves and the pack runs in the next owner-approved campaign. Depends on gauntlet-protocol:F-023-T02, F-024-T02 and F-025-T02 | B-143, F-083, F-085 (external-project-intake) | 0.5 h agent per release |

Not proposed: a separate record. All four are steps of nerv:F-120, as solution:F-016 asked.
