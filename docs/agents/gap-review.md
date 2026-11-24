# Gap review

Project procedure (not from the harness template). Read before you run a gap review or turn its findings into proposals.

The coordinator reads every component's backlog, so it can see steps that are missing between them. A gap review lists them with evidence and **proposes** the missing record or step in the repository that would own it. It never creates them: the coordinator never edits a component, and the owner decides which proposals are created.

## Run it

```bash
GH_TOKEN=$(gh auth token) npm run solution:refresh   # token optional: the components are public
```

The "Gap review (proposals)" section of [the overview](../SOLUTION-OVERVIEW.md#gap-review-proposals) lists every finding, numbered. Read each one at its evidence link before you report it; the checks are heuristics.

| Kind | What it finds | How |
|---|---|---|
| 1 Cross-repository, no counterpart | A record that needs something from another component, with no open record there that names it back (for example nerv:F-120 waiting for gauntlet-protocol's domain packs) | A sentence in the record's Issue, Reproduce, Check, next action or step titles names the other component together with a dependency word (waits, requested, needs, depends, tracked, recorded in, create, move); the other backlog has no open record naming this component |
| 2 Dependency missing or done | A record or step whose Depends on names an ID that is not in the active backlog, or is already done, in its own or another repository | Every ID in a Depends on cell (`repo:ID` resolved against that repository through the manifest) against the open records and steps |
| 3 Owner check without a page | The owner's turn with no copy-paste procedure or decision page | A step whose Who cell shows 🧑‍🔧 or 🤔 without ⏳ and without a link (its `ownerLink` is missing); an authored record waiting on the owner whose next action has no link and no command |
| 4 No next step or no estimate | An Open or Investigate record with no open step (or no next action), or with no effort or remaining estimate; open steps with neither an estimate nor remaining hours | The summary row and steps table |
| 6 Harness behind | A project whose `.harness.json` version is older than the latest template release | The project's stamp against the template's highest `vX.Y.Z` tag; the proposal is a reconcile record in that project |
| 5 Order item missing | A `docs/solution-order.md` reference to a record or step that is not in its backlog | The order against the backlogs |

What it cannot see: a request the owner made in a conversation that nobody recorded anywhere. When the owner names one, add it to the review by hand as kind 1 with the owner's words as evidence.

## Turn findings into proposals

1. For each finding, name the owning repository and the exact record or step you would create there (title, one-line Issue, Check), or say that the finding is a false positive and why.
2. Report them to the owner, numbered as in the overview, and update `solution:F-003` (or the current gap-review record) with the date and the list. Nothing promised lives only in the conversation.
3. The owner accepts or rejects each. An accepted proposal is created by a session working in its owning repository, under that repository's own rules; a rejected one is recorded on the gap-review record with the reason.
4. The next refresh shows whether the gap is gone. A gap that needs coordination between repositories also gets a record in this backlog with `Components` links.

Never edit, push to or open a PR on a component repository from this repository to close a gap.
