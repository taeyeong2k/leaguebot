const { EmbedBuilder } = require("discord.js");


function createEmbedFromMatchInfo(matchInfo) {
    const embed = new EmbedBuilder();
    embed.setTitle("Match History");
    embed.setColor("#0099ff");
    embed.setDescription("Match History");
    return embed;
};

module.exports = { createEmbedFromMatchInfo };
