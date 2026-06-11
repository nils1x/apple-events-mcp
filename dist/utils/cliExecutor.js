/**
 * @fileoverview Swift CLI execution and JSON response parsing
 * @module utils/cliExecutor
 * @description Executes the EventKitCLI binary for native macOS EventKit operations
 */
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { findSecureBinaryPath, getEnvironmentBinaryConfig, } from './binaryValidator.js';
import { FILE_SYSTEM } from './constants.js';
import { CliUserError } from './errorHandling.js';
import { bufferToString } from './helpers.js';
import { findProjectRoot } from './projectUtils.js';
let cachedBinaryPath = null;
let cachedBinaryFingerprint = null;
/**
 * Clears the cached binary path (for testing)
 */
export function clearBinaryPathCache() {
    cachedBinaryPath = null;
    cachedBinaryFingerprint = null;
}
const fingerprintFor = (filePath) => {
    try {
        const stat = fs.statSync(filePath);
        return { ino: stat.ino, mtimeMs: stat.mtimeMs, size: stat.size };
    }
    catch {
        return null;
    }
};
const fingerprintMatches = (a, b) => a !== null &&
    b !== null &&
    a.ino === b.ino &&
    a.mtimeMs === b.mtimeMs &&
    a.size === b.size;
const execFilePromise = (cliPath, args) => new Promise((resolve, reject) => {
    execFile(cliPath, args, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
            const execError = error;
            execError.stdout = stdout;
            execError.stderr = stderr;
            reject(execError);
            return;
        }
        resolve({ stdout, stderr });
    });
});
/**
 * Permission error patterns from the Swift CLI
 */
const PERMISSION_ERROR_PATTERNS = {
    reminders: [
        /reminder permission denied/i,
        /reminders access denied/i,
        /not authorized.*reminders/i,
        /reminder permission is write-only/i,
    ],
    calendars: [
        /calendar permission denied/i,
        /calendar access denied/i,
        /not authorized.*calendar/i,
        /calendar permission is write-only/i,
    ],
};
/**
 * Detects if an error message indicates a permission issue
 * @param message - Error message to check
 * @returns The permission domain if detected, null otherwise
 */
function detectPermissionError(message) {
    for (const [domain, patterns] of Object.entries(PERMISSION_ERROR_PATTERNS)) {
        if (patterns.some((pattern) => pattern.test(message))) {
            return domain;
        }
    }
    return null;
}
/**
 * Custom error class for permission-related failures
 */
export class CliPermissionError extends Error {
    constructor(message, domain) {
        super(message);
        this.domain = domain;
        this.name = 'CliPermissionError';
    }
}
/**
 * Parses JSON output from CLI
 */
const parseCliOutput = (output) => {
    let parsed;
    try {
        parsed = JSON.parse(output);
    }
    catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        throw new Error(`EventKitCLI execution failed: Invalid CLI output - ${detail}`);
    }
    if (parsed.status === 'success') {
        return parsed.result;
    }
    const permissionDomain = detectPermissionError(parsed.message);
    if (permissionDomain) {
        throw new CliPermissionError(parsed.message, permissionDomain);
    }
    throw new CliUserError(parsed.message);
};
const runCli = async (cliPath, args) => {
    try {
        const { stdout } = await execFilePromise(cliPath, args);
        const normalized = bufferToString(stdout);
        if (!normalized) {
            throw new Error('EventKitCLI execution failed: Empty CLI output');
        }
        return parseCliOutput(normalized);
    }
    catch (error) {
        if (error instanceof CliPermissionError || error instanceof CliUserError) {
            throw error;
        }
        const execError = error;
        const normalized = bufferToString(execError?.stdout);
        if (normalized) {
            return parseCliOutput(normalized);
        }
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`EventKitCLI execution failed: ${errorMessage}`);
    }
};
/**
 * Resolves and validates the EventKitCLI binary path.
 * @returns The validated absolute path to the binary
 * @throws {CliUserError} If binary not found
 */
export function resolveBinaryPath() {
    const projectRoot = findProjectRoot();
    const binaryName = FILE_SYSTEM.SWIFT_BINARY_NAME;
    const canonicalPath = path.join(projectRoot, 'bin', binaryName);
    const possiblePaths = [canonicalPath];
    const config = {
        ...getEnvironmentBinaryConfig(),
        allowedPaths: [canonicalPath],
    };
    const { path: cliPath } = findSecureBinaryPath(possiblePaths, config);
    if (!cliPath) {
        throw new CliUserError(`EventKitCLI binary not found at ${possiblePaths[0]}.

The Swift binary is normally built automatically by the postinstall script,
but that step may have been skipped or failed (for example when the package
was installed without devDependencies, on a non-macOS host, or before Xcode
Command Line Tools were available).

To build it manually, clone the repository and run a local build:
   git clone https://github.com/fradser/mcp-server-apple-events.git
   cd mcp-server-apple-events
   pnpm install
   pnpm build

Then use the local path in your Claude Desktop config:
   "command": "node",
   "args": ["/absolute/path/to/mcp-server-apple-events/dist/index.js"]`);
    }
    return cliPath;
}
/**
 * Routes a CLI call through the EventKit daemon (when EVENTKIT_DAEMON=1) or
 * the existing one-shot executeCli path.
 *
 * @template T - Expected return type
 * @param {string[]} args - Array of `--key value` arguments
 * @returns {Promise<T>} Parsed result
 */
export async function cliCall(args) {
    if (process.env.EVENTKIT_DAEMON === '1') {
        const { EventKitDaemon } = await import('./daemonExecutor.js');
        const daemon = await EventKitDaemon.getInstance();
        const request = {};
        for (let i = 0; i < args.length; i += 2) {
            const key = args[i];
            const value = args[i + 1];
            if (key?.startsWith('--') && value !== undefined) {
                request[key.slice(2)] = value;
            }
        }
        return daemon.send(request);
    }
    return executeCli(args);
}
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
export async function executeCli(args) {
    if (cachedBinaryPath &&
        fingerprintMatches(cachedBinaryFingerprint, fingerprintFor(cachedBinaryPath))) {
        return await runCli(cachedBinaryPath, args);
    }
    cachedBinaryPath = null;
    cachedBinaryFingerprint = null;
    const cliPath = resolveBinaryPath();
    cachedBinaryPath = cliPath;
    cachedBinaryFingerprint = fingerprintFor(cliPath);
    return await runCli(cliPath, args);
}
//# sourceMappingURL=cliExecutor.js.map