import mongoose from 'mongoose';

export const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO_URI!);
  console.log('Connected to MongoDB');
};
