import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const UnAuthorizedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, role, isApproved } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "patient") {
        navigate("/", { replace: true });
      } else {
        if (!isApproved) {
          navigate("/doctor/verify-details", { replace: true });
        } else {
          navigate(`/${role}/dashboard`, { replace: true });
        }
      }
    }
  }, [isAuthenticated, role, isApproved, navigate]);

  if (isAuthenticated) return null;

  return <>{children}</>;
};

export default UnAuthorizedRoute;
