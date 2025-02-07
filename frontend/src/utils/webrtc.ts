
import { signalPeerData } from "./wss";
import EventEmitter from 'eventemitter3';
export const streamEvents = new EventEmitter();


const getConfiguration = () => ({
  
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      {
        urls: 'turn:your.turn.server.com:3478',
        username: 'yourUsername',
        credential: 'yourCredential'
      }
    ]
  
  
});

const defaultConstraints: MediaStreamConstraints = {
    audio: true,
    video: true
};

let localStream: MediaStream | null = null;
let peerConnections: Record<string, RTCPeerConnection> = {};
let streams: MediaStream[] = [];

export const getLocalPreviewAndInitRoomConnection = async (): Promise<any> => {
  try {
      localStream = await navigator.mediaDevices.getUserMedia(defaultConstraints);
      console.log("Successfully received local stream");
      return localStream
  } catch (error) {
      console.error("Error accessing local stream:", error);
  }
};

export const prepareNewPeerConnection = (socketId: string, isInitiator: boolean) => {
  try {
      if (!localStream) {
          alert("localStream is not initialized!");
          return;
      }
      const configuration = getConfiguration();
      const peerConnection = new RTCPeerConnection(configuration);
      peerConnections[socketId] = peerConnection;

      localStream.getTracks().forEach(track => {
          peerConnection.addTrack(track, localStream!);
      });

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('peer connecting')
          signalPeerData({
            signal: event.candidate,
            socketId
          });
        }
      };

      peerConnection.ontrack = (event) => {
        console.log("new stream received");
        const remoteStream = event.streams[0];
        streamEvents.emit('new-remote-stream', remoteStream);
        streams.push(remoteStream);
    };

      if (isInitiator) {
        
          peerConnection.createOffer().then(offer => {
              peerConnection.setLocalDescription(offer);
              signalPeerData({ signal: offer, socketId });
          });
      }
  } catch (error) {
      console.error("Error creating RTCPeerConnection:", error);
  }
};

export const handleSignalData = (data: { socketId: string, signal: any }) => {
  const { socketId, signal } = data;

  if (!peerConnections[socketId]) {
    alert('Peer connection not found');
    return;
  }

  const peerConnection = peerConnections[socketId];

  if (signal.sdp) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(signal))
      .then(() => {
        if (signal.type === "offer") {
          peerConnection.createAnswer()
            .then(answer => {
              peerConnection.setLocalDescription(answer);
              signalPeerData({ signal: answer, socketId });
            })
            .catch(error => console.error('Error creating answer:', error));
        }
      })
      .catch(error => console.error('Error setting remote description:', error));
  } 
  
  else if (signal.candidate) {
    const iceCandidate = new RTCIceCandidate(signal);
    peerConnection.addIceCandidate(iceCandidate)
      .catch(error => console.error('Error adding ICE candidate:', error));
  } 
  
  else {
    console.error("Invalid signal data:", signal);
  }
};



// const addStream = (stream: MediaStream, socketId: string, videoRef: React.RefObject<HTMLVideoElement>): void => {
//   console.log(`Stream received from socketId: ${socketId}`);
//   if (videoRef.current) {
//     videoRef.current.srcObject = stream;
//   }
// };
