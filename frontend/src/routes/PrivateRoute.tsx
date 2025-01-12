import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';
import VerifyDetails from '../pages/admin/VerifyDetails';

const PrivateRoute = () => {
    const { isAuthenticated, isApproved, role } = useSelector((state: RootState) => state.user);

    if (!isAuthenticated) {
        return <Navigate to="/doctor/auth" replace />;
    }

    if (role === 'doctor' && !isApproved) {
        return <Navigate to="/approve-details" replace />;
    }

    return <VerifyDetails />;
};

export default PrivateRoute;
