import { login, setData } from '../store/slices/commonSlices/AuthSlice';
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

type AuthInfo = {
    _id: string;
    role: string;
    email: string;
    isApproved?: boolean;
};

const AuthorizedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { role, isAuthenticated, isApproved } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get<AuthInfo>('/api/auth/user-info');
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

        if (!isAuthenticated || isApproved === undefined) {
            fetchUserInfo();
        } else {
            setLoading(false);
        }
    }, [dispatch, isAuthenticated, isApproved]);

    if (loading) {
        return (
            <div className='w-screen h-screen flex justify-center items-center fixed bg-[#e9e9e9]'>
                <HoneyComb />
            </div>
        );
    }

    if (!isAuthenticated) return <Navigate to={`/${allowedRole}/auth`} replace />;
    if (role === 'doctor' && isApproved === false) return <Navigate to='/doctor/verify-details' replace />;
    if (allowedRole !== role) return <Navigate to={`/${allowedRole}/auth`} replace />;

    return children;
};

export default AuthorizedRoute;
