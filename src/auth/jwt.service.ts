import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

class JwtService {
  private static secret = process.env.JWT_SECRET_KEY;
  static sign(payload: object): string {
    if (!this.secret) throw new AppError("JWT secret missing", 500);
    return jwt.sign(payload, this.secret, {
      expiresIn: "1h",
    });
  }

  static verify(token: string): string | jwt.JwtPayload {
    if (!this.secret) throw new AppError("JWT secret missing", 500);
    return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  }
}

export default JwtService;
