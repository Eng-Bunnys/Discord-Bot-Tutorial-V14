const { Events } = require("discord.js");

module.exports = (client) => {
  client.on(Events.GuildMemberAdd, async (member) => {
    const welcomeChannelID = "1073039570448424994";

    const targetChannel = await member.guild.channels.cache.get(
      welcomeChannelID
    );

    return targetChannel.send({
      content: `<@${member.id}> just joined ${member.guild.name}!`
    });
  });
};
