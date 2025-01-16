import VerifyDetails from '../pages/doctor/VerifyDetails';
import HoneyComb from '../components/common/HoneyComb';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { isAuthenticated, isApproved } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {

        const spinnerTimeout = setTimeout(() => {
            if (loading) {
                setShowSpinner(true);
            }
        }, 500);

        setLoading(false);

        return () => clearTimeout(spinnerTimeout);

    }, [loading]);

    if (loading && showSpinner) {
        return <div className='w-screen h-screen flex justify-center items-center fixed bg-[#e9e9e9]'><HoneyComb /></div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/doctor/auth" replace />;
    }

    if (isAuthenticated && isApproved) {
        return <Navigate to="/doctor/dashboard" replace />;
    }

    return <VerifyDetails />;
};

export default PrivateRoute;
