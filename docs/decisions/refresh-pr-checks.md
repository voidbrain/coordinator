# Decision: checks on the daily refresh PR

Owner decision needed for coordinator:F-008 (step F-008-T02). Written 2026-11-24 after the first dispatched run.

## What happened

On 2026-11-24 the Refresh solution views workflow ran once by hand ([run 45503340953](https://github.com/voidbrain/coordinator/actions/runs/45503340953)). It started from main, found changed views and opened [PR #3](https://github.com/voidbrain/coordinator/pull/3). It then started CI on the branch:

- the dispatched CI run passed ([run 45503404765](https://github.com/voidbrain/coordinator/actions/runs/45503404765)), and its `check` run is attached to the branch's head commit `2d09f79`;
- PR #3 still shows **no checks** (`gh pr checks 3`: "no checks reported"; the GraphQL status rollup is empty), so `merge-when-green` cannot land it;
- the PR also started the normal `pull_request` CI run ([run 45503409127](https://github.com/voidbrain/coordinator/actions/runs/45503409127)), which GitHub holds as **action required**: a run for a PR opened by `github-actions[bot]` waits for someone to approve it.

So starting CI with `workflow_dispatch` does not give the refresh PR a check that counts.

## Options

| Option | What it takes | Effect |
|---|---|---|
| A. Approve each refresh PR's CI run | One click per refresh PR ("Approve and run workflows" on the PR or the run), by the owner or by an agent the owner has allowed to do it | The normal `pull_request` check runs and counts; the lander merges on green. Manual every day a refresh PR opens. |
| B. Open the refresh PR with a token that is not the workflow token | A fine-grained personal access token or a GitHub App token for this repository only (contents and pull requests: write), stored as a repository secret by the owner | CI starts on its own like for any PR; no approval click. A secret to create, rotate and keep scoped. |
| C. Land refresh PRs on the workflow's own offline checks | A project exception to "never merge with a pending check" | Not recommended: it weakens a safeguard for every agent. |

Recommendation: B, with A as the interim until the secret exists. With A or B, the `gh workflow run ci.yml` step can be dropped.

## Answer

Reply with A, B or C (or something else). The agent then updates the workflow (F-008-T03) and records the decision here.
