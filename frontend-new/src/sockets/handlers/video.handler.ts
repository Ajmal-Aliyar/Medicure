import socket from "@/sockets";
import { SOCKET_EVENTS } from "@/types/socket";


export const registerVideoHandlers = () => {
  socket.on(SOCKET_EVENTS.VIDEO_CALL.RINGING, (data) => {
    console.log("Incoming call", data);
  });

  socket.on(SOCKET_EVENTS.VIDEO_CALL.OFFER, (offer) => {
    console.log("Received offer", offer);
  });

  socket.on(SOCKET_EVENTS.VIDEO_CALL.ANSWER, (answer) => {
    console.log("Received answer", answer);
  });

  socket.on(SOCKET_EVENTS.VIDEO_CALL.ICE_CANDIDATE, (candidate) => {
    console.log("Received ICE candidate", candidate);
  });

  socket.on(SOCKET_EVENTS.VIDEO_CALL.END, () => {
    console.log("Call ended");
  });
};


// import { SOCKET_EVENTS } from "@/types/socket";
// import socket from "../index";

// export const sendVideoOffer = (data: { to: string; offer: RTCSessionDescriptionInit }) => {
//   socket.emit(SOCKET_EVENTS.VIDEO.OFFER, data);
// };

// export const listenForVideoAnswer = (callback: (data: any) => void) => {
//   socket.on(SOCKET_EVENTS.VIDEO.ANSWER, callback);
// };

// export const sendIceCandidate = (data: { to: string; candidate: RTCIceCandidate }) => {
//   socket.emit(SOCKET_EVENTS.VIDEO.ICE_CANDIDATE, data);
// };

// export const listenForIceCandidates = (callback: (data: any) => void) => {
//   socket.on(SOCKET_EVENTS.VIDEO.ICE_CANDIDATE, callback);
// };
