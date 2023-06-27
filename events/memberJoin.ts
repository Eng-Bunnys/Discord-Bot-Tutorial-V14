import {
  EmbedBuilder,
  Events,
  GuildMember,
  TextBasedChannel
} from "discord.js";
import GBFClient from "../handler/clienthandler";

export default function memberJoin(client: GBFClient) {
  client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
    const channel = member.guild.channels.cache.get(
      "1123073978290929744"
    ) as TextBasedChannel;

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
}