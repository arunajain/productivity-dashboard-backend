import Task from "../repositories/Task.js";
import { AppError } from "../errors/AppError.js";
import type {
  CreateTaskDTO,
  TaskStatus,
  UpdateTaskDTO,
  TaskResponse,
  TaskQueryOptions,
} from "../types/task.types.js";
import type { ApiResponse } from "../types/common.types.js";
import { mapTasks, mapTask } from "../mappers/task.mapper.js";
import Goal from "../repositories/Goal.js";
class TaskService {
  // ---------------- CREATE task ----------------
  static async createtask(
    data: CreateTaskDTO,
    userId: number,
  ): Promise<ApiResponse<TaskResponse>> {
    const { goalId, title, description, status, isCompleted, weight, dueDate } =
      data;

    const checkGoal = await Goal.getById(goalId, userId);

    if (!checkGoal) {
      throw new AppError(
        "Please create task related to goal already created",
        404,
      );
    }

    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      throw new AppError("Invalid Due Date", 400);
    }
    const _dueDate = dueDate ? new Date(dueDate) : null;
    const task = await Task.createTask(
      goalId,
      userId,
      title.trim(),
      description?.trim() || "",
      status || ("inactive" as TaskStatus),
      weight || 0,
      isCompleted || false,
      _dueDate,
    );

    if (!task) {
      throw new AppError("Failed to create task", 500);
    }

    return {
      success: true,
      message: "Task created successfully",
      data: {
        taskId: task.id,
        goalId: task.goal_id,
        title: task.title,
        description: task.description,
        status: task.status as TaskStatus,
        isCompleted: task.is_completed,
        weight: task.weight ?? null,
        dueDate: task.due_date?.toISOString() ?? null,
      },
    };
  }
  // ---------------- GET All tasks ----------------

  static async getTasks(
    options: TaskQueryOptions,
    user_id: number,
  ): Promise<ApiResponse<TaskResponse[]>> {
    const tasks = await Task.getTasks(options, user_id);
    const tasksResultResponse = mapTasks(tasks);
    return {
      success: true,
      message: "Tasks retrieved successfully",
      data: mapTasks(tasks),
    };
  }

  // ---------------- DELETE task ----------------
  static async deletetaskById(
    task_id: number,
    user_id: number,
  ): Promise<ApiResponse> {
    const existingtask = await Task.getById(task_id, user_id);
    if (!existingtask) {
      throw new AppError("task not found", 404);
    }
    await Task.deleteById(task_id, user_id);
    return {
      success: true,
      message: "Task deleted successfully",
    };
  }

  //   // ---------------- UPDATE task ----------------
  static async updateTaskById(
    data: UpdateTaskDTO,
    user_id: number,
  ): Promise<ApiResponse<TaskResponse>> {
    const {
      goalId,
      taskId,
      title,
      description,
      status,
      weight,
      dueDate,
      isCompleted,
    } = data;
    const existingtask = await Task.getById(taskId, user_id);
    if (!existingtask) {
      throw new AppError("Task not found", 404);
    }

    const updateGoalId = goalId || existingtask.goal_id;
    const updateTitle = title?.trim() || existingtask.title;
    const updateDescription = description?.trim() || existingtask.description;
    const updateStatus = status || (existingtask.status as TaskStatus);
    const updateWeight = weight !== undefined ? weight : existingtask.weight;
    const updateIsComplete =
      isCompleted !== undefined ? isCompleted : existingtask.is_completed;
    const updateDueDate =
      dueDate !== undefined
        ? dueDate
          ? new Date(dueDate)
          : null
        : existingtask.due_date;

    const updatedTask = await Task.updateById(
      taskId,
      updateTitle,
      updateDescription,
      updateGoalId,
      updateWeight,
      updateStatus,
      updateIsComplete,
      user_id,
      updateDueDate ?? null,
    );
    if (!updatedTask) {
      throw new AppError("Failed to update task", 500);
    }
    return {
      success: true,
      message: "Task has been updated successfully",
      data: {
        taskId: updatedTask.id,
        goalId: updatedTask.goal_id,
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status as TaskStatus,
        isCompleted: updatedTask.is_completed,
        weight: updatedTask.weight ?? null,
        dueDate: updatedTask.due_date?.toISOString() ?? null,
      },
    };
  }

  static async getTaskById(
    task_id: number,
    user_id: number,
  ): Promise<ApiResponse<TaskResponse>> {
    const existingTask = await Task.getById(task_id, user_id);
    if (!existingTask) {
      throw new AppError("task not found", 404);
    }
    const taskResultResponse = mapTask(existingTask);
    return {
      success: true,
      message: "Task retrieved successfully",
      data: taskResultResponse,
    };
  }
}

export default TaskService;
