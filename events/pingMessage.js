const { Events } = require("discord.js");

module.exports = (client) => {
  client.on(Events.MessageCreate, async (message) => {
    if (message.guild.id !== "1073039570448424991") return;
    if (message.content.toLowerCase().includes("ping"))
      return message.reply({
        content: `Pong`
      });
  });
};
