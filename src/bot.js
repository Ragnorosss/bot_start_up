import { Telegraf, Scenes, session, Markup } from 'telegraf';
import { BOT_TOKEN } from './config/token.js';
import { connectDB } from './config/database.js';
import userLoginScene from './utils/sessionLogin.js'; 
import userRegistrationScene from './utils/sessionRegister.js'; 
import loginCommand from './commands/login.js';
import registerCommand from './commands/register.js'; 
import startCommand from './commands/start.js'; 
import { manageSession } from './utils/sessionManager.js';
import helpCommand from './commands/help.js';
import actionCommand from './commands/actions.js';
import addPostScene from './utils/sessionAddPost.js';
import { addPostCommand } from './commands/addPost.js';

connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

const stage = new Scenes.Stage([
  userLoginScene, 
  userRegistrationScene,
  addPostScene
]);

const bot = new Telegraf(BOT_TOKEN);
bot.use(session());
bot.use(stage.middleware());
bot.use((ctx, next) => {
  if (ctx.from) {
    manageSession(ctx.from.id); 
  }
  return next();
});

startCommand(bot);
helpCommand(bot);
loginCommand(bot);
registerCommand(bot);
actionCommand(bot);
addPostCommand(bot);
bot.launch()
  .then(() => console.log('Bot is running'))
  .catch(err => console.error('Failed to start bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export default bot;
