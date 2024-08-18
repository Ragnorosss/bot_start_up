import User from "../models/User.js"; // Импорт модели User";

export const addPostCommand = (bot) => {
    bot.command('add_post', async (ctx) => {
        try {
          const user = await User.findOne({ telegramId: ctx.from.id });
    
          if (user && user.role === 'admin') {
            ctx.scene.enter('addPostScene');
          } else {
            ctx.reply('You do not have permission to use this command.');
          }
        } catch (error) {
          ctx.reply('An error occurred while processing your request.');
          console.error('Error in /add_post command:', error);
        }
      });
}
