import { SOCKET_EVENTS } from "@/constants/socket-events";
import { ICacheService } from "@/interfaces";
import { Server, Socket } from "socket.io";

export const handleConsultationEvents = (
  io: Server,
  socket: Socket,
  cacheService: ICacheService
) => {

  socket.on(
    SOCKET_EVENTS.CONSULT.JOIN_ROOM,
    async ({ roomId }) => {
      socket.join(roomId);
      socket
        .to(roomId)
        .emit(SOCKET_EVENTS.CONSULT.JOINED_ROOM, { socketId: socket.id });
    }
  );

  socket.on(SOCKET_EVENTS.CONSULT.OFFER, ({ offer, to }) => {
    io.to(to).emit(SOCKET_EVENTS.CONSULT.OFFER, { offer, from: socket.id });
  });

  socket.on(SOCKET_EVENTS.CONSULT.ANSWER, ({ answer, to }) => {
    io.to(to).emit(SOCKET_EVENTS.CONSULT.ANSWER, { answer, from: socket.id });
  });

  socket.on(SOCKET_EVENTS.CONSULT.ICE_CANDIDATE, async ({ to, candidate }) => {
    const socketId = await cacheService.get(`socket:${to}`);
    io.to(socketId as string).emit(SOCKET_EVENTS.CONSULT.ICE_CANDIDATE, {
      candidate,
    });
  });
};
