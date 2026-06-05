import pool from "../config/db.js";
import type { UserDataRow, UserPublic } from "../types/user.types.js";

class User {
  static async getById(user_id: number): Promise<UserDataRow | undefined> {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      user_id,
    ]);

    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<UserDataRow | undefined> {
    const result = await pool.query(
      `SELECT id, name, email, password_hash, is_verified
       FROM users
       WHERE email = $1`,
      [email],
    );

    return result.rows[0];
  }

  static async createUser(
    name: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserPublic | undefined> {
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING
       RETURNING id, name, email`,
      [name, email, hashedPassword],
    );

    return result.rows[0];
  }

  static async updateUserSingleColumn(
    columnName: "name" | "email" | "is_verified" | "password_hash",
    columnValue: string | boolean,
    userId: number,
  ): Promise<void> {
    const query = `UPDATE users SET ${columnName} = $1 WHERE id = $2`;

    await pool.query(query, [columnValue, userId]);
  }
}

export default User;
