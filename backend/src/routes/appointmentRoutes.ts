import { Router } from "express";
import { AppointmentController } from "../controllers/appointmentController";
import { AppointmentRepository } from "../repositories/implementations/appointmentRepository";
import { AppointmentServices } from "../services/implementations/appointmentServices";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { PatientRepository } from "../repositories/implementations/patientRepository";
import { SlotRepository } from "../repositories/implementations/slotRepository";
import { ChatRepository } from "../repositories/implementations/chatRepository";
import { MedicalRecordRepository } from "../repositories/implementations/medicalRecordRepository";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();

const appointmentRepository = new AppointmentRepository();
const patientRepository = new PatientRepository();
const slotRepository = new SlotRepository();
const chatRepository = new ChatRepository();
const medicalRecordRepository = new MedicalRecordRepository();
const appointmentServices = new AppointmentServices(
  appointmentRepository,
  patientRepository,
  slotRepository,
  chatRepository,
  medicalRecordRepository
);
const appointmentController = new AppointmentController(appointmentServices);

router.get(
  "/get-appointments",
  tokenMiddleware,
  appointmentController.getUserAppointments
);
router.get(
  "/get-appointments-admin",
  tokenMiddleware,
  authorizeRoles('admin'),
  appointmentController.getAllAppointments
);
router.get(
  "/get-appointments-doctor",
  tokenMiddleware,
  authorizeRoles('doctor'),
  appointmentController.getAllAppointmentsOfDoctor
);
router.post(
  "/create-appointment",
  tokenMiddleware,
  appointmentController.createAppointment
);

router.get(
  "/bookedPatients/:slotId",
  tokenMiddleware,
  appointmentController.getBookedPatients
);
router.get(
  "/finish-consulting/:appointmentId/:slotId",
  tokenMiddleware,
  authorizeRoles('doctor'),
  appointmentController.finishedConsulting
);

router.get(
  "/appointment-details",
  tokenMiddleware,
  authorizeRoles('admin'),
  appointmentController.appointmentDetails
);

export default router;
