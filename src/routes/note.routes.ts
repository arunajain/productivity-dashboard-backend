import express from "express";
import {
  createNote,
  getNotesByUserId,
  deleteNote,
  updateNote,
} from "../controllers/notes.js";

import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();
router.post("/", verifyToken, createNote);
router.get("/", verifyToken, getNotesByUserId);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

export default router;
