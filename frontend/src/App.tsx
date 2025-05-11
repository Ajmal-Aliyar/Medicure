import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import DoctorRoutes from './routes/DoctorRoutes';
import AdminRoutes from './routes/AdminRoutes';
import NotificationPortal from './components/common/NotificatinPortal';
import VideoCallRoute from './routes/VideoCallRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuth from './components/auth/GoogleAuth';
import { connectWithSocketIOServer } from './utils/wss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { ENV } from './constants/env';


const App = () => {
  const _id = useSelector((state: RootState) => state.auth._id)
  useEffect(() => {
    connectWithSocketIOServer(_id)
    console.log('connected to socket', _id );
    
  }, [_id])

  return (
    <Router>
      <NotificationPortal />
      <Routes >
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/consult/*" element={<VideoCallRoute />} />
        <Route path='/checkAuth' element={<GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>
          <GoogleAuth />
        </GoogleOAuthProvider>} />
      </Routes>
    </Router>
  );
};

export default App;
