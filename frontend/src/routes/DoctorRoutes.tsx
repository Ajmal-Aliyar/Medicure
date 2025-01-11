import { Route, Routes } from "react-router-dom"
import Auth from "../pages/patient/Auth"
import Dashboard from "../pages/doctor/Dashboard"


function DoctorRoutes() {
  return (
    <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/auth" element={<Auth/>}/>
    </Routes>
  )
}

export default DoctorRoutes
