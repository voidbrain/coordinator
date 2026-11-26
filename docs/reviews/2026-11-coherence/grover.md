# 🪴 grover: coherence read, 2026-11-26

Every finding on this page was read at `voidbrain/Grover` `origin/main` `a023623` on 2026-11-26. The repository is on harness 10.21.4 (`.harness.json:6`); the template is at 10.24.0.

The checks, quoted:

- `check:backlog`: 29 records passed, none over budget.
- `check:rules`: passes, with 46 procedure documents.
- `check:rule-load`: nine over budget:
  - "always-loaded rules are 3,577 tokens, over the 3,500 budget"
  - "docs/agents/solution-dashboard.md is 2,561 tokens"
  - seven triggers over 5,000 tokens: switch tasks 5,011; parallel work 5,324; job usage 5,016; solution 5,371; reconcile 5,057; rule review 5,443; audit 5,759

| # | Kind | Sev | Evidence | Finding | Proposed fix | Fix owner |
|---|---|---|---|---|---|---|
| 1 | Stale after today | High | `.harness.json:6`; `tools/merge-when-green.mjs` (89 lines behind) | The landing tool lacks the 10.23.2 stale-base check (B-125) | Reconcile 10.23.2 | grover |
| 2 | Over budget | Medium | `check:rule-load` | Grover is the only repository whose always-loaded rules are over budget. Its AGENTS.md has 130 lines. "Architecture" (`AGENTS.md:9-16`), "Adding things" (`:24-27`) and the pitfalls (`:103-105`) are long. | Move the recipes in "Adding things" to `docs/agents/adding-things.md` with a procedures row. Keep every rule. | grover |
| 3 | Over budget | Medium | `check:rule-load` (seven triggers) | Seven triggers read more than 5,000 tokens, the most in any component. Each one adds Grover's long AGENTS.md to template pages. | Fixing #2 brings most of them back under budget | grover |
| 4 | Dead reference | Medium | `docs/agents/pull-requests.md:7`; `docs/backlog/review.md:26` | Both pages name `npm run work:pr`, which `package.json` does not have | Add the script from `core/package-scripts.json` (10.23.1) | grover |
| 5 | Stale after today | Medium | `AGENTS.md:94` "(agent-behaviour checks when a runner is set)"; `docs/agents/rule-review.md:26-33` | The 10.24.0 split has not been reconciled | Reconcile `behaviour-checks.md` and `rule-review.md` together, and drop the suffix | grover |
| 6 | Stale after today | Medium | `AGENTS.md:62`, `:130` | The four 10.24.0 lines are missing. They would also add tokens to an AGENTS.md already over budget, so do #2 first. | Merge them after #2 | grover |
| 7 | Over budget | Low | `docs/agents/solution-dashboard.md` (2,561 tokens) | The template page is over budget | See project-harness #6 | project-harness |
| 8 | Dead reference | Low | `docs/agents/skills.md:23,25,40` | The page names harness-only scripts | See project-harness #7 | project-harness |
| 9 | Setting differs | Low | `.harness.json:286` (`audit.enforce: false`) | Coordinator cross-project audit check 5 reports "full audit with enforce off" as a gap. Grover's AGENTS.md does not say that the audit is advisory here. | F-020-T02 decides once, for every repository | coordinator (F-020-T02) |

Checked and found clean:

- The owner steps are concrete. B-009-T01 names the PRs, and F-003-T01 and F-026-T03 list their options.
- The hardware and safety-layer lines (`AGENTS.md:40-41`) sit inside the safety block, as safeguards should.

These are planned, not dead: `tools/check-threat-map.mjs` (`docs/BACKLOG.md:1114`; F-024) is a proposal.
