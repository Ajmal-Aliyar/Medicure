import { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import { IConversationController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";

export const createConversationRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const connectionRequest = container.get<IConversationController>(
    TYPES.ConversationController
  );

  router
    .route("/")
    .get(asyncHandler(connectionRequest.getConversactions));

  return router;
};
