const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
require("dotenv").config();
const commands = require("./commands/cmdHandler");
const client = new Client({
  presence: {
    activities: [
      {
        name: "/help",
        type: ActivityType.Listening,
      },
    ],
  },
  intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
module.exports = client;

client.on("ready", () => {
  commands(client);

  client.user.setPresence({ activities: [{ name: "Code Fire", type: "WATCHING" }] });
  console.log("Start completed.");
});
client.login(process.env.DISCORD_TOKEN);
