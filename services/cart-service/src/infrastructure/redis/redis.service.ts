import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor(config: ConfigService) {
    const redisUrl = config.get<string>('REDIS_URL') ?? 'redis://localhost:6379';
    super(redisUrl, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: true,
    });
  }

  async onModuleInit() {
    this.logger.log('Connecting to Redis...');
    await this.connect();
    this.logger.log('Redis connected');

    this.on('error', (err) => this.logger.error('Redis error:', err.message));
    this.on('reconnecting', () => this.logger.warn('Redis reconnecting...'));
  }

  onModuleDestroy() {
    this.logger.log('Disconnecting from Redis...');
    this.disconnect();
  }

  // ── Cart-specific helpers ──────────────────────────────────

  /** Store a JSON object with optional TTL (seconds) */
  async setJson<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const json = JSON.stringify(value);
    if (ttlSeconds) {
      await this.set(key, json, 'EX', ttlSeconds);
    } else {
      await this.set(key, json);
    }
  }

  /** Retrieve and parse a JSON object */
  async getJson<T>(key: string): Promise<T | null> {
    const raw = await this.get(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  }

  /** Delete one or more keys */
  async deleteKeys(...keys: string[]): Promise<void> {
    if (keys.length > 0) await this.del(...keys);
  }
}
