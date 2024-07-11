import TelegramBot from "node-telegram-bot-api";

import axios from "axios";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
  request: {
    agentOptions: {
      keepAlive: true,
      family: 4,
    },
  },
});

// Matches /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});

// get joke
bot.onText(/\/joke/, async (msg) => {
  let result = await axios.get("https://v2.jokeapi.dev/joke/Any");
  console.log(result.data);
  if (result.data.joke) {
    bot.sendMessage(msg.chat.id, result.data.joke);
  } else {
    bot.sendMessage(msg.chat.id, result.data.setup);
    await delay(5000);
    bot.sendMessage(msg.chat.id, result.data.delivery);
  }
});
