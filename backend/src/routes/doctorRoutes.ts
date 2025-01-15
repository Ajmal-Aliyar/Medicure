import { Router } from 'express';
import { tokenMiddleware } from '../middleware/tokenMiddleware';
import { DoctorController } from '../controllers/doctorController';

const router = Router();
const doctorController = new DoctorController()

router.get('/profile-details', tokenMiddleware, doctorController.getProfileVerificationDetails)
router.get('/verification-proofs', tokenMiddleware, doctorController.getProofVerificationDetails)

router.post('/request-approval')
router.post('/appointment-setup')

router.patch('/profile-details', tokenMiddleware, doctorController.profileVerification)
router.patch('/verification-proofs', tokenMiddleware, doctorController.verificationProofs)

export default router;