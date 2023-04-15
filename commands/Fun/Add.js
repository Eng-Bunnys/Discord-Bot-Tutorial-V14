const SlashCommand = require("../../utils/slashCommands");

const { ApplicationCommandOptionType } = require("discord.js");

module.exports = class AddCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "add",
      description: "Adds two numbers",

      options: [
        {
          name: "num-one",
          description: "The first number",
          type: ApplicationCommandOptionType.Integer,
          required: true
        },
        {
          name: "num-two",
          description: "The second number",
          type: ApplicationCommandOptionType.Integer,
          required: true
        }
      ],

      devOnly: false,
      userPermission: [],
      botPermission: [],
      cooldown: 0,
      development: true,
      Partner: false
    });
  }

  async execute({ client, interaction }) {
    const numOne = interaction.options.getInteger("num-one");
    const numTwo = interaction.options.getInteger("num-two");

    const result = numOne + numTwo;

    return interaction.reply({
      content: `${result}`
    });
  }
};
