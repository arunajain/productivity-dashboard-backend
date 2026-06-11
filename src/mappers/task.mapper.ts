import type {
  TaskDataRow,
  TaskResponse,
  TaskStatus,
} from "../types/task.types.js";

export const mapTask = (task: TaskDataRow): TaskResponse => {
  return {
    taskId: task.id,
    goalId: task.goal_id,
    title: task.title,
    description: task.description,
    status: task.status as TaskStatus,
    weight: task.weight ?? null,
    isCompleted: task.is_completed,
    dueDate: task.due_date?.toISOString() ?? null,
  };
};

export const mapTasks = (tasks: TaskDataRow[]): TaskResponse[] => {
  return tasks.map(mapTask);
};
