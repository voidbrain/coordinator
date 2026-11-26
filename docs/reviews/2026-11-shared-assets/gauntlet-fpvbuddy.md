# Gauntlet inventory: fpvbuddy

Step [solution:F-016-T05](../../work/tasks/F-016-T05.json). fpvbuddy at `origin/main` `0da6d05`. fpvbuddy has no `evals/gauntlet/` directory and does not pin gauntlet-protocol.

## What is model-facing

| Capability | State | Evidence |
|---|---|---|
| MCP read tools for batteries, as genUI surfaces | Planned | fpvbuddy:F-009 (T01 to T05) |
| MCP read tools for fleet, spares and crashes, and a crash-log write | Planned | fpvbuddy:F-011 (T01 to T07) |
| MCP write tools: charge state, per-cell resistance, a charge cycle, spares in and out | Planned | fpvbuddy:F-012 (T01 to T03) |
| Battery storage reminders as alerts | Planned | fpvbuddy:F-013 |
| Blackbox vibration report | Planned | fpvbuddy:F-014 |
| Builds, manufacturer docs and wiring answers from cited sources | Planned; the move is confirmed (F-015-T01 closed) | fpvbuddy:F-015 (T02 to T05) |
| An on-device assistant in the app footer: a 450M model (`lfm2-vl-450m-q4_0`) calls `chargeBattery`, `dischargeBattery` and `storeBattery`; the handlers only log | **On `main`, no record** | `src/app/shared/UI/llm-ui/llm-ui.ts:12-100`, `footer.html:7` |
| An on-device vision demo: the same model describes a camera frame | **On `main`, no record** | `src/app/shared/UI/vision-ui/vision-ui.ts:41-48`, `src/workers/vlm-worker.ts` |

The MCP tools are what NERV's models call once nerv's FPV data moves here (nerv:F-101-T08). Their phrases come from nerv's FPV pack: "carica le batterie 7 e 8 blu" (nerv:F-008), "ho crashato Smoke, motore sinistro inferiore rotto … quanti ne sono rimasti di scorta (nuovi/usati)?" (nerv:F-098). A spare count changes only when the phrase says a spare was used (nerv:F-098's Check).

## Capabilities and their mapping

| Capability | Mapping |
|---|---|
| Battery, fleet, spares and crash tools: tool choice and arguments, writes proposed for approval, Italian phrases, colour series, several batteries in one phrase | **fpvbuddy-v1** (proposal 1). Several batteries in one phrase need an order-free comparison: the json-match grader ([packs and graders](gauntlet-protocol.md), proposal 1); until then the cases ask for sorted ids |
| Wiring answers only from the owner's build or the manufacturer's documents, declining when the sources do not say | **research-v1** (gauntlet-protocol:F-025: closed corpus, cited source ids) and fpvbuddy's own cases on FPV documents (proposal 2) |
| Storage reminders as alerts | **Skip**: deterministic timing and wording (nerv's `src/battery-storage-reminders.ts`, carried over), no model |
| Blackbox report | **Skip**: a deterministic analyzer (nerv:F-100 was classed the same way) |
| Import of NERV's FPV export (fpvbuddy:F-017) | **Skip**: no model |
| On-device assistant and vision demo | **Neither a case nor a skip today**: a gap-review finding (proposal 3) |

**Note for the owner: printed parts.** nerv:F-121 ("print Smoke's feet") keeps printed parts per drone model in nerv's fleet data, which moves here with fpvbuddy:F-010 and F-011. No fpvbuddy record names printed parts. Until that is decided, its resolution case stays in nerv's planner pack ([nerv](gauntlet-nerv.md), proposal 1); slicing is cad-3d-v1. Not a proposal: the owner decides where the parts data lives.

## Proposals

| # | Repo | Record or step to create | Estimate |
|---|---|---|---|
| 1 | 🚁 fpvbuddy | **New F record, "Gauntlet pack for FPVBuddy's MCP tools (fpvbuddy-v1)"**. Issue: once NERV's FPV tools move here, NERV's models call fpvbuddy's battery, fleet, spares and crash tools, several of them writes, and no case checks the tool, its arguments or the approval. Check: `evals/gauntlet/fpvbuddy-v1.json`, model layer, regression and holdout splits, Italian and English phrases, exact-json, invented batteries and drones; `gauntlet validate` in CI from a pinned devDependency; a test that every tool a case names is registered; the skips above recorded. Steps: **T01** pin, validate in CI and the recorded skips (0.5 h); **T02** battery cases, when F-009 and F-012 register their tools (1.25 h); **T03** fleet, spares and crash cases, when F-011 registers its tools (1.25 h). NERV runs it: [nerv](gauntlet-nerv.md) proposal 3 | 3 h agent |
| 2 | 🚁 fpvbuddy | **fpvbuddy:F-015-T06** (next free step), "Wiring-answer cases from cited sources". Check: cases in fpvbuddy-v1 give a build and manufacturer excerpts in the prompt and expect the answer with the cited source ids, and a decline when the sources do not say; graded like research-v1. Depends on F-015-T03 and gauntlet-protocol:F-025-T02 | 1 h agent |
| 3 | 🚁 fpvbuddy | **New F record, "Decide the on-device assistant and vision demo"**. Issue: `llm-ui.ts` and `vision-ui.ts` put a model in the app footer with no record; the assistant's tool handlers only log and a keyword list gates what it answers; neither has a Gauntlet case or a recorded skip. Check: the owner's decision is recorded; either the prototypes are retired (and their services and worker removed), or a record makes them real with cases for the small on-device model (tool-use-v1 and fpvbuddy-v1 against the same model through Ollama), or a skip with its reason is recorded | 0.5 h agent, 0.25 h owner |
