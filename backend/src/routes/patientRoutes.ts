import { PatientRepository } from "../repositories/implementations/patientRepository";
import { PatientServices } from "../services/implementations/patientServices";
import { PatientController } from "../controllers/patientController";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { Router } from "express";
import { DoctorRepository } from "../repositories/implementations/doctorRepository";

const router = Router();

const patientRepository = new PatientRepository();
const doctorRepository = new DoctorRepository()
const patientServices = new PatientServices( patientRepository, doctorRepository);
const patientController = new PatientController(patientServices);


router.get('/profile-details', tokenMiddleware, patientController.getProfile)
router.patch('/profile-details', tokenMiddleware, patientController.updateProfile)
router.patch('/update-profile-image', tokenMiddleware, patientController.updateProfileImg)

router.get('/getTopDoctors', patientController.getTopDoctors)

export default router;
