const config = require("../../config.json");
const { EmbedBuilder, colors, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Permissions } = require("discord.js");

module.exports = {
  name: "loa",
  description: "Apply or Return LOA",
  options: [
    {
      name: "apply",
      description: "Apply for LOA",
      options: [
        {
          name: "reason",
          description: "The reason for your leave",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "return",
          description: "Time of return from leave",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
    {
      name: "return",
      description: "Return from LOA",
    },
  ],
  callback: async (interaction) => {
    const options = interaction.options;
    if (options._subcommand === "apply") {
      if (!interaction.member.roles.cache.find((r) => r.name === "Gamers")) {
        return interaction.reply({ content: "You need the Gamers role to apply for LOA", ephemeral: true });
      }

      if (interaction.member.roles.cache.find((r) => r.name === "LOA")) {
        return interaction.reply({ content: "You are already set to LOA", ephemeral: true });
      }

      const dev = interaction.member;
      const loaRole = interaction.guild.roles.cache.find((r) => r.name === "LOA");
      const loaChannel = interaction.guild.channels.cache.find((c) => c.id === "1004743469635469395");

      const embed = new EmbedBuilder({
        title: `LOA pending`,
        colors: "#0099ff",
        fields: [
          {
            name: "Reason",
            value: options.getString("reason"),
            inline: true,
            type: ApplicationCommandOptionType.String,
          },
          {
            name: "Return",
            value: options.getString("return"),
            inline: true,
            type: ApplicationCommandOptionType.String,
          },
        ],
      }).setAuthor({
        name: interaction.member.user.tag,
        iconURL: interaction.member.displayAvatarURL(),
      });
      const buttons = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("accept").setLabel("Accept").setStyle("Primary"), new ButtonBuilder().setCustomId("deny").setLabel("Deny").setStyle("Secondary"));
      const filter = (ButtonInteraction) => {
        return ButtonInteraction.member.permissions.has(Permissions.Flags.ADMINISTRATOR);
      };
      loaChannel.send({ embeds: [embed], components: [buttons] }).then((message) => {
        interaction.reply({ content: "LOA asked successfully.", ephemeral: true });
        const collector = message.channel.createMessageComponentCollector({ filter, max: 1 });
        collector.on("end", (collection) => {
          if (collection.first().customId == "accept") {
            dev.setNickname(`[LOA] ${dev.displayName}`);
            dev.roles.add(loaRole);
            embed.setTitle(`LOA granted by \`${collection.first().member.user.tag}\``);
            embed.setColor("GREEN");
            message.edit({ embeds: [embed], components: [] });
          } else {
            embed.setTitle(`LOA denied by \`${collection.first().member.user.tag}\``);
            embed.setColor("RED");
            message.edit({ embeds: [embed], components: [] });
          }
        });
      });
    } else if (options._subcommand === "return") {
      if (!interaction.member.roles.cache.find((r) => r.name === "Gamers")) {
        return interaction.reply({ content: "You need the Developer role to return from LOA", ephemeral: true });
      }

      if (!interaction.member.roles.cache.find((r) => r.name === "LOA")) {
        return interaction.reply({ content: "You are not set to LOA", ephemeral: true });
      }

      const dev = interaction.member;
      const loaRole = interaction.guild.roles.cache.find((r) => r.name === "LOA");
      const loaChannel = interaction.guild.channels.cache.find((c) => c.id === config.loaReports);

      const embed = new MessageEmbed({
        title: `Returned from their LOA`,
        colors: "#0099ff",
      }).setAuthor({
        name: interaction.member.user.tag,
        iconURL: interaction.member.displayAvatarURL(),
      });

      if (dev.displayName.slice(0, 6) !== "LOA ") {
        await dev.roles.remove(loaRole);
        await loaChannel.send({ embeds: [embed] });

        return interaction.reply({ content: "Returned from LOA\nℹ It seems that your nickname was altered during your LOA, no actions will be executed on your nickname", ephemeral: true });
      }

      try {
        await dev.setNickname(dev.displayName.slice(6));
        await dev.roles.remove(loaRole);
        await loaChannel.send({ embeds: [embed] });

        interaction.reply({ content: "Returned from LOA", ephemeral: true });
      } catch (err) {
        console.log(err);
        interaction.reply({ content: "Something went wrong", ephemeral: true });
      }
    }
  },
};
