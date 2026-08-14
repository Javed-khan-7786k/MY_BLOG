import mongoose from 'mongoose';

const connectDB = async () => {
  const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const DB_NAME = process.env.DB_NAME || 'my-blog';

  try {
    const conn = await mongoose.connect(DB_URL, {
      dbName: DB_NAME,
    });
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}, DB: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
