import { Router } from "express";
import { AppointmentController } from "../controllers/appointmentController";
import { AppointmentRepository } from "../repositories/implementations/appointmentRepository";
import { AppointmentServices } from "../services/implementations/appointmentServices";
import { tokenMiddleware } from "../middleware/tokenMiddleware";

const router = Router()

const appointmentRepository = new AppointmentRepository()
const appointmentServices = new AppointmentServices(appointmentRepository)
const appointmentController = new AppointmentController(appointmentServices)


router.post('/create-appointment', tokenMiddleware, appointmentController.createAppointment)
