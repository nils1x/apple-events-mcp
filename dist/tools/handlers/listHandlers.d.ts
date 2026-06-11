/**
 * handlers/listHandlers.ts
 * Handlers for reminder list operations
 */
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { ListsToolArgs } from '../../types/index.js';
export declare const handleReadReminderLists: () => Promise<CallToolResult>;
export declare const handleCreateReminderList: (args: ListsToolArgs) => Promise<CallToolResult>;
export declare const handleUpdateReminderList: (args: ListsToolArgs) => Promise<CallToolResult>;
export declare const handleDeleteReminderList: (args: ListsToolArgs) => Promise<CallToolResult>;
