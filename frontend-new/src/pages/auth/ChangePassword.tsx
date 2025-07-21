import { AuthContainer, AuthForm, AuthHeader } from '@/pages/auth/components';

export const ChangePassword = () => {
    const handleSubmit = (data: Record<string, string>) => {
        console.log("change password form submitted:", data);
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <AuthContainer>
                <AuthHeader />
                <AuthForm
                    fields={['changePassword', "confirmPassword"]}
                    onSubmit={handleSubmit}
                    submitText="confirm"
                />
            </AuthContainer>
        </div>
    )
};