import express from "express";
import {
  createTask,
  getTaskById,
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/tasks.controller.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
// Protect all goal routes
router.use(verifyToken);
// GET all + CREATE
router.route("/").get(getTasks).post(createTask);
// GET single + UPDATE + DELETE

router.route("/:id").get(getTaskById).delete(deleteTask).patch(updateTask);
// GET goals by project ID
router.route("/goal/:id/tasks").get(getTasks);
export default router;
