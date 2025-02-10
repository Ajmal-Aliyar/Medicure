import express, { Router } from 'express';
import { TransactionRepository } from '../repositories/implementations/transactionRepository';
import { TransactionServices } from '../services/implementations/transactionServices';
import { AppointmentRepository } from '../repositories/implementations/appointmentRepository';
import { AppointmentServices } from '../services/implementations/appointmentServices';
import { PaymentServices } from '../services/implementations/paymentServices';
import { PaymentController } from '../controllers/paymentController';
import { tokenMiddleware } from '../middleware/tokenMiddleware';
import { SlotService } from '../services/implementations/slotServices';
import { DoctorRepository } from '../repositories/implementations/doctorRepository';
import { SlotRepository } from '../repositories/implementations/slotRepository';
import { PatientRepository } from '../repositories/implementations/patientRepository';

const transactionRepository = new TransactionRepository();
const transactionServices = new TransactionServices(transactionRepository);
const patientRepository = new PatientRepository()
const appointmentRepository = new AppointmentRepository();
const appointmentServices = new AppointmentServices(appointmentRepository, patientRepository);
const doctorRepository = new DoctorRepository()
const slotRepository = new SlotRepository()
const slotServices = new SlotService(slotRepository, doctorRepository)
const paymentService = new PaymentServices(transactionServices, appointmentServices, slotServices)
const paymentController = new PaymentController(paymentService)


const router = Router();

router.post('/create-checkout-session', tokenMiddleware, paymentController.checkoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.webhookHandler);

export default router;
