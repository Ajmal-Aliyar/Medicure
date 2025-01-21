import { login, setData } from '../store/slices/commonSlices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import HoneyComb from '../components/common/HoneyComb';
import { api } from '../utils/axiosInstance';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { AuthInfo } from './AuthorizedRoute';

interface ProtectedRouteProps {
    children: JSX.Element;
    preventedRole: string;
}



const UnAuthorizedRoute = ({ children, preventedRole }: ProtectedRouteProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get<AuthInfo>('/api/auth/user-info');
                console.log('Fetched user data:', response.data);
                if (response.data) {

                    dispatch(setData(response.data));
                    dispatch(login());
                }
            } catch (error) {

                console.error('Error fetching auth user data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo()

    }, [dispatch, loading]);

    const { role, isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (loading) return <div className='w-screen h-screen flex justify-center items-center fixed'><HoneyComb /></div>;

    if (error) return <div className='text-red-500 text-center'>{error}</div>;

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
