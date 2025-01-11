import { Route, Routes } from 'react-router-dom';
import Home from '../pages/patient/Home';
import Auth from '../pages/patient/Auth';
import Menu from '../components/common/Menu';
import AuthorizedRoute from './AuthorizedRoute';
function UserRoutes() {
  return (
    <>
    <Menu />
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/dashboard" element={<AuthorizedRoute allowedRoles={'user'}><Home/></AuthorizedRoute>} />
    </Routes>
    </>
  )
}

export default UserRoutes
