// utils/subscriptionManager.js

import User from '../models/User.js'; // Импорт модели User
import Subscription from '../models/Subscription.js'; // Импорт модели Subscription

export const checkUserSubscription = async (telegramId) => {
  try {
    const user = await User.findOne({ telegramId });

    if (!user) {
      throw new Error('User not found');
    }

    // Найти активную подписку пользователя
    const subscription = await Subscription.findOne({ _id: user.subscriptionId });

    if (!subscription) {
      return { active: false }; // Нет активной подписки
    }

    // Проверить дату окончания подписки
    const now = new Date();
    const isExpired = subscription.endDate < now;

    return {
      active: !isExpired,
      planName: subscription.planName,
      duration: Math.ceil((subscription.endDate - now) / (1000 * 60 * 60 * 24)) // Оставшиеся дни
    };
  } catch (error) {
    console.error('Error checking user subscription:', error);
    throw new Error('Error checking user subscription');
  }
};
