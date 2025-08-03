import Redis from "ioredis";
import { env } from "./env.config";

let redisClient: Redis;

function connectRedis(): Redis {
  if (!env.REDIS_URL) {
    throw new Error("REDIS_URL is not defined in the environment variables.");
  }

  redisClient = new Redis(env.REDIS_URL, {
    tls: {} 
  });

  redisClient.on("connect", () => {
    console.log("✅ Redis connected successfully");
  });

  redisClient.on("error", (err) => {
    console.error("❌ Redis connection error:", err);
  });

  return redisClient;
}

function getRedisClient(): Redis {
  if (!redisClient) {
    throw new Error("Redis client not initialized. Call connectRedis() first.");
  }
  return redisClient;
}

export { connectRedis, getRedisClient };
