/**
 * server/server.ts
 * Server configuration and startup logic
 */
import 'exit-on-epipe';
import { createServer as createHttpServer, } from 'node:http';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { TOOLS } from '../tools/definitions.js';
import { registerHandlers } from './handlers.js';
import { PROMPT_LIST } from './prompts.js';
/**
 * Builds the `instructions` string surfaced through the MCP `initialize`
 * response. Derived from `TOOLS` and `PROMPT_LIST` so the user-facing summary
 * cannot drift when a tool or prompt is added — the new entry shows up
 * automatically, and the maintainer just has to keep each tool's own
 * `description` in `definitions.ts` accurate.
 */
const buildServerInstructions = () => {
    const toolLines = TOOLS.map((tool) => `- ${tool.name} — ${tool.description}`);
    const promptNames = PROMPT_LIST.map((p) => p.name).join(', ');
    return [
        'This MCP server exposes native macOS Apple Reminders and Calendar access.',
        '',
        `Tools (${TOOLS.length}):`,
        ...toolLines,
        '',
        `Prompts (${PROMPT_LIST.length}): ${promptNames}.`,
        '',
        "All write actions go through the user's Reminders / Calendar accounts via EventKit.",
        'The first call may trigger a system permission dialog.',
    ].join('\n');
};
const SERVER_INSTRUCTIONS = buildServerInstructions();
/**
 * Creates and configures an MCP server instance
 * @param config - Server configuration
 * @returns Configured server instance
 */
export function createServer(config) {
    const server = new Server({
        name: config.name,
        version: config.version,
    }, {
        // Only advertise the capabilities we actually implement. We previously
        // declared `resources: {}` but never registered a resource handler —
        // that misled clients into thinking `ListResources` would work.
        capabilities: {
            tools: {},
            prompts: {},
        },
        instructions: SERVER_INSTRUCTIONS,
    });
    // Register request handlers
    registerHandlers(server);
    return server;
}
/**
 * Starts the MCP server with stdio transport
 * @param config - Server configuration
 * @returns A promise that resolves when the server starts
 */
export async function startServer(config) {
    let server;
    try {
        server = createServer(config);
        const transport = new StdioServerTransport();
        const shutdown = async (signal) => {
            try {
                await server?.close();
            }
            catch { }
            process.exit(signal === 'SIGINT' ? 130 : 143);
        };
        process.on('SIGINT', () => {
            void shutdown('SIGINT');
        });
        process.on('SIGTERM', () => {
            void shutdown('SIGTERM');
        });
        await server.connect(transport);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        process.stderr.write(`MCP server startup failed: ${message}\n`);
        process.exit(1);
    }
}
export class RequestTimeoutError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RequestTimeoutError';
        this.code = -32001;
    }
}
/**
 * A minimal transport that bridges HTTP POST requests directly
 * to the MCP Server without SSE streaming or session management.
 * Each request is handled independently — the server processes
 * the JSON-RPC message and the response is sent back via HTTP.
 * Responses are correlated to requests by JSON-RPC message id.
 */
export class SimpleHttpTransport {
    constructor() {
        this._waiters = new Map();
        this.sessionId = 'single';
    }
    async start() {
        // no-op
    }
    async send(message) {
        const msg = message;
        if (msg.id === undefined || msg.id === null) {
            return; // notification, no waiter
        }
        const resolve = this._waiters.get(msg.id);
        if (resolve) {
            this._waiters.delete(msg.id);
            resolve(message);
        }
    }
    async close() {
        const error = {
            jsonrpc: '2.0',
            error: { code: -32000, message: 'closed' },
            id: null,
        };
        for (const [, resolve] of this._waiters) {
            resolve(error);
        }
        this._waiters.clear();
        this.onclose?.();
    }
    set onmessage(handler) {
        this._onmessage = handler;
    }
    get onmessage() {
        return this._onmessage;
    }
    async waitFor(id) {
        return new Promise((resolve) => {
            this._waiters.set(id, resolve);
        });
    }
}
/**
 * Starts the MCP server with direct HTTP transport
 * @param config - Server configuration
 * @param port - HTTP port to listen on
 * @returns A promise that resolves when the server starts
 */
