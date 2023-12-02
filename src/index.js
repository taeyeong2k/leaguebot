const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config();
const client = new Client( {
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
