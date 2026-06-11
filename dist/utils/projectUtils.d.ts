/**
 * projectUtils.ts
 * Shared utilities for project-related operations
 */
/**
 * Finds the project root directory by looking for package.json
 * @param maxDepth - Maximum directory levels to traverse upward
 * @returns Project root directory path
 * @throws Error if project root cannot be found
 */
export declare function findProjectRoot(maxDepth?: 10): string;
