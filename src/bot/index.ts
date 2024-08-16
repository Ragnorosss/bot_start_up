import { checkSubscriptionCommand } from "./commands/checkSubscription";
import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./config/dotenv";
import { startCommand } from "./commands/start";
import { addContentCommand } from "./commands/addContent";
import { subscribeCommand } from "./commands/subscrubi";
import { generateVerificationCode } from "./commands/generateVerificationCode";
import { verifyCodeCommand } from "./commands/verifyCodeCommand";
import { resetAccountCommand } from "./commands/resetAccount";

const bot = new Telegraf(BOT_TOKEN!);

bot.start(startCommand);
bot.command("subscribe", subscribeCommand);
bot.command("checksubscription", checkSubscriptionCommand);
bot.command("generateverificationcode", generateVerificationCode);
bot.command("verifycode", verifyCodeCommand); // Ввод кода
bot.command("resetaccount", resetAccountCommand);
bot.command("addcontent", addContentCommand);
export default bot;
