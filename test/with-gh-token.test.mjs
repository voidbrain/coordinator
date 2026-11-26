import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveToken, hintAfterFailure } from '../tools/with-gh-token.mjs';

const ghFails = () => {
  throw new Error('gh: not logged in');
};

test('a GH_TOKEN in the environment is used as is and gh is not asked', () => {
  const r = resolveToken({ GH_TOKEN: 'env-token' }, () => assert.fail('gh asked'));
  assert.deepEqual(r, { token: 'env-token', source: 'GH_TOKEN' });
});

test('GITHUB_TOKEN stands in for an unset GH_TOKEN', () => {
  assert.deepEqual(resolveToken({ GITHUB_TOKEN: 'ci-token' }, ghFails), { token: 'ci-token', source: 'GITHUB_TOKEN' });
});

test('with no token set, gh auth token supplies it', () => {
  assert.deepEqual(
    resolveToken({}, () => 'gh-token\n'),
    { token: 'gh-token', source: 'gh auth token' },
  );
});

test('with no token and no gh login, the result names what is missing', () => {
  const r = resolveToken({}, ghFails);
  assert.equal(r.token, '');
  assert.match(hintAfterFailure(r), /GH_TOKEN/);
  assert.match(hintAfterFailure(r), /gh auth login/);
  assert.match(hintAfterFailure(r), /60 requests an hour/);
});

test('a token found adds no hint to a failure', () => {
  assert.equal(hintAfterFailure({ token: 'x', source: 'GH_TOKEN' }), '');
});
