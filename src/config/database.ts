import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/UserRegistration_Db');
    console.log('MongoDB connected:', conn.connection.host);
  } catch (error) {
    console.error('Error: Could not connect to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
