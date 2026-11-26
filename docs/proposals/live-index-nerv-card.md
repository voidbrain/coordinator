# Proposal for nerv: live index card

Written 2026-11-26 in voidbrain/coordinator (`coordinator:F-024-T06`) for a nerv session. Nothing in nerv is edited from here; nerv's session decides and records. Owner decision 2026-11-26 in chat: "2" and "coordinator" on the [live index decision page](../decisions/live-index.md#answer) (step S6: NERV shows the index through MCP surface cards like any project), and "1 2 ok" (point 2: turn the live-index proposals into records in project-harness and nerv).

## Proposal

- **Connection**: NERV adds the coordinator's live index as a remote MCP server, as it connects Grover's hub (nerv:F-123-T01), read-only: every tool registered Green, and a tool that could write is refused at registration. NERV keeps no copy of the index's data (coordinator `docs/DOMAINS.md`, "The rule for screens").
- **Card**: the answers of the index's read tools (record lookup, "waiting on me", "blocked by X"; the MCP contract row coordinator:F-024-T04 writes in `docs/SOLUTION.md` is the interface) render as a 🧱 bricks surface card (nerv's `bx-surface` cards, nerv:F-130-T19), with each row's source link and the index's snapshot time, and a link that opens the index's own screen (coordinator:F-024-T05). An unreachable index says so, never shows no work.
- **Chat**: the owner asks in Italian ("cosa aspetta me?", "cosa blocca F-024?"); card labels in chat are Italian. A model-facing request, so it gets an Italian Gauntlet case or a recorded skip (shared-asset checks).
- **Tests, failing first**: a test across the API and the component on an invented fake index: a "waiting on me" answer renders the card with its links, a write tool is refused, an unreachable server is reported.

## Estimate

About 1 h agent, estimated 2026-11-26 from the decision page's S6 row; plus a short owner check once the index runs on the base (coordinator:F-024-T07). Not a measurement. It waits on coordinator:F-024-T04 (the MCP read tools).
