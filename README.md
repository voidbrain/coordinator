# Coordinator

The solution coordinator for the voidbrain projects: one place to see and steer all their work. It reads every component's backlog and shows it in one read-only view, holds the owner's order across repositories, proposes missing steps, and keeps a backlog of its own for cross-repository work only (contracts, version compatibility, end-to-end acceptance). Records stay in their own repositories; this repository holds references.

| Component | Repository |
|---|---|
| `nerv` | [voidbrain/nerv](https://github.com/voidbrain/nerv) |
| `gauntlet-protocol` | [voidbrain/gauntlet-protocol](https://github.com/voidbrain/gauntlet-protocol) |
| `project-harness` | [voidbrain/project-harness](https://github.com/voidbrain/project-harness) |
| `fpvbuddy` | [voidbrain/FPVBuddy](https://github.com/voidbrain/FPVBuddy) |
| `grover` | [voidbrain/Grover](https://github.com/voidbrain/Grover) |

## Read it

- [Overview](docs/SOLUTION-OVERVIEW.md): the solution order with each item's live state, what waits for the owner, what is blocked, effort per repository, all open records and steps, and the gap review.
- [Solution order](docs/solution-order.md): the owner's order; agents take the first ready item.
- [Dashboard](docs/SOLUTION-DASHBOARD.md): the harness template's view of the same sources, with revisions and link checks.
- [Backlog](docs/BACKLOG.md): cross-repository work only. [Solution](docs/SOLUTION.md): components, contracts, integration acceptance.

## Run it

Node 22 or later, `git`; `gh` for a token when the GitHub API rate limit is reached. No dependencies to install.

```bash
GH_TOKEN=$(gh auth token) npm run solution:refresh   # regenerate the overview and dashboard from each component's main on GitHub
npm run check:fast                                    # backlog, rules, tooling, maintenance, order, manifest and links
npm run check:freshness                               # at session start
```

Commit the regenerated views in a PR; each names its snapshot time and the source commits it read.

## Where things are

```
.solution.json          the components: repository, ref, backlog path, local checkout path
docs/solution-order.md  the owner's order across repositories
docs/SOLUTION-*.md      generated views (never edited by hand)
docs/BACKLOG.md         cross-repository records
docs/SOLUTION.md        components, contracts, integration acceptance
docs/proposals/         proposals for other repositories, delivered by the owner
tools/                  harness tools (copied) and tools/solution-overview.mjs (this repository's)
```

## Working on it

Agents follow [AGENTS.md](AGENTS.md); the [backlog rules](docs/BACKLOG-RULES.md) govern records; the [style guide](docs/STYLE-GUIDE.md) covers writing. Harness: [project-harness](https://github.com/voidbrain/project-harness) v10.9.0 with the solution profile.
