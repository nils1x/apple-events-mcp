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
export function addOptionalArg(args, flag, value) {
    if (value !== undefined) {
        args.push(flag, value);
    }
}
/**
 * Adds an optional boolean argument to the args array if the value is defined
 */
export function addOptionalBooleanArg(args, flag, value) {
    if (value !== undefined) {
        args.push(flag, String(value));
    }
}
/**
 * Adds an optional number argument to the args array if the value is defined
 */
export function addOptionalNumberArg(args, flag, value) {
    if (value !== undefined) {
        args.push(flag, String(value));
    }
}
/**
 * Adds an optional JSON argument to the args array if the value is defined
 */
export function addOptionalJsonArg(args, flag, value) {
    if (value) {
        args.push(flag, JSON.stringify(value));
    }
}
/**
 * Type conversion utilities
 */
/**
 * Converts null values to undefined for optional fields
 * This is useful when converting from JSON (which uses null) to TypeScript types (which use undefined)
 */
export function nullToUndefined(obj, fields) {
    const result = { ...obj };
    for (const field of fields) {
        const fieldKey = String(field);
        if (result[fieldKey] === null) {
            result[fieldKey] = undefined;
        }
    }
    return result;
}
/**
 * String manipulation utilities
 */
/**
 * Converts Buffer or string data to string, handling null/undefined values
 */
export function bufferToString(data) {
    if (typeof data === 'string')
        return data;
    if (Buffer.isBuffer(data))
        return data.toString('utf8');
    return data ?? null;
}
/**
 * Formats multiline notes for markdown display by indenting continuation lines
 * Replaces newlines with newline + indentation to maintain proper formatting
 */
export function formatMultilineNotes(notes) {
    return notes.replace(/\n/g, '\n    ');
}
//# sourceMappingURL=helpers.js.map