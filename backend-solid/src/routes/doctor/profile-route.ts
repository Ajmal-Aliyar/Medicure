import { Router } from "express";
import { getContainer } from "@/di";
import { Container } from "inversify";
import { authenticateAccessToken } from "@/middlewares";
import { IDoctorController } from "@/controllers";
import { TYPES } from "@/di/types";

export const createProfileRouter = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const doctorController = container.get<IDoctorController>(TYPES.DoctorController)
    
  router.patch("/image", authenticateAccessToken, (req, res, next) =>
    doctorController.updateProfileImage(req, res, next)
  );

  return router;
};
