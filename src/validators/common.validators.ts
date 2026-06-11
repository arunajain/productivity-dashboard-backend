import Joi from "joi";
import type { ObjectSchema, ValidationResult } from "joi";

export const validateId = (id: unknown) => {
  const schema = Joi.number().integer().positive().required();
  return schema.validate(id);
};
