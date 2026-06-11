/**
 * dateFiltering.ts
 * Reusable utilities for filtering reminders by date criteria
 */
import type { Reminder } from '../types/index.js';
/**
 * Date range filters for reminders
 */
export type DateFilter = 'today' | 'tomorrow' | 'this-week' | 'overdue' | 'no-date';
/**
 * Priority filter values (string names that map to EventKit integers)
 */
export type PriorityFilter = 'high' | 'medium' | 'low' | 'none';
/**
 * Filters for reminder search operations
 */
export interface ReminderFilters {
    showCompleted?: boolean;
    search?: string;
    dueWithin?: DateFilter;
    list?: string;
    priority?: PriorityFilter;
    recurring?: boolean;
    locationBased?: boolean;
    tags?: string[];
}
/**
 * Applies multiple filters to a list of reminders
 */
export declare function applyReminderFilters(reminders: Reminder[], filters: ReminderFilters): Reminder[];
