import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { api } from '../utils/axiosInstance';
import { login, setData } from '../store/slices/userSlice';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
    children: JSX.Element;
}

type UserInfo = {
    email: string;
    role: string;
};

const PublicRoutes = ({ children }: ProtectedRouteProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const { role, isAuthenticated } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        api.post<UserInfo>('/api/auth/user-info')
            .then((response) => {
                const userData = response.data;
                dispatch(setData(userData));
                dispatch(login());
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Failed to fetch user data');
                setLoading(false);
            });
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (isAuthenticated) {
        if (role === 'doctor') {
            return <Navigate to="/doctor" />;
        }
        if (role === 'admin') {
            return <Navigate to="/admin" />;
        }
        return <Navigate to="/" />;
    }
    return children;
};

export default PublicRoutes;
