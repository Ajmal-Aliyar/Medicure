import { PatientRepository } from "../repositories/implementations/patientRepository";
import { PatientServices } from "../services/implementations/patientServices";
import { PatientController } from "../controllers/patientController";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { Router } from "express";

const router = Router();

const patientRepository = new PatientRepository();
const patientServices = new PatientServices(patientRepository);
const patientController = new PatientController(patientServices);


router.get('/profile-details', tokenMiddleware, patientController.getProfile)
router.patch('/profile-details', tokenMiddleware, patientController.updateProfile)
router.patch('/update-profile-image', tokenMiddleware, patientController.updateProfileImg)

export default router;
