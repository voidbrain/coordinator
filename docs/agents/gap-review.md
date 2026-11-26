# Gap review

Project procedure (not from the harness template). Read before you run a gap review or turn its findings into proposals.

The coordinator reads every component's backlog, so it can see steps that are missing between them. A gap review lists them with evidence and **proposes** the missing record or step in the repository that would own it. It never creates them: the coordinator never edits a component, and the owner decides which proposals are created.

## Run it

```bash
GH_TOKEN=$(gh auth token) npm run solution:refresh   # token optional: the components are public
```

The "Gap review" section of [the dashboard](../SOLUTION-DASHBOARD.md#gap-review) lists every finding; [solution gaps](solution-gaps.md) says what each kind finds and how. Read each one at its evidence link before you report it; the checks are heuristics.

The generated review does not read the [domain map](../DOMAINS.md) (the template has no domain check), so read it by hand on each review: a shared domain whose Has column names two projects is an extraction candidate (propose a coordination record here, the package in the repository that would own it); a project whose code now covers a domain the page does not list is a correction to the page. Never propose a shared package for a domain only one project has.

### Shared-asset checks

The [shared assets](../DOMAINS.md#shared-assets) section of the domain map sets who owns what for 🧱 bricks, 🧊 blocks and the 🤖 Gauntlet, the blocks criterion and how a skip is recorded. The generated review does not run these checks, so do them by hand on each review, per component in [.solution.json](../../.solution.json), reading its code and backlog on `main`:

1. **UI and bricks.** A UI component, token, theme or genUI surface that duplicates one in bricks, or that two or more projects each build and bricks does not have. Look in the project's shared UI and design-system folders (the domain map's rows) against bricks' components, surfaces and tokens. Proposal: the project uses the bricks one, or bricks gets the missing component (a record in bricks, or a step of the matching per-project UI inventory, bricks:F-006 to bricks:F-009). A deliberate skip recorded in the project's record is not a finding.
2. **Domain logic and blocks.** Domain logic or typed contract code imported, or copied, by two or more projects that is not in a blocks package, under the [blocks criterion](../DOMAINS.md#the-blocks-criterion). Code another project reaches only through MCP is not a finding; neither is a domain only one project has. Proposal: a coordination record here to create blocks or the package (with `Components` links), the package built in blocks by its own session; the shared-domains row of the domain map is corrected in the same change.
3. **Model-facing work and the Gauntlet.** A model-facing feature (a model plans, writes, classifies or answers in it) or an MCP tool a model calls, with no Gauntlet case covering it and no recorded skip. Look at the project's open and recently closed records and its MCP tool list against its own `evals/gauntlet/` pack and gauntlet-protocol's general packs. Proposal: a case in the owning project's pack, a new general pack or grader update in gauntlet-protocol when two or more projects need it, or a recorded skip with its reason. Bricks and blocks are recorded as not model-facing; do not report them.

Each finding becomes a proposal under "Turn findings into proposals" below, to the repository that would own it: the project for its own copy, cases or skip, the shared repository (bricks, blocks, gauntlet-protocol) for what is missing there. The [cross-project audit](cross-project-audit.md) reports these results under its duplication check by link, not again. Automating them needs the solution tool, a harness file: the proposal is in [shared-asset checks](../proposals/shared-asset-checks.md), and no harness file is edited here.

Run the [cross-project audit](cross-project-audit.md) on the same refresh: it checks that the repositories agree (cross-references, decisions, contracts, duplication, audit cadence, dormant checks), and its proposals are reported with these.

What it cannot see: a request the owner made in a conversation that nobody recorded anywhere. When the owner names one, add it to the review by hand as a cross-repository need with the owner's words as evidence.

## Turn findings into proposals

1. For each finding, name the owning repository and the exact record or step you would create there (title, one-line Issue, Check), or say that the finding is a false positive and why.
2. Report them to the owner, numbered in the dashboard's order, and update `coordinator:F-003` (or the current gap-review record) with the date and the list. Nothing promised lives only in the conversation.
3. The owner accepts or rejects each. An accepted proposal is created by a session working in its owning repository, under that repository's own rules; a rejected one is recorded on the gap-review record with the reason.
4. The next refresh shows whether the gap is gone. A gap that needs coordination between repositories also gets a record in this backlog with `Components` links.

Never edit, push to or open a PR on a component repository from this repository to close a gap.
