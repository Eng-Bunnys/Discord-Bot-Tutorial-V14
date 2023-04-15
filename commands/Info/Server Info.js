const SlashCommand = require("../../utils/slashCommands");

const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = class ServerInfoCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "server-info",
      description: "Gives information about this current guild",

      devOnly: false,
      userPermission: [],
      botPermission: [],
      cooldown: 0,
      development: true,
      Partner: false
    });
  }

  async execute({ client, interaction }) {
    const infoEmbed = new EmbedBuilder()
      .setTitle(`${interaction.guild.name} Information`)
      .setAuthor({
        name: `Sue`,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setURL("https://htmlcolorcodes.com/")
      .setColor("#33E9FF")
      .setDescription(
        `${interaction.guild.name} was created on ${`<t:${Math.round(
          new Date(interaction.guild.createdTimestamp) / 1000
        )}:F>`}`
      )
      .setFields(
        {
          name: `Member Count:`,
          value: `${interaction.guild.memberCount} Members`,
          inline: true
        },
        {
          name: "\u200b",
          value: `\u200b`,
          inline: true
        },
        {
          name: "Owner:",
          value: `<@${interaction.guild.ownerId}>`,
          inline: true
        },
        {
          name: "Test",
          value: "test",
          inline: true
        }
      )
      .setTimestamp()
      .setFooter({
        text: `The text`,
        iconURL: interaction.guild.iconURL()
      });

    const infoButtons = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setCustomId("memberCountDisabled")
        .setDisabled(true)
        .setEmoji("🧑")
        .setLabel(`${interaction.guild.memberCount} Members`)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setEmoji("⚠️")
        .setLabel("Guild Icon URL")
        .setStyle(ButtonStyle.Link)
        .setURL(interaction.guild.iconURL())
    ]);

    return interaction.reply({
      embeds: [infoEmbed],
      components: [infoButtons]
    });
  }
};