export async function startHttpServer(config, port) {
    const httpServer = createHttpServer();
    const startTime = Date.now();
    try {
        const server = createServer(config);
        const transport = new SimpleHttpTransport();
        await server.connect(transport);
        const shutdown = async (signal) => {
            try {
                await server.close();
                await transport.close();
            }
            catch {
                /* best-effort */
            }
            httpServer.close();
            process.exit(signal === 'SIGINT' ? 130 : 143);
        };
        process.on('SIGINT', () => void shutdown('SIGINT'));
        process.on('SIGTERM', () => void shutdown('SIGTERM'));
        const sharedSecret = process.env.MCP_SHARED_SECRET;
        httpServer.on('request', async (req, res) => {
            const url = req.url || '';
            // Health endpoint — no auth required
            if (url === '/health' && req.method === 'GET') {
                const uptimeMs = Date.now() - startTime;
                let daemonAlive = null;
                if (process.env.EVENTKIT_DAEMON === '1') {
                    try {
                        const { EventKitDaemon } = await import('../utils/daemonExecutor.js');
                        const daemon = await EventKitDaemon.getInstance();
                        daemonAlive = await daemon.healthCheck();
                    }
                    catch {
                        daemonAlive = false;
                    }
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: true, daemonAlive, uptimeMs }));
                return;
            }
            // Allow unauthenticated access to well-known and register endpoints
            if (url === '/.well-known/oauth-authorization-server' ||
                url === '/.well-known/oauth-protected-resource' ||
                url === '/.well-known/openid-configuration') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({}));
                return;
            }
            if (url === '/register') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({}));
                return;
            }
            // Shared-secret auth gate
            if (sharedSecret) {
                const header = req.headers['x-mcp-secret'];
                if (header !== sharedSecret) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Unauthorized' }));
                    return;
                }
            }
            // MCP protocol endpoint
            if (req.method === 'POST') {
                let body = '';
                req.on('data', (chunk) => (body += chunk.toString()));
                req.on('end', async () => {
                    let message;
                    try {
                        message = JSON.parse(body);
                        // Notification — no response expected
                        if (message.id === undefined || message.id === null) {
                            transport.onmessage?.(message);
                            res.writeHead(202, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({}));
                            return;
                        }
                        transport.onmessage?.(message);
                        const timeoutMs = 25000;
                        const response = await Promise.race([
                            transport.waitFor(message.id),
                            new Promise((_, reject) => setTimeout(() => reject(new RequestTimeoutError('Request timed out')), timeoutMs)),
                        ]);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(response));
                    }
                    catch (error) {
                        if (error instanceof RequestTimeoutError) {
                            res.writeHead(504, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({
                                jsonrpc: '2.0',
                                error: { code: -32001, message: 'Request timed out' },
                                id: message?.id ?? null,
                            }));
                            return;
                        }
                        const msg = error instanceof Error ? error.message : String(error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            jsonrpc: '2.0',
                            error: { code: -32603, message: msg },
                            id: null,
                        }));
                    }
                });
                return;
            }
            // Default: return a JSON error so HTTP proxies / tunnels and JSON-only
            // clients never receive plain-text or HTML responses that break JSON
            // parsers. Keep body shape consistent with JSON-RPC error format used
            // elsewhere in the project.
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                jsonrpc: '2.0',
                error: { code: -32601, message: 'Not found' },
                id: null,
            }));
        });
        await new Promise((resolve) => {
            httpServer.listen(port, () => {
                process.stderr.write(`MCP HTTP server listening on http://localhost:${port}\n`);
                resolve();
            });
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        process.stderr.write(`MCP HTTP server startup failed: ${message}\n`);
        process.exit(1);
    }
    return httpServer;
}
//# sourceMappingURL=server.js.map