import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

const AuthorizedRoute = ({
  children,
  allowedRole,
}: {
  children: ReactNode;
  allowedRole: string;
}) => {
  const { isAuthenticated, role, isApproved } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    if (allowedRole === "patient") return <Navigate to="/auth" replace />;
    return <Navigate to={`/${allowedRole}/auth`} replace />;
  }

  if (role !== allowedRole) {
    if (role === "patient") return <Navigate to="/" replace />;
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  if (role === "doctor" && isApproved !== "approved") {
    return <Navigate to="/doctor/verify-details" replace />;
  }

  return <>{children}</>;
};

export default AuthorizedRoute;
