import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {});
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    throw error;
  }
};

export default connectDB;
