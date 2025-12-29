export const STORAGE_KEYS = {
    ROLES: 'duty-ticker-roles',
    STUDENTS: 'duty-ticker-students',
    SCHEDULE: 'duty-ticker-schedule',
    NOTIFICATIONS: 'duty-ticker-notifications',
} as const;

export function loadFromStorage<T>(key: string, initialValue: T): T {
    if (typeof window === 'undefined') return initialValue;

    try {
        const item = window.localStorage.getItem(key);
        if (!item) return initialValue;
        const parsed = JSON.parse(item);
        return parsed ?? initialValue;
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return initialValue;
    }
}

export function saveToStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Error writing localStorage key "${key}":`, error);
    }
}
