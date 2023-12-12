const path = require('path');
require('dotenv').config();
const { getLatestVersion, getChampionByName, getAllChampions, getChampionById } = require('../utils/datadragonHelper');

async function main() {
    const champions = await getAllChampions();
    const rakan = await getChampionById(497);
    console.log(rakan);
}

main();
