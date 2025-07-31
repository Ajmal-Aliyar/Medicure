import socket from "@/sockets";
import { SOCKET_EVENTS } from "@/types/socket";

export const registerConsultationHandlers = () => {
  socket.on(SOCKET_EVENTS.CONSULT.DOCTOR_JOINED, ({ roomId, socketId }) => {
    console.log(roomId, socketId, 'doctor joined');
    window.location.href=`/consultation/${roomId}`
  });
};
