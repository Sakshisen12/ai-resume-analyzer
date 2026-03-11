import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(import.meta.dirname, '../../.env') });

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
  redisUrl: process.env.REDIS_URL || '',
};

if (!config.mongoUri) {
  console.warn('MONGODB_URI is not defined in environment variables');
}
