import { Server, Socket } from "socket.io";
import { ICacheService } from "@/interfaces";
import { TYPES } from "@/di/types";
import { getContainer } from "@/di";
import { handleChatingEvents } from "./messaging.handler";
import { handleConsultationEvents } from "./consultation.handlers";
import { IDoctorAppointmentService, IMessageService } from "@/services";

export const registerSocketEventHandlers = async (
  io: Server,
  socket: Socket
) => {
  const container = getContainer();
  const cacheService = container.get<ICacheService>(TYPES.CacheService);
  const appointmentService = container.get<IDoctorAppointmentService>(TYPES.DoctorAppointmentService);
  const messageService = container.get<IMessageService>(TYPES.MessageService);

  const user = socket.data.user;

  if (!user?.id) {
    console.warn(
      `⚠️ Socket connection with missing user data. Socket ID: ${socket.id}`
    );
    return;
  }

  const cacheKey = `socket:${user.id}`;
  cacheService.set(cacheKey, socket.id);

  console.log(
    `📡 Registered socket handlers for user ID: ${user.id} | Socket ID: ${socket.id}`
  );

  handleChatingEvents(io, socket, cacheService, messageService);
  handleConsultationEvents(io, socket, cacheService, appointmentService);

  socket.on("disconnect", (reason) => {
    console.log(
      `🔌 Disconnected: User ID: ${user.id} | Socket ID: ${socket.id} | Reason: ${reason}`
    );
  });
};
