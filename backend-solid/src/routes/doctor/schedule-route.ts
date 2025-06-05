import { IDoctorScheduleController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import {
  authenticateAccessToken,
  authorizeRoles,
  validateRequest,
} from "@/middlewares";
import { asyncHandler } from "@/utils";
import {
  updateDoctorScheduleSchema,
} from "@/validators";
import { Router } from "express";
import { Container } from "inversify";

export const createDoctorScheduleRouter = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const doctorScheduleController = container.get<IDoctorScheduleController>(
    TYPES.DoctorScheduleController
  );

  router.use(authenticateAccessToken, authorizeRoles("doctor"));

  router
    .route("/")
    .get(
      asyncHandler(doctorScheduleController.getSchedule)
    )
    .post(
      validateRequest(updateDoctorScheduleSchema),
      asyncHandler(doctorScheduleController.updateSchedule)
    );
  return router;
};
