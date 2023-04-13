const SlashCommand = require("../../utils/slashCommands");

module.exports = class PingCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Replies with pong",

      devOnly: false,
      userPermission: [],
      botPermission: [],
      cooldown: 0,
      development: true,
      Partner: false
    });
  }

  async execute({ client, interaction }) {
    return interaction.reply({
      content: `Pong!`
    });
  }
};
