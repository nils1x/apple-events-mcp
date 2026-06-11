/**
 * @fileoverview Swift CLI execution and JSON response parsing
 * @module utils/cliExecutor
 * @description Executes the EventKitCLI binary for native macOS EventKit operations
 */
/**
 * Clears the cached binary path (for testing)
 */
export declare function clearBinaryPathCache(): void;
export type PermissionDomain = 'reminders' | 'calendars';
/**
 * Custom error class for permission-related failures
 */
export declare class CliPermissionError extends Error {
    readonly domain: PermissionDomain;
    constructor(message: string, domain: PermissionDomain);
}
/**
 * Resolves and validates the EventKitCLI binary path.
 * @returns The validated absolute path to the binary
 * @throws {CliUserError} If binary not found
 */
export declare function resolveBinaryPath(): string;
/**
 * Routes a CLI call through the EventKit daemon (when EVENTKIT_DAEMON=1) or
 * the existing one-shot executeCli path.
 *
 * @template T - Expected return type
 * @param {string[]} args - Array of `--key value` arguments
 * @returns {Promise<T>} Parsed result
 */
export declare function cliCall<T>(args: string[]): Promise<T>;
/**
 * Executes the EventKitCLI binary for native macOS EventKit operations
 * @template T - Expected return type from the Swift CLI
 * @param {string[]} args - Array of arguments to pass to the CLI
 * @returns {Promise<T>} Parsed JSON result from the CLI
 * @throws {Error} If binary not found, validation fails, or CLI execution fails
 * @description
 * - Locates binary using secure path validation
 * - Parses JSON response from Swift CLI
 *
 * @security
 * This function prevents shell injection through argument separation:
 *
 * 1. **Uses `execFile()` instead of `exec()`**: The Node.js `child_process.execFile()`
 *    function spawns the process directly without invoking a shell interpreter. This
 *    means shell metacharacters like `;`, `|`, `&`, `$`, `()`, and backticks are
 *    treated as literal text, not as command operators.
 *
 * 2. **Arguments passed as separate array**: Arguments are passed as an array of
 *    discrete strings to the binary, not concatenated into a command string. The
 *    operating system passes each argument directly to the spawned process via
 *    `execve()`, preventing injection through argument boundaries.
 *
 * 3. **Swift CLI ArgumentParser**: The Swift binary's custom argument parser
 *    treats every `--key` flag as taking the next token as its value, even if
 *    that token also starts with `--`. This prevents user-supplied text like
 *    `--draft outline` from being silently re-interpreted as a new flag, so
 *    legitimate user titles/notes starting with `--` round-trip as literal
 *    strings rather than being rejected at the TS boundary.
 *
 * Example of safe handling with malicious input:
 * ```typescript
 * // Even with malicious title containing shell metacharacters
 * await executeCli(['--title', 'test; rm -rf /']);
 * // The semicolon is passed as a literal string to the binary,
 * // NOT interpreted as a command separator
 * ```
 *
 * @example
 * const result = await executeCli<Reminder[]>(['--action', 'read', '--showCompleted', 'true']);
 */
export declare function executeCli<T>(args: string[]): Promise<T>;
