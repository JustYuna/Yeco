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
        DATA: {
            kids: { NAME: "Kids", REQUIREMENT: 2_500, REWARD: { MIN: 1_750, MAX: 5_000 } },
            store: { NAME: "Store", REQUIREMENT: 10_000, REWARD: { MIN: 7_500, MAX: 17_500 } },
            warehouse: { NAME: "Warehouse", REQUIREMENT: 55_000, REWARD: { MIN: 35_000, MAX: 75_000 } },
            factory: { NAME: "Factory", REQUIREMENT: 125_000, REWARD: { MIN: 75_000, MAX: 175_000 } },
            goverment: { NAME: "goverment", REQUIREMENT: 350_000, REWARD: { MIN: 275_000, MAX: 450_000 } },
        },
        PERCENTAGE: 55,
        MESSAGES: {
            NOT_AN_OPTION: "No data found for option, report this via `/report` to get this error resolved.",
            NOT_ENOUGH: "{emoji_UI_Warn} You need a minimum of {amount} to rob {name}.",
            PLANNING_HEIST: "Planning the heist...",
            SUCCESS: {
                title: "💰 Heist Successful!",
                description: "{emoji_UI_Plus} Robbing succeeded!\nYou earned **{amount} {mainCurrency_name} {mainCurrency_emoji}** robbing **{target}**",
            },
            FAILED: {
                title: "🚔 Heist Failed",
                description: "{emoji_UI_Cross} Robbing failed...\nyou have been fined **{amount} {mainCurrency_name} {mainCurrency_emoji}** robbing **{target}**",
            }
        }
    },
}