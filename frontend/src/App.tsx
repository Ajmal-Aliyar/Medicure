import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import DoctorRoutes from './routes/DoctorRoutes';
import AdminRoutes from './routes/AdminRoutes';

const App = () => {
  return (
    <Router>
      <Routes >
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
