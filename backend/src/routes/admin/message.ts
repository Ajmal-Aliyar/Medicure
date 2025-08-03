import { IMessageController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createMessageRouter = (): Router => {
  const router = Router();
  const container = getContainer();
  const messageController = container.get<IMessageController>(
    TYPES.MessageController
  );

  router.get("/:conversationId", asyncHandler(messageController.getMessages));

  return router;
};
