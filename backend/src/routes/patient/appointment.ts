import { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import { IAppointmentController, IFeedbackController, IPatientAppointmentController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";
export const createAppointmentRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const appointmentController = container.get<IAppointmentController>(
    TYPES.AppointmentController
  );
  const patientAppointmentController = container.get<IPatientAppointmentController>(
    TYPES.PatientAppointmentController
  );
  const feedbackController = container.get<IFeedbackController>(
    TYPES.FeedbackController
  );

  router.get(
    "/",
    asyncHandler(appointmentController.getAppointmentsCardDetails)
  );
  router.patch(
    "/:appointmentId/cancel",
    asyncHandler(patientAppointmentController.cancelAppointment)
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
