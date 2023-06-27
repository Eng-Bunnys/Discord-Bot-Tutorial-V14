const { Client, GatewayIntentBits, Events } = require('discord.js');
const { TOKEN } = require('./config/GBFconfig.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on(Events.ClientReady, (client) => {
  console.log(`${client.user.username} is now online`);
});

client.on(Events.MessageCreate, async (client) => {
  if (message.content.toLowerCase() === 'ping') {
    return message.reply({
      content: `Pong!`
    });
});

client.login(TOKEN);
