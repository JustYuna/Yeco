const { GetAsync, AddToAsync } = require('../../DataStorage/Datastore');
const { editCooldown } = require('../../Utils/Cooldown');
const { EmbedBuilder } = require('discord.js');

const ConfigManager = require("../../Core/configManager");
const CommandHelper = require('../../helpers/commandHelper');

const SLOTS = ConfigManager.raw.ECONOMY.SLOTS;
const { MIN_BET, MAX_BET, SYMBOLS, JACKPOTS } = SLOTS;

// Pick a random symbol based on weight
function getRandomSymbol() {
    const totalWeight = SYMBOLS.reduce((sum, s) => sum + s.weight, 0);
    let rand = Math.random() * totalWeight;
    for (const s of SYMBOLS) {
        if (rand < s.weight) return s.emoji;
        rand -= s.weight;
    }
    // Fallback just in case
    return SYMBOLS[SYMBOLS.length - 1].emoji;
}

async function slots(interaction, client, bet, viewInfo) {
    if (!interaction) return;
    const userId = interaction.user.id;

    let Currency = await GetAsync(userId, 'MAIN_CURRENCY') || 0;
    const validationError = await CommandHelper.VALIDATE_CURRENCY(interaction, bet, { min: MIN_BET, max: MAX_BET, userBalance: Currency, command: "slots" });
    if (validationError) return;

    // ===== Show info first if requested =====
    if (viewInfo) {
        console.log(viewInfo);
        const totalWeight = SYMBOLS.reduce((sum, s) => sum + s.weight, 0);
        const infoLines = SYMBOLS
            .map(s => `${s.emoji}: ${((s.weight / totalWeight) * 100).toFixed(1)}% chance`);

        const jackpotLines = Object.entries(JACKPOTS)
            .map(([emoji, mult]) => `${emoji} = ${mult}x`).join(' | ');
        
        const infoEmbed = new EmbedBuilder()
            .setTitle('🎰 Slot Machine Info')
            .setDescription(`Here’s how this slot machine works:`)
            .addFields(
                { name: 'Reel size', value: `${SYMBOLS.length}`, inline: true },
                { name: 'Symbol distribution', value: infoLines.join('\n'), inline: false },
                { name: 'Pair payout', value: '2x', inline: true },
                { name: 'Jackpot payouts', value: jackpotLines, inline: false }
            )
            .setColor('Blurple')
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        
        await interaction.editReply({ embeds: [infoEmbed] });
        await new Promise(res => setTimeout(res, 1500));
        return;
    }

    // ===== Main spin =====
    const result = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    let display = ["❓", "❓", "❓"];
    await interaction.editReply({ content: `🎰 ${display.join(" | ")}` });

    // Reveal animation
    for (let i = 0; i < result.length; i++) {
        await new Promise(res => setTimeout(res, 500));
        display[i] = result[i];
        await interaction.editReply({ content: `🎰 ${display.join(" | ")}` });
    }

    // Check result
    const [a, b, c] = result;
    let multiplier = 0;

    if (a === b && b === c) multiplier = JACKPOTS[a] || 5;
    else if (a === b || b === c || a === c) multiplier = 2;

    // Always subtract bet first
    await AddToAsync(userId, { MAIN_CURRENCY: -bet });

    let message;
    if (multiplier > 0) {
        const winnings = bet * multiplier;
        await AddToAsync(userId, { MAIN_CURRENCY: winnings, GAMBLED: winnings });
        message = `🎰 ${result.join(" | ")}\n\nYou won **${winnings}**!`;
    } else {
        message = `🎰 ${result.join(" | ")}\n\nYou lost **${bet}**.`;
    }

    await interaction.editReply({ content: message });
}

module.exports = slots;