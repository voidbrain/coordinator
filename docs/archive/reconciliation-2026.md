# Reconciliation log 2026

Each entry: the main commit the backlog was reconciled against and the PRs merged since, with their CI. The newest entry is the ledger header.

## 2026-11-25 — main `f414f65`

PRs #1–#24 merged on green CI. F-001 and F-002 verified on that CI and closed; F-003, F-005 and F-008 were already closed; B-001, F-004 and F-009 updated in their own PRs.

Per PR: #1, #2: F-001 (and F-005, F-008); #3, #7, #9, #13, #15, #17, #20, #24: Refresh solution views, generated views only, no record; #4, #11: F-002 (#4 also F-008, gap proposals); #5, #12, #14: solution-order maintenance dropping closed items (B-001's trigger, fixed in #16), no record of their own; #6, #8: F-008; #10: F-004-T01; #16, #18: B-001; #19, #23: F-009 (#23 also F-004); #21, #22: F-003.

## 2026-11-25 — main `41faf38`

PR #25 (reconcile; F-001 and F-002 closed) merged on green CI. B-001 closed on its verified evidence: PRs #16 and #18, Refresh run 45575332245.

## 2026-11-25 — main `d4536ab`

PR #26 (B-001 closed) merged on green CI. Delivery audit of 2026-11-25 recorded; B-002 opened and B-003 opened in Investigate from its findings.

## 2026-11-25 — main `9706998`

PR #27 (delivery audit; B-002 and B-003 opened) merged on green CI. B-002 and B-003 now name it.

## 2026-11-25 — main `7c0e5b8`

PR #28 (B-002 and B-003 name PR #27) merged on green CI; no record change needed. Harness reconciled to v10.20.1 in the F-004-T02 PR.

## 2026-11-25 — main `b9615f0`

PRs #29 to #37 (F-004-T02 reconcile to 10.20.1, F-010 self-merging refresh PRs and their records, refresh PRs #30, #32, #34, #37) merged on green CI. Harness reconciled to v10.21.1 in the F-004-T05 PR.

## 2026-11-25 — main `69da441`

PRs #38 (F-006 coordination) and #39 (F-004-T05 reconcile to 10.21.1, overview retired) merged on green CI. Harness reconciled to v10.21.2 in the F-011 PR.

## 2026-11-26 — main `3955e40`

PRs #40 to #63 merged on green CI: harness v10.21.2 and v10.21.4 (F-011, F-015), bricks (F-012), openbando and hobo (F-013), screens via MCP, B-002 GH_TOKEN, B-004 hourly refresh, F-016 shared-assets plan; F-014, F-015, B-003 closed; refresh PRs.

## 2026-11-26 — main `6b42c66`

PRs #65 (solution:F-016 ordered at 7) and #66 (F-017 cross-project audit plan) merged on green CI.

## 2026-11-26 — main `bdc96c3`

PRs #67, #68 and #69 (F-017-T01 cross-project audit procedure and its close, solution:F-017 in the order) merged on green CI.

## 2026-11-26 — main `486b854`

PR #70 (F-016-T01 Shared assets section in the domain map) merged on green CI.

## 2026-11-26 — main `5cd7567`

PR #71 (F-016-T02 shared-asset checks in the gap review, F-016-T01 closed) merged on green CI.

## 2026-11-26 — main `7974408`

PR #72 (F-016-T02 closed) and PR #73 (refresh of the solution views) merged on green CI.

## 2026-11-26 — main `a747f9e`

PR #74 (F-017-T02 first cross-project audit run) merged on green CI; F-017-T02 closed.

## 2026-11-26 — main `4a7680c`

PR #75 (close F-017-T02) merged on green CI; nothing left to close from it.

## 2026-11-26 — main `86abbd7`

PR #76 (order note, audit proposal 5) and PR #77 (audit proposals 4, 6, 9, 16; F-017-T03) merged on green CI; F-017-T03 closed.

## 2026-11-26 — main `4ea4115`

PRs #78 (close F-017-T03), #79 (F-018-T01 alert contract) and #80 (F-017-T06 dormant checks) merged on green CI; F-018-T01 closed. The full audit (F-017-T04) closed B-002, F-009 and F-011 and the steps F-012-T04 and F-013-T01, and opened B-005, B-006 and B-007.

## 2026-11-26 — main `d139d48`

PR #81 (F-017-T04 full audit) merged on green CI; F-017-T04 closed.

## 2026-11-26 — main `4b843ac`

PR #82 (close F-017-T04) merged on green CI.

## 2026-11-26 — main `7a69164`

PRs #83 (F-017-T05, audit.enforce) and #84 (B-005, refresh guard reads the HTML order table) merged on green CI. F-017-T05 and B-005 closed in #85; B-005 replayed on refresh PR #73 (prints ok).

## 2026-11-26 — main `4cd62c3`

PR #86 (B-007, backlog-reader test rule reworded per owner option b) merged on green CI; B-007 closed in #87.

## 2026-11-26 — main `34f9688`

PRs #87–#93 merged on green CI (#87: close B-007; #88: F-019-T01/T02; #89, #91: F-020 plan and order; #90: F-017-T07; #92: F-018, F-020–F-023 transfer plan; #93: refresh views, no record). F-017-T06, F-017-T07 and F-017 closed; F-019-T01 and F-019-T02 closed.

## 2026-11-26 — main `837fb31`

PR #99 reconciles the harness to v10.24.1 (from 10.21.4); the owner authorised it in chat on 2026-11-26 ("ok to all") although the template backlog is not empty. CI pending at this entry.
