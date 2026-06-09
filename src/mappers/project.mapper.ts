import type {
  ProjectDataRow,
  ProjectResponse,
  ProjectStatus,
} from "../types/project.types.js";

export const mapProject = (project: ProjectDataRow): ProjectResponse => {
  return {
    projectId: project.id,
    title: project.title,
    description: project.description,
    status: project.status as ProjectStatus,
    weight: project.weight ?? null,
    dueDate: project.due_date?.toISOString() ?? null,
  };
};

export const mapProjects = (projects: ProjectDataRow[]): ProjectResponse[] => {
  return projects.map(mapProject);
};
