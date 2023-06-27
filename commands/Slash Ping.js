import SlashCommand from "../utils/slashCommands";

export default class SlashPing extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Replies with pong",
      cooldown: 10
    });
  }

  async execute({ client, interaction }) {
    return interaction.reply({
      content: `Pong! 🏓`
    });
  }
}
