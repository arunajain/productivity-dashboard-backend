import type { Request, Response, NextFunction } from "express";
import {
  validateNote,
  validateUpdateNote,
  validateNoteId,
} from "../validators/note.validator.js";
import { AppError } from "../errors/AppError.js";
import NoteService from "../services/note.service.js";

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateNote(req.body);
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }
    const { title, content } = value;
    const user_id = req.user.id;
    const result = await NoteService.createNote({
      title,
      content,
      userId: user_id,
    });
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

export const getNotesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const notes = await NoteService.getNotesByUserId(req.user.id);
    res.status(200).json({ notes });
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateNoteId(req.params.id);
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }
    const result = await NoteService.deleteNoteById(value.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateUpdateNote({
      noteId: req.params.id,
      ...req.body,
    });
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }
    const result = await NoteService.updateNoteById({
      userId: req.user.id,
      ...value,
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = validateNoteId(req.params.id);
    if (error) {
      throw new AppError(
        error.details?.[0]?.message ?? "Validation error",
        422,
      );
    }
    const result = await NoteService.getNoteById(value.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
