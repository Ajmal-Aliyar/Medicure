import { Router } from "express"
import { AdminRepository } from "../repositories/implementations/adminRepository"
import { AdminController } from "../controllers/adminController"
import { AdminServices } from "../services/implementations/adminServices"
import { tokenMiddleware } from "../middleware/tokenMiddleware"
import { isAdmin } from "../middleware/isAdmin"
import { DoctorRepository } from "../repositories/implementations/doctorRepository"
import { SlotRepository } from "../repositories/implementations/slotRepository"

const router = Router()

const adminRepository = new AdminRepository()
const doctorRepository = new DoctorRepository()
const slotRepository = new SlotRepository()
const adminServices = new AdminServices( adminRepository, doctorRepository, slotRepository)
const adminController = new AdminController(adminServices)

router.get('/getDoctorDetails/:_id', tokenMiddleware, isAdmin, adminController.getDoctorDetails)
router.get('/getApprovedDoctors', tokenMiddleware, isAdmin, adminController.getApprovedDoctors)
router.get('/getDoctorApprovalRequests', tokenMiddleware, isAdmin, adminController.getDoctorApprovalRequests)
router.get('/getAppointmentdetails/:_id', tokenMiddleware, isAdmin, adminController.getDoctorAppointmentDetails)
router.get('/approve-doctor/:_id', tokenMiddleware, isAdmin, adminController.approveDoctor)
router.get('/reject-doctor/:_id', tokenMiddleware, isAdmin, adminController.rejectDoctor)
router.post('/sign-in', adminController.signIn)

export default router