import { spawn } from 'node:child_process';
import { resolveBinaryPath } from './cliExecutor.js';
const _setTimeout = globalThis.setTimeout;
export class EventKitDaemon {
    constructor(binaryPath) {
        this.process = null;
        this.pending = new Map();
        this.buffer = '';
        this.nextId = 1;
        this.dead = false;
        this.binaryPath = binaryPath;
    }
    static async getInstance() {
        if (!EventKitDaemon.instance) {
            const binaryPath = resolveBinaryPath();
            const daemon = new EventKitDaemon(binaryPath);
            await daemon.spawn();
            EventKitDaemon.instance = daemon;
        }
        else if (EventKitDaemon.instance.dead) {
            await EventKitDaemon.instance.spawn();
        }
        return EventKitDaemon.instance;
    }
    static resetInstance() {
        if (EventKitDaemon.instance) {
            EventKitDaemon.instance.close();
            EventKitDaemon.instance = null;
        }
    }
    spawn() {
        return new Promise((resolve, reject) => {
            try {
                const child = spawn(this.binaryPath, ['--daemon'], {
                    stdio: ['pipe', 'pipe', 'pipe'],
                });
                this.process = child;
                child.stdout.on('data', (data) => {
                    this.buffer += data.toString();
                    this.processBuffer();
                });
                child.on('error', (err) => {
                    this.dead = true;
                    this.rejectAll(err);
                    reject(err);
                });
                child.on('exit', (code) => {
                    this.dead = true;
                    const err = new Error(`Daemon exited with code ${code}`);
                    this.rejectAll(err);
                });
                resolve();
            }
            catch (err) {
                reject(err instanceof Error ? err : new Error(String(err)));
            }
        });
    }
    processBuffer() {
        const lines = this.buffer.split('\n');
        this.buffer = lines.pop() || '';
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed)
                continue;
            try {
                const response = JSON.parse(trimmed);
                const id = response.id;
                if (id != null) {
                    const waiter = this.pending.get(id);
                    if (waiter) {
                        this.pending.delete(id);
                        if (response.status === 'success') {
                            waiter.resolve(response.result ?? response);
                        }
                        else {
                            waiter.reject(new Error(response.message ?? 'Unknown daemon error'));
                        }
                    }
                }
            }
            catch {
                // ignore malformed JSON lines
            }
        }
    }
    rejectAll(error) {
        for (const [, waiter] of this.pending) {
            waiter.reject(error);
        }
        this.pending.clear();
    }
    async send(request) {
        if (!this.process || this.dead) {
            await this.spawn();
        }
        const id = this.nextId++;
        const payload = { id, ...request };
        return new Promise((resolve, reject) => {
            const timeout = _setTimeout(() => {
                this.pending.delete(id);
                reject(new Error('Daemon request timed out after 25000ms'));
            }, 25000);
            this.pending.set(id, {
                resolve: (value) => {
                    clearTimeout(timeout);
                    resolve(value);
                },
                reject: (err) => {
                    clearTimeout(timeout);
                    reject(err);
                },
            });
            this.process.stdin.write(`${JSON.stringify(payload)}\n`);
        });
    }
    async ping() {
        try {
            await this.send({ action: 'ping' });
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Health check with one automatic respawn on failure.
     * Returns true only if the daemon is confirmed reachable.
     */
    async healthCheck() {
        if (await this.ping())
            return true;
        this.close();
        try {
            await this.spawn();
        }
        catch {
            return false;
        }
        return this.ping();
    }
    close() {
        if (this.process) {
            try {
                this.process.stdin?.end();
            }
            catch {
                // ignore
            }
            try {
                this.process.kill();
            }
            catch {
                // ignore
            }
            this.process = null;
        }
        this.dead = true;
    }
}
EventKitDaemon.instance = null;
//# sourceMappingURL=daemonExecutor.js.map