/**
 * errorHandling.ts
 * Centralized error handling utilities for consistent error responses
 */
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
/**
 * Custom error class for user-facing CLI failures (e.g., not found, invalid input).
 * Defined here to avoid circular/heavy imports from cliExecutor.
 */
export declare class CliUserError extends Error {
    constructor(message: string);
}
/**
 * Determines if the application is running in development mode.
 * Development mode is enabled when:
 * - NODE_ENV is set to 'development', OR
 * - DEBUG environment variable is set to any truthy value
 *
 * This allows detailed error messages to be shown in development
 * while keeping production error messages generic for security.
 */
export declare function isDevelopmentMode(): boolean;
/**
 * Utility for handling async operations with consistent error handling
 */
export declare function handleAsyncOperation(operation: () => Promise<string>, operationName: string): Promise<CallToolResult>;
