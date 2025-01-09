import { Route, Routes } from 'react-router-dom';
import Home from '../pages/patient/Home';
import Auth from '../pages/patient/Auth';
import Menu from '../components/common/Menu';
function patient() {
  return (
    <>
    <Menu />
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
    </Routes>
    </>
  )
}

export default patient
