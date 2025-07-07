import { IAdminAppointmentController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { authenticateAccessToken, authorizeRoles } from "@/middlewares";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createAppointmentRouter = (): Router => {
  const router = Router();
  const container = getContainer()
  const appointmentController = container.get<(IAdminAppointmentController)>(TYPES.AdminAppointmentController)


  router.get('/', asyncHandler(appointmentController.getAppointmentsByAdminId))
  
  return router;
};
