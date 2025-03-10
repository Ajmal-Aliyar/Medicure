import { Route, Routes } from 'react-router-dom'
import VideoCallInterface from '../pages/common/VideoCallInterface'


const VideoCallRoute = () => {
    
    return (
        <Routes>
            
            <Route
                path="/meeting/:roomId"
                element={<VideoCallInterface />} />
        </Routes>
    )
}

export default VideoCallRoute
