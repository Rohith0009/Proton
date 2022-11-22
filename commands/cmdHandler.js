const { EmbedBuilder, Collection } = require("discord.js");

require("dotenv").config();
const config = require("../config.json");
const fs = require("fs");
const path = require("path");

const commandPath = "./commands";

module.exports = async (client) => {
  const commands = new Collection();
  global.pollsList = {};

  global.multiReact = async (msg, ...reactions) => {
    for (let i of reactions) {
      if (typeof i !== "object") {
        for (let reaction of i) {
          if (reaction !== " ") {
            try {
              await msg.react(reaction);
            } catch (A) {}
          }
        }
      } else {
        await msg.react(i);
      }
    }
  };

  client.on("messageCreate", async (message) => {
    const goosStanding = await message.guild.emojis.fetch("993799647015481397").catch(() => {
      return ":duck:";
    });

    const extCommands = [
      [
        ["rohith"],
        async () => {
          await multiReact(message, "🇷🇴🇭🇮🇹🇭");
        },
      ],
      [
        ["jyothir"],
        async () => {
          await multiReact(message, "🇯  🇾  🇴  🇹  🇭  🇮  🇷");
        },
      ],
      [
        ["prayag"],
        async () => {
          await multiReact(message, "🇵  🇷  🇦  🇾  🅰️  🇬 ");
        },
      ],
      [
        ["gagan"],
        async () => {
          await multiReact(message, "🇬 🅰️ 🇬 🇦 🇳");
        },
      ],
      [["pineapple"], () => message.react("🍍")],
      [["forgor"], () => message.react("💀")],
      [["cheese"], () => message.react("🧀")],
      [["oink"], () => message.react("🐷")],
      [["easter egg"], () => message.react("🥚")],
      [["sad"], () => message.react("😔")],
    ];

    var msg = message.content.toLowerCase();
    var msg = msg.replace(/[&\/\\#,+()$~!%.'":*?<>{}]/, "");
    if (message.author.id === client.user.id) return;
    if (!message.author.bot) {
      var nickname = message.member.displayName;
    }

    if (msg === "good morning") {
      message.reply(`Good Morning ${nickname}`);
    }
    if (msg === "good afternoon") {
      message.reply(`Good Afternoon ${nickname}`);
    }
    if (msg === "good evening") {
      message.reply(`Good Evening ${nickname}`);
    }
    if (msg === "good night") {
      message.reply(`Good Night ${nickname}`);
    }
    if (msg === "hello") {
      message.reply(`Hello ${nickname}`);
    }
    if (msg === "hi") {
      message.reply(`Hello ${nickname}`);
    }
    if (msg === "bye") {
      message.reply(`Bye ${nickname} Until We Meet Again`);
    }
    if (msg === "how are you") {
      message.reply(`I Am Fine ${nickname} How Are You?`);
    }
    if (msg === "i am fine") {
      message.reply(`Great!`);
    }
    if (msg === "i am bored") {
      message.reply(`No Problem ${nickname} I am There To Chat With You!!`);
    }
    if (msg === "pls on the server") {
      message.reply("Please contact <@892301934160146453> or <@736228651372380321> to turn on the server");
      client.users.cache.get("892301934160146453").send(message.author.username + " Requested to turn on the server");
      client.users.cache.get("736228651372380321").send(message.author.username + " Requested to turn on the server");
    }
    if (msg === "pls turn on the server") {
      message.reply("Please contact <@892301934160146453> or <@736228651372380321> to turn on the server");
      client.users.cache.get("892301934160146453").send(message.author.username + " Requested to turn on the server");
      client.users.cache.get("736228651372380321").send(message.author.username + " Requested to turn on the server");
    }
    if (msg === "please on the server") {
      message.reply("Please contact <@892301934160146453> or <@736228651372380321> to turn on the server");
      client.users.cache.get("892301934160146453").send(message.author.username + " Requested to turn on the server");
      client.users.cache.get("736228651372380321").send(message.author.username + " Requested to turn on the server");
    }
    if (msg === "please turn on the server") {
      message.reply("Please contact <@892301934160146453> or <@736228651372380321> to turn on the server");
      client.users.cache.get("892301934160146453").send(message.author.username + " Requested to turn on the server");
      client.users.cache.get("736228651372380321").send(message.author.username + " Requested to turn on the server");
    }

    if (!message.author.bot) {
      if (!message.content.toLowerCase().startsWith(process.env.PREFIX)) {
        // Loop through the possible events, make them lowercase and check if the message contains it (if it does, execute the event)
        for (const [key, value] of extCommands) {
          for (const i of key) {
            if (message.content.toLowerCase().includes(i)) {
              if (typeof value === "function") value();
              else if (typeof value === "object" || typeof value === "string") {
                if (value.embeds) {
                  for (const embed of value.embeds) {
                    message.reply({ embeds: [embed] });
                  }
                }
              }
            }
          }
        }
      } else {
        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = commands.get(commandName);
        if (!command) return;
        try {
          command.callback(message, args);
        } catch (error) {
          console.error(error);

          const embed = new MessageEmbed().setTitle("An error occurred while executing that command.").setColor("RED");

          message.channel.send({ embeds: [embed] });
        }
      }
    } else return;
  });

  const slashCommands = [];

  fs.readdirSync(path.join(process.cwd(), commandPath, "/slash"))
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      let pull = require(path.join(process.cwd(), commandPath, "/slash", file));
      slashCommands[pull.name.toLowerCase()] = pull;
      slashCommands.push(pull);
    });

  for (const guildID of client.guilds.cache.keys()) {
    const guild = client.guilds.cache.get(guildID);
    await guild.commands.set(slashCommands);
    client.on("interactionCreate", (interaction) => {
      if (interaction.isCommand() && interaction.guildId === guildID) {
        //try {
          slashCommands[interaction.commandName].callback(interaction);
        //}
        // catch (error) {
        //  console.error(error);
        //  const embed = new EmbedBuilder().setTitle("An error occurred while executing that command").setColor("Red");
        //  interaction.reply({ embeds: [embed], ephemeral: true });
        //}
      }
    });
  }
};
