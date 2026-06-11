/**
 * server/server.ts
 * Server configuration and startup logic
 */
import 'exit-on-epipe';
import { type Server as HttpServerType } from 'node:http';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import type { ServerConfig } from '../types/index.js';
/**
 * Creates and configures an MCP server instance
 * @param config - Server configuration
 * @returns Configured server instance
 */
export declare function createServer(config: ServerConfig): Server;
/**
 * Starts the MCP server with stdio transport
 * @param config - Server configuration
 * @returns A promise that resolves when the server starts
 */
export declare function startServer(config: ServerConfig): Promise<void>;
export declare class RequestTimeoutError extends Error {
    code: number;
    constructor(message: string);
}
/**
 * A minimal transport that bridges HTTP POST requests directly
 * to the MCP Server without SSE streaming or session management.
 * Each request is handled independently — the server processes
 * the JSON-RPC message and the response is sent back via HTTP.
 * Responses are correlated to requests by JSON-RPC message id.
 */
export declare class SimpleHttpTransport implements Transport {
    private _onmessage?;
    private _waiters;
    sessionId: string;
    start(): Promise<void>;
    send(message: unknown): Promise<void>;
    close(): Promise<void>;
    set onmessage(handler: Transport['onmessage']);
    get onmessage(): Transport['onmessage'];
    onclose?: () => void;
    onerror?: (error: Error) => void;
    waitFor(id: string | number): Promise<unknown>;
}
/**
 * Starts the MCP server with direct HTTP transport
 * @param config - Server configuration
 * @param port - HTTP port to listen on
 * @returns A promise that resolves when the server starts
 */
export declare function startHttpServer(config: ServerConfig, port: number): Promise<HttpServerType>;
