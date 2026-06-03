// Roulette.js

const { GetAsync, AddToAsync } = require('../../../DataStorage/Datastore');
const { EmbedBuilder } = require('discord.js');

const ConfigManager = require("../../../Core/configManager");
const CommandHelper = require("../../..//Utilities/CommandHelper");
const AbbreviateNumber = require("../../../Utilities/Format/AbbreviateNumber");

const MIN_BET = 100;

const ROULETTE_NUMBERS = [
    "0", "32", "15", "19", "4", "21", "2", "25", "17", "34",
    "6", "27", "13", "36", "11", "30", "8", "23", "10", "5",
    "24", "16", "33", "1", "20", "14", "31", "9", "22", "18",
    "29", "7", "28", "12", "35", "3", "26"
];

const RED_NUMBERS = [
    1, 3, 5, 7, 9, 12, 14, 16, 18,
    19, 21, 23, 25, 27, 30, 32, 34, 36
];

const BET_TABLES = {
    RED: {
        MULTIPLIER: 2,
        TABLE: [ 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
    },

    BLACK: {
        MULTIPLIER: 2,
        TABLE: [ 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35 ]
    },

    GREEN: {
        MULTIPLIER: 35,
        TABLE: [0]
    },

    EVEN: {
        MULTIPLIER: 2,
        TABLE: [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 ]
    },

    ODD: {
        MULTIPLIER: 2,
        TABLE: [ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35 ]
    },
};

function getColor(number) {
    if (number === "0") return "🟩";
    return RED_NUMBERS.includes(Number(number))
        ? "🟥"
        : "⬛";
}

function buildWheel(position) {
    const visible = [];

    for (let i = -3; i <= 3; i++) {
        const index =
            (position + i + ROULETTE_NUMBERS.length) %
            ROULETTE_NUMBERS.length;

        const num = ROULETTE_NUMBERS[index];
        const colored = `${getColor(num)}${num}`;

        if (i === 0)
            visible.push(`🔻 **${colored}** 🔻`);
        else
            visible.push(colored);
    }

    return visible.join(" | ");
}

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function roulette(interaction, client, { bet, betInput }) {
    console.log(bet, betInput);
    if (!interaction) return;

    const userId = interaction.user.id;

    let Currency = await GetAsync(userId, 'MAIN_CURRENCY') || 0;

    const validationError = await CommandHelper.VALIDATE_CURRENCY(
        interaction,
        bet,
        {
            min: MIN_BET,
            userBalance: Currency,
            command: "roulette"
        }
    );

    if (validationError) return;

    const betType = BET_TABLES[betInput.toUpperCase()];
    let multiplier = 0;
    let numberTable = [];
    let betString = "";

    if (betType) {
        multiplier = betType.MULTIPLIER;
        numberTable = betType.TABLE;
        betString = betInput.toUpperCase()
    } else {
        if (betInput === undefined || isNaN(betInput) || betInput < 0 || betInput > 36) {
            return interaction.editReply("Invalid bet type, please chose a valid bet type!");
        }
        
        multiplier = 35;
        numberTable = [Number(betInput)];
        betString = `${betInput}`;
    }

    const winningIndex = Math.floor(
        Math.random() * ROULETTE_NUMBERS.length
    );

    const winningNumber = Number(
        ROULETTE_NUMBERS[winningIndex]
    );

    let position = Math.floor(
        Math.random() * ROULETTE_NUMBERS.length
    );

    await interaction.editReply({
        content: `🎡 Spinning the roulette wheel...\n\n${buildWheel(position)}`
    });

    const totalSpins =
        25 + Math.floor(Math.random() * 15);

    // Fast spin
    for (let i = 0; i < totalSpins; i++) {
        position =
            (position + 1) %
            ROULETTE_NUMBERS.length;

        await interaction.editReply({
            content: `🎡 Spinning the roulette wheel...\n\n${buildWheel(position)}`
        });

        await sleep(75 + i * 10);
    }

    // Slow down and land on result
    while (position !== winningIndex) {
        position =
            (position + 1) %
            ROULETTE_NUMBERS.length;

        await interaction.editReply({
            content: `🎡 Spinning the roulette wheel...\n\n${buildWheel(position)}`
        });

        await sleep(200);
    }

    let finalMessage;

    if (numberTable.includes(winningNumber)) {
        const winnings = bet * multiplier;
        const abbreviated = await AbbreviateNumber(winnings);

        await AddToAsync(userId, {
            MAIN_CURRENCY: winnings,
            GAMBLED: winnings / 2
        });

        finalMessage =
            `🎡 Roulette Result\n\n` +
            `${buildWheel(position)}\n\n` +
            `🎉 The ball landed on **${winningNumber}**!\n` +
            `You won **${abbreviated}**!`;
    } else {
        const abbreviated = await AbbreviateNumber(bet);

        await AddToAsync(userId, {
            MAIN_CURRENCY: -bet
        });

        finalMessage =
            `🎡 Roulette Result\n\n` +
            `${buildWheel(position)}\n\n` +
            `💀 The ball landed on **${winningNumber}**.\n` +
            `Your guess was **${betString}**.\n` +
            `You lost **${abbreviated}**.`;
    }

    await interaction.editReply({
        content: ConfigManager.parseMsg(finalMessage)
    });
}

module.exports = roulette;