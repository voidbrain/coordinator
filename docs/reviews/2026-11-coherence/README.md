# Coherence review, 2026-11

Per-repository coherence read for F-020-T01, made on 2026-11-26. The cross-repository page follows in F-020-T02. Nothing here changes a component. Each finding is a proposal to the repository named as its fix owner, and the owner decides in F-020-T05.

## Method

Each repository was read at `origin/main` after `git fetch` and exported with `git archive`. No checkout and no component was edited. The read followed the path a fresh agent takes at session start: AGENTS.md, then the procedures it names, then BACKLOG-RULES and `docs/backlog/`, then the open records and steps. Scripts did the mechanical part:

- `check:backlog`, `check:rules` and `check:rule-load`, run in each exported tree, give the budget warnings, quoted on each page;
- a link and reference scan covers relative Markdown links, `npm run <script>` against `package.json`, and `` `tools/…` `` paths;
- a reachability walk follows links from AGENTS.md to every `docs/agents/*.md` and `docs/backlog/*.md`;
- a byte comparison sets each copied file against project-harness `core/` at v10.24.0;
- open owner steps (task files) were tested in plain language: could the owner answer the step as it is written, without a re-explanation?

Each page also lists links that point at a tool a record plans to build. These are not dead links.

Severity: **High** means an agent can act wrongly on it or a safeguard is weakened. **Medium** means an agent is misled or a budget is exceeded. **Low** means wording, drift or a dated page.

| Repository | Revision read | Findings | High | Page |
|---|---|---|---|---|
| 𖣂 nerv | `0c9bfe9d` | 15 | 1 | [nerv](nerv.md) |
| 🦺 project-harness | `e084f07` | 11 | 1 | [project-harness](project-harness.md) |
| 🛰️ coordinator | `fe5ebec` | 15 | 1 | [coordinator](coordinator.md) |
| 🤖 gauntlet-protocol | `67ef7e6` | 8 | 1 | [gauntlet-protocol](gauntlet-protocol.md) |
| 🪴 grover | `a023623` | 9 | 1 | [grover](grover.md) |
| 🚁 fpvbuddy | `8816987` | 11 | 1 | [fpvbuddy](fpvbuddy.md) |
| 🗺️ hobo | `735e8af` | 10 | 1 | [hobo](hobo.md) |
| 🧱 bricks | `82ada4e` | 11 | 1 | [bricks](bricks.md) |
| 🏚️ openbando | `c18cfd1` | 13 | 2 | [openbando](openbando.md) |
| **Total** | | **103** | **10** | |

## Proposed freeze lines (first output of F-020-T01; the owner decides in F-020-T05)

The freeze is stated only in coordinator F-020. The coordinator owns its own line. For each of the other eight repositories, this read proposes one project line under "Work tracking" in AGENTS.md, made in that repository's own session. It would come with that repository's maintenance review, and F-020-T06 would remove it:

> - Freeze (coordinator:F-020, until F-020-T06): add no new procedure file, rule section or `docs/agents/*.md` page. A fix to an existing rule, a record, and a proposal that F-020 collects are allowed. A procedure that a record cannot wait for goes to the owner as a question first. <!-- project -->

| Repository | Proposed line | Note |
|---|---|---|
| nerv | the line above | Gemini is working on nerv branches. A branch in flight that adds a procedure lands only after the owner's answer. |
| project-harness | the line above, plus: "a template release that adds a rule section or procedure waits for F-020-T05, except one the owner has already accepted" | F-104 and F-105 plan new cadence text. That text is the main source of new procedure, so this freeze matters most here. |
| gauntlet-protocol, grover, fpvbuddy, hobo, bricks, openbando | the line above | These repositories still reconcile v10.22.0 to v10.24.0. A reconcile copies template text and adds no new rule here, so it is allowed. |
