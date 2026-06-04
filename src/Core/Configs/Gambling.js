module.exports = {
    COINFLIP: {
        MIN_BET: 1,
        WIN_CHANCE: 40,
        LOSE_CHANCE: 60,
        ULTIMATE_LOSE_CHANCE: 10,
        RESPONSES: {
            WIN: [
                "{emoji_Gambled} The coin spins and lands on **{selection}**! You walked away with **{amount} {mainCurrency_name} {mainCurrency_emoji}**!",
                "{emoji_Gambled} Pure luck! **{selection}** was the winner, granting you **{amount} {mainCurrency_name} {mainCurrency_emoji}**.",
                "{emoji_Gambled} You beat the odds! The coin shows **{selection}**. You pocketed **{amount} {mainCurrency_name} {mainCurrency_emoji}**.",
                "{emoji_Gambled} Luck is on your side! **{selection}** lands face up, and you win **{amount} {mainCurrency_name} {mainCurrency_emoji}**!"
            ],
            LOSE: [
                "❌ Ouch. It landed on the opposite side. You lost your bet of **{amount} {mainCurrency_name}**.",
                "❌ The coin hit the floor and showed the wrong face. There goes **{amount} {mainCurrency_name}**.",
                "❌ Not your lucky day. You bet on {selection}, but the coin had other plans. (-**{amount}**)",
                "❌ Close, but no cigar. The house takes your **{amount} {mainCurrency_name}**.",
                "❌ You watched the coin spin... and watched your **{amount} {mainCurrency_name}** vanish."
            ],
            ULTIMATE_LOSE: [
                "💀 **CRITICAL FAIL:** The coin rolled into a sewer grate. You didn't just lose **{amount} {mainCurrency_name}**, you lost your dignity.",
                "💀 **BRUTAL:** The coin landed on its edge for a second before falling against you. The house laughs as they take your **{amount} {mainCurrency_name}**.",
                "💀 **BANKRUPT VIBES:** You bet big on {selection} and lost it all. Maybe it's time for a career change? (-**{amount}**)",
                "💀 **ROBBED:** The coin didn't even land; a seagull snatched it mid-air. That's **{amount} {mainCurrency_name}** you're never seeing again.",
                "💀 **DEVASTATED:** You put your heart into that flip, and the coin just broke it. You're out **{amount} {mainCurrency_name}**."
            ]
        }
    },

    SLOTS: {
        MIN_BET: 1,
        SYMBOLS: [
            { emoji: "{emoji_Carrot}", weight: 3, jackpot: 3 },
            { emoji: "{emoji_Lemon}", weight: 3, jackpot: 6 },
            { emoji: "{emoji_Blueberry}", weight: 2, jackpot: 9 },
            { emoji: "{emoji_RedLightning}", weight: 2, jackpot: 12 },
            { emoji: "{emoji_PurpleFire}", weight: 2, jackpot: 25 },
            { emoji: "{emoji_YellowStar}", weight: 1, jackpot: 45 },
            { emoji: "{emoji_BlueDiamond}", weight: 1, jackpot: 90 },
        ]
    },

    ROULETTE: {
        MIN_BET: 1,
        ROULETTE_NUMBERS: [
            "0", "32", "15", "19", "4", "21", "2", "25", "17", "34",
            "6", "27", "13", "36", "11", "30", "8", "23", "10", "5",
            "24", "16", "33", "1", "20", "14", "31", "9", "22", "18",
            "29", "7", "28", "12", "35", "3", "26"
        ],
        RED_NUMBERS: [ 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
        BET_TABLES: {
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
        },
        MESSAGES: {
            INVALID_BET_TYPE: "{emoji_UI_Cross} Invalid bet type!\nValid bet types: Red, Black, Even, Odd, Green, Number (0 - 36)",
            SPINNING_WHEEL: {
                color: [100, 200, 250],
                title: "🎡 The wheel is spinning",
                description: "{wheel}",
            },
            ROULETTE_WIN: {
                color: [100, 250, 100],
                title: "🎡 Roulette Result",
                description: "{wheel}",
                fields: [
                    { name: "Result:", value: "**{result}**", inline: true },
                    { name: "Bet:", value: "**{bet}**", inline: true },
                    { name: "Winnings:", value: "**{winnings}**", inline: true },
                ]
            },
            ROULETTE_LOSE: {
                color: [250, 100, 100],
                title: "🎡 Roulette Result",
                description: "{wheel}",
                fields: [
                    { name: "Result:", value: "**{result}**", inline: true },
                    { name: "Bet:", value: "**{bet}**", inline: true },
                    { name: "You lost:", value: "**{losings}**", inline: true },
                ]
            },
        }
    }
}