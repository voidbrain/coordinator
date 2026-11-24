# Proposals for the harness template

Written 2026-11-24 in voidbrain/coordinator for the owner to take to a project-harness session. Nothing here changes the template; the template's own session decides, records and releases. This repository tracks only its side (`solution:F-004`): delivering the proposals and reconciling to a release that adopts them.

## Proposal 1: solution order, owner view and gap review in the solution profile

### Problem

The solution profile's dashboard (`tools/solution.mjs dashboard`) lists each component's records with status, human action, effort and review date. An owner steering several repositories also needs:

- **One order across repositories.** Each backlog has its own priority; nothing says whether `nerv:B-124` comes before `grover:F-003`.
- **Readiness, not only status.** Whether an item can start now, waits on a prerequisite, or waits on the owner (the generated ledger already has this in its Agent, Procedures and Decisions cells and the steps' Who cells, but the dashboard drops it).
- **Priority, remaining hours and open steps** per component, and what waits for the owner, in one place.
- **Missing steps between repositories**: a record in one component that needs something from another, with no record on the other side.

The coordinator has these today as project content: `docs/solution-order.md`, `tools/solution-overview.mjs` and `docs/agents/gap-review.md`.

### Proposed generic feature

1. **Solution order file** (coordinator only), e.g. `docs/solution-order.md` named by `.solution.json` `order`:
   - an ordered list between `<!-- order:start -->` / `<!-- order:end -->` markers, one `repo:ID` per line (record or step ID), with an optional short note; top = next;
   - rules shipped in the profile: agents take the first item that is ready and unblocked; unlisted work follows each repository's own priority; reordering is an owner instruction landed as a small PR; the order never skips a prerequisite or an owner decision; references only, never status;
   - `solution.mjs check` validates it offline (syntax, known manifest IDs, duplicates, numbering) so coordinator CI can run it without reaching components.
2. **Dashboard sections** added to `solution.mjs dashboard`, from the same resolved commits:
   - Solution order with each item's live status, priority, remaining and state (Ready, Waiting on X, Owner: procedure/decision, Blocked, Not in backlog), the first Ready item marked;
   - Waiting for the owner (records and steps, kind, owner hours, next action);
   - Blocked or waiting on a prerequisite;
   - Effort per component: counts by priority, remaining agent/owner hours as each backlog states them, sizes, and the component's own totals line; no hours summed across repositories that estimate differently, no combined percentage;
   - Open steps per component (collapsed).
   It needs the reader to keep the generated ledger's Priority, Remaining, Depends on, Agent, Procedures and Decisions cells and its steps table, which `records()` already sees but discards.
3. **Gap review** as a dashboard section plus a procedure in `docs/agents/`: proposals only, each naming the repository that would own the fix. Kinds: (1) cross-repository dependency with no counterpart record; (2) Depends on naming a missing or done ID; (3) owner's turn with no `ownerLink` page; (4) open record with no next step or no estimate; (5) order item not in its backlog. The coordinator never creates the records; the owner accepts which are created, in their own repositories. Kind 1 is a text heuristic (a sentence naming another component with a dependency word); the template version could add an explicit, validated cross-repository `Depends on` form such as `gauntlet-protocol:F-012` so most of kind 1 becomes exact.

### Acceptance in the template

Fixture coordinators and components in the template's own tests: an order with a ready item behind a waiting one; an order reference to a closed record; a step whose owner face has no link; a cross-repository sentence with and without a counterpart; a component on the authored four-column layout. No real solution is needed for the release.

### Migration here

When a release ships it, this repository reconciles, moves its order to the template's format if it differs, and deletes `tools/solution-overview.mjs` and `docs/agents/gap-review.md` (or keeps only what stays project-specific).

## Proposal 2: stop committing generated backlog views

### Problem

Projects with source-owned work items (`workItems.enabled`) commit generated views (`docs/BACKLOG.md`, recaps, totals) next to the task and record files they are built from. Every PR that touches a step regenerates the view, so parallel PRs conflict on the generated file even when their sources do not, and `merge-backlog.mjs` exists largely to resolve those conflicts. The coordinator reads `docs/BACKLOG.md` from each component on GitHub, so it depends on the committed view today.

### Proposed change

- Build the views in CI and on demand (`work-items build`), not in each PR; `.gitignore` them in the source tree.
- Publish the built views where readers need them: a CI artifact on each PR, and on `main` either GitHub Pages, a generated branch (`backlog-views`) or a release asset, so links to `docs/BACKLOG.md#f-005` still resolve.
- Keep `check:work` and `check:backlog` in CI on the sources and the built output.
- For solution coordinators: read the published view (the generated branch at a resolved commit) or build from the component's sources at that commit with the copied tool; either way the dashboard names the source commit.

### Open questions for the template session

- Where the published view lives, and how a component's README and agents link to it.
- Projects without `workItems` keep hand-authored `docs/BACKLOG.md`; this applies only to generated views.
- Transition: one release where both the committed and the published view exist, so coordinators and links can move.
