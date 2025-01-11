import { Router } from 'express';
import { AuthController } from "../controllers/authController";
import { tokenMiddleware } from '../middleware/tokenMiddleware';

const router = Router();
const authController = new AuthController();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn)
router.post('/send-otp', authController.sendOTP)
router.post('/verify-otp-register', authController.verifyOTPAndRegister);
router.post('/verify-otp', authController.verifyOTP);
router.post('/change-password', authController.changePassword)
router.post('/user-info', tokenMiddleware, authController.userInfo) // may be change to user

export default router;
