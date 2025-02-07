import { Route, Routes } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import VideoCallInterface from '../pages/common/VideoCallInterface'
import { useEffect } from 'react'
import { connectWithSocketIOServer } from '../utils/wss'
import ConsultHomePage from '../pages/common/ConsultHomePage'


const VideoCallRoute = () => {
    useEffect(() => {
        connectWithSocketIOServer()
    }, [])
    return (
        <Routes>
            <Route
                index
                element={<PublicRoutes><ConsultHomePage /></PublicRoutes>} />
            <Route
                path="/meeting"
                element={<PublicRoutes><VideoCallInterface /></PublicRoutes>} />
        </Routes>
    )
}

export default VideoCallRoute
