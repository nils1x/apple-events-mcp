/**
 * reminderDateParser.ts
 * Helper utilities for parsing reminder dueDate strings safely across timezones.
 */
/**
 * Parses reminder dueDate strings into Date objects without losing local timezone semantics.
 */
export declare const parseReminderDueDate: (dueDate?: string | null) => Date | undefined;
