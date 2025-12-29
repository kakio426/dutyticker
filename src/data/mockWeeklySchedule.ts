import { ClassSession } from "@/types/schedule";

export const mockWeeklySchedule: Record<number, ClassSession[]> = {
    1: [ // Monday
        { id: "mon1", name: "1교시 국어", startTime: "09:00", endTime: "09:40" },
        { id: "mon2", name: "2교시 사회", startTime: "09:50", endTime: "10:30" },
        { id: "mon3", name: "3교시 과학", startTime: "10:40", endTime: "11:20" },
        { id: "mon4", name: "4교시 수학", startTime: "11:30", endTime: "12:10" },
    ],
    2: [ // Tuesday
        { id: "tue1", name: "1교시 체육", startTime: "09:00", endTime: "09:40" },
        { id: "tue2", name: "2교시 미술", startTime: "09:50", endTime: "10:30" },
        { id: "tue3", name: "3교시 음악", startTime: "10:40", endTime: "11:20" },
        { id: "tue4", name: "4교시 영어", startTime: "11:30", endTime: "12:10" },
    ],
    3: [ // Wednesday
        { id: "wed1", name: "1교시 국어", startTime: "09:00", endTime: "09:40" },
        { id: "wed2", name: "2교시 수학", startTime: "09:50", endTime: "10:30" },
        { id: "wed3", name: "3교시 창체", startTime: "10:40", endTime: "11:20" },
        { id: "wed4", name: "4교시 사회", startTime: "11:30", endTime: "12:10" },
    ],
    4: [ // Thursday
        { id: "thu1", name: "1교시 과학", startTime: "09:00", endTime: "09:40" },
        { id: "thu2", name: "2교시 영어", startTime: "09:50", endTime: "10:30" },
        { id: "thu3", name: "3교시 체육", startTime: "10:40", endTime: "11:20" },
        { id: "thu4", name: "4교시 국어", startTime: "11:30", endTime: "12:10" },
    ],
    5: [ // Friday
        { id: "fri1", name: "1교시 수학", startTime: "09:00", endTime: "09:40" },
        { id: "fri2", name: "2교시 실과", startTime: "09:50", endTime: "10:30" },
        { id: "fri3", name: "3교시 사회", startTime: "10:40", endTime: "11:20" },
        { id: "fri4", name: "4교시 국어", startTime: "11:30", endTime: "12:10" },
    ],
    0: [], // Sunday
    6: [], // Saturday
};
