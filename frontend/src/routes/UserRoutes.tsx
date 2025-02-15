import UserLayout from '../pages/patient/UserLayout';
import UnAuthorizedRoute from './UnAuthorizedRoute';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/patient/Home';
import Auth from '../pages/patient/Auth';
import PublicRoutes from './PublicRoutes';
import Profile from '../pages/patient/Profile';
import AuthorizedRoute from './AuthorizedRoute';
import FindDoctors from '../pages/patient/FindDoctors';
import Specialization from '../pages/patient/Specialization';
import UserDriveLayout from '../pages/patient/UserDriveLayout';
import Appointments from '../components/patient/userDrive/appointments/Appointments';
import Feedback from '../components/patient/userDrive/appointments/Feedback';


function UserRoutes() {
  return (
    <>
       <Routes>
        <Route path='/user' element={<UserLayout/>}>


          <Route index element={<PublicRoutes><Home/></PublicRoutes>}/>
          <Route path="auth" element={<UnAuthorizedRoute preventedRole={'user'}><Auth role='user'/></UnAuthorizedRoute>}/>
          <Route path="profile" element={<AuthorizedRoute allowedRole={'user'}><Profile/></AuthorizedRoute>}/>
          <Route path='find-doctors' element={<PublicRoutes><FindDoctors/></PublicRoutes>}/>
          <Route path='find-doctors/:specialization' element={<PublicRoutes><Specialization/></PublicRoutes>}/>



          <Route path='drive' element={<UserDriveLayout/>}>
            <Route path='medical-records' element={<AuthorizedRoute allowedRole={'user'}><div>medical record</div></AuthorizedRoute>}/>
            <Route path='appointments' element={<AuthorizedRoute allowedRole={'user'}><Appointments /></AuthorizedRoute>}/>
            <Route path='feedbacks' element={<AuthorizedRoute allowedRole={'user'}><Feedback /></AuthorizedRoute>}/>
            <Route path='payments' element={<AuthorizedRoute allowedRole={'user'}><div>payments</div></AuthorizedRoute>}/>
          </Route>

          
        </Route>
    </Routes>
   
    </>
  )
}

export default UserRoutes
