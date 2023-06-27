import SlashCommand from "../utils/slashCommands";

import { ApplicationCommandType } from "discord.js";

export default class ContextPing extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "Ping",
      type: ApplicationCommandType.Message,

      cooldown: 10
    });
  }

  async execute({ client, interaction }) {
    return interaction.reply({
      content: `Pong! 🏓`
    });
  }
}
