const { editCooldown } = require('../../Utils/Cooldown');
const { GetAsync, AddToAsync } = require('../../DataStorage/Datastore');

const Config = require("../../Core/config");
const ConfigManager = require("../../Core/configManager");
const { EmbedBuilder } = require("discord.js");

// --- Data ---
const HEIST = Config.ECONOMY.HEIST;
const { REQUIREMENTS, DIFFICULTY_DATA } = HEIST;

// --- Visual helpers ---
function visualizeBar(value, label) {
    const totalBars = 20;
    const filled = Math.min(totalBars, Math.round((value / 100) * totalBars));
    const bar = "▮".repeat(filled) + "▯".repeat(totalBars - filled);
    return `${label}: [${bar}] (${value}%)`;
}

// --- Tick race ---
async function tick(interaction, state, chance) {
    while (state.Timing < 100 && state.Awareness < 100) {
        const roll = Math.random() * 100;

        if (roll < chance) {
            state.Awareness += Math.floor(Math.random() * 10 + 8);
        } else {
            state.Timing += Math.floor(Math.random() * 10 + 8);
        }

        state.Timing = Math.min(state.Timing, 100);
        state.Awareness = Math.min(state.Awareness, 100);

        const awarenessBar = visualizeBar(state.Awareness, "🎯 Awareness");
        const timingBar = visualizeBar(state.Timing, "🧠 Timing");

        await interaction.editReply({
            content: `⏳ **Heist in progress...**\n${awarenessBar}\n${timingBar}`
        });

        await new Promise(r => setTimeout(r, 500));
    }

    return state.Timing >= 100 ? "success" : "fail";
}

// --- Main command ---
async function heist(interaction, client, option, difficulty) {
    const userId = interaction.user.id;

    const Candy = await GetAsync(userId, "MAIN_CURRENCY");

    if (option === "seek") {
        editCooldown(interaction, "rob", 10);
        const embed = new EmbedBuilder()
            .setTitle("🔍 Scouting Targets")
            .setDescription("Choose a target to attempt robbing.")
            .addFields(
                { name: "Kids", value: `Requires: 250`, inline: false },
                { name: "Candy Shop", value: `Requires: 750`, inline: false },
                { name: "Warehouse", value: `Requires: 1,500`, inline: false },
                { name: "Candy Factory", value: `Requires: 3,500`, inline: false },
                { name: "Santa", value: `Requires: 7,500`, inline: false }
            )
            .setFooter({ text: `Cooldown reset back to 10secs.` })
            .setColor(0xffa500);

        return interaction.editReply({ embeds: [embed] });
    };

    const Required = REQUIREMENTS[option] || REQUIREMENTS.kids;
    const Difficulty = DIFFICULTY_DATA[difficulty] || DIFFICULTY_DATA.medium;

    if (Candy < Required) {
        await editCooldown(interaction, "rob", 10);
        return interaction.editReply({
            content: `🚫 You need at least **${Required}** to rob **${option}**.`,
            flags: 64
        });
    }

    const state = {
        Awareness: 0,
        Timing: 0
    };

    await interaction.editReply("👀 Planning the heist...");
    const result = await tick(interaction, state, Difficulty.Percentage);

    editCooldown(interaction, "heist", 900);

    if (result === "success") {
        const reward = Math.round(Required * Difficulty.Reward);
        await AddToAsync(userId, { MAIN_CURRENCY: reward, ROBBED: reward });

        const msg = ConfigManager.getEmbed("ECONOMY.HEIST.MESSAGES.SUCCESS", { amount: reward, target: option, difficulty: difficulty });
        return interaction.editReply({ embeds: [msg] });
    } else {
        const fine = Required;
        await AddToAsync(userId, { MAIN_CURRENCY: fine });

        const msg = ConfigManager.getEmbed("ECONOMY.HEIST.MESSAGES.FAILED", { amount: fine, target: option, difficulty: difficulty });
        return interaction.editReply({ embeds: [msg] });
    }
}

module.exports = heist;