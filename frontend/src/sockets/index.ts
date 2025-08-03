import { env } from "@/lib/env";
import { io, Socket } from "socket.io-client";

const socket: Socket = io(env.API_URL, {
  withCredentials: true,
transports: ["polling", "websocket"],
});

export default socket;
