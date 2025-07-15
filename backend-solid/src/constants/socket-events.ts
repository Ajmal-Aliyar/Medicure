export const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  CHAT: {
    SEND_MESSAGE: "chat:send-message", 
    RECEIVE_MESSAGE: "chat:receive-message", 
    TYPING: "chat:typing",               
    STOP_TYPING: "chat:stop-typing",     
    MESSAGE_SEEN: "chat:message-seen",   
    FETCH_HISTORY: "chat:fetch-history"  
  },


  CONSULT: {
    JOIN_ROOM: "consult:join-room",
    DOCTOR_JOINED: "consult:doctor-joined",
    JOINED_ROOM: "consult:joined-room",
    OFFER: "consult:offer",
    ANSWER: "consult:answer",
    ICE_CANDIDATE: "consult:ice-candidate"
  }
};
