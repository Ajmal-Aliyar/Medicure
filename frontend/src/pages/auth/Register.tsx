import { AuthContainer, AuthForm, AuthHeader, AuthSwitchPrompt, GoogleAuth } from "@/pages/auth/components";
import { useRole } from "@/hooks";
import { authService } from "@/services/api/public/auth";
import { useNavigate } from "react-router-dom";
import { showError } from "@/lib/toast";


export const Register = () => {
    const navigate = useNavigate()
    const role = useRole()
    const textRole = role === "patient" ? "user" : "doctor";
    const handleSubmit = async (data: Record<string, string>) => {
        const { email, password, mobile, fullName } = data
        const { success } = await authService.register({ mobile, fullName, email, password, role })
        if (success) {
            navigate(`/${role === 'patient' ? 'user' : role}/auth/verify-otp`, {
                state: { email }
            })
        } else {
            showError("Something went wrong. Please try again later.")
        }
    };
    return (
        <AuthContainer>
            <AuthHeader />
            <AuthForm
                fields={["fullName", "email", "mobile", "password"]}
                onSubmit={handleSubmit}
                submitText={`register as ${textRole}`}
            />
            <AuthSwitchPrompt />
            <GoogleAuth />
        </AuthContainer>
    );
};
