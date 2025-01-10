import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379', 
});

redisClient.connect().catch((err) => {
    console.log('Redis connection error:', err);
});

redisClient.on('error', (err) => {
    console.log('Redis Client Error:', err);
});

export const setRedisData = async (key: string, value: object, ttl?: number) => {
    try {
        const stringValue = value.toString();
        if (ttl) {
            await redisClient.setEx(key, ttl, stringValue);
        } else {
            await redisClient.set(key, stringValue);
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

export const keyRedisExists = async (key: string): Promise<boolean> => {
    try {
        const exists = await redisClient.exists(key);
        return exists === 1;
    } catch (error) {
        console.error(`Error checking existence of ${key}:`, error);
        return false;
    }
};

