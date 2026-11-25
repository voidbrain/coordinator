# Gap review

Project procedure (not from the harness template). Read before you run a gap review or turn its findings into proposals.

The coordinator reads every component's backlog, so it can see steps that are missing between them. A gap review lists them with evidence and **proposes** the missing record or step in the repository that would own it. It never creates them: the coordinator never edits a component, and the owner decides which proposals are created.

## Run it

```bash
GH_TOKEN=$(gh auth token) npm run solution:refresh   # token optional: the components are public
```

The "Gap review" section of [the dashboard](../SOLUTION-DASHBOARD.md#gap-review) lists every finding; [solution gaps](solution-gaps.md) says what each kind finds and how. Read each one at its evidence link before you report it; the checks are heuristics.

What it cannot see: a request the owner made in a conversation that nobody recorded anywhere. When the owner names one, add it to the review by hand as a cross-repository need with the owner's words as evidence.

## Turn findings into proposals

1. For each finding, name the owning repository and the exact record or step you would create there (title, one-line Issue, Check), or say that the finding is a false positive and why.
2. Report them to the owner, numbered in the dashboard's order, and update `coordinator:F-003` (or the current gap-review record) with the date and the list. Nothing promised lives only in the conversation.
3. The owner accepts or rejects each. An accepted proposal is created by a session working in its owning repository, under that repository's own rules; a rejected one is recorded on the gap-review record with the reason.
4. The next refresh shows whether the gap is gone. A gap that needs coordination between repositories also gets a record in this backlog with `Components` links.

Never edit, push to or open a PR on a component repository from this repository to close a gap.
