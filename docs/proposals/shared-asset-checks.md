# Proposal for the harness template: shared-asset checks in the gap review

Written 2026-11-26 in voidbrain/coordinator (`solution:F-016-T02`) for the owner to take to a project-harness session. Nothing here changes the template. The template's own session decides, records and releases. Until a release adopts it, the coordinator runs these checks by hand ([gap review](../agents/gap-review.md#shared-asset-checks)).

## Problem

The coordinator's domain map names three shared assets: a UI library, a shared domain-logic monorepo and a model-qualification suite ([shared assets](../DOMAINS.md#shared-assets)). New work should use them, or record why not. The gap review should flag:

1. UI that duplicates the shared UI library, or is missing from it;
2. domain logic imported by two or more components that is not in the shared logic repository;
3. a model-facing feature or MCP tool with no evaluation case and no recorded skip.

The solution tool (`tools/solution.mjs`) reads backlogs and `.harness.json`. It has no notion of a shared asset or a skip, so it cannot find any of the three. Today they are read by hand, and a missed check leaves no trace.

## Proposed generic feature

1. **Shared assets in the manifest.** `.solution.json` `sharedAssets`: `[{ "id": "…", "component": "<manifest id>", "kind": "ui" | "logic" | "evaluation" }]`. The template names no particular library.
2. **Recorded skips, machine-readable.** A component's `.harness.json` `sharedAssets.skips`: `[{ "asset": "<id>", "scope": "project" | "<record ID>", "reason": "…" }]`. A skip without a reason is a check failure. The coordinator's domain map keeps the human-readable table.
3. **Evaluation coverage, from what the project already declares.** For `kind: "evaluation"`, a component that declares `evaluations` in `.harness.json` already names its pending cases (BACKLOG-RULES, "Evaluation dependencies"). The proposal adds an optional `covers` command that lists the model-facing features or MCP tools it has cases for. A new gap kind, "Model-facing work without a case", fires when a component exposes MCP tools and has neither `evaluations` nor a project-scope skip. It is a prompt to check, like the cross-repository kind, not proof.
4. **Duplication stays heuristic and hand-read.** UI and logic duplication need code reading that a backlog reader cannot do. The tool only lists, per component, the shared assets it neither depends on (`package.json` dependencies) nor skips, as one "Shared asset not used or skipped" gap line. The reviewer reads the code.

## Acceptance (for the template's session to refine)

- `solution.mjs check` validates `sharedAssets` (known component, known kind) and each component's skips (known asset, reason present).
- The dashboard's gap review gains the two kinds above, numbered with the others. Each names the repository that would own the fix.
- Nothing is required of a solution that declares no `sharedAssets`.
