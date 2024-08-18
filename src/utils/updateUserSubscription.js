// utils/subscriptionManager.js

import User from '../models/User.js';
import Subscription from '../models/Subscription.js';

export const updateUserSubscription = async (telegramId, subscriptionId) => {
  try {
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    await User.updateOne(
      { telegramId },
      { subscription: subscriptionId }
    );

    console.log(`User ${telegramId} subscription updated to ${subscriptionId}`);
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw new Error('Error updating user subscription');
  }
};
