import "reflect-metadata";
import { registerRoutes } from "./app/registerRoutes";
import { errorHandler, socketAuthMiddleware } from "@/middlewares";
import { logger, env, connectRedis, connectDB } from "@/config";
import { startContainer } from "@/di";
import { createApp } from "./server";
import { startCronJobs } from "./infrastructure";
import http from "http";
import { Server } from "socket.io";
import { config } from "./config/socket.config";
import { registerSocketEventHandlers } from "./app/socketHandlers";

async function bootstrap() {
  try {
    await connectDB();
    await connectRedis();
    startContainer();
    startCronJobs();

    const app = createApp();
    registerRoutes(app);
    app.use(errorHandler);
    
    // socket setup
    const server = http.createServer(app);
    const io = new Server(server, config.socketOptions);
    io.use(socketAuthMiddleware);
    
    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      registerSocketEventHandlers(io, socket);
    });
    
    
    server.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (err) {
    console.error("Error caught by bootstrap : ", err);
    logger.error("Bootstrapping failed:", err);
    process.exit(1);
  }
}

bootstrap();
