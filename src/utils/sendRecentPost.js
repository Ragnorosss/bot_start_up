import Post from '../models/Post.js';

export const sendRecentPosts = async (ctx, user) => {
    try {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  
      const recentPosts = await Post.find({
        createdAt: { $gte: threeDaysAgo }
      });
  
      if (recentPosts.length === 0) {
        console.log(`No recent posts to send to user: ${user.username}`);
        return;
      }
  
      console.log(`Sending ${recentPosts.length} recent posts to user: ${user.username}`);
  
      for (const post of recentPosts) {
        await ctx.telegram.sendMessage(
          user.telegramId,
          `Recent post:\n\nTitle: ${post.title}\nContent: ${post.content}`
        );
      }
  
      console.log('Recent posts sent successfully.');
    } catch (error) {
      console.error('Error sending recent posts:', error);
    }
  };
