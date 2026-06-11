import bcrypt from "bcryptjs";
import User from "../repositories/User.js";
import type { ApiResponse } from "../types/common.types.js";
import type {
  RegisterDTO,
  RegisterResponse,
  LoginDTO,
  LoginResponse,
  VerifyEmailDTO,
  ChangePasswordDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
} from "../types/auth.types.js";
import TokenService from "./token.service.js";
import {
  createVerificationCode,
  validateCode,
  clearVerificationCode,
} from "./VerificationCode.service.js";

import { AppError } from "../errors/AppError.js";
import generateRandomCode from "../utils/generateRandomCode.js";
import { sendEmail } from "../utils/email/sendEmail.js";
import type { UserPublic } from "../types/user.types.js";
import { clear } from "node:console";

class AuthService {
  // ---------------- REGISTER ----------------
  static async register(
    data: RegisterDTO,
  ): Promise<ApiResponse<RegisterResponse>> {
    const { name, email, password } = data;
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new AppError("User already exists with this email", 409);
    }
    const parts = name.trim().split(/\s+/);
    if (!parts[0]) {
      throw new AppError("Please provide valid name", 400);
    }
    const formattedName = parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.createUser(formattedName, email, hashedPassword);
    if (!user) {
      throw new AppError("User creation failed", 500);
    }
    const emailCode = generateRandomCode(6);
    console.log("Generated email code:", emailCode); //remove for production
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); //15 mins
    await createVerificationCode(user.id, emailCode, expiresAt);

    // fire & forget email
    // await sendEmail({
    //   email,
    //   name: formattedName,
    //   code: emailCode,
    //   type: "register",
    // });

    // try {
    //   sendEmail({
    //     email,
    //     name: formattedName,
    //     code: emailCode,
    //     type: "register",
    //   });
    // } catch (err) {
    //   console.error("Failed to send verification email:", err);
    // }
    return {
      success: true,
      message: "Verification code sent to verify email.",
      data: { user },
    };
  }
  // ---------------- VERIFY EMAIL ----------------
  static async verifyEmail(data: VerifyEmailDTO): Promise<ApiResponse> {
    const { email, code } = data;
    const record = await validateCode(email, code);
    if (!record) {
      throw new AppError("Invalid or expired code", 400);
    }

    const user = await User.getById(record.userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    if (user.is_verified) {
      return {
        success: true,
        message: "Email already verified",
      };
    }
    await clearVerificationCode(record.userId);
    await User.updateUserSingleColumn("is_verified", true, record.userId);

    return {
      success: true,
      message: "Email verified successfully",
    };
  }

  // ---------------- LOGIN ----------------
  static async login(data: LoginDTO): Promise<ApiResponse<LoginResponse>> {
    const user = await User.findByEmail(data.email);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    if (!user.is_verified) {
      throw new AppError("Email not verified", 403); //forbidden
    }

    const isMatch = await bcrypt.compare(data.password, user.password_hash);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }
    const token = TokenService.generateAccessToken(user.id);
    return {
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    };
  }

  // ---------------- CHANGE PASSWORD ----------------
  static async changePassword(
    userId: number,
    data: ChangePasswordDTO,
  ): Promise<ApiResponse> {
    const { currentPassword, newPassword } = data;
    const user = await User.getById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      throw new AppError("Incorrect current password", 400);
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.updateUserSingleColumn("password_hash", hashed, userId);
    return { success: true, message: "Password changed successfully" };
  }

  // ---------------- FORGOT PASSWORD ----------------
  static async forgotPassword(data: ForgotPasswordDTO): Promise<ApiResponse> {
    const { email } = data;
    const user = await User.findByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const code = generateRandomCode(6);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await clearVerificationCode(user.id);
    await createVerificationCode(user.id, code, expiresAt);

    await sendEmail({ email, name: user.name, code, type: "reset" });

    return {
      success: true,
      message: "Reset code sent to email",
    };
  }

  // ---------------- RESET PASSWORD ----------------
  static async resetPassword(data: ResetPasswordDTO): Promise<ApiResponse> {
    const { email, code, newPassword } = data;
    const record = await validateCode(email, code);
    if (!record) {
      throw new AppError("Invalid or expired code", 400);
    }
    await clearVerificationCode(record.userId);
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.updateUserSingleColumn("password_hash", hashed, record.userId);
    return {
      success: true,
      message: "Password reset successfully",
    };
  }

  // ---------------- AUTH ME ----------------
  static async authMe(userId: number): Promise<ApiResponse<UserPublic>> {
    const user = await User.getById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return {
      success: true,
      message: "User has been authorized successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export default AuthService;
