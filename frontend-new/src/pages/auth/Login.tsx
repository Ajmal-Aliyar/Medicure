import { useRole } from '@/hooks';
import { AuthContainer, AuthForm, AuthHeader, AuthSwitchPrompt, GoogleAuth } from '@/pages/auth/components';
import { authService } from '@/services/api/public/auth';
import { loginSuccess } from '@/slices/authSlice';
import { useDispatch } from 'react-redux';

export const Login = () => {
    const dispatch = useDispatch()
    const role = useRole()
    const textRole = role === "patient" ? "user" : "doctor";
    const handleSubmit = async (data: Record<string, string>) => {
        const { email, password } = data
       const user = await authService.login({ email, password, role })
       dispatch(loginSuccess({user}))
    };

    return (
        <AuthContainer>
            <AuthHeader />
            <AuthForm
                fields={["email", "password"]}
                onSubmit={handleSubmit}
                submitText={`login as ${textRole}`}
            />
            <AuthSwitchPrompt />
            <GoogleAuth />
        </AuthContainer>
    )
};