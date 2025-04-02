import { setError, setSuccess } from "../store/slices/commonSlices/notificationSlice";
import store from "../store/store";
import { signalPeerData, socket } from "./wss";
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
    return localStream
  } catch (error) {
    store.dispatch(setError(`Error accessing local stream`))
  }
};


export const stopStreaming = (roomId: string) => {
  try {
    for (const socketId in peerConnections) {
      if (peerConnections.hasOwnProperty(socketId)) {
        peerConnections[socketId].close();
        delete peerConnections[socketId];
      }
    }

    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
      });
      localStream = null;
    }
    streams = [];

    console.log('emmitted');
    socket.emit('candidate-left', { roomId });
    console.log('emmitted');
    

    store.dispatch(setSuccess('Consulting finished successfully.'));
  } catch (error) {
    store.dispatch(setError('Error while stopping streaming.'));
  }
};

export const prepareNewPeerConnection = (socketId: string, isInitiator: boolean) => {
  try {
    if (!localStream) {
      store.dispatch(setError('localStream is not initialized!'))
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
        signalPeerData({
          signal: event.candidate,
          socketId
        });
      }
    };

    peerConnection.ontrack = (event) => {
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
    store.dispatch(setError(`Error creating RTCPeerConnection`))
  }
};

export const handleSignalData = (data: { socketId: string, signal: any }) => {
  const { socketId, signal } = data;

  if (!peerConnections[socketId]) {
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
            .catch(error => store.dispatch(setError(`Error creating answer`)) );
        }
      })
      .catch(error => store.dispatch(setError(`Error setting remote description`)) );
  }

  else if (signal.candidate) {
    const iceCandidate = new RTCIceCandidate(signal);
    peerConnection.addIceCandidate(iceCandidate)
      .catch(error => store.dispatch(setError(`Error adding ICE candidate`)) );
  }

  else {
    store.dispatch(setError(`Invalid signal data`))
  }
};



