import { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import { IAppointmentController, IFeedbackController, IPatientFeedbackController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";

export const createAppointmentRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const appointmentController = container.get<IAppointmentController>(
    TYPES.AppointmentController
  );
  const feedbackController = container.get<IFeedbackController>(
    TYPES.FeedbackController
  );

  router.get(
    "/",
    asyncHandler(appointmentController.getAppointmentsCardDetails)
  );
   router.get(
    "/room/:roomId",
    asyncHandler(appointmentController.getAppointmentByRoomId)
  );

  router.get(
    "/id/:appointmentId",
    asyncHandler(appointmentController.getAppointmentById)
  );

  router.get("/:appointmentId/feedback", asyncHandler(feedbackController.getFeedbackByAppointmentId))

  return router;
};
