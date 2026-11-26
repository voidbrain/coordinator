# Decision proposal: live index for backlogs and dashboard

Owner decision taken 2026-11-26 (see [Answer](#answer)), through coordinator:[F-020](../BACKLOG.md#f-020) (the freeze sends decisions there). Written 2026-11-26 on the owner's approval in chat ("ok", 2026-11-26). A proposal, not an implementation: nothing here changes a rule, a tool or a component.

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

## Scope: status first, knowledge second

Owner question 2026-11-26: "only a record refresher or a knowledge source", over all projects' backlogs, roadmaps and documentation? Both, as two layers with their own cost and risk, layer 1 first. Owner direction on scope 2026-11-26: "ok in phases" (layer 1 status first, layer 2 knowledge after). Whether to build it at all, and who owns it, stay the owner's decision below.

**"Records stay in git"** means: the Markdown and JSON files in each repository (records, steps, decisions, docs) are the only truth; they change only through reviewed PRs, as today. The index only reads them; it never writes a record, and anything it shows can be rebuilt from git.

| | Layer 1: status | Layer 2: knowledge |
|---|---|---|
| Reads, in all nine repositories | Records, steps, owner steps, priorities, dependencies; PRs and CI results; harness versions; audit dates | Roadmaps, decision records, `DOMAINS.md` contracts, reviews (for example the architecture landscape review), procedures, design docs, READMEs |
| Gives | Live dashboard, "waiting on me", "blocked by X", later atomic IDs and automatic step closing (phase 2) | Full-text search (SQLite FTS5) and a link graph: record, PR, decision, contract, owning repository. Every answer links to the source file on GitHub at its commit: the index points, it never becomes the copy that counts |
| Asked how | Dashboard screen; MCP tools for agents and NERV | MCP search tools; NERV asks in Italian ("quali decisioni aspettano me?") and its model turns the question into tool calls; Italian wording on English docs depends on the model, as nerv:F-120 measures |
| Agent hours | About 16 for phase 1, about 10 for phase 2 (steps below) | About 8 (phase 3, steps below) |
| Risks | A lagging view (minutes); a wrong derived status if the parser misreads a record (the harness checks already parse the same files) | An answer quoted from an outdated page; private repository text served beyond git, so it is served on the owner's bases only, never published |

**The limit, for both layers:** only what is written down is indexed. A decision said only in chat stays invisible to the index, to NERV and to every other session; that is why each decision must become a record (the decisions-pending tool only reminds an agent to write it).

## Options

| | A. Status quo plus small fixes | B. Hybrid: Markdown stays the source, a live index on an always-on base | C. Records move into a database |
|---|---|---|---|
| How it works | NERV dispatches the refresh hourly (nerv:F-132-T04, planned); each component's CI dispatches the coordinator refresh on merge; a daily bot PR per repository closes Implemented steps whose PR merged green | Records stay Markdown/JSON in git, reviewed by PR. An index service polls the nine repositories' `main` and PRs (conditional requests, every 5 min) and rebuilds a SQLite index on each new commit. It serves a live dashboard, cross-repository queries (CLI, REST, MCP), ID reservation, derived bookkeeping state and a "decisions pending" inbox | Records live in SQLite or a graph store behind an API/MCP; git holds exports only. Review and history need an audit log, a proposal/approval flow for changes and a migration of nine backlogs and every harness check |
| Agent hours | 6 to 8 (T04 already planned; dispatch on merge 2 to 3; bot close 3 to 4) | Phase 1 about 16, phase 2 about 10, layer 2 about 8 (steps below): about 34 in all | 60 to 100, plus rewriting rules in every repository |
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

NERV was first proposed for its hosting assets (always-on, SQLite, the GitHub pilot of nerv:F-132), not because the index is NERV's domain. The split below keeps those assets as hosting and puts the code with the domain owner.

**Ownership.** In every option the parsing is project-harness's: `solution.mjs` and `work-items.mjs` already read the backlogs, and the builder is generic (template first).

| Owner of the service | For | Against |
|---|---|---|
| (i) NERV, as a feature | Already always-on, has SQLite, a dashboard and GitHub access (F-132) | Cross-project backlog state is not NERV's domain; NERV would hold a copy of every project's status and a view of other projects' work, against "a project owns its domain", "no copies" and the screens rule ([DOMAINS](../DOMAINS.md)); couples planning to NERV's release cycle |
| (ii) The coordinator | Cross-project state is already its domain: it generates the dashboard and holds the cross-repository records; exposes an MCP server and its own bricks screen, and NERV shows it through MCP surface cards like any project | The coordinator stops being docs-only: its project line "nothing is built or deployed" changes (an owner decision under the F-020 freeze), and it gains source, tests and a release; about 2 h more setup |
| (iii) A new dedicated project | Clean boundary | A tenth repository with its own harness, backlog and audits, for a domain the coordinator already owns |

**Recommended: (ii), confirmed by the owner's lean 2026-11-26 ("coordinator is ok, will have sqlite though?").** What the coordinator gains:

- **A small service**, Node 24 with the built-in `node:sqlite` (`DatabaseSync`, as NERV's backend uses): no new dependency.
- **SQLite as a rebuildable cache only.** It polls the nine repositories and, on each merge to a `main`, rebuilds a local SQLite file from the records in git. Git stays the source of truth: the file needs no backup, and deleting it and rebuilding is always safe.
- **It serves** an MCP server (queries, later ID reservation and the decisions-pending tool) and its own screen built with 🧱 bricks. NERV shows it through MCP surface cards like any project; agents query the same MCP server.
- **Supervised like NERV's own service**: on the Mac a launchd user agent of its own beside `io.nerv.agent` (start at login, restart on exit, logs in its data folder), Task Scheduler on Windows and `systemd --user` on Linux as for NERV's bases. It is not a child of NERV, so a NERV update or restart does not stop the index, and agents can reach it while NERV is down. Its one secret, the read-only GitHub token, is a file on that base only.

**Hosting.** An always-on process needs a base. NERV's bases run 24/7 services: NERV-01 Neo Tokyo-3 (Mac, main: coordinator role, root key, Telegram), NERV-02 Tabgha (Windows mini PC, worker), NERV-03 Calvary (Pi CM4, worker) (nerv `docs/acceptance/f005-device-matrix.md`). The index runs on the base holding NERV's coordinator role (today NERV-01) and moves with it: installing it on the new base is a step of the owner's relocation, and the new host rebuilds from git, so it needs no copied state and no replication.

**Does NERV keep doing everything while one base is up? Not today.** Checked at nerv `origin/main`, 2026-11-26:

- (a) **Failover is not automatic, by design.** "Missed heartbeats or `KajiLink` offline events never trigger automatic failover"; relocating the coordinator role needs the owner's signed record (`nerv kaji relocate`, then `nerv kaji promote` on the new base) (nerv `docs/decisions/coordinator-relocation.md`). The building blocks are merged (F-016-T03 to T20), but the two-device relocation acceptance F-016-T09 (owner, 1 h) is still planned and nerv:F-016 is open: relocation is built, not yet proven on two devices.
- (b) **Models per base.** NERV-01 runs gemma4:26b and gemma4:12b (Ollama). NERV-02 runs gemma4:12b (Ollama, set up 2026-11-05). NERV-03 hosts no useful LLM ("A Pi can expose device operations and voice without hosting a useful LLM", nerv `docs/architecture/runtime.md`); its chat can only borrow a model from another base over Tailscale. The cloud route (Umbilical) is off (`models.cloud` off).
- (c) **What degrades.** While the main base is down and no one has relocated the role, the other bases give only an explicitly labelled local chat fallback: no reminders, grants, outbox, Telegram or coordinator state. After a relocation to NERV-02, everything runs on the 12b model (smaller replies; nerv:F-120 measures planning quality). After one to NERV-03, the coordinator duties run but chat needs a model from a live base, so with only the Pi up there is none. The index itself needs no model: it keeps working on any base that holds the role.

## Steps, if approved

Each step stands alone and fits in one or two days; they become steps of a coordinator record (and of the harness and nerv records named) once the owner approves. Agent hours unless marked owner; estimated 2026-11-26, not measured.

| Phase | Step | Repository | Estimate |
|---|---|---|---|
| 1 Status | S1 Index builder: records, steps, owner steps, priorities, dependencies, PRs into a SQLite schema; tests on two fixture backlogs | project-harness | 4 h |
| 1 | S2 Service skeleton: Node 24, `node:sqlite` cache, rebuild-from-git command, tests and CI, launchd / Task Scheduler / systemd files | coordinator | 3 h |
| 1 | S3 Poller: nine repositories' `main`, PRs, CI, harness versions, audit dates; ETags; read-only token file; rebuild on each new commit | coordinator | 3 h |
| 1 | S4 MCP read tools: record lookup, "waiting on me", "blocked by X" | coordinator | 2 h |
| 1 | S5 Live dashboard screen with bricks; the MCP contract row in `docs/SOLUTION.md` | coordinator | 3 h |
| 1 | S6 NERV shows the index through MCP surface cards (its config and card) | nerv | 1 h |
| 1 | S7 Install on NERV-01 and place the token | owner | 0.5 h owner |
| 1 | S8 Two weeks of measurements (below), report to F-020 | coordinator | 1 h |
| 2 Status, rules | S9 ID reservation tool, with expiry; `check:backlog` still refuses duplicates | coordinator, project-harness | 3 h |
| 2 | S10 Derived step closing on green merge; one batched bot PR per repository per day (write token: owner step) | coordinator | 4 h + 0.5 h owner |
| 2 | S11 Decisions-pending tool, cleared when a PR records the decision | coordinator | 3 h |
| 3 Knowledge | S12 Documentation sections and link extraction (record, PR, decision, contract, repository) | project-harness | 4 h |
| 3 | S13 Full-text search tools with source links at the commit | coordinator | 2 h |
| 3 | S14 Search result card in bricks, shown in NERV | coordinator | 2 h |

Phase 2 changes rules (naming PRs by hand, closing after CI, choosing IDs), so it starts only after F-020-T04 and T05 accept them. Phase 3 starts after phase 1 has run two weeks.

## What to measure to decide phase 2

Baseline 2026-11-26 and target after two weeks of phase 1: mechanical bookkeeping PRs 40 of 228 (18%), target under 5%; "name PR" commits 130 in three repositories; dashboard age after a merge up to 6 h 19 min, target under 10 min; ID collisions per week (three reported on 2026-11-26, one renumber commit), target 0.

## Recommendation

B, phase 1 only for now (layer 1, status): a read-only index, its builder a harness tool, its service owned by the coordinator and hosted on the base holding NERV's coordinator role, with git kept as the truth. It removes the staleness and the nine-clone queries without changing a rule, and gives the numbers to decide phase 2 inside F-020; layer 2 follows as phase 3, as the owner directed. Owner of the service: (ii), the coordinator, because the live cross-project view is the dashboard it already generates, and (i) would make NERV hold copies of other projects' state against the domain rules; (iii) adds a repository for no new domain. Not C: it trades away review by PR and offline work for gains B already gives.

## Owner question

How should backlogs and the dashboard become live?

- **1.** Small fixes only (option A): hourly refresh from NERV (F-132-T04), refresh on merge, a daily bot PR to close steps.
- **2.** Start the live index, read-only (option B, phase 1, steps S1 to S8, about 16 agent hours and 0.5 owner hour: builder in project-harness, service in the coordinator, shown in NERV over MCP), then decide ID reservation and automatic closing with the measurements in F-020. *Recommended.*
- **3.** Move the records into a database (option C).
- **4.** Not now: revisit when F-020 ends.

If 2, who owns the service? **(ii) the coordinator** (recommended, and the owner's lean 2026-11-26; it then becomes a project that builds and runs a small service), **(i) NERV** or **(iii) a new project**.

## Answer

2026-11-26, owner in chat: **"2"** (start the live index, read-only: option B, phase 1, steps S1 to S8) and **"coordinator"** (owner of the service: (ii), the coordinator). Planned as coordinator:[F-024](../BACKLOG.md#f-024), "Live index, phase 1 (status)": the builder (S1) is proposed to project-harness and the surface card (S6) to nerv, each built by a session in its own repository; hosting on the base holding NERV's coordinator role (today NERV-01) under its own launchd job, installed by the owner. Phase 2 and phase 3 stay as written above, not records yet.
