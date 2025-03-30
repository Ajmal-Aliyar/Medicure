import { Router } from "express";
import { MedicalRecordRepository } from "../repositories/implementations/medicalRecordRepository";
import { MedicalRecordServices } from "../services/implementations/medicalRecordServices";
import { MedicalRecordController } from "../controllers/medicalRecordControllers";
import { tokenMiddleware } from "../middleware/tokenMiddleware";

const router = Router()

const medicalRecordRepository = new MedicalRecordRepository();
const medicalRecordService = new MedicalRecordServices(medicalRecordRepository);
const medicalRecordController = new MedicalRecordController(medicalRecordService);

router.get("/prescription", tokenMiddleware, medicalRecordController.getUserRecordById)
router.get("/:id", tokenMiddleware, medicalRecordController.getRecordById);
router.get("/", tokenMiddleware, medicalRecordController.getAllRecords);
router.put("/:id", tokenMiddleware, medicalRecordController.updateRecord);
router.delete("/:id", tokenMiddleware, medicalRecordController.deleteRecord);

export default router;
