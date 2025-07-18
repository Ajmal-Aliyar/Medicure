import { IDoctorPrescriptionController, IPrescriptionController, PrescriptionController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { validateRequest } from "@/middlewares";
import { asyncHandler } from "@/utils";
import { prescriptionSchema } from "@/validators";
import { Router } from "express";

export const createPrescriptionRouter = (): Router => {
  const router = Router();
  const container = getContainer();
  const doctorPrescriptionController =
    container.get<IDoctorPrescriptionController>(
      TYPES.DoctorPrescriptionController
    );

    const prescriptionController =
    container.get<IPrescriptionController>(
      TYPES.PrescriptionController
    );

  router
    .route("/")
    .post( validateRequest(prescriptionSchema), asyncHandler(doctorPrescriptionController.createPrescription))
    .put(asyncHandler(doctorPrescriptionController.updatePrescription));

    router.get('/:prescriptionId', asyncHandler(prescriptionController.getPrescription))

  return router;
};
