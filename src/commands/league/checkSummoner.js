const { isUserRegistered } = require('../../utils/summonerHelpers');
const { readPlayerList } = require('../../utils/jsonFileHandler');

module.exports = {
    data: {
        name: 'checksummoner',
        description: 'Check if you have a summoner registered',
    },

    run: async ({ interaction, client }) => {
        const discordUserId = interaction.user.id; // Get the Discord user ID

        try {
            const isRegistered = await isUserRegistered(discordUserId);

            if (isRegistered) {
                const data = await readPlayerList();
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
