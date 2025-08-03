import { Router } from "express";
import { getContainer } from "@/di";
import { Container } from "inversify";
import { validateRequest } from "@/middlewares";
import { IDoctorController } from "@/controllers";
import { TYPES } from "@/di/types";
import {
  professionalVerificationSchema,
  profileImageSchema,
  profileSchema,
  verificationProofsSchema,
} from "@/validators";
import { asyncHandler } from "@/utils";

export const createProfileRouter = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const doctorController = container.get<IDoctorController>(
    TYPES.DoctorController
  );


  router
    .route("/")
    .get(asyncHandler(doctorController.getProfileDetails))
    .patch(
      validateRequest(profileSchema),
      asyncHandler(doctorController.updateProfile)
    );

  router.patch("/image",
      validateRequest(profileImageSchema),
      asyncHandler(doctorController.updateProfileImage)
    );

  router
    .route("/professional")
    .get(
      asyncHandler(doctorController.getProfessionalDetails)
    )
    .patch(
      validateRequest(professionalVerificationSchema),
      asyncHandler(doctorController.updateProfessionalDetails)
    );

    router
    .route("/proofs")
    .get(
      asyncHandler(doctorController.getVerificationProofs)
    )
    .patch(
      validateRequest(verificationProofsSchema),
      asyncHandler(doctorController.updateVerificationProofs)
    );

    router.patch('/request-review', asyncHandler(doctorController.submitForReview))

  return router;
};

