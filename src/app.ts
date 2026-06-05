import express from "express";
import cookieParser from "cookie-parser";
// import logger from "morgan";
import cors from "cors";

import { errorHandler } from "./middleware/error.js";

// import indexRouter from "./routes/index.routes.js";
// import usersRouter from "./routes/user.routes.js";
// import authRouter from "./routes/auth.routes.js";
// import projectRoutes from "./routes/project.routes.js";
import goalRoutes from "./routes/goal.routes.js";
// import todoRoutes from "./routes/todo.routes.js";
// import notesRoutes from "./routes/note.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/projects", projectRoutes);
// app.use("/api/notes", notesRoutes);
app.use("/api/goals", goalRoutes);
// app.use("/api/todos", todoRoutes);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
