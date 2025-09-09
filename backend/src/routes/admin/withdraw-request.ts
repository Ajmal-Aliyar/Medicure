import { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import {
  IAdminWithdrawRequestController,
  IWithdrawRequestController,
} from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";

export const createWithdrawRequestRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const adminWithdrawRequest = container.get<IAdminWithdrawRequestController>(
    TYPES.AdminWithdrawRequestController
  );
  const withdrawRequest = container.get<IWithdrawRequestController>(
    TYPES.WithdrawRequestController
  );

  router
    .route("/")
    .get(asyncHandler(adminWithdrawRequest.getWithdrawRequests))
    .post(asyncHandler(withdrawRequest.createWithdrawRequest))
    .patch(asyncHandler(adminWithdrawRequest.rejectWidthdrawRequest));
  router
    .route("/approve")
    .patch(asyncHandler(adminWithdrawRequest.approveWithdrawRequest));

  return router;
};
