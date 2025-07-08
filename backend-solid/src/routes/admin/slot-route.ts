import { ISlotController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createAdminSlotRouter = (): Router => {
  const router = Router();
  const container = getContainer()
  const slotController = container.get<ISlotController>(TYPES.SlotController)


  router.get('/', asyncHandler(slotController.getSlots))
  
  return router;
};
