/**
 * handlers/subtaskHandlers.ts
 * Handlers for subtask operations within reminders
 */
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { SubtasksToolArgs } from '../../types/index.js';
export declare const handleReadSubtasks: (args: SubtasksToolArgs) => Promise<CallToolResult>;
export declare const handleCreateSubtask: (args: SubtasksToolArgs) => Promise<CallToolResult>;
export declare const handleUpdateSubtask: (args: SubtasksToolArgs) => Promise<CallToolResult>;
export declare const handleDeleteSubtask: (args: SubtasksToolArgs) => Promise<CallToolResult>;
export declare const handleToggleSubtask: (args: SubtasksToolArgs) => Promise<CallToolResult>;
export declare const handleReorderSubtasks: (args: SubtasksToolArgs) => Promise<CallToolResult>;
