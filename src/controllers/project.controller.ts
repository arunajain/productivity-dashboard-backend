import type { Request, Response, NextFunction } from "express";
import {
  validateCreateProject,
  validateUpdateProject,
} from "../validators/project.validator.js";
import { AppError } from "../errors/AppError.js";
import ProjectService from "../services/project.service.js";
import type { ProjectStatus } from "../types/project.types.js";
import { validateId } from "../validators/common.validators.js";
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateCreateProject(req.body);
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }
    const user_id = req.user.id;
    const result = await ProjectService.createProject({
      userId: user_id,
      ...value,
      status: value.status as ProjectStatus | undefined,
    });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const getProjectsByUserId = async (
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
    const result = await ProjectService.getProjectByUserId(value);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (
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
    const result = await ProjectService.getProjectById(value, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (
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
    const project = await ProjectService.deleteProjectById(value, req.user.id);
    res.status(200).json({ msg: "Project deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateUpdateProject({
      projectId: req.params.id,
      ...req.body,
    });
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }

    const project = await ProjectService.updateProject(
      { ...value, status: value.status as ProjectStatus | undefined },
      req.user.id,
    );
  } catch (err) {
    next(err);
  }
};
