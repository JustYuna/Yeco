module.exports = {
    FACTORY: {
        LEVEL_LOCK: 12,
        LEVELS_MAP: {
            // Lv1: 0
            // Lv2: 10/min × 120 min = 1,200
            // Lv3: 35/min × 240 min = 8,400
            // Lv4: 100/min × 480 min = 48,000

            1: { INCOME_PER_MINUTE: 0, UPGRADE_PRICE: 50_000, MAX_AWAY_TIME: 1000 * 60 * 60 },   // 1hr
            2: { INCOME_PER_MINUTE: 10, UPGRADE_PRICE: 100_000, MAX_AWAY_TIME: 1000 * 60 * 120 }, // 2hr
            3: { INCOME_PER_MINUTE: 35, UPGRADE_PRICE: 250_000, MAX_AWAY_TIME: 1000 * 60 * 240 }, // 4hr
            4: { INCOME_PER_MINUTE: 100, UPGRADE_PRICE: 750_000, MAX_AWAY_TIME: 1000 * 60 * 480 }, // 8hr
        },
        MESSAGES: {
            UPGRADE_SUCESS: {
                title: "{emoji_GreenUpgrade} Upgrade success",
                fields: [
                    { name: "New level:", value: "**{new_level}**", inline: true },
                    { name: "Income per minute:", value: "**{income}**", inline: true },
                    { name: "Max offline time:", value: "**{max_away}**", inline: true },
                ]
            },
            UPGRADE_CANT_AFFORD: "{emoji_UI_Cross} You cannot afford this upgrade!\nYou are missing **{amount} {mainCurrency_name} {mainCurrency_emoji}**\n### *Only {mainCurrency_name} outside the bank can be used to upgrade.*",
            UPGRADE_MAXED: "{emoji_UI_Cross} Your factory is already at the maximum level!",
            VIEW: {
                title: "{emoji_Factory} Your factory",
                fields: [
                    { name: "Level:", value: "**{level}**", inline: true },
                    { name: "Income per minute:", value: "**{income}**", inline: true },
                    { name: "Max offline time:", value: "**{max_away}**", inline: true },
                    { name: "Expansion cost:", value: "**{cost}**", inline: true },
                ]
            },
            CLAIM: {
                title: "{emoji_Factory} You claimed your factoried income",
                fields: [
                    { name: "Time away:", value: "**{time_away}**", inline: true },
                    { name: "Earnings:", value: "**{earnings}**", inline: true },
                ]
            },
        }
    },

    WORK: {
        COMMAND_SETTINGS: {
            FARM: { LEVEL_LOCK: 0, MULTIPLIER: { CURRENCY: 1, EXPERIENCE: 1.25, COOLDOWN: 1 } },

            FISHING: { LEVEL_LOCK: 2, MULTIPLIER: { CURRENCY: 1.25, EXPERIENCE: 1.75, COOLDOWN: 1.5 } },
            HUNTING: { LEVEL_LOCK: 2, MULTIPLIER: { CURRENCY: 1.25, EXPERIENCE: 1.75, COOLDOWN: 1.5 } },

            MINING: { LEVEL_LOCK: 5, MULTIPLIER: { CURRENCY: 2, EXPERIENCE: 2.5, COOLDOWN: 2 } },
            CHOP: { LEVEL_LOCK: 5, MULTIPLIER: { CURRENCY: 2, EXPERIENCE: 2.5, COOLDOWN: 2 } },

            COOKING: { LEVEL_LOCK: 10, MULTIPLIER: { CURRENCY: 3, EXPERIENCE: 3.75, COOLDOWN: 3 } },
            SMITH: { LEVEL_LOCK: 10, MULTIPLIER: { CURRENCY: 3, EXPERIENCE: 3.75, COOLDOWN: 3 } },
        },

        RARITIES: {
            COMMON: { WORTH: 100, AMOUNT_MAX: 35, PERCENTAGE: 150, COOLDOWN: 30 },
            RARE: { WORTH: 500, AMOUNT_MAX: 20, PERCENTAGE: 75, COOLDOWN: 60 },
            EPIC: { WORTH: 1_000, AMOUNT_MAX: 12, PERCENTAGE: 20, COOLDOWN: 120 },
            LEGENDARY: { WORTH: 5_000, AMOUNT_MAX: 6, PERCENTAGE: 5, COOLDOWN: 300 },
            MYTHIC: { WORTH: 10_000, AMOUNT_MAX: 3, PERCENTAGE: 0.5, COOLDOWN: 600 }
        },

        MESSAGES: {
            EXPERIENCE_ATTACH: "\n{emoji_BlueStar} +{xp} XP",
            LEVEL_UP_ATTACH: ", {emoji_GreenUpgrade} Level Up! New lvl.: **{level}**",
            LUCKY_ATTACH: "\n✨ You have been realy lucky, keep it up!",

            PASSIVE_NOT_READY: "⏳ Command not ready\nCollect your rewards via `/passive` available in {time}s.",
            PASSIVE_READY: "📦 Your rewards are ready\nuse `/passive` to collect them!",
            PASSIVE_COLLECTED: "✅ **Collection Successful!**\n💰 You received **{total}** coins.\n{emoji_Box} **Jobs Finished: **{collected}**\n⏳ **Remaining Jobs: **{remaining}**",

            ACTION: { // ECONOMY.WORK.MESSAGES.ACTION
                FISHING: {
                    SUMMER: "{emoji_FishBait} You cast your line from the sun-drenched pier and caught **{material_amount}x {material}**! This **{rarity}** find earned you **{amount}**. \n⏳ Next cast available in: `{cooldownTime}`",
                    WINTER: "{emoji_FishBait} You drilled through the thick ice and pulled up **{material_amount}x {material}**! A **{rarity}** catch worth **{amount}**. \n⏳ Next cast available in: `{cooldownTime}`",
                    HALLOWEEN: "{emoji_FishBait} You cast into the glowing green swamp and snagged **{material_amount}x {material}**! This eerie **{rarity}** item sold for **{amount}**. \n⏳ Next cast available in: `{cooldownTime}`",
                    DEFAULT: "{emoji_FishBait} You spent some time by the water and caught **{material_amount}x {material}**! Your **{rarity}** loot earned you **{amount}**. \n⏳ Next cast available in: `{cooldownTime}`"
                },

                MINING: {
                    SUMMER: "⛏️ You braved the heat of the deep tunnels and found **{material_amount}x {material}**! This **{rarity}** ore is worth **{amount}**. \n⏳ Next swing available in: `{cooldownTime}`",
                    WINTER: "❄️ You shattered the permafrost to extract **{material_amount}x {material}**! A frosty **{rarity}** haul worth **{amount}**. \n⏳ Next swing available in: `{cooldownTime}`",
                    HALLOWEEN: "🏮 You cracked open a haunted vein and discovered **{material_amount}x {material}**! This spooky **{rarity}** find gave you **{amount}**. \n⏳ Next swing available in: `{cooldownTime}`",
                    DEFAULT: "⛏️ You descended into the mines and gathered **{material_amount}x {material}**! Your **{rarity}** discovery earned you **{amount}**. \n⏳ Next swing available in: `{cooldownTime}`"
                },

                COOKING: {
                    SUMMER: "🍳 You fired up the grill and served **{material_amount}x {material}**! This **{rarity}** dish earned you a tip of **{amount}**. \n⏳ Kitchen reopens in: `{cooldownTime}`",
                    WINTER: "🍲 You simmered a hearty winter stew of **{material_amount}x {material}**! A **{rarity}** meal worth **{amount}**. \n⏳ Kitchen reopens in: `{cooldownTime}`",
                    HALLOWEEN: "🧪 You stirred a bubbling cauldron and produced **{material_amount}x {material}**! This **{rarity}** concoction sold for **{amount}**. \n⏳ Kitchen reopens in: `{cooldownTime}`",
                    DEFAULT: "🍳 You donned your apron and cooked **{material_amount}x {material}**! Your **{rarity}** creation earned you **{amount}**. \n⏳ Kitchen reopens in: `{cooldownTime}`"
                },

                FARM: {
                    SUMMER: "{emoji_Wheat} You harvested **{material_amount}x {material}** under the blistering sun! This **{rarity}** yield earned you **{amount}**. \n⏳ Next harvest in: `{cooldownTime}`",
                    WINTER: "{emoji_Wheat} You cleared the snow to gather **{material_amount}x {material}**! A rare **{rarity}** winter crop worth **{amount}**. \n⏳ Next harvest in: `{cooldownTime}`",
                    HALLOWEEN: "{emoji_Wheat} You braved the cursed patch to pick **{material_amount}x {material}**! This **{rarity}** harvest gave you **{amount}**. \n⏳ Next harvest in: `{cooldownTime}`",
                    DEFAULT: "{emoji_Wheat} You worked the fields and gathered **{material_amount}x {material}**! Your **{rarity}** produce sold for **{amount}**. \n⏳ Next harvest in: `{cooldownTime}`"
                },

                HUNTING: {
                    SUMMER: "🏹 You tracked your prey through the thick brush and caught **{material_amount}x {material}**! This **{rarity}** trophy earned you **{amount}**. \n⏳ Next hunt in: `{cooldownTime}`",
                    WINTER: "❄️ Following tracks through the deep snow, you caught **{material_amount}x {material}**! A **{rarity}** catch worth **{amount}**. \n⏳ Next hunt in: `{cooldownTime}`",
                    HALLOWEEN: "🧛 You stalked a shadow beast and claimed **{material_amount}x {material}**! This **{rarity}** essence is worth **{amount}**. \n⏳ Next hunt in: `{cooldownTime}`",
                    DEFAULT: "🏹 You returned from the wild with **{material_amount}x {material}**! Your **{rarity}** hunt earned you **{amount}**. \n⏳ Next hunt in: `{cooldownTime}`"
                },

                CHOP: {
                    SUMMER: "{emoji_Axe} You felled sun-dried timber to get **{material_amount}x {material}**! This **{rarity}** wood earned you **{amount}**. \n⏳ Next swing in: `{cooldownTime}`",
                    WINTER: "{emoji_Axe} You split frozen logs to recover **{material_amount}x {material}**! A **{rarity}** haul worth **{amount}**. \n⏳ Next swing in: `{cooldownTime}`",
                    HALLOWEEN: "{emoji_Axe} You hacked at a gnarled, screaming tree for **{material_amount}x {material}**! This **{rarity}** lumber gave you **{amount}**. \n⏳ Next swing in: `{cooldownTime}`",
                    DEFAULT: "{emoji_Axe} You chopped down a sturdy tree and got **{material_amount}x {material}**! Your **{rarity}** work earned you **{amount}**. \n⏳ Next swing in: `{cooldownTime}`"
                },

                SMITH: {
                    SUMMER: "{emoji_Sword} You hammered away in the scorching heat to forge **{material_amount}x {material}**! This **{rarity}** craft sold for **{amount}**. \n⏳ Forge cools in: `{cooldownTime}`",
                    WINTER: "{emoji_Sword} Using the forge's heat against the chill, you made **{material_amount}x {material}**! A **{rarity}** piece worth **{amount}**. \n⏳ Forge cools in: `{cooldownTime}`",
                    HALLOWEEN: "{emoji_Sword} You hammered souls into iron to create **{material_amount}x {material}**! This **{rarity}** artifact earned you **{amount}**. \n⏳ Forge cools in: `{cooldownTime}`",
                    DEFAULT: "{emoji_Sword} You fired up the forge and crafted **{material_amount}x {material}**! Your **{rarity}** smithing earned you **{amount}**. \n⏳ Forge cools in: `{cooldownTime}`"
                }
            }
        },
    },

    BANK: {
        UPGRADES: {
            0: { NEXT_COST: 15_000, CAPACITY: 10_000 },
            1: { NEXT_COST: 45_000, CAPACITY: 30_000 },
            2: { NEXT_COST: 100_000, CAPACITY: 77_000 },
            3: { NEXT_COST: 250_000, CAPACITY: 222_000 },
            4: { NEXT_COST: 99_000_000_000, CAPACITY: 750_000 } // Maxed out
        },
        MESSAGES: {
            BANK_FULL: "{emoji_UI_Cross} Your bank is full, try upgrading it!",
            UPGRADE_CANT_AFFORD: "{emoji_UI_Cross} You cannot afford this upgrade!\nYou are missing **{amount} {mainCurrency_name} {mainCurrency_emoji}**\n### *Only {mainCurrency_name} outside the bank can be used to upgrade.*",
            UPGRADE_MAXED: "{emoji_UI_Cross} Your bank is already at maximum level!",
            DEPOSIT: "{emoji_UI_Plus} You deposited {amount} {mainCurrency_emoji} into the bank!\n- Deposited: **{newAmount} {mainCurrency_emoji}**",
            WITHDRAW: "{emoji_UI_Plus} You withdrew {amount} {mainCurrency_emoji} from the bank!\n- Deposited: **{newAmount} {mainCurrency_emoji}**",
            INVALID_AMOUNT: "{emoji_UI_Cross} Invalid amount specified!",
            VIEW: {
                title: "🏦 Bank",
                fields: [
                    { name: "Level", value: "**{level}**", inline: true },
                    { name: "Capacity", value: "**{capacity}**", inline: true },
                    { name: "Deposited", value: "**{deposited}**", inline: true },
                    { name: "Next Upgrade", value: "{next}", inline: false }
                ]
            },
            UPGRADE_SUCCESS: {
                title: "🏦 Upgrade Successful",
                description: "{emoji_UI_Plus} Your bank has been upgraded!",
                fields: [
                    { name: "New Level", value: "**{level}**", inline: true },
                    { name: "Capacity", value: "**{capacity}**", inline: true }
                ],
                footer: "Keep grinding 💰"
            }
        }
    },

    DAILY: {
        REWARD: {
            MIN: 1_000,
            MAX: 5_000,
            WEEKEND_MULTIPLIER: 1.5
        },
        MESSAGES: {
            ALREADY_CLAIMED: `{emoji_UI_Cross} You already used \`/daily\` today!\nNext claim at: {next_claim}`,
            RECIEVED: "{emoji_Calender} {mainCurrency_emoji} You received **{reward} {mainCurrency_name}**",
        }
    },

    GIFT: {
        MIN: 1,
        MAX: 5_000,
        MAX_RECIEVER: 100_000,
        MESSAGES: {
            EXCLUDED: "You cannot gift {mainCurrency_name} to this user.",
            TO_BOT: "You cannot gift {mainCurrency_name} to bots.",
            SUCCESS: "Successfully gifted {amount} {mainCurrency_name} to {username}!",
            TOO_RICH: "You cannot gift {mainCurrency_name} to {username} because they already have too much!",
            ONBOARDING: "You cannot gift to a user that has not completed the onboarding."
        }
    },

    WALLET: {
        MESSAGES: {
            IS_BOT: "{emoji_UI_Warn} You cannot view the wallet of a bot... everyone knows they cheat anyways."
        }
    }
}