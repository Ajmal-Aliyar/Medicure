export const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  CHAT: {
    SEND_MESSAGE: "chat:send-message",
    RECEIVE_MESSAGE: "chat:receive-message", 
    LAST_MESSAGE: "chat:last-message", 

  },

  CONSULT: {
    DOCTOR_JOINED: "consult:doctor-joined",
    JOIN_ROOM: "consult:join-room",
    JOINED_ROOM: "consult:joined-room",
    OFFER: "consult:offer",
    ANSWER: "consult:answer",
    ICE_CANDIDATE: "consult:ice-candidate"
  }
}