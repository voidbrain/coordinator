# Hidden code sweep, 2026-11-26

Owner's question, 2026-11-26: FPVBuddy carried an on-device assistant and a VLM vision demo (`model.service.ts`, `runanywhere.ts`, the VLM workers, `llm-ui`, `vision-ui`, three `@runanywhere/*` packages; commits `754eede` 2026-04-02 "initial commit" and `6b75548` 2026-04-13 "VLM model integration"). No record, design doc or roadmap described it, and none of the day's audits or sweeps caught it; only an inventory did. "How did this happen, can it happen again, is something still hidden in fpvbuddy, grover, openbando…?"

Read-only. Proposals go to the coherence review (F-020, freeze); nothing here changes a rule.

## Baseline and method

Components read at `origin/main` after `git fetch` on 2026-11-26 (exported with `git archive`, checkouts untouched):

| Component | Revision | First commit | Harness adopted | Code files read¹ |
|---|---|---|---|---|
| 𖣂 nerv | `eb7ded86` | 2026-11-01 | 2026-11-01 | 248 |
| 🛰️ coordinator | `2f63985` | 2026-11-24 | 2026-11-24 | 4 |
| 🤖 gauntlet-protocol | `7c35c7e` | 2026-11-08 | 2026-11-09 | 38 |
| 🦺 project-harness | `1df95a7` | 2026-10-29 | 2026-10-29 | 61 |
| 🚁 fpvbuddy | `2283dc0` | 2026-04-02 | 2026-11-22 | 25 |
| 🪴 grover | `579f20c` | 2019-08-29 | 2026-11-24 (v2 rebuild) | 75 |
| 🏚️ openbando | `f16f8e5` | 2026-10-16 | 2026-10-29 | 210 |
| 🗺️ hobo | `6f2abaa` | 2026-11-25 | 2026-11-25 | 23 |
| 🧱 bricks | `32ae565` | 2026-11-25 | 2026-11-25 | 46 |

¹ Non-test source files (`.ts`, `.js`, `.mjs`, `.swift`, `.py`) outside `docs/`, `vendor/` and the files `.harness.json` lists.

Method, in two passes:

1. **Mention pass.** Candidates: every code file above, every `dependencies` and `devDependencies` entry, `public/` assets two levels deep, and every `process.env.X` a non-test, non-harness file reads. Each name and its obvious synonyms (file stem, stem without `.service`/`.store`/`.worker`, class-style name, directory) searched in the repository's `docs/**`, `README*` and `AGENTS.md`, plus the coordinator's `docs/DOMAINS.md`.
2. **Ownership pass.** The same search limited to what can own a capability: backlog records (`docs/BACKLOG.md`, `docs/work/records/`, archived backlogs), design and architecture docs, decisions, roadmaps, guides and the README. Path maps and process pages (`AGENTS.md`, `docs/agents/**` including area notes, coverage and impact maps, audits, task JSON, reviews) are left out, because a path in a map is not a record.

Each unowned hit was then read by hand: reachability (who imports it), the commit that added it (`git log --diff-filter=A`) and whether it predates the harness adoption.

Classes: **(a)** live, not documented; **(b)** dead or unreachable; **(c)** inherited from a pre-harness scaffold; **(d)** documented under another name (false positive of the search).

## Replaying FPVBuddy: why the mention pass is not enough

The same scan on FPVBuddy at `44e2d1f` (2026-11-25, before the inventory) shows what happened:

- **Mention pass: almost everything "found".** The harness adoption itself (`301b3eb`, 2026-11-22) wrote the assistant into `AGENTS.md` and the area notes as paths: "`src/app/services/` holds singleton Angular services (`ModelService`, `runanywhere`)", "VLM Worker | `src/workers/vlm-worker.ts`", and a change-impact row for the worker. The coordinator's `DOMAINS.md` code map (`5643ebd`, 2026-11-25) carried the row "On-device models | Model loading and a vision worker". The records named the files only in passing: B-002 and B-006 fixed lint errors in `llm-ui.ts` and `vision-ui.ts`, F-007's dependency check listed `@runanywhere/web`, and the F-007-T04 phone check even asked the owner to wait for the `lfm2-vl-450m` model to load. Only `@runanywhere/web-llamacpp` and `@runanywhere/web-onnx` had no mention at all.
- **Ownership pass: caught.** `model.service.ts`, `src/app/services/`, both `vlm-worker` copies and `public/workers/` had no record and no design doc; `llm-ui` and `vision-ui` had only the lint-fix bug records.

