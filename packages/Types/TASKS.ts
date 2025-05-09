// shared/types/task.ts (for both FE & BE)
export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface TASK_TYPE {
  _id: string;
  title: string;
  description: string;
  picture?: string;
  assignee: string;
  status: TaskStatus;
  rewardPrice: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}
