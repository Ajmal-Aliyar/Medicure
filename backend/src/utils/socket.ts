import { Server, Socket } from "socket.io";
import { setRedisData, getRedisData } from "./redisUtil";
import { env } from "../config/env";

const rooms = [];
const connectedCandidates = [];
let io: Server;

export const socketHandler = (server) => {
  io = new Server(server, {
    cors: {
      origin:  env.CORS_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New user connected", socket.id);

    socket.on(
      "create-new-room",
      (data: { candidateId: string; roomId: string }) =>
        createRoom(data, socket)
    );
    socket.on("join-room", (data: { candidateId: string; roomId: string }) =>
      joinRoom(data, socket)
    );
    socket.on("conn-init", (data: { socketId: string }) =>
      initializeConnectionHandler(data, socket)
    );
    socket.on("conn-signal", (data) => signalingHandler(data, socket));
    socket.on("joinChat", (chatId) => joinChat(chatId, socket));
    socket.on("candidate-left", ({ roomId }) => {
      console.log(roomId, "dfsfasdjdfs sdjklfhaklsd");

      io.to(roomId).emit("candidate-left", { userId: socket.id });
    });

    socket.on("register-user", async (data: { candidateId: string }) => {
      const { candidateId } = data;
      await setRedisData(`user:${candidateId}`, socket.id, 86400);
      await setRedisData(`socket:${socket.id}`, candidateId, 86400);

      console.log(`User ${candidateId} registered with socket ${socket.id}`);
    });

    socket.on("disconnect", async () => {
      const candidateId = await getRedisData(`socket:${socket.id}`);

      if (candidateId) {
        console.log(`User ${candidateId} disconnected`);
        await setRedisData(`user:${candidateId}`, "disconnected");
        await setRedisData(`socket:${socket.id}`, "disconnected");
      }
    });

    socket.on("send-notification", async ({ patientId, consultingData }) => {
      const socketId = await getRedisData(`user:${patientId}`);
      if (socketId && socketId !== "disconnected") {
        io.to(socketId).emit("notification", {
          slotId: consultingData.slotId,
          doctorId: consultingData.doctorId,
          roomId: consultingData.roomId,
        });
      } else {
        console.log(`User ${patientId} is offline. Store the message.`);
      }
    });

    socket.on("inc-count", async ({ patientId, chatId, message }) => {
      console.log("inc count");
      const socketId = await getRedisData(`user:${patientId}`);
      io.to(socketId).emit("inc-count", { chatId, message });
    });
  });

  const createRoom = (
    data: { candidateId: string; roomId: string },
    socket: Socket
  ) => {
    const roomId = data.roomId;

    const newCandidate = {
      id: data.candidateId,
      socketId: socket.id,
      roomId,
    };

    connectedCandidates.push(newCandidate);
    rooms.push({ roomId, connectedCandidates: [newCandidate] });

    socket.join(roomId);
    socket.emit("room-id", { roomId });
    socket.emit("room-update", { candidates: [newCandidate] });
  };

  const joinRoom = (
    data: { candidateId: string; roomId: string },
    socket: Socket
  ) => {
    const { candidateId, roomId } = data;
    const room = rooms.find((room) => room.roomId === roomId);
    if (room) {
      const newCandidate = {
        id: candidateId,
        socketId: socket.id,
        roomId,
      };

      room.connectedCandidates.push(newCandidate);
      connectedCandidates.push(newCandidate);

      socket.join(roomId);

      room.connectedCandidates.forEach((candidate) => {
        if (candidate.socketId !== socket.id) {
          io.to(candidate.socketId).emit("conn-prepare", {
            socketId: socket.id,
          });
        }
      });
    }
  };

  const initializeConnectionHandler = (
    data: { socketId: string },
    socket: Socket
  ) => {
    io.to(data.socketId).emit("conn-init", { socketId: socket.id });
  };

  const signalingHandler = (data, socket: Socket) => {
    console.log("i am conn signal");
    const { socketId, signal } = data;
    io.to(socketId).emit("conn-signal", { signal, socketId: socket.id });
  };
};

export const getSocketInstance = () => {
  if (!io) throw new Error("Socket.io is not initialized!");
  return io;
};

const joinChat = (chatId: string, socket: Socket) => {
  socket.join(chatId);
  console.log(`User ${socket.id} joined chat ${chatId}`);
};

export const incrementUnreadCount = (_id, participants) => {
  participants.forEach(async (userId) => {
    if (userId != _id) {
      console.log(userId, _id);

      const socketId = await getRedisData(`user:${userId}`);
      io.to(socketId).emit("inc-count");
    }
  });
};
