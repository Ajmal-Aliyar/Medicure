import { AuthHeader } from '@/pages/auth/components';

export const EnterEmail = () => (
    <div className="max-w-md mx-auto p-6">
        <AuthHeader />
        <form className="space-y-4">
            <input type="email" placeholder="Enter your email" className="w-full p-2 border rounded" />
            <button className="w-full bg-purple-500 text-white p-2 rounded">Send OTP</button>
        </form>
    </div>
);