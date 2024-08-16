import bot from "./bot";
import { connectDB } from "@/bot/config/database";

const startApp = async () => {
  await connectDB();

  bot.launch().then(() => console.log("Bot started"));
};

startApp();
