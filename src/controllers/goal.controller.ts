import type { Request, Response, NextFunction } from "express";
import {
  validateCreateGoal,
  validateUpdateGoal,
} from "../validators/goal.validator.js";
import { validateId } from "../validators/common.validators.js";
import { AppError } from "../errors/AppError.js";
import GoalService from "../services/goal.service.js";
export const createGoal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateCreateGoal(req.body);
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }
    const result = await GoalService.createGoal(value, req.user.id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const getGoals = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await GoalService.getGoals(req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getGoalById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateId(req.params.id);
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }
    const result = await GoalService.getGoalById(value, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getGoalsByProjectId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateId(req.params.id);
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }
    const result = await GoalService.getGoalsByProject(value);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteGoal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateId(req.params.id);
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }
    const result = await GoalService.deleteGoalById(value, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateGoal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateUpdateGoal({
      goalId: req.params.id,
      ...req.body,
    });
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }
    const result = await GoalService.updateGoalById(value, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
