import { Route, Routes } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import VideoCallInterface from '../pages/common/VideoCallInterface'


const VideoCallRoute = () => {
    return (
        <Routes>
            <Route
                path="/meeting"
                element={<PublicRoutes><VideoCallInterface /></PublicRoutes>} />
        </Routes>
    )
}

export default VideoCallRoute
