import Joi from "joi";
import type { ObjectSchema, ValidationResult } from "joi";

// -------------------- REGISTER --------------------

export const validateRegister = (
  body: unknown,
): Joi.ValidationResult<{
  name: string;
  email: string;
  password: string;
}> => {
  const registerSchema: ObjectSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        "string.empty": "Name is required.",
        "string.min": "Name must be at least 2 characters.",
        "string.max": "Name must be at most 50 characters.",
        "string.pattern.base": "Name can only contain letters and spaces.",
      }),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Invalid email format.",
        "string.empty": "Email is required.",
      }),

    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long.",
      "string.max": "Password cannot exceed 20 characters.",
    }),
  });

  return registerSchema.validate(body);
};

// -------------------- VERIFY EMAIL --------------------

export const validateVerifyEmailBody = (
  body: unknown,
): ValidationResult<{
  email: string;
  code: string;
}> => {
  const schema: ObjectSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Invalid email format.",
        "string.empty": "Email is required.",
      }),

    code: Joi.string()
      .pattern(/^\d{6}$/)
      .required()
      .messages({
        "string.pattern.base": "Code must be exactly 6 digits.",
        "string.empty": "Code is required.",
      }),
  });

  return schema.validate(body);
};

// -------------------- LOGIN --------------------

export const validateLogin = (
  body: unknown,
): ValidationResult<{
  email: string;
  password: string;
}> => {
  const schema: ObjectSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(3)
      .required()
      .messages({
        "string.email": "Invalid email format.",
        "string.empty": "Email is required.",
      }),

    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": "Password is required to Login",
      "string.min": "Password must be at least 6 characters long.",
      "string.max": "Password cannot exceed 20 characters.",
    }),
  });

  return schema.validate(body);
};

// -------------------- SEND CODE --------------------

export const validateSendVerificationCode = (
  body: unknown,
): ValidationResult<{ email: string }> => {
  const schema: ObjectSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(3)
      .required()
      .messages({
        "string.email": "Invalid email format.",
        "string.empty": "Email is required.",
      }),
  });

  return schema.validate(body);
};

// -------------------- PASSWORD --------------------

export const validatePassword = (
  body: unknown,
): ValidationResult<{ password: string }> => {
  const schema: ObjectSchema = Joi.object({
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long.",
      "string.max": "Password cannot exceed 20 characters.",
    }),
  });

  return schema.validate(body);
};

// -------------------- CHANGE PASSWORD --------------------

export const validateChangePwdBody = (
  body: unknown,
): ValidationResult<{
  oldPassword: string;
  newPassword: string;
}> => {
  const schema: ObjectSchema = Joi.object({
    oldPassword: Joi.string().min(6).max(20).required().messages({
      "string.empty": "Both current and new passwords are required",
      "string.min": "Password must be at least 6 characters long.",
      "string.max": "Password cannot exceed 20 characters.",
    }),

    newPassword: Joi.string().min(6).max(20).required().messages({
      "string.empty": "Both current and new passwords are required",
      "string.min": "Password must be at least 6 characters long.",
      "string.max": "Password cannot exceed 20 characters.",
    }),
  });

  return schema.validate(body);
};

// -------------------- FORGET PASSWORD --------------------

export const validateForgetPasswordBody = (
  body: unknown,
): ValidationResult<{ email: string }> => {
  const schema: ObjectSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(3)
      .required()
      .messages({
        "string.email": "Invalid email format.",
        "string.empty": "Email is required.",
      }),
  });

  return schema.validate(body);
};

// -------------------- RESET PASSWORD --------------------

export const validateResetPasswordBody = (
  body: unknown,
): ValidationResult<{
  email: string;
  code: string;
  newPassword: string;
}> => {
  const schema: ObjectSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(3)
      .required()
      .messages({
        "string.email": "Invalid email format.",
        "string.empty": "Email is required.",
      }),

    code: Joi.string()
      .pattern(/^\d{6}$/)
      .required()
      .messages({
        "string.pattern.base": "Code must be exactly 6 digits.",
        "string.empty": "Code is required.",
      }),

    newPassword: Joi.string().min(6).max(20).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long.",
      "string.max": "Password cannot exceed 20 characters.",
    }),
  });

  return schema.validate(body);
};
