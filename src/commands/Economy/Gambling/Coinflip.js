const { GetAsync, AddToAsync } = require('../../../DataStorage/Datastore');
const { EmbedBuilder } = require('discord.js');

const ConfigManager = require("../../../Core/configManager");
const CommandHelper = require("../../..//Utilities/CommandHelper");
const ABBREVIATE_NUMBER = require('../../../Utilities/Format/AbbreviateNumber');

const COINFLIP = ConfigManager.raw.GAMBLING.COINFLIP;
const {
    MIN_BET,
    WIN_CHANCE,
    LOSE_CHANCE,
    ULTIMATE_LOSE_CHANCE,
    RESPONSES
} = COINFLIP;

const totalChance = LOSE_CHANCE + WIN_CHANCE;
const totalUltimateChance = LOSE_CHANCE + ULTIMATE_LOSE_CHANCE;

async function Coinflip(interaction, client, { amount, selection }) {
    if (!interaction) return;
    const userId = interaction.user.id;

    let Balance = await GetAsync(userId, "MAIN_CURRENCY") || 0;
    const validateError = await CommandHelper.VALIDATE_CURRENCY(interaction, amount, { min: MIN_BET, userBalance: Balance, command: "coinflip" });
    if (validateError) return;

    let rand = Math.random() * totalChance;
    let result = "lose";
    let msg = "Message not found...";

    if (rand < WIN_CHANCE) {
        result = "win";
    }

    if (result === "lose") {
        let rand2 = Math.random() * totalUltimateChance;
        if (rand2 < ULTIMATE_LOSE_CHANCE) {
            result = "ultimate";
        }
    }

    if (result === "win") { // get msg and parse data here to save resources
        await AddToAsync(userId, { "MAIN_CURRENCY": amount, "GAMBLED": amount })
        msg = RESPONSES.WIN[Math.floor(Math.random() * RESPONSES.WIN.length)] || "No response found...";
    } else if (result === "lose") {
        await AddToAsync(userId, { "MAIN_CURRENCY": -amount })
        msg = RESPONSES.LOSE[Math.floor(Math.random() * RESPONSES.LOSE.length)] || "No response found...";
    } else if (result === "ultimate") {
        await AddToAsync(userId, { "MAIN_CURRENCY": -amount })
        msg = RESPONSES.ULTIMATE_LOSE[Math.floor(Math.random() * RESPONSES.ULTIMATE_LOSE.length)] || "No response found...";
    }

    const abbreviated = ABBREVIATE_NUMBER(amount);
    return interaction.editReply({ content: ConfigManager.parseMsg(msg, { selection: selection, amount: abbreviated }) })
}

module.exports = Coinflip;