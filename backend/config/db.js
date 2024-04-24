import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async (dbName) => {
  return await MongoClient.connect(process.env.MONGO_URI).then((client) => {
    return client.db(dbName);
  });
};

export default connectToDatabase;
