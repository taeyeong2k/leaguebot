const { Client, IntentsBitField, ThreadAutoArchiveDuration } = require('discord.js');
const { CommandKit } = require('commandkit');
const { getAllChampions } = require('./utils/datadragonHelper');
const path = require('path');
require('dotenv').config();


// Initialize discord bot client
const client = new Client( {
intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
    ],
});

// Initialise slash commands
new CommandKit({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    validationsPath: path.join(__dirname, 'validations'),
    devGuildIds: [process.env.DEV_GUILD_ID, process.env.DEV_GUILD_CWQMSWORLD_ID],
    devUserIds: [process.env.DEV_USER_ID, process.env.DEV_USER_ID_DOYEONG],
    devRoleIds: [],
    skipBuiltInValidations: true,
    bulkRegister: true,
});

// Load champions from Data Dragon
await getAllChampions();


client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
});

client.login(process.env.DISCORD_BOT_TOKEN);

