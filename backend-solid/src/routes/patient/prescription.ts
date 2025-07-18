import { IPrescriptionController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createPrescriptionRouter = (): Router => {
  const router = Router();
  const container = getContainer();
    const prescriptionController =
    container.get<IPrescriptionController>(
      TYPES.PrescriptionController
    );

    router.get('/:prescriptionId', asyncHandler(prescriptionController.getPrescription))

  return router;
};
