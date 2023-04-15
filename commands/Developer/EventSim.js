const SlashCommand = require("../../utils/slashCommands");

const { Events } = require("discord.js");

module.exports = class EventSim extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "sim",
      description: "Simulate an event",

      devOnly: false,
      userPermission: [],
      botPermission: [],
      cooldown: 0,
      development: true,
      Partner: false
    });
  }

  async execute({ client, interaction }) {
    await client.emit(Events.GuildMemberAdd, interaction.member);
    return interaction.reply({
      content: `Done`
    });
  }
};
