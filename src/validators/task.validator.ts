import Joi, { type ObjectSchema, type ValidationResult } from "joi";
import type { CreateTaskDTO } from "../types/task.types.js";

export const validateCreateTask = (body: unknown) => {
  const schema: ObjectSchema = Joi.object({
    goalId: Joi.number().integer().positive().required(),
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().allow("").optional(),
    status: Joi.string()
      .valid("inactive", "in_progress", "completed")
      .optional(),
    isCompleted: Joi.boolean().optional().default(false),
    weight: Joi.number().integer().positive().max(100).optional().default(0),
    dueDate: Joi.string().isoDate().optional().default(null), //format - "YYYY-MM-DD"
  });
  return schema.validate(body);
};

export const validateUpdateTask = (body: unknown) => {
  const schema: ObjectSchema = Joi.object({
    goalId: Joi.number().integer().positive().optional(),
    taskId: Joi.number().integer().positive().required(),
    title: Joi.string().min(3).max(255).optional(),
    description: Joi.string().allow("").optional(),
    status: Joi.string()
      .valid("inactive", "in_progress", "completed")
      .optional(),
    isCompleted: Joi.boolean().optional().default(false),
    weight: Joi.number().integer().min(0).max(100).optional(),
    dueDate: Joi.string().isoDate().optional(),
  }).or("title", "description", "status", "weight", "isCompleted", "dueDate");
  return schema.validate(body);
};
