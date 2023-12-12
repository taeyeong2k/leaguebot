const { RiotAPI } = require('@fightmegg/riot-api');

const rAPI = new RiotAPI(process.env.RIOT_API_KEY);

async function getLatestVersion () {
    try {
        const version = await rAPI.DDragon.versions();
        return version;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch latest version.');
    }
}

module.exports = { getLatestVersion };