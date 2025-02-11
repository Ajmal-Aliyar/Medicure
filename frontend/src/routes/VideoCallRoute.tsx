import { Route, Routes } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import VideoCallInterface from '../pages/common/VideoCallInterface'
import { useEffect } from 'react'
import { connectWithSocketIOServer } from '../utils/wss'


const VideoCallRoute = () => {
    useEffect(() => {
        connectWithSocketIOServer()
    }, [])
    return (
        <Routes>
            
            <Route
                path="/meeting/:roomId"
                element={<VideoCallInterface />} />
        </Routes>
    )
}

export default VideoCallRoute
