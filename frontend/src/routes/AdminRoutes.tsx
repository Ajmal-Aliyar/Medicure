import { Route, Routes } from "react-router-dom";
import Auth from "../pages/admin/Auth";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../pages/admin/AdminLayout";
import UnAuthorizedRoute from "./UnAuthorizedRoute";
import AuthorizedRoute from "./AuthorizedRoute";
import Doctors from "../pages/admin/Doctors";

function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <UnAuthorizedRoute preventedRole="admin">
            <Auth role='admin' />
          </UnAuthorizedRoute>
        }
      />
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<AuthorizedRoute allowedRole='admin'><Dashboard /></AuthorizedRoute>} />
        <Route path="doctors" element={<AuthorizedRoute allowedRole='admin'><Doctors /></AuthorizedRoute>} />
        <Route path="patients" element={<AuthorizedRoute allowedRole='admin'><Dashboard /></AuthorizedRoute>} />
        <Route path="appointments" element={<AuthorizedRoute allowedRole='admin'><Dashboard /></AuthorizedRoute>} />
        <Route path="finance" element={<AuthorizedRoute allowedRole='admin'><Dashboard /></AuthorizedRoute>} />
      </Route>

    </Routes>
  );
}

export default AdminRoutes;
