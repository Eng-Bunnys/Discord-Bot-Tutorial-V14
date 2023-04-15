const { Events } = require("discord.js");

module.exports = (client) => {
  client.on(Events.GuildMemberAdd, async (member) => {
    const welcomeChannel = await member.guild.channels.cache.get(
      "1096068485035077653"
    );

    return welcomeChannel.send({
      content: `${member.user.username} just joined ${member.guild.name}`
    });
  });
};
