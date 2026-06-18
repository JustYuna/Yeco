module.exports = {
    SETTINGS: {
        COMMANDS_PER_MINUTE: 10, // limits how many commands the user can send till timeout
        MAX_MEMORY_USAGE: 1024, // limits how much MB RAM the bot is allowed to use

        DEBUG_MEMORY: false,
        DEVELOPER_MODE: true,

        GUILD_CACHE_TTL: 10 * 60 * 1000, // 10 min
        GUILD_SIZE_IGNORE: [
            1515740577533136937 // Yeco Support Server
        ],
        GUILD_SIZE_SPEC: {
            SMALL: {
                COUNT: 0,
                LOCKOUT_NAME: "SMALL"
            },
            MEDIUM: {
                COUNT: 50,
                LOCKOUT_NAME: "MEDIUM"
            },
            LARGE: {
                COUNT: 250,
                LOCKOUT_NAME: "LARGE"
            },
            HUGE: {
                COUNT: 500,
                LOCKOUT_NAME: "HUGE"
            },
            OVERSZED: {
                COUNT: 1000,
                LOCKOUT_NAME: "OVERSZED"
            },
        }, // Limits what command can be used for what server
    },

    MESSAGES: {
        NOT_ENOUGH_CURRENCY: "{emoji_UI_Cross} You do not have enough **{mainCurrency_name}** {mainCurrency_emoji} to perform this action!",
        MIN_CURRENCY_REQUIRED: "{emoji_UI_Warning} You need a minimum of **{amount} {mainCurrency_name}** {mainCurrency_emoji}!",
        MAX_CURRENCY_ALLOWED: "{emoji_UI_Cross} You can only put a maximum of **{amount} {mainCurrency_name}** {mainCurrency_emoji}!",

        ACTION_COOLDOWN: "⏳ You are on cooldown for `{command}`. Please wait **{remainingSeconds}** second(s).",
        ACTION_UNAVAILABLE: "🛠️ This action is currently unavailable, please try again later.",
        ACTION_RATE_LIMIT: "{emoji_UI_Warning} You are currently being rate limited... please wait a moment.",

        COMMAND_NOT_HIGH_ENOUGH_LEVEL: "{emoji_UI_Warning} Your level is not high enough to use this command.\nRequired: **Level {level}**",
        TARGET_ONBOARDING: "{emoji_UI_Warning} Your target doesnt have completed the onboarding yet, please chose another target.",

        SERVER_LOCKOUT_MESSAGE:  "{emoji_UI_Cross} Disabled in {tier} servers (hardware limits)\n💡 Support development or contribute here: https://github.com/JustYuna/Yeco",
        NOT_IN_GUILD: "{emoji_UI_Warning} This command is not available here, use `/help` to see what commands you can use in dms.",

        CAPTCHA_FAIL:  "{emoji_UI_Warning} There was an error verifying your interaction.",

        COMMAND_ERROR_PROCESS:  "{emoji_UI_Warning} An error occurred while processing the command."
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
        YellowStar: "<:emoji_yellow_star:1501439867534704851>",
        GreenUpgrade: "<:emoji_green_upgrade:1496170310829871154>",
        PurpleToT: "<:emoji_purple_tot:1496172568128782419>",
        Trashcan: "<:emoji_trashcan:1496950798675083315>",
        Box: "<:emoji_box:1496951152120430602>",
        Calender: "<:emoji_calenders:1496979436510249071>",
        PurpleFire: "<:emoji_purple_fire:1501439477057323180>",
        RedFire: "<:emoji_red_fire:1509881528421715999>",

        RedLightning: "<:emoji_red_lightning:1501440930648035358>",
        Blueberry: "<:emoji_blueberry:1501441146881314857>",
        Lemon: "<:emoji_lemon:1501441317237166141>",
        Carrot: "<:emoji_carrot:1501441471822430290>",
        Skull: "<:emoji_skull:1498017352820850932>",
        Factory: "<:emoji_factory:1506532909941784626>",
    
        RedGift: "<:emoji_gift_red:1509880420093661356>",
        PurpleGift: "<:emoji_gift_purple:1509880418755805224>",
        GreenGift: "<:emoji_gift_green:1509880417350582282>",

        BlueDiamond: "<:emoji_blue_diamond:1495152785379950713>",

        // social
        SOCIAL_Discord: "<:social_discord:1496168648283394171>",
        SOCIAL_X: "<:social_x:1496168595963777035>",

        // system
        UI_Info: "<:ui_info:1495149117347991682>",
        UI_Cross: "<:ui_cross:1495148489452290088>",
        UI_Warn: "<:ui_warn:1495148637993566399>",
        UI_Plus: "<:ui_plus:1495148566833004665>",
        UI_Questionmark: "<:ui_questionmark:1501443513106042951>",
        UI_Minus: "<:ui_minus:1504545595426344990>"
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
}