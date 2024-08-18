// utils/userUtils.js

import User from '../models/User.js';
import Subscription from '../models/Subscription.js';

export const findUserByTelegramId = async (telegramId) => {
  return await User.findOne({ telegramId });
};

export const checkUserSubscription = async (telegramId) => {
  const user = await findUserByTelegramId(telegramId);
  if (!user || !user.subscription) {
    return { active: false };
  }
  const subscription = await Subscription.findById(user.subscription);
  if (!subscription) {
    return { active: false };
  }
  return {
    active: true,
    planName: subscription.planName,
    duration: subscription.duration,
  };
};

export const updateUserSubscription = async (telegramId, subscriptionId) => {
  const user = await findUserByTelegramId(telegramId);
  if (user) {
    user.subscription = subscriptionId;
    await user.save();
  }
};
