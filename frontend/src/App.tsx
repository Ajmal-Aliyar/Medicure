import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import DoctorRoutes from './routes/DoctorRoutes';
import AdminRoutes from './routes/AdminRoutes';
import NotificationPortal from './components/common/NotificatinPortal';
import VideoCallRoute from './routes/VideoCallRoute';

const App = () => {
  return (
    <Router>
      <NotificationPortal />
      <Routes >
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/consult/*" element={<VideoCallRoute />} />
      </Routes>
    </Router>
  );
};

export default App;
