import { Router } from 'express';
import { AuthController } from "../controllers/authController";
import { tokenMiddleware } from '../middleware/tokenMiddleware';

const router = Router();
const authController = new AuthController();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn)
router.post('/send-otp', authController.resendOTP)
router.post('/verify-otp', authController.verifyOTP);
router.post('/forgot-password', authController.forgotPassword)
router.post('/user-info', tokenMiddleware, authController.userInfo) // may be change to user

export default router;
