import { login, setData } from '../store/slices/commonSlices/AuthSlice';
import HoneyComb from '../components/common/HoneyComb';
import { api } from '../utils/axiosInstance';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface ProtectedRouteProps {
    children: JSX.Element;
}

type UserInfo = {
    _id: string;
    email: string;
    role: string;
};

const PublicRoutes = ({ children }: ProtectedRouteProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false); 

    useEffect(() => {
        
        const spinnerTimeout = setTimeout(() => {
            if (loading) {
                setShowSpinner(true);
            }
        }, 500);

        const fetchUserInfo = async () => {
            try {
                const response = await api.get<UserInfo>('/api/auth/user-info');
                const userData = response.data;
                dispatch(setData(userData));
                dispatch(login());
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();

        return () => clearTimeout(spinnerTimeout);

    }, [dispatch, loading]);

    if (loading && showSpinner) {
        return <div className='w-screen h-screen flex justify-center items-center fixed bg-[#e9e9e970]'><HoneyComb /></div>;
    }

    return children;
};

export default PublicRoutes;
