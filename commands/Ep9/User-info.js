import SlashCommand from "../utils/slashCommands";
const colors = require("../GBF/GBFColor.json");

const {
  EmbedBuilder,
  ApplicationCommandOptionType,
  UserFlags,
  hyperlink,
  Activity,
  ActivityType,
  User
} = require("discord.js");

const { trimArray, KeyPerms, msToTime } = require("../utils/Engine");

export default class UserInfoCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "user-info",
      description: "Get information about a Discord user",

      options: [
        {
          name: "user",
          description: "The user that you want to get information about",
          type: ApplicationCommandOptionType.User
        }
      ],

      development: true
    });
  }

  async execute({ client, interaction }) {
    const TargetUser = interaction.options.getUser("user") || interaction.user;

    const TargetMember = interaction.guild.members.cache.get(TargetUser.id);

    if (!TargetMember) {
      const UserCreated = Math.round(TargetUser.createdTimestamp / 1000);

      const UserEmbed = new EmbedBuilder()
        .setAuthor({
          name: TargetUser.username,
          iconURL: TargetUser.displayAvatarURL()
        })
        .setThumbnail(TargetUser.displayAvatarURL())
        .setColor(colors.DEFAULT)
        .addFields(
          {
            name: `Joined Discord`,
            value: `<t:${UserCreated}:F>, <t:${UserCreated}:R>`,
            inline: true
          },
          {
            name: "Username",
            value: TargetUser.username,
            inline: true
          },
          {
            name: "Account Type",
            value: `${TargetUser.bot ? "Bot" : "Human"}`,
            inline: true
          },
          {
            name: "ID",
            value: TargetUser.id,
            inline: true
          }
        );

      return interaction.reply({
        embeds: [UserEmbed]
      });
    }

    const DevicesMap = {
      "": "",
      web: "🌐",
      desktop: "💻",
      mobile: "📱"
    };

    const MemberDevice =
      TargetMember.presence &&
      !TargetUser.bot &&
      Object.keys(TargetMember.presence.clientStatus).length > 0
        ? DevicesMap[Object.keys(TargetMember.presence.clientStatus)[0]]
        : "";

    const UserCreated = Math.round(TargetUser.createdTimestamp / 1000);
    const MemberJoined = Math.round(TargetMember.joinedTimestamp / 1000);

    const HighestRole =
      TargetMember.roles.highest.id === interaction.guild.id
        ? "@everyone"
        : `<@&${TargetMember.roles.highest.id}>`;

    const UserRoles = trimArray(
      TargetMember.roles.cache
        .sort((a, b) => b.position - a.position)
        .map((role) => role.toString())
        .slice(0, -1)
    );

    let AvatarLinks = `${hyperlink(
      "Global Avatar",
      TargetUser.displayAvatarURL()
    )}`;

    if (TargetUser.displayAvatarURL() !== TargetMember.displayAvatarURL())
      AvatarLinks += ` | ${hyperlink(
        "Server Avatar",
        TargetMember.displayAvatarURL()
      )}`;

    const BadgesMap = {
      "": "None",
      [UserFlags[UserFlags.ActiveDeveloper]]:
        "<:ActiveDeveloper:1118890582673215568>",
      [UserFlags[UserFlags.Staff]]: "<:D_Staff:826951574088581140>",
      [UserFlags[UserFlags.Partner]]: "<:D_Partner:826951266357608558>",
      [UserFlags[UserFlags.BugHunterLevel1]]:
        "<:D_BugHunter:826950777176195123>",
      [UserFlags[UserFlags.Hypesquad]]:
        "<:D_HypeSquadEvents:826950445695500358>",
      [UserFlags[UserFlags.HypeSquadOnlineHouse1]]:
        "<:D_Bravery:826950151444103178>",
      [UserFlags[UserFlags.HypeSquadOnlineHouse2]]:
        "<:D_Brilliance:826949675038801981>",
      [UserFlags[UserFlags.HypeSquadOnlineHouse3]]:
        "<:D_Balance:826948943178760212>",
      [UserFlags[UserFlags.PremiumEarlySupporter]]:
        "<:D_Earlysupporter:826949248607977474>",
      [UserFlags[UserFlags.VerifiedBot]]:
        "Verified Bot <:verifiedbot:972938255291015248>",
      [UserFlags[UserFlags.VerifiedDeveloper]]:
        "<:D_VerifBotDev:826952303042101288>",
      [UserFlags[UserFlags.BotHTTPInteractions]]: "",
      [UserFlags[UserFlags.TeamPseudoUser]]: "",
      [UserFlags[UserFlags.BugHunterLevel2]]:
        "<:bugHunter2:973146470494662677>",
      [UserFlags[UserFlags.CertifiedModerator]]:
        "<:certifiedMod:973146823814418492>"
    };

    const UserBadges =
      (await TargetUser.fetchFlags())
        .toArray()
        .map((flag) => BadgesMap[flag])
        .join(" ") || "None";

    const StatusesMap = {
      "": "None",
      "online": "<:online:934570010901377025> Online",
      "idle": "<:idle:934569895474114611> Idle",
      "dnd": "<:dnd:934569539776155718> Do Not Disturb",
      "streaming": "<:streaming:934569539054731324> Streaming",
      "offline": "<:invs:934569539197341717> Offline"
    };

    const StatusText = TargetMember.presence
      ? StatusesMap[TargetMember.presence.status]
      : "<:invs:934569539197341717> Offline";

    const MemberEmbed = new EmbedBuilder()
      .setAuthor({
        name: `${TargetUser.username} ${MemberDevice}`,
        iconURL: TargetMember.displayAvatarURL()
      })
      .setDescription(AvatarLinks)
      .setThumbnail(TargetMember.displayAvatarURL())
      .setColor(TargetMember.displayHexColor)
      .addFields(
        {
          name: "User Badges",
          value: UserBadges
        },
        {
          name: "Joined Discord",
          value: `<t:${UserCreated}:F>, <t:${UserCreated}:R>`,
          inline: true
        },
        {
          name: "Joined Server",
          value: `<t:${MemberJoined}:F>, <t:${MemberJoined}:R>`,
          inline: true
        },
        {
          name: "Nickname",
          value: `${
            TargetMember.nickname ? TargetMember.nickname : TargetUser.username
          }`,
          inline: true
        },
        {
          name: "Account Type",
          value: `${TargetUser.bot ? "Bot" : "Human"}`,
          inline: true
        },
        {
          name: "Color",
          value: hyperlink(
            TargetMember.displayHexColor,
            `https://www.color-hex.com/color/${TargetMember.displayHexColor.slice(
              1
            )}`
          ),
          inline: true
        },
        {
          name: "ID",
          value: TargetUser.id,
          inline: true
        },
        {
          name: "Highest Role",
          value: `${HighestRole}`,
          inline: true
        },
        {
          name: "Status",
          value: StatusText,
          inline: true
        }
      );

    if (UserRoles.length > 0)
      MemberEmbed.addFields({
        name: `Roles [${UserRoles.length}]`,
        value: `${UserRoles}`
      });

    const MemberPerms = KeyPerms(TargetMember);

    if (TargetMember.premiumSinceTimestamp) {
      const PremiumStamp = Math.round(
        TargetMember.premiumSinceTimestamp / 1000
      );

      MemberEmbed.addFields({
        name: `Boosting "${interaction.guild.name}" since`,
        value: `<t:${PremiumStamp}:F>, <t:${PremiumStamp}:R>`
      });
    }

    if (MemberPerms[1] > 0)
      MemberEmbed.addFields({
        name: `Key Permissions [${MemberPerms[1]}]`,
        value: `${MemberPerms[0]}`
      });

    const ActivityMap = {
      0: "Playing",
      1: "Streaming",
      2: "Listening",
      3: "Watching",
      4: "Custom Status",
      5: "Competing"
    };

    if (TargetMember.presence && TargetUser.bot) {
      if (TargetMember.presence.activities.length > 0)
        MemberEmbed.addFields({
          name: `${ActivityMap[TargetMember.presence.activities[0].type]}`,
          value: `${TargetMember.presence.activities[0].name}`
        });
      if (TargetMember.presence.activities.length > 1)
        MemberEmbed.addFields({
          name: `${ActivityMap[TargetMember.presence.activities[1].type]}`,
          value: `${TargetMember.presence.activities[1].name}`
        });
    }

    if (TargetMember.presence && !TargetUser.bot) {
      for (let i = 0; i < TargetMember.presence.activities.length; i++) {
        const UserActivity = TargetMember.presence.activities[i];
        let StatusName;
        let StatusState;
        let StatusEmoji;
        if (UserActivity.type === ActivityType.Custom) {
          StatusName = UserActivity?.name ?? "Custom Status";
          StatusState = UserActivity?.state ?? "";
          StatusEmoji = UserActivity.emoji?.toString() ?? "";
          MemberEmbed.addFields({
            name: StatusName,
            value: `${StatusEmoji} ${StatusState}`,
            inline: true
          });
        } else if (UserActivity.type === ActivityType.Listening) {
          StatusName = UserActivity?.name ?? "Listening";
          StatusState = UserActivity?.state ?? "";

          const TrackName = UserActivity.details;
          const AlbumName = UserActivity.assets.largeText;

          const SongEndTimestamp = UserActivity.timestamps?.end?.getTime();
          const RemainingTime = SongEndTimestamp
            ? SongEndTimestamp - Date.now()
            : null;
          const SongEnd = RemainingTime
            ? msToTime(Math.abs(RemainingTime))
            : "Just Ended";

          if (StatusName === "Spotify")
            StatusEmoji = `<:Spotify:962905037649096815>`;
          else StatusEmoji = "🎧";

          if (StatusState.includes(";"))
            StatusState = StatusState.split(";").join(", ");

          MemberEmbed.addFields({
            name: `Listening to ${StatusName} ${StatusEmoji}:`,
            value: `**[${TrackName}](https://open.spotify.com/search/${TrackName.split(
              " "
            ).join(
              "%20"
            )})**\nby ${StatusState}\non [${AlbumName}](https://open.spotify.com/search/${AlbumName.split(
              " "
            ).join("%20")})\nTrack ends in: ${SongEnd}`,
            inline: true
          });
        } else if (UserActivity.type === ActivityType.Playing) {
          let GameName; //League of legends etc
          let GameDetails; //Customs, etc
          let GameState; //In queue, in game etc
          let EndsIn; //1 minute ago etc
          let StartedPlaying;
          GameName = UserActivity.name;
          GameDetails = UserActivity.details ?? "";
          GameState = UserActivity.state ?? "";
          if (GameName === "YouTube") {
            if (UserActivity.state === null) {
              if (UserActivity.timestamps && UserActivity.timestamps?.start) {
                const StartTime = UserActivity.timestamps.start?.getTime();
                const CurrentTime = Date.now();
                StartedPlaying = msToTime(Math.abs(StartTime - CurrentTime));
              } else {
                StartedPlaying = "Just Started";
              }
              UserInfoEmbed.addFields({
                name: `Watching YouTube :YouTube::`,
                value: `${GameDetails} for: ${StartedPlaying}`
              });
            } else {
              let EndsInText;
              if (
                UserActivity.timestamps?.end &&
                UserActivity.assets?.smallText === "Live"
              ) {
                EndsIn = "Live Stream [No Known End Time]";
                EndsInText = `Ends In:`;
              } else if (UserActivity.timestamps?.end) {
                const EndTime = UserActivity.timestamps.end?.getTime();
                const CurrentTime = Date.now();
                EndsIn = msToTime(Math.abs(EndTime - CurrentTime));
                EndsInText = `Video Ends In:`;
              } else {
                EndsIn = "Just Ended";
                EndsInText = `Video `;
              }
              const VideoState = UserActivity.assets?.smallText;
              UserInfoEmbed.addFields({
                name: `Watching YouTube :YouTube::`,
                value: `**Video:** ${GameDetails}\n**Channel:** ${GameState}\n**Video Status:** ${VideoState}\n**${EndsInText}** ${EndsIn}`
              });
            }
          } else {
            let PlayTimeText;
            if (
              UserActivity.timestamps !== null &&
              UserActivity.timestamps.start !== null
            ) {
              const StartedPlayingTimeStamp = new Date(
                UserActivity.timestamps.start
              ).getTime();
              const now = new Date().getTime();
              StartedPlaying = msToTime(
                Math.abs(StartedPlayingTimeStamp - now)
              );
              PlayTimeText = `Current Session:`;
            } else if (
              UserActivity.timestamps.start === null ||
              UserActivity.timestamps.end !== null
            ) {
              StartedPlaying = "";
              PlayTimeText = `In-Game`;
            } else {
              StartedPlaying = "Just Started";
              PlayTimeText = `Current Session:`;
            }
            if (GameDetails !== "" && GameState !== "") {
              MemberEmbed.addFields({
                name: `Playing ${GameName}:`,
                value: `🕑 ${PlayTimeText} ${StartedPlaying}\n\n${GameDetails}\n${GameState}`,
                inline: true
              });
            } else {
              MemberEmbed.addFields({
                name: `Playing ${GameName}:`,
                value: `${PlayTimeText} ${StartedPlaying}`,
                inline: true
              });
            }
          }
        }
      }
    }

    return interaction.reply({
      embeds: [MemberEmbed]
    });
  }
}
