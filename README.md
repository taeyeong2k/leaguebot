# LeagueBot for Discord

LeagueBot is a Discord bot designed to interact with the League of Legends API. It allows users to register their Riot ID with their Discord account, check summoner information, check match history, and more.

## Features

- **Register Riot ID**: Link a Riot ID to your Discord account.
- **Check Riot ID**: Retrieve and display information about the linked summoner.
- **Unregister**: Remove the link between your Discord account and your Riot ID.
- **Check Match History**: Retrieve a player's match history and display it. 

## Installation

To set up LeagueBot for your Discord server, follow these steps:

**Prerequisites**


1. **Set up your discord bot**

Follow the instructions on this page: https://discord.com/developers/docs/getting-started

2. **Sign up for Riot's developer portal and get your development api key**


Apply as a developer at https://developer.riotgames.com/ and retrieve your development api key.


**Installation**


1. **Clone the Repository**
   ```bash
   git clone https://github.com/taeyeong2k/leaguebot.git
   cd leaguebot

2. Install Dependencies
   ```bash
   npm install

3. Environment Variables

   Create a .env file in the root directory and add the following:
   ```bash
   DISCORD_BOT_TOKEN=your_discord_bot_token
   RIOT_API_KEY=your_riot_api_key

4. Starting the Bot
   ```bash
   npm start

## Usage

After inviting the bot to your Discord server, you can use the following commands:
- /register [Riot Game Name] [Tagline]: Register your Riot ID with your Discord account.
- /unregister: Unregister your Riot ID from your Discord account.
- /getMatchHistory [Game Name] [Tagline] [Queue Type] [Number of Matches]: Fetch a player's match history. All arguments are optional.
