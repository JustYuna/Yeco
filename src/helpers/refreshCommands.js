const { Routes } = require('discord-api-types/v10');
const commands = require('../stats/commands');

async function refreshCommands(restClient, clientID) {
    if (!restClient || typeof restClient.put !== 'function') {
        console.error('❌ Error: The restClient passed does not have a .put() method.');
        return;
    }

    try {
        console.log('Refreshing application (/) commands...');

        const formatted = commands.map(cmd => ({
            ...cmd,
            // 1. dm_permission: true allows the bot to work in its own DMs with a user
            dm_permission: true, 
            
            // 2. integration_types: [0, 1] 
            // 0: GUILD_INSTALL (Bot is in the server)
            // 1: USER_INSTALL (Bot is "followed" by the user and works everywhere)
            integration_types: [0, 1],

            // 3. contexts: [0, 1, 2]
            // 0: Guild (Servers)
            // 1: Bot DM (Direct message with the bot)
            // 2: Private Channel (DMs between users and Group DMs)
            contexts: [0, 1, 2]
        }));

        await restClient.put(
            Routes.applicationCommands(clientID),
            { body: formatted }
        );

        console.log(`✅ Successfully replaced ${commands.length} commands with DM/User support.`);
    } catch (err) {
        console.error('Error refreshing commands:', err);
    }
}

module.exports = refreshCommands;