module.exports = {
    LAUNDRY: {
        UPDATE_AFTER: 1000 * 60 * 20, // 20 Mins
        RATE_MAX: 35,
        RATE_LOWEST: 10,
        CATCH_CHANCE_BASE: 35, // If Rate: 10 then Catch Chance -10 // making is its easier on higher rates

        MESSAGES: {
            VIEW: {
                color: [100, 200, 250],
                title: "laundry rates",
                description: "",
                fields: [
                    { name: "Fee:", value: "{wash_rate}%", inline: true },
                    { name: "Catch chance", value: "{chance}%", inline: true }
                ]
            },
            WASHED: {
                color: [100, 250, 100],
                title: "Laundry washed",
                description: "",
                fields: [
                    { name: "Converted:", value: "{emoji_Skull} {washed} {secondaryCurrency_emoji}", inline: true },
                    { name: "Fee:", value: "{wash_rate} %", inline: true },
                    { name: "Received:", value: "{recieved} {mainCurrency_emoji}", inline: true }
                ]
            },
            CATCHED: {
                color: [250, 100, 100],
                title: "Laundry Failed!",
                description: "While laundering {amount} {secondaryCurrency_emoji}, the FBI kicked down your door and seized all the evidence before you could finish."
            },
        }
    },

    ROB: {
        MESSAGES: {
            FAIL: "{emoji_UI_Cross} You have been caught attempting to rob {target}!\nYou have been fined {mainCurrency_emoji} {fine} {mainCurrency_name}!",
            SUCCESS: "{emoji_UI_Plus} You successfully robbed {target} earning you {mainCurrency_emoji} {amount} {mainCurrency_name}!",
            REQUIREMENT: "{emoji_UI_Cross} You need min {mainCurrency_emoji} {amount} {mainCurrency_name} to rob this user.\n*Cooldown reset to 10s*",
            SHIELD_ACTIVE: "{emoji_UI_Cross} The target has a shield active, you can attack him again in {time}!",
            IS_BOT: "{emoji_UI_Cross} The target you are trying to rob is a bot... please dont do that.\n*Cooldown reset to 10s*",
            IS_YOU: "{emoji_UI_Cross} Did you realy just try to rob yourself... why?\n*Cooldown reset to 10s*",
        },

        REQUIREMENT_RATIO: 10, // Makes it so you need a ratio of what your target has that you want to rob
        LOSE_RATIO: { MIN: 5, MAX: 15 },// Ratio for stealing fail
        STEAL_RATIO: { MIN: 10, MAX: 25 }, // Ratio for stealing success
        SUCCESS_RATIO: { BASE: 0.4, VARIANCE: 0.1 },
    },


    HEIST: {
        REQUIREMENTS: {
            kids: 250,
            candy_shop: 750,
            warehouse: 1_500,
            candy_factory: 3_500,
            santa: 7_500
        },
        DIFFICULTY_DATA: {
            easy: { Reward: 0.5, Percentage: 50 },
            medium: { Reward: 1, Percentage: 65 },
            hard: { Reward: 1.5, Percentage: 80 },
        },
        MESSAGES: {
            SUCCESS: {
                title: "💰 Heist Successful!",
                description: "{emoji_UI_Plus} Robbing succeeded!\nYou earned **{amount} {mainCurrency_name} {mainCurrency_emoji}**",
                fields: [
                    { name: "Target", value: "{target}", inline: true },
                    { name: "Difficulty", value: "{difficulty}", inline: true }
                ]
            },
            FAILED: {
                title: "🚔 Heist Failed",
                description: "{emoji_UI_Cross} Robbing failed...\nyou have been fined **{amount} {mainCurrency_name} {mainCurrency_emoji}**",
                fields: [
                    { name: "Target", value: "{target}", inline: true },
                    { name: "Difficulty", value: "{difficulty}", inline: true }
                ]
            }
        }
    },
}