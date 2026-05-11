const { GetAsync, AddToAsync } = require('../../DataStorage/Datastore');
const { editCooldown } = require('../../Utils/Cooldown');
const { EmbedBuilder } = require('discord.js');

const Config = require('../../Core/config');
const ConfigManager = require("../../Core/configManager");
const CommandHelper = require("../../helpers/commandHelper");

const RPS = Config.ECONOMY.ROCK_PAPER_SCISSORS;
const { MIN_BET, MAX_BET, WIN_CHANCE, MESSAGES } = RPS;

async function rps(interaction, client, betAmount, betType) {
    if (!interaction) return;
    const userId = interaction.user.id;

    let Balance = await GetAsync(userId, "MAIN_CURRENCY") || 0;
    await CommandHelper.VALIDATE_BET(interaction, betAmount, { min: MIN_BET, max: MAX_BET, userBalance: Balance, command: "rock-paper-scissors" });

    // Validate bet type
    const choices = ["rock", "paper", "scissors"];
    betType = betType.toLowerCase();
    if (!choices.includes(betType)) {
        return interaction.editReply({
            content: MESSAGES.INVALID_CHOICE({ choices }),
            flags: 64
        });
    }

    // Determine outcome
    const rand = Math.random() * 100;
    let result;
    let botChoice = choices[Math.floor(Math.random() * choices.length)];

    if (rand < WIN_CHANCE.ULTIMATE_LOSE) result = "ultimate-lose";
    else if (rand < WIN_CHANCE.ULTIMATE_LOSE + WIN_CHANCE.LOSE) result = "lose";
    else result = "win";

    // Apply results
    if (result === "win") await AddToAsync(userId, { MAIN_CURRENCY: betAmount, GAMBLED: betAmount });
    else await AddToAsync(userId, { MAIN_CURRENCY: -betAmount });

    // Build description
    const playerText = betType.charAt(0).toUpperCase() + betType.slice(1);
    const botText = (result === "ultimate-lose")
        ? CommandTables.RPS[Math.floor(Math.random() * CommandTables.RPS.length)].replace('{amount}', `**${betAmount}**`)
        : botChoice.charAt(0).toUpperCase() + botChoice.slice(1);

    let description;
    switch (result) {
        case "win":
            description = ConfigManager.getMsg("ECONOMY.ROCK_PAPER_SCISSORS.MESSAGES.RESULT_WIN", { player: playerText, bot: botText, amount: betAmount });
            break;
        case "lose":
            description = ConfigManager.getMsg("ECONOMY.ROCK_PAPER_SCISSORS.MESSAGES.RESULT_LOSE", { player: playerText, bot: botText, amount: betAmount });
            break;
        case "ultimate-lose":
            description = ConfigManager.getMsg("ECONOMY.ROCK_PAPER_SCISSORS.MESSAGES.RESULT_ULTIMATE_LOSE", { player: playerText, bot: botText, amount: betAmount });
            break;
    }

    // Send embed
    const embed = new EmbedBuilder()
        .setColor(result === "win" ? 0x57F287 : 0xED4245)
        .setTitle('🎮 Rock-Paper-Scissors')
        .setDescription(description);

    await interaction.editReply({ embeds: [embed] });
}

module.exports = rps;