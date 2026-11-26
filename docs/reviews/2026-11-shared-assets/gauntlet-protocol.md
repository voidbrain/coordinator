# Packs and graders for gauntlet-protocol

Step [solution:F-016-T09](../../work/tasks/F-016-T09.json): every new pack or grader update the five inventories need, listed once with the projects that need it. gauntlet-protocol at `67ef7e6` (release 0.11.1). Under the [shared assets](../../DOMAINS.md#shared-assets) rule, gauntlet-protocol gets only what two or more projects need; a project's own domain cases stay in its repository.

## Needs found

| Need | Projects | Where it lands |
|---|---|---|
| Compare JSON without demanding free text or exact free numbers: ignore `reply`, numbers within a tolerance, arrays in any order | openbando (command batches with `reply` and free positions), fpvbuddy (several batteries in one phrase), nerv (planner actions with free-text arguments such as a reminder title), and research-v1's cited source ids | **New grader**: proposal 1. `exact-json-v1` is a deep, order-sensitive equality (`src/index.ts:1234`) |
| Cases that name a project's MCP tools must stay in step with its tool table | grover, fpvbuddy, hobo, nerv | **New validation**: proposal 2 |
| Four projects start their first domain pack | grover, fpvbuddy, hobo, openbando | **Guide**: proposal 3 |
| Date and time arithmetic | nerv (relative reminder times, nerv:B-143), hobo (arrival times from a start and the totals) | Already planned: **scheduling-time-v1**, [gauntlet-protocol:F-023](https://github.com/voidbrain/gauntlet-protocol/blob/main/docs/BACKLOG.md#f-023) |
| Compute only from figures given, decline when one is missing | nerv (saved recipes, nerv:F-083) | Already planned: **estimation-v1**, [gauntlet-protocol:F-024](https://github.com/voidbrain/gauntlet-protocol/blob/main/docs/BACKLOG.md#f-024) |
| Answer from supplied sources with cited ids | nerv (outside-project reports, nerv:F-085), fpvbuddy (wiring answers, fpvbuddy:F-015) | Already planned: **research-v1**, [gauntlet-protocol:F-025](https://github.com/voidbrain/gauntlet-protocol/blob/main/docs/BACKLOG.md#f-025) |
| Image generation | None found | [gauntlet-protocol:F-021](https://github.com/voidbrain/gauntlet-protocol/blob/main/docs/BACKLOG.md#f-021) continues on its own plan; no project in the inventories generates images (nerv's skip stands; openbando's block-from-description is 3D primitives, not images) |
| Remaining areas | — | [gauntlet-protocol:F-022](https://github.com/voidbrain/gauntlet-protocol/blob/main/docs/BACKLOG.md#f-022) decided them on 2026-11-26 (F-023 to F-025 above; backlog-management skipped); the inventories found nothing that changes it |

**Not proposed as general packs**, one project each: the MCP tool surfaces (grover-v1, fpvbuddy-v1, hobo-v1, each in its project), browser and desktop control (nerv), site-edit commands (openbando), image understanding (fpvbuddy's on-device vision demo, pending the owner's decision in [fpvbuddy](gauntlet-fpvbuddy.md) proposal 3). One of them becomes a general pack when a second project needs it.

## Proposals

| # | Repo | Record or step to create | Estimate |
|---|---|---|---|
| 1 | 🤖 gauntlet-protocol | **New F record, "json-match grader: ignored paths, numeric tolerance, order-free arrays"**. Issue: `exact-json-v1` fails a correct answer whose free text or free numbers differ, so openbando's command batches, fpvbuddy's multi-battery phrases and nerv's planner actions cannot be graded fairly; research-v1's cited ids are a set. Check: a new expected kind (`json-match`) with declared ignored paths, per-path numeric ranges and order-free arrays; deterministic, proven by fixtures (pass and fail per rule); validated by `gauntlet validate`; documented in PROTOCOL; a tagged release. Consumers adopt through their pin | 2 h agent, 0.25 h owner (release) |
| 2 | 🤖 gauntlet-protocol | **New F record, "Check a pack against a tool table"**. Issue: project packs name MCP tools and arguments; when a tool is renamed the case goes stale and still validates. Check: `gauntlet validate --tools <file>` reads a `tools/list` snapshot (name and input schema) and fails on a case whose expected tool or argument is not in it; fixtures for a renamed tool and a removed argument; documented | 1.5 h agent |
| 3 | 🤖 gauntlet-protocol | **New F record, "Guide: a project's own domain pack"**. Check: `docs/guides/project-packs.md` says how a project pins the package as a devDependency, keeps `evals/gauntlet/<project>-v1.json` with regression and holdout splits and invented data, runs `gauntlet validate` in CI (with `--tools` once proposal 2 lands), records skips, and how a consumer (NERV) runs the pack from the project's tag | 0.75 h agent |

**Consumer notes for the planned packs** (no new record): when a session next touches gauntlet-protocol:F-023, F-024 and F-025, it may name the consumers above in each record, so the release step knows who adopts it. They already adopt through their pin ([nerv](gauntlet-nerv.md) proposal 4).
