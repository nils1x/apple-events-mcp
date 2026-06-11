/**
 * types/index.ts
 * Type definitions for the Apple Reminders MCP server
 */
/**
 * Priority label mapping for display
 */
export declare const PRIORITY_LABELS: Record<number, string>;
/**
 * Recurrence frequency types
 */
export type RecurrenceFrequency = 'minutely' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
/**
 * Recurrence rule interface for repeating reminders
 */
export interface RecurrenceRule {
    frequency: RecurrenceFrequency;
    interval: number;
    endDate?: string;
    occurrenceCount?: number;
    daysOfWeek?: number[];
    daysOfMonth?: number[];
    monthsOfYear?: number[];
}
/**
 * Location trigger proximity types
 */
export type LocationProximity = 'enter' | 'leave';
/**
 * Location trigger interface for geofence-based reminders
 */
export interface LocationTrigger {
    title: string;
    latitude: number;
    longitude: number;
    radius?: number;
    proximity: LocationProximity;
}
/**
 * Structured location interface (EventKit EKStructuredLocation)
 */
export interface StructuredLocation {
    title: string;
    latitude?: number;
    longitude?: number;
    radius?: number;
}
/**
 * Alarm interface (EventKit EKAlarm)
 * - Relative alarms use seconds offset from start/due dates (negative = before).
 * - Absolute alarms fire at a specific date/time.
 * - Location alarms use a structured location + proximity (geofence).
 * - alarmType is READ-ONLY: determined automatically by EventKit based on alarm properties.
 */
export interface Alarm {
    relativeOffset?: number;
    absoluteDate?: string;
    locationTrigger?: LocationTrigger;
    alarmType?: 'display' | 'audio' | 'procedure' | 'email';
}
/**
 * Subtask interface for checklist items within reminders
 */
export interface Subtask {
    id: string;
    title: string;
    isCompleted: boolean;
}
/**
 * Subtask progress info
 */
export interface SubtaskProgress {
    completed: number;
    total: number;
    percentage: number;
}
/**
 * Reminder item interface
 */
export interface Reminder {
    id: string;
    title: string;
    startDate?: string;
    dueDate?: string;
    completionDate?: string;
    notes?: string;
    url?: string;
    location?: string;
    timeZone?: string;
    creationDate?: string;
    lastModifiedDate?: string;
    externalId?: string;
    list: string;
    isCompleted: boolean;
    priority: number;
    alarms?: Alarm[];
    recurrenceRules?: RecurrenceRule[];
    locationTrigger?: LocationTrigger;
    tags?: string[];
    subtasks?: Subtask[];
    subtaskProgress?: SubtaskProgress;
}
/**
 * Reminder list interface
 */
export interface ReminderList {
    id: string;
    title: string;
    color?: string;
}
/**
 * Calendar event interface
 */
export interface CalendarEvent {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    calendar: string;
    calendarId: string;
    notes?: string;
    location?: string;
    structuredLocation?: StructuredLocation;
    url?: string;
    isAllDay: boolean;
    availability?: 'not-supported' | 'busy' | 'free' | 'tentative' | 'unavailable' | 'unknown';
    alarms?: Alarm[];
    recurrenceRules?: RecurrenceRule[];
    organizer?: {
        name?: string;
        url: string;
    };
    attendees?: Array<{
        name?: string;
        url: string;
        status: string;
        role: string;
        type: string;
        isCurrentUser: boolean;
    }>;
    status?: string;
    isDetached?: boolean;
    occurrenceDate?: string;
    creationDate?: string;
    lastModifiedDate?: string;
    externalId?: string;
}
/**
 * Calendar interface
 */
export interface Calendar {
    id: string;
    title: string;
    account: string;
    accountType: string;
    eventCount?: number;
}
/**
 * Server configuration
 */
export interface ServerConfig {
    name: string;
    version: string;
}
/**
 * Shared type constants for better type safety and consistency
 */
export type ReminderAction = 'read' | 'create' | 'update' | 'delete';
export type ListAction = 'read' | 'create' | 'update' | 'delete';
export type CalendarAction = 'read' | 'create' | 'update' | 'delete';
export type CalendarsAction = 'read';
export type DueWithinOption = 'today' | 'tomorrow' | 'this-week' | 'overdue' | 'no-date';
/**
 * Action constant arrays for enum validation
 */
export declare const REMINDER_ACTIONS: readonly ReminderAction[];
export declare const LIST_ACTIONS: readonly ListAction[];
export declare const CALENDAR_ACTIONS: readonly CalendarAction[];
export declare const DUE_WITHIN_OPTIONS: readonly DueWithinOption[];
/**
 * Base tool arguments interface
 */
interface BaseToolArgs {
    action: string;
}
/**
 * Tool argument types - keeping flexible for handler routing while maintaining type safety
 */
export interface RemindersToolArgs extends BaseToolArgs {
    action: ReminderAction;
    id?: string;
    filterList?: string;
    showCompleted?: boolean;
    search?: string;
    dueWithin?: DueWithinOption;
    filterPriority?: 'high' | 'medium' | 'low' | 'none';
    filterRecurring?: boolean;
    filterLocationBased?: boolean;
    filterTags?: string[];
    title?: string;
    newTitle?: string;
    startDate?: string;
    dueDate?: string;
    note?: string;
    url?: string;
    location?: string;
    completed?: boolean;
    completionDate?: string;
    priority?: number;
    alarms?: Alarm[];
    clearAlarms?: boolean;
    recurrenceRules?: RecurrenceRule[];
    clearRecurrence?: boolean;
    locationTrigger?: LocationTrigger;
    clearLocationTrigger?: boolean;
    tags?: string[];
    addTags?: string[];
    removeTags?: string[];
    subtasks?: string[];
    targetList?: string;
}
/**
 * Subtask action type
 */
export type SubtaskAction = 'read' | 'create' | 'update' | 'delete' | 'toggle' | 'reorder';
/**
 * Tool arguments for subtask operations
 */
export interface SubtasksToolArgs extends BaseToolArgs {
    action: SubtaskAction;
    reminderId: string;
    subtaskId?: string;
    title?: string;
    completed?: boolean;
    order?: string[];
}
export interface ListsToolArgs extends BaseToolArgs {
    action: ListAction;
    name?: string;
    newName?: string;
    color?: string;
}
export interface CalendarToolArgs extends BaseToolArgs {
    action: CalendarAction;
    id?: string;
    filterCalendar?: string;
    filterAccount?: string;
    search?: string;
    availability?: 'not-supported' | 'busy' | 'free' | 'tentative' | 'unavailable';
    startDate?: string;
    endDate?: string;
    title?: string;
    note?: string;
    location?: string;
    structuredLocation?: StructuredLocation;
    url?: string;
    isAllDay?: boolean;
    alarms?: Alarm[];
    clearAlarms?: boolean;
    recurrenceRules?: RecurrenceRule[];
    clearRecurrence?: boolean;
    span?: 'this-event' | 'future-events';
    targetCalendar?: string;
}
export interface CalendarsToolArgs extends BaseToolArgs {
    action: CalendarsAction;
    startDate?: string;
    endDate?: string;
    filterAccount?: string;
}
/**
 * Prompt-related type exports for consumers that need to interact with the
 * structured MCP prompt registry.
 */
export type { DailyTaskOrganizerArgs, PromptArgsByName, PromptArgumentDefinition, PromptMessage, PromptMessageContent, PromptMetadata, PromptName, PromptResponse, PromptTemplate, ReminderReviewAssistantArgs, SmartReminderCreatorArgs, WeeklyPlanningWorkflowArgs, } from './prompts.js';
