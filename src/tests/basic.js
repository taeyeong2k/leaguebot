const { getLatestVersion, getChampionByName, getAllChampions, getChampionById } = require('../utils/datadragonHelper');

async function main() {
    const rakan = await getChampionById(497);
    console.log(rakan);
}

main();
