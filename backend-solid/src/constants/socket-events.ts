export const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  VIDEO_CALL: {
    INITIATE: "video:initiate",         
    RINGING: "video:ringing",            
    ACCEPTED: "video:accepted",               
    ACCEPT: "video:accept",               
    REJECT: "video:reject",               
    END: "video:end",                     
    BUSY: "video:busy",                 

    OFFER: "video:offer",              
    ANSWER: "video:answer",             
    ICE_CANDIDATE: "video:ice-candidate" 
  },

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
    JOINED_ROOM: "consult:joined-room",
    OFFER: "consult:offer",
    ANSWER: "consult:answer",
    ICE_CANDIDATE: "consult:ice-candidate"
  }
};
