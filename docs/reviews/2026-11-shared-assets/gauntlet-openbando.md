# Gauntlet inventory: openbando

Step [solution:F-016-T07](../../work/tasks/F-016-T07.json). openbando at `origin/main` `c18cfd1`. openbando has no `evals/gauntlet/` directory and does not pin gauntlet-protocol.

**Correction.** solution:F-016 and this step expected "tenders, long Italian documents" (italian-quality, long-context). The code says otherwise: openbando is a browser app "for FPV pilots who fly abandoned places (bandos): build the place in 3D from the map, fly it … and share it" (`README.md`). It reads no tenders and no long documents, so italian-quality and long-context do not apply. The record and the step are corrected in the same change as this page.

## What is model-facing

| Capability | Evidence |
|---|---|
| **Site-edit assistant**: the pilot types a request; a model answers `{"reply", "commands"}` with at most 8 commands from a fixed list of about 40 operations (`add_door`, `add_window`, `split_rooms`, `add_floor`, `set_roof`, `add_structure` …); the app checks, clamps and applies them as one undo step. "A language model never writes geometry" | `src/app/core/ai-commands.ts:7-20` (`OPS`, `normalizeCommands` at :153), `src/app/core/ai-prompt.ts:6-90` (`AI_SCHEMA`, `SYSTEM_PROMPT` with examples) |
| Where the model runs: in the browser with WebLLM (Qwen2.5 1.5B and 3B, Llama 3.2 3B, Qwen3 4B, 4-bit), or any OpenAI-compatible server (Ollama, LM Studio, llama.cpp, a cloud API), stepping down from a JSON schema to a JSON object to plain text | `src/app/services/ai.service.ts:21-25`, `src/app/core/ai-server.ts:1-40` |
| **Block from a description**: a model answers a `BlockSpec` of primitive shapes (box, cylinder, extrude, array); `sanitizeBlock` bounds it and the pilot sees it before keeping it | `src/app/core/ai-blocks.ts:1-20` |
| MCP server | None |

## Capabilities and their mapping

| Capability | Mapping |
|---|---|
| Site-edit commands from a request, EN and IT, with the building names and sides of a given site | **openbando-v1** (proposal 1). The general structured-output and tool-use packs test the format, not this command list. The prompt's own example ("two windows on the north wall" → positions 0.3 and 0.7, `ai-prompt.ts:88`) shows why exact-json is too strict: positions are free within a range and `reply` is free text. The cases need the json-match grader ([packs and graders](gauntlet-protocol.md), proposal 1) or, until it is released, a project runner that applies `normalizeCommands` and compares the commands only |
| Clarification: an unclear or impossible request returns no commands and one question (`ai-prompt.ts:84`) | **openbando-v1** |
| Choosing the recommended model: the four WebLLM models are the 4-bit MLC builds; the Gauntlet's runtime is Ollama | openbando-v1 runs the same base models through Ollama (`qwen2.5:1.5b`, `qwen2.5:3b`, `llama3.2:3b`, `qwen3:4b`) as a proxy; the page says the quantisation differs |
| Block from a description | **Skip, recorded with its reason**: the pilot reviews every block before keeping it and `sanitizeBlock` bounds it; grading a 3D primitive spec would need a measuring runner that only openbando would use. Revisit if the owner wants a model chosen for it |
| Flight, replay, simulator, sharing | **Skip**: no model |

## Proposals

| # | Repo | Record or step to create | Estimate |
|---|---|---|---|
| 1 | 🏚️ openbando | **New F record, "Gauntlet pack for the site-edit assistant (openbando-v1)"**. Issue: the assistant offers four small models and any compatible server, and no case says which of them turns a request into the right commands. Check: `evals/gauntlet/openbando-v1.json`, model layer, regression and holdout splits, EN and IT requests over invented sites, graded on the normalised commands with `reply` ignored and positions within a tolerance; `gauntlet validate` in CI from a pinned devDependency; the block-from-description skip recorded; a first owner-approved run of the four base models through Ollama, whose result sets the recommended entry in `AI_MODELS`. Steps: **T01** pin, validate in CI, the recorded skip and, if json-match is not released, a project runner that normalises then compares (1 h); **T02** command and clarification cases (1.5 h); **T03** first run and the recommendation (0.5 h agent, 0.25 h owner) | 3 h agent, 0.25 h owner |
