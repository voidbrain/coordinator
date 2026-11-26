# 🗺️ hobo: coherence read, 2026-11-26

Every finding on this page was read at `voidbrain/hobo` `origin/main` `735e8af` on 2026-11-26. The repository is on harness 10.21.4 (`.harness.json:6`); the template is at 10.24.0.

The checks, quoted:

- `check:backlog`: 17 records passed, none over budget.
- `check:rules`: passes, with 46 procedure documents.
- `check:rule-load`: two over budget, "docs/agents/solution-dashboard.md is 2,561 tokens" and "run an audit …" reads 5,075 tokens.

| # | Kind | Sev | Evidence | Finding | Proposed fix | Fix owner |
|---|---|---|---|---|---|---|
| 1 | Stale after today | High | `.harness.json:6`; `tools/merge-when-green.mjs` (89 lines behind) | The landing tool lacks the 10.23.2 stale-base check (B-125) | Reconcile 10.23.2 | hobo |
| 2 | Unreachable procedure | Medium | `.harness.json:258` (`workUsage.enabled: true`); `AGENTS.md:76` (no "job usage" row) | `docs/agents/work-usage*.md` (4 pages) cannot be reached from AGENTS.md | Add the template row, or set `enabled: false` | hobo |
| 3 | Dead reference | Medium | `docs/agents/pull-requests.md:7`, `docs/backlog/review.md:26` (`work:pr`); `docs/backlog/closure.md:8` (`work:close`) | The procedures name scripts that `package.json` does not have | Add them from `core/package-scripts.json` (10.23.1) | hobo |
| 4 | Stale after today | Medium | `AGENTS.md:83` "(agent-behaviour checks when a runner is set)"; `docs/agents/rule-review.md:26-33` | The 10.24.0 split has not been reconciled | Reconcile both pages together, and drop the suffix | hobo |
| 5 | Stale after today | Medium | `AGENTS.md:53`, `:119` | The four 10.24.0 lines are missing | Merge them at the next reconcile | hobo |
| 6 | Owner question | Medium | `docs/work/tasks/F-014-T01.json` (goal "A dated yes or no"; acceptance "Cost, key handling and terms weighed") | The step does not state the question, and it gives neither the cost nor the terms the owner is asked to weigh | Write the question ("Add Google place data at about €X/month, with the key kept in `server/` config?") and the figures | hobo |
| 7 | Owner question | Low | `docs/work/tasks/F-008-T03.json` (options: static snapshot, link-encoded trip, read-only view over Tailscale) | The options are named, but the step does not say what each one exposes or costs. The acceptance asks for "privacy of shared data recorded". | Add one line per option on who can see the trip | hobo |
| 8 | Over budget | Low | `check:rule-load` (the audit route, 5,075 tokens) | The audit route is 75 tokens over budget | This follows from the template audit pages; see project-harness #6 | project-harness |
| 9 | Setting differs | Low | `.harness.json:220` (`audit.enforce: false`) | Coordinator check 5 reports this as a gap, and AGENTS.md does not say that audits are advisory here | F-020-T02 decides once, for every repository | coordinator (F-020-T02) |
| 10 | Template pages | Low | `docs/agents/skills.md:23,25,40`; `docs/agents/solution-dashboard.md` | One page names harness-only scripts, and the other is over budget | See project-harness #6 and #7 | project-harness |
