import UserLayout from '../pages/patient/UserLayout';
import UnAuthorizedRoute from './UnAuthorizedRoute';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/patient/Home';
import Auth from '../pages/patient/Auth';
import PublicRoutes from './PublicRoutes';
import Profile from '../pages/patient/Profile';
import AuthorizedRoute from './AuthorizedRoute';
import FindDoctors from '../pages/patient/FindDoctors';

function UserRoutes() {
  return (
    <>
    <Routes>
        <Route path='/user' element={<UserLayout/>}>
          <Route index element={<PublicRoutes><Home/></PublicRoutes>}/>
          <Route path="auth" element={<UnAuthorizedRoute preventedRole={'user'}><Auth role='user'/></UnAuthorizedRoute>}/>
          <Route path="profile" element={<AuthorizedRoute allowedRole={'user'}><Profile/></AuthorizedRoute>}/>
          <Route path='find-doctors' element={<PublicRoutes><FindDoctors/></PublicRoutes>}/>
        </Route>
    </Routes>
    </>
  )
}

export default UserRoutes
