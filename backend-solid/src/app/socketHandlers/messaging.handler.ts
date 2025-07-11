import { SOCKET_EVENTS } from "@/constants/socket-events";
import { ICacheService } from "@/interfaces";
import { Server, Socket } from "socket.io";

export const handleChatingEvents = (io: Server, socket: Socket, cacheService: ICacheService) => {
  socket.on(SOCKET_EVENTS.CHAT.SEND_MESSAGE, ({ to, message }) => {
    io.to(to).emit(SOCKET_EVENTS.CHAT.RECEIVE_MESSAGE, message);
  });

  socket.on(SOCKET_EVENTS.CHAT.TYPING, ({ to }) => {
    io.to(to).emit(SOCKET_EVENTS.CHAT.TYPING, { from: socket.id });
  });

  socket.on(SOCKET_EVENTS.CHAT.STOP_TYPING, ({ to }) => {
    io.to(to).emit(SOCKET_EVENTS.CHAT.STOP_TYPING, { from: socket.id });
  });

  socket.on(SOCKET_EVENTS.CHAT.MESSAGE_SEEN, ({ to, messageId }) => {
    io.to(to).emit(SOCKET_EVENTS.CHAT.MESSAGE_SEEN, { messageId });
  });
};
