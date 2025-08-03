import { AuthContainer, AuthForm } from '@/pages/auth/components';
import { authService } from '@/services/api/public/auth';
import { loginSuccess } from '@/slices/authSlice';
import { useDispatch } from 'react-redux';

export const AdminLogin = () => {
    const dispatch = useDispatch()
    const handleSubmit = async (data: Record<string, string>) => {
        const { email, password } = data
       const user = await authService.login({ email, password, role: 'admin' })
       console.log('response', user)
       dispatch(loginSuccess({user}))
    };

    return (
        <AuthContainer>
            <h1 className='font-bold text-secondary text-xl mb-5'>Admin</h1>
            <AuthForm
                fields={["email", "password"]}
                onSubmit={handleSubmit}
                submitText="login"
            />
        </AuthContainer>
    )
};