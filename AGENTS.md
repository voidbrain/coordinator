## Project conventions (Coordinator)

The project is **Coordinator**, the solution coordinator for the voidbrain projects. The repository is `https://github.com/voidbrain/coordinator` (private); the default branch is `main`. Nothing is built or deployed: it holds references, documentation and generated views.

### Architecture

- Components own their work. Records, statuses and history stay in each component's backlog; this repository holds references (`repo:ID`) only and never copies or mirrors a component status. Status flows one way: components → generated views here.
- Components are listed in [.solution.json](.solution.json) (`nerv`, `gauntlet-protocol`, `project-harness`, `fpvbuddy`, `grover`). [docs/SOLUTION.md](docs/SOLUTION.md) owns the contracts and integration acceptance between them.
- [docs/BACKLOG.md](docs/BACKLOG.md) holds cross-repository work only: contracts, version compatibility, end-to-end acceptance, coordination. Implementation work goes in the component's own backlog.
- The gap review proposes missing records and steps to the repositories that would own them; the owner decides which are created ([gap review](docs/agents/gap-review.md)).
- The overview sums remaining agent and owner hours across all backlogs, the coordinator's included: hours only, never a percentage, labelled as each project's own estimates, and "at least" when a backlog cannot be read. Its agent runway counts agent steps doable before a block, across repositories (`repo:ID` prerequisites). <!-- project -->
- Generated, never edited by hand: [docs/SOLUTION-OVERVIEW.md](docs/SOLUTION-OVERVIEW.md) (`tools/solution-overview.mjs`, project tool) and [docs/SOLUTION-DASHBOARD.md](docs/SOLUTION-DASHBOARD.md) (`tools/solution.mjs`, from the template). `npm run solution:refresh` rewrites both from GitHub.

### Solution order

- [docs/solution-order.md](docs/solution-order.md) is the owner's order across all repositories: references `repo:ID`, top = next. <!-- project -->
- Agents take the first item that is ready and unblocked (State Ready in the overview), after reading its record: Ready relies on each component's ⏳/🧑 markup and record states, and an authored backlog without Depends on can show Ready too early. Work not listed follows each repository's own priority. <!-- project -->
- Reordering is an owner instruction, landed as a small PR that changes only the order. The order never skips prerequisites or owner decisions, and holds references only, no status. <!-- project -->

### Adding things

- **A component**: add it to `.solution.json` (unique lowercase `id`, `owner/name`, checkout `path`, `ref`, `backlog`), describe its contracts in `docs/SOLUTION.md`, run `npm run solution:refresh` and commit the regenerated views.
- **A cross-repository record**: a B-/F- record in `docs/BACKLOG.md` with a `| Components | repo:ID, … |` row in its details; `npm run check:solution` then checks each link exists.

### Checks before you finish

Before you open, update or merge a PR, read [pull requests](docs/agents/pull-requests.md).

<!-- safety:start -->
**What the agent does on its own, and what it asks first.** These rules load with this file in every session; the procedures below are read when they apply, never in place of these rules.
- On its own: branch from `main` in a separate `git worktree` (every task, single or parallel: the primary checkout stays on `main` with no edits of its own, because a running service, another session or the owner may rely on it; put worktrees in a sibling directory or under `.claude/worktrees/`; a project names what relies on its primary checkout with a project line), commit, push its branches, open PRs against `main` (then name the PR by its number in the records it touches, and push that before the checks finish), resolve conflicts on its own PRs, land its own PR through the landing queue once every check on it has passed and GitHub can merge it: one lander merges ready PRs one at a time, with at most two in CI ([parallel work](docs/agents/parallel-work.md), "Landing queue"; `node tools/merge-when-green.mjs <PR>…` waits for the checks and stops on any failing check or conflict), delete merged branches and their worktrees, reconcile and close backlog records.
- Asks first: material changes to an adopted upfront feature plan (BACKLOG-RULES, "Optional upfront feature plans"); a decision or check a record marks 🧑; repository settings (branch protection, required checks, secrets) and dismissing a code-scanning alert; rewriting published history or force-pushing; deleting what it did not create; a harness change it cannot place as project or template ("Changing a harness file").
- Never: merge with a failing or pending check, or bypass the branch protection. A project narrows this list with a project line.
- Never, from this repository: edit, push to or open PRs on a component repository or the template, or change a component checkout (reads only). <!-- project -->
- Optional push guard: `node tools/guard.mjs install` makes git refuse a push to `main`, a force-push and an archive rewrite, citing these rules (APPLY.md, "Push guard"; a Claude Code adapter does the same before the command runs). A refused operation the owner approves runs once with `HARNESS_GUARD_ALLOW=<rule>`; never set it without that approval.
- Never remove a safeguard (an ownership, evidence, privacy or safety rule) because it is old or rarely triggered, and never rewrite governing rules unattended: consolidating rules keeps every requirement ([rule review](docs/agents/rule-review.md), "Periodic rule consolidation").
<!-- safety:end -->

```bash
npm run check:freshness   # first, at session start: backlog behind main, merged branches, audit age
npm run check:fast        # format, lint, tests, backlog, rules, tooling, maintenance, order, manifest and links <!-- project -->
npm test                  # the overview readers, states and gap review on test/fixtures <!-- project -->
npm run check:backlog     # active record layout and lifecycle cues
npm run check:order       # docs/solution-order.md references and the fixture self-check, offline <!-- project -->
npm run check:solution    # manifest, component sources on GitHub and Components links <!-- project -->
npm run solution:refresh  # regenerate both views from GitHub; commit them with their snapshot <!-- project -->
npm run format:check      # Prettier on the project's own tools and tests; `npm run format` fixes it <!-- project -->
npm run lint              # ESLint on the same files (copied harness tools excluded) <!-- project -->
npm run check:tooling     # a formatter check and a linter exist and run in CI (required for every stack)
```

