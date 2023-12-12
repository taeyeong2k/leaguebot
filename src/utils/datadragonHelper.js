const { RiotAPI, DDragon } = require('@fightmegg/riot-api');

const rAPI = new RiotAPI(process.env.RIOT_API_KEY);
const ddragon = new DDragon();
async function getLatestVersion () {
    try {
        const version = await ddragon.versions.latest();
        return version;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch latest version.');
    }
}


module.exports = { getLatestVersion };