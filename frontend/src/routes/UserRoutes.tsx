import UserLayout from '../pages/patient/UserLayout';
// import UnAuthorizedRoute from './UnAuthorizedRoute';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/patient/Home';
import Auth from '../pages/patient/Auth';
// import PublicRoutes from './PublicRoutes';
import Profile from '../pages/patient/Profile';
// import AuthorizedRoute from './AuthorizedRoute';
import FindDoctors from '../pages/patient/FindDoctors';
import Specialization from '../pages/patient/Specialization';
import UserDriveLayout from '../pages/patient/UserDriveLayout';
import Appointments from '../components/patient/userDrive/appointments/Appointments';
import Feedback from '../components/patient/userDrive/feedbacks/Feedback';
import Finance from '../components/patient/userDrive/finance/Finance';
import PageNotFound from '../pages/common/PageNotFound';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ChatLayout from '../pages/patient/ChatLayout';
import MedicalRecord from '../components/patient/userDrive/medicalRecords/MedicalRecord';
import { ENV } from '../constants/env';
import UnAuthorizedRoute from './UnAuthorizedRoute';
import AuthorizedRoute from './AuthorizedRoute';
import PublicRoutes from './PublicRoutes';



function UserRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<UserLayout />}>

          <Route path="auth" element={
            <UnAuthorizedRoute>
              <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>
                <Auth role='patient' />
              </GoogleOAuthProvider>
            </UnAuthorizedRoute>
          } />

          <Route index element={<PublicRoutes><Home /></PublicRoutes>} />
          
          <Route path="profile" element={<AuthorizedRoute allowedRole={'patient'}><Profile /></AuthorizedRoute>} />
          <Route path='find-doctors' element={
            <PublicRoutes>
            <FindDoctors />
           </PublicRoutes>
          } />
          <Route path='find-doctors/:specialization' element={
            <PublicRoutes>
              <Specialization />
              </PublicRoutes>
            } />
          <Route path="chat" element={<AuthorizedRoute allowedRole={'patient'}><ChatLayout /></AuthorizedRoute>} />



          <Route path='drive' element={<UserDriveLayout />}>
            <Route path='medical-records' element={<AuthorizedRoute allowedRole={'patient'}><MedicalRecord /></AuthorizedRoute>} />
            <Route path='appointments' element={<AuthorizedRoute allowedRole={'patient'}><Appointments /></AuthorizedRoute>} />
            <Route path='feedbacks' element={<AuthorizedRoute allowedRole={'patient'}><Feedback /></AuthorizedRoute>} />
            <Route path='payments' element={<AuthorizedRoute allowedRole={'patient'}><Finance /></AuthorizedRoute>} />
          </Route>


        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </>
  )
}

export default UserRoutes
