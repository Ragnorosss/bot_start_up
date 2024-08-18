import User from '../models/User.js';

const userSessions = {};
const SESSION_TIMEOUT = 60 * 60 * 1000; 

export const manageSession = (userId) => {
  if (userSessions[userId]) {
    clearTimeout(userSessions[userId].timeout); 
  }

  userSessions[userId] = {
    timeout: setTimeout(async () => {
      console.log(`User ${userId} logged out due to inactivity.`);
      await clearUserSession(userId); 
    }, SESSION_TIMEOUT)
  };
};

export const clearUserSession = async (userId) => {
  if (userSessions[userId]) {
    clearTimeout(userSessions[userId].timeout);
    delete userSessions[userId];

    // Сбросить поле isAuth в базе данных
    try {
      await User.updateOne({ telegramId: userId }, { isAuth: false });
      console.log(`User ${userId} logged out due to inactivity and isAuth reset.`);
    } catch (error) {
      console.error(`Error updating isAuth for user ${userId}:`, error);
    }
  }
};
