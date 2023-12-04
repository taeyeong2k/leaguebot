const { isUserRegistered, getRegisteredSummonerName } = require('../../utils/summonerHelpers');
const { getSummoner, getMatches, getMatchInfo, parseMatchInfo} = require('../../utils/riotAPIHelpers');

module.exports = {
    data: {
        name: 'getmatchhistory',
        description: 'Get match history for a summoner',
        options: [
            {
                name: 'summoner',
                type: 3, // STRING type
                description: 'The name of the summoner',
                required: false,
            },
            {
                name: 'queue',
                type: 3, // STRING type
                description: 'Type of queue (norms, ranked, all)',
                required: false,
            },
            {
                name: 'matches',
                type: 4, // INTEGER type
                description: 'Number of matches to retrieve',
                required: false,
            }
        ],
    },

    run: async ({ interaction, client }) => {
        const summonerNameInput = interaction.options.getString('summoner');
        const queueTypeInput = interaction.options.getString('queue');
        const numberOfMatches = interaction.options.getInteger('matches') || 1;
        let summonerName = summonerNameInput;
        let queueId = null;

        // Map queue type input to queue ID
        if (queueTypeInput === 'norms') {
            queueId = 400;
        } else if (queueTypeInput === 'ranked') {
            queueId = 420;
        } // 'all' or undefined will leave queueId as null

        try {
            // If summonerName is not provided, check if user has a summoner registered
            await interaction.deferReply();
            if (!summonerName) {
                const discordUserId = interaction.user.id;
                const isRegistered = await isUserRegistered(discordUserId);
                if (!isRegistered) {
                    return interaction.reply('No summoner name provided and you do not have a summoner registered.');
                }
                summonerName = await getRegisteredSummonerName(discordUserId);
            }

            // Fetch summoner PUUID
            const summonerInfo = await getSummoner(summonerName);
            const puuid = summonerInfo.puuid;

            // Get match history

            const matchIds = await getMatches(puuid, queueId, numberOfMatches);
            matchInfo = {};

            for (let i = 0; i < matchIds.length; i++) {
                const matchId = matchIds[i];
                const matchDetails = await getMatchInfo(matchId);
                matchInfo[matchId] = await parseMatchInfo(matchDetails, puuid);
                console.log(matchInfo);
            }
            
            // Process matchIds to display match history
            // This part of the code will depend on how you want to display the match history
            await interaction.editReply(`Match history for ${summonerName}: ${matchIds.join(', ')}`);

        } catch (error) {
            console.error(error);
            await interaction.editReply('Failed to retrieve match history.');
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
