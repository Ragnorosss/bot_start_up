// commands/help.js
import { getAdminKeyboard, getUserKeyboard, getAuthKeyboard } from '../utils/keyBoardUtils.js';
import { findUserByTelegramId } from '../utils/userUtils.js';

const helpCommand = (bot) => {
  bot.command('help', async (ctx) => {
    try {
      const user = await findUserByTelegramId(ctx.from.id);

      if (!user || !user.isAuth) {
        ctx.reply('You need to register or log in first.', getAuthKeyboard());
        return;
      }

      if (user.role === 'admin') {
        ctx.reply('Admin commands:', getAdminKeyboard());
      } else {
        ctx.reply('User commands:', getUserKeyboard());
      }
    } catch (error) {
      ctx.reply('An error occurred while processing your request.');
      console.error('Error in /help command:', error);
    }
  });
};

export default helpCommand;
