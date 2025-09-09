import { Router } from "express";
import { ISpecializationController } from "@/controllers";
import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { getContainer } from "@/di";
import { asyncHandler } from "@/utils";

export const createSpecialiazationRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const patientSpecializationController = container.get<ISpecializationController>(TYPES.SpecializationController);

  router.get('/', asyncHandler(patientSpecializationController.getPublicDetails))
  router.get('/:specialization', asyncHandler(patientSpecializationController.getSpecializationDetails))

 
  return router;
};
