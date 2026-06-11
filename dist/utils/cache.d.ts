export declare function remindersEpoch(): number;
export declare function calendarsEpoch(): number;
export declare function bumpReminders(): void;
export declare function bumpCalendars(): void;
export declare function clearCache(): void;
export declare function cached<T>(key: string, ttlMs: number, epoch: number, fn: () => Promise<T>): Promise<T>;
