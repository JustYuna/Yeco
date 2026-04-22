const { GetTopAsync, GetAsync } = require('../../DataStorage/Datastore');
const { EmbedBuilder } = require('discord.js');
const colors = require('../../stats/colors');
const configManager = require('../../Core/configManager');

const currentTheme = configManager.getActiveTheme();

const CONFIG = {
    REFRESH_COOLDOWN: 300000, // 5 min
    MAX_TOP_USERS: 10,
};

const MAP_pulls = new Map();
const hiddenCache = new Map();

// --- cache helper for hidden setting ---
async function isHidden(userId) {
    const cached = hiddenCache.get(userId);

    if (cached && Date.now() - cached.time < 300000) {
        return cached.value;
    }

    const value = await GetAsync(userId, "SETTING_HIDDEN_FROM_LEADERBOARD") || false;

    hiddenCache.set(userId, {
        value,
        time: Date.now()
    });

    return value;
}

async function leaderboard(interaction, client, type) {
    const now = Date.now();
    const key = type.toLowerCase();

    const nameMap = {
        main_currency: currentTheme.CURRENCY.MAIN.NAME,
        total_main_currency: `Total ${currentTheme.CURRENCY.MAIN.NAME}`,
        second_currency: currentTheme.CURRENCY.SECONDARY.NAME,
        total_second_currency: `Total ${currentTheme.CURRENCY.SECONDARY.NAME}`,
        gambled: "Gambled",
        robbed: "Robbed",
    };

    const convertedName = nameMap[key] || type.toUpperCase();

    // --- cache leaderboard pulls ---
    let currentPull = MAP_pulls.get(key);

    if (!currentPull || now - currentPull.date > CONFIG.REFRESH_COOLDOWN) {
        let topUsers = await GetTopAsync(type.toUpperCase(), CONFIG.MAX_TOP_USERS);

        if (!topUsers) {
            return interaction.editReply({
                content: "Failed to fetch leaderboard."
            });
        }

        topUsers = topUsers.slice(0, CONFIG.MAX_TOP_USERS);

        currentPull = {
            date: now,
            top: topUsers
        };

        MAP_pulls.set(key, currentPull);
    }

    // --- build leaderboard ---
    const lines = await Promise.all(
        currentPull.top.map(async (user, index) => {
            const hidden = await isHidden(user.id);

            let username = user.id;

            const cachedUser = client.users.cache.get(user.id);

            if (cachedUser) {
                username = cachedUser.username;
            } else {
                try {
                    const fetched = await client.users.fetch(user.id);
                    username = fetched.username;
                } catch {
                    username = user.id;
                }
            }

            if (hidden) username = "🙈 Hidden";

            return `**#${index + 1}**: ${username} - **${user.value ?? 0}**`;
        })
    );

    const embed = new EmbedBuilder()
        .setColor(colors.green)
        .setTitle(`${convertedName} Leaderboard`)
        .setDescription(lines.join("\n"))
        .setFooter({
            text: `• Last refresh: ${Math.floor((now - currentPull.date) / 1000)}s ago`,
            iconURL: client.user.displayAvatarURL()
        })
        .setTimestamp();

    return interaction.editReply({ embeds: [embed] });
}

module.exports = leaderboard;