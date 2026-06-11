/**
 * calendarRepository.ts
 * Repository pattern implementation for calendar event data access operations using EventKitCLI.
 */
import type { Calendar, CalendarEvent } from '../types/index.js';
import type { CreateEventData, EventJSON, ICalendarRepository, UpdateEventData } from '../types/repository.js';
declare class CalendarRepository implements ICalendarRepository {
    private readEvents;
    /**
     * Find a calendar event by its identifier.
     *
     * Performance note: the Swift CLI does not currently expose an
     * `event-by-id` action, so this method asks for a wide ±4-year window of
     * events and linear-scans the result. For users with very many events the
     * Swift→JSON→JS transfer can be sizable. The proper fix is a dedicated
     * Swift `read-event-by-id` action mirroring the reminder side; this method
     * should switch to that as soon as it lands.
     *
     * The previous implementation used the default 14-day window, which
     * silently hid any event outside that range from id-based lookups — the
     * widened window prioritises correctness over scan cost.
     */
    findEventById(id: string): Promise<CalendarEvent>;
    findEvents(filters?: {
        startDate?: string;
        endDate?: string;
        calendarName?: string;
        search?: string;
        availability?: string;
        accountName?: string;
    }): Promise<CalendarEvent[]>;
    findAllCalendars(): Promise<Calendar[]>;
    findCalendars(filters: {
        startDate?: string;
        endDate?: string;
        accountName?: string;
    }): Promise<Calendar[]>;
    createEvent(data: CreateEventData): Promise<EventJSON>;
    updateEvent(data: UpdateEventData): Promise<EventJSON>;
    deleteEvent(id: string, span?: string): Promise<void>;
}
export declare const calendarRepository: CalendarRepository;
export { CalendarRepository };
