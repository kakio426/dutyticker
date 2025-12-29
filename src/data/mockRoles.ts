import { Role } from "../types/role";

export const mockRoles: Role[] = [
    {
        id: "r1",
        name: "칠판 지우기",
        assignee: "김철수",
        description: "매 시간 수업이 끝나면 칠판을 깨끗이 지워주세요.",
        timeSlot: "쉬는시간",
        status: "pending",
    },
    {
        id: "r2",
        name: "우유 당번",
        assignee: "이영희",
        description: "2교시 후 우유 급식을 가져옵니다.",
        timeSlot: "2교시 후",
        status: "pending",
    },
    {
        id: "r3",
        name: "창문 열기",
        assignee: "박민수",
        description: "쉬는 시간마다 환기를 위해 창문을 엽니다.",
        timeSlot: "쉬는시간",
        status: "completed",
    },
    {
        id: "r4",
        name: "에너지 지킴이",
        assignee: "최지우",
        description: "이동 수업 시 전등과 선풍기를 끕니다.",
        timeSlot: "수시로",
        status: "pending",
    }
];
