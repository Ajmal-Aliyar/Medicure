import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import HoneyComb from '../components/common/HoneyComb';
import VerifyDetails from '../pages/doctor/VerifyDetails';
import ProfileCompleted from '../components/doctor/verify-details/ProfileCompleted';
import Banner from '../components/doctor/verify-details/Banner';
import ProfileRejected from '../components/doctor/verify-details/ProfileRejected';

const PrivateRoute = () => {
  const { isAuthenticated, isApproved, role } = useSelector((state: RootState) => state.auth);
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
    return (
      <div className="w-screen h-screen flex justify-center items-center fixed bg-[#e9e9e9]">
        <HoneyComb />
      </div>
    );
  }

  if (!isAuthenticated || role !== 'doctor') {
    return <Navigate to="/doctor/auth" replace />;
  }

  switch (isApproved) {
    case 'pending':
        return <VerifyDetails />
    case 'applied':
        return <><Banner /><ProfileCompleted /></>
    case 'rejected':
        return <><Banner /><ProfileRejected /></>
    default: return <Navigate to="/doctor/dashboard" replace />
  }
};

export default PrivateRoute;
