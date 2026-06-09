export interface TodoData {
  id: number;
  title: string;
  description: string;
  goal_id: number;
  user_id: number;
  weight: number;
  is_completed: boolean;
}

export interface CreateTodoDTO {
  title: string;
  description?: string;
  goal_id: number;
  user_id: number;
  status?: "inactive" | "active" | "completed";
  is_completed?: boolean;
  weight?: number;
  due_date?: string;
}
