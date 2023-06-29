    const count = (
      interaction.options
    ).getInteger("amount");

    const messagesToBeDeleted = await interaction.channel.messages.fetch({
      limit: count
    });

    await interaction.channel.bulkDelete(messagesToBeDeleted, true);

    const successEmbed = new EmbedBuilder()
      .setTitle(`${emojis.VERIFY} Success!`)
      .setColor(colors.DEFAULT)
      .setDescription(`Successfully deleted **${count}** messages`)
      .setFooter({
        text: `This message auto-deletes in 5 seconds`,
        iconURL: interaction.user.displayAvatarURL()
      });

    await interaction.reply({
      embeds: [successEmbed]
    });

    setTimeout(() => interaction.deleteReply(), 5000);
