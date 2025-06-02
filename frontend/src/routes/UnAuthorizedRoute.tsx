import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

const UnAuthorizedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, role, isApproved } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) return <>{children}</>;

  if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (role === "doctor") {
    return isApproved === "approved" ? (
      <Navigate to="/doctor/dashboard" replace />
    ) : (
      <Navigate to="/doctor/verify-details" replace />
    );
  }

  if (role === "patient") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default UnAuthorizedRoute;
