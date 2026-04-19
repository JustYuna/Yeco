// config.js

require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
    CORE: {
        SETTINGS: {
            COMMANDS_PER_MINUTE: 10, // limits how many commands the user can send till timeout
            MAX_MEMORY_USAGE: 1024, // limites how much mb ram the bot is allowed to use

            DEBUG_MEMORY: false,
            DEVELOPER_MODE: false,
        },
        MESSAGES: {
            NOT_ENOUGH_CURRENCY: "❌ You do not have enough **{mainCurrency_name}** {mainCurrency_emoji} to perform this action!",
            MIN_CURRENCY_REQUIRED: "⚠️ You need a minimum of **{amount} {mainCurrency_name}** {mainCurrency_emoji}!",
            MAX_CURRENCY_ALLOWED: "🚫 You can only put a maximum of **{amount} {mainCurrency_name}** {mainCurrency_emoji}!",

            ACTION_COOLDOWN: "⏳ You are on cooldown for `{command}`. Please wait **{remainingSeconds}** second(s).",
            ACTION_UNAVAILABLE: "🛠️ This action is currently unavailable, please try again later.",
            ACTION_RATE_LIMIT: "⚠️ You are currently being rate limited... please wait a moment.",

            COMMAND_NOT_HIGH_ENOUGH_LEVEL: "⚠️ Your level is not high enough to use this command.\nRequired: **Level {level}**",
        },

        COMMAND_LEVEL_REQUIREMENT: {
            COOK: 0,
            MINE: 0,
            HUNT: 0,
            FISH: 0,

            CHOP: 5,
            FARM: 5,
            SMITH: 5,
        },

        EMOJIS: {
            // theme halloween
            Candy: "<:emoji_candycorn:1495154991135064115>",
            Bone: "<:emoji_bone:1495155425778339970>",
            // theme winter
            Snowflake: "<:emoji_snowflake:1495153925505159209>",
            Cookie: "<:emoji_cookie:1495152958529208544>",
            // theme default
            Coin: "<:emoji_gold_coin:1495152668325187604>",
            Gems: "<:emoji_blue_diamond:1495152785379950713>",

            // other
            Gambled: "<:emoji_spin_wheel:1495152525337428119>",

            // system
            UI_Info: "<:ui_info:1495149117347991682>",
            UI_Cross: "<:ui_cross:1495148489452290088>",
            UI_Warn: "<:ui_warn:1495148637993566399>",
            UI_Plus: "<:ui_plus:1495148566833004665>"
        },

        /* =========================================
                THEMES
        ========================================= */
        THEMES: {
            ACTIVE: "DEFAULT",

            // ------------------
            // -- HALLOWEEN
            // ------------------
            HALLOWEEN: {
                CURRENCY: {
                    MAIN: { NAME: "Candy", EMOJI: "{emoji_Candy}" },
                    SECONDARY: { NAME: "Bones", EMOJI: "{emoji_Bone}" },
                },
                COLORS: { MAIN: [250, 150, 0], SECONDARY: [50, 75, 100], ERROR: [250, 0, 0] },
                COMMANDS: {
                    HUNTING: {
                        ACTION_MESSAGE: "🏹 You stalked through the fog of the cursed woods...\nYou tracked down **{amount}x {material}** and sold the spoils for: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Scattered Lantern", WEIGHT: 40 },
                            { MATERIAL: "Shadow Bat", WEIGHT: 40 },
                            { MATERIAL: "Spooky Ghost", WEIGHT: 25 },
                            { MATERIAL: "Shadow Bat", WEIGHT: 20 },
                            { MATERIAL: "Cursed Scarecrow", WEIGHT: 15 },
                            { MATERIAL: "Ectoplasm Jar", WEIGHT: 12.5 },
                            { MATERIAL: "Headless Horseman", WEIGHT: 10 },
                            { MATERIAL: "Ancient Vampire", WEIGHT: 8 },
                            { MATERIAL: "Witch's Black Cat", WEIGHT: 5 },
                            { MATERIAL: "Werewolf Alpha", WEIGHT: 2 },
                            { MATERIAL: "Headless Horseman's Horse", WEIGHT: 1 },
                        ]
                    },
                    MINING: {
                        ACTION_MESSAGE: "⛏️ You swing your pickaxe into a cracked tombstone...\nYou unearthed **{amount}x {material}** and sold it for: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Pumpkin Shards", WEIGHT: 45 },
                            { MATERIAL: "Rusty Coffin", WEIGHT: 30 },
                            { MATERIAL: "Grave Dirt", WEIGHT: 30 },
                            { MATERIAL: "Cursed Gravel", WEIGHT: 30 },
                            { MATERIAL: "Brimstone", WEIGHT: 15 },
                            { MATERIAL: "Cursed Bones", WEIGHT: 10 },
                            { MATERIAL: "Cursed Gold", WEIGHT: 8 },
                            { MATERIAL: "Polished Onyx", WEIGHT: 5 },
                            { MATERIAL: "Soul Fragment", WEIGHT: 2 },
                            { MATERIAL: "Soul Amethyst", WEIGHT: 1 },
                            { MATERIAL: "Headless Uranium", WEIGHT: 0.5, TAG: ["LUCKY"] }
                        ]
                    },
                    FISHING: {
                        ACTION_MESSAGE: "🎣 You cast your line into the murky swamp waters...\nYou caught **{amount}x {material}** and sold it for: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Sunken Skeleton Hand", WEIGHT: 20 },
                            { MATERIAL: "Soggy Bandages", WEIGHT: 40 },
                            { MATERIAL: "Eerie Eel", WEIGHT: 25 },
                            { MATERIAL: "Mutated Piranha", WEIGHT: 20 },
                            { MATERIAL: "Bonefish", WEIGHT: 15 },
                            { MATERIAL: "Ghost Carp", WEIGHT: 10 },
                            { MATERIAL: "Glowing Jellyfish", WEIGHT: 8 },
                            { MATERIAL: "Cursed Anchor", WEIGHT: 2 },
                            { MATERIAL: "Kranken's Tentacle", WEIGHT: 1 },
                        ]
                    },
                    COOKING: {
                        ACTION_MESSAGE: "🍳 You stirred a bubbling cauldron over a green flame...\nYou prepared **{amount}x {material}** and sold them to hungry ghouls for: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Eyeball Cupcakes", WEIGHT: 45 },
                            { MATERIAL: "Witch's Brew", WEIGHT: 30 },
                            { MATERIAL: "Ghostly Pasta", WEIGHT: 15 },
                            { MATERIAL: "Spider-Cider", WEIGHT: 8 },
                            { MATERIAL: "Hellfire Peppers", WEIGHT: 2 }
                        ]
                    },

                    // ------------------
                    // -- LVL. 5+
                    // ------------------
                    CHOP: {
                        MULTIPLIERS: {
                            CASH: 2.5,
                            XP: 2
                        },
                        ACTION_MESSAGE: "🪓 You chopped through the haunted woods...\nAnd gathered **{amount}x {material}** and earned: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Dead Branch", WEIGHT: 50 },
                            { MATERIAL: "Rotten Log", WEIGHT: 50 },
                            { MATERIAL: "Twisted Oak", WEIGHT: 50 },

                            { MATERIAL: "Pumpkin Vine", WEIGHT: 25 },
                            { MATERIAL: "Cursed Sapling", WEIGHT: 25 },

                            { MATERIAL: "Blood Maple", WEIGHT: 20 },
                            { MATERIAL: "Spiderwood", WEIGHT: 15 },
                            { MATERIAL: "Haunted Birch", WEIGHT: 15 },

                            { MATERIAL: "Ghost Bark", WEIGHT: 10 },
                            { MATERIAL: "Witchwood", WEIGHT: 10 },
                            { MATERIAL: "Soul Branch", WEIGHT: 8 },

                            { MATERIAL: "Shadow Timber", WEIGHT: 7 },
                            { MATERIAL: "Phantom Root", WEIGHT: 6 },
                            { MATERIAL: "Coffin Wood", WEIGHT: 5 },

                            { MATERIAL: "Moonlit Bark", WEIGHT: 4 },
                            { MATERIAL: "Ancient Haunted Oak", WEIGHT: 3 },
                            { MATERIAL: "Spirit Branch", WEIGHT: 2 },

                            { MATERIAL: "Demonwood", WEIGHT: 1 },
                            { MATERIAL: "Vampire Root", WEIGHT: 0.75 },
                            { MATERIAL: "Pumpkin King's Tree", WEIGHT: 0.5 }
                        ]
                    },

                    FARM: {
                        MULTIPLIERS: {
                            CASH: 2.5,
                            XP: 2
                        },
                        ACTION_MESSAGE: "🌾 You harvested from the cursed fields...\nAnd collected **{amount}x {material}** and earned: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Rotten Wheat", WEIGHT: 50 },
                            { MATERIAL: "Ghost Corn", WEIGHT: 50 },
                            { MATERIAL: "Bone Carrot", WEIGHT: 50 },

                            { MATERIAL: "Bat Berry", WEIGHT: 25 },
                            { MATERIAL: "Poison Apple", WEIGHT: 25 },

                            { MATERIAL: "Pumpkin", WEIGHT: 20 },
                            { MATERIAL: "Witch Pepper", WEIGHT: 15 },
                            { MATERIAL: "Blood Tomato", WEIGHT: 15 },

                            { MATERIAL: "Shadow Berry", WEIGHT: 10 },
                            { MATERIAL: "Eyeball Plant", WEIGHT: 10 },
                            { MATERIAL: "Soul Mushroom", WEIGHT: 8 },

                            { MATERIAL: "Golden Pumpkin", WEIGHT: 7 },
                            { MATERIAL: "Cursed Root", WEIGHT: 6 },
                            { MATERIAL: "Ghoul Melon", WEIGHT: 5 },

                            { MATERIAL: "Crystal Pumpkin", WEIGHT: 4 },
                            { MATERIAL: "Moon Blossom", WEIGHT: 3 },
                            { MATERIAL: "Spirit Flower", WEIGHT: 2 },

                            { MATERIAL: "Necro Bloom", WEIGHT: 1 },
                            { MATERIAL: "Dragon Gourd", WEIGHT: 0.75 },
                            { MATERIAL: "Soul Seed", WEIGHT: 0.5 }
                        ]
                    },

                    SMITH: {
                        MULTIPLIERS: {
                            CASH: 2.5,
                            XP: 2
                        },
                        ACTION_MESSAGE: "⚒️ You forged cursed weaponry...\nAnd crafted **{amount}x {material}** and earned: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Rusty Knife", WEIGHT: 50 },
                            { MATERIAL: "Bone Sword", WEIGHT: 50 },
                            { MATERIAL: "Ghoul Shield", WEIGHT: 50 },

                            { MATERIAL: "Witch Dagger", WEIGHT: 25 },
                            { MATERIAL: "Cursed Blade", WEIGHT: 25 },

                            { MATERIAL: "Bat Axe", WEIGHT: 20 },
                            { MATERIAL: "Haunted Helmet", WEIGHT: 15 },
                            { MATERIAL: "Skull Crusher", WEIGHT: 15 },

                            { MATERIAL: "Pumpkin Cleaver", WEIGHT: 10 },
                            { MATERIAL: "Shadow Hammer", WEIGHT: 10 },
                            { MATERIAL: "Soul Shield", WEIGHT: 8 },

                            { MATERIAL: "Ruby Scythe", WEIGHT: 7 },
                            { MATERIAL: "Phantom Axe", WEIGHT: 6 },
                            { MATERIAL: "Blood Blade", WEIGHT: 5 },

                            { MATERIAL: "Crystal Reaper", WEIGHT: 4 },
                            { MATERIAL: "Moonsteel Scythe", WEIGHT: 3 },
                            { MATERIAL: "Ancient Boneblade", WEIGHT: 2 },

                            { MATERIAL: "Spirit Reaver", WEIGHT: 1 },
                            { MATERIAL: "Dragon Fang Blade", WEIGHT: 0.75 },
                            { MATERIAL: "Pumpkin King's Scythe", WEIGHT: 0.5 }
                        ]
                    },

                    WALLET: {
                        TITLE: "🎒 {username}'s Candy Basket",
                        THUMBNAIL: "{emoji_CandyBasket}", // If you have this emoji
                        FIELDS: {
                            CURRENCY: "💰 Currencies",
                            STATISTICS: "📊 Statistics",
                            STREAK: "🌟 Daily Streak",
                            INVENTORY: "📦 Collected Items"
                        }
                    },
                }
            },

            // ------------------
            // -- WINTER
            // ------------------
            WINTER: {
                CURRENCY: {
                    MAIN: { NAME: "Snowflakes", EMOJI: "{emoji_Snowflake}" },
                    SECONDARY: { NAME: "Cookies", EMOJI: "{emoji_Cookie}" },
                },
                COLORS: { MAIN: [0, 100, 200], SECONDARY: [50, 75, 100], ERROR: [250, 0, 0] },
                COMMANDS: {
                    HUNTING: {
                        ACTION_MESSAGE: "🏹 You trekked through the deep blizzard snow...\nYou tracked down **{amount}x {material}** and sold the spoils for: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Frozen Pinecone", WEIGHT: 40 },
                            { MATERIAL: "Arctic Fox", WEIGHT: 40 },
                            { MATERIAL: "Winter Owl", WEIGHT: 25 },
                            { MATERIAL: "Snow Hare", WEIGHT: 20 },
                            { MATERIAL: "Snow Golem Core", WEIGHT: 15 },
                            { MATERIAL: "Arctic Wolf Pelt", WEIGHT: 12 },
                            { MATERIAL: "Yeti Fur", WEIGHT: 10 },
                            { MATERIAL: "Reindeer Antler", WEIGHT: 8 },
                            { MATERIAL: "Frostwyrm Scale", WEIGHT: 5 },
                            { MATERIAL: "Ice Dragon Scale", WEIGHT: 2 },
                            { MATERIAL: "Frostwyrm Scale", WEIGHT: 1 },
                        ]
                    },
                    MINING: {
                        ACTION_MESSAGE: "⛏️ You crack through the permafrost with your pickaxe...\nYou unearthed **{amount}x {material}** and sold it for: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Snow", WEIGHT: 45 },
                            { MATERIAL: "Hardened Slush", WEIGHT: 40 },
                            { MATERIAL: "Ice", WEIGHT: 30 },
                            { MATERIAL: "Frozen Raw Iron", WEIGHT: 25 },
                            { MATERIAL: "Permafrost Ice", WEIGHT: 15 },
                            { MATERIAL: "Frozen Coal", WEIGHT: 15 },
                            { MATERIAL: "glacial Sapphire", WEIGHT: 10 },
                            { MATERIAL: "Glacial Crystal", WEIGHT: 8 },
                            { MATERIAL: "Ancient Mammoth Tusk", WEIGHT: 2 },
                            { MATERIAL: "Sugarcane Amethyst", WEIGHT: 1 },
                            { MATERIAL: "Stella Ice Crystal", WEIGHT: 0.5, TAG: ["LUCKY"] },
                            { MATERIAL: "Festive Uranium", WEIGHT: 0.25, TAG: ["LUCKY"] },
                        ]
                    },
                    FISHING: {
                        ACTION_MESSAGE: "🎣 You drop your line through a hole in the ice...\nYou caught **{amount}x {material}** and sold it for: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Ice Cube", WEIGHT: 40 },
                            { MATERIAL: "Frozen Sardine", WEIGHT: 25 },
                            { MATERIAL: "Arctic Char", WEIGHT: 15 },
                            { MATERIAL: "Frost-Scale Trout", WEIGHT: 10 },
                            { MATERIAL: "The Polar Star", WEIGHT: 2 }
                        ]
                    },
                    COOKING: {
                        ACTION_MESSAGE: "🍳 You warmed up the kitchen with a roaring fire...\nYou prepared **{amount}x {material}** and sold them to cold hikers for: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Burnt Marshemllows", WEIGHT: 50 },
                            { MATERIAL: "Peppermint Cocoa", WEIGHT: 45 },
                            { MATERIAL: "Gingerbread Men", WEIGHT: 30 },
                            { MATERIAL: "Peppermint Cocao", WEIGHT: 20 },
                            { MATERIAL: "Honey-Glazed Ham", WEIGHT: 15 },
                            { MATERIAL: "Spiced Apple Cider", WEIGHT: 10 },
                            { MATERIAL: "Cinnamon Churros", WEIGHT: 8 },
                            { MATERIAL: "Roast Turkey", WEIGHT: 5 },
                            { MATERIAL: "Roasted Chestnuts", WEIGHT: 2 }
                        ]
                    },

                    // ------------------
                    // -- LVL. 5+
                    // ------------------
                    CHOP: {
                        MULTIPLIERS: {
                            CASH: 2.5,
                            XP: 2
                        },
                        ACTION_MESSAGE: "🪓 You chopped frozen timber...\nAnd gathered **{amount}x {material}** and earned: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Frozen Stick", WEIGHT: 50 },
                            { MATERIAL: "Snowy Log", WEIGHT: 50 },
                            { MATERIAL: "Pine Tree", WEIGHT: 50 },

                            { MATERIAL: "Frost Branch", WEIGHT: 25 },
                            { MATERIAL: "Icy Oak", WEIGHT: 25 },

                            { MATERIAL: "Winter Birch", WEIGHT: 20 },
                            { MATERIAL: "Frozen Maple", WEIGHT: 15 },
                            { MATERIAL: "Glacier Wood", WEIGHT: 15 },

                            { MATERIAL: "White Pine", WEIGHT: 10 },
                            { MATERIAL: "Candy Cane Tree", WEIGHT: 10 },
                            { MATERIAL: "Frost Bark", WEIGHT: 8 },

                            { MATERIAL: "Crystal Timber", WEIGHT: 7 },
                            { MATERIAL: "Frozen Ebony", WEIGHT: 6 },
                            { MATERIAL: "Snow Blossom Tree", WEIGHT: 5 },

                            { MATERIAL: "Aurora Bark", WEIGHT: 4 },
                            { MATERIAL: "Ancient Icewood", WEIGHT: 3 },
                            { MATERIAL: "Moon Frost Tree", WEIGHT: 2 },

                            { MATERIAL: "Spirit Pine", WEIGHT: 1 },
                            { MATERIAL: "Dragon Frost Root", WEIGHT: 0.75 },
                            { MATERIAL: "World Frost Sapling", WEIGHT: 0.5 }
                        ]
                    },

                    FARM: {
                        MULTIPLIERS: {
                            CASH: 2.5,
                            XP: 2
                        },
                        ACTION_MESSAGE: "🌾 You harvested frozen crops...\nAnd collected **{amount}x {material}** and earned: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Frozen Wheat", WEIGHT: 50 },
                            { MATERIAL: "Ice Corn", WEIGHT: 50 },
                            { MATERIAL: "Snow Carrot", WEIGHT: 50 },

                            { MATERIAL: "Winter Potato", WEIGHT: 25 },
                            { MATERIAL: "Peppermint Leaf", WEIGHT: 25 },

                            { MATERIAL: "Snow Pumpkin", WEIGHT: 20 },
                            { MATERIAL: "Frozen Berry", WEIGHT: 15 },
                            { MATERIAL: "Ice Melon", WEIGHT: 15 },

                            { MATERIAL: "Blue Frostberry", WEIGHT: 10 },
                            { MATERIAL: "Cold Cabbage", WEIGHT: 10 },
                            { MATERIAL: "Sugar Cane", WEIGHT: 8 },

                            { MATERIAL: "Golden Snowcorn", WEIGHT: 7 },
                            { MATERIAL: "Crystal Carrot", WEIGHT: 6 },
                            { MATERIAL: "Giant Ice Pumpkin", WEIGHT: 5 },

                            { MATERIAL: "Glacier Berry", WEIGHT: 4 },
                            { MATERIAL: "Ancient Root", WEIGHT: 3 },
                            { MATERIAL: "Aurora Bloom", WEIGHT: 2 },

                            { MATERIAL: "Spirit Crop", WEIGHT: 1 },
                            { MATERIAL: "Dragonfruit Ice", WEIGHT: 0.75 },
                            { MATERIAL: "Winter Seed", WEIGHT: 0.5 }
                        ]
                    },

                    SMITH: {
                        MULTIPLIERS: {
                            CASH: 2.5,
                            XP: 2
                        },
                        ACTION_MESSAGE: "⚒️ You forged icy weaponry...\nAnd crafted **{amount}x {material}** and earned: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Iron Knife", WEIGHT: 50 },
                            { MATERIAL: "Frozen Sword", WEIGHT: 50 },
                            { MATERIAL: "Ice Shield", WEIGHT: 50 },

                            { MATERIAL: "Frost Dagger", WEIGHT: 25 },
                            { MATERIAL: "Steel Saber", WEIGHT: 25 },

                            { MATERIAL: "Frozen Axe", WEIGHT: 20 },
                            { MATERIAL: "Knight Helm", WEIGHT: 15 },
                            { MATERIAL: "War Hammer", WEIGHT: 15 },

                            { MATERIAL: "Crystal Sword", WEIGHT: 10 },
                            { MATERIAL: "Frost Hammer", WEIGHT: 10 },
                            { MATERIAL: "Ice Shield", WEIGHT: 8 },

                            { MATERIAL: "Ruby Blade", WEIGHT: 7 },
                            { MATERIAL: "Snow Hammer", WEIGHT: 6 },
                            { MATERIAL: "Diamond Greatblade", WEIGHT: 5 },

                            { MATERIAL: "Glacier Lance", WEIGHT: 4 },
                            { MATERIAL: "Ancient Frostblade", WEIGHT: 3 },
                            { MATERIAL: "Moonsteel Blade", WEIGHT: 2 },

                            { MATERIAL: "Spirit Forged Blade", WEIGHT: 1 },
                            { MATERIAL: "Dragon Ice Sword", WEIGHT: 0.75 },
                            { MATERIAL: "Legendary Frost Crown", WEIGHT: 0.5 }
                        ]
                    },

                    WALLET: {
                        TITLE: "❄️ {username}'s Winter Stash",
                        THUMBNAIL: "{emoji_Candy}", // Or a snowflake emoji if you have one
                        FIELDS: {
                            CURRENCY: "🧊 Frozen Assets",
                            STATISTICS: "📊 Winter Records",
                            STREAK: "🔥 Warmth Streak",
                            INVENTORY: "🎒 Sled Bag"
                        }
                    },
                }
            },

            // ------------------
            // -- DEFAULT
            // ------------------
            DEFAULT: {
                CURRENCY: {
                    MAIN: { NAME: "Coins", EMOJI: "{emoji_Coin}" },
                    SECONDARY: { NAME: "Gems", EMOJI: "{emoji_Gems}" },
                },
                COLORS: { MAIN: [0, 250, 250], SECONDARY: [250, 50, 160], ERROR: [250, 0, 0] },
                COMMANDS: {
                    HUNTING: {
                        ACTION_MESSAGE: "🏹 You ventured into the wild meadows...\nYou tracked down **{amount}x {material}** and sold the spoils for: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Feather", WEIGHT: 50 },
                            { MATERIAL: "Rabbit", WEIGHT: 45 },
                            { MATERIAL: "Pheasant", WEIGHT: 25 },
                            { MATERIAL: "Wild Boar", WEIGHT: 15 },
                            { MATERIAL: "Dear", WEIGHT: 12.5 },
                            { MATERIAL: "Capibara", WEIGHT: 10 },
                            { MATERIAL: "Majestic Stag", WEIGHT: 10 },
                            { MATERIAL: "Griffon", WEIGHT: 7.5 },
                            { MATERIAL: "Dixi Toilet", WEIGHT: 5 },
                            { MATERIAL: "Golden Eagle", WEIGHT: 4 },
                            { MATERIAL: "Ancient Silver Fox", WEIGHT: 1 },
                            { MATERIAL: "Pheonix", WEIGHT: 0.5, TAG: ["LUCKY"] },
                            { MATERIAL: "Unicorn", WEIGHT: 0.25, TAG: ["LUCKY"] },
                        ]
                    },
                    MINING: {
                        ACTION_MESSAGE: "⛏️ You swing your pickaxe deep into the cavern walls...\nYou unearthed **{amount}x {material}** and sold it for: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Grass", WEIGHT: 50, TAG: ["WORTHLESS"] },
                            { MATERIAL: "Stone", WEIGHT: 30 },
                            { MATERIAL: "Granite", WEIGHT: 30 },
                            { MATERIAL: "Diorite", WEIGHT: 30 },
                            { MATERIAL: "Gravel", WEIGHT: 30 },
                            { MATERIAL: "Coal", WEIGHT: 25 },
                            { MATERIAL: "Raw Copper", WEIGHT: 25 },
                            { MATERIAL: "Raw Iron", WEIGHT: 20 },
                            { MATERIAL: "Raw Gold", WEIGHT: 15 },
                            { MATERIAL: "Raw Chromium", WEIGHT: 15 },
                            { MATERIAL: "Raw Osmium", WEIGHT: 15 },
                            { MATERIAL: "Raw Tin", WEIGHT: 15 },
                            { MATERIAL: "Sulfur", WEIGHT: 10 },
                            { MATERIAL: "Iridium", WEIGHT: 10 },
                            { MATERIAL: "Slate", WEIGHT: 10 },
                            { MATERIAL: "Diamond", WEIGHT: 8 },
                            { MATERIAL: "Sapphire", WEIGHT: 5 },
                            { MATERIAL: "Emerald", WEIGHT: 5 },
                            { MATERIAL: "Ruby", WEIGHT: 5 },
                            { MATERIAL: "Mythdril", WEIGHT: 2 },
                            { MATERIAL: "Netherite", WEIGHT: 2 },
                            { MATERIAL: "Amethyst", WEIGHT: 1 },
                            { MATERIAL: "Uranium", WEIGHT: 0.5, TAG: ["LUCKY"] }
                        ]
                    },
                    FISHING: {
                        ACTION_MESSAGE: "🎣 You cast your line into the blue water...\nYou caught **{amount}x {material}** and sold it for: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Seaweed", WEIGHT: 40 },
                            { MATERIAL: "Kelp", WEIGHT: 40 },
                            { MATERIAL: "Old Sneaker", WEIGHT: 40 },
                            { MATERIAL: "Old High Heel", WEIGHT: 40 },
                            { MATERIAL: "Cod", WEIGHT: 30 },
                            { MATERIAL: "Rainbow Trout", WEIGHT: 20 },
                            { MATERIAL: "Salmon", WEIGHT: 15 },
                            { MATERIAL: "Anchor", WEIGHT: 10 },
                            { MATERIAL: "Tropical Fish", WEIGHT: 10 },
                            { MATERIAL: "Squid", WEIGHT: 10 },
                            { MATERIAL: "Shrimp", WEIGHT: 10 },
                            { MATERIAL: "Golden Carp", WEIGHT: 5 },
                            { MATERIAL: "Neptune's Trident", WEIGHT: 5 },
                            { MATERIAL: "Sunken Treasure Chest", WEIGHT: 1 },
                            { MATERIAL: "Pineapple House", WEIGHT: 0.25, TAG: ["LUCKY"] },
                            { MATERIAL: "Squidward", WEIGHT: 0.1, TAG: ["LUCKY"] },
                        ]
                    },
                    COOKING: {
                        ACTION_MESSAGE: "🍳 You worked a shift at the local bistro...\nYou prepared **{amount}x {material}** and earned: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Chocolate Chip Cookies", WEIGHT: 30 },
                            { MATERIAL: "Blueberry Pancakes", WEIGHT: 30 },
                            { MATERIAL: "Fruit Smoothie", WEIGHT: 25 },
                            { MATERIAL: "Banana Bread", WEIGHT: 20 },
                            { MATERIAL: "Butter Chicken", WEIGHT: 15 },
                            { MATERIAL: "Pasta", WEIGHT: 12.5 },
                            { MATERIAL: "Fish Fillet", WEIGHT: 10 },
                            { MATERIAL: "Steak au Poivre", WEIGHT: 10 },
                            { MATERIAL: "Filet Mignon", WEIGHT: 8 },
                            { MATERIAL: "Chocolate Soufflé", WEIGHT: 2 },
                            { MATERIAL: "Waffle", WEIGHT: 1 },
                            { MATERIAL: "Bagguete", WEIGHT: 0.5, TAG: ["LUCKY"] },
                        ]
                    },

                    // ------------------
                    // -- LVL. 5+
                    // ------------------
                    CHOP: {
                        MULTIPLIERS: {
                            CASH: 2.5,
                            XP: 2
                        },
                        ACTION_MESSAGE: "🪓 You vent into a forest...\nAnd chopped **{amount}x {material}** and earned: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Oak Tree", WEIGHT: 50 },
                            { MATERIAL: "Pine Tree", WEIGHT: 50 },
                            { MATERIAL: "Birch Tree", WEIGHT: 50 },

                            { MATERIAL: "Apple Tree", WEIGHT: 25 },
                            { MATERIAL: "Lemon Tree", WEIGHT: 25 },

                            { MATERIAL: "Red Maple Tree", WEIGHT: 20 },
                            { MATERIAL: "Sweetgum Tree", WEIGHT: 15 },
                            { MATERIAL: "Super Maple Tree", WEIGHT: 15 },

                            { MATERIAL: "White Oak Tree", WEIGHT: 10 },
                            { MATERIAL: "Willow Tree", WEIGHT: 10 },
                            { MATERIAL: "Cherry Blossom Tree", WEIGHT: 8 },

                            { MATERIAL: "Mahogany Tree", WEIGHT: 7 },
                            { MATERIAL: "Ebony Tree", WEIGHT: 6 },
                            { MATERIAL: "Golden Birch Tree", WEIGHT: 5 },

                            { MATERIAL: "Crystal Bark Tree", WEIGHT: 4 },
                            { MATERIAL: "Ancient Oak Tree", WEIGHT: 3 },
                            { MATERIAL: "Moonlit Willow", WEIGHT: 2 },

                            { MATERIAL: "Spiritwood Tree", WEIGHT: 1 },
                            { MATERIAL: "Dragonroot Tree", WEIGHT: 0.75 },
                            { MATERIAL: "World Tree Sapling", WEIGHT: 0.5 }
                        ]
                    },
                    FARM: {
                        MULTIPLIERS: {
                            CASH: 2.5,
                            XP: 2
                        },
                        ACTION_MESSAGE: "🌾 You worked on a farm...\nAnd harvested **{amount}x {material}** and earned: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Wheat", WEIGHT: 50 },
                            { MATERIAL: "Corn", WEIGHT: 50 },
                            { MATERIAL: "Carrot", WEIGHT: 50 },

                            { MATERIAL: "Potato", WEIGHT: 25 },
                            { MATERIAL: "Tomato", WEIGHT: 25 },

                            { MATERIAL: "Pumpkin", WEIGHT: 20 },
                            { MATERIAL: "Watermelon", WEIGHT: 15 },
                            { MATERIAL: "Strawberry", WEIGHT: 15 },

                            { MATERIAL: "Blueberry", WEIGHT: 10 },
                            { MATERIAL: "Cabbage", WEIGHT: 10 },
                            { MATERIAL: "Sugar Cane", WEIGHT: 8 },

                            { MATERIAL: "Golden Corn", WEIGHT: 7 },
                            { MATERIAL: "Purple Carrot", WEIGHT: 6 },
                            { MATERIAL: "Giant Pumpkin", WEIGHT: 5 },

                            { MATERIAL: "Crystal Berry", WEIGHT: 4 },
                            { MATERIAL: "Ancient Root", WEIGHT: 3 },
                            { MATERIAL: "Moon Blossom", WEIGHT: 2 },

                            { MATERIAL: "Spirit Crop", WEIGHT: 1 },
                            { MATERIAL: "Dragonfruit", WEIGHT: 0.75 },
                            { MATERIAL: "World Seed", WEIGHT: 0.5 }
                        ]
                    },
                    SMITH: {
                        MULTIPLIERS: {
                            CASH: 2.5,
                            XP: 2
                        },
                        ACTION_MESSAGE: "⚒️ You worked at the forge...\nAnd crafted **{amount}x {material}** and earned: **{totalValue} {mainCurrency_name}** {mainCurrency_emoji}",
                        RESOURCES: [
                            { MATERIAL: "Iron Dagger", WEIGHT: 50 },
                            { MATERIAL: "Iron Sword", WEIGHT: 50 },
                            { MATERIAL: "Iron Shield", WEIGHT: 50 },

                            { MATERIAL: "Steel Dagger", WEIGHT: 25 },
                            { MATERIAL: "Steel Sword", WEIGHT: 25 },

                            { MATERIAL: "Steel Shield", WEIGHT: 20 },
                            { MATERIAL: "Knight Helmet", WEIGHT: 15 },
                            { MATERIAL: "Battle Axe", WEIGHT: 15 },

                            { MATERIAL: "Golden Sword", WEIGHT: 10 },
                            { MATERIAL: "War Hammer", WEIGHT: 10 },
                            { MATERIAL: "Spiked Shield", WEIGHT: 8 },

                            { MATERIAL: "Ruby Blade", WEIGHT: 7 },
                            { MATERIAL: "Emerald Hammer", WEIGHT: 6 },
                            { MATERIAL: "Diamond Greatsword", WEIGHT: 5 },

                            { MATERIAL: "Crystal Lance", WEIGHT: 4 },
                            { MATERIAL: "Ancient Warblade", WEIGHT: 3 },
                            { MATERIAL: "Moonsteel Saber", WEIGHT: 2 },

                            { MATERIAL: "Spirit Forged Axe", WEIGHT: 1 },
                            { MATERIAL: "Dragonbone Blade", WEIGHT: 0.75 },
                            { MATERIAL: "Legendary Crownblade", WEIGHT: 0.5 }
                        ]
                    },

                    WALLET: {
                        TITLE: "👛 {username}'s Wallet",
                        THUMBNAIL: "{emoji_Coin}",
                        FIELDS: {
                            CURRENCY: "💵 Balance",
                            STATISTICS: "📈 Stats",
                            STREAK: "📅 Daily Login",
                            INVENTORY: "🎒 Inventory"
                        }
                    }
                }
            }
        },
    },

    PROGRESSION: {
        REWARDS: {
            WEIGHT: {
                BASE_WORTH: 10_000,
                WORTH_WEIGHT_CUT_ABOVE: { VALUE: 30, CUT: 3 },

                BASE_XP: 12_500,
                XP__WEIGHT_CUT_ABOVE: { VALUE: 30, CUT: 4 },

                BASE_AMOUNT: 1,
                MAX_AMOUNT: 25,
                AMOUNT_MAX_WEIGHT: 50,
                AMOUNT_VARIANCE: 0.1,
            }
        },
        LEVELS: {
            MAX_LEVEL: 50,
            XP_TABLE: { // level: xp needed
                0: 100, 1: 100, 2: 250, 3: 500, 4: 1_000, 5: 2_500, 6: 6_500, 7: 15_000, 8: 40_000, 9: 100_000,10: 225_000,
                11: 350_000, 12: 500_000, 13: 700_000, 14: 950_000, 15: 1_250_000, 16: 1_600_000, 17: 2_000_000, 18: 2_450_000, 19: 2_950_000, 20: 3_500_000,
                21: 4_100_000, 22: 4_750_000, 23: 5_450_000, 24: 6_200_000, 25: 7_000_000,
                26: 7_850_000,27: 8_750_000, 28: 9_700_000, 29: 10_700_000, 30: 11_750_000,
                31: 12_850_000, 32: 14_000_000, 33: 15_200_000, 34: 16_450_000, 35: 17_750_000,
                36: 19_100_000, 37: 20_500_000, 38: 21_950_000, 39: 23_450_000, 40: 25_000_000,
                41: 26_600_000, 42: 28_250_000, 43: 29_950_000, 44: 31_700_000, 45: 33_500_000,
                46: 35_350_000, 47: 37_250_000, 48: 39_200_000, 49: 41_200_000, 50: 43_250_000
            },
            REWARDS: { // level: cash multiplier in %
                0: 0, 1: 0, 2: 5, 3: 10, 4: 15, 5: 20,
                6: 25, 7: 30, 8: 35, 9: 40, 10: 45,
                11: 50, 12: 55, 13: 60, 14: 65, 15: 70,
                16: 75, 17: 80, 18: 85, 19: 90, 20: 95,
                21: 100, 22: 110, 23: 120, 24: 130, 25: 140,
                26: 150, 27: 160, 28: 170, 29: 180, 30: 190,
                31: 200, 32: 210, 33: 220, 34: 225, 35: 230,
                36: 235, 37: 240, 38: 245, 39: 247, 40: 248,
                41: 249, 42: 250, 43: 250, 44: 250, 45: 250,
                46: 250, 47: 250, 48: 250, 49: 250, 50: 250
            }
        }
    },

    ECONOMY: {

        // -------------------
        // BASE SECTION
        // -------------------

        WORK: {
            MESSAGES: {
                EXPERIENCE_ATTACH: "\n{emoji_UI_Plus} +{xp} XP",
                LEVEL_UP_ATTACH: ", {emoji_UI_Plus} Level Up! New lvl.: **{level}**",
                LUCKY_ATTACH: "\n✨ You have been realy lucky, keep it up!",
            }
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

        // -------------------
        // CRIME SECTION
        // -------------------

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

        DAILY: {
            REWARD: {
                MIN: 200,
                MAX: 400,
                WEEKEND_MULTIPLIER: 1.5
            },
            MESSAGES: {
                ALREADY_CLAIMED: `{emoji_UI_Cross} You already used \`/daily\` today!`,
                RECIEVED: "{mainCurrency_emoji} You received **{reward} {mainCurrency_name}**",
            }
        },

        GIFT: {
            MIN: 50,
            MAX: 5_000,
            MAX_RECIEVER: 100_000,
            EXCLUDE: [
                // Admins
                "656588010195910686", // Snuv
            ],

            MESSAGES: {
                EXCLUDED: "You cannot gift candy to this user.",
                TO_BOT: "You cannot gift candy to bots.",
                SUCCESS: "Successfully gifted {amount} {mainCurrency_name} to {username}!",
                TOO_RICH: "You cannot gift candy to {username} because they already have too much!"
            }
        },

        // -------------------
        // GAMBLING SECTION
        // -------------------

        ROCK_PAPER_SCISSORS: {
            MIN_BET: 50,
            MAX_BET: 50_000,
            WIN_CHANCE: { WIN: 40, LOSE: 50, ULTIMATE_LOSE: 10 },

            MESSAGES: {
                INVALID_CHOICE: "⚠️ Invalid choice. Pick one of: {choices}.",
                RESULT_WIN: "You: {player}\nBot: {bot}\n🎉 You win **{amount}** {mainCurrency_emoji}!",
                RESULT_LOSE: "You: {player}\nBot: {bot}\n😢 You lose **{amount}** {mainCurrency_emoji}.",
                RESULT_ULTIMATE_LOSE: "You: {player}\nBot: {bot}\n💀 Ultimate loss! You lose **{amount}** {mainCurrency_emoji}."
            },

            ULTIMATE_LOSE: [
                "a flip-flop",
                "grandma’s slipper",
                "a rubber duck",
                "your internet provider",
                "an angry goose",
                "Shrek",
                "a Windows update",
                "your last brain cell",
                "a Discord mod",
                "an Uno reverse card",
                "a screaming goat",
                "a cursed AI response",
            ]
        },

        SLOTS: {
            MIN_BET: 50,
            MAX_BET: 50_000,
            SYMBOLS: [
                { emoji: "🍒", weight: 3 },
                { emoji: "🍋", weight: 3 },
                { emoji: "🍉", weight: 2 },
                { emoji: "🍇", weight: 2 },
                { emoji: "🔔", weight: 2 },
                { emoji: "⭐", weight: 1 },
                { emoji: "💎", weight: 1 },
            ],
            JACKPOTS: {
                "🍒": 3,
                "🍋": 6,
                "🍉": 9,
                "🍇": 12,
                "🔔": 25,
                "⭐": 45,
                "💎": 90,
            }
        },

        DICE: {
            MIN_BET: 50,
            MAX_GET: 50_000,
        },
    },
    
    FUN: {
        BONK: {
            GIFS: [
                "https://tenor.com/view/bonk-meme-dog-gif-9935778472248450901",
                "https://tenor.com/view/bonk-gif-20931372",
                "https://tenor.com/view/chainsawman-anime-slap-gif-26953570",
                "https://tenor.com/view/bonk-pramod-bonk-gif-26084438",
                "https://tenor.com/view/chikku-neesan-girl-hit-wall-stfu-anime-girl-smack-gif-17078255",
                "https://tenor.com/view/hitoribocchi-bocchi-aru-aru-chan-hitoribocchi-aru-gif-14409897",
                "https://tenor.com/view/yuru-yuri-chinatsu-yoshikawa-anime-anime-girl-bonk-gif-23853785",
                "https://tenor.com/view/bonk-gif-19410756",
                "https://tenor.com/view/spongebob-meme-bonk-gif-24279189",
                "https://tenor.com/view/bonk-anime-bonk-anime-telepurte-gif-27011014",
                "https://tenor.com/view/bonk-gif-19823428",
                "https://tenor.com/view/hammer-bonk-nice-funny-meme-gif-17679897",
                "https://tenor.com/view/cat-hammer-cat-being-hit-on-the-head-with-a-hammer-monjjunirawr-silly-cat-cat-hammered-gif-10390299470246788991",
                "https://tenor.com/view/bonk-anime-bonk-anime-telepurte-gif-27011014",
                "https://tenor.com/view/anime-yuru-camp-bonk-inuko-inuyama-aoi-gif-26248050",
                "https://tenor.com/view/anime-manga-japanese-anime-japanese-manga-good-morning-gif-5373995",
                "https://tenor.com/view/anime-hit-slap-ouch-angry-gif-16268549",
                "https://tenor.com/view/anime-couple-gif-21797661",
                "https://tenor.com/view/yuuri-gif-5801403741788878996",
                "https://tenor.com/view/anime-hurt-ouch-owie-ow-gif-2131009854309987640",
                "https://tenor.com/view/anime-slap-anime-bonk-maomao-mao-mao-the-apothecary-diaries-gif-5846501696894609621",
                "https://tenor.com/view/anime-anime-bonk-bonk-chione-rin-gif-13725879436249041605",
                "https://tenor.com/view/cat-smacking-other-cat-cat-cat-smack-cat-swat-gif-10347810988835752163",
                "https://tenor.com/ekIvtuSuPis.gif",
                "https://media.tenor.com/b5tAzjbsG68AAAAM/minmi-bonk.gif",
                "https://media.tenor.com/OLujEp3SITwAAAAM/gura-%E3%81%90%E3%82%89.gif",
                "https://media.tenor.com/nRRVfDVrTksAAAAM/sengoku-youko-tsukiko.gif",
                "https://media.tenor.com/P3ncSta36A8AAAAM/miku-hatsune-miku.gif",
                "https://media.tenor.com/GnafzH7LqWsAAAAm/rina-bonk-love-live.webp",
                "https://media.tenor.com/vd9BRgtG56oAAAAm/pepe-bonk-bonk.webp"
            ],
        RESPONSES: [
            "🔨 {user} [bonked]({gif}) {target} into the next century!",
            "🌌 {user} [bonked]({gif}) {target} so hard they saw stars.",
            "🌕 {user} [bonked]({gif}) {target} all the way to the moon.",
            "💫 {user} [bonked]({gif}) {target} into another dimension!",
            "⚡ {user} [bonked]({gif}) {target} at lightning speed!",
            "🎯 {user} [bonked]({gif}) {target} with perfect accuracy!",
            "🪐 {user} [bonked]({gif}) {target} straight into orbit!",
            "🏏 A wild {user} appeared and [bonked]({gif}) {target}!",
        ]
        },

        HUG: {
            GIFS: [
                "https://tenor.com/view/hug-anime-comfy-cute-gif-5299348585618231224",
                "https://tenor.com/view/alice-vt-gif-25825873",
                "https://tenor.com/view/chikako-hugging-otohime-for-the-first-and-she-confused-gif-313471048803276179",
                "https://tenor.com/view/yukon-child-form-embracing-ulquiorra-gif-15599442819011505520",
                "https://tenor.com/view/hugtrip-gif-2490966530865073004",
                "https://tenor.com/view/%D8%AD%D8%B6%D9%86-%D8%A8%D9%88-gif-873756486592965272",
                "https://tenor.com/view/1053-dog-hug-friend-happy-gif-7124185793758437906",
                "https://tenor.com/view/monkey-hug-monkeys-hugging-golden-monkeys-gif-11103289529249683769",
                "https://tenor.com/view/hugtrip-gif-2490966530865073004",
                "https://tenor.com/view/chikako-hugging-otohime-for-the-first-and-she-confused-gif-313471048803276179",
                "https://tenor.com/view/anime-hug-anime-anime-girl-anime-girls-anime-girls-hugging-gif-26094816",
                "https://tenor.com/view/animehug-gif-4492243580644690368",
                "https://tenor.com/view/anime-hug-hugs-happy-hug-hug-friend-hug-gif-4606955245193927037",
                "https://tenor.com/view/fruits-basket-fruits-basket-anime-tohru-honda-gif-8076948538234069750",
            ],
            RESPONSES: [
                "🤗 {user} gave a warm [hug]({gif}) to {target}",
                "💖 {user} wrapped {target} in a big hug! [GIF]({gif})",
                "🌸 {user} hugs {target} gently [here]({gif})",
                "✨ {user} sends loving hugs to {target} [gif]({gif})",
            ]
        },
        
        PATPAT: {
            GIFS: [
                "https://tenor.com/view/pat-good-job-patpat-gif-25554349",
                "https://tenor.com/view/pat-dinosaurs-plushies-gif-24417567",
                "https://tenor.com/view/pat-cat-pat-pat-gif-25250101",
                "https://tenor.com/view/pat-pat-rapido-gif-15216826395550357389",
                "https://tenor.com/view/pat-pat-gif-17887147253868781702",
                "https://tenor.com/view/pet-gif-24168859",
                "https://tenor.com/view/anime-hug-anime-anime-girl-anime-girls-anime-girls-hugging-gif-26094816",
                "https://tenor.com/view/anime-good-girl-pet-pat-gif-9200932",
            ],
            RESPONSES: [
                "👏 {user} gave {target} some [patpats]({gif})",
                "✨ {user} gently pats {target} [here]({gif})",
                "🌸 {user} gives {target} a soft patpat [GIF]({gif})",
                "💫 {user} comforts {target} with a patpat [gif]({gif})",
                "🐾 {user} gives {target} affectionate pats [here]({gif})",
            ]
        },
        
        POKE: {
            GIFS: [
                "https://tenor.com/view/lol-gif-10326322287539089286",
                "https://tenor.com/view/mochi-poke-poke-cute-cat-cat-cartoon-gif-27137384",
                "https://tenor.com/view/bird-cute-poke-sweet-gif-16818145",
                "https://tenor.com/view/poke-the-bear-angry-gif-26844893", 
                "https://tenor.com/view/tag2-gif-25229282",
                "https://tenor.com/view/poke-eyes-gif-12619607009147797210",
                "https://tenor.com/view/cat-head-pat-poke-annoying-boop-gif-6808277743442463226",
                "https://tenor.com/view/nekone-utawarerumono-poke-anime-gif-26470052",
                "https://tenor.com/view/zakuro-cat-kitty-knead-kneading-gif-4180242096187015645",
                "https://tenor.com/view/marin-kitagawa-kitagawa-giggle-love-anime-gif-16415664153773123078",
                "https://tenor.com/view/vn-visual-novel-visual-novel-anime-gif-9884176409648718473",
                "https://tenor.com/view/yonomori-kobeni-anime-girl-poke-cheek-kobeni-mikakunin-de-shinkoukei-gif-9593787201996879155",
                "https://tenor.com/view/my-deer-friend-nokotan-noko-gif-13644573839223951462",
                "https://tenor.com/view/poke-anime-gif-22595069"
            ],
        RESPONSES: [
            "👉 {user} poked {target}! [GIF]({gif})",
            "😜 {user} gives a playful poke to {target} [here]({gif})",
            "🎯 {user} pokes {target} with precision! [gif]({gif})",
            "🤏 {user} pokes {target} gently [GIF]({gif})"
        ]
        },

        SHIP: {
            MESSAGE: "{emoji} The love compatibility between **{name1}** and **{name2}** is **{percentage}%**!",
            OVERWRITE: {
                [656588010195910686]: 0,
            }
        },

        TOWER: {
            BRICKS_PER_LAYER: 50,
            MESSAGE: "🧱 You have added 1 brick to the tower!\n**Layer:** {layer}\n**Total bricks:** {size}\n*[Each layer requires {needed} bricks]*"
        }
    }
}