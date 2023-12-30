const {
  getAccountByRiotId,
  getSummonerByPuuid,
} = require("../../utils/riotAPIHelpers");
const { isUserRegistered } = require("../../utils/summonerHelpers");
const {
  readPlayerList,
  writePlayerList,
} = require("../../utils/jsonFileHandler");

module.exports = {
  data: {
    name: "register",
    description: "Register your Riot ID",
    options: [
      {
        name: "name",
        type: 3, // Integer representing 'STRING' type in Discord API
        description: "Riot ID Name",
        required: true,
      },
      {
        name: "tagline",
        type: 3,
        description: "Riot ID Tagline",
        required: true,
      },
    ],
  },

  run: async ({ interaction, client }) => {
    const gameName = interaction.options.getString("name");
    let tagLine = interaction.options.getString("tagline");
    const discordUserId = interaction.user.id; // Get the Discord user ID

    try {
      if (tagLine.startsWith("#")) {
        tagLine = tagLine.substring(1);
      }

      // Check if this Discord user has already registered a summoner
      const account = await getAccountByRiotId(gameName, tagLine);
      console.log(account);

      // Get summoner information using SUMMONER-V4 endpoint
      const summonerInfo = await getSummonerByPuuid(account.puuid);
      let data = await readPlayerList();

      // Add specific summoner details to the list with Discord user ID as key
      data[discordUserId] = {
        puuid: account.puuid,
        gameName: account.gameName,
        tagLine: account.tagLine,
        id: summonerInfo.id,
      };

      await writePlayerList(data);

      interaction.reply(
        `Registered Riot ID: ${account.gameName} #${account.tagLine}`,
      );
    } catch (error) {
      console.error(error);
      interaction.reply("Failed to register Riot ID.");
    }
  },

  options: {
    devOnly: false,
    guildOnly: false,
    userPermissions: ["Administrator", "AddReactions"],
    botPermissions: ["Administrator", "AddReactions"],
    deleted: false,
  },
};