So the assistant was never hidden from the docs. It was named as a path in five places and as a bug fix in two, and no record said what it was for. Every reader (the baseline audit, the coherence read, the dormant-checks run) met the name, and none asked which record owns it. The coherence read even flagged the `vlm-worker` change-impact row, but as a wording problem (`docs/reviews/2026-11-coherence/fpvbuddy.md`, item 6).

## Findings per repository

FPVBuddy's assistant is owned now: decision A ([`docs/decisions/on-device-assistant.md`](https://github.com/voidbrain/FPVBuddy/blob/main/docs/decisions/on-device-assistant.md)) and fpvbuddy:F-023 remove it, wasm and `@runanywhere/web-onnx` included (F-023-T03). The tables list only what the sweep still finds.

Counts are units (a file, a dependency, an asset, an environment variable) flagged by either pass, plus what the hand reading added (marked ✋).

| Repository | Flagged | (a) live, undocumented | (b) dead | (c) pre-harness scaffold | (d) documented under another name |
|---|---:|---:|---:|---:|---:|
| 🚁 fpvbuddy | 23 | 0 | 1 (owned by F-023-T03) | 2 | 20 |
| 🏚️ openbando | 36 | 0 | 0 | 0 | 36 |
| 🪴 grover | 14 + 2 ✋ | 2 ✋ | 0 | 0 | 14 |
| 𖣂 nerv | 17 + 16 ✋ | 9 (all low) | 0 | 0 | 24 |
| 🦺 project-harness | 5 | 5 (test seams, low) | 0 | 0 | 0 |
| 🧱 bricks | 11 | 0 | 0 | 0 | 11 |
| 🤖 gauntlet-protocol | 1 | 0 | 0 | 0 | 1 |
| 🗺️ hobo | 0 | 0 | 0 | 0 | 0 |
| 🛰️ coordinator | 0 | 0 | 0 | 0 | 0 |

Standard toolchain packages (`@angular/*`, `rxjs`, `tslib`, ESLint, Prettier, `@types/*`, Vitest, Playwright) and CI-provided variables (`GITHUB_OUTPUT`, `GITHUB_STEP_SUMMARY`, `GITHUB_ACTIONS`) are not counted; `XDG_CONFIG_HOME` counts as (d).

### 🚁 fpvbuddy

| # | Class | Evidence | Reachable | Note |
|---|---|---|---|---|
| 1 | (c) | `src/app/shared/UI/actions-bar/` (14-line template, empty class), added `6b75548` 2026-04-13 | Yes, in the footer | Shows "Scan QR" and a camera button with no handler. Named only as primitives in F-008's bricks inventory; no record owns a QR scan. |
| 2 | (c) | `src/app/shared/UI/batteries-filters/` (78-line template, empty class), `6b75548` | Yes, in the header | Charged / Stored / Discharged / Hide Dismissed checkboxes with no binding. Same F-008 inventory mention only. |
| 3 | (b) | `@runanywhere/web-onnx` | No importer | Already in F-023-T03's removal list. |
| — | (d) | `public/sw.js`, `manifest.json`, 16 icons (pre-harness) | Yes, `main.ts` registers `/sw.js` | "offline PWA" in F-008. |
| — | (d) | `tailwindcss`, `@tailwindcss/postcss`, `@runanywhere/web-llamacpp` | Yes | F-007 (Tailwind); F-023 (removal). |
| — | (d) | `nav`, `header`, `footer`, `pages/batteries`, `src/fpv-core` | Yes | F-008, F-010, F-005, `docs/architecture/fpv-core.md`. |

All 20 pre-harness code files are still on `main`; after F-023 only the two scaffold components remain without an owner.

### 🏚️ openbando

The richest pre-harness history (214 of 216 pre-adoption code files still on `main`, from `45f850c` "first commit" 2026-10-16), and it is owned. The README's feature list and project layout ("Video: … render an MP4", "`state/` signal stores", "In this browser: WebLLM on WebGPU") and the area notes cover what the records do not name.

