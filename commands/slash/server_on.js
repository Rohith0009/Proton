const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "server_on",
  description: "Request the Mods To Turn On the Minecraft Server",
  options: [
    {
      name: "server_ip",
      description: "The IP Of The Server",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  callback: (interaction) => {
      server_ip = interaction.options.getString("server_ip");
      interaction.reply({content: "Please contact <@892301934160146453> or <@736228651372380321> to turn on " + server_ip});
      dm_users = ["892301934160146453", "736228651372380321"];
      for (i = 0; i < dm_users.length; i++) {
        interaction.client.users.fetch(dm_users[i]).then((user) => user.send(interaction.user.username + " Requested to turn on " + server_ip));
      }
  },
};
