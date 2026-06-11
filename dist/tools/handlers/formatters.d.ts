/**
 * handlers/formatters.ts
 * Shared display formatters for reminder/event sub-structures (alarms,
 * recurrence rules, location triggers). Calendar events and reminders both
 * persist these as the same EventKit primitives, so rendering them through
 * a single set of helpers keeps the two tool outputs consistent.
 */
import type { Alarm, LocationTrigger, RecurrenceRule } from '../../types/index.js';
/**
 * Formats a single recurrence rule into a short human-readable phrase
 * (e.g. "every 2 weeks on Mon, Wed").
 */
export declare const formatRecurrence: (recurrence: RecurrenceRule) => string;
export declare const formatRecurrenceRules: (rules: RecurrenceRule[]) => string;
/**
 * Formats a location trigger as a short human-readable phrase
 * (e.g. `Arriving at "Home" (100m radius)`).
 */
export declare const formatLocationTrigger: (location: LocationTrigger) => string;
/**
 * Formats a single alarm — relative offset, absolute date, or location
 * trigger — into a single line.
 */
export declare const formatAlarm: (alarm: Alarm) => string;
