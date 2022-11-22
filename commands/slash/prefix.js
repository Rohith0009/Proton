const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "prefix",
  description: "View or set the bot prefix.",
  options: [
    {
      name: "prefix",
      description: "Changes the bot prefix",
      required: true,
      type: ApplicationCommandOptionType.String
    },
  ],
  callback: (interaction) => {
    let temp = true;
    const embed = new EmbedBuilder().setTitle(`The current server prefix is ${process.env.PREFIX}`).setColor("BLUE");
    if (interaction.options.getString("prefix")) {
      if (interaction.member.permissions.has(PermissionsBitField.Flags.MANAGE_GUILD)) {
        oldPrefix = process.env.PREFIX;
        process.env.PREFIX = interaction.options.getString("prefix");
        embed.setTitle(`Prefix changed from ${oldPrefix} to ${process.env.PREFIX}`);
        embed.setColor("Green");
        temp = false;
      } else {
        embed.setTitle(`Error`);
        embed.setDescription(`You don't have sufficient permissions to execute that command`);
        embed.setColor("RED");
      }
    }
    interaction.reply({ embeds: [embed], ephemeral: temp });
  },
};
