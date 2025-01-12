import { Route, Routes } from "react-router-dom"
import Auth from "../pages/patient/Auth"
import Dashboard from "../pages/doctor/Dashboard"
import UnAuthorizedRoute from "./UnAuthorizedRoute"
import AuthorizedRoute from "./AuthorizedRoute"


function DoctorRoutes() {
  return (
    <Routes>
        <Route path="/dashboard" element={<AuthorizedRoute allowedRole='doctor'><Dashboard/></AuthorizedRoute>}/>
        <Route path="/auth" element={<UnAuthorizedRoute preventedRole="doctor"><Auth role='doctor'/></UnAuthorizedRoute>}/>
    </Routes>
  )
}

export default DoctorRoutes
