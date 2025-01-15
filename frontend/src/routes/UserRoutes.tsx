import { Route, Routes } from 'react-router-dom';
import Home from '../pages/patient/Home';
import Auth from '../pages/patient/Auth';
import PublicRoutes from './PublicRoutes';
import UnAuthorizedRoute from './UnAuthorizedRoute';
import UserLayout from '../pages/patient/UserLayout';
function UserRoutes() {
  return (
    <>
    <Routes>
        <Route path='/user' element={<UserLayout/>}>
          <Route index element={<PublicRoutes><Home/></PublicRoutes>}/>
          <Route path="auth" element={<UnAuthorizedRoute preventedRole={'user'}><Auth role='user'/></UnAuthorizedRoute>}/>
        </Route>
        {/* <Route path="/dashboard" element={<AuthorizedRoute allowedRole={'user'}><Home/></AuthorizedRoute>} /> */}
    </Routes>
    </>
  )
}

export default UserRoutes
