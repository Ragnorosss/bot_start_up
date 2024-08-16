import { Context, Markup } from 'telegraf';
import { User } from '@/bot/models/user';

function isTextMessage(message: any): message is { text: string } {
    return message && typeof message.text === 'string';
  }
  
export const verifyCodeCommand = async (ctx: Context) => {
  if (ctx.message && isTextMessage(ctx.message)) {
    const [command, code] = ctx.message.text.split(' ');

    if (!code) {
      ctx.reply('Пожалуйста, введите код после команды /verifycode');
      return;
    }

    if (ctx.chat && 'id' in ctx.chat) {
      const { id: chatId } = ctx.chat;
      const user = await User.findOne({ chatId });

      const keyboard = Markup.keyboard([
        ['🔑 Ввести код верификации']
      ]).resize();

      if (user && user.verificationCode === code) {
        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();
        ctx.reply('Верификация прошла успешно!', keyboard);
      } else {
        ctx.reply('Неверный код верификации. Попробуйте снова.', keyboard);
      }
    } else {
      ctx.reply('Ошибка: чат не найден.');
    }
  } else {
    ctx.reply('Ошибка: сообщение не найдено или не является текстовым.');
  }
};
