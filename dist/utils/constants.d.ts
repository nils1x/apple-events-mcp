/**
 * constants.ts
 * Centralized constants and configuration values to eliminate magic numbers
 */
/**
 * File system and path constants
 */
export declare const FILE_SYSTEM: {
    /** Maximum directory traversal depth when searching for project root */
    readonly MAX_DIRECTORY_SEARCH_DEPTH: 10;
    /** Package.json filename for project root detection */
    readonly PACKAGE_JSON_FILENAME: "package.json";
    /** Swift binary filename */
    readonly SWIFT_BINARY_NAME: "EventKitCLI";
};
/**
 * Validation and security constants
 */
export declare const VALIDATION: {
    /** Maximum lengths for different text fields */
    readonly MAX_TITLE_LENGTH: 200;
    readonly MAX_NOTE_LENGTH: 20000;
    readonly MAX_LIST_NAME_LENGTH: 100;
    readonly MAX_SEARCH_LENGTH: 100;
    readonly MAX_URL_LENGTH: 500;
    readonly MAX_LOCATION_LENGTH: 200;
};
/**
 * Tool names for MCP server operations
 */
export declare const TOOLS: {
    /** Reminder tasks management tool */
    readonly REMINDERS_TASKS: "reminders_tasks";
    /** Reminder lists management tool */
    readonly REMINDERS_LISTS: "reminders_lists";
    /** Reminder subtasks management tool */
    readonly REMINDERS_SUBTASKS: "reminders_subtasks";
    /** Calendar events management tool */
    readonly CALENDAR_EVENTS: "calendar_events";
    /** Calendar collections management tool */
    readonly CALENDAR_CALENDARS: "calendar_calendars";
    /** Obsidian read note tool */
    readonly OBSIDIAN_READ: "obsidian_read";
    /** Obsidian search notes tool */
    readonly OBSIDIAN_SEARCH: "obsidian_search";
    /** Obsidian write note tool */
    readonly OBSIDIAN_WRITE: "obsidian_write";
    /** Obsidian daily note tool */
    readonly OBSIDIAN_DAILY: "obsidian_daily";
};
/**
 * Time and date constants for consistent time-based logic
 */
export declare const TIME: {
    /** Working hours boundaries */
    readonly WORKING_HOURS_START: 9;
    readonly WORKING_HOURS_END: 18;
    /** Time of day boundaries for categorization */
    readonly MORNING_START: 5;
    readonly NOON: 12;
    readonly AFTERNOON_END: 17;
    readonly EVENING_START: 17;
    readonly NIGHT_START: 21;
    /** Default time suggestions */
    readonly LATER_TODAY_HOURS: 4;
    readonly END_OF_WEEK_HOUR: 17;
    readonly DEFAULT_MORNING_HOUR: 9;
    /** Day of week constants (0 = Sunday, 6 = Saturday) */
    readonly SUNDAY: 0;
    readonly FRIDAY: 5;
    readonly SATURDAY: 6;
};
/**
 * Error message templates
 */
export declare const MESSAGES: {
    readonly ERROR: {
        readonly UNKNOWN_TOOL: (name: string) => string;
        readonly UNKNOWN_ACTION: (tool: string, action: string) => string;
    };
};
export declare const OBSIDIAN: {
    readonly VAULT_PATH: "/Users/nilslin/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault";
    readonly DAILY_FOLDER: "10_Journal";
    readonly SEARCH_CONTEXT_LINES: 3;
    readonly SEARCH_MAX_RESULTS: 20;
};
