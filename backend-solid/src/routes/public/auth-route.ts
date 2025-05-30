import { Router } from "express";
import { authenticateAccessToken, validateRequest } from "@/middlewares";
import { IAuthController } from "@/controllers";
import {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
} from "@/validators";
import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { getContainer } from '@/di'


export const createAuthRouter = (): Router => {
  const router = Router();
  const container: Container = getContainer()
  const authController = container.get<IAuthController>(TYPES.AuthController);
  
  router.post("/register", validateRequest(registerSchema), (req, res, next) =>
    authController.register(req, res, next)
  );

  router.post("/login", validateRequest(loginSchema), (req, res, next) =>
    authController.login(req, res, next)
  );

  router.post(
    "/verify-otp",
    validateRequest(verifyOtpSchema),
    (req, res, next) => authController.verifyOtpAndRegister(req, res, next)
  );

  router.post("/refresh-token", (req, res, next) =>
    authController.refreshToken(req, res, next)
  );

  router.post("/logout", authenticateAccessToken, (req, res, next) =>
    authController.logout(req, res, next)
  );

  router.get("/me", authenticateAccessToken, (req, res, next) =>
    authController.me(req, res, next)
  );

  return router;
};
