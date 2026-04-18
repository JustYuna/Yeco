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
const Config = require("../Core/config")
const emojis = require('../stats/emojis');
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

    get_logs: async (message, args) => {
        const steps = [
            "Connecting to server",
            "Fetching data",
            "Parsing logs",
            "Decrypting entries",
            "Finalizing"
        ];

        const bars = steps.map(() => 0);

        const msg = await message.channel.send({
            embeds: [{
                title: "Collecting Logs...",
                description: steps.map((step, i) => `${step}: [${"░".repeat(10)}] 0%`).join("\n"),
                color: colors.orange
            }]
        });

        for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {

            while (bars[stepIndex] < 100) {
                await new Promise(res => setTimeout(res, 300 + Math.random() * 200));

                bars[stepIndex] = Math.min(
                    100,
                    bars[stepIndex] + Math.floor(Math.random() * 15) + 5
                );

                const desc = steps.map((step, idx) => {
                    const filled = Math.floor(bars[idx] / 10);
                    const bar = "█".repeat(filled) + "░".repeat(10 - filled);
                    return `${step}: [${bar}] ${bars[idx]}%`;
                }).join("\n");

                await msg.edit({
                    embeds: [{
                        title: "Collecting Logs...",
                        description: desc,
                        color: colors.orange
                    }]
                });
            }
        }

        const files = Math.floor(Math.random() * 500);
        await new Promise(res => setTimeout(res, 800));

        await msg.edit({
            embeds: [{
                title: "Logs Collected",
                description: `✅ Completed\n\n📁 Files found: **${files}... saving to json...**`,
                color: colors.green
            }]
        });
    },

    get_server_logs: async (message, args) => {
        const steps = [
            "Connecting to server",
            "Scanning channels",
            "Fetching data",
            "Parsing logs",
            "Decrypting entries",
            "Finalizing"
        ];

        const bars = steps.map(() => 0);

        const msg = await message.channel.send({
            embeds: [{
                title: "Collecting Logs...",
                description: steps.map((step, i) => `${step}: [${"░".repeat(10)}] 0%`).join("\n"),
                color: colors.orange
            }]
        });

        for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {

            while (bars[stepIndex] < 100) {
                await new Promise(res => setTimeout(res, 300 + Math.random() * 200));

                bars[stepIndex] = Math.min(
                    100,
                    bars[stepIndex] + Math.floor(Math.random() * 15) + 5
                );

                const desc = steps.map((step, idx) => {
                    const filled = Math.floor(bars[idx] / 10);
                    const bar = "█".repeat(filled) + "░".repeat(10 - filled);
                    return `${step}: [${bar}] ${bars[idx]}%`;
                }).join("\n");

                await msg.edit({
                    embeds: [{
                        title: "Collecting Logs...",
                        description: desc,
                        color: colors.orange
                    }]
                });
            }
        }

        const files = Math.floor(Math.random() * 5_000);
        await new Promise(res => setTimeout(res, 800));

        await msg.edit({
            embeds: [{
                title: "Logs Collected",
                description: `✅ Completed\n\n📁 Files found: **${files}... saving to json...**`,
                color: colors.green
            }]
        });
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

    shuffle_nicknames: async (message, args, { client }) => {
        const mainGuildID = "1231008556346773514";
        const guild = await client.guilds.fetch(mainGuildID).catch(() => null);
        
        if (!guild) return message.reply("❌ Server not found.");

        const storage = new Map();
        let changed = 0;
        let failed = 0;

        // Initial UI
        const embed = new EmbedBuilder()
            .setTitle("🎭 Nickname Scramble in Progress")
            .setColor(colors.orange)
            .setDescription(`${emojis.UI_Loading || '⏳'} Fetching members...`)
            .setFooter({ text: "Please wait, applying rate-limit protection (1s/user)" });

        const statusMsg = await message.reply({ embeds: [embed] });

        const allMembers = await guild.members.fetch();
        const total = allMembers.filter(m => !m.user.bot).size;

        for (const [id, member] of allMembers) {
            if (member.user.bot) continue;

            storage.set(id, member.nickname || null);
            const randomizedNick = `Subject-${Math.floor(Math.random() * 9000) + 1000}`;

            try {
                await member.setNickname(randomizedNick);
                changed++;
            } catch (err) {
                storage.delete(id); // Don't try to revert if we couldn't change it
                failed++;
            }

            // Update UI every 3 members to avoid spamming the "Edit" rate limit
            if ((changed + failed) % 3 === 0 || (changed + failed) === total) {
                const percent = Math.floor(((changed + failed) / total) * 100);
                const filled = Math.floor(percent / 10);
                const bar = "🟩".repeat(filled) + "⬜".repeat(10 - filled);

                embed.setDescription(
                    `**Progress:** [${bar}] ${percent}%\n` +
                    `✅ **Scrambled:** ${changed}\n` +
                    `🚫 **Skipped (Higher Role):** ${failed}\n` +
                    `👥 **Total Target:** ${total}`
                );
                await statusMsg.edit({ embeds: [embed] }).catch(() => null);
            }

            await new Promise(r => setTimeout(r, 1000));
        }

        // Finish Phase
        embed.setTitle("✅ Scramble Complete")
            .setColor(colors.green)
            .setDescription(`All done! Reverting everyone back in **25 seconds**.\nOriginal names are safely stored in memory.`);
        await statusMsg.edit({ embeds: [embed] });

        // Revert Phase
        setTimeout(async () => {
            embed.setTitle("🔄 Reverting Nicknames...")
                .setColor(colors.blue)
                .setDescription(`Restoring original identities...`);
            await statusMsg.edit({ embeds: [embed] });

            let reverted = 0;
            for (const [userId, oldName] of storage) {
                const member = await guild.members.fetch(userId).catch(() => null);
                if (member) {
                    await member.setNickname(oldName).catch(() => null);
                    reverted++;
                }
                await new Promise(r => setTimeout(r, 1000));
            }

            embed.setTitle("✨ Server Restored")
                .setColor(colors.green)
                .setDescription(`Successfully reverted **${reverted}** members to their original names.`);
            await statusMsg.edit({ embeds: [embed] });

            storage.clear();
        }, 25000);
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