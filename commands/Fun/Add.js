const SlashCommand = require("../../utils/slashCommands");

const { ApplicationCommandOptionType } = require("discord.js");

module.exports = class AddCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "add",
      description: "Adds two numbers",

      options: [
        {
          name: "first-number",
          description: "The first number",
          type: ApplicationCommandOptionType.Integer,
          required: true
        },
        {
          name: "second-number",
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
    const firstNumber = interaction.options.getInteger("first-number");
    const secondNumber = interaction.options.getInteger("second-number");

    const result = firstNumber + secondNumber;

    return interaction.reply({
      content: `${result}`
    });
  }
};
