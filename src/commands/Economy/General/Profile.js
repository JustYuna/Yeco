const { EmbedBuilder } = require("discord.js");
const { GetAsync } = require('../../../DataStorage/Datastore');
const ConfigManager = require('../../../Core/configManager');
const CommandHelper = require("../../../Utilities/CommandHelper");
const AbbreviateNumber = require("../../../Utilities/Format/AbbreviateNumber");
const VisualizeBar = require("../../../Utilities/Visual/VisualizeBar");
const configManager = require("../../../Core/configManager");

async function Profile(interaction, client, targetUser) {
    if (targetUser && targetUser.bot) {
        return interaction.editReply({ content: ConfigManager.getMsg("ECONOMY.PROFILE.MESSAGES.IS_BOT")});
    }

    const user = targetUser || interaction.user;
    const config = ConfigManager.raw;
    const activeKey = config.CORE.THEMES.ACTIVE;
    const theme = config.CORE.THEMES[activeKey];
    const walletConfig = theme.COMMANDS.WALLET;

    let mainBalance = await GetAsync(user.id, 'MAIN_CURRENCY') || 0;
    let secBalance = await GetAsync(user.id, 'SECOND_CURRENCY') || 0;
    let gambled = await GetAsync(user.id, "GAMBLED") || 0;
    let totalMainEarned = await GetAsync(user.id, 'TOTAL_MAIN_CURRENCY') || 0;
    let totalSecondEarned = await GetAsync(user.id, 'TOTAL_SECOND_CURRENCY') || 0;
    let levelData = await GetAsync(user.id, "LEVEL") || { LEVEL: 1, EXPERIENCE: 0 };
    let xp_needed = Math.floor(config.PROGRESSION.LEVELS.XP_NEEDED_PER_LEVEL * (config.PROGRESSION.LEVELS.XP_MULTIPLIER_PER_LEVEL * levelData.LEVEL)) || config.PROGRESSION.LEVELS.XP_NEEDED_PER_LEVEL;

    mainBalance = await AbbreviateNumber(mainBalance);
    secBalance = await AbbreviateNumber(secBalance);
    gambled = await AbbreviateNumber(gambled);
    totalMainEarned = await AbbreviateNumber(totalMainEarned);
    totalSecondEarned = await AbbreviateNumber(totalSecondEarned);
    const level = await AbbreviateNumber(levelData.LEVEL);
    const experience = await AbbreviateNumber(levelData.EXPERIENCE);
    const missing_xp = await AbbreviateNumber(xp_needed - levelData.EXPERIENCE);
    const missing_xp_percentage = levelData.EXPERIENCE / xp_needed * 100;
    xp_needed = await AbbreviateNumber(xp_needed);

    const barTitle = configManager.getMsg("ECONOMY.PROFILE.MESSAGES.BAR_TITLE", {
        experience: experience,
        missing_xp: xp_needed,
    })
    const bar = await VisualizeBar({ value: missing_xp_percentage, label: barTitle, showPercentage: true, barCount: 10 })


    const embed = configManager.getEmbed("ECONOMY.PROFILE.MESSAGES.PROFILE", {
        username: `${ user.username }`,
        main_currency: totalMainEarned,
        second_currency: totalSecondEarned,
        gambled: gambled,
        level: level,
        level_bar: bar
    });

    return interaction.editReply({ embeds: [embed] });
}

module.exports = Profile;