# 🤖 gauntlet-protocol: coherence read, 2026-11-26

Every finding on this page was read at `voidbrain/gauntlet-protocol` `origin/main` `67ef7e6` on 2026-11-26. The repository is on harness 10.21.4 (`.harness.json:6`); the template is at 10.24.0.

The checks, quoted:

- `check:backlog`: 13 records passed, none over budget.
- `check:rules`: passes, with 44 procedure documents.
- `check:rule-load`: "Rule load: within budgets."

| # | Kind | Sev | Evidence | Finding | Proposed fix | Fix owner |
|---|---|---|---|---|---|---|
| 1 | Stale after today | High | `.harness.json:6`; `tools/merge-when-green.mjs` (89 lines behind) | The landing tool lacks the 10.23.2 stale-base check (B-125) | Reconcile 10.23.2 | gauntlet-protocol |
| 2 | Dead link | Medium | `docs/agents/procedures.md:21`; `docs/agents/solution-profile.md:57,61` | Three links point to `solution-dashboard.md`, which is not copied here | Copy the page, or remove the row and the two sentences as "not adopted" | gauntlet-protocol |
| 3 | Dead reference | Medium | `docs/agents/rule-review.md:30` (`npm run behaviour`); `.harness.json:209` (behaviour runner set) | The behaviour runner is configured, but `package.json` has no `behaviour` script, so the checks cannot be run as the page says | Add the script from `core/package-scripts.json` (10.23.1) | gauntlet-protocol |
| 4 | Stale after today | Medium | `AGENTS.md:76` "(agent-behaviour checks when a runner is set)"; `docs/agents/rule-review.md:26-33`; no `behaviour-checks.md` | The 10.24.0 split has not been reconciled | Reconcile both pages together, and drop the suffix | gauntlet-protocol |
| 5 | Stale after today | Medium | `AGENTS.md:46`, `:106` | The four 10.24.0 lines are missing | Merge them at the next reconcile | gauntlet-protocol |
| 6 | Dead reference | Low | `docs/agents/coverage-guide.md:12` (`coverage:browser`) | This is a Node library with no browser suite, yet the coverage row sends an agent to a browser step | Add a project line: "no browser suite" | gauntlet-protocol |
| 7 | Rule with nothing true to say | Low | `AGENTS.md:11` (Style guide: "Before any UI change …") | The library has no UI. The template says to delete a section that has nothing true to say (`core/AGENTS.md:1`). | Delete the section, or say it covers CLI output | gauntlet-protocol |
| 8 | Dead reference | Low | `docs/agents/skills.md:23,25,40` | The page names harness-only scripts. This is template text. | See project-harness #7 | project-harness |

These are planned, not dead: `tools/check-threat-map.mjs` and `tools/roadmap-status.mjs` (`docs/BACKLOG.md:305,420`; F-028, F-030) are proposals from the practices transfer.

Checked and found clean: the owner release steps (F-021-T05, F-023-T02, F-024-T02 and F-025-T02) say what the owner does, which is to tag the release after green CI.
