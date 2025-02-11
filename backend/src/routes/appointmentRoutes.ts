import { Router } from "express";
import { AppointmentController } from "../controllers/appointmentController";
import { AppointmentRepository } from "../repositories/implementations/appointmentRepository";
import { AppointmentServices } from "../services/implementations/appointmentServices";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { PatientRepository } from "../repositories/implementations/patientRepository";

const router = Router()

const appointmentRepository = new AppointmentRepository()
const patientRepository = new PatientRepository()
const appointmentServices = new AppointmentServices(appointmentRepository, patientRepository)
const appointmentController = new AppointmentController(appointmentServices)


router.get('/get-appointments', tokenMiddleware, appointmentController.getUserAppointments)
router.post('/create-appointment', tokenMiddleware, appointmentController.createAppointment)

router.get('/bookedPatients/:slotId', tokenMiddleware, appointmentController.getBookedPatients)


export default router