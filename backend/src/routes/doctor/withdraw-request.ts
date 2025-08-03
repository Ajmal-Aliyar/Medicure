import { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import {
  IDoctorWithdrawRequestController,
  IWithdrawRequestController,
} from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";

export const createWithdrawRequestRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const withdrawRequest = container.get<IWithdrawRequestController>(
    TYPES.WithdrawRequestController
  );
  const doctorWithdrawRequest = container.get<IDoctorWithdrawRequestController>(
    TYPES.DoctorWithdrawRequestController
  );

  router
    .route("/")
    .get(asyncHandler(doctorWithdrawRequest.getWithdrawRequests))
    .post(asyncHandler(withdrawRequest.createWithdrawRequest));

  return router;
};
