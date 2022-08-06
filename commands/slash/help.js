const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "help",
  description: "Get help and information about the bot.",
  callback: (interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("Help")
      .setDescription("There may be bugs, if you find them: ping <@892301934160146453>.")
      .addFields({ name: "Prefix", value: process.env.PREFIX }, { name: "Commands", value: "Poll Create, Poll End, Prefix, RepoList" })
      .setColor("BLUE");

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
