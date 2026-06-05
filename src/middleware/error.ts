import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import type { ApiResponse } from "../types/common.types.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let statusCode = err.statusCode || 500;
  let message = "Internal Server Error";
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  console.log("Error", err);
  res.status(statusCode).json({
    success: false,
    message,
  });
};

// 🧠 Bonus (PRO LEVEL upgrade)

// Later you can extend:
// export enum ErrorType {

//   VALIDATION = 400,

//   UNAUTHORIZED = 401,

//   FORBIDDEN = 403,

//   NOT_FOUND = 404,

//   SERVER = 500

// }
