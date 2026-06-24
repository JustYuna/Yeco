const ConfigManager = require("./configManager");

module.exports = {
    // Types:
    // 3: Predefined Choise / String
    // 4: Number
    // 5: Boolean
    // 6: User
    // 7: Channel
    // 8: Role

    // -- Base -- \\
    "help": {
        data: {
            name: 'help',
            description: 'View a list of all commands',
        },

        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },

        run: (i, c, m) => m.Help(i, c),
    },
    "info": {
        data: {
            name: 'info',
            description: 'View core info about the bot',
        },

        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            guildSizeLockout: [ "LARGE", "HUGE", "OVERSZED" ],
            tags: [ "DM_ENABLED" ]
        },

        run: (i, c, m) => m.Info(i, c),
    },
    "onboarding": {
        data: {
            name: 'onboarding',
            description: 'View the onboarding message again',
        },

        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            guildSizeLockout: [ "MEDIUM", "LARGE", "HUGE", "OVERSZED" ],
            tags: [ "DM_ENABLED" ]
        },

        run: (i, c, m) => m.Onboarding(i, c),
    },
    "settings": {
        data: {
            name: "settings",
            description: "Toggle some settings",
            options: [
                {
                    name: "setting",
                    description: "what to toggle?",
                    type: 3,
                    required: true,
                    choices: [
                        { name: "Leaderboard Visibility", value: "setting_hidden_from_leaderboard" }
                    ]
                }
            ]
        },

        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: ["DM_ENABLED"]
        },

        run: async (i, c, m) => {
            const setting = i.options.getString("setting")?.toUpperCase();

            if (!setting) {
                return i.editReply({
                    content: "❌ Please provide a setting."
                });
            }

            return m.ToggleSetting(i, c, setting);
        },
    },
    "feedback": {
        data: {
            name: "feedback",
            description: "Send feedback or report an issue",
            options: [
                {
                    name: 'message',
                    description: 'Describe your issue or feedback',
                    type: 3,
                    required: true,
                }
            ]
        },

        settings: {
            cooldown: 300,
            canShowCaptcha: true,
            risk: 15,
            tags: ["DM_ENABLED"]
        },

        run: async (i, c, m) => {
            const type = i.options.getString("type");
            const message = i.options.getString("message");

            let msg = ConfigManager.raw.OTHER.FEEDBACK.MESSAGS.SHORT_MESSAGE

            // basic validation
            if (!message || message.length < 5) {
                return i.editReply({
                    content: msg
                });
            }

            // send to webhook
            m.webhook(i, message, "feedback", { title: ConfigManager.raw.OTHER.FEEDBACK.TITLE, color: ConfigManager.raw.OTHER.FEEDBACK.COLOR })

            msg = ConfigManager.raw.OTHER.FEEDBACK.MESSAGS.SENT
            return i.editReply({
                content: msg
            });
        }
    },

    "vote": {
        data: {
            name: 'vote',
            description: 'Vote and contribute to the goal!',
        },

        settings: {
            cooldown: 300,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },

        run: (i, c, m) => m.Vote(i, c),
    },

    // -- Economy -- \\

    "farm": {
        data: {
            name: 'farm', // Lvl. 0
            description: 'Old MacDonald Had a Farm',
        },

        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10,
            tags: [ "ONBOARDING" ]
        },

        run: (i, c, m) => m.Work(i, c, "FARM"),
    },
    "gather": {
        data: {
            name: 'gather', // Lvl. 2
            description: 'Head to the woods or the water to fish and hunt for basic materials.',
        },

        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10,
            tags: [ "ONBOARDING" ]
        },

        run: (i, c, m) => {
            const jobs = ["FISHING", "HUNTING"];
            const type = jobs[Math.floor(Math.random() * jobs.length)];

            m.Work(i, c, type);
        },
    },
    "extract": {
        data: {
            name: 'extract', // Lvl. 5
            description: 'Put your back into it! Mine ores and chop timber for heavy-duty resources.',
        },

        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10,
            tags: [ "ONBOARDING" ]
        },

        run: (i, c, m) => {
            const jobs = ["MINING", "CHOP"];
            const type = jobs[Math.floor(Math.random() * jobs.length)];

            m.Work(i, c, type);
        },
    },
    "craft": {
        data: {
            name: 'craft', // Lvl. 10
            description: 'Master the heat of the forge or the stove to create high-value items.',
        },

        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10,
            tags: [ "ONBOARDING" ]
        },

        run: (i, c, m) => {
            const jobs = ["COOKING", "SMITH"];
            const type = jobs[Math.floor(Math.random() * jobs.length)];

            m.Work(i, c, type);
        },
    },

    "factory": {
        data: {
            name: "factory",
            dm_permission: true,
            description: "Manage your own factory",
            options: [
                {
                    name: "type",
                    description: "What do you wanna do with your factory?",
                    type: 3,
                    required: true,
                    choices: [
                        { name: "Claim Income", value: "claim_income" },
                        { name: "View", value: "view" },
                        { name: "Upgrade", value: "upgrade" },
                    ],
                }
            ]
        },

        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },

        run: async (i, c, m) => {
            const type = i.options.getString("type");
            return m.Factory(i, c, { type: type });
        }
    },

    // -- Other -- \\

    "daily": {
        data: {
            name: 'daily',
            description: 'Claim your daily amount of currency',
        },

        settings: {
            cooldown: 300,
            canShowCaptcha: true,
            risk: 10,
            tags: [ "DM_ENABLED", "ONBOARDING" ]
        },

        run: (i, c, m) => m.Daily(i, c),
    },

    "leaderboard": {
        data: {
            name: 'leaderboard',
            description: 'View the leaderboards',
            options: [
                {
                    name: 'type',
                    description: 'Leaderboard type',
                    type: 3,
                    required: true,
                    choices: [
                        { name: 'Main Currency', value: 'main_currency' },
                        { name: 'Total Currency', value: 'total_main_currency' },
                        { name: 'Second Currency', value: 'second_currency' },
                        { name: 'Total Second Currency', value: 'total_second_currency' },
                        { name: 'Gambled', value: 'gambled' },
                        { name: 'Robbed', value: 'robbed' },
                    ],
                }
            ]
        },

        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10,
            guildSizeLockout: [ "LARGE", "HUGE", "OVERSZED" ]
        },

        run: (i, c, m) => {
            const type = i.options.getString('type');
            const upperType = type?.toUpperCase();
            return m.Leaderboard(i, c, upperType);
        }
    },

    "gift": {
        data: {
            name: 'gift',
            description: 'Give your currency to another user',
            options: [
                { name: 'amount', type: 4, required: true, description: 'Amount' },
                { name: 'user', type: 6, required: true, description: 'User' },
            ]
        },

        settings: {
            cooldown: 3600,
            canShowCaptcha: true,
            risk: 25,
            guildSizeLockout: [ "LARGE", "HUGE", "OVERSZED" ],
            tags: [ "ONBOARDING" ]
        },

        run: (i, c, m) => {
            const user = i.options.getUser('user');
            const amount = i.options.getInteger('amount');
            return m.Gift(i, c, user, amount);
        }
    },

    // -- Inventory -- \\

    "bank": {
        data: {
            name: 'bank',
            description: 'Interact with the bank',
            options: [
                {
                    name: 'action',
                    description: 'Chose what you want todo',
                    type: 3,
                    required: true,
                    choices: [
                        { name: 'Deposit', value: 'deposit' },
                        { name: 'Withdraw', value: 'withdraw' },
                        { name: 'Upgrade', value: 'upgrade' },
                        { name: 'View Level', value: 'view' },
                    ],
                },
                { name: 'amount', type: 4, required: false, description: 'Gamble amount' },
            ]
        },

        settings: {
            cooldown: 10,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "ONBOARDING" ]
        },

        run: (i, c, m) => {
            const amount = i.options.getInteger('amount');
            const action = i.options.getString('action');
            return m.Bank(i, c, { action: action, amount: amount });
        }
    },

    "wallet": {
        data: {
            name: 'wallet',
            description: 'Check your or another user wallet',
            options: [
                { name: 'user', type: 6, required: false, description: 'User' },
            ]
        },

        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "ONBOARDING" ]
        },

        run: (i, c, m) => {
            const target = i.options.getUser('user');
            return m.Wallet(i, c, target);
        }
    },

    // -- Criminal -- \\

    "laundry": {
        data: {
            name: 'laundry',
            description: 'Launder some of your currency',
            options: [
                {
                    name: 'type',
                    description: 'Leaderboard type',
                    type: 3,
                    required: true,
                    choices: [
                        { name: 'View rates', value: 'view' },
                        { name: 'Wash money', value: 'wash' },
                    ],
                },
                { name: 'amount', type: 4, required: false, description: 'Amount' },
            ]
        },

        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 25,
            tags: [ "ONBOARDING" ]
        },

        run: async (i, c, m) => {
            const type = i.options.getString('type');
            const amount = i.options.getInteger('amount') || 0;
            m.Laundry(i, c, { type: type, amount: amount })
        }
    },

    "rob": {
        data: {
            name: 'rob',
            description: 'Rob someone',
            options: [
                { name: "target", type: 6, required: true, description: "Target" }
            ]
        },

        settings: {
            cooldown: 1500,
            canShowCaptcha: true,
            risk: 25,
            tags: [ "ONBOARDING" ]
        },

        run: async (i, c, m) => {
            const target = i.options.getUser('target');
            m.Rob(i, c, target)
        }
    },
    
    "heist": {
        data: {
            name: 'heist',
            description: 'Plan a heist on targets',
            options: [
                {
                    name: 'target',
                    description: 'Target',
                    type: 3,
                    required: true,
                    choices: [
                        { name: 'Kids', value: 'kids' },
                        { name: 'Store', value: 'store' },
                        { name: 'Warehouse', value: 'warehouse' },
                        { name: 'Factory', value: 'factory' },
                        { name: 'Goverment', value: 'goverment' },
                    ],
                },
            ]
        },

        settings: {
            cooldown: 1500,
            canShowCaptcha: true,
            risk: 25,
            guildSizeLockout: [ "MEDIUM", "LARGE", "HUGE", "OVERSZED" ],
            tags: [ "ONBOARDING" ]
        },

        run: async (i, c, m) => {
            const target = i.options.getString('target');
            m.Heist(i, c, { option: target })
        }
    },

    // -- Gambling -- \\

    "coinflip": {
        data: {
            name: 'coinflip',
            description: 'Come out as a winner or a loser for your whole life',
            options: [
                {
                    name: 'type',
                    description: 'Chose what you want todo',
                    type: 3,
                    required: true,
                    choices: [
                        { name: '🪙 Head', value: 'head' },
                        { name: '🪙 Tails', value: 'tails' }
                    ],
                },
                { name: 'amount', type: 4, required: true, description: 'Gamble amount' },
            ]
        },

        settings: {
            cooldown: 90,
            canShowCaptcha: true,
            risk: 10,
            tags: [ "ONBOARDING" ]
        },

        run: (i, c, m) => {
            const amount = i.options.getInteger('amount');
            const type = i.options.getString('type');
            return m.Coinflip(i, c, { amount: amount, selection: type });
        }
    },

    "slots": {
        data: {
            name: 'slots',
            description: 'gamble ur currency',
            options: [
                { name: 'amount', type: 4, required: true, description: 'Gamble amount' },
                { name: 'view', type: 5, required: false, description: 'View Info' },
            ]
        },

        settings: {
            cooldown: 90,
            canShowCaptcha: true,
            risk: 10,
            guildSizeLockout: [ "MEDIUM", "LARGE", "HUGE", "OVERSZED" ],
            tags: [ "ONBOARDING" ]
        },

        run: (i, c, m) => {
            const amount = i.options.getInteger('amount');
            const viewInfo = i.options.getBoolean('view') ?? false;
            return m.Slots(i, c, amount, viewInfo);
        }
    },

    "roulette": {
        data: {
            name: "roulette",
            description: "Bet on a roulette number",
            options: [
                {
                    name: "amount",
                    type: 4,
                    required: true,
                    description: "Amount to bet"
                },
                {
                    name: "input",
                    type: 3,
                    required: true,
                    description: "Red, black, green, even, odd, or a number (0-36)"
                }
            ]
        },

        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 15,
            guildSizeLockout: ["MEDIUM", "LARGE", "HUGE", "OVERSZED" ],
            tags: ["ONBOARDING"]
        },

        run: (i, c, m) => {
            const amount = i.options.getInteger('amount');
            const input = i.options.getString('input');

            return m.Roulette(i, c, { bet: amount, betInput: input });
        }
    },

    // -- Fun -- \\

    "bonk": {
        data: {
            name: 'bonk',
            dm_permission: true,
            description: 'Bonk someone on the head',
            options: [
                { name: "target", type: 6, required: true, description: "Target" }
            ]
        },

        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },

        run: async (i, c, m) => {
            const target = i.options.getUser("target");
            return m.socialActions.Bonk(i, c, target);
        }
    },

    "patpat": {
        data: {
            name: 'patpat',
            dm_permission: true,
            description: 'Give someone some patpat’s',
            options: [
                { name: "target", type: 6, required: true, description: "User" }
            ]
        },

        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },

        run: async (i, c, m) => {
            const target = i.options.getUser("target");
            return m.socialActions.PatPat(i, c, target);
        }
    },

    "spin": {
        data: {
            name: 'spin',
            dm_permission: true,
            description: 'Spin till you can’t no more!',
            options: [
                { name: "target", type: 6, required: true, description: "Target" }
            ]
        },

        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },

        run: async (i, c, m) => {
            const target = i.options.getUser("target");
            return m.socialActions.Spin(i, c, target);
        }
    },

    "hug": {
        data: {
            name: 'hug',
            dm_permissionm: true,
            description: 'Hug someone',
            options: [
                { name: "target", type: 6, required: true, description: "User" }
            ]
        },

        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },

        run: async (i, c, m) => {
            const target = i.options.getUser("target");
            return m.socialActions.Hug(i, c, target);
        }
    },

    "poke": {
        data: {
            name: 'poke',
            dm_permission: true,
            description: 'Poke a friend!!!',
            options: [
                { name: "target", type: 6, required: true, description: "User" }
            ]
        },

        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },

        run: async (i, c, m) => {
            const target = i.options.getUser("target");
            return m.socialActions.Poke(i, c, target);
        }
    },

    "ship": {
        data: {
            name: 'ship',
            dm_permission: true,
            description: 'Lets ship some people shall we?',
            options: [
                { name: "target", type: 6, required: true, description: "Lover 1" },
                { name: "target2", type: 6, required: true, description: "Lover 2" }
            ]
        },

        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },

        run: async (i, c, m) => {
            // Changed i.option to i.options
            const user = i.options.getUser("target");
            const user2 = i.options.getUser("target2");
            return m.ship(i, c, user, user2);
        }
    },
};