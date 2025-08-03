import jwt from "jsonwebtoken";
import { injectable } from "inversify";
import { env } from "@/config";
import { IRole } from "@/interfaces";
import { ITokenService } from "@/interfaces/service/i-token-service";

@injectable()
export class JwtService implements ITokenService {
  private accessTokenSecret = env.ACCESS_TOKEN_SECRET;
  private refreshTokenSecret = env.REFRESH_TOKEN_SECRET;

  generateAccessToken(payload: object): string {
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: "15m" });
  }

  generateRefreshToken(payload: object): string {
    return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: "7d" });
  }

  verifyAccessToken(token: string):{ id: string, role: IRole } {
    return jwt.verify(token, this.accessTokenSecret) as { id: string, role: IRole } ;
  }

  verifyRefreshToken(token: string): { id: string, role: IRole } {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as { id: string, role: IRole }
  }
}