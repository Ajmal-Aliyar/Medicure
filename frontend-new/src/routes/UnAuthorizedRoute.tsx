
import type { RootState } from "@/app/store";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnAuthorizedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated || !user) return <>{children}</>;

  const { role, isApproved} = user;

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
