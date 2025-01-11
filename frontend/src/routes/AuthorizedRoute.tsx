import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { api } from '../utils/axiosInstance';
import { login, setData } from '../store/slices/userSlice';


interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles: string;
}

type UserInfo = {
    email: string;
    role: string;
};
const AuthorizedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const dispatch = useDispatch()
    api.post<UserInfo>('/api/auth/user-info')
    .then((response) => {
        const userData = response.data; 
        dispatch(setData(userData));  
        dispatch(login());  
    })
    .catch(error => {
        console.error('error: ', error);
    });
    const { role, isAuthenticated } = useSelector((state: RootState) => state.user);

    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    if (allowedRoles !== role) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default AuthorizedRoute;
