import { Router } from "express";
import { AppointmentController } from "../controllers/appointmentController";
import { AppointmentRepository } from "../repositories/implementations/appointmentRepository";
import { AppointmentServices } from "../services/implementations/appointmentServices";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { PatientRepository } from "../repositories/implementations/patientRepository";
import { isDoctor } from "../middleware/isDoctor";
import { SlotRepository } from "../repositories/implementations/slotRepository";
import { isAdmin } from "../middleware/isAdmin";

const router = Router()

const appointmentRepository = new AppointmentRepository()
const patientRepository = new PatientRepository()
const slotRepository = new SlotRepository()
const appointmentServices = new AppointmentServices(appointmentRepository, patientRepository, slotRepository)
const appointmentController = new AppointmentController(appointmentServices)


router.get('/get-appointments', tokenMiddleware, appointmentController.getUserAppointments)
router.get('/get-appointments-admin', tokenMiddleware, isAdmin, appointmentController.getAllAppointments)
router.post('/create-appointment', tokenMiddleware, appointmentController.createAppointment)

router.get('/bookedPatients/:slotId', tokenMiddleware, appointmentController.getBookedPatients)
router.get('/finish-consulting/:appointmentId/:slotId', tokenMiddleware, isDoctor, appointmentController.finishedConsulting)

export default router