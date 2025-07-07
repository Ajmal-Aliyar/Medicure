import { IDoctorAppointmentController, IDoctorSlotController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { authenticateAccessToken, authorizeRoles } from "@/middlewares";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createAppointmentRouter = (): Router => {
  const router = Router();
  const container = getContainer()
  const appointmentController = container.get<IDoctorAppointmentController>(TYPES.DoctorAppointmentController)

  router.use(authenticateAccessToken, authorizeRoles('doctor'))

  router.get('/', asyncHandler(appointmentController.getAppointmentsByDoctorId))
  
  return router;
};
