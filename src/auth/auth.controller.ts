import type { Request, Response, NextFunction } from "express";
import {
  validateChangePwdBody,
  validateForgetPasswordBody,
  validateLogin,
  validateRegister,
  validateResetPasswordBody,
  validateVerifyEmailBody,
} from "../validators/auth.validator.js";
import AuthService from "./auth.service.js";
import { AppError } from "../errors/AppError.js";
class AuthController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error, value } = validateRegister(req.body);
      if (error) {
        throw new AppError(
          error.details?.[0]?.message ?? "Validation error",
          422,
        );
      }

      const { name, email, password } = value;
      const result = await AuthService.register({ name, email, password });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error, value } = validateVerifyEmailBody(req.body);
      if (error) {
        throw new AppError(
          error.details?.[0]?.message ?? "Validation error",
          422,
        );
      }
      const { email, code } = value;
      const result = await AuthService.verifyEmail({ email, code });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error, value } = validateLogin(req.body);
      if (error) {
        throw new AppError(
          error.details?.[0]?.message ?? "Validation error",
          422,
        );
      }
      const { email, password } = value;
      const result = await AuthService.login({ email, password });
      res.cookie("token", result?.data?.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: result?.data?.user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error, value } = validateChangePwdBody(req.body);
      if (error) {
        throw new AppError(
          error.details?.[0]?.message ?? "Validation Error",
          422,
        );
      }

      const { currentPassword, newPassword } = req.body;
      const result = await AuthService.changePassword(req.user.id, {
        currentPassword,
        newPassword,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error, value } = validateForgetPasswordBody(req.body);
      if (error) {
        throw new AppError(
          error.details?.[0]?.message || "Validation Error",
          422,
        );
      }

      const { email } = req.body;
      const result = await AuthService.forgotPassword({ email });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error, value } = validateResetPasswordBody(req.body);
      if (error) {
        throw new AppError(
          error.details?.[0]?.message ?? "Validation Error",
          422,
        );
      }
      const result = await AuthService.resetPassword(value);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async authMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await AuthService.authMe(req.user!.id);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }
}

export default AuthController;
