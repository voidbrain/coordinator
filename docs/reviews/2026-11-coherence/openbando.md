# 🏚️ openbando: coherence read, 2026-11-26

Every finding on this page was read at `voidbrain/openbando` `origin/main` `c18cfd1` on 2026-11-26. The repository is on harness 10.21.4 (`.harness.json:6`); the template is at 10.24.0. OpenBando copies fewer template files than the other projects, and most findings come from that.

The checks, quoted:

- `check:backlog`: "F-041: about 1,834 tokens, over the 1,500-token record budget"; 24 records passed.
- `check:rules`: passes, with 55 procedure documents.
- `check:rule-load`: nine over budget:
  - area pages: "docs/agents/areas/editor.md is 3,102 tokens", "flights.md 2,599", "sharing.md 2,049", "terrain.md 3,020", "welcome.md 2,614"
  - triggers over 5,000 tokens: parallel work 5,225; solution 5,272; rule review 5,344; audit 5,660

| # | Kind | Sev | Evidence | Finding | Proposed fix | Fix owner |
|---|---|---|---|---|---|---|
| 1 | Stale after today | High | `.harness.json:6`; `tools/merge-when-green.mjs` (89 lines behind) | The landing tool lacks the 10.23.2 stale-base check (B-125) | Reconcile 10.23.2 | openbando |
| 2 | Setting without procedure | High | `.harness.json:601` (`workUsage.enabled: true`) | Usage tracking is switched on, but there is no `docs/agents/work-usage*.md`, no `tools/work-usage.mjs`, no `work:usage` or `work:launch` script and no AGENTS row. The tools and checks read the setting, yet nothing in the repository says what to do. F-055 (`docs/work/records/F-055.md:20`) names the missing tool. | Set `enabled: false` until F-055 lands, or copy the pages, tools and scripts | openbando |
| 3 | Dead link | Medium | `docs/agents/procedures.md:21,22`; `docs/agents/solution-profile.md:5,57,61` (6 links) | The links point to `solution-dashboard.md`, `solution-gaps.md` and `solution-refresh.md`, which are not copied here | Copy the pages, or remove the rows and sentences as "not adopted" | openbando |
| 4 | Dead reference | Medium | `docs/agents/rule-review.md:28,30` (`tools/behaviour.mjs`, `npm run behaviour`); `.harness.json:605` (behaviour set) | The behaviour checks are configured, but the tool and the script are missing | Copy the tool and script, or remove the setting | openbando |
| 5 | Dead reference | Medium | `docs/backlog/closure.md:14` (`tools/archive-recap.mjs`); `docs/backlog/ordering.md:8` (`tools/backlog-dependencies.mjs`); `docs/agents/coverage-guide.md:9,12` (`tools/browser-coverage.mjs`, `coverage:browser`) | Copied procedures name tools that were not copied | Reconcile 10.23.1 (package scripts), or add a project line per page | openbando |
| 6 | Dead reference | Medium | `AGENTS.md:35` (safety block: `node tools/guard.mjs install`) | The always-loaded rules name a tool OpenBando does not have | Copy `tools/guard.mjs` and `guard:install` | openbando |
| 7 | Over budget | Medium | `check:rule-load` (five area pages, 2,049 to 3,102 tokens) | The project's own area pages are over the 2,000 budget. `editor.md` and `terrain.md` are about 1.5 times over. | Split the pages by trigger, keeping every rule | openbando |
| 8 | Over budget | Medium | `check:backlog` | F-041 is about 1,834 tokens, against a budget of 1,500 | Move older evidence to `docs/archive/evidence-2026.md` | openbando |
| 9 | Stale after today | Medium | `AGENTS.md:87` "(agent-behaviour checks when a runner is set)"; `docs/agents/rule-review.md:26-33` | The 10.24.0 split has not been reconciled | Reconcile both pages together, after #4 | openbando |
| 10 | Stale after today | Medium | `AGENTS.md:52`, `:132` | The four 10.24.0 lines are missing | Merge them at the next reconcile | openbando |
| 11 | Duplicate rule | Low | `AGENTS.md:133` "Keep real-device, pointer/visual and untested tool combinations explicit" and `:131` (template: "a unit test is not a visual, pointer or device check") | The same requirement appears twice, in different words | Fold line 133's "untested tool combinations" into line 131 as a project addition | openbando |
| 12 | Owner question | Low | `docs/work/tasks/F-033-T01.json` ("reads the impact map page"); `F-026-T01` ("title-based tips (A), a tip per control (B)") | "Impact map" is agent jargon, and options A and B are named without a picture of each | Link the page by what it shows ("which files change together"), and add a screenshot per option | openbando |
| 13 | Template pages | Low | `docs/agents/skills.md:23,25,40` | The page names harness-only scripts | See project-harness #7 | project-harness |

These are planned, not dead: `tools/check-threat-map.mjs` (F-056), `tools/work-usage.mjs` (F-055) and `tools/prototypes/align-measure.e2e.ts` (F-041) are named by open records as work to do.
