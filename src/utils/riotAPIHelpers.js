const { RiotAPI, RiotAPITypes, PlatformId } = require('@fightmegg/riot-api');

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
        const account = await rAPI.account.getByRiotId({
            region: "ASIA",
            gameName: gameName,
            tagLine: tagLine,
        });
        return account;
    }
    catch (error) {
        console.error(error);
        throw new Error('Failed to fetch account information.');
    }
}

async function getMatches(puuid, queue = null, numberOfMatches = 20) {
    try {
        const matchIds = await rAPI.matchV5.getIdsByPuuid({
            cluster: 'SEA', 
            puuid,
            params: {
                queue, 
                count: numberOfMatches
            }
        });
        return matchIds;
    } catch (error) {
        console.error('Failed to fetch matches:', error);
        throw error;
    }
}

async function getMatchInfo(matchId) {
    try {
        const matchInfo = await rAPI.matchV5.getMatchById({
            cluster: 'SEA',
            matchId
        });
        return matchInfo;
    } catch (error) {
        console.error('Failed to fetch match information:', error);
        throw new Error('Failed to fetch match information.');
    }
}

async function parseMatchInfo(matchInfo, puuid) {
    participants = matchInfo['metadata']['participants'];
    let participantIndex;
    for (let i = 0; i < participants.length; i++) {
        if (participants[i] === puuid) {
            participantIndex = i;
        }
    }
    const gameInfo = matchInfo['info'];
    const gameMode = gameInfo['gameMode'];
    const gameDuration = gameInfo['gameDuration'];
    const gameStartTimestamp = gameInfo['gameStartTimestamp'];
    const queueid = gameInfo['queueId'];
    console.log("gameMode: " + gameMode);
    console.log("gameDuration: " + gameDuration);
    let date = new Date(gameStartTimestamp).toLocaleDateString("en-AU");
    let dateObj = new Date(gameStartTimestamp * 1000);
    let utcString = dateObj.toUTCString();
    let gameStartTime = utcString.slice(-11, -4);
    let gameStartDateTime = date + " " + gameStartTime;
    console.log("gameStartTimestamp: " + gameStartDateTime);
    console.log("queueid: " + queueIdToString(queueid));
    // console.log(matchInfo['info']['participants'][participantIndex]);
    const champion = matchInfo['info']['participants'][participantIndex]['championName'];
    const win = matchInfo['info']['participants'][participantIndex]['win'];
    const gameName = matchInfo['info']['participants'][participantIndex]['riotIdGameName'];
    const tagLine = matchInfo['info']['participants'][participantIndex]['riotIdTagline'];
    const kills = matchInfo['info']['participants'][participantIndex]['kills'];
    const assists = matchInfo['info']['participants'][participantIndex]['assists'];
    const deaths = matchInfo['info']['participants'][participantIndex]['deaths'];
    console.log("champion: " + champion);
    console.log("win: " + win);
    console.log("gameName: " + gameName);
    console.log("tagLine: " + tagLine);
    console.log("kills: " + kills);
    console.log("assists: " + assists);
    console.log("deaths: " + deaths);
    

};

module.exports = { getMatches, getMatchInfo, parseMatchInfo, getAccountByRiotId };