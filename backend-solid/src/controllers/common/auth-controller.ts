import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { IAuthService } from "@/services";
import { TYPES } from "@/di/types";
import { IAuthController } from "@/controllers";
import { BadRequestError } from "@/errors";
import { AUTH_MESSAGES, HTTP_STATUS } from "@/constants";
import { successResponse } from "@/utils";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "@/config";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject(TYPES.AuthService) private readonly authService: IAuthService
  ) {}


  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password, role } = req.body;
    if (!email || !password) {
      throw new BadRequestError(
        AUTH_MESSAGES.ERROR.EMAIL_AND_PASSWORD_REQUIRED
      );
    }
    const { user, accessToken, refreshToken } = await this.authService.login({
      email,
      password,
      role,
    });
    this.setAuthCookies(res, accessToken, refreshToken);
    successResponse(
      res,
      HTTP_STATUS.OK,
      AUTH_MESSAGES.SUCCESS.LOGIN_SUCCESSFUL,
      user
    );
  };



  register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, fullName, mobile, role } = req.body;
    await this.authService.register({
      email,
      password,
      fullName,
      mobile,
      role,
    });
    successResponse(
      res,
      HTTP_STATUS.OK,
      AUTH_MESSAGES.SUCCESS.REGISTRATION_INITIATED
    );
  };



  verifyOtpAndRegister = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;
    const { accessToken, refreshToken, user } =
    await this.authService.verifyOtpAndRegister(email, otp);
    this.setAuthCookies(res, accessToken, refreshToken);
    successResponse(
      res,
      HTTP_STATUS.OK,
      AUTH_MESSAGES.SUCCESS.USER_REGISTERED_AND_AUTHORIZED,
      user
    );
  };




  refreshToken = async (req: Request, res: Response): Promise<void> => {
    console.log('refresh token');
    const token = req.cookies.refreshToken;
    const { user, accessToken, refreshToken } =
    await this.authService.refreshToken(token);
    this.setAuthCookies(res, accessToken, refreshToken);
    successResponse(
      res,
      HTTP_STATUS.OK,
      AUTH_MESSAGES.SUCCESS.TOKEN_REFRESHED,
      user
    );
  };




  logout = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError(AUTH_MESSAGES.ERROR.USER_ID_MISSING);
    }
    await this.authService.logout(userId);
    res.clearCookie("accessToken", COOKIE_OPTIONS);
    res.clearCookie("refreshToken", COOKIE_OPTIONS);
    successResponse(
      res,
      HTTP_STATUS.OK,
      AUTH_MESSAGES.SUCCESS.LOGOUT_SUCCESSFUL
    );
  };




  me = async (req: Request, res: Response): Promise<void> => {
    if (!req.user?.id || !req.user?.role) {
      throw new BadRequestError(AUTH_MESSAGES.ERROR.USER_ID_MISSING);
    }
    const { id: userId, role } = req.user;
    const user = await this.authService.me(userId, role);
    successResponse(
      res,
      HTTP_STATUS.OK,
      AUTH_MESSAGES.SUCCESS.PROFILE_FETCHED,
      user
    );
  };



  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string
  ): void {
    res.cookie("accessToken", accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
    res.cookie("refreshToken", refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
  }
}
