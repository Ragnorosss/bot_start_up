import { Scenes } from 'telegraf';
import Post from '../models/Post.js';
import { broadcastNewPost } from './broadCustPost.js';

const addPostScene = new Scenes.BaseScene('addPostScene');

addPostScene.enter((ctx) => {
  ctx.reply('Please provide the title of the post:', {
    reply_markup: {
      keyboard: [
        [{ text: 'Cancel' }] 
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  });
});

addPostScene.on('text', async (ctx) => {
    const input = ctx.message.text;
  
    if (input === 'Cancel') {
      ctx.reply('Add post process has been canceled.');
      ctx.scene.leave(); 
      return;
    }
  
    if (!ctx.session.post) {
      ctx.session.post = {}; 
    }
  
    try {
      if (!ctx.session.post.title) {
        const title = input;
        ctx.session.post.title = title;
        ctx.reply('Please provide the content of the post:');
      } else {
        const content = input;
        const post = { ...ctx.session.post, content, authorId: ctx.from.id };
  
        // Сохраняем пост в базе данных
        const savedPost = await Post.create(post);
        ctx.reply('Post created successfully.');
  
        // Рассылаем новый пост авторизованным пользователям
        await broadcastNewPost(ctx, savedPost); 
  
        ctx.session.post = null;
        ctx.scene.leave(); 
      }
    } catch (error) {
      ctx.reply('An error occurred while creating the post.');
      console.error('Error creating post:', error);
    }
  });

export default addPostScene;