# Proposal for the harness template: live index builder

Written 2026-11-26 in voidbrain/coordinator (`coordinator:F-024-T01`) for a project-harness session. Nothing here changes the template; the template's own session decides, records and releases. Owner decision 2026-11-26 in chat: "2" and "coordinator" on the [live index decision page](../decisions/live-index.md#answer) (step S1, the builder, is project-harness's), and "1 2 ok" (point 2: turn the live-index proposals into records in project-harness and nerv).

## Problem

The coordinator's live index (coordinator:F-024) needs one thing it cannot own: a deterministic reader that turns a repository's backlog into rows. Today `solution.mjs` and `work-items.mjs` already parse records, steps, owner steps, priorities and `dependsOn` to draw the dashboard, but only into Markdown. A second parser in the coordinator would drift from the harness checks that read the same files; the parsing is generic, so it belongs in the template ([decision page](../decisions/live-index.md#who-owns-it-where-it-runs), "Ownership").

## Proposed generic feature

A copied tool that reads one repository's backlog into a `node:sqlite` file. It reads, never writes a record; the file is a rebuildable cache: deleting it and building again gives the same rows.

1. **What it reads**, from a local checkout or a GitHub ref: records (ID, kind B/F, title, status, priority, effort, "Human action required", next action, source file, archived), steps (ID, parent, title, status, owner kind, agent and owner hours), `dependsOn` (local and `repo:ID`), the PRs each record and step names, and, from the GitHub API where the token can read them, those PRs' state, merge time and CI result. Both layouts the dashboard already reads: source-owned records with step files, and the authored four-column backlog. An unknown layout or an unreadable file is a row in `problems`, never no work (the coordinator's rule for any tool that reads a backlog).
2. **Schema** (one file per build, `PRAGMA user_version` = schema version): `sources(repo, owner_name, ref, commit, read_at, layout)`, `records(repo, id, kind, title, status, priority, effort, human_action, next, file, archived)`, `steps(repo, id, parent, title, status, owner_kind, agent_hours, owner_hours, file)`, `depends_on(repo, step, target)`, `prs(repo, item, number, state, merged_at, ci)`, `problems(repo, file, message)`. Every row carries the file it came from and the commit, so an answer can link to its source.
3. **Deterministic**: rows inserted in a fixed order, no wall-clock value except `sources.read_at`, which `dump` leaves out; the same commit gives byte-identical `dump` output.
4. **CLI**: `node tools/backlog-index.mjs build --db <file> --repo <id> [--source <checkout> | --remote <owner/name>@<ref>]` and `node tools/backlog-index.mjs dump --db <file>` (sorted JSON, for tests and diffs). A token comes from `GH_TOKEN` or `GITHUB_TOKEN`, as `with-gh-token.mjs` passes it; with none, a remote build reads what is public and records the rest in `problems`.
5. **Reuse, not a second parser**: it uses the record and step readers `solution.mjs` and `work-items.mjs` already have (exported from where they are, behaviour unchanged: their tests pass before and after).

No NERV or coordinator specifics: no repository names, no polling, no service, no MCP. Polling, the service, the MCP tools and the screen are the coordinator's (coordinator:F-024-T02 to T05).

## Where it lives

`core/tools/backlog-index.mjs`, copied like `solution.mjs`: it serves a solution coordinator, so the solution stack's copy list names it and plain projects do not receive it (as project-harness B-129 placed `solution.mjs`). The template's session decides between that and copying it into every project.

## Tests, failing first

Two invented fixture backlogs under the template's test fixtures: one with source-owned records and step files (an open feature with an owner step, a `dependsOn` across repositories, a closed step with a PR), one authored four-column backlog (a P1 bug, a record whose "Human action required" is Yes). Failing tests committed first against an empty tool: the expected `dump` for each fixture; a second build of the same commit gives the same `dump`; a fixture with an unknown layout gives a `problems` row and no records; a remote build on a fake GitHub client reads PR state and CI, and an unreadable repository is a `problems` row.

## Estimate and release

About 4 h agent, estimated 2026-11-26 from the decision page's S1 row, failing test first. Not a measurement. A **minor** release: a new optional tool, nothing a project must change. coordinator:F-024-T02 waits on that release (its `dependsOn` names the template step that publishes it, once the record exists).
