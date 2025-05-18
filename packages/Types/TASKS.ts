import { USER_TYPE } from "./USERS";

// shared/types/task.ts (for both FE & BE)
export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface TASK_TYPE {
  _id: string;
  title: string;
  description: string;
  picture?: string;
  assignee: USER_TYPE;
  status: TaskStatus;
  rewardPrice: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: USER_TYPE;
  comments: { text: string; status: string; date: Date; by: USER_TYPE }[];
}
