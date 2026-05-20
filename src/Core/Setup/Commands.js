const commands = [
    // Types:
    // 3: Predefined Choise / String
    // 4: Number
    // 5: Boolean
    // 6: User
    // 7: Channel
    // 8: Role

    // Base \\
    {
        name: 'help',
        description: 'View a list of all commands',
    },
    {
        name: 'info',
        description: 'View core info about the bot',
    },
    {
        name: 'cooldown',
        description: 'View what cooldowns you are one currently',
    },
    {
        name: 'onboarding',
        description: 'View the onboarding message again',
    },
    {
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
    {
        name: "me",
        description: "View important info",
        options: [
            {
                name: "type",
                description: "Type",
                type: 3,
                required: true,
                choices: [
                    { name: "Delete Data", value: "delete_data" },
                    { name: "Terms of Service", value: "tos" },
                    { name: "Privacy Policy", value: "privacy_policy" }
                ]
            }
        ]
    },
    {
        name: 'report',
        description: 'Send feedback or report an issue [Spamming will result in being blacklisted]',
        options: [
            {
                name: 'type',
                description: 'What do you want to send?',
                type: 3,
                required: true,
                choices: [
                    { name: '🐛 Bug Report', value: 'report' },
                    { name: '💬 Feedback', value: 'feedback' }
                ],
            },
            {
                name: 'message',
                description: 'Describe your issue or feedback',
                type: 3,
                required: true,
            }
        ]
    },

    {
        name: 'vote',
        description: 'Vote and contribute to the goal!',
    },

    // Work \\
    {
        name: 'farm', // Lvl. 0
        description: 'Old MacDonald Had a Farm',
    },

    {
        name: 'gather', // Lvl. 2
        description: 'Head to the woods or the water to fish and hunt for basic materials.',
    },

    {
        name: 'extract', // Lvl. 5
        description: 'Put your back into it! Mine ores and chop timber for heavy-duty resources.',
    },

    {
        name: 'craft', // Lvl. 10
        description: 'Master the heat of the forge or the stove to create high-value items.',
    },

    // Other Economy \\

    {
        name: 'daily',
        description: 'Claim your daily amount of currency',
    },

    {
        name: 'gift',
        description: 'Give your currency to another user',
        options: [
            { name: 'amount', type: 4, required: true, description: 'Amount' },
            { name: 'user', type: 6, required: true, description: 'User' },
        ]
    },

    {
        name: 'reputation',
        description: 'Give or take reputation of someone',
        options: [
            { name: 'target', type: 6, required: true, description: 'User' },
            {
                name: 'action',
                description: 'Actiong',
                type: 3,
                required: true,
                choices: [
                    { name: 'Like', value: 'like' },
                    { name: 'Dislike', value: 'dislike' },
                ]
            }
        ]
    },

    {
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

    // Rob \\
    {
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
    {
        name: 'rob',
        description: 'Rob someone',
        options: [
            { name: "target", type: 6, required: true, description: "Target" }
        ]
    },
    {
        name: 'heist',
        description: 'Plan a heist on targets',
        options: [
            {
                name: 'target',
                description: 'Target',
                type: 3,
                required: true,
                choices: [
                    { name: 'Seek out', value: 'seek' },
                    { name: 'Kids', value: 'kids' },
                    { name: 'Candy Shop', value: 'candy_shop' },
                    { name: 'Warehouse', value: 'warehouse' },
                    { name: 'Candy Factory', value: 'candy_factory' },
                    { name: 'Santa', value: 'santa' },
                ],
            },
            {
                name: 'difficulty',
                description: 'Difficulty',
                type: 3,
                required: true,
                choices: [
                    { name: 'Easy [0.5x]', value: 'easy' },
                    { name: 'Medium [1x]', value: 'medium' },
                    { name: 'Hard [1.5x]', value: 'hard' },
                ],
            }
        ]
    },


    // Inventory / Bank \\
    {
        name: 'wallet',
        description: 'Check your or another user wallet',
        options: [
            { name: 'user', type: 6, required: false, description: 'User' },
        ]
    },

    {
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

    // Gambling \\

    {
        name: 'slots',
        description: 'gamble ur currency',
        options: [
            { name: 'amount', type: 4, required: true, description: 'Gamble amount' },
            { name: 'view', type: 5, required: false, description: 'View Info' },
        ]
    },

    {
        name: 'coinflip',
        description: 'Come out as a winner or a loser for your whole life',
        options: [
            {
                name: 'action',
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

    // Fun \\
    {
        name: 'build-tower',
        dm_permission: true,
        description: 'Build a tower togheter with everyone else!',
    },

    {
        name: 'spin',
        dm_permission: true,
        description: 'Spin till you can’t no more!',
        options: [
            { name: "target", type: 6, required: true, description: "Target" }
        ]
    },

    {
        name: 'bonk',
        dm_permission: true,
        description: 'Bonk someone on the head',
        options: [
            { name: "target", type: 6, required: true, description: "Target" }
        ]
    },

    {
        name: 'randomvideo',
        dm_permission: true,
        description: 'Get a random video from youtube',
        options: [
            {
                name: 'type',
                description: 'Presets',
                type: 3,
                required: true,
                choices: [
                    { name: 'Normal', value: 'normal' },
                    { name: 'Cursed', value: 'cursed' },
                    { name: 'Old Tube (before 2010)', value: 'oldtube' },
                    { name: 'Educate', value: 'educate' },
                    { name: 'Brainrot', value: 'brainrot' },
                    { name: 'Under Two', value: 'undertwo' },
                ],
            },
            {
                name: 'input',
                description: 'Custom overwrite',
                type: 3,
                required: false,
                choices: [],
            },
        ]
    },

    {
        name: 'ship',
        dm_permission: true,
        description: 'Lets ship some people shall we?',
        options: [
            { name: "target", type: 6, required: true, description: "Lover 1" },
            { name: "target2", type: 6, required: true, description: "Lover 2" }
        ]
    },

    {
        name: 'patpat',
        dm_permission: true,
        description: 'Give someone some patpat’s',
        options: [
            { name: "target", type: 6, required: true, description: "User" }
        ]
    },

    {
        name: 'poke',
        dm_permission: true,
        description: 'Poke a friend!!!',
        options: [
            { name: "target", type: 6, required: true, description: "User" }
        ]
    },
    {
        name: 'hug',
        dm_permissionm: true,
        description: 'Hug someone',
        options: [
            { name: "target", type: 6, required: true, description: "User" }
        ]
    },
];

module.exports = commands;