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
    @inject(TYPES.AuthService) private readonly _authService: IAuthService
  ) {}


  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password, role } = req.body;
    if (!email || !password) {
      throw new BadRequestError(
        AUTH_MESSAGES.ERROR.EMAIL_AND_PASSWORD_REQUIRED
      );
    }
    const { user, accessToken, refreshToken } = await this._authService.login({
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
    await this._authService.register(req.body)
    successResponse(
      res,
      HTTP_STATUS.OK,
      AUTH_MESSAGES.SUCCESS.REGISTRATION_INITIATED
    );
  };



  verifyOtpAndRegister = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;
    const { accessToken, refreshToken, user } =
    await this._authService.verifyOtpAndRegister(email, otp);
    this.setAuthCookies(res, accessToken, refreshToken);
    successResponse(
      res,
      HTTP_STATUS.OK,
      AUTH_MESSAGES.SUCCESS.USER_REGISTERED_AND_AUTHORIZED,
      user
    );
  };



   resendOtp = async(req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    console.log(email,'email form resend otp')
    await this._authService.resendOtp(email);
    successResponse(
      res,
      HTTP_STATUS.OK,
      AUTH_MESSAGES.SUCCESS.OTP_RESENDED,
    );
  }




  refreshToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.refreshToken;
    const { user, accessToken, refreshToken } =
    await this._authService.refreshToken(token);
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
    await this._authService.logout(userId);
    res.clearCookie("accessToken", COOKIE_OPTIONS);
    res.clearCookie("refreshToken", COOKIE_OPTIONS);
    successResponse(
      res,
      HTTP_STATUS.OK,
      AUTH_MESSAGES.SUCCESS.LOGOUT_SUCCESSFUL,
      {success: true}
    );
  };




  me = async (req: Request, res: Response): Promise<void> => {
    if (!req.user?.id || !req.user?.role) {
      throw new BadRequestError(AUTH_MESSAGES.ERROR.USER_ID_MISSING);
    }
    const { id: userId, role } = req.user;
    const user = await this._authService.me(userId, role);
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
