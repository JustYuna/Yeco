const { GetAsync, SetAsync, AddToAsync } = require('../../DataStorage/Datastore');
const Config = require("../../Core/config");
const CommandHelper = require("../../helpers//commandHelper");

const DICE = Config.ECONOMY.DICE
const { MAX_BET, MIN_BET } = DICE

function isWinningRoll(roll, betType) {
    if (["1","2","3","4","5","6"].includes(betType)) return roll === parseInt(betType);
    if (betType === "higher") return roll < 3;
    if (betType === "lower") return roll > 3;
    if (betType === "odd") return roll % 2 !== 0;
    if (betType === "even") return roll % 2 === 0;
    return false;
}

async function dice(interaction, client, betAmount, betType) {
    if (!interaction) return;
    const userId = interaction.user.id;

    let Balance = await GetAsync(userId, "MAIN_CURRENCY") || 0;
    await CommandHelper.VALIDATE_CURRENCY(interaction, betAmount, { min: MIN_BET, max: MAX_BET, userBalance: Balance, command: "dice" });


    const loseRate = 0.55; // 55% forced lose
    let roll;
    let win = false;
    let multiplier = 0;

    if (Math.random() < loseRate) {
        // Force a losing roll
        do {
            roll = Math.floor(Math.random() * 6) + 1;
        } while (isWinningRoll(roll, betType));
    } else {
        // Normal roll
        roll = Math.floor(Math.random() * 6) + 1;

        if (["1","2","3","4","5","6"].includes(betType)) {
            if (roll === parseInt(betType)) {
                win = true;
                multiplier = 6;
            }
        } else if (betType === "higher") {
            if (roll < 3) {
                win = true;
                multiplier = 3;
            }
        } else if (betType === "lower") {
            if (roll > 3) {
                win = true;
                multiplier = 1.5;
            }
        } else if (betType === "odd") {
            if (roll % 2 !== 0) {
                win = true;
                multiplier = 1.5;
            }
        } else if (betType === "even") {
            if (roll % 2 === 0) {
                win = true;
                multiplier = 1.5;
            }
        }
    }

    let resultMsg;
    if (win) {
        const winnings = Math.floor(betAmount * multiplier);
        await AddToAsync(userId, { MAIN_CURRENCY: winnings - betAmount });
        resultMsg = `🎲 You rolled **${roll}** and won **${winnings}**!`;
    } else {
        await AddToAsync(userId, { MAIN_CURRENCY: -betAmount });
        resultMsg = `🎲 You rolled **${roll}** and lost **${betAmount}**.`;
    }

    return interaction.editReply({ content: resultMsg });
}

module.exports = dice;