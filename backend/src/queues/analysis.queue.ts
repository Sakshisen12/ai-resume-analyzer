import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis.js';

export const analysisQueue = redisConnection ? new Queue('analysis', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: { age: 300, count: 100 },
  },
}) : null;
