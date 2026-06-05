import Joi from "joi";
import type { ObjectSchema, ValidationResult } from "joi";

export const validateCreateNote = (
  body: unknown,
): ValidationResult<{
  title: string;
  content: string;
  user_id: number;
}> => {
  const schema: ObjectSchema = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title cannot exceed 255 characters",
    }),
    content: Joi.string().allow("").required().messages({
      "string.empty": "Content is required",
    }),
    user_id: Joi.number().integer().required().messages({
      "number.base": "User ID must be a number",
      "any.required": "User ID is required",
    }),
  });
  return schema.validate(body);
};
/* ---------------- UPDATE NOTE ---------------- */
export const validateUpdateNote = (
  body: unknown,
): ValidationResult<{
  note_id: number;
  title?: string;
  content?: string;
}> => {
  const schema: ObjectSchema = Joi.object({
    note_id: Joi.number().integer().required().messages({
      "any.required": "Note ID is required",
      "number.base": "Note ID must be a number",
    }),
    title: Joi.string().min(3).max(255).optional(),
    content: Joi.string().optional(),
  }).or("title", "content"); // at least one must exist
  return schema.validate(body);
};
/* ---------------- DELETE / GET BY ID ---------------- */
export const validateNoteId = (
  params: unknown,
): ValidationResult<{
  id: number;
}> => {
  const schema: ObjectSchema = Joi.object({
    id: Joi.number().integer().required().messages({
      "any.required": "Note ID is required",
      "number.base": "Note ID must be a number",
    }),
  });
  return schema.validate(params);
};
