import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async () => {
  try {
    if (!config.mongoUri) {
      throw new Error('MONGODB_URI is missing from environment variables');
    }
    const conn = await mongoose.connect(config.mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${(error as Error).message}`);
    // We exit because the app cannot function without the database
    process.exit(1);
  }
};
