const { readPlayerList } = require('./jsonFileHandler');

async function isUserRegistered(discordUserId) {
    const data = await readPlayerList();
    return !!data[discordUserId];
}
async function getRegisteredSummonerName(discordUserId) {
    const data = await readPlayerList();
    return data[discordUserId] ? data[discordUserId].name : null;
}

module.exports = { isUserRegistered, getRegisteredSummonerName };

