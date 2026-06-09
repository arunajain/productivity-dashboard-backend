import express from "express";
import authRouter from "./auth.routes.js";
import goalRoutes from "./goal.routes.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Routes
// app.use("/", indexRouter);
// app.use("/api/users", verifyToken, usersRouter);
router.use("/auth", authRouter);
// app.use("/api/projects", verifyToken, projectRoutes);
// app.use("/api/notes", verifyToken, notesRoutes);
router.use("/goals", goalRoutes);
// app.use("/api/todos", verifyToken, todoRoutes);

export default router;
