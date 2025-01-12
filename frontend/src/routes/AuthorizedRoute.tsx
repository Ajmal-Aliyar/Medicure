import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { api } from '../utils/axiosInstance';
import { login, setData } from '../store/slices/userSlice';
import { useEffect, useState } from 'react';
import HoneyComb from '../components/common/HoneyComb';

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRole: string;
}

type UserInfo = {
    email: string;
    role: string;
    isApproved?: boolean;
};

const AuthorizedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { role, isAuthenticated, isApproved } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get<UserInfo>('/api/auth/user-info');
                console.log('Fetched user data:', response.data);  // Log the response for debugging
                if (response.data) {
                    dispatch(setData(response.data));
                    dispatch(login());
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!isAuthenticated || isApproved === undefined || role === 'doctor') {
            fetchUserInfo();
        } else {
            setLoading(false);
        }
    }, [dispatch, isAuthenticated, isApproved, role]);

    // Debugging the state values
    console.log('isApproved:', isApproved);
    console.log('role:', role);
    console.log('isAuthenticated:', isAuthenticated);

    if (loading) {
        return <div className='flex justify-center items-center'><HoneyComb /></div>;
    }

    if (!isAuthenticated || allowedRole !== role) {
        return <Navigate to={`/${allowedRole}/auth`} replace />;
    }

    if (role === 'doctor' && isApproved === false) {
        return <Navigate to='/doctor/approve-details' replace />;
    }

    return children;
};

export default AuthorizedRoute;
