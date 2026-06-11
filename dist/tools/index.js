/**
 * tools/index.ts
 * Tool routing: normalizes names, dispatches to handlers
 */
import { MESSAGES, TOOLS as TOOL_NAMES } from '../utils/constants.js';
import { TOOLS } from './definitions.js';
import { handleCreateCalendarEvent, handleCreateReminder, handleCreateReminderList, handleCreateSubtask, handleDeleteCalendarEvent, handleDeleteReminder, handleDeleteReminderList, handleDeleteSubtask, handleObsidianDaily, handleObsidianRead, handleObsidianSearch, handleObsidianWrite, handleReadCalendarEvents, handleReadCalendars, handleReadReminderLists, handleReadReminders, handleReadSubtasks, handleReorderSubtasks, handleToggleSubtask, handleUpdateCalendarEvent, handleUpdateReminder, handleUpdateReminderList, handleUpdateSubtask, } from './handlers/index.js';
/**
 * Creates an action router for tools with multiple actions
 */
const createActionRouter = (toolName, handlerMap) => {
    return async (args) => {
        if (!args) {
            return createErrorResponse('No arguments provided');
        }
        const typedArgs = args;
        const action = typedArgs.action;
        if (!(action in handlerMap)) {
            return createErrorResponse(MESSAGES.ERROR.UNKNOWN_ACTION(toolName, String(action)));
        }
        const handler = handlerMap[action];
        return handler(typedArgs);
    };
};
const TOOL_ROUTER_MAP = {
    [TOOL_NAMES.REMINDERS_TASKS]: createActionRouter(TOOL_NAMES.REMINDERS_TASKS, {
        read: (reminderArgs) => handleReadReminders(reminderArgs),
        create: (reminderArgs) => handleCreateReminder(reminderArgs),
        update: (reminderArgs) => handleUpdateReminder(reminderArgs),
        delete: (reminderArgs) => handleDeleteReminder(reminderArgs),
    }),
    [TOOL_NAMES.REMINDERS_LISTS]: createActionRouter(TOOL_NAMES.REMINDERS_LISTS, {
        read: () => handleReadReminderLists(),
        create: (listArgs) => handleCreateReminderList(listArgs),
        update: (listArgs) => handleUpdateReminderList(listArgs),
        delete: (listArgs) => handleDeleteReminderList(listArgs),
    }),
    [TOOL_NAMES.REMINDERS_SUBTASKS]: createActionRouter(TOOL_NAMES.REMINDERS_SUBTASKS, {
        read: (subtaskArgs) => handleReadSubtasks(subtaskArgs),
        create: (subtaskArgs) => handleCreateSubtask(subtaskArgs),
        update: (subtaskArgs) => handleUpdateSubtask(subtaskArgs),
        delete: (subtaskArgs) => handleDeleteSubtask(subtaskArgs),
        toggle: (subtaskArgs) => handleToggleSubtask(subtaskArgs),
        reorder: (subtaskArgs) => handleReorderSubtasks(subtaskArgs),
    }),
    [TOOL_NAMES.CALENDAR_EVENTS]: createActionRouter(TOOL_NAMES.CALENDAR_EVENTS, {
        read: (calendarArgs) => handleReadCalendarEvents(calendarArgs),
        create: (calendarArgs) => handleCreateCalendarEvent(calendarArgs),
        update: (calendarArgs) => handleUpdateCalendarEvent(calendarArgs),
        delete: (calendarArgs) => handleDeleteCalendarEvent(calendarArgs),
    }),
    [TOOL_NAMES.CALENDAR_CALENDARS]: async (args) => {
        return handleReadCalendars(args);
    },
    [TOOL_NAMES.OBSIDIAN_READ]: async (args) => handleObsidianRead(args),
    [TOOL_NAMES.OBSIDIAN_SEARCH]: async (args) => handleObsidianSearch(args),
    [TOOL_NAMES.OBSIDIAN_WRITE]: async (args) => handleObsidianWrite(args),
    [TOOL_NAMES.OBSIDIAN_DAILY]: async (args) => handleObsidianDaily(args),
};
const isManagedToolName = (value) => value in TOOL_ROUTER_MAP;
/**
 * Creates an error response with the given message
 */
function createErrorResponse(message) {
    return {
        content: [{ type: 'text', text: message }],
        isError: true,
    };
}
export async function handleToolCall(name, args) {
    if (!isManagedToolName(name)) {
        return createErrorResponse(MESSAGES.ERROR.UNKNOWN_TOOL(name));
    }
    const router = TOOL_ROUTER_MAP[name];
    return router(args);
}
export { TOOLS };
//# sourceMappingURL=index.js.map