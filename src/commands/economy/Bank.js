const { editCooldown } = require('../../Utils/Cooldown');
const { GetAsync, SetAsync, AddToAsync } = require('../../DataStorage/Datastore');
const ConfigManager = require("../../Core/configManager");
const CommandHelper = require("../../helpers/commandHelper");

const BANK = ConfigManager.raw.ECONOMY.BANK;
const { UPGRADES, MESSAGES } = BANK;

const actionMap = {
    view: async (interaction) => {
        const upgrades = await GetAsync(interaction.user.id, "UPGRADES") || {};
        const level = upgrades.BANK ?? 0;
        const deposited = await GetAsync(interaction.user.id, "DEPOSITED") || 0;

        const upgradeData = UPGRADES[level];

        const embed = ConfigManager.getEmbed("ECONOMY.BANK.MESSAGES.VIEW", {
            level,
            capacity: upgradeData.CAPACITY,
            next: upgradeData.NEXT_COST,
            deposited
        });

        return interaction.editReply({ embeds: [embed] });
    },

    upgrade: async (interaction) => {
        const balance = await GetAsync(interaction.user.id, "MAIN_CURRENCY") || 0;
        const upgrades = await GetAsync(interaction.user.id, "UPGRADES") || {};
        const level = upgrades.BANK ?? 0;

        if (!UPGRADES[level + 1]) {
            const msg = ConfigManager.getMsg("ECONOMY.BANK.MESSAGES.UPGRADE_MAXED");
            return interaction.editReply({ content: msg });
        }

        const upgradeData = UPGRADES[level];
        const newUpgradeData = UPGRADES[level + 1];
        const cost = upgradeData.NEXT_COST;

        if (balance < cost) {
            const msg = ConfigManager.getMsg("ECONOMY.BANK.MESSAGES.UPGRADE_CANT_AFFORD", { amount: cost - balance });
            return interaction.editReply({ content: msg });
        }

        await AddToAsync(interaction.user.id, { MAIN_CURRENCY: -cost });
        await SetAsync(interaction.user.id, {
            UPGRADES: {
                ...upgrades,
                BANK: level + 1
            }
        });

        const embed = ConfigManager.getEmbed("ECONOMY.BANK.MESSAGES.UPGRADE_SUCCESS", {
            level: level + 1,
            capacity: newUpgradeData.CAPACITY
        });

        return interaction.editReply({ embeds: [embed] });
    },

    deposit: async (interaction, _, { amount }) => {
        if (!amount || amount <= 0) {
            const msg = ConfigManager.getMsg("ECONOMY.BANK.MESSAGES.INVALID_AMOUNT");
            return interaction.editReply({ content: msg });
        }

        const balance = await GetAsync(interaction.user.id, "MAIN_CURRENCY") || 0;
        const deposited = await GetAsync(interaction.user.id, "DEPOSITED") || 0;
        const upgrades = await GetAsync(interaction.user.id, "UPGRADES") || {};
        const level = upgrades.BANK ?? 0;
        const capacity = UPGRADES[level].CAPACITY;

        await CommandHelper.VALIDATE_CURRENCY(interaction, amount, { userBalance: balance, command: "bank" });

        if (deposited + amount > capacity) {
            const msg = ConfigManager.getMsg("ECONOMY.BANK.MESSAGES.BANK_FULL");
            return interaction.editReply({ content: msg });
        }

        await AddToAsync(interaction.user.id, { MAIN_CURRENCY: -amount, DEPOSITED: amount });

        const msg = ConfigManager.getMsg("ECONOMY.BANK.MESSAGES.DEPOSIT", { amount, newAmount: deposited + amount });
        return interaction.editReply({ content: msg });
    },

    withdraw: async (interaction, _, { amount }) => {
        if (!amount || amount <= 0) {
            const msg = ConfigManager.getMsg("ECONOMY.BANK.MESSAGES.INVALID_AMOUNT");
            return interaction.editReply({ content: msg });
        }

        const deposited = await GetAsync(interaction.user.id, "DEPOSITED") || 0;

        await CommandHelper.VALIDATE_CURRENCY(interaction, amount, { userBalance: deposited, command: "bank" });

        await AddToAsync(interaction.user.id, { MAIN_CURRENCY: amount, DEPOSITED: -amount });

        const msg = ConfigManager.getMsg("ECONOMY.BANK.MESSAGES.WITHDRAW", { amount, newAmount: deposited - amount });
        return interaction.editReply({ content: msg });
    }
};

async function bank(interaction, client, { amount, action }) {
    if (!interaction) return;

    const handler = actionMap[action];
    if (!handler) {
        const msg = ConfigManager.getMsg("CORE.MESSAGES.ACTION_UNAVAILABLE");
        return interaction.editReply({ content: msg });
    }

    await handler(interaction, client, { amount, action });
}

module.exports = bank;