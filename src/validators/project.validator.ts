import Joi from "joi";
import type { ObjectSchema, ValidationResult } from "joi";
/* ---------------- CREATE PROJECT ---------------- */
export const validateCreateProject = (
  body: unknown,
): ValidationResult<{
  title: string;
  description?: string;
  status?: string;
  weight?: number;
  due_date?: string;
}> => {
  const schema: ObjectSchema = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title too long",
    }),
    description: Joi.string().allow("").optional(),
    status: Joi.string()
      .valid("inactive", "active", "completed", "archived")
      .optional(),
    weight: Joi.number().min(0).max(100).optional().messages({
      "number.min": "Weight must be >= 0",
      "number.max": "Weight must be <= 100",
    }),
    dueDate: Joi.date().optional(),
  });
  return schema.validate(body);
};
/* ---------------- UPDATE PROJECT ---------------- */
export const validateUpdateProject = (
  body: unknown,
): ValidationResult<{
  projectId: number;
  title?: string;
  description?: string;
  status?: string;
  weight?: number;
  dueDate?: string;
}> => {
  const schema: ObjectSchema = Joi.object({
    projectId: Joi.number().integer().required(),
    title: Joi.string().min(3).max(255).optional(),
    description: Joi.string().allow("").optional(),
    status: Joi.string()
      .valid("inactive", "active", "completed", "archived")
      .optional(),
    weight: Joi.number().min(0).max(100).optional(),
    due_date: Joi.date().optional(),
  }).or("title", "description", "status", "weight", "due_date");
  return schema.validate(body);
};
/* ---------------- PROJECT ID VALIDATION ---------------- */
export const validateProjectId = (
  params: unknown,
): ValidationResult<{
  id: number;
}> => {
  const schema: ObjectSchema = Joi.object({
    id: Joi.number().integer().required().messages({
      "any.required": "Project ID is required",
      "number.base": "Project ID must be a number",
    }),
  });
  return schema.validate(params);
};
