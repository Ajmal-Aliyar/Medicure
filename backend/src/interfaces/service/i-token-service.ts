import { IRole } from "@/interfaces";
export interface ITokenService {
  generateAccessToken(payload: object): string;
  generateRefreshToken(payload: object): string;
  verifyAccessToken(token: string): { id: string, role: IRole };
  verifyRefreshToken(token: string): { id: string, role: IRole };
}
