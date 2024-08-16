import { Context, Markup } from "telegraf";
import { User } from "@/bot/models/user";
import i18next from "@/locales/translate.fs";

export const subscribeCommand = async (ctx: Context) => {
  if (ctx.chat && "id" in ctx.chat) {
    const { id: chatId } = ctx.chat;
    await User.findOneAndUpdate(
      { chatId },
      { subscription: true },
      { upsert: true },
    );

    const keyboard = Markup.keyboard([
      ["📝 Подписка на бота", "🔍 Проверить статус подписки"],
    ]).resize();

    ctx.reply(i18next.t("subscriptionSuccess"), keyboard);
  } else {
    ctx.reply(i18next.t("chatNotFound"));
  }
};
