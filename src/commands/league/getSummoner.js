const { getSummoner } = require('../../utils/riotAPIHelpers'); // Adjust the path
const { isUserRegistered, getRegisteredSummonerName } = require('../../utils/summonerHelpers');

module.exports = {
    data: {
        name: 'getsummoner',
        description: 'Get summoner information from League of Legends',
        options: [{
            name: 'name',
            type: 3, // 'STRING' type
            description: 'The name of the summoner. Optional if you have registered with registersummoner',
            required: false, // Now optional
        }],
    },

    run: async ({ interaction, client }) => {
        const discordUserId = interaction.user.id;
        let summonerName = interaction.options.getString('name');

        try {
            // If summonerName not provided, check if user has a summoner registered
            if (!summonerName) {
                const isRegistered = await isUserRegistered(discordUserId);
                if (!isRegistered) {
                    return interaction.reply('No summoner name provided and you do not have a summoner registered.');
                }

                // Get the registered summoner name
                summonerName = await getRegisteredSummonerName(discordUserId);
            }

            const summoner = await getSummoner(summonerName);
            console.log(summoner);

            // Check if provided name matches the registered name (if applicable)
            const isRegistered = await isUserRegistered(discordUserId);
            const registeredName = isRegistered ? await getRegisteredSummonerName(discordUserId) : null;
            const additionalInfo = registeredName && interaction.options.getString('name') === registeredName.toLowerCase()
                ? " \nYou've registered your summoner name already, you don't need to provide your summoner name next time."
                : '';

            interaction.reply(`Summoner Name: ${summoner.name}, Level: ${summoner.summonerLevel}${additionalInfo}`);
        } catch (error) {
            console.error(error);
            interaction.reply(error.message);
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
