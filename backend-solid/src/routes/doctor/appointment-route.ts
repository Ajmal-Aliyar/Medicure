import { IAppointmentController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { authenticateAccessToken, authorizeRoles } from "@/middlewares";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createAppointmentRouter = (): Router => {
  const router = Router();
  const container = getContainer()
  const appointmentController = container.get<IAppointmentController>(TYPES.AppointmentController)

  router.get('/', asyncHandler(appointmentController.getAppointmentsCardDetails))
  router.get('/:roomId', asyncHandler(appointmentController.getAppointmentByRoomId))
  
  return router;
};
