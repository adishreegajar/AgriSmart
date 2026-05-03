import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Failed: ${error.message}`);
    console.log('🔄 Continuing in "Resilient Mode" with Mock Data support.');
    // Do not exit process, let the server stay up for static/mock data routes
  }
};

export default connectDB;
