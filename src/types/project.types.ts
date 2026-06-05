export interface ProjectData {
  id: number;
  title: string;
  description: string;
  user_id: number;
}

export interface CreateProjectDTO {
  title: string;
  description?: string;
  user_id: number;
  status?: "inactive" | "active" | "completed" | "archived";
  weight?: number;
  due_date?: string;
}
