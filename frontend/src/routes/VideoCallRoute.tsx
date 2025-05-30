import { Route, Routes } from 'react-router-dom'
import VideoCallInterface from '../pages/common/VideoCallInterface'
// import AuthorizedRoute from './AuthorizedRoute'

const VideoCallRoute = () => {
    
    return (
        <Routes>
            
            {/* <Route
                path="/doctor/meeting/:roomId"
                element={<AuthorizedRoute allowedRole='doctor'><VideoCallInterface/></AuthorizedRoute> } />

            <Route
                path="/meeting/:roomId"
                element={<AuthorizedRoute allowedRole='patient'><VideoCallInterface/></AuthorizedRoute> } /> */}
        </Routes>
    )
}

export default VideoCallRoute
