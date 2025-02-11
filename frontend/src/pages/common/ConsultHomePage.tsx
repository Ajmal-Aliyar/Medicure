import React, { useEffect, useRef } from 'react'
import { createNewRoom, joinRoom } from '../../utils/wss'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useState } from 'react'
import { getLocalPreviewAndInitRoomConnection, streamEvents } from '../../utils/webrtc'


const ConsultHomePage = () => {
    const user = useSelector((state: RootState) => state.auth)
    const roomId = useSelector((state: RootState) => state.videoConsult.roomId)
    const [room, setRoom] = useState<string>('')
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

      useEffect(() => {
          // if (user.role === 'doctor') {
          //     createNewRoom(user._id)
          // }
          const initLocalStream = async () => {
              const localStream = await getLocalPreviewAndInitRoomConnection();
        
              if (localStream && localVideoRef.current) {
                // Assign the local stream to the video element
                localVideoRef.current.srcObject = localStream;
              }
            };
        
            initLocalStream();

            const handleNewStream = (stream: MediaStream) => {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
              }
            };
        
            streamEvents.on('new-remote-stream', handleNewStream);
        
            return () => {
              streamEvents.off('new-remote-stream', handleNewStream);
            };
      },[])
    
    const createRoomHandler = () => {
        console.log('userid we',user._id)
        createNewRoom(user._id,'')
    }
    const joinRoomHandler = () => {
        console.log('userid asd',user._id, room)
        joinRoom(user._id, room)
    }

  return (
    <div>
        <p className='h-10 font-bold'>{roomId}</p>
        <input value={room} type="text" onChange={(e) => setRoom(e.target.value)}/>
      <button className='mr-3' onClick={createRoomHandler}>create room</button>
      <button onClick={joinRoomHandler}>join room</button>
      <video
            ref={remoteVideoRef}
            autoPlay
            muted
            className="w-36 h-36 mt-20  bg-black"
          />
          <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-36 h-36 bg-black"
            />
    </div>
  )
}

export default ConsultHomePage
