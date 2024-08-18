import { Scenes } from 'telegraf';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.js';
import { sendEmail } from '../utils/mailer.js';
import { sendRecentPosts } from './sendRecentPost.js';

const userRegistrationScene = new Scenes.BaseScene('userRegistration');

userRegistrationScene.enter((ctx) => {
  ctx.reply('Please provide your email address:', {
    reply_markup: {
      keyboard: [
        [{ text: 'Cancel' }] 
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  });
});

userRegistrationScene.on('text', async (ctx) => {
  const input = ctx.message.text;

  if (input === 'Cancel') {
    ctx.reply('Registration process has been canceled.');
    ctx.scene.leave(); // Уходим из сцены
    return;
  }

  // Проверка email
  if (!validator.isEmail(input)) {
    ctx.reply('Invalid email address. Please provide a valid email address:');
    return;
  }

  const email = input;
  const username = ctx.from.username || 'unknown'; 
  const telegramId = ctx.from.id;
  const role = 'user';
  const registrationKey = uuidv4();

  try {
    // Проверяем, существует ли уже пользователь с таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      ctx.reply('A user with this email already exists. Please provide a different email address:');
      return;
    }

    // Создаем нового пользователя
    const user = new User({
      username,
      email,
      role,
      telegramId,
      registrationKey,
      isAuth: true // Автоматически авторизуем пользователя
    });
    await user.save();

    const subject = 'Registration Key';
    const text = `Your registration key is: ${registrationKey}`;
    await sendEmail(email, subject, text);

    ctx.reply(`User registered successfully with email: ${email}. A registration key has been sent to your email.`);

    // Отправляем приветственное сообщение авторизованному пользователю
    ctx.reply('You are now logged in and authorized!');

    // Отправляем недавние посты новому пользователю
    await sendRecentPosts(user.telegramId, ctx.telegram);

    ctx.scene.leave(); // Уходим из сцены после успешной регистрации и авторизации
  } catch (error) {
    ctx.reply('An error occurred while registering the user. Please try again later.');
    console.error('Error saving user:', error);
  }
});

export default userRegistrationScene;
