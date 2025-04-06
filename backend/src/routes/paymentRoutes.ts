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
import { ChatRepository } from '../repositories/implementations/chatRepository';
import { MedicalRecordRepository } from '../repositories/implementations/medicalRecordRepository';
import { WalletRepository } from '../repositories/implementations/walletRepository';
import { isAdmin } from '../middleware/isAdmin';

const transactionRepository = new TransactionRepository();
const transactionServices = new TransactionServices(transactionRepository);
const patientRepository = new PatientRepository()
const slotRepository = new SlotRepository()
const appointmentRepository = new AppointmentRepository();
const chatRepository = new ChatRepository()
const medicalRecordRepository = new MedicalRecordRepository()
const appointmentServices = new AppointmentServices(appointmentRepository, patientRepository, slotRepository, chatRepository, medicalRecordRepository);
const doctorRepository = new DoctorRepository()
const slotServices = new SlotService(slotRepository, doctorRepository)
const walletRepository = new WalletRepository()
const paymentService = new PaymentServices(transactionServices, appointmentServices, slotServices, walletRepository)
const paymentController = new PaymentController(paymentService)


const router = Router();

router.post('/create-checkout-session', tokenMiddleware, paymentController.checkoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.webhookHandler);
router.post('/refund', tokenMiddleware, paymentController.refundPayment);
router.get('/approve-withdraw', tokenMiddleware, isAdmin, paymentController.approveWithdrawRequest)

router.post('/test', paymentController.addUserBankAccount)

export default router;
