import { SOCKET_EVENTS } from "@/constants/socket-events";
import { ICacheService } from "@/interfaces";
import { IDoctorAppointmentService } from "@/services";
import { Server, Socket } from "socket.io";

export const handleConsultationEvents = (
  io: Server,
  socket: Socket,
  cacheService: ICacheService,
  appointmentService: IDoctorAppointmentService
) => {
  socket.on(
    SOCKET_EVENTS.CONSULT.JOIN_ROOM,
    async ({ roomId, candidateId, patientId }) => {
      socket.join(roomId);
      await cacheService.set(`socket:${candidateId}`, socket.id);
      
      if (candidateId !== patientId) {
        const patientSocketId = await cacheService.get(`socket:${patientId}`);
        console.log(roomId, candidateId, patientId, patientSocketId);
        io.to(patientSocketId as string).emit(SOCKET_EVENTS.CONSULT.DOCTOR_JOINED, { socketId: socket.id, roomId });
      }
      socket
        .to(roomId)
        .emit(SOCKET_EVENTS.CONSULT.JOINED_ROOM, { socketId: socket.id });
        if (candidateId !== patientId) {
          // await appointmentService.markAppointmentInProgress(roomId, candidateId)
      }
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
