import { IDoctorSlotController, ISlotController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createDoctorSlotRouter = (): Router => {
  const router = Router();
  const container = getContainer()
  const slotController = container.get<ISlotController>(TYPES.SlotController)
  const doctorSlotController = container.get<IDoctorSlotController>(TYPES.DoctorSlotController)


  router.get('/', asyncHandler(slotController.getSlots))
  router.patch('/:slotId/status', asyncHandler(doctorSlotController.updateSlotStatus))
  router.get('/stats', asyncHandler(doctorSlotController.getSlotDashboard))
  return router;
};
