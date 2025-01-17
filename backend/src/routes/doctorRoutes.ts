import { Router } from 'express';
import { tokenMiddleware } from '../middleware/tokenMiddleware';
import { DoctorController } from '../controllers/doctorController';

const router = Router();
const doctorController = new DoctorController()


router.get('/profile-details', tokenMiddleware, doctorController.getProfileDetails)
router.patch('/profile-update', tokenMiddleware, doctorController.updateProfile)
router.patch('/update-profile-image', tokenMiddleware, doctorController.updateProfileImg)





export default router;