import { Scenes } from 'telegraf';
import User from '../models/User.js';

const userLoginScene = new Scenes.BaseScene('userLoginScene');

userLoginScene.enter((ctx) => {
 ctx.reply('Please provide your token:', {
    reply_markup: {
      keyboard: [
        [{ text: 'Cancel' }] 
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  });;
});

userLoginScene.on('text', async (ctx) => {
  const userToken = ctx.message.text;
  const input = ctx.message.text;
  if (input === 'Cancel') {
    ctx.reply('Login process has been canceled.');
    ctx.scene.leave(); 
    return;
  }
  try {
    // Ищем пользователя по токену
    const user = await User.findOne({ registrationKey: userToken });

    if (!user) {
      return ctx.reply('Wrong token. Please try again.');
    }

    // Проверяем, если пользователь уже авторизован
    if (user.isAuth && user.telegramId === ctx.from.id) {
      return ctx.reply('You are already logged in.');
    }

    // Обновляем информацию о пользователе
    await User.updateOne(
      { registrationKey: userToken },
      { $set: { telegramId: ctx.from.id, lastActive: new Date(), isAuth: true } }
    );

    ctx.reply(`User logged in successfully with email: ${user.email}.`);
    ctx.scene.leave();
  } catch (error) {
    ctx.reply('An error occurred while logging in. Please try again later.');
    console.error('Error logging in user:', error);
  }
});

export default userLoginScene;
