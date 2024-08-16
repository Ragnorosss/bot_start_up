import { Context, Markup } from "telegraf";
import { User } from "@/bot/models/user";
import i18next from "@/locales/translate.fs";

export const resetAccountCommand = async (ctx: Context) => {
  if (ctx.chat && "id" in ctx.chat) {
    const { id: chatId } = ctx.chat;
    await User.findOneAndUpdate(
      { chatId },
      { subscription: false, isVerified: false },
      { upsert: true },
    );

    const keyboard = Markup.keyboard([
      ["📝 Подписка на бота", "🔍 Проверить статус подписки"],
      ["🔑 Ввести код верификации"],
    ]).resize();

    ctx.reply("Ваш аккаунт был сброшен.", keyboard);
  } else {
    ctx.reply(i18next.t("chatNotFound"));
  }
};
