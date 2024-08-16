import { Context, Markup } from "telegraf";
import { User } from "@/bot/models/user";
import crypto from "crypto";
import i18next from "i18next";

export const generateVerificationCode = async (ctx: Context) => {
  if (ctx.chat && "id" in ctx.chat) {
    const { id: chatId } = ctx.chat;
    const verificationCode = crypto.randomBytes(3).toString("hex");

    await User.findOneAndUpdate(
      { chatId },
      { verificationCode, isVerified: false },
      { upsert: true },
    );

    const keyboard = Markup.keyboard([["🔑 Ввести код верификации"]]).resize();

    ctx.reply(`Ваш код для верификации: ${verificationCode}`, keyboard);
  } else {
    ctx.reply(i18next.t("chatNotFound"));
  }
};
