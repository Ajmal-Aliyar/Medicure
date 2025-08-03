
import { Navigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { VerifyPage } from '@/pages/doctor/VerifyPage/VerifyPage';
import { Banner, ProfileCompleted, ProfileRejected } from '@/pages/doctor/VerifyPage/components';


const PrivateRoute = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/doctor/auth/login" replace />;
  }


  if (!isAuthenticated || user.role !== 'doctor') {
    return <Navigate to="/doctor/auth/login" replace />;
  }

  switch (user.isApproved) {
    case 'pending':
        return <VerifyPage />
    case 'applied':
        return <><Banner /><ProfileCompleted /></>
    case 'rejected':
        return <><Banner /><ProfileRejected /></>
    default: return <Navigate to="/doctor/dashboard" replace />
  }
};

export default PrivateRoute;
