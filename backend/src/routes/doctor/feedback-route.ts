import {
  IFeedbackController,
} from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createFeedbackRouter = (): Router => {
  const router = Router();
  const container = getContainer();
  const feedbackService = container.get<IFeedbackController>(
    TYPES.FeedbackController
  );

  router.get("/:doctorId", asyncHandler(feedbackService.getFeedbacksByDoctorId));

  return router;
};
