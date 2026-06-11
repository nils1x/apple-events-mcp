/**
 * types/index.ts
 * Type definitions for the Apple Reminders MCP server
 */
/**
 * Priority label mapping for display
 */
export const PRIORITY_LABELS = {
    0: 'none',
    1: 'high',
    2: 'medium',
    3: 'low',
};
/**
 * Action constant arrays for enum validation
 */
export const REMINDER_ACTIONS = [
    'read',
    'create',
    'update',
    'delete',
];
export const LIST_ACTIONS = [
    'read',
    'create',
    'update',
    'delete',
];
export const CALENDAR_ACTIONS = [
    'read',
    'create',
    'update',
    'delete',
];
export const DUE_WITHIN_OPTIONS = [
    'today',
    'tomorrow',
    'this-week',
    'overdue',
    'no-date',
];
//# sourceMappingURL=index.js.map