import type { RootState } from "@/app/store";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthorizedRoute = ({
  children,
  allowedRole,
}: {
  children: ReactNode;
  allowedRole: string[]; 
}) => {
  const { isAuthenticated, isAuthChecked, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthChecked) return null

  if (!isAuthenticated || !user) {
    return allowedRole.includes("patient") ? (
      <Navigate to="/user/auth/login" replace />
    ) : (
      <Navigate to={`/doctor/auth/login`} replace />
    );
  }

  const { role, isApproved } = user;

  if (!allowedRole.includes(role)) {
    if (role === "patient") return <Navigate to="/" replace />;
    if (role === "doctor") return <Navigate to="/doctor/dashboard" replace />;
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  }

  if (role === "doctor" && isApproved !== "approved") {
    return <Navigate to="/doctor/verify-details" replace />;
  }

  return <>{children}</>;
};

export default AuthorizedRoute;
