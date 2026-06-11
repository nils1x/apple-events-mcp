/**
 * subtaskUtils.ts
 * Utilities for handling subtasks stored in reminder notes
 *
 * Subtasks are stored in the notes field with a human-readable format:
 * ---SUBTASKS---
 * [ ] {id} Task title
 * [x] {id} Completed task title
 * ---END SUBTASKS---
 *
 * This format:
 * - Is human-readable in the native Reminders app
 * - Allows programmatic parsing and manipulation
 * - Coexists with tags ([#tag] format) and user notes
 */
import type { Subtask, SubtaskProgress } from '../types/index.js';
/**
 * Generates a short unique ID (8 hex characters)
 */
export declare function generateSubtaskId(): string;
/**
 * Parses subtasks from notes content
 * @param notes - The notes string that may contain subtasks
 * @returns Array of subtasks in order
 */
export declare function parseSubtasks(notes: string | null | undefined): Subtask[];
/**
 * Serializes subtasks into the notes format
 * @param subtasks - Array of subtasks to serialize
 * @returns Formatted subtask section string (empty string if no subtasks)
 */
export declare function serializeSubtasks(subtasks: Subtask[]): string;
/**
 * Removes the subtask section from notes, returning clean content
 * @param notes - The notes string with potential subtasks
 * @returns Notes content without subtask section
 */
export declare function stripSubtasks(notes: string | null | undefined): string;
/**
 * Combines subtasks with notes content
 * Tags are preserved and subtasks are appended at the end
 * @param subtasks - Array of subtasks
 * @param notes - Existing notes content (may have tags and/or existing subtasks)
 * @returns Combined notes with subtasks appended
 */
export declare function combineSubtasksAndNotes(subtasks: Subtask[], notes: string | undefined): string;
/**
 * Adds a subtask to existing notes
 * @param title - Title of the new subtask
 * @param notes - Existing notes content
 * @returns Updated notes with new subtask added
 */
export declare function addSubtask(title: string, notes: string | undefined): {
    notes: string;
    subtask: Subtask;
};
/**
 * Updates a subtask in existing notes
 * @param subtaskId - ID of the subtask to update
 * @param updates - Partial subtask updates
 * @param notes - Existing notes content
 * @returns Updated notes with subtask modified
 */
export declare function updateSubtask(subtaskId: string, updates: {
    title?: string;
    isCompleted?: boolean;
}, notes: string | undefined): string;
/**
 * Removes a subtask from existing notes
 * @param subtaskId - ID of the subtask to remove
 * @param notes - Existing notes content
 * @returns Updated notes with subtask removed
 */
export declare function removeSubtask(subtaskId: string, notes: string | undefined): string;
/**
 * Toggles a subtask's completion status
 * @param subtaskId - ID of the subtask to toggle
 * @param notes - Existing notes content
 * @returns Updated notes with subtask toggled
 */
export declare function toggleSubtask(subtaskId: string, notes: string | undefined): {
    notes: string;
    subtask: Subtask;
};
/**
 * Reorders subtasks based on provided ID order
 * @param order - Array of subtask IDs in desired order
 * @param notes - Existing notes content
 * @returns Updated notes with subtasks reordered
 */
export declare function reorderSubtasks(order: string[], notes: string | undefined): string;
/**
 * Creates subtasks from an array of titles
 * @param titles - Array of subtask titles
 * @returns Array of new subtasks
 */
export declare function createSubtasksFromTitles(titles: string[]): Subtask[];
/**
 * Calculates subtask completion progress
 * @param subtasks - Array of subtasks
 * @returns Progress object with completed count, total, and percentage
 */
export declare function getSubtaskProgress(subtasks: Subtask[]): SubtaskProgress;
