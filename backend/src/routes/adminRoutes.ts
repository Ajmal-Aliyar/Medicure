import { Router } from "express"
import { AdminRepository } from "../repositories/implementations/adminRepository"
import { AdminController } from "../controllers/adminController"
import { AdminServices } from "../services/implementations/adminServices"

const router = Router()

const adminRepository = new AdminRepository()
const adminServices = new AdminServices(adminRepository)
const adminController = new AdminController(adminServices)

router.post('/sign-in', adminController.signIn)

export default router