import Command from "../utils/command";

export default class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      aliases: ["p"],
      cooldown: 10
    });
  }
  async execute({ client, message, args }) {
    return message.reply({
      content: `Pong! 🏓`
    });
  }
}
