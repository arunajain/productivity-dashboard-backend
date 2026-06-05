import pool from "../config/db.js";
import { AppError } from "../errors/AppError.js";
import type { VerificationCodeRow } from "../types/auth.types.js";

class VerificationCodeModel {
  static async deleteByUserId(userId: number): Promise<void> {
    await pool.query("DELETE FROM verification_codes WHERE user_id = $1", [
      userId,
    ]);
  }

  static async create(
    userId: number,
    code: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.deleteByUserId(userId);

    await pool.query(
      `INSERT INTO verification_codes (user_id, code, expires_at)
       VALUES ($1, $2, $3)`,
      [userId, code, expiresAt],
    );
  }

  static async findValidCode(
    userId: number,
    code: string,
  ): Promise<VerificationCodeRow | null> {
    const result = await pool.query(
      `SELECT *
       FROM verification_codes
       WHERE user_id = $1
         AND code = $2
         AND expires_at > NOW()`,
      [userId, code],
    );

    return result.rows[0] ?? null;
  }
}

export default VerificationCodeModel;
