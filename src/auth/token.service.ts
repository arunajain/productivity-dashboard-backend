import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";
class TokenService {
  private static accessSecret = process.env.JWT_SECRET_KEY;
  private static refreshSecret = process.env.REFRESH_TOKEN_SECRET_KEY;
  static generateAccessToken(userId: number): string {
    if (!this.accessSecret) throw new AppError("Missing access secret", 500);
    return jwt.sign({ id: userId }, this.accessSecret, {
      expiresIn: "1h",
    });
  }
  static generateRefreshToken(userId: number): string {
    if (!this.refreshSecret) throw new AppError("Missing refresh secret", 500);
    return jwt.sign({ id: userId }, this.refreshSecret, {
      expiresIn: "7d",
    });
  }
}
export default TokenService;
