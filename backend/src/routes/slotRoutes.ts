import { Router } from "express";
import { SlotRepository } from "../repositories/implementations/slotRepository";
import { SlotService } from "../services/implementations/slot.services";
import { SlotController } from "../controllers/slotController";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { DoctorRepository } from "../repositories/implementations/doctorRepository";

const slotRepository = new SlotRepository();
const doctorRepository = new DoctorRepository()
const slotService = new SlotService(slotRepository, doctorRepository);
const slotController = new SlotController(slotService);

const router = Router();

router.get('/get-slot-details', tokenMiddleware, slotController.getSlots);
router.put('/manage-slots', tokenMiddleware, slotController.manageSlots);

router.get('/doctorSlotDetails/:doctorId', tokenMiddleware, slotController.doctorSlotDetails)

export default router;
