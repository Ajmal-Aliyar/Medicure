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


router.post('/signup', authController.signUp)                                   
router.post('/signin', authController.signIn)                                   
router.post('/send-otp', authController.sendOTP)                                
router.post('/verify-otp-register', authController.verifyOTPAndRegister)        
router.post('/verify-otp', authController.verifyOTP)                            
router.post('/change-password', authController.changePassword)                  



router.get('/user-info', tokenMiddleware, authController.userInfo) 
router.post('/check-request', tokenMiddleware,authController.checkRequest)
export default router;
