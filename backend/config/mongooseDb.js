import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDatabase = async () => {
  try {
    return await mongoose.connect(process.env.MONGO_URI, {});
  } catch (error) {
    console.error("Error: " + error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
