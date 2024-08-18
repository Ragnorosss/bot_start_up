// utils/subscriptionManager.js

import User from '../models/User.js';

export const checkUserSubscription = async (telegramId) => {
  try {
    const user = await User.findOne({ telegramId }).populate('subscription');
    
    if (!user) {
      throw new Error('User not found');
    }

    if (user.subscription) {
      // Если подписка есть, вернуть её детали
      return {
        active: true,
        planName: user.subscription.planName,
        price: user.subscription.price,
        duration: user.subscription.duration,
        benefits: user.subscription.benefits
      };
    } else {
      return { active: false };
    }
  } catch (error) {
    console.error('Error checking user subscription:', error);
    throw new Error('Error checking user subscription');
  }
};
