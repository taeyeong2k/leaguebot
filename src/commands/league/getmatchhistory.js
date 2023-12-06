const { getMatches, getMatchInfo, parseMatchInfo } = require('../../utils/riotAPIHelpers');
const { isUserRegistered, getRegisteredRiotId } = require('../../utils/summonerHelpers');
const {createEmbedFromMatchInfo} = require('../../utils/matchEmbeds');
module.exports = {
    data: {
        name: 'getmatchhistory',
        description: 'Get match history for a summoner',
        options: [
            {
                name: 'gamename',
                type: 3, // STRING type
                description: 'Riot Id Name',
                required: false,
            },
            {
                name: 'tagline',
                type: 3, // STRING type
                description: 'Riot Id Tagline',
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
        const gameNameInput = interaction.options.getString('gamename');
        const tagLineInput = interaction.options.getString('tagline');
        const queueTypeInput = interaction.options.getString('queue');
        const numberOfMatches = interaction.options.getInteger('matches') || 1;
        let queueId = null;

        // Map queue type input to queue ID
        if (queueTypeInput === 'norms') {
            queueId = 400;
        } else if (queueTypeInput === 'ranked') {
            queueId = 420;
        } // 'all' or undefined will leave queueId as null

        try {
            await interaction.deferReply();
            let puuid;

            if (!gameNameInput || !tagLineInput) {
                const discordUserId = interaction.user.id;
                if (!await isUserRegistered(discordUserId)) {
                    return interaction.editReply('No Riot ID provided, and you are not registered.');
                }

                const registered = await getRegisteredRiotId(discordUserId);
                puuid = registered.puuid; // Use the stored puuid
            } else {
                // If gameName and tagLine are provided, use them to fetch the account and get the puuid
                const account = await getAccountByRiotId(gameNameInput, tagLineInput);
                puuid = account.puuid;
            }

            // Get match history
            const matchIds = await getMatches(puuid, queueId, numberOfMatches);
            const matchInfo = {};

            for (let matchId of matchIds) {
                const matchDetails = await getMatchInfo(matchId);
                matchInfo[matchId] = await parseMatchInfo(matchDetails, puuid);
                // console.log(matchDetails)
            }

            const embed = createEmbedFromMatchInfo(matchInfo);
            
            // Process matchIds to display match history
            await interaction.editReply(`Match history: ${matchInfo}`);


        } catch (error) {
            console.error(error);
            await interaction.editReply('Failed to retrieve match history.');
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
