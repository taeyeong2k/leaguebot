const path = require('path');
require('dotenv').config();
const { getLatestVersion } = require('../utils/datadragonHelper');
async function main() {
    const version = await getLatestVersion();
    console.log(version);
}

main();
