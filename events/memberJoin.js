const { Events, EmbedBuilder } = require("discord.js");

module.exports = function memberJoin(client) {
  client.on(Events.GuildMemberAdd, async (member) => {
    const channel = member.guild.channels.cache.get("1123073978290929744");

    if (!channel) return;

    const MemberJoined = new EmbedBuilder()
      .setTitle(`A new user just landed`)
      .setThumbnail(
        member.displayAvatarURL({
          extension: "png"
        })
      )
      .setColor("Blurple")
      .setDescription(`${member.user} just joined ${member.guild.name}`)
      .setFooter({
        text: `${member.guild.name} now has ${member.guild.memberCount} members`,
        iconURL: member.guild.iconURL()
      });

    channel.send({
      embeds: [MemberJoined]
    });
  });
};
