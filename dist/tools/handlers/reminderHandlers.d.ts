/**
 * handlers/reminderHandlers.ts
 * Handlers for reminder task operations
 */
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { type RemindersToolArgs } from '../../types/index.js';
export declare const handleCreateReminder: (args: RemindersToolArgs) => Promise<CallToolResult>;
export declare const handleUpdateReminder: (args: RemindersToolArgs) => Promise<CallToolResult>;
export declare const handleDeleteReminder: (args: RemindersToolArgs) => Promise<CallToolResult>;
export declare const handleReadReminders: (args: RemindersToolArgs) => Promise<CallToolResult>;
