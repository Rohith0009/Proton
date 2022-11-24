const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "help",
  description: "Get help and information about the bot.",
  callback: (interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("Help")
      .setDescription(`
      This Is The Help Menu For Proton.
      Bot Version: **V1.1**
      `)
      .addFields(
        { name: "Prefix", value: `Changes The Prefix. Current Prefix is **${process.env.PREFIX}**` },
        { name: "Server List", value: "Shows All The Official Servers" },
        { name: "Server On", value: "Request the Mods To Turn On the Minecraft Server" },
        { name: "Polls", value: "Help To Create And End a Poll." },
        { name: "LOA", value: "Used To Request And Return For LOA's" }
      )
      .setColor("BLUE");

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
