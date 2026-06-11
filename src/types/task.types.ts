export type TaskStatus = "inactive" | "in_progress" | "completed";
export type SortOrder = "ASC" | "DESC";
export interface TaskDataRow {
  id: number;
  goal_id: number;
  user_id: number;
  title: string;
  description: string;
  status: TaskStatus;
  is_completed: boolean;
  weight: number;
  due_date: Date | null;
}

export interface CreateTaskDTO {
  goalId: number;
  title: string;
  description?: string;
  status?: TaskStatus | undefined;
  isCompleted?: boolean;
  weight?: number;
  dueDate?: string | null;
}

export interface UpdateTaskDTO {
  goalId?: number;
  taskId: number;
  title?: string;
  description?: string;
  status?: TaskStatus | undefined;
  isCompleted?: boolean;
  weight?: number;
  dueDate?: string | null;
}

export interface TaskResponse {
  taskId: number;
  goalId: number;
  title: string;
  description: string;
  status: TaskStatus;
  isCompleted?: boolean;
  weight?: number;
  dueDate: string | null;
}

export interface TaskQueryOptions {
  goalId?: number;
  status?: TaskStatus;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}
