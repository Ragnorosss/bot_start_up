import mongoose from 'mongoose';
import { MONGODB_URI } from './token.js'; // Убедитесь, что путь корректен

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Увеличенный тайм-аут
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};
