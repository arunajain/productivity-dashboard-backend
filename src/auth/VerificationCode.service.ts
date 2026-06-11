import User from "../repositories/User.js";
import VerificationCodeModel from "../repositories/VerificationCode.js";
import type { VerificationCode } from "../types/auth.types.js";
import { AppError } from "../errors/AppError.js";
export const clearVerificationCode = async (userId: number): Promise<void> => {
  await VerificationCodeModel.deleteByUserId(userId);
};

export const createVerificationCode = async (
  userId: number,
  code: string,
  expireAt: Date,
): Promise<void> => {
  await clearVerificationCode(userId);
  await VerificationCodeModel.create(userId, code, expireAt);
};

export const validateCode = async (
  email: string,
  code: string,
): Promise<VerificationCode | null> => {
  const user = await User.findByEmail(email);

  if (!user || !user.id) {
    return null;
  }

  const verifiedData = await VerificationCodeModel.findValidCode(user.id, code);
  if (!verifiedData) {
    throw new AppError("Verification code not found", 404);
  }
  return {
    id: verifiedData.id,
    userId: verifiedData.user_id,
    code: verifiedData.code,
    expires_at: verifiedData.expires_at,
  };
};
