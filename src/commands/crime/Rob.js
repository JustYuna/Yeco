// Rob.js
const { GetAsync, AddToAsync } = require('../../DataStorage/Datastore');
const { editCooldown } = require('../../Utils/Cooldown');
const ConfigManager = require("../../Core/configManager")

async function Rob(interaction, client, target) {
    const robConfig = ConfigManager.raw.ECONOMY.ROB;

    // Precheck
    if (interaction.user.id === target.id) {
        const msg = ConfigManager.parseMsg(robConfig.MESSAGES.IS_YOU);
        editCooldown(interaction, "rob", 10);
        return interaction.editReply({ content: msg });
    };

    if (target.bot) {
        const msg = ConfigManager.parseMsg(robConfig.MESSAGES.IS_BOT);
        editCooldown(interaction, "rob", 10);
        return interaction.editReply({ content: msg });
    }

    const robberBalance = await GetAsync(interaction.user.id, "MAIN_CURRENCY")
    const targetBalance = await GetAsync(target.id, "MAIN_CURRENCY");
    const required = targetBalance * (robConfig.REQUIREMENT_RATIO / 100);

    if (robberBalance < required) {
        const msg = ConfigManager.parseMsg(robConfig.MESSAGES.REQUIREMENT, { amount: required });
        editCooldown(interaction, "rob", 10);
        return interaction.editReply({ content: msg });
    };

    const successChance = robConfig.SUCCESS_RATIO.BASE + (Math.random() * robConfig.SUCCESS_RATIO.VARIANCE * 2 - robConfig.SUCCESS_RATIO.VARIANCE);
    const success = Math.random() < successChance;

    if (success) { // Success
        const stealPercent = robConfig.STEAL_RATIO.MIN + Math.random() * (robConfig.STEAL_RATIO.MAX - robConfig.STEAL_RATIO.MIN);
        const amount = Math.floor(targetBalance * (stealPercent / 100));

        await AddToAsync(interaction.user.id, { MAIN_CURRENCY: amount });
        await AddToAsync(target.id, { MAIN_CURRENCY: -amount });

        const msg = ConfigManager.parseMsg(robConfig.MESSAGES.SUCCESS, { amount, target: `<@${target.id}>` });
        return interaction.editReply({ content: msg });

    } else { // Failed
        const losePercent = robConfig.LOSE_RATIO.MIN + Math.random() * (robConfig.LOSE_RATIO.MAX - robConfig.LOSE_RATIO.MIN);
        const amount = Math.floor(robberBalance * (losePercent / 100));

        await AddToAsync(interaction.user.id, { MAIN_CURRENCY: -amount });

        const msg = ConfigManager.parseMsg(robConfig.MESSAGES.FAIL, { fine: amount, target: `<@${target.id}>` });
        return interaction.editReply({ content: msg });
    }
}

module.exports = Rob;