import Joi from "joi";
import type { ObjectSchema, ValidationResult } from "joi";

export const validateCreateGoal = (body: unknown) => {
  const schema: ObjectSchema = Joi.object({
    projectId: Joi.number().integer().positive().required(),
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().allow("").optional(),
    status: Joi.string()
      .valid("inactive", "in_progress", "completed")
      .optional(),
    dueDate: Joi.string().isoDate().optional(), //format - "YYYY-MM-DD"
  });
  return schema.validate(body);
};

export const validateUpdateGoal = (body: unknown) => {
  const schema: ObjectSchema = Joi.object({
    goalId: Joi.number().integer().positive().required(),
    title: Joi.string().min(3).max(255).optional(),
    description: Joi.string().allow("").optional(),
    status: Joi.string()
      .valid("inactive", "in_progress", "completed")
      .optional(),
    weight: Joi.number().integer().min(0).max(100).optional(),
    dueDate: Joi.string().isoDate().optional(),
  }).or("title", "description", "status", "weight", "due_date");
  return schema.validate(body);
};
