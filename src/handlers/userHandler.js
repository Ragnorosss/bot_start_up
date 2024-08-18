import validator from 'validator';
import User from '../models/User';

export const handleUserRegistration = (ctx) => {
  ctx.reply('Please provide your email address:');

  ctx.telegram.on('text', async (ctx) => {
    const email = ctx.message.text;
    if (!validator.isEmail(email)) {
      ctx.reply('Invalid email address. Please provide a valid email address:');
      return;
    }

    const username = ctx.from.username;
    const telegramId = ctx.from.id;
    const role = 'user';

    try {
      const user = new User({ username, email, role, telegramId });
      await user.save();
      ctx.reply(`User registered successfully with email: ${email}`);
    } catch (error) {
      ctx.reply('An error occurred while registering the user. Please try again later.');
      console.error('Error saving user:', error);
    }
  });
};
