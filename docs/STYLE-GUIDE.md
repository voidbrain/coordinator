# Coordinator style guide

How this repository's documents and generated views are written. The coordinator has no UI: its pages are Markdown read on GitHub. When this guide and a generator disagree, the generator is what ships: fix whichever is wrong and record the discrepancy in the backlog if it is not fixed in the same change.

The reader is the owner, scanning what every project needs next. Pages lead with what to do, then the detail behind it.

## Documentation ownership

This guide governs repository writing and the generated views; [Backlog rules](BACKLOG-RULES.md) govern tracking. Backlog status/priority emoji are documentation cues. README describes what the coordinator does; AGENTS directs work in it. User instructions take precedence.

## Content and voice

- **Voice:** short, direct, addressed to the owner. No "we", no exclamation marks.
- **Sentence case** for headings and table columns.
- **Say what happened, then what to do.** "nerv:B-124 is not in nerv's active backlog; remove it or fix the ID."
- Projects are shown with their emoji from `.solution.json`: 🧭 solution (this repository), 𖣂 nerv, 🤖 gauntlet-protocol, 🦺 project-harness, 🚁 fpvbuddy, 🪴 grover.
- References are always repository-qualified: `nerv:B-124`, `grover:F-003`, `solution:F-002` for this repository's own records, as the template's dashboard and order check name it (older text says `coordinator:F-002`).
- Hours as the owning backlog states them (`3.5 h agent + 1 h owner`); dates as `2026-11-24`; snapshot times in UTC ISO 8601.

## Generated views

- The first line of a generated file is its generator marker; the generator refuses to overwrite a file without it.
- Every view states its snapshot time and the revision it read from each source. An unavailable source shows as Unknown, never as empty.
- No completion percentage, combined or not. Remaining hours are summed across backlogs only with the label that each project estimates on its own (not cross-calibrated); an unreadable backlog makes the sum "at least". The agent runway says which items are less certain.
- Long lists (all open steps of a repository) sit in `<details>` so the page stays scannable.

## Writing in this repository

- Plain English, short sentences, active voice. Say what is, not what might be.
- Name things as the code names them: files, functions, commands in backticks, linked when they are paths.
- Dates are absolute (`2026-10-29`), never "yesterday" or "last week".
- One owner per fact: link to it rather than restating it. AGENTS for how to work, the backlog for status, the components' backlogs for their work, this guide for voice, README for what the coordinator does.

## Keeping it in step

A change to a generator's layout or wording updates this guide in the same PR.
