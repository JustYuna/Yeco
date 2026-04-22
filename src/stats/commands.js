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

    //{
    //    name: 'vote',
    //    description: 'Vote and contribute to the goal!',
    //},

    {
        name: 'delete-data',
        description: 'Request deletion of all your stored data. This action cannot be undone.',
    },

    // Work \\
    {
        name: 'hunt',
        description: 'Hunt some animals for money',
    },
    {
        name: 'fish',
        description: 'Lets go fishing for some money',
    },
    {
        name: 'mine',
        description: 'Minecraft but you get payed?',
    },
    {
        name: 'cook',
        description: 'You are not gorden ramsey...',
    },

    // LVL. 5+ \\
    {
        name: 'chop',
        description: 'Chop, chop, the lorax aint so happy...',
    },
    {
        name: 'farm',
        description: 'Old MacDonald Had a Farm',
    },
    {
        name: 'smith',
        description: 'Can you realy smith tho?',
    },

    // Other Economy \\

    {
        name: 'daily',
        description: 'Claim your daily amount of money',
    },

    {
        name: 'gift',
        description: 'Give your candy to another user',
        options: [
            { name: 'amount', type: 4, required: true, description: 'Amount' },
            { name: 'user', type: 6, required: true, description: 'User' },
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
        name: 'dice',
        description: 'Roll some dice',
        options: [
            {
                name: 'type',
                description: 'Play type',
                type: 3,
                required: true,
                choices: [
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                    { name: '6', value: '6' },
                    { name: '< 3', value: 'higher' },
                    { name: '> 3', value: 'lower' },
                    { name: 'odd', value: 'odd' },
                    { name: 'even', value: 'even' },
                ],
            },
            { name: 'amount', type: 4, required: true, description: 'Gamble amount' },
        ],
    },

    {
        name: 'rock-paper-scissors',
        description: 'Bet and play rps against the Trickster!',
        options: [
            {
                name: 'type',
                description: 'Play type',
                type: 3,
                required: true,
                choices: [
                    { name: '🪨 Rock', value: 'rock' },
                    { name: '✂️ Scissors ', value: 'scissors' },
                    { name: '📃 Paper', value: 'paper' },
                ],
            },
            { name: 'amount', type: 4, required: true, description: 'Gamble amount' },
        ],
    },

    {
        name: 'slots',
        description: 'gamble ur money',
        options: [
            { name: 'amount', type: 4, required: true, description: 'Gamble amount' },
            { name: 'view', type: 5, required: false, description: 'View Info' },
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