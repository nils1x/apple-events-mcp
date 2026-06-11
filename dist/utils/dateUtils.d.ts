/**
 * dateUtils.ts
 * Shared date calculation utilities
 */
/**
 * Creates a date object representing the start of today (midnight)
 */
export declare function getTodayStart(): Date;
/**
 * Creates a date object representing the start of tomorrow (midnight)
 */
export declare function getTomorrowStart(): Date;
/**
 * Creates a date object representing the start of the current calendar week.
 * Uses Intl.Locale.weekInfo for locale-aware week start when available.
 * Falls back to Sunday for environments without Intl.Locale support.
 */
export declare function getWeekStart(): Date;
/**
 * Creates a date object representing the end of the current calendar week
 * (start of next week). Matches Swift's Calendar.current.dateInterval(of: .weekOfYear).
 */
export declare function getWeekEnd(): Date;
/**
 * Creates a date object representing the start of a specific date (midnight)
 */
export declare function getDateStart(date: Date): Date;
