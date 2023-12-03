const fs = require('fs').promises;
const path = require('path');

module.exports = {
    data: {
        name: 'checksummoner',
        description: 'Check if you have a summoner registered',
    },

    run: async ({ interaction, client }) => {
        const discordUserId = interaction.user.id; // Get the Discord user ID
        const filePath = path.join(__dirname, '../../playerlist.json'); // Correct path to your JSON file

        try {
            // Read the existing data
            let data = await fs.readFile(filePath, 'utf8');
            data = data ? JSON.parse(data) : {};

            // Check if this Discord user has a summoner registered
            if (data[discordUserId]) {
                const summonerDetails = data[discordUserId];
                interaction.reply(`You have registered the summoner: ${summonerDetails.name}`);
            } else {
                interaction.reply('You do not have a summoner registered. To register a summoner, use the `/registersummoner` command.');
            }
        } catch (error) {
            console.error(error);
            interaction.reply('Failed to check summoner registration.');
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
