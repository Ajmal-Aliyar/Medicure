import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import DoctorRoutes from './routes/DoctorRoutes';
import AdminRoutes from './routes/AdminRoutes';
import NotificationPortal from './components/common/NotificatinPortal';
import VideoCallRoute from './routes/VideoCallRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuth from './components/auth/GoogleAuth';
import { connectWithSocketIOServer } from './utils/wss';
import { useEffect } from 'react';

const clientId = "757238086713-cmaic773782cs0qguopsrcmgvgk1jlj7.apps.googleusercontent.com"; 

const App = () => {
  useEffect(() => {
    connectWithSocketIOServer(clientId)
}, [])

  return (
    <Router>
      <NotificationPortal />
      <Routes >
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/consult/*" element={<VideoCallRoute />} />
        <Route path='/checkAuth' element={<GoogleOAuthProvider clientId={clientId}>
      <GoogleAuth />
    </GoogleOAuthProvider>} />
      </Routes>
    </Router>
  );
};

export default App;
