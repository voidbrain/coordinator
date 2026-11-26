# Cross-project audit

Project procedure (not from the harness template). Read before you run a cross-project audit or turn its findings into proposals. It runs together with the [gap review](gap-review.md), on the same refresh.

Each component audits itself ([audit](audit.md)), and the gap review finds steps missing between components ([solution gaps](solution-gaps.md)). Neither checks that the repositories agree with each other: a plan written before a later decision, a step waiting on work another repository already delivered, a producer and a consumer that expect different things. This audit does. Like the gap review, it reads and proposes; the coordinator edits no component.

## Run it

1. Refresh the views and run the gap review first: `GH_TOKEN=$(gh auth token) npm run solution:refresh`, then [gap review](gap-review.md), "Run it".
2. Read every component listed in [.solution.json](../../.solution.json) on GitHub at its `ref` (`main`), not the local checkouts, which can be behind. Note each component's commit SHA: every finding cites the revision it was read at.
3. Run the five checks below against every component backlog, this repository's own backlog, [the domain map](../DOMAINS.md), [SOLUTION](../SOLUTION.md) and [the solution order](../solution-order.md).
4. Record the run on the current cross-project audit record (`solution:F-017` for the first run): the date, the SHAs read, each check's result with an evidence link per finding, and "no findings" for a check that found none. A check you could not run is reported as not run, with the reason, never as clean.

## The five checks

### 1. Cross-references

A step or record that depends on another repository's step or record (`repo:ID` in Depends on, `dependsOn`, `externalMet`, a ⏳ cell, or a waiting sentence in its Next action or Check) where that item is:

- **closed or cancelled**: the dependency is stale. If the item was cancelled, the waiting work needs a new prerequisite or is cancelled too; if it was delivered, the waiting step records it as met (`externalMet`) or moves on.
- **missing**: not in that backlog, active or archived (a wrong ID). The gap review's "Prerequisite missing or unknown" kind already lists these; confirm them here, do not report them twice.
- **delivered but still open**: the other repository's PR delivered the work, but its step is still open there. Example (2026-11-26): `fpvbuddy:F-005` waited on `nerv:F-101-T04`, which FPVBuddy#17 had delivered. The proposal goes to the repository that owns the open step.

Read the referenced item's status in its own backlog, not in the dashboard alone: the dashboard is a snapshot.

### 2. Decisions

A plan in any repository (an open record or step) that contradicts a later decision recorded in [the domain map](../DOMAINS.md) (its dated owner decisions: where shared code goes, the rule for screens, a move between projects) or in [the solution order](../solution-order.md). Example (2026-11-26): `nerv:F-101-T05` had NERV import the FPV core, against the 2026-11-25 rule that screens and domain code stay with their project and NERV integrates over MCP.

For each dated decision, search the open records and steps of every repository the decision names for work that still assumes the opposite. Compare dates: the later decision wins, so an older plan is a proposal to its repository (cancel or rewrite the step). A plan newer than the page it contradicts may mean the page is stale: report it to the owner as a question, never correct the decision yourself.

### 3. Contracts

Each MCP producer against what its consumer expects: tool names, message fields, units, severities and the delivery path, as each side's records and code describe them, against the contract in [SOLUTION](../SOLUTION.md) or the domain map. Today's pairs:

- 🪴 grover's alerts (`grover:F-008`; the hub's `mcp.ts` and `alerts.ts`) against what 𖣂 nerv delivers (`nerv:F-122`).
- 🚁 fpvbuddy's MCP tools against what 𖣂 nerv consumes (`nerv:F-101-T08` to `nerv:F-101-T10`).

Add a pair when a new producer or consumer is recorded. A side that diverges from the written contract gets the proposal; when the contract is silent or both sides changed, propose a coordination record here with `Components` links, and the owner decides which side moves.

### 4. Duplication

Use the [shared-asset checks](gap-review.md#shared-asset-checks) in the gap review (bricks for UI, blocks for shared domain logic, the Gauntlet for model-facing features and MCP tools), added by `solution:F-016-T02`, and the gap review's reading of the domain map. They are not repeated here: report their results under this heading, once, with a link to the gap-review finding.

### 5. Audit cadence

For each component, read `docs/audits/*.audit.json` on `main` and its `.harness.json` `audit` settings (`days`, default 7; `enforce`). List per repository:

- the date of its last full audit (manifest `kind: full`), and of its last audit of any kind;
- **overdue**: its last full audit is older than its `days`;
- **never fully audited**: only scoped, baseline, reconcile or narrative-only reports. A report counts by its manifest's `kind`, never by its file name; a report without a manifest is unclassified, not full;
- whether `audit.enforce` is on.

Include this repository (`npm run check:audits`). The proposal is a full audit in that repository, or turning `audit.enforce` on once a full baseline exists; the owning repository schedules it.

## Turn findings into proposals

Follow [gap review](gap-review.md), "Turn findings into proposals": for each finding, name the owning repository and the exact record or step you would create or change there (title, one-line Issue, Check), or say why it is a false positive. Number them, report them to the owner with the gap review's, and record them on the audit record. The owner accepts or rejects each; an accepted one is made by a session in its owning repository, under its own rules. A finding that needs both sides to move also gets a coordination record in this backlog.

Never edit, push to or open a PR on a component repository from this repository to fix a finding.

## Limits

- Checks 1 to 3 read text and can be wrong both ways: a reference can be written without a `repo:ID`, and a decision can be recorded only in a conversation. "No findings" does not prove the repositories agree.
- Checks 1 and 5 are done by hand until the solution tool reports them; the proposal to automate them goes to 🦺 project-harness (`solution:F-017-T03`). No harness file is edited here.
