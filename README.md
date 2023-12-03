# LeagueBot for Discord

LeagueBot is a Discord bot designed to interact with the League of Legends API. It allows users to register their League of Legends summoner name with their Discord account, check summoner information, and unregister their summoner name.

## Features

- **Register Summoner**: Link a League of Legends summoner name to your Discord account.
- **Check Summoner**: Retrieve and display information about the linked summoner.
- **Unregister Summoner**: Remove the link between your Discord account and your summoner name.

## Installation

To set up LeagueBot for your Discord server, follow these steps:

1. **Set up your discord bot**

Follow the instructions on this page: https://discord.com/developers/docs/getting-started


2. **Clone the Repository**
   ```bash
   git clone https://github.com/taeyeong2k/leaguebot.git
   cd leaguebot

3. Install Dependencies
   ```bash
   npm install

4. Environment Variables

   Create a .env file in the root directory and add the following:
   ```bash
   DISCORD_BOT_TOKEN=your_discord_bot_token
   RIOT_API_KEY=your_riot_api_key

5. Starting the Bot
   ```bash
   npm start

## Usage

After inviting the bot to your Discord server, you can use the following commands:

- /getsummoner [name]: Get information about a specific summoner.
- /registersummoner [name]: Register your summoner name with your Discord account.
- /unregistersummoner: Unregister your summoner name from your Discord account.
- /checksummoner: Check if you have a summoner name registered.
