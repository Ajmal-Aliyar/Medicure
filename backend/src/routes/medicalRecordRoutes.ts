import { Router } from "express";
import { MedicalRecordRepository } from "../repositories/implementations/medicalRecordRepository";
import { MedicalRecordServices } from "../services/implementations/medicalRecordServices";
import { MedicalRecordController } from "../controllers/medicalRecordControllers";

const router = Router()

const medicalRecordRepository = new MedicalRecordRepository();
const medicalRecordService = new MedicalRecordServices(medicalRecordRepository);
const medicalRecordController = new MedicalRecordController(medicalRecordService);

router.get("/:id", medicalRecordController.getRecordById);
router.get("/", medicalRecordController.getAllRecords);
router.put("/:id", medicalRecordController.updateRecord);
router.delete("/:id", medicalRecordController.deleteRecord);

export default router;
