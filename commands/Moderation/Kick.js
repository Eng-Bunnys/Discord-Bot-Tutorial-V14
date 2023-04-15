const SlashCommand = require("../../utils/slashCommands");

const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder
} = require("discord.js");

const colors = require("../../GBF/GBFColor.json");
const emojis = require("../../GBF/GBFEmojis.json");
const KickSchema = require("../../schemas/Moderation Schemas/Kick Schema");

module.exports = class KickCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "kick",
      description: "Kick a member from this server",

      options: [
        {
          name: "member",
          description: "The member that you want to kick",
          type: ApplicationCommandOptionType.User,
          required: true
        },
        {
          name: "reason",
          description: "The reason for the kick",
          type: ApplicationCommandOptionType.String
        }
      ],

      devOnly: false,
      userPermission: [PermissionFlagsBits.KickMembers],
      botPermission: [PermissionFlagsBits.KickMembers],
      cooldown: 0,
      development: true,
      Partner: false
    });
  }

  async execute({ client, interaction }) {
    const targetUser = interaction.options.getUser("member");
    const kickReason =
      interaction.options.getString("reason") || "No Reason Specified";

    const selfKick = new EmbedBuilder()
      .setTitle(`${emojis.ERROR} You can't do that`)
      .setColor(colors.ERRORRED)
      .setDescription(
        `You can't kick yourself from ${interaction.guild.name}, if you want to leave, there's a leave button.`
      );

    if (interaction.user.id === targetUser.id)
      return interaction.reply({
        embeds: [selfKick],
        ephemeral: true
      });

    const botKick = new EmbedBuilder()
      .setTitle(`${emojis.ERROR} You can't do that`)
      .setColor(colors.ERRORRED)
      .setDescription(`I can't kick myself`);

    if (client.user.id === targetUser.id)
      return interaction.reply({
        embeds: [botKick],
        ephemeral: true
      });

    const targetMember = await interaction.guild.members.cache.get(
      targetUser.id
    );

    const notInGuild = new EmbedBuilder()
      .setTitle(`${emojis.ERROR} You can't do that`)
      .setColor(colors.ERRORRED)
      .setDescription(`The specified user is not in ${interaction.guild.name}`);

    if (!targetMember)
      return interaction.reply({
        embeds: [notInGuild],
        ephemeral: true
      });

    const AdminPerms = new EmbedBuilder()
      .setTitle(`${emojis.ERROR} You can't do that`)
      .setColor(colors.ERRORRED)
      .setDescription(`I cannot kick an admin`);

    if (targetMember.permissions.has(PermissionFlagsBits.Administrator))
      return interaction.reply({
        embeds: [AdminPerms],
        ephemeral: true
      });
    if (interaction.user.id !== interaction.guild.ownerId) {
      const botPosition = interaction.guild.members.me.roles.highest.position;
      const targetPosition = targetMember.roles.highest.position;
      const commandUserPosition = interaction.member.roles.highest.position;

      const targetHigher = new EmbedBuilder()
        .setTitle(`${emojis.ERROR} You can't do that`)
        .setColor(colors.ERRORRED)
        .setDescription(
          `${targetMember.user.username}'s position is higher or equal than yours.`
        );

      if (commandUserPosition <= targetPosition)
        return interaction.reply({
          embeds: [targetHigher],
          ephemeral: true
        });

      const targetHigherThanBot = new EmbedBuilder()
        .setTitle(`${emojis.ERROR} You can't do that`)
        .setColor(colors.ERRORRED)
        .setDescription(
          `${targetMember.user.username}'s position is higher or equal than mine.`
        );

      if (botPosition <= targetPosition)
        return interaction.reply({
          embeds: [targetHigherThanBot],
          ephemeral: true
        });
    }
    const kickData =
      (await KickSchema.findOne({
        userID: targetMember.id,
        guildID: interaction.guild.id
      })) || undefined;

    const caseID = `${kickData ? kickData.TotalCases + 1 : 1}`;

    const UserKicked = new EmbedBuilder()
      .setTitle(`A user has been kicked`)
      .setColor(colors.ERRORRED)
      .addFields(
        {
          name: "Moderator:",
          value: `${interaction.user.tag} (${interaction.user.id})`,
          inline: true
        },
        {
          name: "Target Details:",
          value: `${targetUser.tag} (${targetUser.id})`,
          inline: true
        },
        {
          name: "Kick Reason:",
          value: `${kickReason}`,
          inline: true
        },
        {
          name: "Time of Kick:",
          value: `<t:${Math.round(new Date().getTime() / 1000)}:F>`,
          inline: true
        },
        {
          name: "Case ID:",
          value: `#KN${caseID}`,
          inline: true
        },
        {
          name: "\u200b",
          value: "\u200b",
          inline: true
        }
      )
      .setFooter({
        text: `${interaction.guild.name} Moderation powered by GBF`,
        iconURL: client.user.displayAvatarURL()
      });

    if (kickData) {
      await kickData.updateOne({
        TotalCases: kickData.TotalCases + 1
      });

      await kickData.Cases.push(`#KN${caseID}`);
      await kickData.Reasons.push(`${kickReason}`);

      await kickData.save();

      await interaction.reply({
        embeds: [UserKicked]
      });

      return targetMember.kick(kickReason);
    } else {
      const newKickData = new KickSchema({
        userID: targetMember.id,
        guildID: interaction.guild.id,
        Cases: [`#KN${caseID}`],
        Reasons: [`${kickReason}`],
        TotalCases: 1
      });

      await newKickData.save();

      await interaction.reply({
        embeds: [UserKicked]
      });

      return targetMember.kick(kickReason);
    }
  }
};
