import { Router } from 'express';
import { AuthController } from "../controllers/authController";
import { tokenMiddleware } from '../middleware/tokenMiddleware';

const router = Router();
const authController = new AuthController();

router.post('/signup', authController.signUp)                                   // user, doctor
router.post('/signin', authController.signIn)                                   // user, doctor
router.post('/send-otp', authController.sendOTP)                                // user, doctor
router.post('/verify-otp-register', authController.verifyOTPAndRegister)        // user, doctor
router.post('/verify-otp', authController.verifyOTP)                            // user, doctor
router.post('/change-password', authController.changePassword)                  // user, doctor



router.get('/user-info', tokenMiddleware, authController.userInfo) // may be change to user
router.post('/check-request', authController.checkRequest)
export default router;
