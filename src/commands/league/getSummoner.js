const { RiotAPI, PlatformId } = require('@fightmegg/riot-api');

module.exports = {
    data: {
        name: 'getsummoner',
        description: 'Get summoner information from League of Legends',
        options: [{
            name: 'name',
            type: 3, // Integer representing 'STRING' type in Discord API
            description: 'The name of the summoner',
            required: true,
        }],
    },

    run: async ({ interaction, client }) => {
        const summonerName = interaction.options.getString('name');
        const rAPI = new RiotAPI(process.env.RIOT_API_KEY);

        try {
            const summoner = await rAPI.summoner.getBySummonerName({
                region: PlatformId.OC1,
                summonerName: summonerName,
            });

            // Respond with the summoner information
            interaction.reply(`Summoner Name: ${summoner.name}, Level: ${summoner.summonerLevel}`);
        } catch (error) {
            console.error(error);
            interaction.reply('Failed to fetch summoner information.');
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
