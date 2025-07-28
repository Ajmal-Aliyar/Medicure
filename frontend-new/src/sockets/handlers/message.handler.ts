import socket from "@/sockets";
import { SOCKET_EVENTS } from "@/types/socket";
import toast from "react-hot-toast";

export const registerChatHandlers = () => {
  socket.on(SOCKET_EVENTS.CHAT.RECEIVE_MESSAGE, ({message}) => {
    console.log(message);
    
    toast(`New message from ${message.senderName || "someone"}`, {
      icon: "💬",
      position: "bottom-right",
    });
  });
};
