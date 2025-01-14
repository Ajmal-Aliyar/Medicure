import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { api } from '../utils/axiosInstance';
import { login, setData } from '../store/slices/userSlice';
import { useEffect, useState } from 'react';
import HoneyComb from '../components/common/HoneyComb';

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

    useEffect(() => {
        api.get<UserInfo>('/api/auth/user-info')
            .then((response) => {
                const userData = response.data;
                dispatch(setData(userData));
                dispatch(login());
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [dispatch]);

    if (loading) {
        return <div className='flex justify-center items-center bg-[#e9e9e9]'><HoneyComb /></div>;
    }

    return children;
};

export default PublicRoutes;
