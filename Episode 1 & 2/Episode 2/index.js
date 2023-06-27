const { Client, GatewayIntentBits, Events } = require('discord.js');
const { TOKEN } = require('./config/GBFconfig.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on(Events.ClientReady, (client) => {
  console.log(`${client.user.username} is now online`);

  await client.application?.commands.create({
    name: "ping",
    description: "Replies with pong"
  });
});

client.on(Events.MessageCreate, async (message) => {
  if (message.content.toLowerCase() === 'ping') {
    return message.reply({
      content: `Pong!`
    });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.commandName === "ping") return interaction.reply({
      content: `Pong!`
  });
});

client.login(TOKEN);
