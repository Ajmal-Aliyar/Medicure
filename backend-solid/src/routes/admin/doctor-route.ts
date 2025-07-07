import { IAdminDoctorController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { authenticateAccessToken, authorizeRoles } from "@/middlewares";
import { asyncHandler } from "@/utils";
import { Router } from "express";
import { Container } from "inversify";

export const createAdminDoctorRouter = (): Router => {
  const router = Router();
  const container: Container = getContainer();

  const adminDoctorController = container.get<IAdminDoctorController>(
    TYPES.AdminDoctorController
  );

  router.use(authenticateAccessToken, authorizeRoles("admin"));

  router.get(
    "/",
    asyncHandler(adminDoctorController.getDoctorsSummary)
  );

  router.get(
    "/:doctorId/profile",
    asyncHandler(adminDoctorController.getDoctorProfile)
  );

  router.get(
    "/:doctorId/approval-details",
    asyncHandler(adminDoctorController.getDoctorApprovalDetails)
  );

  router.patch(
    "/:doctorId/status",
    asyncHandler(adminDoctorController.updateDoctorStatus)
  );

  router.post(
    '/:doctorId/block', asyncHandler(adminDoctorController.blockDoctor)
  )

  router.post(
    '/:doctorId/unblock', asyncHandler(adminDoctorController.unblockDoctor)
  )

  return router;
};
