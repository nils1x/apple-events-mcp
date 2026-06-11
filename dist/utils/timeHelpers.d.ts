/**
 * timeHelpers.ts
 * Time formatting and context utilities for prompt templates
 */
/**
 * Time context information for prompts
 */
export interface TimeContext {
    /** Current date and time in ISO format (UTC) */
    currentDateTime: string;
    /** Current date in YYYY-MM-DD format (local timezone) */
    currentDate: string;
    /** Current time in HH:MM format (local timezone) */
    currentTime: string;
    /** Day of the week (Monday, Tuesday, etc.) */
    dayOfWeek: string;
    /** Whether it's currently working hours (9am-6pm) */
    isWorkingHours: boolean;
    /** Time of day description */
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    /** Formatted time description for prompts */
    timeDescription: string;
}
/**
 * Get comprehensive time context for prompt templates
 */
export declare function getTimeContext(): TimeContext;
/**
 * Format a relative time description for scheduling
 */
export declare function formatRelativeTime(targetDate: Date): string;
/**
 * Get fuzzy time suggestions based on current time
 */
export declare function getFuzzyTimeSuggestions(): {
    laterToday: string;
    tomorrow: string;
    endOfWeek: string;
    nextWeek: string;
};
