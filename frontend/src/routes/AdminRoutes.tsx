import { Route, Routes } from "react-router-dom";
import Auth from "../pages/admin/Auth";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../pages/admin/AdminLayout";
import Appointments from "../pages/admin/Appointments";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="appointment" element={<Appointments />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
