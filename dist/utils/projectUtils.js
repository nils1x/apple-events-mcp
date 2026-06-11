/**
 * projectUtils.ts
 * Shared utilities for project-related operations
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FILE_SYSTEM } from './constants.js';
/**
 * Finds the project root directory by looking for package.json
 * @param maxDepth - Maximum directory levels to traverse upward
 * @returns Project root directory path
 * @throws Error if project root cannot be found
 */
export function findProjectRoot(maxDepth = FILE_SYSTEM.MAX_DIRECTORY_SEARCH_DEPTH) {
    // Derive the starting directory from the current module's location for robustness.
    const currentDir = getCurrentModuleDir();
    const root = locateProjectRoot(currentDir, maxDepth);
    if (root) {
        return root;
    }
    throw new Error(`Project root not found within ${maxDepth} directory levels`);
}
/**
 * Attempts to find the project root starting from the provided directory.
 * @param startDir - Directory to begin the search from
 * @param maxDepth - Maximum directory levels to traverse upward
 * @returns The project root when found, otherwise `undefined`
 */
function locateProjectRoot(startDir, maxDepth = FILE_SYSTEM.MAX_DIRECTORY_SEARCH_DEPTH) {
    let currentDir = startDir;
    let depth = 0;
    while (depth < maxDepth) {
        if (isCorrectProjectRoot(currentDir)) {
            return currentDir;
        }
        const parentDir = path.dirname(currentDir);
        if (parentDir === currentDir) {
            break; // Reached filesystem root
        }
        currentDir = parentDir;
        depth++;
    }
    return undefined;
}
/**
 * Checks if a directory contains the correct package.json for this project
 */
function isCorrectProjectRoot(dir) {
    const packageJsonPath = path.join(dir, FILE_SYSTEM.PACKAGE_JSON_FILENAME);
    if (!fs.existsSync(packageJsonPath)) {
        return false;
    }
    try {
        const packageContent = fs.readFileSync(packageJsonPath, 'utf8');
        const packageData = JSON.parse(packageContent);
        return packageData.name === 'mcp-server-apple-events';
    }
    catch {
        // Silently return false for any read/parse errors during project root discovery
        // This allows the search to continue up the directory tree
        return false;
    }
}
/**
 * Get the current module's directory
 * Handles both production and test environments
 */
function getCurrentModuleDir() {
    if (process.env.NODE_ENV === 'test') {
        return path.join(process.cwd(), 'src', 'utils');
    }
    // In production, use import.meta.url
    // This line is excluded from coverage due to Jest ESM limitations
    /* istanbul ignore next */
    return path.dirname(fileURLToPath(import.meta.url));
}
//# sourceMappingURL=projectUtils.js.map