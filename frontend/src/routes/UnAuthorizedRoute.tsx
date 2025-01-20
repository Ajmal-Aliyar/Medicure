import { login, setData } from '../store/slices/commonSlices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import HoneyComb from '../components/common/HoneyComb';
import { api } from '../utils/axiosInstance';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';

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
    const [showSpinner, setShowSpinner] = useState(false); 
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {

        const spinnerTimeout = setTimeout(() => {
            if (loading) {
                setShowSpinner(true);
            }
        }, 500);

        api.get<UserInfo>('/api/auth/user-info')
            .then((response) => {
                const userData = response.data;
                console.log(userData, 'ussss');
                dispatch(setData(userData));
                dispatch(login());
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error from unauthorized:', err);
                setLoading(false);
            });

        return () => clearTimeout(spinnerTimeout);

    }, [dispatch, loading]);

    const { role, isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (loading && showSpinner) return <div className='w-screen h-screen flex justify-center items-center fixed'><HoneyComb /></div>;
    
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
