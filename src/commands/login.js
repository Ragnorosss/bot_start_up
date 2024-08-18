const loginCommand = (bot) => {
  bot.command('login', (ctx) => {
    ctx.scene.enter('userLoginScene');
  });
};

export default loginCommand;
