const { getSummoner } = require('../../utils/riotAPIHelpers');
const { isUserRegistered } = require('../../utils/summonerHelpers');
const { readPlayerList, writePlayerList } = require('../../utils/jsonFileHandler');

module.exports = {
    data: {
        name: 'registersummoner',
        description: 'Register a League of Legends summoner to your Discord account',
        options: [{
            name: 'name',
            type: 3, // Integer representing 'STRING' type in Discord API
            description: 'The name of the summoner',
            required: true,
        }],
    },

    run: async ({ interaction, client }) => {
        const summonerName = interaction.options.getString('name');
        const discordUserId = interaction.user.id; // Get the Discord user ID

        try {
            // Check if this Discord user has already registered a summoner
            const isRegistered = await isUserRegistered(discordUserId);
            if (isRegistered) {
                return interaction.reply('You have already registered a summoner.');
            }

            // Fetch summoner information
            const summoner = await getSummoner(summonerName);
            console.log(summoner);

            // Read the existing data
            let data = await readPlayerList();

            // Add specific summoner details to the list with Discord user ID as key
            data[discordUserId] = {
                id: summoner.id,
                accountId: summoner.accountId,
                puuid: summoner.puuid,
                name: summoner.name
            };

            // Write the updated data back to the JSON file
            await writePlayerList(data);

            interaction.reply(`Registered Summoner: ${summoner.name}`);
        } catch (error) {
            console.error(error);
            interaction.reply('Failed to register summoner.');
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
