import { Context } from "telegraf";
import { User } from "@/bot/models/user"; // Путь до модели User
import i18next from "@/locales/translate.fs";

export const addContentCommand = async (ctx: Context) => {
  if (ctx.chat && "id" in ctx.chat) {
    const { id: chatId } = ctx.chat;
    const user = await User.findOne({ chatId });

    if (user && user.role === "admin") {
      ctx.reply(i18next.t("contentAdded"));
      // Логика добавления контента
    } else {
      ctx.reply(i18next.t("adminOnly"));
    }
  } else {
    ctx.reply("Chat ID is not available.");
  }
};
