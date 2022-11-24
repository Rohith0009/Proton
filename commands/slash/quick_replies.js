const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "quick_replies",
  description: "Set's Whether You Want Quick replies For your Messages",
  options: [
    {
      name: "enable_quick_replies",
      description: "Changes Whether You Get Quick Replies Or Not",
      required: true,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
  callback: (interaction) => {
    quick_replies_status = "";
    const embed = new EmbedBuilder().setTitle(`This Feature Is Currently In Development Contact Rohith For More Information`).setColor("BLUE");

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