| Class | Evidence | Note |
|---|---|---|
| (d) | `@mlc-ai/web-llm` in `ai.service.ts` (14 KB, `05cca89` 2026-10-18 "ai assistant") | The in-browser assistant, openbando's twin of FPVBuddy's case: README "WebLLM on WebGPU", F-057, B-050. |
| (d) | `mp4-muxer` (`export.service.ts`), `@ngrx/signals` (seven stores in `state/`) | README "render an MP4" and the "signal stores" layout line. |
| (d) | Services, stores and `ui/stage` that no record names (`frame-loop`, `panel-placer`, `site-library`, `alignment-position`, `mascot-progress`, `race-links`, …) | Plumbing behind README features, imported by documented components; covered by area notes. |
| (d) | `core/drawing/*`, `core/sim/drone-physics.ts`, editor tools (`ui/studio/editor/*`) | README simulator, Blackbox and studio sections; DOMAINS rows. |

### 🪴 grover

| # | Class | Evidence | Note |
|---|---|---|---|
| 1 | (a) | `apps/hub/src/hub.ts:63`: `setInterval(() => agents.publishAllConfigs(), 10 * 60_000)` | A background job republishes every agent config every 10 minutes; `docs/DESIGN.md:60` says "Republished on every connect and setup change". |
| 2 | (a) | HTTP routes `/api/actuations`, `/api/faults`, `/api/feeds`, `/api/health` (`apps/hub/src/http.ts`) | DESIGN draws "HTTP /api" as one box; the routes are typed in `packages/contracts/src/api.ts` but listed nowhere. Low. |
| — | (d) | `apps/client/src/app/setup/*` (11 files), `plant-report.ts`, `apps/agent/src/drivers/*` | F-006 set-up screens, F-012 plants, F-014 plant statistics, DESIGN "Pi agent". All 15 MCP tools (`grover_*`) are in DESIGN. |

The pre-harness Grover (202 code files, 2019 onwards) was replaced by the v2 rebuild at adoption and survives only as tag `legacy-v1`, which `apps/hub/src/legacy.ts` imports from once (documented).

### 𖣂 nerv

| # | Class | Evidence | Note |
|---|---|---|---|
| 1 | (a) | `NERV_TELEGRAM_API` (`src/telegram.ts:23`) | Loopback stand-in for the Bot API in tests; the code comment is its only doc. Low. |
| 2 | (a) | `NERV_PORT`, `NODO_PORT` (`src/node-lifecycle-execution.ts:649`) | Their presence blocks a lifecycle step; no doc names them. Low. |
| 3 | (a) | `NERV_FULL_CHECKS`, `NERV_VERIFY_GROUPS`, `NERV_VERIFY_PATHS`, `NERV_TEST_TIMINGS` (`tools/plan-verification.mjs`, `tools/selected-tests.mjs`, `tools/test-timing-reporter.mjs`) | CI internals of the verification tools. Low. |
| 4 | (a) | devDependencies `ajv-formats`, `ajv-formats-draft2019` (`test/bom.test.ts`) | Test-only SBOM schema validation. Low. |
| — | (d) | 16 `src/` modules named by no record (`print-job.ts` 22 KB, `coordinator-serve.ts`, `coordinator-lease.ts`, `device-book.ts`, `fpv-builds.ts`, `server-update.ts`, `update-cli.ts`, `install-move-cli.ts`, …) | Each was added by a commit citing its record (F-121, F-016, F-118, F-099, F-095, F-117, …) or is in `docs/decisions/coordinator-relocation.md`; the records name the capability, not the file. |
| — | (d) | `native/…/ApprovalCardView.swift`, `NotificationTests.swift`, `web/public/icons/*` (4), `linkedom`, `XDG_CONFIG_HOME` | Owner-jobs case study; native tests; F-004-T01 PWA; B-145; the systemd convention. Also read by hand and owned: `remove/` (its README and the retirement audit), `evals/speed-benchmark.mjs` (`docs/evaluations/`). |

### Others

- **🦺 project-harness** (a), low: test seams `FRESHNESS_TODAY` (`core/tools/check-freshness.mjs:110`, copied into every project), `HARNESS_SCENARIO`, `HARNESS_USAGE_STORE`/`HARNESS_USAGE_JOB` and `FAKE_CODEX_PID` (template tests). 
- **🧱 bricks** (d): the `catalogue` app (`projects/catalogue/src/app/*`, `comms-demo.ts`, `live-demo.ts`) is in the README and B-001; the nine `public-api.ts` barrels are the entry points ng-packagr requires.
- **🤖 gauntlet-protocol** (d): `eslint.config.mjs` is harness tooling (reconciliation 5.0.0). The `examples/*/tasks/*` and `examples/coding-v1/driver` have no record but are the domain packs `docs/PROTOCOL.md` and `docs/decisions/domain-packs.md` describe.
- **🗺️ hobo**, **🛰️ coordinator**: nothing. Both were born with the harness.

