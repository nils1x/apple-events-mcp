let remindersEpochValue = 0;
let calendarsEpochValue = 0;
const cache = new Map();
export function remindersEpoch() {
    return remindersEpochValue;
}
export function calendarsEpoch() {
    return calendarsEpochValue;
}
export function bumpReminders() {
    remindersEpochValue++;
}
export function bumpCalendars() {
    calendarsEpochValue++;
}
export function clearCache() {
    cache.clear();
}
export async function cached(key, ttlMs, epoch, fn) {
    const cacheKey = `${key}:${epoch}`;
    const entry = cache.get(cacheKey);
    if (entry && Date.now() < entry.expires) {
        return entry.value;
    }
    const value = await fn();
    cache.set(cacheKey, { value, expires: Date.now() + ttlMs });
    return value;
}
//# sourceMappingURL=cache.js.map