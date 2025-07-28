import { IPatientMedicalRecordController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";
import { Router } from "express";
import multer from "multer";

export const createMedicalRecordRouter = (): Router => {
  const router = Router();
  const container = getContainer();
  const patientMedicalRecordController = container.get<IPatientMedicalRecordController>(
      TYPES.PatientMedicalRecordController
    );

  router.get( "/",
    asyncHandler(patientMedicalRecordController.getMedicalRecords)
  );

  const upload = multer({ storage: multer.memoryStorage() });

  router.post(
    "/upload",
    upload.single("file"),
    asyncHandler(patientMedicalRecordController.uploadMedicalRecord)
  );

  return router;
};
