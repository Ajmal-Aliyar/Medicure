import { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import { IConnectionRequestController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";


export const createConnectionRequestRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const connectionRequest = container.get<IConnectionRequestController>(TYPES.ConnectionRequestController);

 router
    .route("/")
    .post(asyncHandler(connectionRequest.createConnectionRequest))
    .get(asyncHandler(connectionRequest.getConnectionRequests));

 
  return router;
};
