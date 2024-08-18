// commands/start.js
import User from '../models/User.js';
import Subscription from '../models/Subscription.js'; 
import { checkUserSubscription } from '../utils/subscriptionManager.js'; 
import { findOneUser, findManyUser } from '../utils/checkAdmin.js';
import {  getAdminKeyboard, getSubscriptionKeyboard, getAuthKeyboard } from '../utils/keyBoardUtils.js';

const startCommand = (bot) => {
  bot.command('start', async (ctx) => {
    try {
      const user = await User.findOne({ telegramId: ctx.from.id });
      if (!user) {
        ctx.reply('Welcome! Please register or login:', getAuthKeyboard());
        return;
      }
      if (user) {
        ctx.reply('Welcome! Please login:', getAuthKeyboard());
        return;
      }
   

      if (user.role === 'admin') {
        ctx.reply('Welcome! Choose an option:', getAdminKeyboard());
      }
    } catch (error) {
      ctx.reply('An error occurred while processing your request.');
      console.error('Error in /start command:', error);
    }
  });

  bot.action('get_all_users', async (ctx) => {
    try {
      await findManyUser(ctx);
    } catch (error) {
      ctx.reply('An error occurred while fetching users.');
      console.error('Error in get_all_users action:', error);
    }
  });
  bot.action('add_post', async (ctx) => {
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
  bot.action('get_one_users', async (ctx) => {
    try {
      await findOneUser(ctx);
    } catch (error) {
      ctx.reply('An error occurred while fetching user information.');
      console.error('Error in get_one_users action:', error);
    }
  });

  bot.action('manage_subscription', async (ctx) => {
    try {
      const subscription = await checkUserSubscription(ctx.from.id);
      ctx.reply(`Current subscription: ${subscription.planName}. Please visit our website to manage your subscription.`);
    } catch (error) {
      ctx.reply('An error occurred while managing your subscription.');
      console.error('Error in manage_subscription action:', error);
    }
  });

  bot.action('view_subscriptions', async (ctx) => {
    try {
      const subscriptions = await Subscription.find();
      if (subscriptions.length === 0) {
        ctx.reply('No available subscriptions at the moment.');
        return;
      }

      ctx.reply('Available subscriptions:', getSubscriptionKeyboard(subscriptions));
    } catch (error) {
      ctx.reply('An error occurred while fetching subscriptions.');
      console.error('Error fetching subscriptions:', error);
    }
  });

  bot.action(/subscribe_(.+)/, async (ctx) => {
    const subscriptionId = ctx.match[1];
    try {
      const subscription = await Subscription.findById(subscriptionId);
      if (!subscription) {
        ctx.reply('Invalid subscription plan.');
        return;
      }

      await updateUserSubscription(ctx.from.id, subscriptionId);

      ctx.reply(`You have successfully subscribed to ${subscription.planName}.`);
    } catch (error) {
      ctx.reply('An error occurred while processing your subscription.');
      console.error('Error processing subscription:', error);
    }
  });
};

export default startCommand;
