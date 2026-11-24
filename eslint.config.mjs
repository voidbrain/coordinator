// Harness ESLint config for plain JavaScript (flat config). Formatting is Prettier's job; these rules look for mistakes.
import { readFileSync } from 'node:fs';
import js from '@eslint/js';

// Copied harness tools are linted by the template: ignore exactly those paths, so this repository's own tools are linted.
const copied = Object.keys(JSON.parse(readFileSync(new URL('./.harness.json', import.meta.url), 'utf8')).copied ?? {});

const node = ['console', 'process', 'URL', 'URLSearchParams', 'fetch', 'Buffer', 'AbortController', 'AbortSignal']
  .concat(['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'setImmediate', 'structuredClone'])
  .concat(['TextEncoder', 'TextDecoder', 'performance', 'queueMicrotask']);

export default [
  // `.harness/` is where CI checks the template out.
  { ignores: ['node_modules/**', '.harness/**', ...copied] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: Object.fromEntries(node.map((name) => [name, 'readonly'])),
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      // Input validation matches control characters on purpose.
      'no-control-regex': 'off',
      // Fixed error texts are deliberate where a cause could carry private or untrusted text.
      'preserve-caught-error': 'off',
    },
  },
];
