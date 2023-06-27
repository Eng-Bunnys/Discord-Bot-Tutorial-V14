const { Client, GatewayIntentBits, Events } = require('discord.js');
const { TOKEN } = require('./config/GBFconfig.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.on(Events.ClientReady, (client) => {
  console.log(`${client.user.username} is now online`);
});

client.login(TOKEN);
