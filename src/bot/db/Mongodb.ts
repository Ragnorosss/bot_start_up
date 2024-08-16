import mongoose from "mongoose";
import "dotenv/config";
import { MONGO_NAME, MONGO_PASS } from "@/bot/config/dotenv";

mongoose
  .connect(
    `mongodb+srv://${MONGO_NAME}:${MONGO_PASS}@cluster0.tvd06.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
