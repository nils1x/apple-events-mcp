import { z } from 'zod/v3';
/**
 * Base validation schemas using factory functions
 */
export declare const SafeTextSchema: z.ZodString;
export declare const SafeNoteSchema: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
export declare const SafeListNameSchema: z.ZodOptional<z.ZodString>;
export declare const RequiredListNameSchema: z.ZodString;
export declare const SafeSearchSchema: z.ZodOptional<z.ZodString>;
export declare const SafeDateSchema: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
export declare const SafeUrlSchema: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
export declare const SafeIdSchema: z.ZodString;
/**
 * Tool-specific validation schemas
 */
export declare const CreateReminderSchema: z.ZodObject<{
    title: z.ZodString;
    startDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    dueDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    url: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    location: z.ZodOptional<z.ZodString>;
    targetList: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEffects<z.ZodNumber, number, number>>;
    completed: z.ZodOptional<z.ZodBoolean>;
    alarms: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        relativeOffset: z.ZodOptional<z.ZodNumber>;
        absoluteDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        locationTrigger: z.ZodOptional<z.ZodObject<{
            title: z.ZodString;
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
            radius: z.ZodDefault<z.ZodNumber>;
            proximity: z.ZodEnum<["enter", "leave"]>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        }, {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        }>>;
        alarmType: z.ZodOptional<z.ZodEnum<["display", "audio", "procedure", "email"]>>;
    }, "strip", z.ZodTypeAny, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }>, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }>, "many">>;
    clearAlarms: z.ZodOptional<z.ZodBoolean>;
    recurrenceRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        frequency: z.ZodEnum<["minutely", "hourly", "daily", "weekly", "monthly", "yearly"]>;
        interval: z.ZodDefault<z.ZodNumber>;
        endDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        occurrenceCount: z.ZodOptional<z.ZodNumber>;
        daysOfWeek: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
        daysOfMonth: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
        monthsOfYear: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
    }, "strip", z.ZodTypeAny, {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }, {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        endDate?: string | undefined;
        interval?: number | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }>, "many">>;
    recurrence: z.ZodOptional<z.ZodObject<{
        frequency: z.ZodEnum<["minutely", "hourly", "daily", "weekly", "monthly", "yearly"]>;
        interval: z.ZodDefault<z.ZodNumber>;
        endDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        occurrenceCount: z.ZodOptional<z.ZodNumber>;
        daysOfWeek: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
        daysOfMonth: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
        monthsOfYear: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
    }, "strip", z.ZodTypeAny, {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }, {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        endDate?: string | undefined;
        interval?: number | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }>>;
    locationTrigger: z.ZodOptional<z.ZodObject<{
        title: z.ZodString;
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
        radius: z.ZodDefault<z.ZodNumber>;
        proximity: z.ZodEnum<["enter", "leave"]>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        latitude: number;
        longitude: number;
        proximity: "enter" | "leave";
        radius: number;
    }, {
        title: string;
        latitude: number;
        longitude: number;
        proximity: "enter" | "leave";
        radius?: number | undefined;
    }>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    subtasks: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    title: string;
    url?: string | undefined;
    startDate?: string | undefined;
    dueDate?: string | undefined;
    note?: string | undefined;
    location?: string | undefined;
    completed?: boolean | undefined;
    priority?: number | undefined;
    alarms?: {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }[] | undefined;
    clearAlarms?: boolean | undefined;
    targetList?: string | undefined;
    recurrence?: {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    } | undefined;
    recurrenceRules?: {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }[] | undefined;
    locationTrigger?: {
        title: string;
        latitude: number;
        longitude: number;
        proximity: "enter" | "leave";
        radius: number;
    } | undefined;
    tags?: string[] | undefined;
    subtasks?: string[] | undefined;
}, {
    title: string;
    url?: string | undefined;
    startDate?: string | undefined;
    dueDate?: string | undefined;
    note?: string | undefined;
    location?: string | undefined;
    completed?: boolean | undefined;
    priority?: number | undefined;
    alarms?: {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }[] | undefined;
    clearAlarms?: boolean | undefined;
    targetList?: string | undefined;
    recurrence?: {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        endDate?: string | undefined;
        interval?: number | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    } | undefined;
    recurrenceRules?: {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        endDate?: string | undefined;
        interval?: number | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }[] | undefined;
    locationTrigger?: {
        title: string;
        latitude: number;
        longitude: number;
        proximity: "enter" | "leave";
        radius?: number | undefined;
    } | undefined;
    tags?: string[] | undefined;
    subtasks?: string[] | undefined;
}>;
export declare const ReadRemindersSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    filterList: z.ZodOptional<z.ZodString>;
    showCompleted: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    search: z.ZodOptional<z.ZodString>;
    dueWithin: z.ZodOptional<z.ZodEnum<["today", "tomorrow", "this-week", "overdue", "no-date"]>>;
    filterPriority: z.ZodOptional<z.ZodEnum<["high", "medium", "low", "none"]>>;
    filterRecurring: z.ZodOptional<z.ZodBoolean>;
    filterLocationBased: z.ZodOptional<z.ZodBoolean>;
    filterTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    showCompleted: boolean;
    id?: string | undefined;
    filterList?: string | undefined;
    search?: string | undefined;
    dueWithin?: "today" | "tomorrow" | "this-week" | "overdue" | "no-date" | undefined;
    filterPriority?: "none" | "high" | "medium" | "low" | undefined;
    filterRecurring?: boolean | undefined;
    filterLocationBased?: boolean | undefined;
    filterTags?: string[] | undefined;
}, {
    id?: string | undefined;
    filterList?: string | undefined;
    showCompleted?: boolean | undefined;
    search?: string | undefined;
    dueWithin?: "today" | "tomorrow" | "this-week" | "overdue" | "no-date" | undefined;
    filterPriority?: "none" | "high" | "medium" | "low" | undefined;
    filterRecurring?: boolean | undefined;
    filterLocationBased?: boolean | undefined;
    filterTags?: string[] | undefined;
}>;
export declare const UpdateReminderSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    dueDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    url: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    location: z.ZodOptional<z.ZodString>;
    completed: z.ZodOptional<z.ZodBoolean>;
    completionDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    targetList: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEffects<z.ZodNumber, number, number>>;
    alarms: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        relativeOffset: z.ZodOptional<z.ZodNumber>;
        absoluteDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        locationTrigger: z.ZodOptional<z.ZodObject<{
            title: z.ZodString;
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
            radius: z.ZodDefault<z.ZodNumber>;
            proximity: z.ZodEnum<["enter", "leave"]>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        }, {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        }>>;
        alarmType: z.ZodOptional<z.ZodEnum<["display", "audio", "procedure", "email"]>>;
    }, "strip", z.ZodTypeAny, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }>, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }>, "many">>;
    clearAlarms: z.ZodOptional<z.ZodBoolean>;
    recurrenceRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        frequency: z.ZodEnum<["minutely", "hourly", "daily", "weekly", "monthly", "yearly"]>;
        interval: z.ZodDefault<z.ZodNumber>;
        endDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        occurrenceCount: z.ZodOptional<z.ZodNumber>;
        daysOfWeek: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
        daysOfMonth: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
        monthsOfYear: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
    }, "strip", z.ZodTypeAny, {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }, {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        endDate?: string | undefined;
        interval?: number | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }>, "many">>;
    recurrence: z.ZodOptional<z.ZodObject<{
        frequency: z.ZodEnum<["minutely", "hourly", "daily", "weekly", "monthly", "yearly"]>;
        interval: z.ZodDefault<z.ZodNumber>;
        endDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        occurrenceCount: z.ZodOptional<z.ZodNumber>;
        daysOfWeek: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
        daysOfMonth: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
        monthsOfYear: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
    }, "strip", z.ZodTypeAny, {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }, {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        endDate?: string | undefined;
        interval?: number | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }>>;
    clearRecurrence: z.ZodOptional<z.ZodBoolean>;
    locationTrigger: z.ZodOptional<z.ZodObject<{
        title: z.ZodString;
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
        radius: z.ZodDefault<z.ZodNumber>;
        proximity: z.ZodEnum<["enter", "leave"]>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        latitude: number;
        longitude: number;
        proximity: "enter" | "leave";
        radius: number;
    }, {
        title: string;
        latitude: number;
        longitude: number;
        proximity: "enter" | "leave";
        radius?: number | undefined;
    }>>;
    clearLocationTrigger: z.ZodOptional<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    addTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    removeTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    url?: string | undefined;
    title?: string | undefined;
    startDate?: string | undefined;
    dueDate?: string | undefined;
    completionDate?: string | undefined;
    note?: string | undefined;
    location?: string | undefined;
    completed?: boolean | undefined;
    priority?: number | undefined;
    alarms?: {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }[] | undefined;
    clearAlarms?: boolean | undefined;
    targetList?: string | undefined;
    recurrence?: {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    } | undefined;
    recurrenceRules?: {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }[] | undefined;
    clearRecurrence?: boolean | undefined;
    locationTrigger?: {
        title: string;
        latitude: number;
        longitude: number;
        proximity: "enter" | "leave";
        radius: number;
    } | undefined;
    clearLocationTrigger?: boolean | undefined;
    tags?: string[] | undefined;
    addTags?: string[] | undefined;
    removeTags?: string[] | undefined;
}, {
    id: string;
    url?: string | undefined;
    title?: string | undefined;
    startDate?: string | undefined;
    dueDate?: string | undefined;
    completionDate?: string | undefined;
    note?: string | undefined;
    location?: string | undefined;
    completed?: boolean | undefined;
    priority?: number | undefined;
    alarms?: {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }[] | undefined;
    clearAlarms?: boolean | undefined;
    targetList?: string | undefined;
    recurrence?: {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        endDate?: string | undefined;
        interval?: number | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    } | undefined;
    recurrenceRules?: {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        endDate?: string | undefined;
        interval?: number | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }[] | undefined;
    clearRecurrence?: boolean | undefined;
    locationTrigger?: {
        title: string;
        latitude: number;
        longitude: number;
        proximity: "enter" | "leave";
        radius?: number | undefined;
    } | undefined;
    clearLocationTrigger?: boolean | undefined;
    tags?: string[] | undefined;
    addTags?: string[] | undefined;
    removeTags?: string[] | undefined;
}>;
export declare const DeleteReminderSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const CreateCalendarEventSchema: z.ZodObject<{
    title: z.ZodString;
    startDate: z.ZodEffects<z.ZodString, string, string>;
    endDate: z.ZodEffects<z.ZodString, string, string>;
    note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    location: z.ZodOptional<z.ZodString>;
    structuredLocation: z.ZodOptional<z.ZodObject<{
        title: z.ZodString;
        latitude: z.ZodOptional<z.ZodNumber>;
        longitude: z.ZodOptional<z.ZodNumber>;
        radius: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        latitude?: number | undefined;
        longitude?: number | undefined;
        radius?: number | undefined;
    }, {
        title: string;
        latitude?: number | undefined;
        longitude?: number | undefined;
        radius?: number | undefined;
    }>>;
    url: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    isAllDay: z.ZodOptional<z.ZodBoolean>;
    availability: z.ZodOptional<z.ZodEnum<["not-supported", "busy", "free", "tentative", "unavailable"]>>;
    alarms: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        relativeOffset: z.ZodOptional<z.ZodNumber>;
        absoluteDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        locationTrigger: z.ZodOptional<z.ZodObject<{
            title: z.ZodString;
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
            radius: z.ZodDefault<z.ZodNumber>;
            proximity: z.ZodEnum<["enter", "leave"]>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        }, {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        }>>;
        alarmType: z.ZodOptional<z.ZodEnum<["display", "audio", "procedure", "email"]>>;
    }, "strip", z.ZodTypeAny, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }>, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }>, "many">>;
    recurrenceRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        frequency: z.ZodEnum<["minutely", "hourly", "daily", "weekly", "monthly", "yearly"]>;
        interval: z.ZodDefault<z.ZodNumber>;
        endDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        occurrenceCount: z.ZodOptional<z.ZodNumber>;
        daysOfWeek: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
        daysOfMonth: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
        monthsOfYear: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
    }, "strip", z.ZodTypeAny, {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }, {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        endDate?: string | undefined;
        interval?: number | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }>, "many">>;
    targetCalendar: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    startDate: string;
    endDate: string;
    url?: string | undefined;
    note?: string | undefined;
    location?: string | undefined;
    alarms?: {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }[] | undefined;
    recurrenceRules?: {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }[] | undefined;
    structuredLocation?: {
        title: string;
        latitude?: number | undefined;
        longitude?: number | undefined;
        radius?: number | undefined;
    } | undefined;
    availability?: "not-supported" | "busy" | "free" | "tentative" | "unavailable" | undefined;
    isAllDay?: boolean | undefined;
    targetCalendar?: string | undefined;
}, {
    title: string;
    startDate: string;
    endDate: string;
    url?: string | undefined;
    note?: string | undefined;
    location?: string | undefined;
    alarms?: {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }[] | undefined;
    recurrenceRules?: {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        endDate?: string | undefined;
        interval?: number | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }[] | undefined;
    structuredLocation?: {
        title: string;
        latitude?: number | undefined;
        longitude?: number | undefined;
        radius?: number | undefined;
    } | undefined;
    availability?: "not-supported" | "busy" | "free" | "tentative" | "unavailable" | undefined;
    isAllDay?: boolean | undefined;
    targetCalendar?: string | undefined;
}>;
export declare const ReadCalendarEventsSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    filterCalendar: z.ZodOptional<z.ZodString>;
    filterAccount: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    availability: z.ZodOptional<z.ZodEnum<["not-supported", "busy", "free", "tentative", "unavailable"]>>;
    startDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    endDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    id?: string | undefined;
    startDate?: string | undefined;
    search?: string | undefined;
    endDate?: string | undefined;
    availability?: "not-supported" | "busy" | "free" | "tentative" | "unavailable" | undefined;
    filterCalendar?: string | undefined;
    filterAccount?: string | undefined;
}, {
    id?: string | undefined;
    startDate?: string | undefined;
    search?: string | undefined;
    endDate?: string | undefined;
    availability?: "not-supported" | "busy" | "free" | "tentative" | "unavailable" | undefined;
    filterCalendar?: string | undefined;
    filterAccount?: string | undefined;
}>;
export declare const UpdateCalendarEventSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    endDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    location: z.ZodOptional<z.ZodString>;
    structuredLocation: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        title: z.ZodString;
        latitude: z.ZodOptional<z.ZodNumber>;
        longitude: z.ZodOptional<z.ZodNumber>;
        radius: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        latitude?: number | undefined;
        longitude?: number | undefined;
        radius?: number | undefined;
    }, {
        title: string;
        latitude?: number | undefined;
        longitude?: number | undefined;
        radius?: number | undefined;
    }>>>;
    url: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    isAllDay: z.ZodOptional<z.ZodBoolean>;
    availability: z.ZodOptional<z.ZodEnum<["not-supported", "busy", "free", "tentative", "unavailable"]>>;
    alarms: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        relativeOffset: z.ZodOptional<z.ZodNumber>;
        absoluteDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        locationTrigger: z.ZodOptional<z.ZodObject<{
            title: z.ZodString;
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
            radius: z.ZodDefault<z.ZodNumber>;
            proximity: z.ZodEnum<["enter", "leave"]>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        }, {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        }>>;
        alarmType: z.ZodOptional<z.ZodEnum<["display", "audio", "procedure", "email"]>>;
    }, "strip", z.ZodTypeAny, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }>, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }, {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }>, "many">>;
    clearAlarms: z.ZodOptional<z.ZodBoolean>;
    recurrenceRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        frequency: z.ZodEnum<["minutely", "hourly", "daily", "weekly", "monthly", "yearly"]>;
        interval: z.ZodDefault<z.ZodNumber>;
        endDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        occurrenceCount: z.ZodOptional<z.ZodNumber>;
        daysOfWeek: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
        daysOfMonth: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
        monthsOfYear: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>, number[] | undefined, number[] | undefined>;
    }, "strip", z.ZodTypeAny, {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }, {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        endDate?: string | undefined;
        interval?: number | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }>, "many">>;
    clearRecurrence: z.ZodOptional<z.ZodBoolean>;
    span: z.ZodOptional<z.ZodEnum<["this-event", "future-events"]>>;
    targetCalendar: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    url?: string | undefined;
    title?: string | undefined;
    startDate?: string | undefined;
    note?: string | undefined;
    location?: string | undefined;
    alarms?: {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius: number;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }[] | undefined;
    clearAlarms?: boolean | undefined;
    recurrenceRules?: {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }[] | undefined;
    clearRecurrence?: boolean | undefined;
    endDate?: string | undefined;
    structuredLocation?: {
        title: string;
        latitude?: number | undefined;
        longitude?: number | undefined;
        radius?: number | undefined;
    } | null | undefined;
    availability?: "not-supported" | "busy" | "free" | "tentative" | "unavailable" | undefined;
    isAllDay?: boolean | undefined;
    span?: "this-event" | "future-events" | undefined;
    targetCalendar?: string | undefined;
}, {
    id: string;
    url?: string | undefined;
    title?: string | undefined;
    startDate?: string | undefined;
    note?: string | undefined;
    location?: string | undefined;
    alarms?: {
        locationTrigger?: {
            title: string;
            latitude: number;
            longitude: number;
            proximity: "enter" | "leave";
            radius?: number | undefined;
        } | undefined;
        relativeOffset?: number | undefined;
        absoluteDate?: string | undefined;
        alarmType?: "display" | "audio" | "procedure" | "email" | undefined;
    }[] | undefined;
    clearAlarms?: boolean | undefined;
    recurrenceRules?: {
        frequency: "minutely" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
        endDate?: string | undefined;
        interval?: number | undefined;
        occurrenceCount?: number | undefined;
        daysOfWeek?: number[] | undefined;
        daysOfMonth?: number[] | undefined;
        monthsOfYear?: number[] | undefined;
    }[] | undefined;
    clearRecurrence?: boolean | undefined;
    endDate?: string | undefined;
    structuredLocation?: {
        title: string;
        latitude?: number | undefined;
        longitude?: number | undefined;
        radius?: number | undefined;
    } | null | undefined;
    availability?: "not-supported" | "busy" | "free" | "tentative" | "unavailable" | undefined;
    isAllDay?: boolean | undefined;
    span?: "this-event" | "future-events" | undefined;
    targetCalendar?: string | undefined;
}>;
export declare const DeleteCalendarEventSchema: z.ZodObject<{
    id: z.ZodString;
    span: z.ZodOptional<z.ZodEnum<["this-event", "future-events"]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    span?: "this-event" | "future-events" | undefined;
}, {
    id: string;
    span?: "this-event" | "future-events" | undefined;
}>;
export declare const ReadCalendarsSchema: z.ZodEffects<z.ZodObject<{
    startDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    endDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    filterAccount: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    startDate?: string | undefined;
    endDate?: string | undefined;
    filterAccount?: string | undefined;
}, {
    startDate?: string | undefined;
    endDate?: string | undefined;
    filterAccount?: string | undefined;
}>, {
    startDate?: string | undefined;
    endDate?: string | undefined;
    filterAccount?: string | undefined;
}, {
    startDate?: string | undefined;
    endDate?: string | undefined;
    filterAccount?: string | undefined;
}>;
export declare const CreateReminderListSchema: z.ZodObject<{
    name: z.ZodString;
    color: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    color?: string | undefined;
}, {
    name: string;
    color?: string | undefined;
}>;
export declare const UpdateReminderListSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    newName: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    newName?: string | undefined;
    color?: string | undefined;
}, {
    name: string;
    newName?: string | undefined;
    color?: string | undefined;
}>, {
    name: string;
    newName?: string | undefined;
    color?: string | undefined;
}, {
    name: string;
    newName?: string | undefined;
    color?: string | undefined;
}>;
export declare const DeleteReminderListSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
/**
 * Validation error wrapper for consistent error handling across the application
 * @extends Error
 * @class
 * @description Provides structured error information with field-level details for validation failures
 * @param {string} message - Human-readable error message
 * @param {Record<string, string[]>} [details] - Optional field-specific error details
 * @example
 * throw new ValidationError('Invalid input', {
 * title: ['Title is required', 'Title too long'],
 * dueDate: ['Invalid date format']
 * });
 */
