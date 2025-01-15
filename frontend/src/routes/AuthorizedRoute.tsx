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
    _id: string;
    role: string;
    email: string;
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
                console.log('Fetched user data:', response.data); 
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

    if (loading) {
        return <div className='flex justify-center items-center bg-[#e9e9e9]'><HoneyComb /></div>;
    }

    if (!isAuthenticated || allowedRole !== role) {
        return <Navigate to={`/${allowedRole}/auth`} replace />;
    }

    if (role === 'doctor' && isApproved === false) {
        return <Navigate to='/doctor/verify-details' replace />;
    }

    return children;
};

export default AuthorizedRoute;
