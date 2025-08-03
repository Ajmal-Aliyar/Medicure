import { Router } from "express";
import { IPatientSpecializationController } from "@/controllers";
import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { getContainer } from "@/di";
import { asyncHandler } from "@/utils";

export const createSpecialiazationRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const patientSpecializationController = container.get<IPatientSpecializationController>(TYPES.PatientSpecializationController);

  router.get('/', asyncHandler(patientSpecializationController.getPublicDetails))

 
  return router;
};
