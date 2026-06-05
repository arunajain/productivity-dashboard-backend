import type { Request, Response, NextFunction } from "express";
import JwtService from "../auth/jwt.service.js";
import type { JwtPayload } from "../types/auth.types.js";
import { AppError } from "../errors/AppError.js";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new AppError("Access token required", 401));
  }

  try {
    const decoded = JwtService.verify(token) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 403));
  }
};
