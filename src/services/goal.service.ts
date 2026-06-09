import Goal from "../models/Goal.js";
import { AppError } from "../errors/AppError.js";
import type {
  CreateGoalDTO,
  GoalStatus,
  UpdateGoalDTO,
} from "../types/goal.types.js";
import type { ApiResponse } from "../types/common.types.js";
import type { GoalResponse } from "../types/goal.types.js";
import { mapGoals, mapGoal } from "../mappers/goal.mapper.js";
import ProjectModel from "../models/Project.js";
class GoalService {
  // ---------------- CREATE GOAL ----------------
  static async createGoal(
    data: CreateGoalDTO,
  ): Promise<ApiResponse<GoalResponse>> {
    const { title, description, status, dueDate, projectId } = data;

    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      throw new AppError("Invalid due date", 400);
    }
    const _dueDate = dueDate ? new Date(dueDate) : null;
    const project = await ProjectModel.getById(projectId);

    if (!project) {
      throw new AppError("Project not found", 404);
    }
    const goal = await Goal.createGoal(
      title.trim(),
      description?.trim() || "",
      status || ("inactive" as GoalStatus),
      _dueDate,
      projectId,
    );

    if (!goal) {
      throw new AppError("Failed to create goal", 500);
    }

    return {
      success: true,
      message: "Goal created successfully",
      data: {
        goalId: goal.id,
        title: goal.title,
        description: goal.description,
        status: goal.status as GoalStatus,
        weight: goal.weight ?? null,
        dueDate: goal.due_date?.toISOString() ?? null,
        projectId: goal.project_id,
      },
    };
  }
  // ---------------- GET All Goals ----------------
  static async getGoals(user_id: number): Promise<ApiResponse<GoalResponse[]>> {
    const goals = await Goal.getAll(user_id);
    const goalsResultResponse = mapGoals(goals);
    return {
      success: true,
      message: "Goals retrieved successfully",
      data: goalsResultResponse,
    };
  }

  // ---------------- GET GOALS BY PROJECT ----------------
  static async getGoalsByProject(
    project_id: number,
  ): Promise<ApiResponse<GoalResponse[]>> {
    const goals = await Goal.getByProject(project_id);
    const goalsResultResponse = mapGoals(goals);
    return {
      success: true,
      message: "Goals retrieved successfully",
      data: goalsResultResponse,
    };
  }

  // ---------------- GET GOAL BY ID ----------------
  static async getGoalById(goal_id: number) {
    const existingGoal = await Goal.getById(goal_id);
    if (!existingGoal) {
      throw new AppError("Goal not found", 404);
    }
    const goalResultResponse = mapGoal(existingGoal);
    return {
      success: true,
      message: "Goal retrieved successfully",
      data: goalResultResponse,
    };
  }

  // ---------------- DELETE GOAL ----------------
  static async deleteGoalById(goal_id: number): Promise<ApiResponse> {
    const existingGoal = await Goal.getById(goal_id);
    if (!existingGoal) {
      throw new AppError("Goal not found", 404);
    }
    await Goal.deleteById(goal_id);
    return {
      success: true,
      message: "Goal deleted successfully",
    };
  }

  // ---------------- UPDATE GOAL ----------------
  static async updateGoalById(
    data: UpdateGoalDTO,
  ): Promise<ApiResponse<GoalResponse>> {
    const { goalId, title, description, status, weight, dueDate, projectId } =
      data;
    const existingGoal = await Goal.getById(goalId);
    if (!existingGoal) {
      throw new AppError("Goal not found", 404);
    }
    const updatedTitle = title?.trim() || existingGoal.title;
    const updatedDescription = description?.trim() || existingGoal.description;
    const updatedStatus = status || (existingGoal.status as GoalStatus);
    const updatedWeight = weight !== undefined ? weight : existingGoal.weight;
    const updatedDueDate =
      dueDate !== undefined
        ? dueDate
          ? new Date(dueDate)
          : null
        : existingGoal.due_date;
    const updatedProjectId = projectId || existingGoal.project_id;

    const updatedGoal = await Goal.updateById(
      goalId,
      updatedTitle,
      updatedDescription,
      updatedStatus,
      updatedWeight,
      updatedDueDate ?? null,
      updatedProjectId,
    );
    if (!updatedGoal) {
      throw new AppError("Failed to update goal", 500);
    }
    return {
      success: true,
      message: "Goal has been updated successfully",
      data: {
        goalId: updatedGoal.id,
        title: updatedGoal.title,
        description: updatedGoal.description,
        status: updatedGoal.status as GoalStatus,
        weight: updatedGoal.weight ?? null,
        dueDate: updatedGoal.due_date?.toISOString() ?? null,
        projectId: updatedGoal.project_id,
      },
    };
  }
}

export default GoalService;
