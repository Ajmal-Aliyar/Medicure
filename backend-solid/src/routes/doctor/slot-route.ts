import { IDoctorSlotController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { authenticateAccessToken, authorizeRoles } from "@/middlewares";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createDoctorSlotRouter = (): Router => {
  const router = Router();
  const container = getContainer()
  const doctorSlotController = container.get<IDoctorSlotController>(TYPES.DoctorSlotController)

  router.use(authenticateAccessToken, authorizeRoles('doctor'))

  router.get('/', asyncHandler(doctorSlotController.getSlotsByDoctorAndDate))
  
  return router;
};
