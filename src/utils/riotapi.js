// src/riotapi.js
const { RiotAPI, PlatformId } = require('@fightmegg/riot-api');

const rAPI = new RiotAPI(process.env.RIOT_API_KEY);

async function getSummoner(summonerName) {
    try {
        const summoner = await rAPI.summoner.getBySummonerName({
            region: PlatformId.OC1,
            summonerName: summonerName,
        });
        return summoner;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch summoner information.');
    }
}

module.exports = { getSummoner };
