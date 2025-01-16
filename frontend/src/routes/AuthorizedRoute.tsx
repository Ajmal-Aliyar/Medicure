import { login, setData } from '../store/slices/userSlice';
import HoneyComb from '../components/common/HoneyComb';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../utils/axiosInstance';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RootState } from '../store/store';

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
    const [showSpinner, setShowSpinner] = useState(false);
    const { role, isAuthenticated, isApproved } = useSelector(
        (state: RootState) => state.user
    )
    
    useEffect(() => {

        const spinnerTimeout = setTimeout(() => {
            if (loading) {
                setShowSpinner(true);
            }
        }, 500);

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

        return () => clearTimeout(spinnerTimeout);

    }, [dispatch, isAuthenticated, isApproved, role, loading]);

    if (loading && showSpinner) return <div className='w-screen h-screen flex justify-center items-center fixed bg-[#e9e9e9]'><HoneyComb /></div>;

    if (!isAuthenticated || allowedRole !== role) return <Navigate to={`/${allowedRole}/auth`} replace />;
    
    if (role === 'doctor' && isApproved === false) return <Navigate to='/doctor/verify-details' replace />;
    
    return children;
};

export default AuthorizedRoute;
