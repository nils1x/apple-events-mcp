/**
 * handlers/subtaskHandlers.ts
 * Handlers for subtask operations within reminders
 */
import { handleAsyncOperation } from '../../utils/errorHandling.js';
import { reminderRepository } from '../../utils/reminderRepository.js';
import { addSubtask, getSubtaskProgress, parseSubtasks, removeSubtask, reorderSubtasks, toggleSubtask, updateSubtask, } from '../../utils/subtaskUtils.js';
import { CreateSubtaskSchema, DeleteSubtaskSchema, ReadSubtasksSchema, ReorderSubtasksSchema, ToggleSubtaskSchema, UpdateSubtaskSchema, } from '../../validation/schemas.js';
import { extractAndValidateArgs, formatDeleteMessage, formatSuccessMessage, UNTRUSTED_DATA_NOTICE, } from './shared.js';
/**
 * Formats a single subtask for display
 */
const formatSubtaskMarkdown = (subtask, index) => {
    const checkbox = subtask.isCompleted ? '[x]' : '[ ]';
    return `${index + 1}. ${checkbox} ${subtask.title} (ID: ${subtask.id})`;
};
/**
 * Formats subtasks list with progress
 */
const formatSubtasksListMarkdown = (reminderTitle, subtasks) => {
    const lines = [];
    const progress = getSubtaskProgress(subtasks);
    lines.push(`### Subtasks for "${reminderTitle}"`);
    lines.push('');
    lines.push(`**Progress:** ${progress.completed}/${progress.total} (${progress.percentage}%)`);
    lines.push('');
    if (subtasks.length === 0) {
        lines.push('No subtasks found.');
    }
    else {
        // Subtask titles come from the same untrusted notes field as reminder/
        // calendar item text, so they need the same prompt-injection notice the
        // shared list formatter emits.
        lines.push(UNTRUSTED_DATA_NOTICE, '');
        subtasks.forEach((subtask, index) => {
            lines.push(formatSubtaskMarkdown(subtask, index));
        });
    }
    return lines.join('\n');
};
export const handleReadSubtasks = async (args) => {
    return handleAsyncOperation(async () => {
        const validatedArgs = extractAndValidateArgs(args, ReadSubtasksSchema);
        const reminder = await reminderRepository.findReminderById(validatedArgs.reminderId);
        const subtasks = parseSubtasks(reminder.notes);
        return formatSubtasksListMarkdown(reminder.title, subtasks);
    }, 'read subtasks');
};
export const handleCreateSubtask = async (args) => {
    return handleAsyncOperation(async () => {
        const validatedArgs = extractAndValidateArgs(args, CreateSubtaskSchema);
        const reminder = await reminderRepository.findReminderById(validatedArgs.reminderId);
        const { notes: updatedNotes, subtask } = addSubtask(validatedArgs.title, reminder.notes);
        await reminderRepository.updateReminder({
            id: validatedArgs.reminderId,
            notes: updatedNotes,
        });
        return formatSuccessMessage('created', 'subtask', subtask.title, subtask.id);
    }, 'create subtask');
};
export const handleUpdateSubtask = async (args) => {
    return handleAsyncOperation(async () => {
        const validatedArgs = extractAndValidateArgs(args, UpdateSubtaskSchema);
        const reminder = await reminderRepository.findReminderById(validatedArgs.reminderId);
        const updatedNotes = updateSubtask(validatedArgs.subtaskId, {
            title: validatedArgs.title,
            isCompleted: validatedArgs.completed,
        }, reminder.notes);
        await reminderRepository.updateReminder({
            id: validatedArgs.reminderId,
            notes: updatedNotes,
        });
        return formatSuccessMessage('updated', 'subtask', validatedArgs.title ?? 'subtask', validatedArgs.subtaskId);
    }, 'update subtask');
};
export const handleDeleteSubtask = async (args) => {
    return handleAsyncOperation(async () => {
        const validatedArgs = extractAndValidateArgs(args, DeleteSubtaskSchema);
        const reminder = await reminderRepository.findReminderById(validatedArgs.reminderId);
        const updatedNotes = removeSubtask(validatedArgs.subtaskId, reminder.notes);
        await reminderRepository.updateReminder({
            id: validatedArgs.reminderId,
            notes: updatedNotes,
        });
        return formatDeleteMessage('subtask', validatedArgs.subtaskId);
    }, 'delete subtask');
};
export const handleToggleSubtask = async (args) => {
    return handleAsyncOperation(async () => {
        const validatedArgs = extractAndValidateArgs(args, ToggleSubtaskSchema);
        const reminder = await reminderRepository.findReminderById(validatedArgs.reminderId);
        const { notes: updatedNotes, subtask } = toggleSubtask(validatedArgs.subtaskId, reminder.notes);
        await reminderRepository.updateReminder({
            id: validatedArgs.reminderId,
            notes: updatedNotes,
        });
        const status = subtask.isCompleted ? 'completed' : 'uncompleted';
        return `Successfully marked subtask "${subtask.title}" as ${status}.\n- ID: ${validatedArgs.subtaskId}`;
    }, 'toggle subtask');
};
export const handleReorderSubtasks = async (args) => {
    return handleAsyncOperation(async () => {
        const validatedArgs = extractAndValidateArgs(args, ReorderSubtasksSchema);
        const reminder = await reminderRepository.findReminderById(validatedArgs.reminderId);
        const updatedNotes = reorderSubtasks(validatedArgs.order, reminder.notes);
        await reminderRepository.updateReminder({
            id: validatedArgs.reminderId,
            notes: updatedNotes,
        });
        return `Successfully reordered ${validatedArgs.order.length} subtasks.\n- Reminder ID: ${validatedArgs.reminderId}`;
    }, 'reorder subtasks');
};
//# sourceMappingURL=subtaskHandlers.js.map