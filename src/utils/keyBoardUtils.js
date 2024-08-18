import { Markup } from 'telegraf';

export const getUserKeyboard = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('Help', 'help')]
  ]);
};

export const getAdminKeyboard = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('Get Users Statistics', 'get_all_users')],
    [Markup.button.callback('Get User Statistics', 'get_one_users')],
    [Markup.button.callback('Create Post', 'add_post')],
    // [Markup.button.callback('Manage Subscriptions', 'manage_subscription')],
    [Markup.button.callback('Help', 'help')]
  ]);
};

export const getSubscriptionKeyboard = (subscriptions) => {
  return Markup.inlineKeyboard(
    subscriptions.map(sub => Markup.button.callback(`${sub.planName} - $${sub.price}`, `subscribe_${sub._id}`))
  );
};

export const getAuthKeyboard = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('Register', 'register')],
    [Markup.button.callback('Login', 'login')],
    [Markup.button.callback('Help', 'help')]
  ]);
};

export const getHelpKeyboard = () => {
    return Markup.inlineKeyboard([
      [Markup.button.callback('Register', 'register')],
      [Markup.button.callback('Login', 'login')],
      [Markup.button.callback('Help', 'help')]
    ]);
  };
  