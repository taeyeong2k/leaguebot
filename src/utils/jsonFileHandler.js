const fs = require("fs").promises;
const path = require("path");
const filePath = path.join(__dirname, "../playerlist.json"); // Adjust the path accordingly

async function readPlayerList() {
  try {
    let data = await fs.readFile(filePath, "utf8");
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error reading player list:", error);
    throw new Error("Failed to read player list.");
  }
}

async function writePlayerList(data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing player list:", error);
    throw new Error("Failed to write player list.");
  }
}

async function loadChampions() {
  try {
    const champions = await fs.readFile(
      path.join(__dirname, "../champions.json"),
      "utf8",
    );
    return JSON.parse(champions);
  } catch (error) {
    console.error("Error loading champions:", error);
    throw new Error("Failed to load champions.");
  }
}

module.exports = { readPlayerList, writePlayerList, loadChampions };
