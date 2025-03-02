import { Route, Routes } from 'react-router-dom'
import VideoCallInterface from '../pages/common/VideoCallInterface'
import { useEffect } from 'react'
import { connectWithSocketIOServer } from '../utils/wss'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'


const VideoCallRoute = () => {
    const clientId = useSelector((state: RootState) => state.auth._id)
    useEffect(() => {
        connectWithSocketIOServer(clientId)
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
