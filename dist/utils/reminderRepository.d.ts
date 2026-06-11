/**
 * reminderRepository.ts
 * Repository pattern implementation for reminder data access operations using EventKitCLI.
 */
import type { Reminder, ReminderList } from '../types/index.js';
import type { CreateReminderData, IReminderRepository, ReminderJSON, UpdateReminderData } from '../types/repository.js';
import type { ReminderFilters } from './dateFiltering.js';
declare class ReminderRepository implements IReminderRepository {
    private mapReminder;
    private mapReminders;
    findReminderById(id: string): Promise<Reminder>;
    findReminders(filters?: ReminderFilters): Promise<Reminder[]>;
    findAllLists(): Promise<ReminderList[]>;
    createReminder(data: CreateReminderData): Promise<ReminderJSON>;
    updateReminder(data: UpdateReminderData): Promise<ReminderJSON>;
    deleteReminder(id: string): Promise<void>;
    createReminderList(name: string, color?: string): Promise<ReminderList>;
    updateReminderList(currentName: string, newName?: string, color?: string): Promise<ReminderList>;
    deleteReminderList(name: string): Promise<void>;
}
export declare const reminderRepository: ReminderRepository;
export { ReminderRepository };
