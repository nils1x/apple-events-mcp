/**
 * Standard confidence system constraints
 * Decision priority: (1) If scope is ambiguous → confirm, (2) Then apply confidence thresholds
 */
export declare const CONFIDENCE_CONSTRAINTS: string[];
/**
 * AskUserQuestion tool usage examples
 */
export declare const ASK_USER_QUESTION_EXAMPLES: string[];
/**
 * Standard note formatting constraints (compressed from 14 lines to 5 lines)
 */
export declare const NOTE_FORMATTING_CONSTRAINTS: string[];
/**
 * Standard batching and idempotency constraints
 */
export declare const BATCHING_CONSTRAINTS: string[];
export declare const TASK_BATCHING_CONSTRAINTS: string[];
/**
 * Standard calibration guidance for overwhelming workloads
 */
export declare const WORKLOAD_CALIBRATION: string[];
/**
 * Standard calibration for missing context
 */
export declare const CONTEXT_CALIBRATION: string[];
/**
 * Apple Reminders limitations reminder
 */
export declare const APPLE_REMINDERS_LIMITATIONS: string[];
/**
 * Core constraints applied to all prompts
 */
export declare const CORE_CONSTRAINTS: string[];
/**
 * Deep work time block execution details (trigger rules moved to TIME_BLOCK_CREATION_CONSTRAINTS)
 */
export declare const DEEP_WORK_CONSTRAINTS: string[];
/**
 * Shallow tasks time block creation guidelines
 * Encompasses all non-deep-work activities: quick wins, routine tasks, administrative work
 */
export declare const SHALLOW_TASKS_CONSTRAINTS: string[];
/**
 * Daily capacity and workload balancing constraints
 * Includes implicit 20% buffer time allocation
 */
export declare const DAILY_CAPACITY_CONSTRAINTS: string[];
/**
 * Time format specification (single source of truth)
 * Format includes explicit timezone offset to prevent ambiguity in containerized environments
 */
export declare const TIME_FORMAT_SPEC = "YYYY-MM-DD HH:mm:ss\u00B1HH:MM (with explicit timezone offset, e.g., \"2025-11-17 14:00:00-05:00\" for 2PM EST)";
/**
 * Time block creation strict rules (includes trigger conditions from former DEEP_WORK_CONSTRAINTS)
 */
export declare const TIME_BLOCK_CREATION_CONSTRAINTS: string[];
export declare const buildStandardOutputFormat: (currentDate: string) => {
    actionQueue: string[];
    verificationLog: string;
};
