/**
 * helpers.ts
 * General utility functions for common operations
 */
/**
 * CLI argument building utilities
 */
/**
 * Adds an optional string argument to the args array if the value is defined
 */
export declare function addOptionalArg(args: string[], flag: string, value: string | undefined): void;
/**
 * Adds an optional boolean argument to the args array if the value is defined
 */
export declare function addOptionalBooleanArg(args: string[], flag: string, value: boolean | undefined): void;
/**
 * Adds an optional number argument to the args array if the value is defined
 */
export declare function addOptionalNumberArg(args: string[], flag: string, value: number | undefined): void;
/**
 * Adds an optional JSON argument to the args array if the value is defined
 */
export declare function addOptionalJsonArg(args: string[], flag: string, value: object | undefined): void;
/**
 * Type conversion utilities
 */
/**
 * Converts null values to undefined for optional fields
 * This is useful when converting from JSON (which uses null) to TypeScript types (which use undefined)
 */
export declare function nullToUndefined<T>(obj: T, fields: (keyof T)[]): T;
/**
 * String manipulation utilities
 */
/**
 * Converts Buffer or string data to string, handling null/undefined values
 */
export declare function bufferToString(data?: string | Buffer | null): string | null;
/**
 * Formats multiline notes for markdown display by indenting continuation lines
 * Replaces newlines with newline + indentation to maintain proper formatting
 */
export declare function formatMultilineNotes(notes: string): string;
