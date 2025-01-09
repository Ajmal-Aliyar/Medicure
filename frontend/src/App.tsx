import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Patient from './routes/Patient';
import Doctors from './routes/Doctors';
import Admin from './routes/Admin';

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/*" element={<Patient />} />
        <Route path="/doctor/*" element={<Doctors />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
