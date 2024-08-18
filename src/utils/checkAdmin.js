import User from '../models/User.js'; 

export const findOneUser = async (ctx) => {
  try {
    const user = await User.findOne({ telegramId: ctx.from.id });
    if (!user) {
      return ctx.reply('User not found. Please register or login.');
    }

    if (user.role !== 'admin') {
      return ctx.reply('You do not have permission to access this command.');
    }

    const totalUsers = await User.countDocuments();
    ctx.reply(`Total number of registered users: ${totalUsers}`);
  } catch (error) {
    ctx.reply('An error occurred while fetching statistics.');
    console.error('Error fetching statistics:', error);
  }
};


export const findManyUser = async (ctx) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return ctx.reply('No users found.');
    }

    const userList = users.map(user => `
      username: ${user.username} 
      telegramId:(${user.telegramId}) 
      email:(${user.email}) 
      role:(${user.role}) 
      isAuth:(${user.isAuth})
      subscription:(${user.subscription})
      `).join('\n');
    ctx.reply(`List of users:\n${userList}`);
  } catch (error) {
    ctx.reply('An error occurred while fetching users.');
    console.error('Error fetching users:', error);
  }
};