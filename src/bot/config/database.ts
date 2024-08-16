import { connect } from "mongoose";
import { MONGODB_URI } from "./dotenv";

export const connectDB = async () => {
  try {
    await connect(MONGODB_URI!);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};
