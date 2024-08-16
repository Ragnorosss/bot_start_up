import { Context, Markup } from 'telegraf';
import { User } from '@/bot/models/user';
import i18next from '@/locales/translate.fs';

export const checkSubscriptionCommand = async (ctx: Context) => {
  if (ctx.chat && 'id' in ctx.chat) {
    const { id: chatId } = ctx.chat;
    const user = await User.findOne({ chatId });

    const keyboard = Markup.keyboard([
      ['📝 Подписка на бота', '🔍 Проверить статус подписки']
    ]).resize();

    if (user && user.subscription) {
      ctx.reply(i18next.t('subscriptionActive'), keyboard);
    } else {
      ctx.reply(i18next.t('subscriptionNotActive'), keyboard);
    }
  } else {
    ctx.reply(i18next.t('chatNotFound'));
  }
};
