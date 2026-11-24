import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contentsText } from '../tools/solution-overview-lib.mjs';

// Review finding 1 (PR #1): the GitHub contents API returns no content for files over 1 MB; that must not read as
// an empty backlog.
test('contents API: base64 content decodes; a response without content is reported as missing', () => {
  assert.equal(
    contentsText({ encoding: 'base64', content: Buffer.from('# Backlog\n').toString('base64') }),
    '# Backlog\n',
  );
  assert.equal(contentsText({ encoding: 'none', content: '' }), null);
  assert.equal(contentsText({ type: 'file' }), null);
});
