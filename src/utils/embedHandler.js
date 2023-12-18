const { EmbedBuilder } = require("discord.js");

function createEmbedFromMatchInfo(matchInfo, matchId) {
  const embed = new EmbedBuilder();

  // Basic Info
  const { basicInfo, playerInfo, teamInfo } = matchInfo[matchId];
  console.log("Match info: ", matchInfo);
  console.log("Basic info: ", basicInfo);
  console.log("Player info: ", playerInfo);
  console.log("Team info: ", teamInfo);
  const gameMode = basicInfo.gameMode;
  const duration = new Date(basicInfo.gameDuration * 1000)
    .toISOString()
    .substr(11, 8); // Convert seconds to HH:MM:SS format
  const startTime = basicInfo.gameStartTimestamp;
  const queueId = basicInfo.queueid;

  // Player Info
  const {
    champion,
    position,
    win,
    gameName,
    tagLine,
    kills,
    assists,
    deaths,
    cs,
  } = playerInfo;
  const result = win ? "Victory" : "Defeat";

  embed.setTitle(`Match History: ${gameName}#${tagLine}`);
  embed.setColor("#0099ff");
  embed.setDescription(
    `**Game Mode:** ${gameMode}\n**Duration:** ${duration}\n**Start Time:** ${startTime}\n**Queue Type:** ${queueId}`,
  );
  embed.addFields(
    {
      name: "Player Info",
      value: `**Champion:** ${champion}\n**Position:** ${position}\n**Result:** ${result}`,
      inline: true,
    },
    {
      name: "KDA",
      value: `**Kills:** ${kills}\n**Assists:** ${assists}\n**Deaths:** ${deaths}`,
      inline: true,
    },
    { name: "CS", value: `${cs}`, inline: true },
  );

  return embed;
}

function createRankEmbed(rankInfo) {
  const embed = new EmbedBuilder();

  const queueType = rankInfo.queueType;
  const tier = rankInfo.tier;
  const rank = rankInfo.rank;
  const lp = rankInfo.leaguePoints;
  const wins = rankInfo.wins;
  const losses = rankInfo.losses;
  const winrate = Math.round((wins / (wins + losses)) * 100);
  const hotStreak = rankInfo.hotStreak;

  embed.setTitle("Rank Information");
  embed.setColor("#0099ff");
  embed.setDescription(
    `**Queue Type:** ${queueType}\n**Rank:** ${tier} ${rank} ${lp} LP\n**Wins:** ${wins}\n**Losses:** ${losses}\n**Winrate:** ${winrate}%`,
  );
  return embed;
}

module.exports = { createEmbedFromMatchInfo, createRankEmbed };
