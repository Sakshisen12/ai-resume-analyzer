import Redis from 'ioredis';
import { config } from './env.js';

export const redisConnection = config.redisUrl 
  ? new (Redis as any)(config.redisUrl, {
      maxRetriesPerRequest: null,
    })
  : new (Redis as any)({
      host: config.redisHost,
      port: config.redisPort,
      maxRetriesPerRequest: null,
    });

redisConnection.on('error', (error: any) => {
  console.error('Redis Connection Error - ensure Redis is running or REDIS_URL is set:', error.message || error);
});

redisConnection.on('connect', () => {
  console.log('Successfully connected to Redis');
});
