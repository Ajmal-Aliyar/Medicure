import { Router } from 'express';
import { tokenMiddleware } from '../middleware/tokenMiddleware';
import { DoctorController } from '../controllers/doctorController';

const router = Router();
const doctorController = new DoctorController()

router.post('/request-approval', tokenMiddleware, doctorController.verifyProfile)
router.post('/profile-details', tokenMiddleware, doctorController.profileVerification)
router.post('/profile-verification')
router.post('/appointment-setup')

export default router;