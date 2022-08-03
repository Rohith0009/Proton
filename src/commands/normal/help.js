const { MessageEmbed } = require("discord.js");

module.exports = {
  callback: (message) => {
    const embed = new MessageEmbed()
      .setTitle("Help")
      .setDescription("There may be bugs, if you find them: ping <@892301934160146453>.")
      .addFields({ name: "Prefix", value: process.env.PREFIX }, { name: "Commands", value: "repolist, prefix, poll" })
      .setColor("BLUE");

    message.channel.send({ embeds: [embed] });
  },
};
