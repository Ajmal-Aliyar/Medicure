import { Router } from "express";
import { SlotRepository } from "../repositories/slot.repository";
import { SlotService } from "../services/slot.services";
import { SlotController } from "../controllers/slot.controller";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { DoctorRepository } from "../repositories/doctor.repository";

const slotRepository = new SlotRepository();
const doctorRepository = new DoctorRepository()
const slotService = new SlotService(slotRepository, doctorRepository);
const slotController = new SlotController(slotService);

const router = Router();

router.get('/get-slot-details', tokenMiddleware, slotController.getSlots);
router.put('/manage-slots', tokenMiddleware, slotController.manageSlots);

export default router;
