const {
  readPlayerList,
  writePlayerList,
} = require("../../utils/jsonFileHandler");
const { isUserRegistered } = require("../../utils/summonerHelpers");

module.exports = {
  data: {
    name: "unregister",
    description: "Unregister your Riot ID",
  },

  run: async ({ interaction, client }) => {
    const discordUserId = interaction.user.id; // Get the Discord user ID

    try {
      // Check if this Discord user has a summoner registered
      const isRegistered = await isUserRegistered(discordUserId);
      if (!isRegistered) {
        return interaction.reply("You do not have a summoner registered.");
      }

      let data = await readPlayerList();

      // Remove the user's entry
      delete data[discordUserId];
      await writePlayerList(data);

      interaction.reply("Your Riot ID has been removed.");
    } catch (error) {
      console.error(error);
      interaction.reply("Failed to unregister Riot ID.");
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
