import { Router } from "express";
import { getContainer } from "@/di";
import { Container } from "inversify";
import { IPatientController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";

export const createProfileRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const patientController = container.get<IPatientController>(
    TYPES.PatientController
  );

  

  router
    .route("/")
    .get(asyncHandler(patientController.getProfileDetails))
    .patch(asyncHandler(patientController.updateProfile));

    router.patch("/image",
        //   validateRequest(profileImageSchema),
          asyncHandler(patientController.updateProfileImage)
        );

  return router;
};
