import { Route, Routes } from "react-router-dom";
import Auth from "../pages/admin/Auth";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../pages/admin/AdminLayout";
import UnAuthorizedRoute from "./UnAuthorizedRoute";
import AuthorizedRoute from "./AuthorizedRoute";
import Doctors from "../pages/admin/Doctors";
import Patients from "../pages/admin/Patients";
import Specialization from "../pages/admin/Specialization";
import Appointments from "../pages/admin/Appointments";
import Finance from "../pages/admin/Finance";
import PageNotFound from "../pages/common/PageNotFound";

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
        <Route path="patients" element={<AuthorizedRoute allowedRole='admin'><Patients /></AuthorizedRoute>} />
        <Route path="appointments" element={<AuthorizedRoute allowedRole='admin'><Appointments /></AuthorizedRoute>} />
        <Route path="specialization" element={<AuthorizedRoute allowedRole='admin'><Specialization /></AuthorizedRoute>} />
        <Route path="finance" element={<AuthorizedRoute allowedRole='admin'><Finance /></AuthorizedRoute>} />
      </Route>
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
}

export default AdminRoutes;
