const { readPlayerList } = require("./jsonFileHandler");

async function isUserRegistered(discordUserId) {
  const data = await readPlayerList();
  return !!data[discordUserId];
}
async function getRegisteredRiotId(discordUserId) {
  const data = await readPlayerList();
  if (data[discordUserId]) {
    const { gameName, tagLine, puuid, id } = data[discordUserId];
    return { gameName, tagLine, puuid, id };
  }
  return { gameName: null, tagLine: null, puuid: null, id: null };
}

module.exports = { isUserRegistered, getRegisteredRiotId };
