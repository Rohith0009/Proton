const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "server_list",
  description: "Shows All The Official Servers",
  callback: (interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("Server list")
      .setDescription("Shows All The Official Servers")
      .addFields(
        { name: "BFF SMP", value: "SMP1Chzl.aternos.me - 1.18.2" },
        { name: "Tappi's Hardcore", value: "TappiHardcoreSMP.aternos.me - " },
        { name: "HardCore Idiots", value: "HardcoreIdoits.aternos.me - " }
      )
      .setColor("BLUE");

    interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
