import GBFClient from "../handler/clienthandler";
import SlashCommand from "../utils/slashCommands";
import colors from "../GBF/GBFColor.json";

import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
  ColorResolvable,
  CommandInteraction,
  EmbedBuilder,
  hyperlink
} from "discord.js";

interface IExecute {
  client: GBFClient;
  interaction: CommandInteraction;
}

export default class AvatarCommand extends SlashCommand {
  constructor(client: GBFClient) {
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

  async execute({ client, interaction }: IExecute) {
    const TargetUser = interaction.options.getUser("user") || interaction.user;

    const AvatarEmbed = new EmbedBuilder()
      .setTitle(`${TargetUser.username}'s Avatar`)
      .setColor(colors.DEFAULT as ColorResolvable)
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

    const AvatarButtons: ActionRowBuilder<any> =
      new ActionRowBuilder().addComponents([
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
