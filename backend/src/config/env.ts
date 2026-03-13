import dotenv from 'dotenv';
import path from 'path';

// For local development, load from .env file
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  nodeEnv: process.env.NODE_ENV || 'production',
  corsOrigin: process.env.FRONTEND_URL || process.env.CORS_ORIGIN || '*',
  geminiApiKey: process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || '',
  // Redis configuration
  useRedis: !!(process.env.REDIS_URL || process.env.REDIS_HOST),
  redisUrl: process.env.REDIS_URL || '',
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};

if (!config.mongoUri) {
  console.warn('MONGODB_URI is not defined in environment variables');
}