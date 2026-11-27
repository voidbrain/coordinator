# Live index: install on the base

Owner page for coordinator:F-024-T07, on the base that holds NERV's coordinator role (today NERV-01). This part, the GitHub token, is written by F-024-T03; installing the service is added by F-024-T05. Agents never run these steps.

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
