import Joi, { type ObjectSchema, type ValidationResult } from "joi";
import type { CreateTodoDTO } from "../types/task.types.js";

/* -----------------------------------------
   CREATE TODO VALIDATION
------------------------------------------ */

export const createTodoSchema: ObjectSchema<CreateTodoDTO> = Joi.object({
  title: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must be at most 255 characters",
  }),

  description: Joi.string().allow("").optional(),

  goal_id: Joi.number().integer().required().messages({
    "any.required": "goal_id is required",
    "number.base": "goal_id must be a number",
  }),

  user_id: Joi.number().integer().required().messages({
    "any.required": "user_id is required",
    "number.base": "user_id must be a number",
  }),

  status: Joi.string()
    .valid("inactive", "active", "completed")
    .default("inactive"),

  is_completed: Joi.boolean().default(false),

  weight: Joi.number().min(0).max(100).default(0),

  due_date: Joi.date().optional(),
});

export const validateCreateTodo = (
  body: unknown,
): ValidationResult<CreateTodoDTO> => {
  return createTodoSchema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });
};

/* -----------------------------------------
   UPDATE TODO VALIDATION (PARTIAL)
------------------------------------------ */

export interface UpdateTodoDTO {
  todo_id: number;
  title?: string;
  description?: string;
  goal_id?: number;
  weight?: number;
  is_completed?: boolean;
  status?: "inactive" | "active" | "completed";
  due_date?: string;
}

export const updateTodoSchema: ObjectSchema<UpdateTodoDTO> = Joi.object({
  todo_id: Joi.number().integer().required(),

  title: Joi.string().min(3).max(255).optional(),

  description: Joi.string().allow("").optional(),

  goal_id: Joi.number().integer().optional(),

  weight: Joi.number().min(0).max(100).optional(),

  is_completed: Joi.boolean().optional(),

  status: Joi.string().valid("inactive", "active", "completed").optional(),

  due_date: Joi.date().optional(),
}).min(2); // at least todo_id + 1 field

export const validateUpdateTodo = (
  body: unknown,
): ValidationResult<UpdateTodoDTO> => {
  return updateTodoSchema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });
};

/* -----------------------------------------
   ID VALIDATION (GET / DELETE / SINGLE FETCH)
------------------------------------------ */

export const idSchema: ObjectSchema<{ id: number }> = Joi.object({
  id: Joi.number().integer().required().messages({
    "any.required": "id is required",
    "number.base": "id must be a number",
  }),
});

export const validateTodoId = (body: unknown) => {
  return idSchema.validate(body, {
    abortEarly: false,
  });
};

/* -----------------------------------------
   QUERY VALIDATIONS (optional filters)
------------------------------------------ */

export interface TodoQueryDTO {
  goal_id?: number;
  user_id?: number;
  status?: "inactive" | "active" | "completed";
}

export const todoQuerySchema: ObjectSchema<TodoQueryDTO> = Joi.object({
  goal_id: Joi.number().integer().optional(),

  user_id: Joi.number().integer().optional(),

  status: Joi.string().valid("inactive", "active", "completed").optional(),
});

export const validateTodoQuery = (query: unknown) => {
  return todoQuerySchema.validate(query, {
    abortEarly: false,
    stripUnknown: true,
  });
};
