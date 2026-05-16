const { GetAsync, AddToAsync } = require('../../../DataStorage/Datastore');
const { editCooldown } = require('../../../Utilities/Cooldown');
const { EmbedBuilder } = require('discord.js');

const ConfigManager = require("../../../Core/configManager");
const CommandHelper = require("../../..//Utilities/CommandHelper");

const SLOTS = ConfigManager.raw.GAMBLING.SLOTS;
const { MIN_BET, SYMBOLS, JACKPOTS } = SLOTS;

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
    const validationError = await CommandHelper.VALIDATE_CURRENCY(interaction, bet, { min: MIN_BET, userBalance: Currency, command: "slots" });
    if (validationError) return;

    // ===== Show info first if requested =====
    if (viewInfo) {
        console.log(viewInfo);
        const totalWeight = SYMBOLS.reduce((sum, s) => sum + s.weight, 0);
        const infoLines = SYMBOLS
            .map(s => `${s.emoji}: ${((s.weight / totalWeight) * 100).toFixed(1)}% chance - Jackpot: ${s.jackpot}`);
        
        let infoEmbed = new EmbedBuilder()
            .setTitle('🎰 Slot Machine Info')
            .setDescription(`Here’s how this slot machine works:`)
            .addFields(
                { name: 'Reel size', value: `${SYMBOLS.length}`, inline: true },
                { name: 'Symbol distribution', value: infoLines.join('\n'), inline: false },
                { name: 'Pair payout', value: '2x', inline: true },
            )
            .setColor('Blurple')
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

        infoEmbed = ConfigManager.parseEmbed(infoEmbed) || infoEmbed;
        
        await interaction.editReply({ embeds: [infoEmbed] });
        await new Promise(res => setTimeout(res, 1500));
        return;
    }

    // ===== Main spin =====
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    function buildMessage(display) {
        let msg = `🎰 ${display.join(" | ")}`;
        return ConfigManager.parseMsg(msg);
    }

    // ===== Main spin =====
    const result = Array.from({ length: 3 }, getRandomSymbol);
    let display = Array(3).fill("{emoji_UI_Questionmark}");

    await interaction.editReply({ content: buildMessage(display) });

    // Reveal animation
    for (let i = 0; i < result.length; i++) {
        await sleep(500);
        display[i] = result[i];
        await interaction.editReply({ content: buildMessage(display) });
    }

    // Check result
    const [a, b, c] = result;
    let multiplier = 0;

    if (a === b && b === c) {
        const symbolData = SYMBOLS.find(s => s.emoji === a);
        multiplier = symbolData?.jackpot || 5;
    }
    else if (a === b || b === c || a === c) multiplier = 2;

    // Always subtract bet first

    let message;
    if (multiplier > 0) {
        const winnings = bet * multiplier;
        await AddToAsync(userId, { MAIN_CURRENCY: winnings, GAMBLED: winnings / 2 });
        message = `${buildMessage(display)}\n\nYou won **${winnings}**!`;
    } else {
        await AddToAsync(userId, { MAIN_CURRENCY: -bet });
        message = `${buildMessage(display)}\n\nYou lost **${bet}**.`;
    }

    await interaction.editReply({ content: message });
}

module.exports = slots;