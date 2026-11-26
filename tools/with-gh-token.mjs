// Runs a command with GH_TOKEN set: the environment's GH_TOKEN or GITHUB_TOKEN, else `gh auth token`.
// Without any, the command still runs (the unauthenticated limit may allow it) and a failure says what is missing.
import { execFileSync, spawnSync } from 'node:child_process';

export function resolveToken(
  env,
  ghAuthToken = () => execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }),
) {
  if (env.GH_TOKEN) return { token: env.GH_TOKEN, source: 'GH_TOKEN' };
  if (env.GITHUB_TOKEN) return { token: env.GITHUB_TOKEN, source: 'GITHUB_TOKEN' };
  try {
    const token = String(ghAuthToken()).trim();
    if (token) return { token, source: 'gh auth token' };
  } catch {
    // gh missing or not logged in: reported by hintAfterFailure
  }
  return { token: '', source: '' };
}

export function hintAfterFailure({ token }) {
  if (token) return '';
  return 'No GitHub token: GH_TOKEN is not set and `gh auth token` gave none. Run `gh auth login` or export GH_TOKEN; without one GitHub allows 60 requests an hour, and a "HTTP 403" above means that limit is spent.';
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [command, ...args] = process.argv.slice(2);
  if (!command) {
    console.error('Usage: node tools/with-gh-token.mjs <command> [args…]');
    process.exit(2);
  }
  const found = resolveToken(process.env);
  const env = found.token ? { ...process.env, GH_TOKEN: found.token } : process.env;
  const r = spawnSync(command, args, { stdio: 'inherit', env });
  const hint = r.status === 0 ? '' : hintAfterFailure(found);
  if (hint) console.error(hint);
  process.exit(r.status ?? 1);
}
