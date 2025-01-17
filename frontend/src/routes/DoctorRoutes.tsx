import DoctorLayout from "../pages/doctor/DoctorLayout";
import UnAuthorizedRoute from "./UnAuthorizedRoute";
import Dashboard from "../pages/doctor/Dashboard";
import { Route, Routes } from "react-router-dom";
import AuthorizedRoute from "./AuthorizedRoute";
import Profile from "../pages/doctor/Profile";
import PrivateRoute from "./PrivateRoute";
import Auth from "../pages/patient/Auth";
import TestNotificationPage from "../components/common/TestNotificationPage";

function DoctorRoutes() {
    return (
        
        <Routes>
            <Route path="/" element={<DoctorLayout />}>
                <Route path="dashboard" element={<AuthorizedRoute allowedRole='doctor'><Dashboard /></AuthorizedRoute>} />
                <Route path="profile" element={<Profile />} />
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
            <Route
                path="/test-notification"
                element={<TestNotificationPage/>}
            />
        </Routes>
    );
}

export default DoctorRoutes;
