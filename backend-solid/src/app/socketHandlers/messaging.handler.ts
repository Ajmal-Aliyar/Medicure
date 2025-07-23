import { SOCKET_EVENTS } from "@/constants/socket-events";
import { ICacheService } from "@/interfaces";
import { IConversationService, IMessageService } from "@/services";
import { Server, Socket } from "socket.io";

export const handleChatingEvents = (
  io: Server,
  socket: Socket,
  cacheService: ICacheService,
  messageService: IMessageService
) => {
  socket.on(
    SOCKET_EVENTS.CHAT.SEND_MESSAGE,
    ({ senderId, participants, message }) => {
      participants.forEach(async (participant: string) => {
        const socketId = await cacheService.get(`socket:${participant}`);
        if (senderId !== participant) {
          io.to(socketId as string).emit(SOCKET_EVENTS.CHAT.RECEIVE_MESSAGE, {
            message,
          });
        }
        io.to(socketId as string).emit(SOCKET_EVENTS.CHAT.LAST_MESSAGE, {
          message,
        });
      });
      messageService.createMessage({
        conversationId: message.conversationId,
        senderId,
        content: message.text,
        createdAt: message.timestamp,
      });
    }
  );

  // socket.on(SOCKET_EVENTS.CHAT.TYPING, ({ to }) => {
  //   io.to(to).emit(SOCKET_EVENTS.CHAT.TYPING, { from: socket.id });
  // });

  // socket.on(SOCKET_EVENTS.CHAT.STOP_TYPING, ({ to }) => {
  //   io.to(to).emit(SOCKET_EVENTS.CHAT.STOP_TYPING, { from: socket.id });
  // });

  // socket.on(SOCKET_EVENTS.CHAT.MESSAGE_SEEN, ({ to, messageId }) => {
  //   io.to(to).emit(SOCKET_EVENTS.CHAT.MESSAGE_SEEN, { messageId });
  // });
};
