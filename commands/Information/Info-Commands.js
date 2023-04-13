const SlashCommand = require("../../utils/slashCommands");

const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder
} = require("discord.js");

module.exports = class InformationCommands extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "info",
      description: "Get information about a certain guild or user",
      userPermission: [PermissionFlagsBits.ManageGuild],
      botPermission: [],
      cooldown: 0,
      development: true,
      subcommands: {
        server: {
          description: "Get information about this current server",
          execute: async ({ client, interaction }) => {
            const guildName = interaction.guild.name;
            const guildMemberCount = interaction.guild.memberCount;
            const guildOwner = interaction.guild.ownerId;

            const guildInfo = new EmbedBuilder()
              .setTitle(`Information about ${guildName}`)
              .setThumbnail(interaction.guild.iconURL())
              .setColor("Random")
              .setFields(
                {
                  name: `Guild Owner`,
                  value: `<@${guildOwner}>`,
                  inline: true
                },
                {
                  name: `Member Count`,
                  value: `${guildMemberCount.toLocaleString()}`
                }
              );

            return interaction.reply({
              embeds: [guildInfo]
            });
          }
        },
        user: {
          description: "Get information about a user in this server",
          args: [
            {
              name: "user",
              description: "The user you want to get info about",
              type: ApplicationCommandOptionType.User
            }
          ],
          execute: async ({ client, interaction }) => {
            const targetMember =
              interaction.options.getMember("user") || interaction.member;

            const userInfo = new EmbedBuilder()
              .setTitle(`${targetMember.user.username} info`)
              .setThumbnail(targetMember.displayAvatarURL())
              .setColor("Aqua")
              .setFields(
                {
                  name: "ID",
                  value: `${targetMember.id}`
                },
                {
                  name: "Nickname",
                  value: `${
                    targetMember.nickname != null
                      ? targetMember.nickname
                      : "No nickname"
                  }`
                }
              );

            return interaction.reply({
              embeds: [userInfo]
            });
          }
        }
      }
    });
  }
};
