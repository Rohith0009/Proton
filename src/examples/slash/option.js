const { MessageEmbed, Constants } = require("discord.js");

/**
 * @file This is an example of Options.
 * @author Serge
 */

module.exports = {
  name: "Option",
  description: "this is an Option example",
  Options: [
    {
      name: "Option",
      description: "Option",
      type: Constants.ApplicationCommandOptionTypes.STRING,
      required: true, // or false
      choices: [
        {
          name: "yes",
          value: "yes",
        },
        {
          name: "no",
          value: "no",
        },
      ],
    },
  ],
  callback: (interaction) => {
    const Option = interaction.Options.getString("Option");
    let embed = new MessageEmbed();

    if (Option == "yes") {
      embed.setTitle("you like Option");
      embed.setColor("GREEN");
    } else {
      embed.setTitle("you hate Option :<");
      embed.setColor("RED");
    }
    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
