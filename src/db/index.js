import mongoose, { connection } from "mongoose";
import { DB_NAME } from "../constant";

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log(`\nConnected to MongoDB !! DB HOST: ${connectionInstance.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
})();