const { getSummoner } = require('../../riotapi'); // Adjust the path according to your project structure
const fs = require('fs').promises;
const path = require('path');
module.exports = {
    data: {
        name: 'registersummoner',
        description: 'Register a league of legends summoner to your discord account',
        options: [{
            name: 'name',
            type: 3, // Integer representing 'STRING' type in Discord API
            description: 'The name of the summoner',
            required: true,
        }],
    },

    run: async ({ interaction, client }) => {
        const summonerName = interaction.options.getString('name');
        const discordUserId = interaction.user.id; // Get the Discord user ID
        const filePath = path.join(__dirname, '../../playerlist.json'); // Correct path to your JSON file

        try {
            // Read the existing data
            let data = await fs.readFile(filePath, 'utf8');
            data = data ? JSON.parse(data) : {};

            // Check if this Discord user has already registered a summoner
            if (data[discordUserId]) {
                return interaction.reply('You have already registered a summoner.');
            }

            // Fetch summoner information
            const summoner = await getSummoner(summonerName);
            console.log(summoner);

            // Add specific summoner details to the list with Discord user ID as key
            data[discordUserId] = {
                id: summoner.id,
                accountId: summoner.accountId,
                puuid: summoner.puuid,
                name: summoner.name
            };

            // Write the updated data back to the JSON file
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));

            interaction.reply(`Registered Summoner: ${summoner.name}`);
        } catch (error) {
            console.error(error);
            interaction.reply('Failed to register summoner.');
        }
    },

    options: {
        devOnly: true,
        guildOnly: true,
        userPermissions: ['Administrator', 'AddReactions'],
        botPermissions: ['Administrator', 'AddReactions'],
        deleted: false,
    },
};