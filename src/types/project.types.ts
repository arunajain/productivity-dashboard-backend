export type ProjectStatus = "inactive" | "in_progress" | "completed";
export interface ProjectDataRow {
  id: number;
  title: string;
  description: string;
  status?: ProjectStatus;
  weight: number;
  due_date?: Date | null;
}

export interface ProjectData {
  projectId: number;
  userId: number;
  title: string;
  description: string;
  status: ProjectStatus;
  weight: number;
  dueDate: Date | null;
}

export interface CreateProjectDTO {
  userId: number;
  title: string;
  description?: string;
  status?: ProjectStatus | undefined;
  dueDate?: string | null;
}

export interface UpdateProjectDTO {
  projectId: number;
  title?: string;
  description?: string;
  status?: ProjectStatus | undefined;
  weight?: number;
  dueDate?: string | null;
}

export interface ProjectResponse {
  projectId: number;
  title: string;
  description: string;
  status: ProjectStatus;
  weight: number | null;
  dueDate: string | null;
}
