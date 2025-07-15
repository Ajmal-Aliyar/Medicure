import { IAppointmentController, IDoctorAppointmentController, IFeedbackController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createAppointmentRouter = (): Router => {
  const router = Router();
  const container = getContainer()
  const appointmentController = container.get<IAppointmentController>(TYPES.AppointmentController)
   const doctorAppointmentController = container.get<IDoctorAppointmentController>(TYPES.DoctorAppointmentController)
   const feedbackController = container.get<IFeedbackController>(TYPES.FeedbackController)

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

  router.patch("/:roomId/mark-completed",
    asyncHandler(doctorAppointmentController.markAppointmentCompleted)
  );

  router.get(
    "/:appointmentId/feedback",
    asyncHandler(feedbackController.getFeedbackByAppointmentId)
  );
  return router;
};
