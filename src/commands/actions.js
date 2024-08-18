import { getHelpKeyboard } from "../utils/keyBoardUtils.js";
import helpCommand from "./help.js";

const actionCommand = (bot) => {
    bot.action('start', (ctx) => {
        ctx.reply("Start bot", startCommand());
    });
    bot.action('register', (ctx) => {
        ctx.scene.enter('userRegistration');
    });
      
    bot.action('login', (ctx) => {
        ctx.scene.enter('userLoginScene');
    });
      
    bot.action('help', (ctx) => {
        ctx.reply(`Here are the available commands:
            \n/start - Start bot
            \n/help - Show help
            \n/register - Registration
            \n/login - Login`, 
            getHelpKeyboard()
        );
    });
};

export default actionCommand;
