import { Router } from "express";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { isAdmin } from "../middleware/isAdmin";
import { SpecializationRepository } from "../repositories/implementations/specializationRepository";
import { SpecializationServices } from "../services/implementations/specializationServices";
import { SpecializationController } from "../controllers/specializationController";

const specializationRepository = new SpecializationRepository()
const specializationServices = new SpecializationServices(specializationRepository)
const specializationController = new SpecializationController(specializationServices)

const router = Router();

router.get('/fetchSpecialization/:name', specializationController.fetchByName)
router.get('/fetchAllSpecialization', specializationController.fetchAllSpecialization)
router.post('/create-specialization', tokenMiddleware, isAdmin, specializationController.createSpecialization);

export default router;
