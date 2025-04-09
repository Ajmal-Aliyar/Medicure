import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.connect().catch((err) => {
  console.log("Redis connection error:", err);
});

redisClient.on("error", (err) => {
  console.log("Redis Client Error:", err);
});

export const setRedisData = async (
  key: string,
  value: string,
  ttl?: number
) => {
  try {
    if (ttl) {
      await redisClient.setEx(key, ttl, value);
    } else {
      await redisClient.set(key, value);
    }
    console.log(`Data for ${key} saved successfully`);
  } catch (error) {
    console.error(`Error saving data for ${key}:`, error);
  }
};

export const getRedisData = async (key: string): Promise<string | null> => {
  try {
    const data = await redisClient.get(key);
    return data;
  } catch (error) {
    console.error(`Error retrieving data for ${key}:`, error);
    return null;
  }
};

export const deleteRedisData = async (key: string) => {
  try {
    await redisClient.del(key);
    console.log(`Data for ${key} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting data for ${key}:`, error);
  }
};
