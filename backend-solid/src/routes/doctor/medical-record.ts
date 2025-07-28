import {
  IDoctorMedicalRecordController,
} from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createMedicalRecordRouter = (): Router => {
  const router = Router();
  const container = getContainer();
  const doctorMedicalRecordController =
    container.get<IDoctorMedicalRecordController>(
      TYPES.DoctorMedicalRecordController
    );

  router.get(
    "/:appointmentId",
    asyncHandler(
      doctorMedicalRecordController.getPatientMedicalRecordsByAppointmentId
    )
  );

  return router;
};
