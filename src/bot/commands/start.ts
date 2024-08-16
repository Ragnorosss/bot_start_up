import { Context } from "telegraf";
import { User } from "@/bot/models/user";
import i18next from "@/locales/translate.fs";

export const startCommand = async (ctx: Context) => {
  if (ctx.chat) {
    const chatId = ctx.chat.id;

    ctx.reply(`Your chat ID is ${chatId}`);
  } else {
    ctx.reply("Chat information is not available.");
  }
};
