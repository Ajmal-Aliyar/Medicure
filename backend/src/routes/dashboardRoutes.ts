import { Router } from "express";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { DashboardController } from "../controllers/dashboardController";
import { PatientRepository } from "../repositories/implementations/patientRepository";
import { AppointmentRepository } from "../repositories/implementations/appointmentRepository";
import { DashboardServices } from "../services/implementations/dashboardServices";
import { authorizeRoles } from "../middleware/authorizeRoles";
import { TransactionRepository } from "../repositories/implementations/transactionRepository";
const router = Router();

const patientRepository = new PatientRepository();
const appointmentRepository = new AppointmentRepository();
const transactionRepository = new TransactionRepository();
const dashboardServices = new DashboardServices(
  patientRepository,
  appointmentRepository,
  transactionRepository
);
const dashboardController = new DashboardController(dashboardServices);

router.get(
  "/patient",
  tokenMiddleware,
  authorizeRoles("admin"),
  dashboardController.getPatientDashboard
);

router.get(
    "/chart-details",
    tokenMiddleware,
    authorizeRoles("admin"),
    dashboardController.getChartDetails
  );
  

export default router;
