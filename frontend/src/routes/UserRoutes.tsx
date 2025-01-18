import UserLayout from '../pages/patient/UserLayout';
import UnAuthorizedRoute from './UnAuthorizedRoute';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/patient/Home';
import Auth from '../pages/patient/Auth';
import PublicRoutes from './PublicRoutes';
import Profile from '../pages/patient/Profile';
import AuthorizedRoute from './AuthorizedRoute';

function UserRoutes() {
  return (
    <>
    <Routes>
        <Route path='/user' element={<UserLayout/>}>
          <Route index element={<PublicRoutes><Home/></PublicRoutes>}/>
          <Route path="auth" element={<UnAuthorizedRoute preventedRole={'user'}><Auth role='user'/></UnAuthorizedRoute>}/>
          <Route path="profile" element={<AuthorizedRoute allowedRole={'user'}><Profile/></AuthorizedRoute>}/>
        </Route>
    </Routes>
    </>
  )
}

export default UserRoutes
