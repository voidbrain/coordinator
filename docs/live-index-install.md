# Live index: install on the base

Owner page for coordinator:F-024-T07, on the base that holds NERV's coordinator role (today NERV-01). Sections 1 to 3 (the GitHub token, F-024-T03) were done on NERV-01 on 2026-11-27; sections 4 to 6 (F-024-T05) install the service and open its screen. Agents never run these steps. On a new base (a relocation of the coordinator role, nerv:F-016) run every section there.

## 1. Create the read-only GitHub token

The service (`node src/cli.mjs serve`) reads GitHub every 5 minutes with this token and nothing else. It only reads.

1. Open <https://github.com/settings/personal-access-tokens/new> (Settings → Developer settings → Fine-grained tokens → Generate new token).
2. Token name: `coordinator live index (read-only)`. Expiration: 90 days (the service stops with a clear error in its log when it expires; repeat this section). Resource owner: `voidbrain`.
3. Repository access: **Only select repositories**, these nine (the coordinator and the eight in `.solution.json`):
   `coordinator`, `nerv`, `gauntlet-protocol`, `project-harness`, `FPVBuddy`, `Grover`, `openbando`, `hobo`, `bricks`.
4. Repository permissions, each **Read-only**: **Contents**, **Pull requests**, **Actions**, **Commit statuses**, and **Checks** if the list shows it. **Metadata** turns to Read-only by itself. Leave every other permission at No access, and every account permission too.
5. Generate token and copy it (it starts with `github_pat_`). GitHub shows it once.

## 2. Put it on the base

In Terminal on that base, paste this; it waits for you to paste the token (nothing is shown) and press Return:

```bash
mkdir -p ~/.coordinator-index && chmod 700 ~/.coordinator-index
(umask 077; read -rs T && printf '%s\n' "$T" > ~/.coordinator-index/github-token; unset T)
chmod 600 ~/.coordinator-index/github-token
ls -l ~/.coordinator-index/github-token
```

Expected: one line that starts with `-rw-------` and ends with `github-token`. The file never goes into git; `~/.coordinator-index` is the service's data folder (cache and logs), and `--token <file>` names another place.

## 3. Check it reads all nine

```bash
for r in coordinator nerv gauntlet-protocol project-harness FPVBuddy Grover openbando hobo bricks; do
  printf '%s ' "$r"
  curl -s -o /dev/null -w '%{http_code}\n' -H "Authorization: Bearer $(cat ~/.coordinator-index/github-token)" \
    "https://api.github.com/repos/voidbrain/$r/actions/runs?per_page=1"
done
```

Expected: nine lines, each a repository name followed by `200`. A `404` means that repository is not selected in step 3 of section 1; a `401` means the token was pasted wrong (repeat section 2) or it expired.

Without this file, `serve` stops at once with `no GitHub token in …/github-token`, naming this page. `node src/cli.mjs rebuild` (local checkouts) needs no token.

## 4. Install the launchd job

On NERV-01, in Terminal. The service runs from the coordinator's primary checkout, which stays on `main`; it needs Node 24 or newer and no `npm install` (Node's built-in modules only).

```bash
git -C ~/Projects/coordinator switch main && git -C ~/Projects/coordinator pull --ff-only
node --version
mkdir -p ~/.coordinator-index/logs
sed -e "s|@NODE@|$(command -v node)|" -e "s|@CHECKOUT@|$HOME/Projects/coordinator|g" -e "s|@DATA@|$HOME/.coordinator-index|g" \
  ~/Projects/coordinator/service/io.voidbrain.coordinator-index.plist > ~/Library/LaunchAgents/io.voidbrain.coordinator-index.plist
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/io.voidbrain.coordinator-index.plist
sleep 120; tail -n 3 ~/.coordinator-index/logs/index.log
```

Expected: `node --version` prints `v24` or newer; the last lines of the log are `MCP read tools at http://127.0.0.1:7380/mcp, the screen at http://127.0.0.1:7380/` and, once the first poll ends (one to two minutes; run the `tail` line again if it is not there yet), `rebuilt coordinator, nerv, gauntlet-protocol, project-harness, fpvbuddy, grover, openbando, hobo, bricks from GitHub`. `Bootstrap failed: 5` means the job is already loaded: run `launchctl bootout gui/$(id -u)/io.voidbrain.coordinator-index` and the `launchctl bootstrap` line again. A line `no GitHub token in …` means section 2 is missing; `EADDRINUSE` means port 7380 is taken (add `<string>--port</string><string>7381</string>` after `@DATA@` in the plist and use that port below).

## 5. Check the MCP read tools

```bash
curl -s http://127.0.0.1:7380/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"record_lookup","arguments":{"ref":"coordinator:F-024"}}}' | head -c 300; echo
```

Expected: one line of JSON that starts with `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"version\":1,\"snapshot\":` and names `Live index, phase 1`. NERV connects to this same address (nerv:F-147-T01).

## 6. Open the screen

Open <http://127.0.0.1:7380/> in a browser on NERV-01 (it answers on that machine only).

Expected: the page "🚦 voidbrain live index" with a Snapshot time a few minutes old and nine rows under Sources. After the next merge on any of the nine repositories, reload within 10 minutes: that repository's Commit cell shows the new merge commit (compare with `git ls-remote https://github.com/voidbrain/coordinator main` for the coordinator).

## Update, stop, remove

- After a merge that changes `src/` here: `git -C ~/Projects/coordinator pull --ff-only && launchctl kickstart -k gui/$(id -u)/io.voidbrain.coordinator-index`.
- Stop it: `launchctl bootout gui/$(id -u)/io.voidbrain.coordinator-index`. Remove it: stop it, then `rm ~/Library/LaunchAgents/io.voidbrain.coordinator-index.plist`. The cache in `~/.coordinator-index` is disposable; keep `github-token` if you reinstall.
