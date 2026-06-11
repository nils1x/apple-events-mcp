/**
 * reminderRepository.ts
 * Repository pattern implementation for reminder data access operations using EventKitCLI.
 */
import { bumpReminders, cached, remindersEpoch } from './cache.js';
import { cliCall } from './cliExecutor.js';
import { applyReminderFilters } from './dateFiltering.js';
import { addOptionalArg, addOptionalBooleanArg, addOptionalJsonArg, addOptionalNumberArg, nullToUndefined, } from './helpers.js';
import { getSubtaskProgress, parseSubtasks } from './subtaskUtils.js';
import { extractTags } from './tagUtils.js';
const VALID_ALARM_TYPES = ['display', 'audio', 'procedure', 'email'];
const isValidAlarmType = (value) => VALID_ALARM_TYPES.includes(value);
const mapAlarmType = (alarmType) => {
    if (alarmType && isValidAlarmType(alarmType)) {
        return alarmType;
    }
    return undefined;
};
class ReminderRepository {
    mapReminder(reminder) {
        // Convert null values to undefined for optional fields
        // dueDate is passed through as-is from Swift CLI to avoid double timezone conversion
        const normalizedReminder = nullToUndefined(reminder, [
            'notes',
            'url',
            'dueDate',
            'startDate',
            'completionDate',
            'location',
            'timeZone',
            'creationDate',
            'lastModifiedDate',
            'externalId',
        ]);
        const mapRecurrenceRule = (rule) => ({
            frequency: rule.frequency,
            interval: rule.interval ?? 1,
            endDate: rule.endDate ?? undefined,
            occurrenceCount: rule.occurrenceCount ?? undefined,
            daysOfWeek: rule.daysOfWeek ?? undefined,
            daysOfMonth: rule.daysOfMonth ?? undefined,
            monthsOfYear: rule.monthsOfYear ?? undefined,
        });
        // Map recurrence rules from JSON (convert nulls to undefined, default interval to 1)
        if (reminder.recurrenceRules && reminder.recurrenceRules.length > 0) {
            normalizedReminder.recurrenceRules =
                reminder.recurrenceRules.map(mapRecurrenceRule);
        }
        // Map location trigger from JSON
        if (reminder.locationTrigger) {
            normalizedReminder.locationTrigger = {
                title: reminder.locationTrigger.title,
                latitude: reminder.locationTrigger.latitude,
                longitude: reminder.locationTrigger.longitude,
                radius: reminder.locationTrigger.radius,
                proximity: reminder.locationTrigger.proximity === 'leave' ? 'leave' : 'enter',
            };
        }
        // Map alarms from JSON
        if (reminder.alarms && reminder.alarms.length > 0) {
            normalizedReminder.alarms = reminder.alarms
                .filter((alarm) => alarm !== null)
                .map((alarm) => ({
                relativeOffset: alarm.relativeOffset ?? undefined,
                absoluteDate: alarm.absoluteDate ?? undefined,
                alarmType: mapAlarmType(alarm.alarmType),
                locationTrigger: alarm.locationTrigger
                    ? {
                        title: alarm.locationTrigger.title,
                        latitude: alarm.locationTrigger.latitude,
                        longitude: alarm.locationTrigger.longitude,
                        radius: alarm.locationTrigger.radius,
                        proximity: alarm.locationTrigger.proximity === 'leave'
                            ? 'leave'
                            : 'enter',
                    }
                    : undefined,
            }));
        }
        // Extract tags from notes
        const tags = extractTags(reminder.notes);
        if (tags.length > 0) {
            normalizedReminder.tags = tags;
        }
        // Extract subtasks from notes
        const subtasks = parseSubtasks(reminder.notes);
        if (subtasks.length > 0) {
            normalizedReminder.subtasks = subtasks;
            normalizedReminder.subtaskProgress = getSubtaskProgress(subtasks);
        }
        return normalizedReminder;
    }
    mapReminders(reminders) {
        return reminders.map((reminder) => this.mapReminder(reminder));
    }
    async findReminderById(id) {
        const reminderJSON = await cliCall([
            '--action',
            'read-by-id',
            '--id',
            id,
        ]);
        return this.mapReminder(reminderJSON);
    }
    async findReminders(filters = {}) {
        const args = ['--action', 'read', '--includeLists', 'false'];
        const cacheKey = `findReminders:${JSON.stringify(filters)}`;
        return cached(cacheKey, 5000, remindersEpoch(), async () => {
            addOptionalBooleanArg(args, '--showCompleted', filters.showCompleted ?? false);
            addOptionalArg(args, '--filterList', filters.list);
            addOptionalArg(args, '--search', filters.search);
            addOptionalArg(args, '--dueWithin', filters.dueWithin);
            const { reminders } = await cliCall(args);
            const normalizedReminders = this.mapReminders(reminders);
            return applyReminderFilters(normalizedReminders, {
                ...filters,
                showCompleted: undefined,
                list: undefined,
                search: undefined,
                dueWithin: undefined,
            });
        });
    }
    async findAllLists() {
        return cached('findAllLists', 60000, remindersEpoch(), async () => {
            const lists = await cliCall(['--action', 'read-lists']);
            return lists.map((list) => {
                const result = {
                    id: list.id,
                    title: list.title,
                };
                // Add color if present and not null
                if (list.color) {
                    result.color = list.color;
                }
                return result;
            });
        });
    }
    async createReminder(data) {
        bumpReminders();
        const args = ['--action', 'create', '--title', data.title];
        addOptionalArg(args, '--targetList', data.list);
        addOptionalArg(args, '--note', data.notes);
        addOptionalArg(args, '--url', data.url);
        addOptionalArg(args, '--location', data.location);
        addOptionalArg(args, '--startDate', data.startDate);
        addOptionalArg(args, '--dueDate', data.dueDate);
        addOptionalNumberArg(args, '--priority', data.priority);
        addOptionalBooleanArg(args, '--isCompleted', data.isCompleted);
        addOptionalJsonArg(args, '--alarms', data.alarms);
        addOptionalJsonArg(args, '--recurrenceRules', data.recurrenceRules);
        addOptionalJsonArg(args, '--locationTrigger', data.locationTrigger);
        return cliCall(args);
    }
    async updateReminder(data) {
        bumpReminders();
        const args = ['--action', 'update', '--id', data.id];
        addOptionalArg(args, '--title', data.newTitle);
        addOptionalArg(args, '--targetList', data.list);
        addOptionalArg(args, '--note', data.notes);
        addOptionalArg(args, '--url', data.url);
        addOptionalArg(args, '--location', data.location);
        addOptionalArg(args, '--startDate', data.startDate);
        addOptionalArg(args, '--dueDate', data.dueDate);
        addOptionalBooleanArg(args, '--isCompleted', data.isCompleted);
        addOptionalArg(args, '--completionDate', data.completionDate);
        addOptionalNumberArg(args, '--priority', data.priority);
        addOptionalJsonArg(args, '--alarms', data.alarms);
        addOptionalBooleanArg(args, '--clearAlarms', data.clearAlarms);
        addOptionalJsonArg(args, '--recurrenceRules', data.recurrenceRules);
        addOptionalBooleanArg(args, '--clearRecurrence', data.clearRecurrence);
        addOptionalJsonArg(args, '--locationTrigger', data.locationTrigger);
        addOptionalBooleanArg(args, '--clearLocationTrigger', data.clearLocationTrigger);
        return cliCall(args);
    }
    async deleteReminder(id) {
        bumpReminders();
        await cliCall(['--action', 'delete', '--id', id]);
    }
    async createReminderList(name, color) {
        bumpReminders();
        const args = ['--action', 'create-list', '--name', name];
        if (color) {
            args.push('--color', color);
        }
        const listJson = await cliCall(args);
        return {
            id: listJson.id,
            title: listJson.title,
            color: listJson.color ?? undefined,
        };
    }
    async updateReminderList(currentName, newName, color) {
        bumpReminders();
        const args = ['--action', 'update-list', '--name', currentName];
        if (newName) {
            args.push('--newName', newName);
        }
        if (color) {
            args.push('--color', color);
        }
        const listJson = await cliCall(args);
        return {
            id: listJson.id,
            title: listJson.title,
            color: listJson.color ?? undefined,
        };
    }
    async deleteReminderList(name) {
        bumpReminders();
        await cliCall(['--action', 'delete-list', '--name', name]);
    }
}
export const reminderRepository = new ReminderRepository();
// Export class for dependency injection and testing
export { ReminderRepository };
//# sourceMappingURL=reminderRepository.js.map