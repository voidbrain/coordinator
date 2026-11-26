# Decision proposal: live index for backlogs and dashboard

Owner decision needed, through coordinator:[F-020](../BACKLOG.md#f-020) (the freeze sends decisions there). Written 2026-11-26 on the owner's approval in chat ("ok", 2026-11-26). A proposal, not an implementation: nothing here changes a rule, a tool or a component.

## Problem, measured on 2026-11-26

Merged PRs of 2026-11-26 (UTC) in the nine repositories, classified by their changed files and title (`gh pr list --state merged --search merged:2026-11-26`, files and titles):

| Merged PRs | Count | Share |
|---|---:|---:|
| All, nine repositories | 228 | 100% |
| Touched only records, ledgers, archives or generated views | 90 | 39% |
| of which mechanical bookkeeping: close a step after green CI, name a PR, header catch-up (30), dashboard refresh (6), `coordinator:ID` rename (4) | 40 | 18% |
| of which recording an owner decision or an order change | 10 | 4% |
| of which planning new records | 40 | 18% |

Per repository, records-only of all: coordinator 27/56, nerv 18/50, project-harness 14/26, FPVBuddy 7/20, Grover 6/16, bricks 5/16, gauntlet-protocol 5/20, hobo 4/14, openbando 4/10. Inside code PRs the same bookkeeping costs commits and CI runs: 130 "name PR" commits in nerv (62), the coordinator (45) and project-harness (23) that day, and 29 "merge main into the branch" commits.

Other evidence:

- **Freshness.** Refresh solution views ran on schedule 2 times on 2026-11-26 (about 18 hourly slots); the dashboard went 6 h 19 min without a refresh PR (10:58 to 17:17 UTC), and was reported 7 h stale ([B-006](../BACKLOG.md#b-006)). Backlog headers trail main until a catch-up PR.
- **ID collisions.** Parallel agents picked the same next ID (nerv B-148/B-149; coordinator F-019/F-020); nerv commit `6cb52305` renumbers a record after one. The generated `docs/BACKLOG.md` conflicts on almost every parallel merge.
- **Decisions in chat** are invisible until an agent writes them into a record.
- **Cross-repository questions** ("what waits on me", "what does X block") need all nine clones fresh.

## Options

| | A. Status quo plus small fixes | B. Hybrid: Markdown stays the source, a live index on an always-on base | C. Records move into a database |
|---|---|---|---|
| How it works | NERV dispatches the refresh hourly (nerv:F-132-T04, planned); each component's CI dispatches the coordinator refresh on merge; a daily bot PR per repository closes Implemented steps whose PR merged green | Records stay Markdown/JSON in git, reviewed by PR. An index service polls the nine repositories' `main` and PRs (conditional requests, every 5 min) and rebuilds a SQLite index on each new commit. It serves a live dashboard, cross-repository queries (CLI, REST, MCP), ID reservation, derived bookkeeping state and a "decisions pending" inbox | Records live in SQLite or a graph store behind an API/MCP; git holds exports only. Review and history need an audit log, a proposal/approval flow for changes and a migration of nine backlogs and every harness check |
| Agent hours | 6 to 8 (T04 already planned; dispatch on merge 2 to 3; bot close 3 to 4) | Phase 1 about 14 (index builder 4, service setup in its owning repository 2, poller, store and live view 6, MCP queries 2); phase 2 about 7 (ID reservation 3, derived bookkeeping and batched PR 4); phase 3 about 3 (decisions inbox). About 24 in all | 60 to 100, plus rewriting rules in every repository |
| Keeps | Everything; git is the only truth | PR review, diffs, blame, offline work, harness checks; git stays the truth and the index is disposable | One place to query; atomic IDs |
| Loses or risks | Still 10 to 15 minutes late at best; a token in eight repositories for dispatch; bookkeeping PRs shrink but stay; no fix for IDs or queries | A second view that can lag git (minutes); a multi-repository read token on a base; work in two or three repositories | Review by PR, offline work and git history of records; its host becomes a single point of failure for all planning; the largest rule change of the solution |

**What B gives, concretely.** (1) A live dashboard view minutes after a merge; the committed `SOLUTION-DASHBOARD.md` stays as the git copy, refreshed as today. (2) **ID reservation:** an agent asks the index for the next free ID in a repository; the index records the reservation (with branch and expiry) and the agent's PR writes the record; `check:backlog` on main still refuses a duplicate. (3) **Derived bookkeeping:** the index knows when a step's PR merged on green, so the dashboard shows it closed at once; the Markdown catches up in one batched bot PR per repository per day instead of one PR per step. (4) **Queries** across the nine repositories without clones. (5) **Decisions pending:** an agent posts "owner said X about record Y" to the index (an MCP tool); it shows as pending until a PR records it. It only helps when the agent posts it; chat itself is not read.

Generated-file conflicts are a separate, cheaper fix in any option: project-harness already ships `merge-backlog.mjs`; registering it as a git merge driver for `docs/BACKLOG.md`, or not committing the generated ledger at all, is a harness question for F-020-T04.

## Concerns for B

| Concern | Proposal |
|---|---|
| Security | Phase 1 uses a read-only fine-grained token (contents, pull requests, actions: read) for the nine repositories, on the hosting base only, never in git (as F-132-T02 does for NERV's dispatch token). Phase 2's batched bot PR needs write access: a separate token or GitHub App, scoped per repository, an owner ask-first step (repository settings and secrets) |
| Availability | Index down: git, PRs and CI work as today; IDs fall back to scanning `main` and open PRs; the dashboard falls back to the committed copy. The index is rebuilt from git in minutes, so it needs no backup |
| Webhooks | Not proposed: no base has a public endpoint and no hosted deployment. Polling with ETags costs well under GitHub's 5,000 requests per hour |
| Multi-base | See [who owns it, where it runs](#who-owns-it-where-it-runs) |
| Offline | Agents work on git as today; reservations and derived state catch up on reconnect |
| Rules | Phase 1 changes no rule. Phase 2 changes rules ("name the PR by hand", "close after green CI", ID choice) and goes through F-020-T04 and T05 under the freeze |

## Who owns it, where it runs

Owner questions 2026-11-26: "NERV or another dedicated project?" and "until a node is up NERV is up, so it can do/continue everything (if models can), correct?". Owning the code and hosting the process are separate choices.

**Ownership.** In every option the parsing is project-harness's: `solution.mjs` and `work-items.mjs` already read the backlogs, and the builder is generic (template first).

| Owner of the service | For | Against |
|---|---|---|
| (i) NERV, as a feature | Already always-on, has SQLite, a dashboard and GitHub access (F-132) | Cross-project backlog state is not NERV's domain; NERV would hold a copy of every project's status and a view of other projects' work, against "a project owns its domain", "no copies" and the screens rule ([DOMAINS](../DOMAINS.md)); couples planning to NERV's release cycle |
| (ii) The coordinator | Cross-project state is already its domain: it generates the dashboard and holds the cross-repository records; exposes an MCP server and its own bricks screen, and NERV shows it through MCP surface cards like any project | The coordinator stops being docs-only: its project line "nothing is built or deployed" changes (an owner decision under the F-020 freeze), and it gains source, tests and a release; about 2 h more setup |
| (iii) A new dedicated project | Clean boundary | A tenth repository with its own harness, backlog and audits, for a domain the coordinator already owns |

**Hosting.** An always-on process needs a base. NERV's bases run 24/7 services: NERV-01 Neo Tokyo-3 (Mac, main: coordinator role, root key, Telegram), NERV-02 Tabgha (Windows mini PC, worker), NERV-03 Calvary (Pi CM4, worker) (nerv `docs/acceptance/f005-device-matrix.md`). The index runs on whichever base holds the coordinator role and moves with it; it is rebuilt from git, so a new host needs no copied state and no replication.

**Does NERV keep doing everything while one base is up? Not today.** Checked at nerv `origin/main`, 2026-11-26:

- (a) **Failover is not automatic, by design.** "Missed heartbeats or `KajiLink` offline events never trigger automatic failover"; relocating the coordinator role needs the owner's signed record (`nerv kaji relocate`, then `nerv kaji promote` on the new base) (nerv `docs/decisions/coordinator-relocation.md`). The building blocks are merged (F-016-T03 to T20), but the two-device relocation acceptance F-016-T09 (owner, 1 h) is still planned and nerv:F-016 is open: relocation is built, not yet proven on two devices.
- (b) **Models per base.** NERV-01 runs gemma4:26b and gemma4:12b (Ollama). NERV-02 runs gemma4:12b (Ollama, set up 2026-11-05). NERV-03 hosts no useful LLM ("A Pi can expose device operations and voice without hosting a useful LLM", nerv `docs/architecture/runtime.md`); its chat can only borrow a model from another base over Tailscale. The cloud route (Umbilical) is off (`models.cloud` off).
- (c) **What degrades.** While the main base is down and no one has relocated the role, the other bases give only an explicitly labelled local chat fallback: no reminders, grants, outbox, Telegram or coordinator state. After a relocation to NERV-02, everything runs on the 12b model (smaller replies; nerv:F-120 measures planning quality). After one to NERV-03, the coordinator duties run but chat needs a model from a live base, so with only the Pi up there is none. The index itself needs no model: it keeps working on any base that holds the role.

## Migration, in steps that each stand alone

1. Harness: index builder (records, steps, PRs, owners, dependencies) to SQLite, with tests on two fixture backlogs.
2. Coordinator: the index service (poll, rebuild on change, MCP queries, a bricks screen), run on the base holding NERV's coordinator role; NERV shows it through MCP surface cards. Measure for two weeks.
3. Only if the numbers below justify it: ID reservation, derived closing with a batched daily PR, rule changes via F-020.
4. Decisions-pending inbox.

## What to measure to decide phase 3

Baseline 2026-11-26 and target after two weeks of phase 1: mechanical bookkeeping PRs 40 of 228 (18%), target under 5%; "name PR" commits 130 in three repositories; dashboard age after a merge up to 6 h 19 min, target under 10 min; ID collisions per week (three reported on 2026-11-26, one renumber commit), target 0.

## Recommendation

B, phase 1 only for now: a read-only index, its builder a harness tool, its service owned by the coordinator and hosted on the base holding NERV's coordinator role, with git kept as the truth. It removes the staleness and the nine-clone queries without changing a rule, and gives the numbers to decide phases 2 to 3 inside F-020. Owner of the service: (ii), the coordinator, because the live cross-project view is the dashboard it already generates, and (i) would make NERV hold copies of other projects' state against the domain rules; (iii) adds a repository for no new domain. Not C: it trades away review by PR and offline work for gains B already gives.

## Owner question

How should backlogs and the dashboard become live?

- **1.** Small fixes only (option A): hourly refresh from NERV (F-132-T04), refresh on merge, a daily bot PR to close steps.
- **2.** Start the live index, read-only (option B, phase 1, about 14 agent hours: builder in project-harness, service in the coordinator, shown in NERV over MCP), then decide ID reservation and automatic closing with the measurements in F-020. *Recommended.*
- **3.** Move the records into a database (option C).
- **4.** Not now: revisit when F-020 ends.

If 2: who owns the service? **(ii) the coordinator** (recommended; it then becomes a project that builds and runs code), **(i) NERV** or **(iii) a new project**.

## Answer

Pending.
