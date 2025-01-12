import { Route, Routes } from "react-router-dom"
import Auth from "../pages/admin/Auth"
import Dashboard from "../pages/admin/Dashboard"
import AdminLayout from "../pages/admin/AdminLayout"



function AdminRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<div>hellow content</div>} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>

  )
}

export default AdminRoutes
