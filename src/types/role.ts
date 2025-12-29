export type RoleStatus = 'pending' | 'in-progress' | 'completed';

export interface Role {
  id: string;
  name: string;
  assignee: string; // 학생 이름
  description?: string;
  timeSlot?: string; // 예: "08:50", "1교시 전"
  status: RoleStatus;
}
