import { Router } from 'express';
import { AuthController } from "../controllers/authController";

const router = Router();
const authController = new AuthController();

router.post('/signup', authController.signup);
router.post('/send-otp', authController.resendOTP)
router.post('/verify-otp', authController.verifyOtp);

export default router;
