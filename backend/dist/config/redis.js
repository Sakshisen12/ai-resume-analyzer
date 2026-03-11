import Redis from 'ioredis';
import { config } from './env.js';
export const redisConnection = config.redisUrl
    ? new Redis(config.redisUrl, {
        maxRetriesPerRequest: null,
    })
    : new Redis({
        host: config.redisHost,
        port: config.redisPort,
        maxRetriesPerRequest: null,
    });
redisConnection.on('error', (error) => {
    console.error('Redis Connection Error:', error);
});
redisConnection.on('connect', () => {
    console.log('Successfully connected to Redis');
});
//# sourceMappingURL=redis.js.map