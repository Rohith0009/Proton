const { MessageEmbed } = require('discord.js');
const { Octokit } = require('octokit');
require('dotenv').config();

module.exports = {
  name: 'repolist',
  description: 'This is a command that lists the repositories Rohith.',
  callback: async (interaction) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_API_KEY });

    await octokit.request('GET /users/:user/repos', {
      user: 'Rohith0009'
    })
    .then((data) => {
      let embed = new MessageEmbed()
        .setTitle('Repository list')
        .setColor('BLUE')
        .setFooter({ text: 'Click on an arrow to open the corresponding repository' })

      data.data.forEach(dataChildren => {
        dataChildren.description = dataChildren.description || "This Is a Repository 🚀"
        embed.addFields(
          { name: `${dataChildren.name}`, value: `[>](https://github.com/Rohith009/${dataChildren.name}) ${dataChildren.description}`, inline: true }
        )
      })
      interaction.reply({ embeds: [embed], ephemeral: true });
    });
  }
};