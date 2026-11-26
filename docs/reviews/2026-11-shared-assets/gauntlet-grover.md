# Gauntlet inventory: grover

Step [solution:F-016-T04](../../work/tasks/F-016-T04.json). grover at `origin/main` `07d7334`. grover has no `evals/gauntlet/` directory and does not pin gauntlet-protocol.

## What is model-facing

Grover makes no model calls of its own: "reasoning in language (explaining a trend, deciding whether to feed) happens in NERV with NERV's models, over these tools" (`docs/DESIGN.md:171`). Its model-facing surface is the hub's MCP server (`apps/hub/src/mcp.ts`), 19 tools, which NERV's models call (nerv:F-123). Eleven are annotated `readOnlyHint: false`.

| Tools | Kind | Evidence |
|---|---|---|
| `grover_overview`, `grover_plants`, `grover_plant_report`, `grover_readings`, `grover_history`, `grover_alerts`, `grover_feed_preview`, `grover_feeds` | Read | `mcp.ts:17-247` |
| `grover_take_cuttings`, `grover_harvest`, `grover_switch_to_bloom`, `grover_start_flush`, `grover_place_plant` | Record (bloom can move a calendar-driven light) | `mcp.ts:106-178` |
| `grover_read_probe` | Takes a reading | `mcp.ts:247` |
| `grover_run_pump`, `grover_switch`, `grover_feed_pot`, `grover_set_mode` | Moves hardware | `mcp.ts:257-` |
| `grover_stop_all` | Moves hardware, always safe | `mcp.ts` |

## Capabilities and their mapping

| Capability | Mapping |
|---|---|
| Choosing the read tool and its arguments for a question ("what's the pH in pot 2", "quanto ha bevuto ieri la pianta 3"), EN and IT | **grover-v1** (proposal 1). tool-use-v1 tests the format with invented tools only |
| Proposing a hardware tool so NERV's gate asks the owner, never running it silently; `grover_stop_all` on an emergency phrase; an unknown pump or pot asked back, never invented | **grover-v1**. refusal-permission-v1 covers approval in general, not this table |
| Record tools with the right plant and pot | **grover-v1** |
| Answering from a tool result: which pot is out of its phase range, since when, from an `overview` or `alerts` payload given in the prompt | **grover-v1** (exact-json on the pot, probe and level) |
| Alerts raised, held and cleared (grover:F-008), delivered by NERV (nerv:F-122) | **Skip**: thresholds and hysteresis are deterministic (`apps/hub/test/alerts.test.ts`), no model in the loop |
| Feed planning, calibration, lights and schedules | **Skip**: deterministic, unit-tested in `packages/contracts/test` and `apps/hub/test` |
| Client screens | **Skip**: UI, not model-facing (bricks:F-008 covers the UI inventory) |

## Proposals

| # | Repo | Record or step to create | Estimate |
|---|---|---|---|
| 1 | 🪴 grover | **New F record, "Gauntlet pack for the hub's MCP tools (grover-v1)"**. Issue: NERV's models call 19 Grover tools, four of which move hardware, and no case checks that a model picks the right tool and arguments, leaves hardware to approval and answers from the tool result. Check: `evals/gauntlet/grover-v1.json`, model layer, regression and holdout splits, EN and IT, exact-json, invented data; `gauntlet validate` runs in CI from a pinned `@voidbrain/gauntlet-protocol` devDependency; a test fails when a case names a tool or argument that `mcp.ts` does not register; the skips above are recorded in `docs/DESIGN.md`, "NERV". Steps: **T01** pin, validate in CI, tool-name test and the recorded skips (0.75 h); **T02** tool-choice, approval and argument cases (1.5 h); **T03** answer-from-result cases on `overview` and `alerts` payloads (1 h). NERV runs the pack against its models: [nerv](gauntlet-nerv.md) proposal 3 | 3.25 h agent |

The tool-name test in T01 is the per-project form of the drift check proposed to gauntlet-protocol ([packs and graders](gauntlet-protocol.md), proposal 2); if that lands first, T01 uses it instead.
