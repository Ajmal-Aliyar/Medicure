import dotenv from 'dotenv';
dotenv.config(); 

import mongoose from 'mongoose';
import { env } from './env';

const connectDB = async () => {
  try {
    const dbURI = env.MONGO_URI
    if (!dbURI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(dbURI);

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
};

export default connectDB;