**Answer to "is something still hidden":** no other capability is hidden the way FPVBuddy's assistant was. Openbando ships its own in-browser LLM (WebLLM, up to 7B models), but its README and two records own it. What is left: two inert scaffold components in FPVBuddy (Scan QR, battery filters), one undocumented background job in Grover, and environment variables and test seams in nerv and project-harness.

## How it happened

Every check the harness runs starts from either the records or the code, and none crosses from the code tree to the records:

| Check | Looks at | Why it missed the assistant |
|---|---|---|
| Full audit, area `code` (project-harness `core/docs/agents/audit.md`) | Code | Looks for dead or unreachable code and unused exports. The assistant was live: footer → `llm-ui` → `ModelService`. |
| Full audit, area `documentation` | Docs against code | Asks whether what the docs say is true, not whether everything in the code is in the docs. The paths in `AGENTS.md` were true. |
| Full audit, area `backlog` | Records | Reviews the records that exist. A capability with no record is not in its input. |
| `check:conventions` (unused exports, stack rules) | Code | Every export was used; the Angular conventions passed once B-006 replaced an `any`. |
| `check:audits` | Audit manifests | Validates shape, age and scope, not content. |
| Dormant checks (cross-project audit check 6) | Procedures, test wiring, CI | Finds checks that cannot fail; product code is out of scope. |
| Coherence read (F-020-T01) | Docs and procedures | Read `AGENTS.md`, met `vlm-worker` and judged the wording. |
| Solution gap review (`tools/solution.mjs`, F-097-T03) | Records across repositories | Text heuristics over records only. |
| DOMAINS code map (F-013) | Code, mapped by hand | Listed "On-device models" as a module with links to code but no record column, so the row looked complete. |
| Harness adoption (`301b3eb`) | Code, once | Wrote the existing tree into `AGENTS.md` as a path map without asking what each module is for, then nothing ever re-read it. |

The gap: a path map makes code look documented. The question "which record or design doc owns this module?" is asked by no tool and no audit area. It can happen again wherever code lands without a record: adopting the harness on an existing repository (fpvbuddy, openbando and grover all did), a scaffold or demo merged in one commit, or a dependency added in passing.

## Proposal for F-020 (P-HC1): an ownership inventory

**Smallest check that would have caught FPVBuddy:** a read-only tool, `tools/code-owners.mjs` (template core, report-only first), run in the full audit as part of the area `documentation` and once at harness adoption.

1. **Units:** every top-level module (each directory holding non-test source under the stack's source roots, plus every `*.service`, `*.worker`, `*.store` and route component), every runtime `dependencies` entry, every `public/` subdirectory, every MCP tool name and every `process.env` name read outside tests. Files listed in `.harness.json` are skipped.
2. **Owned** means the unit's path, file stem or a declared alias appears in a record (`docs/work/records/`, `docs/BACKLOG.md`, archived backlogs), a design or architecture doc, a decision or the README. `AGENTS.md`, `docs/agents/**`, coverage and impact maps, audits and task JSON do not count. A record whose only mention is a lint, type or dependency fix does not count either: the record must be a feature (`F-`) or a design doc, or the unit must be listed under an `owns:` alias.
3. **Output:** a table of unowned units with size, first commit and whether something imports them. A unit that is right as it is gets an alias line in its owning record or design doc, so the next run is quiet. Classification (a)/(b)/(c)/(d) stays a human call in the audit report.

On FPVBuddy at `44e2d1f` (2026-11-25) these rules flag `model.service.ts`, `src/app/services/`, both VLM workers, `public/workers/` and `public/wasm/`, the two `@runanywhere/*` packages without a mention, and `llm-ui` and `vision-ui` (lint-fix records only). Today across the nine repositories they would flag about 107 units: the 19 (a)–(c) units above and about 90 (d) units that each need an alias line once.

Cheaper variant, if a tool is too much for the freeze: one line in the audit's `documentation` area, "list the top-level modules, runtime dependencies and environment variables, and name the record or design doc that owns each", plus an "Owner record" column in the `DOMAINS.md` code map. The tool is better because a prose step is exactly what the 2026-11-22 baseline audit already had in spirit and did not do.

Owned by project-harness if accepted (template tool and audit area text); coordinator only for the `DOMAINS.md` column.
