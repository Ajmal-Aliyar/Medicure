import { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import { IAppointmentController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";

export const createAppointmentRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
   const appointmentController = container.get<IAppointmentController>(TYPES.AppointmentController)
  
    router.get('/', asyncHandler(appointmentController.getAppointmentsCardDetails))
    router.get('/:roomId', asyncHandler(appointmentController.getAppointmentByRoomId))

  return router;
};
