import express, { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import { IPatientAppointmentController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";

export const createAppointmentRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const appointmentController = container.get<IPatientAppointmentController>(
    TYPES.PatientAppointmentController
  );

  router.get('/', asyncHandler(appointmentController.getAppointmentsByPatientId))

  return router;
};
