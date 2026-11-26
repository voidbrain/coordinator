# NERV practices transfer and situation gaps, 2026-11-26

Owner's question, 2026-11-26: "I think nerv was the most complete: are all its procedures / audits / checks mapped, considered and eventually proposed for other projects and cross? Is nerv still missing something not covered?" Widened the same day: also what NERV *should* have given its own situation, and the same lens for the solution. Step `solution:F-017-T07`. Read-only: nothing was changed in a component; every proposal below is for the owner to accept or reject, and each accepted one is made by a session in its owning repository.

## Baseline and method

Components read at `origin/main` after `git fetch` on 2026-11-26 (NERV exported with `git archive`; checkouts untouched); GitHub settings read with `gh api` the same day.

| Component | Revision | Component | Revision |
|---|---|---|---|
| 𖣂 nerv | `6847226` | 🪴 grover | `080194c` |
| 🦺 project-harness | `bcefa06` (template 10.23.1; PR #300 open) | 🚁 fpvbuddy | `6043323` |
| 🛰️ coordinator | `4cd62c3` | 🗺️ hobo | `fc67aa3` |
| 🤖 gauntlet-protocol | `f87458d` | 🧱 bricks | `d94b3fc` |
| 🏚️ openbando | `87e96f2` | | |

Method: every NERV `tools/*.mjs`, npm script, CI job and `docs/` practice compared with `project-harness` `core/` and `angular/` and with the other eight repositories; NERV source searched per risk area (update, durability, credentials, taint, approvals, resources, observability, time, skew, privacy, cost, supply chain, runbooks). Searches are evidence of presence; "not found" means not found by the named search, not proven absent.

**Not proposed again** (already planned or already proposed today): harness F-102 (rule measurement), F-103 (shared assets, model-facing work without a case), F-104 (cross-reference and audit-cadence gap kinds), F-105 in PR #300 (cadence and evidence table: CI and flaky tests, security alerts, dependency currency columns); coordinator F-016 (shared assets: bricks, blocks, Gauntlet), F-017 (cross-project audit; [dormant checks](../audits/2026-11-26-dormant-checks.md) proposals 1 to 16), F-018 (alert contract shape); nerv F-062, F-086, F-103, F-125, B-134, B-152. Cross-references below cite them as "planned".

## Inventory: what NERV has beyond the template

`T` = in the template already; repo names = where else it exists.

| # | Item | What it does | Evidence (nerv) | Template / elsewhere |
|---|---|---|---|---|
| 1 | PR names itself in a record | Fails when a PR's number is in no record, task or log | `tools/check-pr-record.mjs:1-3` (F-105); `ci.yml:143-145` | Rule only (AGENTS.md); no check anywhere |
| 2 | Conflict-marker check | Fails on tracked `<<<<<<<` markers | `tools/check-conflict-markers.mjs:1-2` (B-089); `ci.yml:146-147` | None |
| 3 | `check:fast` bundle | One pre-push command | `package.json:74` | coordinator, grover, fpvbuddy, hobo, bricks (own); not T, gauntlet, openbando |
| 4 | Test timing reporter | Per-file start/finish and wall time; names files a killed run never finished | `tools/test-timing-reporter.mjs:1-3` (B-118); `ci.yml:107-109` | None (T has quiet reporter) |
| 5 | Guarded install | Refuses `npm ci` through a symlinked `node_modules` | `tools/install-deps.mjs:1-2` (B-098) | None |
| 6 | CI pin test | Every workflow action pinned by SHA | `test/ci-pins.test.mjs` | All 9 pin by SHA; only nerv tests it |
| 7 | Source-size budget | Lists files over 600 lines | `tools/check-source-sizes.mjs:6`; `package.json:72` (in `check:fast` only) | None |
| 8 | Dependency SBOM | CycloneDX from the lock, CI artifact | `ci.yml:89-94`; `docs/security/bill-of-materials.md` | T (`angular/` CI); grover, fpvbuddy, hobo, bricks, openbando, project-harness; not coordinator, gauntlet-protocol |
| 9 | Decision records | 35 dated decisions with an index | `docs/decisions/README.md` | coordinator, gauntlet-protocol, grover; T only says "add a decision record" (`core/docs/agents/architecture-review.md:18`), no place or format |
| 10 | Threat map and check | OWASP Agentic, LLM and MCP top 10 rows, each citing a test or a gap record | `docs/security/agentic-threats.md:11-50`; `tools/check-threat-map.mjs`; `package.json:73` | None |
| 11 | Multi-OS CI | Windows job and native macOS job (Swift, pinned TLS) | `ci.yml:175-224`, `226-270` | None (all others Ubuntu only) |
| 12 | Scoped verification adapters and full-suite gate | Plan job selects checks; `full-suite` gate requires all jobs | `ci.yml:23-63`, `272-290`; `tools/plan-verification.mjs`, `selected-tests.mjs` | T (`verification.mjs` planner); adapters project-only |
| 13 | Browser and headless suites with axe | Angular, PWA, dashboard shell in Chrome with axe | `ci.yml:121-141`; `test/*.browser.mjs` (4 use axe) | bricks, openbando (axe); grover, fpvbuddy, hobo none |
| 14 | Evaluations and Gauntlet ledger | Deterministic evals, model evals, pending-run ledger | `ci.yml:96-98`; `tools/evaluate*.mjs`, `tools/gauntlet.mjs`; `docs/test-capability-index.md` | Planned: harness F-103-T04, coordinator F-016 |
| 15 | Roadmap status | Milestone status generated from records | `tools/roadmap-status.mjs`; `ci.yml:161`; `docs/BACKLOG-RULES.md:31` | gauntlet-protocol, fpvbuddy have `docs/ROADMAP.md` without the check |
| 16 | Backlog recap | Weekly opened/closed recap | `tools/backlog-recap.mjs`; `ci.yml:148` | None (T has archive recap) |
| 17 | CodeQL workflow | Weekly + PR, JS/TS and Swift | `.github/workflows/codeql.yml:11,67-93` | openbando (default setup); 7 none |
| 18 | Acceptance pages with copy-paste owner steps | 62 dated live/device reports, owner triage page | `docs/acceptance/README.md`, `owner-steps-2026-11-26.md` | T (`ownerLink`, gap kind "Owner's turn without a page"); grover, fpvbuddy have `docs/acceptance/` |
| 19 | Live-view rule | Render once, keyed rows, no innerHTML on polled sections | `docs/STYLE-GUIDE.md:22`; `docs/agents/areas/frontend.md:12` (B-145) | bricks `docs/STYLE-GUIDE.md`; not T |
| 20 | Bilingual parity | Italian and English cover the same UI messages | `test/runtime.test.ts:87`; `web/src/i18n.ts` | openbando `check:i18n` |
| 21 | Rule load budgets, coverage table, change impact, maintenance, audits | Template procedures | `ci.yml:116-118,165-168` | T, all |
| 22 | Project lines | Install folder `~/.nerv-app`, `check:fast`, format and lint scope | `AGENTS.md:26,40-43`; `docs/agents/pull-requests.md:22-24` | Project-specific |
| 23 | Reviews register, model usage, placement driver, icon renderer, Kaji/EVA area invariants | NERV runtime and history | `docs/reviews/README.md` (188 lines); `docs/model-usage.md`; `tools/placement-live.mjs`, `render-icons.mjs`; `docs/agents/areas.md` | Project-specific |

## Class A: generic, propose for the template (every project)

| # | Item | Evidence | Target | Proposal | Effort |
|---|---|---|---|---|---|
| A1 | PR names itself | Inventory 1 | project-harness `core/tools` | `check-pr-record.mjs` as a template check (skips bots and runs with no PR), wired into the CI snippets | 2 h |
| A2 | Conflict markers | Inventory 2 | project-harness | Template check in `check:fast` and CI | 1 h |
| A3 | `check:fast` | Inventory 3; five repos wrote their own | project-harness `core/package-scripts.json` | A default `check:fast` assembled from the adopted checks, project lines extend it | 1.5 h |
| A4 | Test timing | Inventory 4 | project-harness | Timing reporter next to the quiet reporter; its output feeds the F-105 flaky-test column (planned) | 2 h |
| A5 | Guarded install | Inventory 5 | project-harness (parallel work) | `deps:install` guard in the worktree procedure. nerv also drops `worktree:link` (`package.json:75`), which makes the very symlink the guard refuses | 1 h |
| A6 | Pin check | Inventory 6 | project-harness `check-tooling.mjs` | Fail on an action not pinned by SHA (all nine comply today, so it keeps them so) | 1 h |
| A7 | Source-size budget | Inventory 7 | project-harness | Optional, warn-only, threshold in `.harness.json` | 1.5 h |
| A8 | SBOM for non-Angular stacks | Inventory 8 | project-harness `core` CI guidance; coordinator, gauntlet-protocol | SBOM step for every stack, not only `angular/` | 0.5 h + 0.5 h per repo |
| A9 | Decision records | Inventory 9 | project-harness `core/docs` | `docs/decisions/README.md` index and record shape (context, decision, rejected options, supersedes), linked from the Decisions cell | 1.5 h |
| A10 | Axe smoke for Angular | Inventory 13 | project-harness `angular/`; grover, fpvbuddy, hobo | One axe pass per main route in the browser suite (grover's e2e not in CI: dormant T3, already proposed) | 3 h |
| A11 | Dependency vulnerability audit | None of nine runs one (missing practices M3) | project-harness CI snippets | `npm audit --omit=dev --audit-level=high` warn-only first, enforce by setting | 1.5 h |
| A12 | `dependabot.yml` for GitHub Actions | None of nine has one; all pin by SHA, so pins never move | project-harness | Weekly `github-actions` ecosystem config; npm version updates off by default | 0.5 h |

## Class B: fits specific projects

| # | Item | Evidence | Target | Why there | Proposal | Effort |
|---|---|---|---|---|---|---|
| B1 | Threat map and check | Inventory 10 | gauntlet-protocol (runs agents and models in containers), openbando (`tools/ai-proxy.php` adds a paid key server-side), grover (agent app, MCP via nerv:F-123) | External input reaches a model, a tool or a key | A short map per repo with the nerv checker; the checker also fails when a cited gap record is closed (see N6) | 2 h each |
| B2 | Second-platform CI | Inventory 11 | grover | The agent runs on a Raspberry Pi; CI is Ubuntu x64 only | An `ubuntu-24.04-arm` job for `apps/agent` tests | 1 h |
| B3 | Roadmap status check | Inventory 15 | gauntlet-protocol, fpvbuddy | They keep `docs/ROADMAP.md` by hand | Copy `roadmap-status.mjs` or move it to the template as optional | 1 h each |
| B4 | Licence check of dependencies | None of nine | bricks (published `@voidbrain/bricks`), gauntlet-protocol (MIT, not private, `prepack`) | Their dependencies ship to others | Allow-list check on production dependencies in CI | 1 h each |
| B5 | Live-view rule | Inventory 19 | grover, fpvbuddy, hobo dashboards | They poll and redraw | Planned through bricks:F-006 to F-009 (coordinator F-016); no new record | — |
| B6 | Bilingual parity | Inventory 20 | fpvbuddy (Italian battery phrases, `src/fpv-core/batteries.spec.ts:226`) | Only where UI text is bilingual | When fpvbuddy's UI gains Italian, a parity test like nerv's | 0.5 h |

## Class C: solution level (coordinator, cross-project)

| # | Item | Evidence | Target | Proposal | Effort |
|---|---|---|---|---|---|
| C1 | Evals and capability index | Inventory 14 | coordinator, gauntlet-protocol | Planned: coordinator F-016, harness F-103-T04 | — |
| C2 | Cadence evidence | Maintenance, audits, reviews, flaky tests, security alerts | coordinator dashboard | Planned: harness F-104-T03, F-105 | — |
| C3 | Alert path liveness | nerv delivers grover and fpvbuddy alerts (nerv:F-122, coordinator F-018); nothing reports when nerv itself is down (S1 below) | coordinator SOLUTION.md, F-018 | New F-018 step: the contract adds a heartbeat and what a producer does when nerv has not acknowledged for N minutes | 2 h coordinator + per producer |
| C4 | Durable data and backup inventory | nerv F-062 (snapshots, off-host copies, drill pending); grover:F-010 (backup command, no schedule, SD card); fpvbuddy data until it moves; hobo server | coordinator SOLUTION.md | One table: who holds durable data, backup schedule, off-host copy, last restore drill | 1.5 h |
| C5 | Credential inventory | Telegram, APNs, Gmail OAuth (nerv:F-086), GitHub token (nerv:F-132), `OPENBANDO_AI_KEY`, routing keys (hobo), npm trusted publishing (bricks) | coordinator SOLUTION.md | Names, holder, place, rotation date and how to revoke; never values | 1.5 h |
| C6 | GitHub security settings baseline | Missing practices M1, M2 | All nine (🧑 repository settings are ask-first) | One baseline (secret scanning, push protection, Dependabot alerts and security updates, CodeQL default setup) and a check in the cross-project audit | 1 h + owner |

## Class D: NERV-specific, no transfer

| # | Item | Why not |
|---|---|---|
| D1 | Install-folder line, live service rules (`AGENTS.md:26`) | Only nerv runs a self-updating service from an install folder |
| D2 | Verification adapters, `full-suite` gate (`ci.yml:23-63,272-290`) | Generic planner is in the template; the adapters encode nerv's three jobs |
| D3 | Native macOS job, Swift CodeQL (`ci.yml:226-270`; `codeql.yml:88-93`) | No other repository has native code |
| D4 | Placement driver, model evals, icon renderer | nerv's pilots, placement campaign and PWA mark |
| D5 | Reviews register, backlog recap (`docs/reviews/README.md`; `tools/backlog-recap.mjs`) | Volume-driven; recap overlaps the generated views (harness F-096) |
| D6 | Area invariants (Scrolls gate, EVA, Kaji) | nerv's architecture |

## What NERV lacks that others have

| # | Item | Present in | NERV evidence | Proposal | Effort |
|---|---|---|---|---|---|
| N1 | Template tools and scripts | Every other adopter: `guard.mjs`, `behaviour.mjs`, `browser-coverage.mjs`; `guard:install`, `behaviour`, `coverage:browser`, `mcp:recommend`, `reconcile:preview`, `friction`, `impact-map` | `.harness.json` says 10.21.4 but none of these exist; `AGENTS.md:27` tells agents to run `node tools/guard.mjs install` | Planned: nerv:F-125 (reconcile to the latest harness; 10.23.1 adds missing scripts, harness B-124). Add `guard.mjs` to F-125's check | — |
| N2 | Angular bundle budgets | fpvbuddy, hobo, grover, bricks, openbando `angular.json` | `angular.json` has no `budgets` | B- or F- record: budgets for the PWA the owner opens on the phone | 0.5 h |
| N3 | Dependabot security updates | grover, openbando (on) | nerv: alerts on, security updates off (`gh api repos/voidbrain/nerv`) | 🧑 Turn on (M2) | owner |
| N4 | Type-checked e2e/tests | bricks `tsconfig.e2e.json` | nerv `test/*.mjs` unchecked | Already proposed (dormant #10) | — |
| N5 | Sharded browser suites, refresh guard, backup command, changelog check | openbando, coordinator, grover, bricks | nerv's browser suite is selective (B-139); views publish without PRs; nerv backups are richer; nerv is not published | None needed | — |
| N6 | Threat map current | — | Rows still cite closed records as gaps: ASI08 `F-064` (`docs/security/agentic-threats.md:18`), LLM06/LLM10 `F-063` (`:31,35`), LLM08 `F-065` (`:33`); last changed 2026-11-15; the checker validates only the citation shape | B- record: refresh the rows; the checker fails on a gap that cites a closed record | 1.5 h |

## Missing practices across the nine

| # | Practice | Present | Missing | Risk | Proposed owner |
|---|---|---|---|---|---|
| M1 | Secret scanning and push protection | nerv, fpvbuddy, hobo, bricks, openbando | project-harness, coordinator, gauntlet-protocol, grover (all public, so free) | A pushed token in a public repository | 🧑 owner (repository settings); C6 |
| M2 | Dependabot alerts / security updates | Alerts: nerv, grover, openbando. Updates: grover, openbando | Alerts: 6 others. Updates: 7 | Known CVEs unseen | 🧑 owner; F-105 shows the column (planned) |
| M3 | Dependency audit in CI | none | all nine | Same, between alert reviews | project-harness (A11) |
| M4 | `dependabot.yml` | none | all nine | SHA pins never updated | project-harness (A12) |
| M5 | Licence check | none | bricks, gauntlet-protocol matter | Shipping an incompatible licence | B4 |
| M6 | SBOM / provenance | SBOM 7 of 9; provenance: bricks release (`release.yml:104`) | SBOM: coordinator, gauntlet-protocol; provenance: gauntlet-protocol if published | Low | A8, B4 |
| M7 | CodeQL | nerv workflow, openbando default setup | 7 repos; nerv has 50 untriaged alerts (nerv:B-152, planned) | Code-level vulnerabilities | 🧑 owner (C6) |
| M8 | Backup restore drill for deployed data | nerv (tested drill, `test/restore-drill.test.ts:14`; owner drill nerv:F-062-T07 ready) | grover hub (grover:F-010, no schedule or drill) | Pi SD card loses grow history | C4; grover |
| M9 | Performance budgets | Angular bundle budgets in 5 repos; nerv speed benchmark (`docs/evaluations/2026-11-25-f126-t01-speed-benchmark.md`) | nerv bundle budgets (N2); no latency budget for any service | Slow phone PWA | N2 |
| M10 | Load/soak tests | nerv: `evals:stress`, `test/runtime-load.test.ts`, `link-load.test.ts`, `docs/evaluations/mac-load-scenarios.md` | grover hub (24/7 on a Pi) | Low today | grover, later |
| M11 | Disaster recovery for bases | nerv: relocation (F-016), off-host copies to another base (F-062-T06) | No runbook (S9) | See S9 | nerv |
| M12 | Accessibility beyond contrast | axe: nerv, bricks, openbando | grover, fpvbuddy, hobo | Keyboard/label regressions | A10 |
| M13 | i18n completeness | nerv parity test, openbando `check:i18n` | Not needed elsewhere today | — | B6 |
| M14 | Log/PII redaction tests | nerv: fixed-reason diagnostics (`test/instrumentality-runs.test.ts:45`), snapshot logs carry reason only (`src/snapshots.ts:102`) | No test that configured secrets never reach `service.log` (S10) | Token in a log | nerv |
| M15 | Flaky-test tracking | nerv timing reporter; `ci-status.mjs` names flakes | No register anywhere | Flakes hide failures | Planned: F-105 column; A4 |

## Situation-based gaps (NERV)

NERV runs unattended 24/7 on the owner's Mac (launchd, `~/.nerv-app`, self-updating), with standby and relocation across three bases, personal data, credentials, local models, MCP client and server, a phone PWA, Green/Orange/Blue approvals and paid calls. Per risk area: the control that should exist, what exists, and the gap. Rank = likelihood × impact for the owner.

### Controls that exist (no proposal)

| Area | Evidence |
|---|---|
| Update safety | Backup, rehearsal, build, start, verify; failed health restores the backup and tells the owner (`src/nerv-update.ts:131`; `src/update-scheduler.ts:169-217`); newer-config refusal (`src/update-policy.ts:135`). Staged rollout across bases: not found (no canary); low risk while each base rehearses |
| Approvals | Gate and ballot tests (`test/gate.test.ts:42,298`); replayed or expired MCP grant refused (`test/mcp-remote.test.ts:250`); tainted-Blue incident circuits (`src/incident-circuits.ts`) |
| Taint per source | Mail is tainted with an untrusted note (`src/gmail.ts:136-161`); provenance across memory and summaries (`test/provenance.test.ts:13-104`) |
| Model supply chain | Qualification refuses a changed model artifact digest (`src/pilots-qualification.ts:620`); CI actions pinned (`test/ci-pins.test.mjs`) |
| Revision skew | Worker protocol version checked both ways (`src/worker-link.ts:22,217,459`); epoch and lease fencing (`src/coordinator-promote.ts`) with clock-skew margin (`src/kaji-link.ts:407`) |
| Time and DST | Bilingual time rendering tests across brief, chronicle, reminders (`test/brief.test.ts:211`, 30+ files match DST or `Europe/` cases) |
| Crash restart | launchd `KeepAlive`, `ThrottleInterval` 10 (`src/service.ts:61`) |
| Credential rotation (manual) | `nerv credentials rotate admin|telegram|cloud` (`src/cli-commands.ts:534-550`); rotated admin token ends devices and sessions (`src/device-book.ts:77`) |

### Missing controls, ranked

| Rank | Area | Gap | Evidence | Proposed record | Effort |
|---|---|---|---|---|---|
| S1 | Observability: who watches the watcher | Nothing outside the process tells the owner nerv is down, hung or asleep: launchd restarts a crash, not a hang or a powered-off Mac; the standby bases see missed Kaji heartbeats (`src/kaji-link.ts:212`) but no owner notice was found; grover alerts flow through nerv (C3) | No dead-man or outage notice found (search: heartbeat, watchdog, "unreachable"); threat map ASI08 "partial watchdog" (`agentic-threats.md:18`) | nerv F-: a second base (or the phone) notifies the owner when the main misses heartbeats for N minutes; relates to nerv:F-103 (planned measurement) | 6 h |
| S2 | Observability: silent failures | Nightly snapshot and off-host copy failures are only logged and retried tomorrow; Web Push to Apple failed silently (nerv:B-134); health samples never recorded live (nerv:B-111) | `src/snapshots.ts:101-104,135,183` | nerv B-: a failure class that repeats (backup, off-host copy, push, update check) becomes one owner notice and a dashboard row, with a test per class | 4 h |
| S3 | Data durability | Owner restore drill not yet run (nerv:F-062-T07 ready); no backup age on the dashboard; no recurring drill | `docs/guides/backups.md:6,51`; F-062 steps T01-T06 closed | After F-062-T07: a newest-good-copy age signal and a drill cadence in `.harness.json`-style evidence (feeds F-105) | 2 h + owner 0.5 h per drill |
| S4 | Privacy: retention and deletion | Only health samples have a retention cap; inbox, chat episodes, history, ledger, usage and future mail-derived content are kept indefinitely; deletion vs the 7 kept backup copies is undocumented | `src/health-samples.ts:41,82`; no other prune found | nerv F-: retention per table and a "forget" that names backup lag; before nerv:F-086 stores mail | 5 h |
| S5 | Resources: disk | `service.log` and `service-error.log` grow without rotation; no free-space check before snapshots, models or writes; SQLite disk I/O errors already seen (nerv:B-091) | `src/service.ts:62-63,105`; no `statfs` or rotation found | nerv B-: log rotation and a low-disk owner notice that pauses snapshots before the database | 3 h |
| S6 | Supply chain: dependency vulnerabilities | Dependabot alerts on, security updates off, no audit in CI; 50 CodeQL alerts untriaged | M2, M3; nerv:B-152 (planned) | 🧑 settings (N3) and A11 | owner + 1 h |
| S7 | Prompt injection: catalogue coverage | Taint is tested per source, but no test asserts that every tool reading outside data (mail, MCP results, browser, files, Telegram media) returns tainted; threat map rows cite closed gaps (N6) | `test/gmail.test.ts:8`; no catalogue-wide test found | nerv B-: tool registry marks external readers; one test iterates them | 3 h |
| S8 | Credential lifecycle | No inventory with age or expiry; APNs JWT failure invisible (B-134); Gmail access token only "not configured" handling, no revoked/expired refresh path; GitHub token coming (nerv:F-132) | `src/gmail.ts:103-104`; `src/cli-commands.ts:534` | nerv F-: credential list with last rotation and the last auth failure, an owner notice on auth failure; part of nerv:F-086 for Google | 3 h |
| S9 | Incident runbooks | No runbook for: Mac down, database corrupt, bad update after restore, credential leak, split brain during relocation; INSTALL only covers updating | `docs/INSTALL.md:40-45`; no runbook doc found | nerv docs: `docs/guides/incidents.md` with copy-paste steps per case, each tried once in an acceptance page | 3 h + owner trial |
| S10 | Logs and secrets | No test that configured secrets never appear in logs; errors are logged as `e.message` (`src/telegram.ts:443`); the token is in request URLs (`:79,106`), not in today's messages | — | nerv B-: a canary-secret test over the service log for the main failure paths | 1.5 h |
| S11 | Cost of paid calls | Per-sortie budget and per-model concurrency exist; no daily or monthly cap or alert for cloud routes (threat map LLM10 still a gap) | `src/policy.ts:310`; `src/model-budget.ts:24` | nerv F-: a spend window per cloud route with an owner notice at 80 % | 3 h |
| S12 | Performance | PWA has no bundle budget (N2) | `angular.json` | N2 | 0.5 h |

Offline behaviour was not assessed in depth: durable outboxes exist (`src/store-kaji-outbox.ts`, `src/delivery-state.ts`) and reminders run without models (`src/route-health.ts` header); no finding.

### The same lens for the solution

| Rank | Gap | Evidence | Proposal |
|---|---|---|---|
| X1 | Single alert path with no liveness | C3 | F-018 step (C3) |
| X2 | Security settings differ per repository | M1, M2, M7 | 🧑 baseline and audit check (C6) |
| X3 | Durable data with no restore drill outside nerv | M8 | C4 table; grover:F-010 gains a schedule and a drill |
| X4 | Credentials spread over components with no inventory | C5 | C5 table |
| X5 | No dependency vulnerability gate anywhere | M3 | A11 |

## Proposals for the owner

Numbered; 🧑 marks a setting or decision only the owner makes. Each accepted one is made by a session in its owning repository.

| # | Repo | Proposal | From |
|---|---|---|---|
| 1 | nerv | F- record: owner notice when the main base misses heartbeats (watcher of the watcher) | S1 |
| 2 | coordinator | F-018 step: heartbeat and producer fallback in the alert contract | C3, X1 |
| 3 | nerv | B- record: repeated silent failures (backup, off-host copy, push, update check) become owner notices | S2 |
| 4 | nerv | After F-062-T07: backup age signal and a recurring restore drill | S3 |
| 5 | nerv | F- record: retention per table and backup-aware forget, before F-086 stores mail | S4 |
| 6 | nerv | B- record: log rotation and low-disk notice | S5 |
| 7 | all nine | 🧑 Security baseline: secret scanning and push protection on project-harness, coordinator, gauntlet-protocol, grover; Dependabot alerts and security updates on all; CodeQL default setup where code exists | C6, M1, M2, M7, N3 |
| 8 | project-harness | Dependency audit step (warn, then enforce) and `dependabot.yml` for GitHub Actions | A11, A12 |
| 9 | nerv | B- record: threat map rows refreshed; checker fails on a closed gap record; catalogue-wide taint test | N6, S7 |
| 10 | nerv | F- record: credential inventory and auth-failure notices | S8 |
| 11 | project-harness | Template checks: PR names itself, conflict markers | A1, A2 |
| 12 | nerv | Incident runbooks with copy-paste steps | S9 |
| 13 | nerv | Spend window and notice for cloud routes | S11 |
| 14 | nerv | Canary-secret log test | S10 |
| 15 | coordinator | Durable data and credential inventory tables in SOLUTION.md | C4, C5 |
| 16 | project-harness | Default `check:fast`, timing reporter, guarded install, pin check, source-size budget, SBOM for every stack, decision-record convention | A3-A9 |
| 17 | project-harness, grover, fpvbuddy, hobo | Axe pass per main route in the Angular browser suite | A10 |
| 18 | gauntlet-protocol, openbando, grover | Threat map with the nerv checker | B1 |
| 19 | bricks, gauntlet-protocol | Licence allow-list for production dependencies | B4 |
| 20 | grover | arm64 CI job for the Pi agent; restore drill for the hub (grover:F-010) | B2, M8 |
| 21 | gauntlet-protocol, fpvbuddy | Roadmap status check | B3 |
| 22 | nerv | Angular bundle budgets; drop `worktree:link`; F-125 checks `guard.mjs` arrives | N2, A5, N1 |

Counts: inventory 23 items; class A 12, B 6 (1 planned), C 6 (2 planned), D 6; NERV lacks 6 (2 planned or already proposed, 1 none needed); missing practices 15; situation gaps 12 (NERV) and 5 (solution); 22 proposals.
