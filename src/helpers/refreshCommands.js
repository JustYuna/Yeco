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
            dm_permission: cmd.dm_permission ?? false
        }));

        await restClient.put(
            Routes.applicationCommands(clientID),
            { body: formatted }
        );

        console.log(`✅ Successfully replaced ${commands.length} commands.`);
    } catch (err) {
        console.error('Error refreshing commands:', err);
    }
}

module.exports = refreshCommands;