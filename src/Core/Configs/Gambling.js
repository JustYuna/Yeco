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
}