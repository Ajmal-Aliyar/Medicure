import { RedisClientType } from "redis";
import { inject, injectable } from "inversify";
import {TYPES} from "@/di/types";
import { ICacheService } from "@/interfaces";

@injectable()
export class RedisService implements ICacheService {
  constructor(
    @inject(TYPES.RedisClient) private readonly redisClient: RedisClientType
  ) {}

  async set(key: string, value: string, ttl?: number): Promise<void> {
     await this.redisClient.set(key, value, { EX: ttl });
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
