const path = require('path');
require('dotenv').config();
const { getLatestVersion, getChampionByName, getAllChampions } = require('../utils/datadragonHelper');

async function main() {
    const version = await getLatestVersion();
    console.log(version);
    const champion = await getChampionByName('Aatrox');
    console.log(champion);
    const champions = await getAllChampions();
    console.log(champions);
}

main();
