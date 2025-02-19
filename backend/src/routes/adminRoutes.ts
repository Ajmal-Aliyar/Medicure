import { Router } from "express"
import { AdminRepository } from "../repositories/implementations/adminRepository"
import { AdminController } from "../controllers/adminController"
import { AdminServices } from "../services/implementations/adminServices"
import { tokenMiddleware } from "../middleware/tokenMiddleware"
import { isAdmin } from "../middleware/isAdmin"
import { DoctorRepository } from "../repositories/implementations/doctorRepository"
import { SlotRepository } from "../repositories/implementations/slotRepository"
import { PatientRepository } from "../repositories/implementations/patientRepository"

const router = Router()

const adminRepository = new AdminRepository()
const doctorRepository = new DoctorRepository()
const slotRepository = new SlotRepository()
const patientRepository = new PatientRepository()
const adminServices = new AdminServices( adminRepository, doctorRepository,  slotRepository, patientRepository)
const adminController = new AdminController(adminServices)


router.post('/sign-in', adminController.signIn)


router.get('/getAppointmentdetails/:_id', tokenMiddleware, isAdmin, adminController.getDoctorAppointmentDetails)
router.get('/getDoctorApprovalRequests', tokenMiddleware, isAdmin, adminController.getDoctorApprovalRequests)
router.get('/getDoctorDetails/:_id', tokenMiddleware, isAdmin, adminController.getDoctorDetails)
router.get('/getApprovedDoctors', tokenMiddleware, isAdmin, adminController.getApprovedDoctors)
router.get('/approve-doctor/:_id', tokenMiddleware, isAdmin, adminController.approveDoctor)
router.get('/reject-doctor/:_id', tokenMiddleware, isAdmin, adminController.rejectDoctor)

router.get('/block-role', tokenMiddleware, isAdmin, adminController.block)
router.get('/unblock-role', tokenMiddleware, isAdmin, adminController.unblock)


router.get('/getAllPatients', tokenMiddleware, isAdmin, adminController.getAllPatients)

export default router