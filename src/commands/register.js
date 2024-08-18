const registerCommand = (bot) => {
    bot.command('register', (ctx) => {
      ctx.scene.enter('userRegistration');
    });
  };
  
  export default registerCommand;