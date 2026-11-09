import Redis from 'ioredis';
import { config } from './env.js';
let redisConnection = null;
if (config.useRedis) {
    redisConnection = config.redisUrl
        ? new Redis(config.redisUrl, {
            maxRetriesPerRequest: null,
        })
        : new Redis({
            host: config.redisHost,
            port: config.redisPort,
            maxRetriesPerRequest: null,
        });
    redisConnection.on('error', (error) => {
        console.error('Redis Connection Error:', error.message || error);
    });
    redisConnection.on('connect', () => {
        console.log('Successfully connected to Redis');
    });
}
else {
    console.log('Redis is disabled (USE_REDIS is false or no REDIS_URL provided). Bypassing background queues.');
}
export { redisConnection };
//# sourceMappingURL=redis.js.map