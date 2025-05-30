import "reflect-metadata";
import { registerRoutes } from "./app/registerRoutes";
import { errorHandler } from "@/middlewares";
import { logger, env, connectRedis, connectDB } from "@/config";
import { startContainer } from "@/di";
import { createApp } from "./server";

async function bootstrap() {
  try {
    await connectDB();
    await connectRedis();
    await startContainer();
    
    
    const app = createApp(); 
    registerRoutes(app);
    app.use(errorHandler);
    
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (err) {
    logger.error("Bootstrapping failed:", err);
    process.exit(1);
  }
}

bootstrap();
