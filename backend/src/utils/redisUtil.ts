import { createClient } from "redis";
import dotenv from "dotenv";
import { env } from "../config/env";

dotenv.config();


const redisClient = createClient({
  url:  env.REDIS_URL || "redis://redis:6379",
  socket: {
      reconnectStrategy: (retries) => {
          if (retries > 3) {
              console.error('Max retry reached: Redis has reached its max connection retry attempts')
              return false
          }
          console.log(`Retrying redis connection. Retries: ${retries + 1}`)
          return Math.min(retries * 500, 5000)
      },
  },
})

redisClient.on('connect', () => {
  console.log('Redis client connected')
})

redisClient.on('error', (err: Error) => {
  console.error(err)
})

redisClient.connect().catch((err) => {
  console.error('Error connecting to redis:', err)
})




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
