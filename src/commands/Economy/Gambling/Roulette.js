// Roulette.js

const { GetAsync, AddToAsync } = require('../../../DataStorage/Datastore');

const ConfigManager = require("../../../Core/configManager");
const CommandHelper = require("../../..//Utilities/CommandHelper");
const AbbreviateNumber = require("../../../Utilities/Format/AbbreviateNumber");

const {
    MIN_BET,
    ROULETTE_NUMBERS,
    RED_NUMBERS,
    BET_TABLES
} = ConfigManager.raw.GAMBLING.ROULETTE;

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
    if (!interaction) return;

    const userId = interaction.user.id;

    const currency =
        await GetAsync(userId, "MAIN_CURRENCY") || 0;

    const validationError =
        await CommandHelper.VALIDATE_CURRENCY(
            interaction,
            bet,
            {
                min: MIN_BET,
                userBalance: currency,
                command: "roulette"
            }
        );

    if (validationError) return;

    const betType =
        BET_TABLES[betInput?.toUpperCase()];

    let multiplier = 0;
    let numberTable = [];
    let betString = "";

    if (betType) {
        multiplier = betType.MULTIPLIER;
        numberTable = betType.TABLE;
        betString = betInput.toUpperCase();
    } else {
        if (
            betInput === undefined ||
            isNaN(betInput) ||
            betInput < 0 ||
            betInput > 36
        ) {
            return interaction.editReply(
                ConfigManager.getMsg(
                    "GAMBLING.ROULETTE.MESSAGES.INVALID_BET_TYPE"
                )
            );
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

    // Initial wheel
    await interaction.editReply({
        embeds: [
            ConfigManager.getEmbed(
                "GAMBLING.ROULETTE.MESSAGES.SPINNING_WHEEL",
                {
                    wheel: buildWheel(position)
                }
            )
        ]
    });

    // Fast animation (only 8 edits)
    const frames = 8;

    for (let i = 0; i < frames; i++) {
        position =
            (position + 3 + Math.floor(Math.random() * 3)) %
            ROULETTE_NUMBERS.length;

        await interaction.editReply({
            embeds: [
                ConfigManager.getEmbed(
                    "GAMBLING.ROULETTE.MESSAGES.SPINNING_WHEEL",
                    {
                        wheel: buildWheel(position)
                    }
                )
            ]
        });

        await sleep(75);
    }

    // Snap to result
    position = winningIndex;

    await interaction.editReply({
        embeds: [
            ConfigManager.getEmbed(
                "GAMBLING.ROULETTE.MESSAGES.SPINNING_WHEEL",
                {
                    wheel: buildWheel(position)
                }
            )
        ]
    });

    await sleep(300);

    let finalMessage;

    if (numberTable.includes(winningNumber)) {
        const winnings = bet * multiplier;
        const abbreviated =
            await AbbreviateNumber(winnings);

        await AddToAsync(userId, {
            MAIN_CURRENCY: winnings,
            GAMBLED: winnings / 2
        });

        finalMessage = ConfigManager.getEmbed(
            "GAMBLING.ROULETTE.MESSAGES.ROULETTE_WIN",
            {
                wheel: buildWheel(position),
                result: winningNumber,
                winnings: abbreviated,
                bet: betString
            }
        );
    } else {
        const abbreviated =
            await AbbreviateNumber(bet);

        await AddToAsync(userId, {
            MAIN_CURRENCY: -bet
        });

        finalMessage = ConfigManager.getEmbed(
            "GAMBLING.ROULETTE.MESSAGES.ROULETTE_LOSE",
            {
                wheel: buildWheel(position),
                result: winningNumber,
                losings: abbreviated,
                bet: betString
            }
        );
    }

    await interaction.editReply({
        content: "",
        embeds: [finalMessage]
    });
}

module.exports = roulette;