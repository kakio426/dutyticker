import { ClassSession } from "@/types/schedule";
import { useEffect, useState } from "react";
import { loadFromStorage, STORAGE_KEYS } from "@/lib/storage";
import { mockWeeklySchedule } from "@/data/mockWeeklySchedule";

export function useWeeklySchedule() {
    const [schedule, setSchedule] = useState<ClassSession[]>([]);

    useEffect(() => {
        // Load the full weekly schedule from storage
        const weeklyData = loadFromStorage(STORAGE_KEYS.SCHEDULE, mockWeeklySchedule);
        const today = new Date().getDay(); // 0-6
        // Default to Monday (1) if weekend (0 or 6) for better demo experience
        const displayDay = today === 0 || today === 6 ? 1 : today;
        setSchedule(weeklyData[displayDay] || []);
    }, []);

    return { schedule };
}
