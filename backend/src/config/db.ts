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
    const msg = (error as Error).message;
    console.error(`MongoDB Connection Error: ${msg}`);
    
    if (msg.includes('authentication failed') || msg.includes('bad auth')) {
      console.error('TIP: Check your MONGODB_URI password. If it contains special characters like @, #, or $, you must URL encode them (e.g., @ becomes %40).');
    }
    
    // We exit because the app cannot function without the database
    process.exit(1);
  }
};
