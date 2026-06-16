const { EmbedBuilder } = require("discord.js");
const { GetAsync } = require('../../../DataStorage/Datastore');
const ConfigManager = require('../../../Core/configManager');
const CommandHelper = require("../../../Utilities/CommandHelper");
const AbbreviateNumber = require("../../../Utilities/Format/AbbreviateNumber");
const configManager = require("../../../Core/configManager");

// FETCH CONFIGS
const CONFIG_BANK = ConfigManager.raw.ECONOMY.BANK;
const currentTheme = ConfigManager.getActiveTheme();

async function Wallet(interaction, client, targetUser) {
    if (targetUser && targetUser.bot) {
        return interaction.editReply({ content: ConfigManager.getMsg("ECONOMY.WALLET.MESSAGES.IS_BOT")});
    }

    const user = targetUser || interaction.user;
    const config = ConfigManager.raw;
    const activeKey = config.CORE.THEMES.ACTIVE;
    const theme = config.CORE.THEMES[activeKey];
    const walletConfig = theme.COMMANDS.WALLET;

    let mainBalance = await GetAsync(user.id, 'MAIN_CURRENCY') || 0;
    let secBalance = await GetAsync(user.id, 'SECOND_CURRENCY') || 0;
    let deposited = await GetAsync(user.id, "DEPOSITED") || 0;
    let totalMainEarned = await GetAsync(user.id, 'TOTAL_MAIN_CURRENCY') || 0;
    let totalSecondEarned = await GetAsync(user.id, 'TOTAL_SECOND_CURRENCY') || 0;

    const upgrades = await GetAsync(interaction.user.id, "UPGRADES") || {};
    const level = upgrades.BANK ?? 0;

    const upgradeBank = CONFIG_BANK.UPGRADES[level];

    mainBalance = await AbbreviateNumber(mainBalance);
    secBalance = await AbbreviateNumber(secBalance);
    deposited = await AbbreviateNumber(deposited);
    totalMainEarned = await AbbreviateNumber(totalMainEarned);
    totalSecondEarned = await AbbreviateNumber(totalSecondEarned);
    const bankCapacity = await AbbreviateNumber(upgradeBank.CAPACITY);

    const embed = configManager.getEmbed("ECONOMY.WALLET.MESSAGES.WALLET", {
        title: `${walletConfig.TITLE} ${ user.username }`,
        main_currency: mainBalance,
        main_currency_total: totalMainEarned,
        second_currency: secBalance,
        second_currency_total: totalSecondEarned,
        deposited: deposited,
        max_bank: bankCapacity
    });

    return interaction.editReply({ embeds: [embed] });
}

module.exports = Wallet;