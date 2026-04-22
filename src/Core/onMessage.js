const { 
    GetTotalUserCount, 
    CreateBackup, 
    LoadBackup, 
    AddToAsync, 
    GetGlobalAsync, 
    GetTotalInCirculation 
} = require("../DataStorage/Datastore");

const CacheMaid = require("../Utils/CacheMaid")
const refreshCommands = require('../helpers/refreshCommands');
const colors = require('../stats/colors');
const Config = require("../Core/config");
const { EmbedBuilder } = require("discord.js");

const commandsMap = {
    give: async (message, args) => {
        const [targetId, rawValue, rawAmount] = args;
        const valueName = rawValue?.toUpperCase();
        const valueAmount = parseInt(rawAmount);

        if (!targetId || !valueName || isNaN(valueAmount)) 
            return message.reply(`${emojis.UI_Warn} Usage: \`!bot give <userID> <ValueName> <ValueAmount>\``);

        try {
            await AddToAsync(targetId, { [valueName]: valueAmount });
            await sendEmbed(message, 'Data Granted', `${emojis.UI_Plus} Gave **${valueAmount} ${valueName}** to <@${targetId}>`, colors.green);
        } catch (err) {
            await sendEmbed(message, 'Error', `${emojis.UI_Warn} Failed to give data: ${err.message}`, colors.red);
        }
    },

    remove: async (message, args) => {
        const [targetId, rawValue, rawAmount] = args;
        const valueName = rawValue?.toUpperCase();
        const valueAmount = parseInt(rawAmount);

        if (!targetId || !valueName || isNaN(valueAmount)) 
            return message.reply(`${emojis.UI_Warn} Usage: \`!bot remove <userID> <ValueName> <ValueAmount>\``);

        try {
            await AddToAsync(targetId, { [valueName]: -valueAmount });
            await sendEmbed(message, 'Data Removed', `${emojis.UI_Minus} Removed **${valueAmount} ${valueName}** from <@${targetId}>`, colors.green);
        } catch (err) {
            await sendEmbed(message, 'Error', `${emojis.UI_Warn} Failed to remove data: ${err.message}`, colors.red);
        }
    },

    backup: async (message, args) => {
        const backupName = args[0];
        if (!backupName) return sendEmbed(message, 'Error', `${emojis.UI_Warn} Please provide a backup name.`, colors.red);

        try {
            await CreateBackup(backupName);
            await sendEmbed(message, 'Backup Created', `${emojis.UI_Plus} Backup saved as \`${backupName}.db\``, colors.green);
        } catch (err) {
            await sendEmbed(message, 'Error', `${emojis.UI_Warn} Failed to create backup: ${err.message}`, colors.red);
        }
    },

    restore: async (message, args) => {
        const backupName = args[0];
        if (!backupName) return sendEmbed(message, 'Error', `${emojis.UI_Warn} Please provide the backup name to restore.`, colors.red);

        try {
            await LoadBackup(backupName);
            await sendEmbed(message, 'Backup Restored', `${emojis.UI_Plus} Backup \`${backupName}.db\` successfully loaded!`, colors.green);
        } catch (err) {
            await sendEmbed(message, 'Error', `${emojis.UI_Warn} Failed to load backup: ${err.message}`, colors.red);
        }
    },

    restart: async (message) => {
        await sendEmbed(message, 'Restarting...', 'Bot is restarting now!', colors.orange);
        await message.client.destroy();
        process.exit(0);
    },

    // Updated to destructure the context object
    refresh: async (message, args, { restClient, clientID }) => {
        await sendEmbed(message, 'Refreshing...', 'Reloading application (/) commands...', colors.blue);
        // restClient.put will now work because we are passing the correct object
        await refreshCommands(restClient, clientID);
        await sendEmbed(message, 'Refreshed!', '✅ Successfully reloaded application (/) commands.', colors.green);
    },

    stats: async (message) => {
        const os = require("os");

        const MemoryUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
        const HeapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const HeapTotal = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);

        const TotalUsers = await GetTotalUserCount() || 0;
        const CommandsUsedTotal = await GetGlobalAsync("COMMANDS_USED") || 0;

        const botEntry = CacheMaid.get("bot");
        const botStats = botEntry?.map;

        const CommandsUsedSinceUpdate = botStats?.get("commandsSinceStartup") || 0;
        const singleUsages = botStats?.get("singleUsages") || new Map();
        const startTime = botStats?.get("startTime") || Date.now();

        const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

        // 🧠 System stats (important for Pi)
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(0);
        const freeMem = (os.freemem() / 1024 / 1024).toFixed(0);

        const load = os.loadavg(); // 1m, 5m, 15m

        // 🌐 Discord runtime stats
        const guildCount = message.client.guilds.cache.size;
        const ping = message.client.ws.ping;

        // 🧾 Command usage list
        let usageList = '';
        for (const [cmd, count] of singleUsages.entries()) {
            usageList += `\`${cmd}\`: ${count}\n`;
        }
        if (!usageList) usageList = 'No commands used yet.';

        const embed = new EmbedBuilder()
            .setColor(colors.green)
            .setTitle('Bot Statistics (Live Server View)')
            .addFields(
                { name: '👥 Users', value: `${TotalUsers}`, inline: true },
                { name: '🌍 Guilds', value: `${guildCount}`, inline: true },
                { name: '📡 Ping', value: `${ping}ms`, inline: true },

                { name: '💾 RAM (Bot)', value: `${MemoryUsage} MB`, inline: true },
                { name: '🧠 Heap Used', value: `${HeapUsed} MB`, inline: true },
                { name: '📦 Heap Total', value: `${HeapTotal} MB`, inline: true },

                { name: '🖥 System RAM', value: `${freeMem} MB free / ${totalMem} MB total`, inline: false },
                { name: '📊 Load Avg', value: `${load[0].toFixed(2)} / ${load[1].toFixed(2)} / ${load[2].toFixed(2)}`, inline: false },

                { name: '⏱ Uptime', value: `${uptimeSeconds}s`, inline: true },
                { name: '👑 Total Commands', value: `${CommandsUsedTotal}`, inline: true },
                { name: '⚡ Session Commands', value: `${CommandsUsedSinceUpdate}`, inline: true },

                { name: '📝 Usage by Command', value: usageList, inline: false }
            );

        await message.reply({ embeds: [embed] });
    },

    test: async (message, args) => {
        const os = require("os");
        const start = Date.now();

        // 🌐 Ping check (roundtrip)
        const tempMsg = await message.reply("🏓 Testing...");
        const roundtrip = Date.now() - start;

        // 📡 WS Ping
        const wsPing = message.client.ws.ping;

        // 💾 Memory
        const mem = process.memoryUsage();
        const rss = (mem.rss / 1024 / 1024).toFixed(2);
        const heapUsed = (mem.heapUsed / 1024 / 1024).toFixed(2);
        const heapTotal = (mem.heapTotal / 1024 / 1024).toFixed(2);

        // 🖥 System
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(0);
        const freeMem = (os.freemem() / 1024 / 1024).toFixed(0);
        const load = os.loadavg();

        // 🧵 CPU info
        const cpu = os.cpus()[0]?.model || "Unknown CPU";

        const embed = new EmbedBuilder()
            .setColor(colors.blue)
            .setTitle("🧪 Dev Diagnostics")
            .addFields(
                { name: "📡 Ping", value: `WS: **${wsPing}ms**\nRTT: **${roundtrip}ms**`, inline: true },
                { name: "💾 Memory", value: `RSS: **${rss} MB**\nHeap: **${heapUsed}/${heapTotal} MB**`, inline: true },
                { name: "🖥 System", value: `Free: **${freeMem} MB**\nTotal: **${totalMem} MB**`, inline: true },
                { name: "📊 Load", value: `${load[0].toFixed(2)} / ${load[1].toFixed(2)} / ${load[2].toFixed(2)}`, inline: false },
                { name: "🧠 CPU", value: cpu, inline: false }
            );

        // --- FIXED EMOJI LOGIC ---
        const emojiEntries = Object.entries(Config.CORE.EMOJIS || {});
        if (emojiEntries.length > 0) {
            let currentFieldText = "";
            let fieldCount = 1;

            for (const [key, value] of emojiEntries) {
                const ok = typeof value === "string" && value.includes(":");
                const line = `${ok ? "✅" : "❌"} **${key}** → ${ok ? value : "INVALID"}\n`;

                // If adding this line exceeds 1000 chars, push the field and start a new one
                if (currentFieldText.length + line.length > 1000) {
                    embed.addFields({ name: `😀 Emojis (Part ${fieldCount})`, value: currentFieldText });
                    currentFieldText = line;
                    fieldCount++;
                } else {
                    currentFieldText += line;
                }
            }
            // Add the last remaining emojis
            embed.addFields({ name: fieldCount > 1 ? `😀 Emojis (Part ${fieldCount})` : "😀 Emoji Check", value: currentFieldText });
        } else {
            embed.addFields({ name: "😀 Emoji Check", value: "No emojis found" });
        }
        // -------------------------

        const cacheSize = CacheMaid?.store?.size || "Unknown";
        const theme = Config?.CORE?.THEMES?.ACTIVE || "Unknown";

        embed.addFields(
            { name: "📦 Cache", value: `Entries: **${cacheSize}**`, inline: true },
            { name: "🎨 Active Theme", value: `**${theme}**`, inline: true }
        )
        .setFooter({ text: "Dev Mode • Live Diagnostics" });

        await tempMsg.edit({ content: null, embeds: [embed] });
    },

    config: async (message, args) => {
        // Determine which part of the config to show
        let current = Config;
        if (args.length) {
            for (const key of args) {
                const upperKey = key.toUpperCase();
                if (current[upperKey]) current = current[upperKey];
                else {
                    return message.reply(`❌ Config path "${args.join(' ')}" not found.`);
                }
            }
        }

        // Serialize, converting functions to strings
        const jsonString = JSON.stringify(current, (key, value) => {
            if (typeof value === "function") return value.toString();
            return value;
        }, 2);

        const chunkSize = 1000; // max characters per embed description
        const chunks = [];
        for (let i = 0; i < jsonString.length; i += chunkSize) {
            chunks.push(jsonString.slice(i, i + chunkSize));
        }

        for (let i = 0; i < chunks.length; i++) {
            const embed = new EmbedBuilder()
                .setColor(i === 0 ? colors.blue : colors.darkSlateGray)
                .setTitle(i === 0 ? `Bot Config` : `Bot Config (Part ${i + 1})`)
                .setDescription(`\`\`\`json\n${chunks[i]}\n\`\`\``);

            await message.reply({ embeds: [embed] });
        }
    },

    help: async (message) => {
        const embed = new EmbedBuilder()
            .setColor(colors.blue)
            .setTitle('🛠 Admin Commands Help')
            .setDescription('Below are the admin commands you can use with `!bot`.')
            .addFields(
                { name: '`!bot give <userID> <ValueName> <ValueAmount>`', value: 'Give a user a specific value.', inline: false },
                { name: '`!bot remove <userID> <ValueName> <ValueAmount>`', value: 'Remove a specific value from a user.', inline: false },
                { name: '`!bot restart`', value: 'Restart the bot safely.', inline: false },
                { name: '`!bot refresh`', value: 'Reload all slash (/) commands.', inline: false },
                { name: '`!bot stats`', value: 'Show bot statistics (RAM, total users).', inline: false },
                { name: '`!bot test`', value: 'Returns test results for a couple of things...', inline: false },
                { name: '`!bot backup <name>`', value: 'Create a backup of the database.', inline: false },
                { name: '`!bot restore <name>`', value: 'Restore a backup by name.', inline: false },
                { name: '`!bot config <path>`', value: 'Show the bots config file.', inline: false },
                { name: '`!bot help`', value: 'Show this help message.', inline: false },
            );

        await message.reply({ embeds: [embed] });
    }
};

async function sendEmbed(message, title, description, color) {
    const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description);
    await message.reply({ embeds: [embed] });
}

async function onMessage(message, data) {
    if (!message.content.startsWith('!bot') || message.author.bot) return;

    const args = message.content.slice('!bot'.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (message.author.id !== data.ownerID) {
        return message.reply('This command is for staff only!');
    }

    const commandAction = commandsMap[commandName];
    if (!commandAction) return message.reply(`${emojis.UI_Warn} Command not found, try !bot help.`);

    try {
        await commandAction(message, args, { 
            client: data.client, 
            restClient: data.restClient, 
            clientID: data.clientID 
        });
    } catch (err) {
        console.error(`Error executing command ${commandName}:`, err);
        message.reply("An error occurred while processing the command.").catch(() => {});
    }
}

module.exports = onMessage;