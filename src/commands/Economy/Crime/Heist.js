const { editCooldown } = require('../../../Utilities/Cooldown');
const { GetAsync, AddToAsync } = require('../../../DataStorage/Datastore');

const ConfigManager = require("../../../Core/configManager");
const VisualizeBar = require('../../../Utilities/Visual/VisualizeBar');
const AbbreviateNumber = require('../../../Utilities/Format/AbbreviateNumber');
const Config = ConfigManager.raw
const { EmbedBuilder } = require("discord.js");

// --- Data ---
const HEIST = Config.CRIME.HEIST;
const { DATA, PERCENTAGE } = HEIST;

// --- Tick race ---
async function tick(interaction, state) {
    while (state.Timing < 100 && state.Awareness < 100) {
        const roll = Math.random() * 100;

        if (roll < PERCENTAGE) {
            state.Awareness += Math.floor(Math.random() * 10 + 8);

        } else {
            state.Timing += Math.floor(Math.random() * 10 + 8);
        }

        state.Timing = Math.min(state.Timing, 100);
        state.Awareness = Math.min(state.Awareness, 100);

        const awarenessBar = VisualizeBar({ value: state.Awareness, label: "🎯 Awareness", showPercentage: true });
        const timingBar = VisualizeBar({ value: state.Timing, label: "🧠 Timing", showPercentage: true });

        await interaction.editReply({
            content: `⏳ **Heist in progress...**\n${awarenessBar}\n${timingBar}`
        });

        await new Promise(r => setTimeout(r, 500));
    }

    return state.Timing >= 100 ? "success" : "fail";
}

// --- Main command ---
async function heist(interaction, client, { option }) {
    const userId = interaction.user.id;
    option = DATA[option] || null;

    const Currency = await GetAsync(userId, "MAIN_CURRENCY");

    if (!option) {
        editCooldown(interaction, "heist", 10);
        return interaction.editReply(ConfigManager.getMsg("CRIME.HEIST.MESSAGES.NOT_AN_OPTION"));
    }

    if (Currency < option.REQUIREMENT) {
        editCooldown(interaction, "heist", 10);
        return interaction.editReply(ConfigManager.getMsg("CRIME.HEIST.MESSAGES.NOT_ENOUGH", { amount: option.REQUIREMENT, name: option.NAME }));
    }

    const state = {
        Awareness: 0,
        Timing: 0
    };

    await interaction.editReply(ConfigManager.getMsg("CRIME.HEIST.MESSAGES.PLANNING_HEIST"));
    const result = await tick(interaction, state);

    if (result === "success") {
        const reward = Math.round(Math.random(option.REWARD.MIN) * option.REWARD.MAX);
        const abbreviated = await AbbreviateNumber(reward);

        await AddToAsync(userId, { SECOND_CURRENCY: reward, ROBBED: reward });

        const msg = ConfigManager.getEmbed("CRIME.HEIST.MESSAGES.SUCCESS", { amount: abbreviated, target: option.NAME });
        return interaction.editReply({ embeds: [msg], content: "" });

    } else {
        const fine = Math.round(Math.random(option.REQUIREMENT / 2) * option.REQUIREMENT);
        const abbreviated = await AbbreviateNumber(fine);
        await AddToAsync(userId, { MAIN_CURRENCY: -fine });

        const msg = ConfigManager.getEmbed("CRIME.HEIST.MESSAGES.FAILED", { amount: abbreviated, target: option.NAME });
        return interaction.editReply({ embeds: [msg], content: "" });
    }
}

module.exports = heist;