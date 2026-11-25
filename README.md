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

- [Dashboard](docs/SOLUTION-DASHBOARD.md): a summary per project (🧭 solution, 𖣂 nerv, 🤖 gauntlet-protocol, 🦺 project-harness, 🚁 fpvbuddy, 🪴 grover) with harness and next audit, the solution order with each item's live state, agent and owner hours and open prerequisites, what is blocked and on what, which projects have nothing to do and why, what waits for the owner, the agent runway before the next owner block, audits and reviews, the gap review, each project's open steps, remaining hours with the solution total, and the component sources with their revisions and link checks.
- [Solution order](docs/solution-order.md): the owner's order; agents take the first ready item.
- [Backlog](docs/BACKLOG.md): cross-repository work only. [Solution](docs/SOLUTION.md): components, contracts, integration acceptance.

## Run it

Node 22 or later, `git`; `gh` for a token when the GitHub API rate limit is reached. `npm ci` installs Prettier and ESLint for the project's own tools; the refresh itself needs no dependencies.

```bash
GH_TOKEN=$(gh auth token) npm run solution:refresh   # regenerate the dashboard from each component's main on GitHub
npm run check:fast                                    # format, lint, tests, backlog, rules, tooling, maintenance, order, links
npm run check:freshness                               # at session start
```

The Refresh solution views workflow does this daily, opens or updates the PR "chore: refresh solution views" when something besides the snapshot changed, with the owner's token (repository secret `REFRESH_TOKEN`), so CI runs on it like on any PR; it merges itself once the required checks pass and its branch is deleted (F-010), unless it changes more than the generated dashboard and Done items dropped from the order, in which case it says why and a person lands it. The branch `chore/refresh-solution-views` belongs to the workflow: when no refresh PR is open it is deleted and recreated from main, so a commit a person pushes there is discarded. By hand, commit the regenerated views in a PR; each names its snapshot time and the source commits it read.

## Where things are

```
.solution.json          the components: repository, ref, backlog path, local checkout path
docs/solution-order.md  the owner's order across repositories
docs/SOLUTION-DASHBOARD.md  generated view (never edited by hand)
docs/BACKLOG.md         cross-repository records
docs/SOLUTION.md        components, contracts, integration acceptance
docs/proposals/         proposals for other repositories, delivered by the owner
tools/                  harness tools (copied) and the refresh's own tools/refresh-branch.mjs and tools/refresh-guard.mjs
```

## Working on it

Agents follow [AGENTS.md](AGENTS.md); the [backlog rules](docs/BACKLOG-RULES.md) govern records; the [style guide](docs/STYLE-GUIDE.md) covers writing. Harness: [project-harness](https://github.com/voidbrain/project-harness) v10.9.0 with the solution profile.
