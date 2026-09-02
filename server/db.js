import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.log("ℹ️ MONGODB_URI not provided. Running backend in local JSON storage mode.");
    return false;
  }

  if (isConnected) {
    return true;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if MongoDB server is offline
    });
    isConnected = true;
    console.log(`🚀 MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Failed (${error.message}). Falling back to local JSON storage.`);
    isConnected = false;
    return false;
  }
}

export function getIsConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}
