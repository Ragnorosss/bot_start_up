import User from '../models/User.js';

export const broadcastNewPost = async (ctx, post) => {
  try {
    const authenticatedUsers = await User.find({ isAuth: true });

    if (!authenticatedUsers.length) {
      console.log('No authenticated users found.');
      return;
    }

    console.log(`Broadcasting new post to ${authenticatedUsers.length} users.`);

    // Рассылаем сообщение каждому авторизованному пользователю
    for (const user of authenticatedUsers) {
      console.log(`Sending post to user: ${user.username} (${user.telegramId})`);
      await ctx.telegram.sendMessage(
        user.telegramId,
        `New post available: ${post.title} 
        ${post.content}`
      );
    }

    console.log('Post broadcast completed.');
  } catch (error) {
    console.error('Error broadcasting post:', error);
  }
};
