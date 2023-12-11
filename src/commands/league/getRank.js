const { getSummonerByPuuid } = requre("../../utils/riotAPIHelpers");
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
    },

    options: {
        devOnly: false,
        guildOnly: false,
        userPermissions: ['Administrator', 'AddReactions'],
        botPermissions: ['Administrator', 'AddReactions'],
        deleted: false,
    },
};