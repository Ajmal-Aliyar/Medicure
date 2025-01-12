import { Route, Routes } from 'react-router-dom';
import Home from '../pages/patient/Home';
import Auth from '../pages/patient/Auth';
import Menu from '../components/common/Menu';
import AuthorizedRoute from './AuthorizedRoute';
import PublicRoutes from './PublicRoutes';
import UnAuthorizedRoute from './UnAuthorizedRoute';
function UserRoutes() {
  return (
    <>
    <Menu />
    <Routes>
        <Route path="/" element={<PublicRoutes><Home/></PublicRoutes>}/>
        <Route path="/auth" element={<UnAuthorizedRoute preventedRole={'user'}><Auth role='user'/></UnAuthorizedRoute>}/>
        <Route path="/dashboard" element={<AuthorizedRoute allowedRole={'user'}><Home/></AuthorizedRoute>} />
    </Routes>
    </>
  )
}

export default UserRoutes
