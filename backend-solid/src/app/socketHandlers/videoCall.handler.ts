import { SOCKET_EVENTS } from "@/constants/socket-events";
import { ICacheService } from "@/interfaces";
import { Server, Socket } from "socket.io";

export const handleVideoCallEvents = (io: Server, socket: Socket, cacheService: ICacheService) => {
  socket.on(SOCKET_EVENTS.VIDEO_CALL.INITIATE, async ({ to, from }) => {
    const toSocketId = await cacheService.get(`socket:${to}`)
    console.log('initiate', to, toSocketId, from, socket.id)
    io.to(toSocketId as string).emit(SOCKET_EVENTS.VIDEO_CALL.RINGING, { from, socketId: socket.id });
  });

  socket.on(SOCKET_EVENTS.VIDEO_CALL.ACCEPT, async ({ to }) => {
     const toSocketId = await cacheService.get(`socket:${to}`)
    console.log('accept', to, toSocketId, socket.id)
    io.to(toSocketId as string).emit(SOCKET_EVENTS.VIDEO_CALL.ACCEPTED);
  });

  socket.on(SOCKET_EVENTS.VIDEO_CALL.REJECT, ({ to }) => {
    io.to(to).emit(SOCKET_EVENTS.VIDEO_CALL.REJECT);
  });

  socket.on(SOCKET_EVENTS.VIDEO_CALL.END, ({ to }) => {
    io.to(to).emit(SOCKET_EVENTS.VIDEO_CALL.END);
  });

  socket.on(SOCKET_EVENTS.VIDEO_CALL.OFFER, async ({ to, offer, from }) => {
    const toSocketId = await cacheService.get(`socket:${to}`)
    console.log('offer', to, from, toSocketId, socket.id)
    io.to(toSocketId as string).emit(SOCKET_EVENTS.VIDEO_CALL.OFFER, { offer, from });
  });

  socket.on(SOCKET_EVENTS.VIDEO_CALL.ANSWER, async ({ to, answer }) => {
    const toSocketId = await cacheService.get(`socket:${to}`)
    console.log('answer', to,  toSocketId, socket.id)
    io.to(toSocketId as string).emit(SOCKET_EVENTS.VIDEO_CALL.ANSWER, answer);
  });

  socket.on(SOCKET_EVENTS.VIDEO_CALL.ICE_CANDIDATE, async ({ to, candidate }) => {
     const toSocketId = await cacheService.get(`socket:${to}`)
    console.log('candidate', to,  toSocketId, candidate)
    io.to(toSocketId as string).emit(SOCKET_EVENTS.VIDEO_CALL.ICE_CANDIDATE, candidate);
  });
};
