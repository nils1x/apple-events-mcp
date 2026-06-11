/**
 * tools/index.ts
 * Tool routing: normalizes names, dispatches to handlers
 */
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { CalendarsToolArgs, CalendarToolArgs, ListsToolArgs, RemindersToolArgs, SubtasksToolArgs } from '../types/index.js';
import { TOOLS } from './definitions.js';
type ToolArgs = RemindersToolArgs | ListsToolArgs | SubtasksToolArgs | CalendarToolArgs | CalendarsToolArgs;
export declare function handleToolCall(name: string, args?: ToolArgs): Promise<CallToolResult>;
export { TOOLS };
