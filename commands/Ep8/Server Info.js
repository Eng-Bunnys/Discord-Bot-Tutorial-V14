            const TierMap = {
              [GuildPremiumTier.None]: "Tier 0",
              [GuildPremiumTier.Tier1]: "Tier 1",
              [GuildPremiumTier.Tier2]: "Tier 2",
              [GuildPremiumTier.Tier3]: "Tier 3"
            };

            const NSFWMap = {
              [GuildNSFWLevel.Default]: "Default",
              [GuildNSFWLevel.Safe]: "Safe",
              [GuildNSFWLevel.Explicit]: "Explicit",
              [GuildNSFWLevel.AgeRestricted]: "Age Restricted"
            };

            const VerificationMap = {
              [GuildVerificationLevel.None]: "Unrestricted",
              [GuildVerificationLevel.Low]:
                "Must have verified email on account",
              [GuildVerificationLevel.Medium]:
                "Must be registered on Discord for longer than 5 minutes",
              [GuildVerificationLevel.High]:
                "Must be a member of the server for longer than 10 minutes",
              [GuildVerificationLevel.VeryHigh]:
                "Must have a verified phone number"
            };

            const ServerInformationEmbed = new EmbedBuilder()
              .setTitle(`${interaction.guild.name}`)
              .setThumbnail(
                interaction.guild.iconURL() ?? "https://i.imgur.com/AWGDmiu.png"
              )
              .setDescription(
                `${interaction.guild.name} was created on ${`<t:${Math.round(
                  Math.round(interaction.guild.createdTimestamp) / 1000
                )}:F>`}`
              )
              .setColor(colors.DEFAULT as ColorResolvable)
              .addFields(
                {
                  name: "Total Members",
                  value: `${interaction.guild.memberCount.toLocaleString()}`,
                  inline: true
                },
                {
                  name: "Total Humans",
                  value: `${interaction.guild.members.cache
                    .filter((member) => !member.user.bot)
                    .size.toLocaleString()}`,
                  inline: true
                },
                {
                  name: "Total Bots",
                  value: `${interaction.guild.members.cache
                    .filter((member) => member.user.bot)
                    .size.toLocaleString()}`,
                  inline: true
                },
                {
                  name: "Categories",
                  value: `${
                    interaction.guild.channels.cache.filter(
                      (c) => c.type == ChannelType.GuildCategory
                    ).size
                  }`,
                  inline: true
                },
                {
                  name: "Text Channels",
                  value: `${
                    interaction.guild.channels.cache.filter(
                      (c) => c.type === ChannelType.GuildText
                    ).size
                  }`,
                  inline: true
                },
                {
                  name: "Voice Channels",
                  value: `${
                    interaction.guild.channels.cache.filter(
                      (c) => c.type === ChannelType.GuildVoice
                    ).size
                  }`,
                  inline: true
                },
                {
                  name: "Role Count",
                  value: `${interaction.guild.roles.cache.size.toLocaleString()}`,
                  inline: true
                },
                {
                  name: "Boosts",
                  value: `${interaction.guild.premiumSubscriptionCount}`,
                  inline: true
                },
                {
                  name: "Boost Tier",
                  value: `${TierMap[interaction.guild.premiumTier]}`,
                  inline: true
                },
                {
                  name: "Explicit Content Filter",
                  value: `${NSFWMap[interaction.guild.nsfwLevel]}`,
                  inline: true
                },
                {
                  name: "Verification Level",
                  value: `${
                    VerificationMap[interaction.guild.verificationLevel]
                  }`,
                  inline: true
                },
                {
                  name: "AFK Channel",
                  value: `${interaction.guild.afkChannel ?? "None"}`,
                  inline: true
                },
                {
                  name: "AFK Timeout",
                  value: interaction.guild.afkChannel
                    ? `${msToTime(interaction.guild.afkTimeout * 1000)}`
                    : "None",
                  inline: true
                },
                {
                  name: "Owner",
                  value: `<@${interaction.guild.ownerId}>`,
                  inline: true
                },
                {
                  name: "Region",
                  value: `${interaction.guild.preferredLocale}`,
                  inline: true
                }
              )
              .setFooter({
                text: `Server ID: ${interaction.guild.id}`,
                iconURL: interaction.guild.iconURL()
              });

            if (interaction.guild.description)
              ServerInformationEmbed.addFields({
                name: "Server Description",
                value: `${interaction.guild.description ?? "No description"}`,
                inline: true
              });

            if (interaction.guild.bannerURL())
              ServerInformationEmbed.addFields({
                name: "Server Banner",
                value: `[Banner URL](${interaction.guild.bannerURL()})`,
                inline: true
              });

            function formatFeatures(arr: string[]): string {
              return arr
                .map((str) => {
                  const lowercased = str.toLowerCase();
                  const replaced = lowercased.replace(/_/g, " ");
                  const words = replaced.split(" ");
                  const formattedWords = words.map((word) => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                  });
                  return formattedWords.join(" ");
                })
                .join(", ");
            }

            if (interaction.guild.features.length > 0) {
              const GuildFeatures = formatFeatures(interaction.guild.features);
              ServerInformationEmbed.addFields({
                name: "Features",
                value: `${GuildFeatures}`
              });
            }
            return interaction.reply({
              embeds: [ServerInformationEmbed]
            });
