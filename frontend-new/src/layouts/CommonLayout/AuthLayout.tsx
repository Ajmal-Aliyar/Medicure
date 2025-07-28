import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthAvatar } from "@/pages/auth/components";

export const AuthLayout = () => {
    return (
        <div className="w-screen h-screen flex ">
            <div className="w-1/2 hidden md:flex items-center justify-center">
                <AuthAvatar />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                <GoogleOAuthProvider clientId={'ENV.GOOGLE_CLIENT_ID'}>
                    <Outlet />
                </GoogleOAuthProvider>
            </div>
        </div>
    );
};
