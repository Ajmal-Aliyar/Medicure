import { useRole } from "@/hooks";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthSwitchPrompt = () => {
    const pathRole = useRole()
    const newRole = pathRole === "patient" ? "doctor" : "user";
    const location = useLocation();
    const navigate = useNavigate();
    
    const isLogin = location.pathname.includes("login");
    
    const switchAuth = () => {
    const role = pathRole === "patient" ? "user" : "doctor";
    const target = isLogin ? "register" : "login";
    navigate(`/${role}/auth/${target}`);
  };

  const switchRole = () => {
    const currentPage = isLogin ? "login" : "register";
    navigate(`/${newRole}/auth/${currentPage}`);
  };

  return (
    <div className="h-[100px] flex flex-col justify-center gap-2">
      <p className="text-gray-600 text-sm text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={switchAuth}
          className="text-[#0c0b3e] font-medium underline underline-offset-4 hover:opacity-80 transition"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </p>

      <button
        onClick={switchRole}
        className="text-sm text-[#0c0b3e] underline underline-offset-4 hover:scale-105 transition-transform text-center"
      >
        I&apos;m a {newRole}
      </button>
    </div>
  );
};
