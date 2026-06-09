import express from "express";
import cookieParser from "cookie-parser";
// import logger from "morgan";
import cors from "cors";
import { errorHandler } from "./middleware/error.js";
import apiRouter from "./routes/index.routes.js";

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

app.use("/api", apiRouter);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
