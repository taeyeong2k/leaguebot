const { getSummonerByPuuid, getAccountByRiotId, getEntriesBySummonerId } = require("../../utils/riotAPIHelpers");
const { isUserRegistered, getRegisteredRiotId } = require("../../utils/summonerHelpers");

module.exports = {
    data: {
        name: "getrank",
        description: "Check the rank of a summoner",
        options: [
            {
                name: "gamename",
                type: 3,
                description: "Riot ID Name",
                required: false,
            },
            {
                name: "tagline",
                type: 3,
                description: "Riot ID Tagline",
                required: false,
            },
        ],
    },
    run: async ({ interaction, client }) => {
        const gameNameInput = interaction.options.getString('gamename');
        const tagLineInput = interaction.options.getString('tagline');
        try {
            await interaction.deferReply();
            let id;
            if (!gameNameInput || !tagLineInput) {
                const discordUserId = interaction.user.id;
                if (!await isUserRegistered(discordUserId)) {
                    return interaction.editReply('No Riot ID provided, and you are not registered.');
                }

                const registered = await getRegisteredRiotId(discordUserId);
                id = registered.id; // Use the stored id
                console.log("Found id", id);
            } else {
                // If gameName and tagLine are provided, use them to fetch the account and get the puuid
                const account = await getAccountByRiotId(gameNameInput, tagLineInput);
                const summoner = await getSummonerByPuuid(account.puuid);
                id = summoner.id;
            }

        // Get rank information using LEAGUE-V4 endpoint
        const rankInfo = await getEntriesBySummonerId(id);
        console.log("Rank", rankInfo);
        let rankedSolo = {}; 
        for (let i = 0; i < rankInfo.length; i++) {
            if (rankInfo[i].queueType === "RANKED_SOLO_5x5") {
                rankedSolo = rankInfo[i];
            }
        }
        console.log("Ranked Solo", rankedSolo);
        await interaction.editReply("Rank: " + rankedSolo.tier + " " + rankedSolo.rank + " " + rankedSolo.leaguePoints + " LP")
        } catch (error) {
            console.error(error);
            await interaction.editReply("Failed to retrieve rank.");
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