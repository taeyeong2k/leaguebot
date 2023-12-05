const { readPlayerList } = require('./jsonFileHandler');

async function isUserRegistered(discordUserId) {
    const data = await readPlayerList();
    return !!data[discordUserId];
}
async function getRegisteredRiotId(discordUserId) {
    const data = await readPlayerList();
    if (data[discordUserId]) {
        const { gameName, tagLine, puuid } = data[discordUserId];
        return { gameName, tagLine, puuid };
    }
    return { gameName: null, tagLine: null, puuid: null };
}


module.exports = { isUserRegistered, getRegisteredRiotId };

