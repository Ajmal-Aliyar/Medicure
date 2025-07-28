import { Router } from "express";
import { authenticateAccessToken, validateRequest } from "@/middlewares";
import { IAuthController } from "@/controllers";
import { registerSchema, loginSchema, verifyOtpSchema, resendOtpSchema } from "@/validators";
import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { getContainer } from "@/di";
import { asyncHandler } from "@/utils";

export const createAuthRouter = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const authController = container.get<IAuthController>(TYPES.AuthController);

  router.post(
    "/register",
    validateRequest(registerSchema),
    asyncHandler(authController.register)
  );

  router.post(
    "/login",
    validateRequest(loginSchema),
    asyncHandler(authController.login)
  );

  router.post(
    "/verify-otp",
    validateRequest(verifyOtpSchema),
    asyncHandler(authController.verifyOtpAndRegister)
  );

  router.post(
    "/resend-otp",
    validateRequest(resendOtpSchema),
    asyncHandler(authController.resendOtp.bind(authController))
  );

  router.post(
    "/refresh-token",
    asyncHandler(authController.refreshToken)
  );

  router.post(
    "/logout",
    authenticateAccessToken,
    asyncHandler(authController.logout)
  );

  router.get("/me", authenticateAccessToken, asyncHandler(authController.me));

  return router;
};
