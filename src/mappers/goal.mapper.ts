import type {
  GoalDataRow,
  GoalResponse,
  GoalStatus,
} from "../types/goal.types.js";

export const mapGoal = (goal: GoalDataRow): GoalResponse => {
  return {
    goalId: goal.id,
    title: goal.title,
    description: goal.description,
    status: goal.status as GoalStatus,
    weight: goal.weight ?? null,
    dueDate: goal.due_date?.toISOString() ?? null,
    projectId: goal.project_id,
  };
};

export const mapGoals = (goals: GoalDataRow[]): GoalResponse[] => {
  return goals.map(mapGoal);
};
