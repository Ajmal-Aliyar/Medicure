import SideAuthComponent from "../../components/auth/SideAuthComponent";
import VerificationForm from "../../components/auth/VerificationOTP";
import ChangePassword from "../../components/auth/ChangePassword";
import AuthAnimations from "../../components/auth/AuthAnimation";
import AuthPage from "../../components/auth/Auth";
import { useState } from "react";

interface AuthProps {
  role: string;
}

const Auth:React.FC<AuthProps> = ({role}) => {
  const [forgotPassword, setForgorPassword] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [ auth, setAuth] = useState(true)
  
  const handleAuth = (value:boolean) => {
    setAuth(value)
  }

  const handleForgotPassword = (value: boolean) => {
    setForgorPassword(value)
    setAuth(false)
  } 
  const handleChangePassword = (value: boolean) => {
    setChangePassword(value)
  }

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center pt-24">
      <div className="lg:w-[80%] w-[100%] relative flex">
        <div className="w-[50%] justify-center items-center hidden lg:flex mb-10 relative">
          <div className="w-[400px] h-[400px] bg-[#b6ddfb] absolute -top-10 rounded-full blur-2xl">
          </div>
          <SideAuthComponent />
        </div>
        <div className="w-[100%] lg:w-[50%] flex justify-center items-center">
            {changePassword ? <ChangePassword handleChangePassword={handleChangePassword} role={role}/> : 
             auth ? <AuthPage handleAuth={handleAuth} handleForgotPassword={handleForgotPassword} role={role}/> : 
             <VerificationForm handleAuth={handleAuth} forgotPassword={forgotPassword} handleChangePassword={handleChangePassword}/> }
        </div>
      </div>
      <AuthAnimations />
    </div>
  );
}

export default Auth;