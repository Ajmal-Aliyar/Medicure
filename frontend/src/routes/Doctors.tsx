import { Route, Routes } from "react-router-dom"
import Auth from "../pages/patient/Auth"
import Dashboard from "../pages/doctor/Dashboard"


function Doctors() {
  return (
    <Routes>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  )
}

export default Doctors
