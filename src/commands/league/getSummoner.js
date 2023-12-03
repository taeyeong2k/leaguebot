const { getSummoner } = require('../../riotapi'); // Adjust the path according to your project structure

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
        try {
            const summoner = await getSummoner(summonerName);
            console.log(summoner);
            interaction.reply(`Summoner Name: ${summoner.name}, Level: ${summoner.summonerLevel}`);
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
