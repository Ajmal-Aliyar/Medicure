import { Router } from "express";
import { getContainer } from "@/di";
import { Container } from "inversify";
import { authenticateAccessToken, authorizeRoles, validateRequest } from "@/middlewares";
import { IPatientController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";

export const createProfileRouter = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const patientController = container.get<IPatientController>(
    TYPES.PatientController
  );

  router.use(authenticateAccessToken, authorizeRoles('patient'));

  router.route("/").get(asyncHandler(patientController.getProfileDetails))

  return router;
};