- Format and lint in CI too (`check:tooling`); the project's own tools and tests are formatted and linted, copied harness tools are not. <!-- project -->
- A change to a backlog reader adds a fixture to `test/fixtures/` and its expected result to `expected.json`; an unknown layout must show as a problem, never as no work. <!-- project -->
- A failing test is evidence until shown otherwise: change its expectation only when the requirement deliberately changed, and say which; otherwise fix the code.
- A bug fix starts with a committed test that fails without the fix; the fix never edits that test to pass (BACKLOG-RULES, "A bug fix starts with a failing test").
- Replacing a feature removes its state, helpers and tests too: no dead code.

### Changing a harness file

Before editing a file listed in `.harness.json` (`copied`, `forked`, `adapted`, or `.harness.json` itself), decide: this project only, or every project. The edit is the trigger, whatever the request's words: an "allow X" that changes how work is done is a rule.
- **This project only**: content or a setting stays here; a project line in a template section ends with `<!-- project -->`; a changed harness rule is an override (APPLY.md, "Project overrides").
- **Every project**: the template first, then reconcile here (APPLY.md, "Changing the harness from a project").
- **Unsure**: ask the user before editing. Never decide silently. (`check:freshness` lists the harness files a branch changes.)

### Procedures: read before the task

Each procedure is binding when its trigger applies: read it before the task; a short index never defers a requirement. All of them: [procedure index](docs/agents/procedures.md). `npm run check:rules` fails when a never or ask-first rule lives only in a procedure.

| Before you | Read |
|---|---|
| start a session | [session start](docs/agents/session-start.md) |
| open, update or merge a PR | [pull requests](docs/agents/pull-requests.md) |
| update or close a backlog record | [backlog rules](docs/BACKLOG-RULES.md) (it names the one file a change needs) |
| write or change documentation | [documentation](docs/backlog/documentation.md) |
| change something an output is derived from (generated pages and data, recordings, translations, guides, a value used in two places) | [change impact](docs/agents/change-impact.md); do each row `check:freshness` lists, or record why not |
| switch tasks or hand off context | [task context](docs/agents/task-context.md) |
| reassess architecture or decisions | [architecture review](docs/agents/architecture-review.md) |
| set up the project or change its stack or workflow (capability assessment) | [MCP guidance](docs/agents/mcp.md), "In short" |
| add, configure or rely on an MCP connection, or edit MCP selections | [MCP guidance](docs/agents/mcp.md) (commands inside) |
| work across repositories of a solution, refresh the views or change the order | [solution profile](docs/agents/solution-profile.md) (refresh inside) and [solution order](docs/solution-order.md) |
| run a gap review or propose missing steps to a component | [gap review](docs/agents/gap-review.md) |
| add or use a shared skill | [skills](docs/agents/skills.md) |
| adopt or reconcile the harness, or review maintenance evidence | [maintenance](docs/agents/maintenance.md) |
| change AGENTS.md, CLAUDE.md, BACKLOG-RULES or `docs/backlog/`; measure friction; consolidate rules | [rule review](docs/agents/rule-review.md) (agent-behaviour checks when a runner is set) |
| run an audit, or record its findings or an improvement proposal | [audit](docs/agents/audit.md) ([findings](docs/agents/audit-findings.md)) |

### Testing the joins

- A change that touches how two parts meet gets a test across both, not one per side. Here that is integration acceptance between components, recorded in `docs/SOLUTION.md` and checked in the environment that can run it. <!-- project -->

### Known pitfalls

- The views are snapshots, refreshed daily by the Refresh solution views workflow as a PR (or by `npm run solution:refresh`); read the snapshot time before acting on a state. <!-- project -->
- A component's local checkout can be behind GitHub, and the manifest's checkout paths are relative to the primary checkout `~/Projects/coordinator` (a worktree has no siblings there). The npm scripts read GitHub (`--remote`); a plain `node tools/solution.mjs check` reads local checkouts and says "local checkout, not fetched". <!-- project -->

## Area notes

Before changing an area, read its section in [docs/agents/areas.md](docs/agents/areas.md): the rules and lessons there are as binding as this file.

| Area | Covers |
|---|---|
| Solution views | `.solution.json`, `docs/solution-order.md`, the generated overview and dashboard, `tools/solution-overview.mjs` |
| Cross-repository backlog | `docs/BACKLOG.md`, `docs/SOLUTION.md`, contracts and integration acceptance |

## Privacy

- Never commit secrets, tokens or personal data. `GH_TOKEN` is passed in the environment for a refresh, never written to a file. Generated views carry only what the components' public backlogs already say. <!-- project -->

## Work tracking

**At the start of every session, before other work, run `npm run check:freshness`** and do what it lists, as [session start](docs/agents/session-start.md) says.

- This backlog owns only this repository's work: reject foreign next actions and closure conditions; a master never waits on what derives from it (BACKLOG-RULES, "One repository, one backlog"). A component's work is referenced, never recorded here. <!-- project -->
- Keep a confirmed bug, a candidate fix, an unimplemented feature and a completed check distinct: a merge is not verification, a unit test is not a visual, pointer or device check, a green CI run proves only the checks it ran. Archives and audits are dated evidence, not current status.
- A plan or promise given to the user (steps, a table to build, a later fix) becomes backlog records in the same change, and the reply names them. Nothing promised lives only in the conversation.
