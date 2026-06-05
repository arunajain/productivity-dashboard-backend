export type GoalStatus = "inactive" | "in_progress" | "completed";

export interface GoalDataRow {
  id: number;
  title: string;
  description: string;
  status?: GoalStatus;
  weight: number | null;
  due_date?: Date | null;
  project_id: number;
}

export interface CreateGoalDTO {
  title: string;
  description?: string;
  status?: GoalStatus;
  weight?: number;
  dueDate?: string | null;
  projectId: number;
}

export interface UpdateGoalDTO {
  goalId: number;
  title?: string;
  description?: string;
  status?: GoalStatus;
  weight?: number;
  dueDate?: string | null;
  projectId?: number;
}

export interface GoalResponse {
  goalId: number;
  title: string;
  description: string;
  status: GoalStatus;
  weight: number | null;
  dueDate: string | null;
  projectId: number;
}
