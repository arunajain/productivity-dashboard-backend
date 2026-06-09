import express from "express";
const router = express.Router();
import AuthController from "../auth/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";
router.post("/register", AuthController.register);
router.post("/verify_email", AuthController.verifyEmail);
router.post("/login", AuthController.login);
router.post("/forgot_password", AuthController.forgotPassword);
router.post("/password_reset", AuthController.resetPassword);
router.get("/me", verifyToken, AuthController.authMe);
router.post("/password_change", verifyToken, AuthController.changePassword);
router.post("/logout", verifyToken, AuthController.logout);

export default router;
