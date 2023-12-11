const { isUserRegistered } = require('../../utils/summonerHelpers');
const { readPlayerList } = require('../../utils/jsonFileHandler');

module.exports = {
    data: {
        name: 'checkregistered',
        description: 'Check if you have a Riot ID registered',
    },

    run: async ({ interaction, client }) => {
        const discordUserId = interaction.user.id; // Get the Discord user ID
        try {
            const isRegistered = await isUserRegistered(discordUserId);
            if (isRegistered) {
                const data = await readPlayerList();
                const summonerDetails = data[discordUserId];
                interaction.reply(`You have registered the Riot ID: ${summonerDetails.gameName} #${summonerDetails.tagLine}`);
            } else {
                interaction.reply('You do not have a summoner registered. To register your Riot ID, use /register.');
            }
        } catch (error) {
            console.error(error);
            interaction.reply('Failed to check Riot ID.');
        }
    },

    options: {
        devOnly: false,
        guildOnly: false,
        userPermissions: ['Administrator', 'AddReactions'],
        botPermissions: ['Administrator', 'AddReactions'],
        deleted: false,
    },
};
