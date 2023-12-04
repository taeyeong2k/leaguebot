const { RiotAPI, RiotAPITypes, PlatformId } = require('@fightmegg/riot-api');

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
    console.log(matchInfo['info']['participants'][0]);
};

module.exports = { getSummoner, getMatches, getMatchInfo, parseMatchInfo };