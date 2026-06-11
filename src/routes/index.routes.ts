import express from "express";
import authRoutes from "./auth.routes.js";
import projectRoutes from "./project.routes.js";
import goalRoutes from "./goal.routes.js";
import taskRoutes from "./task.routes.js";
import noteRoutes from "./note.routes.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/api/project", projectRoutes);
router.use("/api/goal", goalRoutes);
router.use("/api/notes", noteRoutes);
router.use("/api/todos", taskRoutes);

export default router;
