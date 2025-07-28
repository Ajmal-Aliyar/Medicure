import { createClient, RedisClientType } from "redis";
import { env } from "./env.config";


let redisClient: RedisClientType;

async function connectRedis(): Promise<RedisClientType> {
  if (!env.REDIS_URL) {
    throw new Error("REDIS_URL is not defined in the environment variables.");
  }

  redisClient = createClient({
    url: env.REDIS_URL,
    socket: {
      reconnectStrategy(retries) {
        if (retries > 5) {
          console.error("Max Redis reconnect attempts reached.");
          return false; 
        }
        return Math.min(retries * 100, 2000);
      },
    },
  });

  redisClient.on("connect", () => {
    console.log("Redis connected successfully");
  });

  redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  try {
    await redisClient.connect();
    return redisClient
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
    process.exit(1);
  }
}

function getRedisClient(): RedisClientType {
  if (!redisClient) {
    throw new Error("Redis client has not been initialized. Call connectRedis() first."); 
  }
  return redisClient;
}

export { connectRedis, getRedisClient };
