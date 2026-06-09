import ProjectModel from "../models/Project.js";
import type { ApiResponse } from "../types/common.types.js";
import type {
  CreateProjectDTO,
  ProjectResponse,
  ProjectStatus,
  UpdateProjectDTO,
} from "../types/project.types.js";
import { AppError } from "../errors/AppError.js";
import { mapProjects, mapProject } from "../mappers/project.mapper.js";

class ProjectService {
  static async createProject(
    data: CreateProjectDTO,
  ): Promise<ApiResponse<ProjectResponse>> {
    const { title, description, status, dueDate, userId } = data;

    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      throw new AppError("Invalid due date", 400);
    }
    const _dueDate = dueDate ? new Date(dueDate) : null;

    const result = await ProjectModel.createProject(
      title.trim(),
      description?.trim() || "",
      userId,
      status || ("inactive" as ProjectStatus),
      _dueDate,
    );

    if (!result) {
      throw new AppError("Failed to create project", 500);
    }

    return {
      success: true,
      message: "Project created successfully",
      data: {
        projectId: result.id,
        title: result.title,
        description: result.description,
        status: result.status as ProjectStatus,
        weight: result.weight ?? null,
        dueDate: result.due_date?.toISOString() ?? null,
      },
    };
  }

  static async getProjectByUserId(
    user_id: number,
  ): Promise<ApiResponse<ProjectResponse[]>> {
    const projects = await ProjectModel.getAll(user_id);
    const projectsResultResponse = mapProjects(projects);
    return {
      success: true,
      message: "Projects retrieved successfully",
      data: projectsResultResponse,
    };
  }

  // ---------------- GET PROJECT BY ID ----------------
  static async getProjectById(
    project_id: number,
    user_id: number,
  ): Promise<ApiResponse<ProjectResponse>> {
    const existingProject = await ProjectModel.getById(project_id, user_id);
    if (!existingProject) {
      throw new AppError("Project not found", 404);
    }
    const projectResultResponse = mapProject(existingProject);
    return {
      success: true,
      message: "Project retrieved successfully",
      data: projectResultResponse,
    };
  }

  // ---------------- DELETE PROJECT ----------------
  static async deleteProjectById(
    project_id: number,
    user_id: number,
  ): Promise<ApiResponse> {
    const existingProject = await ProjectModel.getById(project_id, user_id);
    if (!existingProject) {
      throw new AppError("Project not found", 404);
    }
    await ProjectModel.deleteById(project_id, user_id);
    return {
      success: true,
      message: "Project deleted successfully",
    };
  }

  // ---------------- UPDATE PROJECT ----------------
  static async updateProject(
    data: UpdateProjectDTO,
    user_id: number,
  ): Promise<ApiResponse<ProjectResponse>> {
    const { projectId, title, description, status, weight, dueDate } = data;
    const existingProject = await ProjectModel.getById(projectId, user_id);
    if (!existingProject) {
      throw new AppError("Project not found", 404);
    }
    const updatedTitle = title?.trim() || existingProject.title;
    const updatedDescription =
      description?.trim() || existingProject.description;
    const updatedStatus = status || (existingProject.status as ProjectStatus);
    const updatedWeight =
      weight !== undefined ? weight : existingProject.weight;
    const updatedDueDate =
      dueDate !== undefined
        ? dueDate
          ? new Date(dueDate)
          : null
        : existingProject.due_date;
    const updatedProject = await ProjectModel.updateById(
      projectId,
      user_id,
      updatedTitle,
      updatedDescription,
      updatedWeight,
      updatedStatus,
      updatedDueDate ?? null,
    );
    if (!updatedProject) {
      throw new AppError("Failed to update project", 500);
    }
    return {
      success: true,
      message: "Project has been updated successfully",
      data: {
        projectId: updatedProject.id,
        title: updatedProject.title,
        description: updatedProject.description,
        status: updatedProject.status as ProjectStatus,
        weight: updatedProject.weight ?? null,
        dueDate: updatedProject.due_date?.toISOString() ?? null,
      },
    };
  }
}

export default ProjectService;
