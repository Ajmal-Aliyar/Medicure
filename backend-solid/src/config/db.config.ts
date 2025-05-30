import mongoose from 'mongoose';
import { env } from './env.config';


export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true); 
    await mongoose.connect(env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); 
  }
};

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});
