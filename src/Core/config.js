// config.js

require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
    CORE: {
        SETTINGS: {
            COMMANDS_PER_MINUTE: 10, // limits how many commands the user can send till timeout
            MAX_MEMORY_USAGE: 1024, // limits how much MB RAM the bot is allowed to use

            DEBUG_MEMORY: false,
            DEVELOPER_MODE: true,

            GUILD_CACHE_TTL: 10 * 60 * 1000, // 10 min
            GUILD_SIZE_IGNORE: [
                1231008556346773514 // SGA - Hangout (Core server for Yeco)
            ],
            GUILD_SIZE_SPEC: {
                SMALL: {
                    COUNT: 0,
                    LOCKOUT_NAME: "SMALL"
                },
                MEDIUM: {
                    COUNT: 100,
                    LOCKOUT_NAME: "MEDIUM"
                },
                LARGE: {
                    COUNT: 1000,
                    LOCKOUT_NAME: "LARGE"
                },
                HUGE: {
                    COUNT: 2500,
                    LOCKOUT_NAME: "HUGE"
                },
            }, // Limits what command can be used for what server
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
            // theme summer
            Shell: "<:emoji_shell:1496174039339765851>",
            Starfish: "<:emoji_starfish:1496174031987277884>",

            // default emojis
            Axe: "<:emoji_axe:1496163471530786827>",
            Sword: "<:emoji_sword:1496167584561631373>",
            FishBait: "<:emoji_bait:1496168209156538368>",
            Gambled: "<:emoji_spin_wheel:1495152525337428119>",
            Wheat: "<:emoji_wheat:1496169584347058306>",
            BlueStar: "<:emoji_blue_star:1496170019388915822>",
            GreenUpgrade: "<:emoji_green_upgrade:1496170310829871154>",
            PurpleToT: "<:emoji_purple_tot:1496172568128782419>",
            Trashcan: "<:emoji_trashcan:1496950798675083315>",
            Box: "<:emoji_box:1496951152120430602>",
            Calender: "<:emoji_calenders:1496979436510249071>",

            // social
            SOCIAL_Discord: "<:social_discord:1496168648283394171>",
            SOCIAL_X: "<:social_x:1496168595963777035>",

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
            ACTIVE: "SUMMER",
            // SUMMER, HALLOWEEN, WINTER, DEFAULT

            //#region SUMMER THEME
            SUMMER: {
                CURRENCY: {
                    MAIN: { NAME: "Shells", EMOJI: "{emoji_Shell}" },
                    SECONDARY: { NAME: "Starfish", EMOJI: "{emoji_Starfish}" },
                },
                COLORS: { 
                    MAIN: [255, 200, 50], // Bright Summer Yellow
                    SECONDARY: [0, 180, 220], // Ocean Blue
                    ERROR: [250, 0, 0] 
                },
                COMMANDS: {
                    HUNTING: {
                        RESOURCES: {
                            "COMMON": [
                                "Beach Crab",
                                "Sand Piper",
                                "Sea Gull",
                                "Stray Dog"
                            ],
                            "RARE": [
                                "Golden Retriever",
                                "Wild Iguana",
                                "Exotic Parrot",
                                "Flamingo"
                            ],
                            "EPIC": [
                                "Great White Shark",
                                "Manta Ray",
                                "Komodo Dragon",
                                "Sea Turtle"
                            ],
                            "LEGENDARY": [
                                "Ancient Sea Serpent",
                                "Golden Dolphin",
                                "The Kraken’s Kitten",
                                "Moby Dick"
                            ],
                            "MYTHIC": [
                                "A Shark with a Laser on its Head",
                                "A Seagull that stole your fries",
                                "The Loch Ness Monster on Vacation",
                                "A Bigfoot wearing Sunglasses"
                            ]
                        }
                    },
                    MINING: {
                        RESOURCES: {
                            "COMMON": [
                                "Wet Sand",
                                "Smooth Pebble",
                                "Coarse Gravel",
                                "Broken Sea Glass",
                                "Fish Alloy"
                            ],
                            "RARE": [
                                "Amber Chunk",
                                "Tropical Quartz",
                                "Coral Fragment",
                                "Limestone",
                                "Gold Fish Alloy"
                            ],
                            "EPIC": [
                                "Sunstone Crystal",
                                "Aquamarine Ore",
                                "Pure Salt Crystal",
                                "Volcanic Glass"
                            ],
                            "LEGENDARY": [
                                "Buried Pirate Gold",
                                "Ancient Sun-Dial",
                                "Neptune’s Pearl",
                                "Molten Core"
                            ],
                            "MYTHIC": [
                                "A Literal Sun-Beam",
                                "A Sandcastle that won't fall",
                                "The Forbidden Dry Sand",
                                "Fishium"
                            ]
                        }
                    },
                    FISHING: {
                        RESOURCES: {
                            "COMMON": [
                                "Sardine",
                                "Plastic Cup",
                                "Seaweed Bundle",
                                "Rusty Can"
                            ],
                            "RARE": [
                                "Blue Marlin",
                                "Yellow-Fin Tuna",
                                "Clownfish",
                                "Blowfish"
                            ],
                            "EPIC": [
                                "Swordfish",
                                "Electric Eel",
                                "Giant Squid Tentacle",
                                "Hammerhead Shark"
                            ],
                            "LEGENDARY": [
                                "Atlantis Coin",
                                "King Neptune's Fin",
                                "The Golden Guppy",
                                "Living Coral Reef"
                            ],
                            "MYTHIC": [
                                "A Message in a Bottle from 1995",
                                "SpongeBob’s Spatula",
                                "A Fish with human legs",
                                "The ‘One that got away’"
                            ]
                        }
                    },
                    COOKING: {
                        RESOURCES: {
                            "COMMON": [
                                "Burnt Hotdog",
                                "Corn on the Cob",
                                "Ice-Cream Sandwich",
                                "Fruit Salad"
                            ],
                            "RARE": [
                                "Gourmet Burger",
                                "Pineapple Pizza",
                                "Grilled Shrimp Skewers",
                                "Pulled Pork Slider"
                            ],
                            "EPIC": [
                                "Lobster Tail",
                                "Wagyu Steak",
                                "Tropical Parfait",
                                "Seafood Paella"
                            ],
                            "LEGENDARY": [
                                "The Ultimate BBQ Ribs",
                                "Ambrosia Nectar",
                                "Golden Pineapple Cake",
                                "Liquid Sunshine Cocktail"
                            ],
                            "MYTHIC": [
                                "A Burger that never ends",
                                "Watermelon without seeds",
                                "Edible Sunscreen (Don't try this)",
                                "A Cloud in a Cone"
                            ]
                        }
                    },
                    CHOP: {
                        MULTIPLIER: "LVL_5",
                        RESOURCES: {
                            "COMMON": [
                                "Palm Leaf",
                                "Driftwood",
                                "Bamboo Stick",
                                "Coconut Husk"
                            ],
                            "RARE": [
                                "Teak Wood",
                                "Mahogany Branch",
                                "Rubber Tree Sap",
                                "Acacia Log"
                            ],
                            "EPIC": [
                                "Jungle Vine",
                                "Ebony Bark",
                                "Ancient Fern",
                                "Flowering Hibiscus Wood"
                            ],
                            "LEGENDARY": [
                                "Spirit Palm Wood",
                                "Golden Banyan Root",
                                "World Tree Sapling",
                                "Sun-Soaked Ironwood"
                            ],
                            "MYTHIC": [
                                "A Tree that grows Money",
                                "A Giant Celery Stalk",
                                "The Tree of Eternal Summer",
                                "A Vertical Beach Umbrella"
                            ]
                        }
                    },
                    FARM: {
                        MULTIPLIER: "LVL_5",
                        RESOURCES: {
                            "COMMON": [
                                "Sweet Corn",
                                "Juicy Tomato",
                                "Watermelon Slice",
                                "Bell Pepper"
                            ],
                            "RARE": [
                                "Golden Pineapple",
                                "Dragonfruit",
                                "Mango",
                                "Passionfruit"
                            ],
                            "EPIC": [
                                "Starfruit",
                                "Blue Java Banana",
                                "Sun-Kissed Strawberry",
                                "Miracle Berry"
                            ],
                            "LEGENDARY": [
                                "Crystal Kiwi",
                                "Rainbow Corn",
                                "Glow-in-the-dark Melon",
                                "Solar Sunflower"
                            ],
                            "MYTHIC": [
                                "The Last Remaining Twinkie",
                                "A Square Watermelon",
                                "Exploding Grapes",
                                "A Pizza-Flavored Carrot"
                            ]
                        }
                    },
                    SMITH: {
                        MULTIPLIER: "LVL_5",
                        RESOURCES: {
                            "COMMON": [
                                "Sand Shovel",
                                "Shell Dagger",
                                "Wooden Buckler",
                                "Stone Spear"
                            ],
                            "RARE": [
                                "Bronze Trident",
                                "Coral Sword",
                                "Shark-Tooth Blade",
                                "Obsidian Knife"
                            ],
                            "EPIC": [
                                "Steel Scimitar",
                                "Pearl-Encrusted Shield",
                                "Volcanic Hammer",
                                "Whalebone Bow"
                            ],
                            "LEGENDARY": [
                                "Poseidon’s Spear",
                                "The Sun-Blade",
                                "Tidal Wave Axe",
                                "Atlantis Plate Armor"
                            ],
                            "MYTHIC": [
                                "A Sharpened Surfboard",
                                "The Ban-Hammer",
                                "A Sword made of Hardened Jell-O",
                                "A Water Gun that shoots real fire"
                            ]
                        }
                    },
                    WALLET: {
                        TITLE: "🏖️ {username}'s Beach Bag",
                        THUMBNAIL: "{emoji_Shell}",
                        FIELDS: {
                            CURRENCY: "💰 Beach Funds",
                            STATISTICS: "📊 Summer Records",
                            STREAK: "☀️ Heat Streak",
                            INVENTORY: "📦 Picnic Basket"
                        }
                    }
                }
            },
            //#endregion

            //#region HALLOWEEN THEME
            HALLOWEEN: {
                CURRENCY: {
                    MAIN: { NAME: "Candy", EMOJI: "{emoji_Candy}" },
                    SECONDARY: { NAME: "Bones", EMOJI: "{emoji_Bone}" },
                },
                COLORS: { 
                    MAIN: [250, 150, 0], 
                    SECONDARY: [50, 75, 100], 
                    ERROR: [250, 0, 0] 
                },
                COMMANDS: {
                    HUNTING: {
                        RESOURCES: {
                            "COMMON": [
                                "Scattered Lantern",
                                "Shadow Bat",
                                "Spooky Ghost",
                                "Black Cat"
                            ],
                            "RARE": [
                                "Cursed Scarecrow",
                                "Ectoplasm Jar",
                                "Ancient Vampire",
                                "Werewolf Alpha"
                            ],
                            "EPIC": [
                                "Headless Horseman",
                                "Banshee's Veil",
                                "Graveyard Ghoul",
                                "Shadow Stalker"
                            ],
                            "LEGENDARY": [
                                "Headless Horseman's Horse",
                                "Grim Reaper",
                                "The Great Pumpkin",
                                "Ancient Lich"
                            ],
                            "MYTHIC": [
                                "A Skeleton playing the Trumpet",
                                "The Monster Mash (It's a graveyard smash)",
                                "A Vampire with Sparkles",
                                "The IRS (Truly terrifying)"
                            ]
                        }
                    },
                    MINING: {
                        RESOURCES: {
                            "COMMON": [
                                "Pumpkin Shards",
                                "Grave Dirt",
                                "Rusty Coffin",
                                "Cursed Gravel"
                            ],
                            "RARE": [
                                "Brimstone",
                                "Cursed Bones",
                                "Cursed Gold",
                                "Polished Onyx"
                            ],
                            "EPIC": [
                                "Soul Fragment",
                                "Soul Amethyst",
                                "Ghostly Granite",
                                "Petrified Eye"
                            ],
                            "LEGENDARY": [
                                "Headless Uranium",
                                "Demon Core",
                                "Hellstone",
                                "Cursed Diamond"
                            ],
                            "MYTHIC": [
                                "A Rock that looks like a Face",
                                "The Bottomless Pit",
                                "A Jar of Nightmare Fuel",
                                "Satan's Paperweight"
                            ]
                        }
                    },
                    FISHING: {
                        RESOURCES: {
                            "COMMON": [
                                "Sunken Skeleton Hand",
                                "Soggy Bandages",
                                "Eerie Eel",
                                "Mutated Piranha"
                            ],
                            "RARE": [
                                "Bonefish",
                                "Ghost Carp",
                                "Glowing Jellyfish",
                                "Cursed Anchor"
                            ],
                            "EPIC": [
                                "Kraken's Tentacle",
                                "Swamp Thing's Left Toe",
                                "Drowned King's Crown",
                                "Soul-Stealing Salmon"
                            ],
                            "LEGENDARY": [
                                "Ghost Ship Anchor",
                                "Abyssal Horror",
                                "Leviathan Scale",
                                "The Flying Dutchman's Steering Wheel"
                            ],
                            "MYTHIC": [
                                "A Message in a Bottle from your Ex",
                                "The Loch Ness Monster (He needs $3.50)",
                                "A Wet Sock",
                                "SpongeBob's Spooky Costume"
                            ]
                        }
                    },
                    COOKING: {
                        RESOURCES: {
                            "COMMON": [
                                "Eyeball Cupcakes",
                                "Witch's Brew",
                                "Ghostly Pasta",
                                "Spider-Cider"
                            ],
                            "RARE": [
                                "Hellfire Peppers",
                                "Poison Candy Apple",
                                "Deviled Eggs (Literally)",
                                "Bat-Wing Soup"
                            ],
                            "EPIC": [
                                "Brain Pudding",
                                "Finger Sandwiches (Actual Fingers)",
                                "Monster Mash Potatoes",
                                "Cursed Curry"
                            ],
                            "LEGENDARY": [
                                "Soul-Stuffed Turkey",
                                "Phoenix Wing Hot Sauce",
                                "Eldritch Omelette",
                                "Dragon Blood Wine"
                            ],
                            "MYTHIC": [
                                "A Canned Ghost",
                                "Mystery Meat (Don't ask)",
                                "The Forbidden Fruit Fruit-Loop",
                                "Invisible Steak"
                            ]
                        }
                    },
                    CHOP: {
                        MULTIPLIER: "LVL_5",
                        RESOURCES: {
                            "COMMON": [
                                "Dead Branch",
                                "Rotten Log",
                                "Twisted Oak",
                                "Pumpkin Vine"
                            ],
                            "RARE": [
                                "Blood Maple",
                                "Spiderwood",
                                "Haunted Birch",
                                "Cursed Sapling"
                            ],
                            "EPIC": [
                                "Ghost Bark",
                                "Witchwood",
                                "Soul Branch",
                                "Shadow Timber"
                            ],
                            "LEGENDARY": [
                                "Moonlit Bark",
                                "Ancient Haunted Oak",
                                "Demonwood",
                                "Pumpkin King's Tree"
                            ],
                            "MYTHIC": [
                                "The Whomping Willow",
                                "A Tree made of Broccoli",
                                "The Tree of Regret",
                                "A Cardboard Cutout of a Forest"
                            ]
                        }
                    },
                    FARM: {
                        MULTIPLIER: "LVL_5",
                        RESOURCES: {
                            "COMMON": [
                                "Rotten Wheat",
                                "Ghost Corn",
                                "Bone Carrot",
                                "Bat Berry"
                            ],
                            "RARE": [
                                "Poison Apple",
                                "Pumpkin",
                                "Witch Pepper",
                                "Blood Tomato"
                            ],
                            "EPIC": [
                                "Shadow Berry",
                                "Eyeball Plant",
                                "Soul Mushroom",
                                "Golden Pumpkin"
                            ],
                            "LEGENDARY": [
                                "Crystal Pumpkin",
                                "Moon Blossom",
                                "Necro Bloom",
                                "Soul Seed"
                            ],
                            "MYTHIC": [
                                "Angry Potatoes",
                                "Sentient Corn (It watches you)",
                                "The Forbidden Bean",
                                "A Single Blue Raspberry"
                            ]
                        }
                    },
                    SMITH: {
                        MULTIPLIER: "LVL_5",
                        RESOURCES: {
                            "COMMON": [
                                "Rusty Knife",
                                "Bone Sword",
                                "Ghoul Shield",
                                "Witch Dagger"
                            ],
                            "RARE": [
                                "Cursed Blade",
                                "Bat Axe",
                                "Haunted Helmet",
                                "Skull Crusher"
                            ],
                            "EPIC": [
                                "Pumpkin Cleaver",
                                "Shadow Hammer",
                                "Soul Shield",
                                "Ruby Scythe"
                            ],
                            "LEGENDARY": [
                                "Crystal Reaper",
                                "Moonsteel Scythe",
                                "Spirit Reaver",
                                "Pumpkin King's Scythe"
                            ],
                            "MYTHIC": [
                                "A Spatula of Doom",
                                "A Sword made of Hard Candy",
                                "The Key to Your Heart (It's rusty)",
                                "A Lighthearted Saber"
                            ]
                        }
                    },
                    WALLET: {
                        TITLE: "🎒 {username}'s Candy Basket",
                        THUMBNAIL: "{emoji_PurpleToT}",
                        FIELDS: {
                            CURRENCY: "💰 Currencies",
                            STATISTICS: "📊 Statistics",
                            STREAK: "🌟 Daily Streak",
                            INVENTORY: "📦 Collected Items"
                        }
                    }
                }
            },
            //#endregion

            //#region WINTER THEME
            WINTER: {
                CURRENCY: {
                    MAIN: { NAME: "Snowflakes", EMOJI: "{emoji_Snowflake}" },
                    SECONDARY: { NAME: "Cookies", EMOJI: "{emoji_Cookie}" },
                },
                COLORS: { MAIN: [0, 100, 200], SECONDARY: [50, 75, 100], ERROR: [250, 0, 0] },
                COMMANDS: {
                    HUNTING: {
                        RESOURCES: {
                            "COMMON": [
                                "Frozen Pinecone",
                                "Arctic Fox",
                                "Winter Owl",
                                "Snow Hare"
                            ],
                            "RARE": [
                                "Snow Golem Core",
                                "Arctic Wolf Pelt",
                                "Reindeer Antler",
                                "Yeti Fur"
                            ],
                            "EPIC": [
                                "Frostwyrm Scale",
                                "White Stag",
                                "Snow Leopard",
                                "Hibernating Bear"
                            ],
                            "LEGENDARY": [
                                "Ice Dragon Scale",
                                "Crystal Phoenix",
                                "Ancient Mammoth",
                                "The Abominable Snowman"
                            ],
                            "MYTHIC": [
                                "A Penguin in a Business Suit",
                                "The Ghost of Christmas Past",
                                "A Sentient Snowball with an Attitude",
                                "Jack Frost’s Left Sock"
                            ]
                        }
                    },
                    MINING: {
                        RESOURCES: {
                            "COMMON": [
                                "Snow",
                                "Hardened Slush",
                                "Ice",
                                "Frozen Gravel"
                            ],
                            "RARE": [
                                "Frozen Raw Iron",
                                "Frozen Coal",
                                "Permafrost Ice",
                                "Compressed Hailstone"
                            ],
                            "EPIC": [
                                "Glacial Sapphire",
                                "Glacial Crystal",
                                "Ancient Mammoth Tusk",
                                "Ever-Frozen Emerald"
                            ],
                            "LEGENDARY": [
                                "Sugarcane Amethyst",
                                "Stella Ice Crystal",
                                "Festive Uranium",
                                "Pure Liquid Nitrogen"
                            ],
                            "MYTHIC": [
                                "A Block of 'Yellow Snow' (Do not eat)",
                                "A Frozen Caveman's Club",
                                "The Core of the North Pole",
                                "The ‘Ice’ from a 90s Rapper’s Chain"
                            ]
                        }
                    },
                    FISHING: {
                        RESOURCES: {
                            "COMMON": [
                                "Ice Cube",
                                "Frozen Sardine",
                                "Old Mittens",
                                "Seaweed Popsicle"
                            ],
                            "RARE": [
                                "Arctic Char",
                                "Frost-Scale Trout",
                                "Chilled Cod",
                                "Frozen Boot"
                            ],
                            "EPIC": [
                                "The Polar Star",
                                "Diamond-Back Sturgeon",
                                "Glacier Jellyfish",
                                "Ancient Frozen Anchor"
                            ],
                            "LEGENDARY": [
                                "Iceberg Lobster",
                                "Abyssal Frost-Eel",
                                "Sunken Sled",
                                "Poseidon’s Frozen Fork"
                            ],
                            "MYTHIC": [
                                "The Titanic (Small Version)",
                                "A Fish wearing a tiny Scarf",
                                "Santa’s Missing Naughty List",
                                "A Literal Block of Dry Ice"
                            ]
                        }
                    },
                    COOKING: {
                        RESOURCES: {
                            "COMMON": [
                                "Burnt Marshmallows",
                                "Peppermint Cocoa",
                                "Gingerbread",
                                "Honey-Glazed Ham"
                            ],
                            "RARE": [
                                "Spiced Apple Cider",
                                "Cinnamon Churros",
                                "Roast Turkey",
                                "Roasted Chestnuts"
                            ],
                            "EPIC": [
                                "Candycane Colored French Bread",
                                "Glacier Mint Sorbet",
                                "Star-Shaped Sugar Cookies",
                                "Slow-Roasted Venison"
                            ],
                            "LEGENDARY": [
                                "Northern Lights Fruit Cake",
                                "Ever-Warm Spicy Ramen",
                                "Yeti’s Favorite Meatloaf",
                                "Golden-Crusted Pheasant"
                            ],
                            "MYTHIC": [
                                "An Edible Snow-Globe",
                                "The Last Slice of Christmas Pudding",
                                "A Bowl of Instant Snow (Just add water!)",
                                "Santa’s Secret Stash of Cookies",
                                "A Frozen Pizza (Literally just a block of ice)"
                            ]
                        }
                    },

                    // ------------------
                    // -- LVL. 5+
                    // ------------------
                    CHOP: {
                        MULTIPLIER: "LVL_5",
                        RESOURCES: {
                            "COMMON": [
                                "Frozen Stick",
                                "Snowy Log",
                                "Pine Tree",
                                "Frosty Oak Tree"
                            ],
                            "RARE": [
                                "Frosty Branch",
                                "Blue Maple",
                                "Frosty Birch Tree",
                                "Candy Cane Tree"
                            ],
                            "EPIC": [
                                "Glaciar Tree",
                                "Frosted Bark",
                                "Frosty Blossom Tree",
                                "Aurora Bark"
                            ],
                            "LEGENDARY": [
                                "Ancient Icewood",
                                "Glaciar Stump",
                                "Moon Frost Tree",
                                "Spirit Pine Tree"
                            ],
                            "MYTHIC": [
                                "Ancient Frost Roots",
                                "Frosted Sapling",
                                "Frosted Moonlit Willow Tree"
                            ]
                        }
                    },

                    FARM: {
                        MULTIPLIER: "LVL_5",
                        RESOURCES: {
                            "COMMON": [
                                "Blue Wheat",
                                "Blue Corn",
                                "Blue Carrot",
                                "Iced Grass"
                            ],
                            "RARE": [
                                "Blue Poteto",
                                "Peppermint Leaf",
                                "Blue Pumkin",
                                "Frozen Berry"
                            ],
                            "EPIC": [
                                "Blue Melon",
                                "Blue cabbage",
                                "Sugar Cane",
                                "Golden Snowcorn"
                            ],
                            "LEGENDARY": [
                                "Crystal Carrot",
                                "Crystal Giant Pumkin",
                                "Crystal Berry",
                                "Gracier Berry"
                            ],
                            "MYTHIC": [
                                "Acnient Frozen Root",
                                "Aurora Bloom",
                                "Spirit Crop",
                                "Winter Seed"
                            ]
                        }
                    },

                    SMITH: {
                        MULTIPLIER: "LVL_5",
                        RESOURCES: {
                            "COMMON": [
                                "Iron Knife",
                                "Frozen Sword",
                                "Ice Shield",
                                "Frost Dagger"
                            ],
                            "RARE": [
                                "Steel Saber",
                                "Frozen Axe",
                                "Ice Knight Helmet",
                                "Ice Hammer"
                            ],
                            "EPIC": [
                                "Crystal Sword",
                                "Crystal Dagger",
                                "Crystal Spiked Shield",
                                "Crystal Baguette"
                            ],
                            "LEGENDARY": [
                                "Ruby Blade",
                                "Snow Hammer",
                                "Diamond Greatsword",
                                "Glacier Lance"
                            ],
                            "MYTHIC": [
                                "Ancient Frostblade",
                                "Moonsteel Blade",
                                "Spirit Forged Blade",
                                "Dragon Ice Sword",
                                "Frost Crown"
                            ]
                        }
                    },

                    WALLET: {
                        TITLE: "❄️ {username}'s Winter Stash",
                        THUMBNAIL: "{emoji_Snowflake}",
                        FIELDS: {
                            CURRENCY: "🧊 Frozen Assets",
                            STATISTICS: "📊 Winter Records",
                            STREAK: "🔥 Warmth Streak",
                            INVENTORY: "🎒 Sled Bag"
                        }
                    },
                }
            },
            //#endregion

            //#region DEFAULT THEME
            DEFAULT: {
                CURRENCY: {
                    MAIN: { NAME: "Coins", EMOJI: "{emoji_Coin}" },
                    SECONDARY: { NAME: "Gems", EMOJI: "{emoji_Gems}" },
                },
                COLORS: { MAIN: [0, 250, 250], SECONDARY: [250, 50, 160], ERROR: [250, 0, 0] },
                COMMANDS: {
                    HUNTING: {
                        RESOURCES: {
                            "COMMON": [
                                "Feather",
                                "Rabbit",
                                "Pheasant",
                                "Geese"
                            ],
                            "RARE": [
                                "Wild Boar",
                                "Dear",
                                "Capibara",
                                "Fancy Wolf"
                            ],
                            "EPIC": [
                                "Majestic Stag",
                                "Griffinn",
                                "Dixi Toilet",
                                "Golden Eagle"
                            ],
                            "LEGENDARY": [
                                "Ancient Silver Fox",
                                "Pheonix",
                                "Unicorn",
                                "Yourself"
                            ],
                            "MYTHIC": [
                                "The Invisible Flying Spaghetti Monster",
                                "A Single, Sentient Raw Chicken Nugget",
                                "The Last Remaining Pixel",
                                "Godzilla's Smaller Brother (Kevin)",
                                "The Marshmellow monster from Ghostbusters"
                            ]
                        }
                    },
                    MINING: {
                        RESOURCES: {
                            "COMMON": [
                                "Grass",
                                "Stone",
                                "Granite",
                                "Diorite",
                                "Gravel",
                                "Zinc",
                                "Obsidian",
                                "Garnet",
                                "Malachite"
                            ],
                            "RARE": [
                                "Coal",
                                "Raw Copper",
                                "Raw Iron",
                                "Raw Gold",
                                "Raw Chromium"
                            ],
                            "EPIC": [
                                "Raw Osmium",
                                "Raw Tin",
                                "Sulfur",
                                "Iridium",
                                "Slate",
                                "Platinum",
                                "Lapiz",
                                "Topaz"
                            ],
                            "LEGENDARY": [
                                "Diamond",
                                "Emerald",
                                "Sapphire",
                                "Ruby",
                                "Mithdril",
                                "Sunstone",
                                "Rainbownite"
                            ],
                            "MYTHIC": [
                                "Netherite",
                                "Amethyst",
                                "Uranium",
                                "Yunium"
                            ]
                        }
                    },
                    FISHING: {
                        RESOURCES: {
                            "COMMON": [
                                "Seaweed",
                                "Kelp",
                                "Old Sneaker",
                                "Old High Heel"
                            ],
                            "RARE": [
                                "Cod",
                                "Rainbow Trout",
                                "Salmon",
                                "Anchor"
                            ],
                            "EPIC": [
                                "Tropical Fish",
                                "Squid",
                                "Shrimp",
                                "Golden Carp"
                            ],
                            "LEGENDARY": [
                                "Axolotl",
                                "Plastic",
                                "Electronic Device",
                                "Paper with 'Free Nitro' written on it"
                            ],
                            "MYTHIC": [
                                "Neptune's Trident",
                                "Sunken Treasure Chest",
                                "Pineapple House",
                                "Squidward"
                            ]
                        }
                    },
                    COOKING: {
                        RESOURCES: {
                            "COMMON": [
                                "Chocolate Chip Cookies",
                                "Blueberry Pancakes",
                                "Cherry Blossom Icetea",
                                "Fruit Smoothie"
                            ],
                            "RARE": [
                                "Banana Bread",
                                "Butter Chicken",
                                "Pasta",
                                "Fish Fillet"
                            ],
                            "EPIC": [
                                "Steak au Poivre",
                                "Fillet Mignon",
                                "Chocolate Soufflé",
                                "French Bread"
                            ],
                            "LEGENDARY": [
                                "Waffle",
                                "Brownies",
                                "Pink Beans",
                                "Bake Poteto"
                            ],
                            "MYTHIC": [
                                "McDonalds",
                                "Burger King",
                                "KFC",
                                "Wendies"
                            ]
                        }
                    },

                    // ------------------
                    // -- LVL. 5+
                    // ------------------
                    CHOP: {
                        MULTIPLIER: "LVL_5",
                        RESOURCES: {
                            "COMMON": [
                                "Oak Tree",
                                "Pine Tree",
                                "Birch Tree",
                                "Apple Tree"
                            ],
                            "RARE": [
                                "Lemon Tree",
                                "Red Maple Tree",
                                "Sweetgum Tree",
                                "Sigar Maple Tree"
                            ],
                            "EPIC": [
                                "Albino Oak Tree",
                                "Willom Tree",
                                "Wise Tree",
                                "Cherry Blossom Tree"
                            ],
                            "LEGENDARY": [
                                "Mehagony Tree",
                                "Ebony Tree",
                                "Golden Birch Tree",
                                "Crystal Bark Tree"
                            ],
                            "MYTHIC": [
                                "Ancient Oak Tree",
                                "Moonlit Willow Tree",
                                "Spirit Tree",
                                "Dragonroot Tree"
                            ]
                        }
                    },
                    FARM: {
                        MULTIPLIER: "LVL_5",
                        RESOURCES: {
                            "COMMON": [
                                "Wheat",
                                "Corn",
                                "Carrot",
                                "Potato"
                            ],
                            "RARE": [
                                "Tomato",
                                "Poteto",
                                "Pumkin",
                                "Watermelon"
                            ],
                            "EPIC": [
                                "Strawberry",
                                "Blueberry",
                                "Sugar Cane",
                                "Golden Corn"
                            ],
                            "LEGENDARY": [
                                "Purple Carrot",
                                "Giant Pumkin",
                                "Crystal Berry",
                                "Ancient Root"
                            ],
                            "MYTHIC": [
                                "Moon Blossom",
                                "Spirit Crop",
                                "Dragonfruit",
                                "World Seed"
                            ]
                        }
                    },
                    SMITH: {
                        MULTIPLIER: "LVL_5",
                        RESOURCES: {
                            "COMMON": [
                                "Iron Sword",
                                "Iron Dagger",
                                "Iron Shield"
                            ],
                            "RARE": [
                                "Steel Sword",
                                "Steel Dagger",
                                "Steel Shield"
                            ],
                            "EPIC": [
                                "Knight Helmet",
                                "Battle Axe",
                                "Spiked Shield",
                                "War Hammer",
                                "Spirit Forged Axe",
                            ],
                            "LEGENDARY": [
                                "Golden Sword",
                                "Ruby Hammer",
                                "Emerald Hammer",
                                "Moonsteel Saber",
                            ],
                            "MYTHIC": [
                                "Crystal Lance",
                                "Diamond Greatsword",
                                "Ancient Warblade",
                            ]
                        }
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
            //#endregion
        }
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
            }
        }
    },

    OTHER: {
        DATA_DELETION: {
            CONFIRM: "{emoji_UI_Warn} This will delete ALL your data.\nRun `/delete-data` again within 20 seconds to confirm.",
            DELETED: "{emoji_Trashcan} Your data has been permanently deleted."
        }
    },

    ECONOMY: {

        // -------------------
        // BASE SECTION
        // -------------------

        PASSIVE: {

        },

        WORK: {
            IDLE_COMMANDS: [
                "FARM",
                "MINING",
                "FISHING",
                "COOKING"
            ],
            RARITIES: {
                COMMON: { WORTH: 100, AMOUNT_MAX: 35, PERCENTAGE: 150, COOLDOWN: 30 },
                RARE: { WORTH: 500, AMOUNT_MAX: 20, PERCENTAGE: 75, COOLDOWN: 60 },
                EPIC: { WORTH: 1_000, AMOUNT_MAX: 12, PERCENTAGE: 20, COOLDOWN: 120 },
                LEGENDARY: { WORTH: 5_000, AMOUNT_MAX: 6, PERCENTAGE: 5, COOLDOWN: 300 },
                MYTHIC: { WORTH: 10_000, AMOUNT_MAX: 3, PERCENTAGE: 0.5, COOLDOWN: 600 }
            },
            MULTIPLIER: {
                LVL_0: { CASH: 1, EXPERIENCE: 1.25, COOLDOWN: 1 },
                LVL_5: { CASH: 2, EXPERIENCE: 2.5, COOLDOWN: 1.5 }
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
                        SUMMER: "{emoji_FishBait} You cast your line from the pier and caught **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`.",
                        WINTER: "{emoji_FishBait} You fished through the ice and pulled up **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`.",
                        HALLOWEEN: "{emoji_FishBait} You fished in the murky swamp and snagged **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`.",
                        DEFAULT: "{emoji_FishBait} You went fishing and caught **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`."
                    },

                    MINING: {
                        SUMMER: "⛏️ You mined through the heat and found **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`.",
                        WINTER: "❄️ You cracked the permafrost and extracted **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`.",
                        HALLOWEEN: "🏮 You mined a haunted vein and discovered **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`.",
                        DEFAULT: "⛏️ You went mining and gathered **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`."
                    },

                    COOKING: {
                        SUMMER: "🍳 You fired up the grill and prepared **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`.",
                        WINTER: "🍲 You cooked a hearty winter stew of **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`.",
                        HALLOWEEN: "🧪 You brewed a spooky concoction of **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`.",
                        DEFAULT: "🍳 You cooked up **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`."
                    },

                    FARM: {
                        SUMMER: "{emoji_Wheat} You harvested **{amount}x {material}** under the summer sun!\n{emoji_Box} Added to collection, claimable in `{time}`.",
                        WINTER: "{emoji_Wheat} You gathered a winter yield of **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`.",
                        HALLOWEEN: "{emoji_Wheat} You harvested a cursed patch of **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`.",
                        DEFAULT: "{emoji_Wheat} You farmed **{amount}x {material}**!\n{emoji_Box} Added to collection, claimable in `{time}`."
                    },

                    // Non-Idle Commands (Regular immediate reward style)
                    HUNTING: {
                        SUMMER: "🏹 You tracked prey through the lush forest and caught **{amount}x {material}** for **{totalValue} {mainCurrency_name}**",
                        WINTER: "❄️ Tracking footprints in the snow, you caught **{amount}x {material}** worth **{totalValue} {mainCurrency_name}**",
                        HALLOWEEN: "🧛 You hunted a shadow beast in the dark! Gained **{amount}x {material}** worth **{totalValue} {mainCurrency_name}**",
                        DEFAULT: "🏹 You went hunting and brought back **{amount}x {material}** worth **{totalValue} {mainCurrency_name}**"
                    },

                    CHOP: {
                        SUMMER: "{emoji_Axe} You chopped down sun-dried trees for **{amount}x {material}**, earning **{totalValue} {mainCurrency_name}**",
                        WINTER: "{emoji_Axe} You split frozen logs to get **{amount}x {material}** worth **{totalValue} {mainCurrency_name}**",
                        HALLOWEEN: "{emoji_Axe} You chopped an ancient, gnarled tree! Gained **{amount}x {material}** worth **{totalValue} {mainCurrency_name}**",
                        DEFAULT: "{emoji_Axe} You chopped wood and got **{amount}x {material}** for **{totalValue} {mainCurrency_name}**"
                    },

                    SMITH: {
                        SUMMER: "{emoji_Sword} You forged **{amount}x {material}** in the scorching heat for **{totalValue} {mainCurrency_name}**",
                        WINTER: "{emoji_Sword} Using the forge's warmth, you crafted **{amount}x {material}** worth **{totalValue} {mainCurrency_name}**",
                        HALLOWEEN: "{emoji_Sword} You forged a cursed blade from **{amount}x {material}** worth **{totalValue} {mainCurrency_name}**",
                        DEFAULT: "{emoji_Sword} You smithed **{amount}x {material}** and earned **{totalValue} {mainCurrency_name}**"
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
                RECIEVED: "{emoji_Calender} {mainCurrency_emoji} You received **{reward} {mainCurrency_name}**",
            }
        },

        GIFT: {
            MIN: 1,
            MAX: 5_000,
            MAX_RECIEVER: 100_000,
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
            MIN_BET: 1,
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
            MIN_BET: 1,
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
            MIN_BET: 1,
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
                "https://tenor.com/view/how-to-raise-a-boring-girlfriend-saenai-heroine-sarnai-heroine-saekano-gif-17909375",
                "https://tenor.com/view/patrick-star-smash-gif-19642208",
                "https://giphy.com/gifs/teto-utau-muglaliteto-ct5bSAvJEvWi0gDhDn",
                "https://tenor.com/view/bonk-hit-book-school-anime-gif-24977313",
            ],
            RESPONSES: [
                "🤗 {user} gave a warm [hug]({gif}) to {target}",
                "💖 {user} wrapped {target} in a big hug! [GIF]({gif})",
                "🌸 {user} hugs {target} gently [here]({gif})",
                "✨ {user} sends loving hugs to {target} [gif]({gif})",
            ]
        },

        SPIN: {
            GIFS: [
                "https://tenor.com/view/chibi-miku-hatsune-miku-vocaloid-spinning-gif-17905461",
                "https://tenor.com/view/hatsune-miku-hatsune-miku-spin-spinning-gif-8067541111061086862",
                "https://tenor.com/view/aymenzero-kasane-teto-teto-0401-cycle-gif-18089640910220477995",
                "https://tenor.com/view/teto-kasane-spin-kasane-teto-vocaloid-gif-4888694876011655461",
                "https://tenor.com/view/tetoris-kasane-teto-teto-synthv-hiiragi-magnetite-gif-13980202707426180496",
                "https://tenor.com/view/kasane-teto-microwave-spin-gif-12225979279271836335",
                "https://tenor.com/view/spin-record-cat-gif-21749933",
                "https://tenor.com/view/fish-spin-confetti-fishy-spinning-gif-2147613004635078456",
                "https://tenor.com/view/ramona-flowers-spin-spinning-scott-pilgrim-gif-13111814067486747074",
                "https://tenor.com/view/sea-lion-sea-lion-sealion-spinna-gif-6572328635488597288",
                "https://tenor.com/view/pigeon-pigeon-spin-meme-gif-4075639143464625668",
                "https://tenor.com/view/paper-lily-lacie-spin-spinning-rotate-gif-17132424264998507907",
            ],
            RESPONSES: [
                "🌪️ {user} is making {target} [spin]({gif}) right round, baby, right round!",
                "🌀 Look at them go! {user} [spun]({gif}) {target} into a dizzy mess.",
                "📡 {user} put {target} in the [microwave]({gif})! *Ding!*",
                "💫 {user} [rotated]({gif}) {target} at 7200 RPM!",
                "🎠 {user} turned {target} into a [human fidget spinner]({gif})!",
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