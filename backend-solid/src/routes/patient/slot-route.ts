import { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import { IPatientSlotController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";


export const createSlotRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const patientSlotController = container.get<IPatientSlotController>(TYPES.PatientSlotController);

  router.get('/', asyncHandler(patientSlotController.getDoctorSlotsForBooking))

 
  return router;
};
