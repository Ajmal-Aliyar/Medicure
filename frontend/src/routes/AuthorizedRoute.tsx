import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const AuthorizedRoute = ({ children, allowedRole }: { children: ReactNode, allowedRole: string }) => {
  const { isAuthenticated, role, isApproved } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth", { replace: true });
      return;
    }

    if (!isApproved) {
      navigate("/doctor/verify-details", { replace: true });
      return;
    }

    if (role !== allowedRole) {
      navigate("/unauthorized", { replace: true });
    }
  }, [isAuthenticated, isApproved, role, navigate, allowedRole]);

  if (!isAuthenticated || !isApproved || role !== allowedRole) {
    return null; 
  }

  return <>{children}</>;
};

export default AuthorizedRoute;
