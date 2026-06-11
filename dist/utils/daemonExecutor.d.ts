export declare class EventKitDaemon {
    private static instance;
    private process;
    private pending;
    private buffer;
    private nextId;
    private dead;
    private binaryPath;
    private constructor();
    static getInstance(): Promise<EventKitDaemon>;
    static resetInstance(): void;
    private spawn;
    private processBuffer;
    private rejectAll;
    send<T>(request: Record<string, unknown>): Promise<T>;
    ping(): Promise<boolean>;
    /**
     * Health check with one automatic respawn on failure.
     * Returns true only if the daemon is confirmed reachable.
     */
    healthCheck(): Promise<boolean>;
    close(): void;
}
