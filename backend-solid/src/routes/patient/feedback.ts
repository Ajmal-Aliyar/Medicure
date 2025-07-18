import { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import { IPatientFeedbackController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";


export const createFeedbackRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const patientFeedbackService = container.get<IPatientFeedbackController>(TYPES.PatientFeedbackController)

  router.get('/', asyncHandler(patientFeedbackService.getFeedbacksByPatientId))

 
  return router;
};
