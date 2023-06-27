import SlashCommand from "../utils/slashCommands";
const colors = require("../GBF/GBFColor.json");

const {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  hyperlink
} = require("discord.js");

export default class AvatarCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "avatar",
      category: "User",
      description: "Get a user's avatar",

      options: [
        {
          name: "user",
          description: "The user that you want to get their avatar of",
          type: ApplicationCommandOptionType.User
        }
      ],

      cooldown: 10
    });
  }

  async execute({ client, interaction }) {
    const TargetUser = interaction.options.getUser("user") || interaction.user;

    const AvatarEmbed = new EmbedBuilder()
      .setTitle(`${TargetUser.username}'s Avatar`)
      .setColor(colors.DEFAULT)
      .setImage(
        TargetUser.displayAvatarURL({
          extension: "png",
          size: 1024
        })
      );

    const TargetMember = interaction.guild.members.cache.get(TargetUser.id);

    let EmbedDescription = `${hyperlink(
      "Global Avatar",
      TargetUser.displayAvatarURL()
    )}`;

    const AvatarButtons = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(TargetUser.displayAvatarURL())
        .setLabel("Global Avatar")
    ]);

    if (TargetMember) {
      if (TargetUser.displayAvatarURL() !== TargetMember.displayAvatarURL()) {
        AvatarEmbed.setThumbnail(TargetMember.displayAvatarURL());
        EmbedDescription += ` | ${hyperlink(
          "Server Avatar",
          TargetMember.displayAvatarURL()
        )}`;
        AvatarButtons.addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(TargetMember.displayAvatarURL())
            .setLabel("Server Avatar")
        ]);
      }
    }

    AvatarEmbed.setDescription(EmbedDescription);

    return interaction.reply({
      embeds: [AvatarEmbed],
      components: [AvatarButtons]
    });
  }
}
