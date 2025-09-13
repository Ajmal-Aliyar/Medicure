import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { ICacheService } from "@/interfaces";
import Redis from "ioredis"; 

@injectable()
export class RedisService implements ICacheService {
  constructor(
    @inject(TYPES.RedisClient) private readonly _redisClient: Redis
  ) {}

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this._redisClient.set(key, value, "EX", ttl); 
    } else {
      await this._redisClient.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this._redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this._redisClient.del(key);
  }
}
