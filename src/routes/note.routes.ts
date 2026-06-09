import express from "express";
import {
  createNote,
  getNotesByUserId,
  deleteNote,
  updateNote,
  getNoteById,
} from "../controllers/note.controller.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.use(verifyToken);
router.route("/").post(createNote).get(getNotesByUserId);
router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

export default router;
