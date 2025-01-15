import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { api } from '../utils/axiosInstance';
import { login, setData } from '../store/slices/userSlice';
import { useEffect, useState } from 'react';
import HoneyComb from '../components/common/HoneyComb';

interface ProtectedRouteProps {
    children: JSX.Element;
    preventedRole: string;
}

type UserInfo = {
    _id: string;
    email: string;
    role: string;
};

const UnAuthorizedRoute = ({ children, preventedRole }: ProtectedRouteProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        api.get<UserInfo>('/api/auth/user-info')
            .then((response) => {
                const userData = response.data;
                console.log(userData,'ussss')
                dispatch(setData(userData));
                dispatch(login());
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch user data.');
                console.error('Error:', err);
                setLoading(false);
            });
    }, [dispatch]);
    
    
    const { role, isAuthenticated } = useSelector((state: RootState) => state.user);

    if (loading) {
        return <div className='flex justify-center items-center'><HoneyComb /></div>;
    }

    if (error) {
        // return <div className='text-red-500 text-center'>{error}</div>;
    }

    if (isAuthenticated && role === preventedRole) {
        switch (role) {
            case 'doctor':
                return <Navigate to="/doctor/dashboard" />;
            case 'admin':
                return <Navigate to="/admin/dashboard" />;
            case 'user':
                return <Navigate to="/user/" />;
            default:
                return <Navigate to="/" />;
        }
    }

    return children;
};

export default UnAuthorizedRoute;
