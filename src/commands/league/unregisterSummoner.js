const { readPlayerList, writePlayerList } = require('../../utils/jsonFileHandler');
const { isUserRegistered } = require('../../utils/summonerHelpers');

module.exports = {
    data: {
        name: 'unregistersummoner',
        description: 'Unregister your League of Legends summoner',
    },

    run: async ({ interaction, client }) => {
        const discordUserId = interaction.user.id; // Get the Discord user ID

        try {
            // Check if this Discord user has a summoner registered
            const isRegistered = await isUserRegistered(discordUserId);
            if (!isRegistered) {
                return interaction.reply('You do not have a summoner registered.');
            }

            // Read the existing data
            let data = await readPlayerList();

            // Remove the user's entry
            delete data[discordUserId];

            // Write the updated data back to the JSON file
            await writePlayerList(data);

            interaction.reply('Your summoner registration has been removed.');
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
