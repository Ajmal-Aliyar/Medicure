import socket from "@/sockets";
import { SOCKET_EVENTS } from "@/types/socket";

export const registerChatHandlers = () => {
  socket.on(SOCKET_EVENTS.CHAT.RECEIVE_MESSAGE, (message) => {
    console.log("New message:", message);
  });

  socket.on(SOCKET_EVENTS.CHAT.TYPING, (userId) => {
  });

  socket.on(SOCKET_EVENTS.CHAT.STOP_TYPING, (userId) => {
  });
};


// import { SOCKET_EVENTS } from "@/types/socket";
// import socket from "../index";

// export const listenForMessages = () => {
//   socket.on(SOCKET_EVENTS.MESSAGE.RECEIVE, (message: string) => {
//     console.log("New message received:", message);
//   });
// };

// export const sendMessage = (data: { to: string; content: string }) => {
//   socket.emit(SOCKET_EVENTS.MESSAGE.SEND, data);
// };
