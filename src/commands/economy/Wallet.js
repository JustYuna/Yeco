const { EmbedBuilder } = require("discord.js");
const { GetAsync } = require('../../DataStorage/Datastore');
const ConfigManager = require('../../Core/configManager');
const commandHelper = require("../../helpers/commandHelper");

// FETCH CONFIGS
const CONFIG_BANK = ConfigManager.raw.ECONOMY.BANK;

async function Wallet(interaction, client, targetUser) {
    const user = targetUser || interaction.user;
    const config = ConfigManager.raw;
    const activeKey = config.CORE.THEMES.ACTIVE;
    const theme = config.CORE.THEMES[activeKey];
    const walletConfig = theme.COMMANDS.WALLET;

    // 1. Fetch Stats & Balances
    let mainBalance = await GetAsync(user.id, 'MAIN_CURRENCY') || 0;
    let secBalance = await GetAsync(user.id, 'SECOND_CURRENCY') || 0;
    let deposited = await GetAsync(user.id, "DEPOSITED") || 0;

    let totalMainEarned = await GetAsync(user.id, 'TOTAL_MAIN_CURRENCY') || 0;
    let totalSecondEarned = await GetAsync(user.id, 'TOTAL_SECOND_CURRENCY') || 0;

    let gambled = await GetAsync(user.id, 'GAMBLED') || 0;

    const daily = await GetAsync(user.id, 'DAILY') || { STREAK: 0 };

    const levelData = await GetAsync(user.id, "LEVEL") || { LEVEL: 1, EXPERIENCE: 0 };
    const userLevel = levelData.LEVEL;
    const userXP = levelData.EXPERIENCE;
    const xpNeeded = ConfigManager.raw.PROGRESSION.LEVELS.XP_TABLE[userLevel] || 0;
    const progress = xpNeeded > 0 
        ? Math.floor((userXP / xpNeeded) * 100) 
        : 100;

    const upgrades = await GetAsync(interaction.user.id, "UPGRADES") || {};
    const level = upgrades.BANK ?? 0;

    const upgradeBank = CONFIG_BANK.UPGRADES[level];
    const bankCapacity = await commandHelper.ABBREVIATE_NUMBER(upgradeBank.CAPACITY);

    // 2. Abrevviate numbers
    mainBalance = await commandHelper.ABBREVIATE_NUMBER(mainBalance);
    secBalance = await commandHelper.ABBREVIATE_NUMBER(secBalance);
    deposited = await commandHelper.ABBREVIATE_NUMBER(deposited);

    totalMainEarned = await commandHelper.ABBREVIATE_NUMBER(totalMainEarned);
    totalSecondEarned = await commandHelper.ABBREVIATE_NUMBER(totalSecondEarned);

    gambled = await commandHelper.ABBREVIATE_NUMBER(gambled);

    // 3. Create Embed
    const embed = new EmbedBuilder()
        .setColor(ConfigManager.getColor())
        .setTitle(ConfigManager.parseMsg(walletConfig.TITLE, { username: user.username }))
        .setThumbnail(user.displayAvatarURL({ forceStatic: false, size: 256 }))
        .addFields(
            { 
                name: walletConfig.FIELDS.CURRENCY, 
                value: `{mainCurrency_emoji} **{mainCurrency_name}:** ${mainBalance}\n` +
                       `{secondaryCurrency_emoji} **{secondaryCurrency_name}:** ${secBalance}\n` +
                       `{mainCurrency_emoji} **Bank:** ${deposited}/${bankCapacity}`, 
                inline: true 
            },
            { 
                name: walletConfig.FIELDS.STATISTICS, 
                value:  `{mainCurrency_emoji} **Total {mainCurrency_name}:** ${totalMainEarned}\n` +
                        `{secondaryCurrency_emoji} **Total {secondaryCurrency_name}:** ${totalSecondEarned}\n` +
                        `🎰 **Gambled:** ${gambled}`, 
                inline: true 
            },
            { 
                name: walletConfig.FIELDS.STREAK, 
                value: `📅 **${daily.STREAK}** Days`, 
                inline: true 
            },
            { 
                name: "Level", 
                value: `⭐ **Level ${userLevel}**\n` +
                    `XP: ${await commandHelper.ABBREVIATE_NUMBER(userXP)} / ${await commandHelper.ABBREVIATE_NUMBER(xpNeeded)}\n` +
                    `Progress: **${progress}%**`,
                inline: true 
            }
        );

    // 4. The Final Theme Pass
    // This replaces all {placeholders} in one go
    const finalContent = ConfigManager.parseMsg(JSON.stringify(embed.toJSON()));
    const finalEmbed = EmbedBuilder.from(JSON.parse(finalContent));

    return interaction.editReply({ embeds: [finalEmbed] });
}

module.exports = Wallet;