import express from "express";
import {
  createProject,
  getProjectsByUserId,
  getProjectById,
  deleteProject,
  updateProject,
} from "../controllers/project.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { create } from "node:domain";
var router = express.Router();

router.use(verifyToken);

router.route("/").get(getProjectsByUserId).post(createProject);
router
  .route("/:id")
  .get(getProjectById)
  .delete(deleteProject)
  .patch(updateProject);

export default router;
