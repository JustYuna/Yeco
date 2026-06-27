const {
    GetTotalUserCount,
    CreateBackup,
    LoadBackup,
    AddToAsync,
    GetGlobalAsync,
    GetTotalInCirculation,
    SetAsync,
    GetAsync
} = require("../DataStorage/Datastore");

const CacheMaid = require("../Utilities/CacheMaid")
const refreshCommands = require('./Setup/RefreshCommands');
const getCommandPayload = require("./Setup/GetCommandPayload")
const ConfigManager = require("../Core/configManager");
const Config = ConfigManager.raw;
const { EmbedBuilder } = require("discord.js");

const WebhookHandler = require("../Commands/Actions/webhook");
const { removeCooldowns } = require("../Utilities/Cooldown");
const configManager = require("../Core/configManager");
const prefix = configManager.raw.CORE.SETTINGS.DEVELOPER_MODE ? configManager.raw.CORE.SETTINGS.DEVELOPER_DEV_PREFIX : configManager.raw.CORE.SETTINGS.DEVELOPER_NORMAL_PREFIX;

const commandsMap = {
    "add-data": async (message, args) => {
        const [targetId, rawValue, rawAmount] = args;
        const valueName = rawValue?.toUpperCase();
        const valueAmount = parseInt(rawAmount);

        if (!targetId || !valueName || isNaN(valueAmount))
            return message.reply(`Usage: \`${prefix} add-data <userID> <ValueName> <ValueAmount>\``);

        try {
            await AddToAsync(targetId, { [valueName]: valueAmount });
            await sendEmbed(message, 'Data Granted', `Added **${valueAmount} ${valueName}** to <@${targetId}>`, [150, 250, 150]);
        } catch (err) {
            await sendEmbed(message, 'Error', `Failed to add data: ${err.message}`, [250, 150, 150]);
        }
    },

    "set-data": async (message, args) => {
        const [targetId, rawValue, rawAmount] = args;
        const valueName = rawValue?.toUpperCase();
        const valueAmount = parseInt(rawAmount);

        if (!targetId || !valueName || isNaN(valueAmount))
            return message.reply(`Usage: \`${prefix} set-data <userID> <ValueName> <ValueAmount>\``);

        try {
            await SetAsync(targetId, { [valueName]: valueAmount });
            await sendEmbed(message, 'Data Granted', `Set **${valueAmount} ${valueName}** to <@${targetId}>`, [150, 250, 150]);
        } catch (err) {
            await sendEmbed(message, 'Error', `Failed to set data: ${err.message}`, [250, 150, 150]);
        }
    },

    "create-backup": async (message, args) => {
        const backupName = args[0];
        if (!backupName) return sendEmbed(message, 'Error', `Please provide a backup name.`, [250, 150, 150]);

        try {
            await CreateBackup(backupName);
            await sendEmbed(message, 'Backup Created', `Backup saved as \`${backupName}.db\``, [150, 250, 150]);
        } catch (err) {
            await sendEmbed(message, 'Error', `Failed to create backup: ${err.message}`, [250, 150, 150]);
        }
    },

    "restore-backup": async (message, args) => {
        const backupName = args[0];
        if (!backupName) return sendEmbed(message, 'Error', `Please provide the backup name to restore.`, [250, 150, 150]);

        try {
            await LoadBackup(backupName);
            await sendEmbed(message, 'Backup Restored', `Backup \`${backupName}.db\` successfully loaded!`, [150, 250, 150]);
        } catch (err) {
            await sendEmbed(message, 'Error', `Failed to load backup: ${err.message}`, [250, 150, 150]);
        }
    },

    restart: async (message) => {
        await sendEmbed(message, 'Restarting...', 'Bot is restarting now!', [250, 150, 150]);
        await message.client.destroy();
        process.exit(0);
    },

    "refresh-commands": async (message, args, { restClient, clientID }) => {
        await sendEmbed(message, 'Refreshing...', 'Reloading application (/) commands...', [100, 200, 250]);
        await refreshCommands(restClient, clientID);
        await sendEmbed(message, 'Refreshed!', '✅ Successfully reloaded application (/) commands.', [100, 250, 100]);
    },

    "get-command-payload": async (message, args, { restClient, clientID }) => {
        await sendEmbed(message, "~ Payload ~", "Getting payload...", [100, 200, 250]);

        const payload = await getCommandPayload(restClient, clientID);
        await sendEmbed(message, "~ Payload ~", "Payload recieved, check the terminal to find the full payload.", [100, 150, 250]);
    },

    "reset-cooldowns": async (message, args) => {
        const userID = args[0] || message.author.id;
        await removeCooldowns(userID);

        await sendEmbed( message, "Removed", `✅ Removed cooldowns for <@${userID}>`, [100, 250, 100] );
    },

    stats: async (message) => {
        const os = require("os");
        const start = Date.now();

        // 🌐 Ping check (roundtrip)
        const tempMsg = await message.reply("🏓 Gathering statistics...");
        const roundtrip = Date.now() - start;

        // 📡 WS Ping
        const wsPing = message.client.ws.ping;

        // 💾 Memory stats
        const mem = process.memoryUsage();
        const rss = (mem.rss / 1024 / 1024).toFixed(2);
        const heapUsed = (mem.heapUsed / 1024 / 1024).toFixed(2);
        const heapTotal = (mem.heapTotal / 1024 / 1024).toFixed(2);

        // 🖥 System stats
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(0);
        const freeMem = (os.freemem() / 1024 / 1024).toFixed(0);
        const load = os.loadavg();

        // 🧵 CPU info
        const cpu = os.cpus()[0]?.model || "Unknown CPU";

        // 📊 Bot stats from CacheMaid
        const TotalUsers = await GetTotalUserCount() || 0;
        const CommandsUsedTotal = await GetGlobalAsync("COMMANDS_USED") || 0;

        const Circulation_TotalEarned = await GetTotalInCirculation("TOTAL_MAIN_CURRENCY") || 0;
        const Circulation_MainCurrency = await GetTotalInCirculation("MAIN_CURRENCY") || 0;
        const Circulation_Gambled = await GetTotalInCirculation("GAMBLED") || 0;

        const botEntry = CacheMaid.get("bot");
        const botStats = botEntry?.map;

        const CommandsUsedSinceUpdate = botStats?.get("commandsSinceStartup") || 0;
        const singleUsages = botStats?.get("singleUsages") || new Map();
        const startTime = botStats?.get("startTime") || Date.now();

        const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
        const uptimeHours = Math.floor(uptimeSeconds / 3600);
        const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60);
        const uptimeDays = Math.floor(uptimeHours / 24);

        let uptimeString = "";
        if (uptimeDays > 0) uptimeString += `${uptimeDays}d `;
        if (uptimeHours % 24 > 0) uptimeString += `${uptimeHours % 24}h `;
        if (uptimeMinutes > 0) uptimeString += `${uptimeMinutes}m `;
        uptimeString += `${uptimeSeconds % 60}s`;

        // 🌐 Discord runtime stats
        const guildCount = message.client.guilds.cache.size;

        // 🧾 Command usage list
        let usageList = '';
        const sortedUsages = [...singleUsages.entries()].sort((a, b) => b[1] - a[1]);
        for (const [cmd, count] of sortedUsages.slice(0, 15)) {
            usageList += `\`${cmd}\`: ${count}\n`;
        }
        if (!usageList) usageList = 'No commands used yet.';

        // Cache size
        const cacheSize = CacheMaid?.store?.size || "Unknown";
        const theme = Config?.CORE?.THEMES?.ACTIVE || "Unknown";

        const embed = new EmbedBuilder()
            .setColor([150, 250, 250])
            .setTitle('📊 Bot Statistics & Diagnostics')
            .setDescription(`Live server metrics for YECO Bot`)
            .addFields(
                // Network & Ping
                { name: "📡 Ping", value: `WS: **${wsPing}ms**\nRTT: **${roundtrip}ms**`, inline: true },
                { name: "🌍 Guilds", value: `**${guildCount}**`, inline: true },
                { name: "👥 Users", value: `**${TotalUsers}**`, inline: true },

                // Memory
                { name: "💾 Memory", value: `RSS: **${rss} MB**\nHeap: **${heapUsed}/${heapTotal} MB**`, inline: true },
                { name: "🖥 System RAM", value: `Free: **${freeMem} MB**\nTotal: **${totalMem} MB**`, inline: true },
                { name: "📦 Cache", value: `Entries: **${cacheSize}**`, inline: true },

                // System Load
                { name: "📊 Load Avg", value: `${load[0].toFixed(2)} / ${load[1].toFixed(2)} / ${load[2].toFixed(2)}`, inline: true },
                { name: "🧠 CPU", value: cpu.length > 30 ? cpu.substring(0, 27) + "..." : cpu, inline: true },
                { name: "🎨 Theme", value: `**${theme}**`, inline: true },

                // Uptime & Commands
                { name: "⏱ Uptime", value: uptimeString, inline: true },
                { name: "👑 Total Commands", value: `${CommandsUsedTotal.toLocaleString()}`, inline: true },
                { name: "⚡ Session Commands", value: `${CommandsUsedSinceUpdate}`, inline: true },

                { name: "Total Earned", value: `**${Circulation_TotalEarned.toLocaleString()}**`, inline: true },
                { name: "Total Money", value: `**${Circulation_MainCurrency.toLocaleString()}**`, inline: true },
                { name: "Total Gambled", value: `**${Circulation_Gambled.toLocaleString()}**`, inline: true },

                // Command Usage
                { name: "📝 Top Commands (Session)", value: usageList || "None yet", inline: false }
            )
            .setFooter({ text: "Dev Mode • Live Diagnostics • YECO Bot" })
            .setTimestamp();

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
                .setColor(i === 0 ? [150, 250, 250] : [100, 100, 100])
                .setTitle(i === 0 ? `${prefix} Config` : `${prefix} Config (Part ${i + 1})`)
                .setDescription(`\`\`\`json\n${chunks[i]}\n\`\`\``);

            await message.reply({ embeds: [embed] });
        }
    },

    "send-webhook": async (message, args) => {
        const type = args[0];
        const text = args.slice(1).join(" ");

        await WebhookHandler(message, text, type, {
            pingRole: true,
        });
    },

    help: async (message) => {
        const embed = new EmbedBuilder()
            .setColor([150, 250, 250])
            .setTitle('🛠 Admin Commands Help')
            .addFields(
                { name: "~ Data Management ~", value: `**${prefix} add-data** <userID> <ValueName> <ValueAmount>\n**${prefix} set-data** <userID> <ValueName> <ValueAmount>`, inline: false },
                { name: "~ Backup Management ~", value: `**${prefix} create-backup** <name>\n**${prefix} restore-backup** <name>`, inline: false },
                { name: "~ Bot Management ~", value: `**${prefix} refresh-commands**\n**${prefix} get-command-payload**\n**${prefix} stats**\n**${prefix} config <seperated path>**` },
                { name: "~ Other ~", value: `**${prefix} send-webhook** <webhookName> <message>\n**${prefix} help**\n**${prefix} reset-cooldowns** <userId / empty>` },
            );

        await message.reply({ embeds: [embed] });
    },
};

async function sendEmbed(message, title, description, color) {
    const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description);
    await message.reply({ embeds: [embed] });
}

async function onMessage(message, data) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(`${prefix}`.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (
        message.author.id !== data.ownerID &&
        !data.developers.includes(message.author.id)
    ) {
        if (configManager.raw.CORE.SETTINGS.DEVELOPER_MODE)
            return message.reply('This command is for staff only!');
    }

    const commandAction = commandsMap[commandName];
    if (!commandAction) return message.reply(`❌ Command not found, try ${prefix} help.`);

    try {
        await commandAction(message, args, {
            client: data.client,
            restClient: data.restClient,
            clientID: data.clientID
        });
    } catch (err) {
        console.error(`Error executing command ${commandName}:`, err);
        message.reply("An error occurred while processing the command.").catch(() => { });
    }
}

module.exports = onMessage;