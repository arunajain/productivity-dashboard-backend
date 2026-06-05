import express from "express";
import {
  createGoal,
  getGoals,
  getGoalById,
  deleteGoal,
  updateGoal,
  getGoalsByProjectId,
} from "../controllers/goal.controller.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
// Protect all goal routes
router.use(verifyToken);
// GET all + CREATE
router.route("/").get(getGoals).post(createGoal);
// GET single + UPDATE + DELETE

router.route("/:id").get(getGoalById).delete(deleteGoal).patch(updateGoal);
// GET goals by project ID
router.route("/project/:projectId/goals").get(getGoalsByProjectId);
export default router;
