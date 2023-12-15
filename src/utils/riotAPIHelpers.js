const { RiotAPI } = require("@fightmegg/riot-api");

const rAPI = new RiotAPI(process.env.RIOT_API_KEY);

function queueIdToString(queueId) {
  switch (queueId) {
    case 400:
      return "norms";
    case 420:
      return "ranked";
    default:
      return "all";
  }
}

async function getAccountByRiotId(gameName, tagLine) {
  try {
    console.log("searching for: " + gameName + " #" + tagLine);
    const account = await rAPI.account.getByRiotId({
      region: "ASIA",
      gameName: gameName,
      tagLine: tagLine,
    });
    return account;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch account information.");
  }
}

async function getSummonerByPuuid(puuid) {
  try {
    const summoner = await rAPI.summoner.getByPUUID({
      region: "OC1",
      puuid: puuid,
    });
    return summoner;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch summoner information.");
  }
}

async function getEntriesBySummonerId(id) {
  try {
    const entries = await rAPI.league.getEntriesBySummonerId({
      region: "OC1",
      summonerId: id,
    });
    return entries;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch league entries.");
  }
}

async function getMatches(puuid, queue = null, numberOfMatches = 20) {
  try {
    const matchIds = await rAPI.matchV5.getIdsByPuuid({
      cluster: "SEA",
      puuid,
      params: {
        queue,
        count: numberOfMatches,
      },
    });
    return matchIds;
  } catch (error) {
    console.error("Failed to fetch matches:", error);
    throw error;
  }
}

async function getMatchInfo(matchId) {
  try {
    const matchInfo = await rAPI.matchV5.getMatchById({
      cluster: "SEA",
      matchId,
    });
    return matchInfo;
  } catch (error) {
    console.error("Failed to fetch match information:", error);
    throw new Error("Failed to fetch match information.");
  }
}

async function parseMatchInfo(matchInfo, puuid) {
  participants = matchInfo["metadata"]["participants"];
  let participantIndex;
  for (let i = 0; i < participants.length; i++) {
    if (participants[i] === puuid) {
      participantIndex = i;
    }
  }
  const basicInfo = parseBasicMatchInfo(matchInfo["info"]);
  console.log(basicInfo);

  const playerInfo = parsePlayerInfo(matchInfo, participantIndex);
  console.log(playerInfo);

  const teamInfo = parseTeamInfo(matchInfo);
  console.log(teamInfo);

  return {
    basicInfo: basicInfo,
    playerInfo: playerInfo,
    teamInfo: teamInfo,
  };
}

function parseBasicMatchInfo(gameInfo) {
  const gameMode = gameInfo["gameMode"];
  const gameDuration = gameInfo["gameDuration"];
  const gameStartTimestamp = gameInfo["gameStartTimestamp"];
  const queueid = gameInfo["queueId"];
  let date = new Date(gameStartTimestamp).toLocaleDateString("en-AU");
  let dateObj = new Date(gameStartTimestamp * 1000);
  let utcString = dateObj.toUTCString();
  let gameStartTime = utcString.slice(-11, -4);
  let gameStartDateTime = date + " " + gameStartTime;
  return {
    gameMode: gameMode,
    gameDuration: gameDuration,
    gameStartTimestamp: gameStartDateTime,
    queueid: queueIdToString(queueid),
  };
}

function parsePlayerInfo(matchInfo, participantIndex) {
  const champion =
    matchInfo["info"]["participants"][participantIndex]["championName"];
  const win = matchInfo["info"]["participants"][participantIndex]["win"];
  const gameName =
    matchInfo["info"]["participants"][participantIndex]["riotIdGameName"];
  const tagLine =
    matchInfo["info"]["participants"][participantIndex]["riotIdTagline"];
  const kills = matchInfo["info"]["participants"][participantIndex]["kills"];
  const assists =
    matchInfo["info"]["participants"][participantIndex]["assists"];
  const deaths = matchInfo["info"]["participants"][participantIndex]["deaths"];
  const position =
    matchInfo["info"]["participants"][participantIndex]["teamPosition"];
  const cs =
    matchInfo["info"]["participants"][participantIndex]["totalMinionsKilled"] +
    matchInfo["info"]["participants"][participantIndex]["neutralMinionsKilled"];
  return {
    champion: champion,
    position: position,
    win: win,
    gameName: gameName,
    tagLine: tagLine,
    kills: kills,
    assists: assists,
    deaths: deaths,
    cs: cs,
  };
}

function parseTeamInfo(matchInfo) {
  const teams = matchInfo["info"]["teams"];
  const blueTeam = teams[0];
  const redTeam = teams[1];
  const blueTeamBans = blueTeam["bans"];
  const blueTeamObjectives = blueTeam["objectives"];
  const redTeamBans = redTeam["bans"];
  const redTeamObjectives = redTeam["objectives"];
  return {
    blueTeamBans: blueTeamBans,
    blueTeamObjectives: blueTeamObjectives,
    redTeamBans: redTeamBans,
    redTeamObjectives: redTeamObjectives,
  };
}

module.exports = {
  getMatches,
  getMatchInfo,
  parseMatchInfo,
  getAccountByRiotId,
  getSummonerByPuuid,
  getEntriesBySummonerId,
};
