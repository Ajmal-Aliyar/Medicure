import { Router } from "express";
import { AdminRepository } from "../repositories/implementations/adminRepository";
import { AdminController } from "../controllers/adminController";
import { AdminServices } from "../services/implementations/adminServices";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { DoctorRepository } from "../repositories/implementations/doctorRepository";
import { SlotRepository } from "../repositories/implementations/slotRepository";
import { PatientRepository } from "../repositories/implementations/patientRepository";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();

const adminRepository = new AdminRepository();
const doctorRepository = new DoctorRepository();
const slotRepository = new SlotRepository();
const patientRepository = new PatientRepository();
const adminServices = new AdminServices(
  adminRepository,
  doctorRepository,
  slotRepository,
  patientRepository
);
const adminController = new AdminController(adminServices);

router.post("/sign-in", adminController.signIn);

router.get(
  "/getAppointmentdetails/:_id",
  tokenMiddleware,
  authorizeRoles('admin'),
  adminController.getDoctorAppointmentDetails
);
router.get(
  "/getDoctorApprovalRequests",
  tokenMiddleware,
  authorizeRoles('admin'),
  adminController.getDoctorApprovalRequests
);
router.get(
  "/getDoctorDetails/:_id",
  tokenMiddleware,
  authorizeRoles('admin'),
  adminController.getDoctorDetails
);
router.get(
  "/getApprovedDoctors",
  tokenMiddleware,
  authorizeRoles('admin'),
  adminController.getApprovedDoctors
);
router.get(
  "/approve-doctor/:_id",
  tokenMiddleware,
  authorizeRoles('admin'),
  adminController.approveDoctor
);
router.get(
  "/reject-doctor/:_id",
  tokenMiddleware,
  authorizeRoles('admin'),
  adminController.rejectDoctor
);

router.get("/block-role", tokenMiddleware, authorizeRoles('admin'), adminController.block);
router.get("/unblock-role", tokenMiddleware, authorizeRoles('admin'), adminController.unblock);

router.get(
  "/getAllPatients",
  tokenMiddleware,
  authorizeRoles('admin'),
  adminController.getAllPatients
);

export default router;
