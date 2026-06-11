/**
 * handlers/calendarHandlers.ts
 * Handlers for calendar event operations
 */
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { CalendarsToolArgs, CalendarToolArgs } from '../../types/index.js';
export declare const handleCreateCalendarEvent: (args: CalendarToolArgs) => Promise<CallToolResult>;
export declare const handleUpdateCalendarEvent: (args: CalendarToolArgs) => Promise<CallToolResult>;
export declare const handleDeleteCalendarEvent: (args: CalendarToolArgs) => Promise<CallToolResult>;
export declare const handleReadCalendarEvents: (args: CalendarToolArgs) => Promise<CallToolResult>;
export declare const handleReadCalendars: (args?: CalendarsToolArgs) => Promise<CallToolResult>;
