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
};

const AuthorizedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { role, isAuthenticated } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get<UserInfo>('/api/auth/user-info');
                dispatch(setData(response.data));
                dispatch(login());
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!isAuthenticated) {
            fetchUserInfo();
        } else {
            setLoading(false);
        }
    }, [dispatch, isAuthenticated]);

    if (loading) {
        return <div className='flex justify-center items-center'><HoneyComb /></div>;
    }

    if (!isAuthenticated || allowedRole !== role) {
        const redirectPath = `/${allowedRole}/auth`;
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default AuthorizedRoute;
