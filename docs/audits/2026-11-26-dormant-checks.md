# Dormant checks, 2026-11-26

First run of check 6 of the [cross-project audit](../agents/cross-project-audit.md#6-dormant-checks) (`solution:F-017-T06`), at the owner's request of 2026-11-26: "check for other untracked forgotten procedures, audits, tests". Scoped report: procedure settings (area `harness`), test wiring (area `tests`) and CI workflows (area `delivery`) of the nine repositories; it is not a full audit of this repository or of any component. It reads and proposes only: nothing was created or changed in a component.

## Baseline

Coordinator `main` `22744b2` (after #79). Components read at `origin/main` after `git fetch` (exported with `git archive`, local checkouts untouched); workflow runs read with `gh` on 2026-11-26 at about 09:30 UTC:

| Component | Revision | Component | Revision |
|---|---|---|---|
| 𖣂 nerv | `bce6cd7` | 🪴 grover | `1d04cb7` |
| 🤖 gauntlet-protocol | `f209281` | 🏚️ openbando | `af1d268` |
| 🦺 project-harness | `0a07950` | 🗺️ hobo | `66a4706` |
| 🚁 fpvbuddy | `d8b4432` | 🧱 bricks | `18a0b92` |
| 🛰️ coordinator | `4a7680c` (settings unchanged at `22744b2`) | | |

Already known before this run and not counted again: the outside-landscape comparison is off in six repositories (row S2 widens it), nerv's dashboard AA test checks 1 of 20 combinations (nerv B-151), grover's Playwright e2e is not in CI (row T3), and grover, hobo, bricks and the coordinator never had a full audit (cross-project audit proposal 16).

## Method

- **Settings**: each `.harness.json` (`reviews`, `audit`, `maintenance`, `behaviour`, `workUsage`, `coverage`, `verification`) against the evidence it asks for: `docs/reviews/<name>/<date>.md`, `docs/audits/*.audit.json` by `kind`, `docs/agents/maintenance-review.json`, and the template's own rules (`core/tools/check-freshness.mjs` 4b, `core/tools/coverage-table.mjs`, `core/docs/agents/rule-review.md` "Agent-behaviour checks").
- **Tests that do not run**: every `*.test.*`, `*.spec.*`, `*.e2e.*`, `*.integration.*` and `*.browser.mjs` file against the globs of the test scripts and the CI steps; every `tsconfig` used by `typecheck` or CI against the test folders; `skip`, `only`, `todo` and `fixme`; each `npm run X` in AGENTS.md and `docs/agents/*.md` against `package.json`.
- **Tests that cannot fail**: a sample of the "every X" suites (titles with every, each or all; accessibility and contrast; catalogue and schema checks) and a search for constant assertions and swallowed errors in tests.
- **CI**: `gh workflow list --all` and the last scheduled run of each scheduled workflow.

## 1. Procedures off, never run or overdue

| # | Repo | Finding | Evidence | Proposed fix |
|---|---|---|---|---|
| S1 | all nine | The agent-behaviour checks have never run anywhere: no repository sets `behaviour.runner`, no run report exists, and nerv, gauntlet-protocol and openbando have no `behaviour` script or setting. The harness's own record says a rerun is owed. | `.harness.json` `behaviour` = `{"times":3}` (fpvbuddy, grover, hobo, bricks, coordinator), with `rules` (project-harness), absent (nerv, gauntlet-protocol, openbando); project-harness `docs/work/records/F-096.md`: "The owner's agent-behaviour rerun (review step 1 changed) is still due"; F-102 Check asks for before/after behaviour runs | 🧑 Owner chooses a runner. Then project-harness: a new B- record for the overdue rerun, and a `behaviour.runner` project setting in each repository that runs it |
| S2 | fpvbuddy, grover, hobo, bricks, coordinator, openbando | No periodic reviews at all: `reviews` is unset, so the token and skills reviews are off as well as the architecture review (and its outside-landscape comparison). `check:freshness` warns only for configured reviews. | `.harness.json` has no `reviews`; no `docs/reviews/` folder. nerv, gauntlet-protocol and project-harness set `token`, `architecture`, `skills` at 30 days, all current (latest 2026-11-16 to 2026-11-24) | Enable setting: `reviews` `{token, architecture, skills: {days: 30}}` in each, then a first review of each |
| S3 | nerv, grover, openbando, fpvbuddy, hobo, bricks | Coverage regressions can never fail CI: `coverage.enforce` is `false` or unset, so `coverage-table --check` in CI only warns, and the configured `drop: 2` tolerance has no effect. coordinator, gauntlet-protocol and project-harness measure no coverage. | `coverage` `{enforce: false|unset, drop: 2}`; template `core/tools/coverage-table.mjs:40,209` (fails only `if (enforce …)`) | 🧑 Owner decides per repository (the template makes it optional); enable once a `main` baseline exists |
| S4 | nerv, fpvbuddy, gauntlet-protocol, project-harness, openbando | Full audits are current but `audit.enforce` is off in nerv, fpvbuddy and gauntlet-protocol; next full audits fall due 2026-11-27 (nerv, last 2026-11-20), 2026-11-29 (fpvbuddy, gauntlet-protocol, project-harness, last 2026-11-22) and 2026-11-30 (openbando, last 2026-11-23) | `docs/audits/*.audit.json` `kind: full` | Already proposals 16 and 17 of the cross-project audit; no new proposal |
| S5 | fpvbuddy, grover, hobo, bricks, coordinator, openbando | Work-usage measurement is off (`workUsage.enabled: false`; absent in openbando); only nerv and gauntlet-protocol measure jobs | `.harness.json` `workUsage` | 🧑 Owner decision: opt-in by design; record it as a choice, no record unless the owner wants the measurements |

No finding: the maintenance review receipt is current in all nine (`docs/agents/maintenance-review.json` reviewed 2026-11-25 or 2026-11-26, interval 7 days), and every configured periodic review is inside its interval.

## 2. Tests that exist but do not run, or run unchecked

| # | Repo | Finding | Evidence | Proposed fix |
|---|---|---|---|---|
| T1 | nerv | 14 Node test sites that need macOS skip on every CI runner: the EVA `sandbox-exec` confinement (network and writes outside the workspace, refused or let through), the egress proxy, the EVA job user, EVA jobs and pool, and the macOS desktop driver. The Node suite runs on Ubuntu and Windows; the `native-macos` job runs only the Swift tests. The live service runs on macOS, so its confinement is tested only when someone runs `npm test` on a Mac. | `test/eva-classes-runner.test.ts:96,133,158,194`, `test/eva-pool.test.ts:139`, `test/eva-runner.test.ts:32,136`, `test/eva-jobs.test.ts:172,225`, `test/eva-job-user.test.ts:81,116,143`, `test/egress-proxy.test.ts:386`, `test/desktop-macos-driver.test.ts:150` (`skip: !isDarwinWithSandbox` or `platform !== 'darwin'`); `.github/workflows/ci.yml` `native-macos` runs `swift test` only | New B- record in nerv: run the darwin-only Node tests in the `native-macos` job (or a macOS step of the full suite), failing when they skip |
| T2 | gauntlet-protocol | The 15 test files are in no `tsconfig`: `typecheck` and `build` check `src/**/*.ts` only, and Node strips the types of `test/*.test.ts` without checking them, so a wrong call in a test runs unchecked (the kind of error behind nerv B-151) | `tsconfig.json:20-22` (`"include": ["src/**/*.ts"]`); `package.json` `typecheck: tsc --noEmit` | New B- record in gauntlet-protocol: a test tsconfig (or `test/**/*.ts` in `include`) in `typecheck`, fixing what it finds |
| T3 | grover | Playwright e2e (`e2e/dashboard.spec.ts`) has no CI step (known) | `package.json` `e2e`; `.github/workflows/ci.yml` has no e2e step | Wire into CI (grover record, already known) |
| T4 | openbando | The 23 Playwright specs and their helpers (`e2e/contrast.ts` among them) are in no `tsconfig`; CI type-checks the app and three tool folders only, and Playwright does not type-check | `playwright.config.ts:8-9`; `.github/workflows/ci.yml:144`; no `tsconfig` names `e2e` | New B- record in openbando: `tsconfig.e2e.json` in the CI type check, as bricks does (`bricks/tsconfig.e2e.json`) |
| T5 | fpvbuddy, grover, openbando | Angular spec files are outside `typecheck`: it runs `tsconfig.app.json`, which excludes `*.spec.ts`, while hobo and bricks also run `tsc -p tsconfig.spec.json`. In fpvbuddy the FPV core's specs are also excluded from the core's own `tsconfig` and run by Vitest, which strips types. Whether `ng test`'s build reports type errors in specs was not verified here. | fpvbuddy `package.json` `typecheck`, `src/fpv-core/tsconfig.json:22`; grover `package.json` `typecheck` (`apps/client/tsconfig.app.json`); openbando `ci.yml:144` | Wire into CI: add `tsc -p tsconfig.spec.json --noEmit` (and the core's specs) to `typecheck` in each; a B- record if it finds errors |
| T6 | nerv, coordinator, project-harness | JavaScript tests are not type-checked: nerv's 34 `test/*.test.mjs` and 8 `test/*.browser.mjs` (its `tsconfig.json` includes `.ts` only, no `checkJs`); the coordinator's 4 and the harness's 20 test files are JavaScript in JavaScript repositories | nerv `tsconfig.json` `include: ["src/**/*.ts","test/**/*.ts"]` | nerv: a B- record to add `// @ts-check` or `checkJs` for `test/*.mjs`; coordinator and project-harness: false positive by stack (JavaScript only, ESLint runs) |
| T7 | grover, hobo, bricks, coordinator; nerv, gauntlet-protocol, openbando | npm scripts that a procedure tells agents to run do not exist: `work:pr` (in `docs/agents/pull-requests.md`, the way to open a PR with source-owned records) is missing in grover, hobo, bricks and the coordinator; `behaviour` (`rule-review.md`) in nerv, gauntlet-protocol and openbando; `coverage` and `coverage:browser` (`coverage-guide.md`) in the coordinator, gauntlet-protocol and project-harness, `coverage:browser` in nerv and openbando. Every check AGENTS.md lists exists. The `skills:*` and `check:skills` scripts named in `skills.md` exist only in project-harness: false positive (that section applies to a repository that ships skills). | `package.json` `scripts` against `grep "npm run"` in `AGENTS.md` and `docs/agents/*.md` | project-harness: one B- record so reconcile adds the scripts a copied procedure names (or the procedure says when they apply); each repository picks them up at its next reconcile |
| T8 | nerv | False positive: `test:browser`, `test:headless` and the Windows service test run only when the verification plan selects them, by design (B-139), with a full run forced at 7 days or 10 merged PRs; the last full run was 2026-11-26 (run 45790029867, all jobs green) | `.github/workflows/ci.yml` plan job; `.harness.json` `verification` | None |
| T9 | openbando | False positive: the e2e jobs run on every PR but not before a Pages deploy (stated in `ci.yml:6-8`), and `e2e/*.record.ts` are recordings, outside `testMatch` on purpose | `.github/workflows/ci.yml:4-14,150-152` | None |

No other finding: every test file in the nine repositories matches a test script or a CI step; no `.only`, `xit`, `fit` or `todo` is left in a suite; the other `skip`s are platform conditions a CI runner satisfies (Windows-only cases run on nerv's Windows job; gauntlet-protocol's container tests are forced on in CI).

## 3. Tests that cannot fail

| # | Repo | Suspect | Evidence | Proposed fix |
|---|---|---|---|---|
| C1 | nerv | The B-102 test ("a string the code can show, send or prompt with never names a backlog ID") scans only the top-level `src/*.ts` and the old `dashboard.js`, not the Angular UI in `web/src`. The new dashboard shell shows step IDs to the owner today, which the rule forbids, and no test sees it. | `test/user-text-ids.test.ts:9-13`; `web/src/dashboard/shell.ts:12-23` (`F-130-T02` … `F-130-T11`) rendered at `:128` (`<span class="meta">{{ m[1] }}</span>`) | New B- record in nerv: the scan covers `web/src` (it fails first), then the shell stops showing IDs |
| C2 | nerv | Known (B-151): the AA test's `lum` reads only six-digit hex, so `#000`, `#fff` or `rgba(…)` give `NaN`, `NaN < 4.5` is false and the pair passes | `test/dashboard.test.ts:308-326` | Already nerv B-151 |
| C3 | nerv | The browser axe checks assert only `violations`. Text whose contrast axe cannot decide (over gradients, images or the CRT layers) lands in `incomplete` and is dropped (dashboard shell) or only logged (Angular suite), so a contrast failure there passes. | `test/dashboard-shell.browser.mjs:17,100,107`; `test/angular.browser.mjs:173-185` (`incomplete` goes to `t.diagnostic`) | New B- record in nerv: fail on `color-contrast` in `incomplete`, or name each accepted node |
| C4 | bricks | The in-page contrast helper ignores alpha (a translucent token is measured as opaque) and a token that does not resolve falls back to the inherited colour instead of failing. The second case is covered by the undeclared-token assertions; the first is not. | `e2e/catalogue.spec.ts:16-24` (`.slice(0, 3)`); mitigations `:110`, `:284`, `:630` | Low: a B- record in bricks to fail on an alpha below 1 or composite it over the surface, as openbando's `tools/check-contrast.mjs` does |
| C5 | grover | "Threshold alerts have a positive hysteresis margin for every probe kind" iterates a hand-written list of five kinds, so a new probe kind is not checked | `apps/hub/test/alerts.test.ts:29-33` | Low: iterate the probe kinds from `packages/contracts` (a B- record in grover, or fold into grover:F-008-T04) |

Sampled with no suspect: openbando `tools/check-contrast.mjs` (one `:root` theme, so the last-definition map loses nothing), openbando's catalogue, examples, i18n and tour specs (each guards against an empty list), bricks' 20-combination axe and contrast test, grover's `theme.spec.ts`, nerv's verification-policy globs (`assert.ok(files.length)`), nerv's Gauntlet pack test, gauntlet-protocol's coding runner. The swallowed errors found in tests (`.catch(() => {})`, `catch {}`) are teardown or wait helpers, not assertions.

## 4. CI workflows disabled or not running

| # | Repo | Finding | Evidence | Proposed fix |
|---|---|---|---|---|
| W1 | hobo, bricks | The daily maintenance workflow has never run (the repositories were created on 2026-11-25 at 21:01 and 21:27 UTC). Elsewhere the `0 9 * * *` schedule fires at about 19:00 UTC (nerv 2026-11-25T19:04, grover 19:00), so the first run is due this evening. | `gh run list --workflow maintenance.yml`: no runs; `gh api repos/voidbrain/<repo>` `created_at` | One `workflow_dispatch` run in each to prove it; confirm a scheduled run on 2026-11-27 |
| W2 | nerv | The weekly scheduled full CI run of 2026-11-23 was cancelled: the concurrency group is per ref with `cancel-in-progress`, so a push to `main` cancels the scheduled run (last scheduled success 2026-11-16). The full-run freshness rule still forced a full run (2026-11-26), so nothing went unchecked. | `.github/workflows/ci.yml:14-18`; run 45243110680 (`full-suite` and `native-macos` cancelled) | Low: a B- record in nerv to give scheduled runs their own concurrency group |

No other finding: no workflow is disabled in any of the nine repositories (`gh workflow list --all`: all active); nerv's weekly CodeQL schedule was added on 2026-11-25 and is first due 2026-11-30; the coordinator's hourly view refresh ran on 2026-11-26.

## Proposals

Numbered for the owner; each accepted one is made by a session in its owning repository, under its own rules. 🧑 marks an owner decision.

| # | Repo | Proposal | From |
|---|---|---|---|
| 1 | nerv | B- record: run the darwin-only Node tests (EVA sandbox, egress proxy, job user, desktop driver) on the macOS runner | T1 |
| 2 | nerv | B- record: the B-102 user-text scan covers `web/src`; the dashboard shell stops showing step IDs | C1 |
| 3 | gauntlet-protocol | B- record: type-check `test/**/*.ts` | T2 |
| 4 | project-harness | 🧑 Choose a behaviour runner; B- record for the overdue rerun (F-096, F-102) and a `behaviour.runner` setting per repository | S1 |
| 5 | openbando | B- record: `tsconfig.e2e.json` in the CI type check | T4 |
| 6 | nerv | B- record: axe `incomplete` colour-contrast results fail or are listed | C3 |
| 7 | fpvbuddy, grover, hobo, bricks, coordinator, openbando | Enable `reviews` (token, architecture, skills; 30 days) and write the first of each | S2 |
| 8 | nerv, grover, openbando, fpvbuddy, hobo, bricks | 🧑 Decide `coverage.enforce` per repository | S3 |
| 9 | fpvbuddy, grover, openbando | Add the spec `tsconfig` (and fpvbuddy's core specs) to `typecheck` | T5 |
| 10 | nerv | B- record: type-check `test/*.mjs` | T6 |
| 11 | project-harness | B- record: reconcile adds the npm scripts a copied procedure names (`work:pr`, `behaviour`, `coverage`), or the procedure says when they apply | T7 |
| 12 | hobo, bricks | Run the maintenance workflow once by hand; confirm the schedule | W1 |
| 13 | nerv | B- record: scheduled CI runs in their own concurrency group | W2 |
| 14 | bricks | B- record: the contrast helper accounts for alpha | C4 |
| 15 | grover | Alert hysteresis test iterates the contract's probe kinds | C5 |
| 16 | fpvbuddy, grover, hobo, bricks, coordinator, openbando | 🧑 Record whether work-usage measurement stays off | S5 |

## Limits

- Text and configuration reading plus a sample: "no finding" for tests that cannot fail covers the files read, not every suite. The sample favoured accessibility, contrast and "every X" tests.
- Whether `ng test` (the Angular unit-test builder) reports type errors in spec files was not run here (T5).
- Workflow run history was read once, at about 09:30 UTC; a scheduled run delayed past that time is not seen.
- Settings were read at the revisions above; a repository changed after them is not covered.
