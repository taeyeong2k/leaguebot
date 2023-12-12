const { DDragon } = require('@fightmegg/riot-api');

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

async function getChampionByName (name) {
    try {
        const version = await getLatestVersion();
        const champion = await ddragon.champion.byName({
            version: version,
            championName: name,
        });
        return champion;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch champion.');
    }
}

async function getAllChampions () {
    try {
        const version = await getLatestVersion();
        const champions = await ddragon.champion.all({
            version: version,
        });
        return champions;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch champions.');
    }
}

module.exports = { getLatestVersion, getChampionByName, getAllChampions };