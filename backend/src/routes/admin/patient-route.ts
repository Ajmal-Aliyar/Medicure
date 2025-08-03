import { IAdminPatientController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";
import { Router } from "express";
import { Container } from "inversify";

export const createAdminPatientRouter = (): Router => {
  const router = Router();
  const container: Container = getContainer();

  const adminPatientController = container.get<IAdminPatientController>(
    TYPES.AdminPatientController
  );


  router.get(
    "/",
    asyncHandler(adminPatientController.getPatientsSummary)
  );

  router.get(
    "/:PatientId/profile",
    asyncHandler(adminPatientController.getPatientProfile)
  );

  router.post(
    '/:PatientId/block', asyncHandler(adminPatientController.blockPatient)
  )

  router.post(
    '/:PatientId/unblock', asyncHandler(adminPatientController.unblockPatient)
  )

  return router;
};
