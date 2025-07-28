import { IAppointmentController, IFeedbackController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createAppointmentRouter = (): Router => {
  const router = Router();
  const container = getContainer()
  const appointmentController = container.get<(IAppointmentController)>(TYPES.AppointmentController)
    const feedbackController = container.get<IFeedbackController>(
      TYPES.FeedbackController
    );

  router.get('/', asyncHandler(appointmentController.getAppointmentsCardDetails))
  router.get(
    "/id/:appointmentId",
    asyncHandler(appointmentController.getAppointmentById)
  );

  router.get("/:appointmentId/feedback", asyncHandler(feedbackController.getFeedbackByAppointmentId))

  
  return router;
};
