import { Router } from "express";
import { IPatientDoctorController, IPatientSpecializationController } from "@/controllers";
import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { getContainer } from "@/di";
import { asyncHandler } from "@/utils";

export const createDoctorRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const doctorController = container.get<IPatientDoctorController>(TYPES.PatientDoctorController);

  router.get('/', asyncHandler(doctorController.getPublicDetails))

 
  return router;
};
