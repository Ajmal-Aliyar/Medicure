import { Button } from '@/components/ui/Button';
import { useRole } from '@/hooks';
import { showError } from '@/lib/toast';
import { AuthContainer, AuthHeader, OtpInput } from '@/pages/auth/components';
import { authService } from '@/services/api/public/auth';
import { loginSuccess } from '@/slices/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const EnterOtp = () => {
    const [otp, setOtp] = useState<string | null>(null)
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = useRole()
    const email = location.state?.email;
    if (!email) navigate(`/${role === 'patient' ? 'user' : role}/auth/register`)
    const [timer, setTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isResendDisabled && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [timer, isResendDisabled]);

    const handleResendOTP = async () => {
        setTimer(30);
        setIsResendDisabled(true);
        try {
            await authService.resendOTP(email)
        } catch (error: unknown) {
            console.log(error);            
            setIsResendDisabled(false)
            showError("Something went wrong! Please try again later.")
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            showError('Invalid otp.')
            return
        }
        const user = await authService.verifyOtpAndRegister(otp, email)
        dispatch(loginSuccess({ user }));
    }
    return (
        <AuthContainer>
            <AuthHeader />
            <OtpInput onChange={(otp) => setOtp(otp)} />
            <form onSubmit={handleSubmit} className='flex justify-between items-center'>
                <button className="relative  border bg-[#dcdfe0] disabled:bg-transparent shadow-inner border-gray-200 disabled:border-gray-300 bg-opacity-70 text-center w-20 rounded-md  m-4 p-2 active:scale-95 font-medium text-[#0c0b3eb5] disabled:text-gray-300"
                    disabled={isResendDisabled}
                    onClick={handleResendOTP}
                >
                    <p className={`${isResendDisabled ? `text-xs font-medium ` : ''}`}>
                        {isResendDisabled ? `Wait ${timer}s` : 'resend'}
                    </p>
                </button>
                <Button
                    variant="secondary"
                    className="px-20 h-fit"
                    disabled={!otp || otp.length !== 6}
                >
                    <p className="font-light text-lg">Submit Otp</p>
                </Button>
            </form>

        </AuthContainer>
    );
};