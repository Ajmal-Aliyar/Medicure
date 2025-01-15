import { Router } from 'express';
import { AuthController } from "../controllers/authController";
import { tokenMiddleware } from '../middleware/tokenMiddleware';

const router = Router();
const authController = new AuthController();

router.get('/logout', (req, res) => {
    res.clearCookie('accessToken', { httpOnly: false, secure: process.env.NODE_ENV === 'production'});
    res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production'});
    console.log('loged out')
    res.send('Cookie deleted');
});


router.post('/signup', authController.signUp)                                   // user, doctor
router.post('/signin', authController.signIn)                                   // user, doctor
router.post('/send-otp', authController.sendOTP)                                // user, doctor
router.post('/verify-otp-register', authController.verifyOTPAndRegister)        // user, doctor
router.post('/verify-otp', authController.verifyOTP)                            // user, doctor
router.post('/change-password', authController.changePassword)                  // user, doctor



router.get('/user-info', tokenMiddleware, authController.userInfo) // may be change to user
router.post('/check-request', tokenMiddleware,authController.checkRequest)
export default router;
