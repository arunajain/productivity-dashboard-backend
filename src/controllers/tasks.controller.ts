import type { Request, Response, NextFunction } from "express";
import {
  validateCreateTask,
  validateUpdateTask,
} from "../validators/task.validator.js";
import { validateId } from "../validators/common.validators.js";
import { AppError } from "../errors/AppError.js";
import TaskService from "../services/task.service.js";
import type {
  SortOrder,
  TaskQueryOptions,
  TaskStatus,
} from "../types/task.types.js";
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateCreateTask(req.body);
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }
    const result = await TaskService.createtask(value, req.user.id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const options: TaskQueryOptions = {};
    if (req.params.id) options["goalId"] = Number(req.params.id);
    if (
      req.query.status &&
      ["inactive", "in_progress", "completed"].includes(
        req.query.status.toString().toLowerCase(),
      )
    )
      options["status"] = req.query.status
        .toString()
        .toLowerCase() as TaskStatus;
    if (req.query.limit) options["limit"] = Number(req.query.limit);
    if (req.query.offset) options["offset"] = Number(req.query.offset);
    if (req.query.sortBy) options["sortBy"] = req.query.sortBy.toString();
    if (
      req.query.sortOrder &&
      ["ASC", "DESC"].includes(req.query.sortOrder.toString().toUpperCase())
    ) {
      options["sortOrder"] = req.query.sortOrder
        .toString()
        .toUpperCase() as SortOrder;
    }

    const result = await TaskService.getTasks(options, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (
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
    const result = await TaskService.getTaskById(value, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (
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
    const result = await TaskService.deletetaskById(value, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateUpdateTask({
      goalId: req.params.id,
      ...req.body,
    });
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }
    const result = await TaskService.updateTaskById(value, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
