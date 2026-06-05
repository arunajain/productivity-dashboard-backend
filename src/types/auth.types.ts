import type User from "../models/User.js";
import type { UserPublic } from "./user.types.js";

export interface JwtPayload {
  id: number;
  email?: string;
  iat?: number;
  exp?: number;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: UserPublic;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserPublic;
}

export interface VerifyEmailDTO {
  email: string;
  code: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  email: string;
  code: string;
  newPassword: string;
}

export interface VerificationCodeRow {
  id: number;
  user_id: number;
  code: string;
  expires_at: Date;
}

export interface VerificationCode {
  id: number;
  userId: number;
  code: string;
  expires_at: Date;
}
