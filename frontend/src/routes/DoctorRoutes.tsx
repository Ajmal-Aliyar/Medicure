import DoctorLayout from "../pages/doctor/DoctorLayout";
import UnAuthorizedRoute from "./UnAuthorizedRoute";
import Dashboard from "../pages/doctor/Dashboard";
import { Route, Routes } from "react-router-dom";
import AuthorizedRoute from "./AuthorizedRoute";
import Profile from "../pages/doctor/Profile";
import PrivateRoute from "./PrivateRoute";
import Auth from "../pages/patient/Auth";

function DoctorRoutes() {
    return (
        
        <Routes>
            <Route path="/" element={<DoctorLayout />}>
                <Route path="dashboard" element={<AuthorizedRoute allowedRole='doctor'><Dashboard /></AuthorizedRoute>} />
                <Route path="profile" element={<AuthorizedRoute allowedRole='doctor'><Profile /></AuthorizedRoute>} />
            </Route>
            
            <Route
                path="/verify-details"
                element={<PrivateRoute />}
            />
            <Route
                path="/auth"
                element={
                    <UnAuthorizedRoute preventedRole="doctor">
                        <Auth role='doctor' />
                    </UnAuthorizedRoute>
                }
            />

        </Routes>
    );
}

export default DoctorRoutes;