export declare class ValidationError extends Error {
    details?: Record<string, string[]> | undefined;
    constructor(message: string, details?: Record<string, string[]> | undefined);
}
/**
 * Generic validation function with security error handling and detailed logging
 * @template T - Expected type after validation
 * @param {z.ZodSchema<T>} schema - Zod schema to validate against
 * @param {unknown} input - Input data to validate
 * @returns {T} Validated and parsed data
 * @throws {ValidationError} Detailed validation error with field-specific messages
 * @description
 * - Provides detailed field-level error messages
 * - Aggregates multiple validation errors into single error
 * - Includes path information for nested field validation
 * - Throws ValidationError for consistent error handling
 * @example
 * try {
 * const data = validateInput(CreateReminderSchema, input);
 * // data is now typed as CreateReminderData
 * } catch (error) {
 * if (error instanceof ValidationError) {
 * console.log(error.details); // Field-specific error messages
 * }
 * }
 */
export declare const validateInput: <T>(schema: z.ZodSchema<T>, input: unknown) => T;
export declare const ReadSubtasksSchema: z.ZodObject<{
    reminderId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reminderId: string;
}, {
    reminderId: string;
}>;
export declare const CreateSubtaskSchema: z.ZodObject<{
    reminderId: z.ZodString;
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    reminderId: string;
}, {
    title: string;
    reminderId: string;
}>;
export declare const UpdateSubtaskSchema: z.ZodObject<{
    reminderId: z.ZodString;
    subtaskId: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    completed: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    reminderId: string;
    subtaskId: string;
    title?: string | undefined;
    completed?: boolean | undefined;
}, {
    reminderId: string;
    subtaskId: string;
    title?: string | undefined;
    completed?: boolean | undefined;
}>;
export declare const DeleteSubtaskSchema: z.ZodObject<{
    reminderId: z.ZodString;
    subtaskId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reminderId: string;
    subtaskId: string;
}, {
    reminderId: string;
    subtaskId: string;
}>;
export declare const ToggleSubtaskSchema: z.ZodObject<{
    reminderId: z.ZodString;
    subtaskId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reminderId: string;
    subtaskId: string;
}, {
    reminderId: string;
    subtaskId: string;
}>;
export declare const ReorderSubtasksSchema: z.ZodObject<{
    reminderId: z.ZodString;
    order: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    reminderId: string;
    order: string[];
}, {
    reminderId: string;
    order: string[];
}>;
/**
 * Prompt argument validation schemas
 * These schemas validate user inputs for MCP prompt templates
 */
/**
 * Schema for daily-task-organizer prompt arguments
 */
export declare const DailyTaskOrganizerArgsSchema: z.ZodObject<{
    "Today's focus": z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    "Today's focus"?: string | undefined;
}, {
    "Today's focus"?: string | undefined;
}>;
/**
 * Schema for smart-reminder-creator prompt arguments
 */
export declare const SmartReminderCreatorArgsSchema: z.ZodObject<{
    'Task idea': z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    'Task idea'?: string | undefined;
}, {
    'Task idea'?: string | undefined;
}>;
/**
 * Schema for reminder-review-assistant prompt arguments
 */
export declare const ReminderReviewAssistantArgsSchema: z.ZodObject<{
    'Review focus': z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    'Review focus'?: string | undefined;
}, {
    'Review focus'?: string | undefined;
}>;
/**
 * Schema for weekly-planning-workflow prompt arguments
 */
export declare const WeeklyPlanningWorkflowArgsSchema: z.ZodObject<{
    'User ideas': z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    'User ideas'?: string | undefined;
}, {
    'User ideas'?: string | undefined;
}>;
