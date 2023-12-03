const fs = require('fs').promises;
const path = require('path');

module.exports = {
    data: {
        name: 'unregistersummoner',
        description: 'Unregister your League of Legends summoner',
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
                delete data[discordUserId]; // Remove the user's entry

                // Write the updated data back to the JSON file
                await fs.writeFile(filePath, JSON.stringify(data, null, 2));

                interaction.reply('Your summoner registration has been removed.');
            } else {
                interaction.reply('You do not have a summoner registered.');
            }
        } catch (error) {
            console.error(error);
            interaction.reply('Failed to unregister summoner.');
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
