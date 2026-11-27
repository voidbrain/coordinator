// F-024-T04: the read tools as an MCP server over streamable HTTP (JSON-RPC by POST to /mcp, answered as JSON), for
// NERV (nerv:F-147) and agents on the same base; F-024-T05 adds the live screen at /. Stateless and read-only: no session, no tool writes. It listens on
// the loopback address only, and a browser page from another origin is refused (DNS rebinding).
import { createServer } from 'node:http';
import { answer, TOOLS, VERSION } from './read-tools.mjs';

const PROTOCOLS = ['2025-06-18', '2025-03-26'];
const MAX_BODY = 1024 * 1024;
const LOCAL = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;

function handle(db, m) {
  const { method, params } = m;
  if (method === 'initialize')
    return {
      result: {
        protocolVersion: PROTOCOLS.includes(params?.protocolVersion) ? params.protocolVersion : PROTOCOLS[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: 'coordinator-live-index', version: String(VERSION) },
      },
    };
  if (method === 'ping') return { result: {} };
  if (method === 'tools/list') return { result: { tools: TOOLS } };
  if (method === 'tools/call') {
    if (!TOOLS.some((t) => t.name === params?.name))
      return { error: { code: -32602, message: `unknown tool ${params?.name}` } };
    try {
      const a = answer(db, params.name, params.arguments ?? {});
      return { result: { content: [{ type: 'text', text: JSON.stringify(a) }], structuredContent: a } };
    } catch (e) {
      return { result: { content: [{ type: 'text', text: e.message }], isError: true } };
    }
  }
  return { error: { code: -32601, message: `method not found: ${method}` } };
}

// F-024-T05: `screen()` returns the live screen's HTML, answered at GET /.
export function mcpServer(db, screen) {
  return createServer((req, res) => {
    const reply = (status, body) => {
      res.writeHead(status, body === undefined ? {} : { 'content-type': 'application/json' });
      res.end(body === undefined ? undefined : JSON.stringify(body));
    };
    const path = new URL(req.url, 'http://localhost').pathname;
    if (path === '/' && req.method === 'GET' && screen) {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      return res.end(screen());
    }
    if (path !== '/mcp') return reply(404);
    if (req.headers.origin && !LOCAL.test(req.headers.origin)) return reply(403);
    if (req.method !== 'POST') {
      res.setHeader('allow', 'POST');
      return reply(405);
    }
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        if (!res.headersSent) reply(413);
        req.destroy();
      } else chunks.push(chunk);
    });
    req.on('end', () => {
      let m;
      try {
        m = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      } catch {
        return reply(400, { jsonrpc: '2.0', id: null, error: { code: -32700, message: 'parse error' } });
      }
      if (!m || typeof m !== 'object' || Array.isArray(m) || m.jsonrpc !== '2.0')
        return reply(400, { jsonrpc: '2.0', id: null, error: { code: -32600, message: 'invalid request' } });
      if (m.id === undefined || m.method === undefined) return reply(202); // a notification or a response
      reply(200, { jsonrpc: '2.0', id: m.id, ...handle(db, m) });
    });
  });
}
