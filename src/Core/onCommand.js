module.exports = {
    // -- Base -- \\
    "help": {
        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0
        },
        run: (i, c, m) => m.Help(i, c),
    },
    "info": {
        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0
        },
        run: (i, c, m) => m.Info(i, c),
    },

    "vote": {
        settings: {
            cooldown: 300,
            canShowCaptcha: false,
            risk: 0
        },
        run: (i, c, m) => m.Vote(i, c),
    },

    "delete-data": {
        settings: {
            cooldown: 600,
            canShowCaptcha: true,
            risk: 0
        },
        run: (i, c, m) => m.DataDeletion(i, c),
    },

    // -- Economy -- \\

    "fish": {
        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10
        },
        run: (i, c, m) => m.Work(i, c, "FISHING"),
    },
    "mine": {
        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10
        },
        run: (i, c, m) => m.Work(i, c, "MINING"),
    },
    "cook": {
        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10
        },
        run: (i, c, m) => m.Work(i, c, "COOKING"),
    },
    "hunt": {
        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10
        },
        run: (i, c, m) => m.Work(i, c, "HUNTING"),
    },
    // -- LVL. 5+ -- \\
    "chop": {
        settings: {
            cooldown: 120,
            canShowCaptcha: true,
            risk: 10
        },
        run: (i, c, m) => m.Work(i, c, "CHOP"),
    },
    "farm": {
        settings: {
            cooldown: 120,
            canShowCaptcha: true,
            risk: 10
        },
        run: (i, c, m) => m.Work(i, c, "FARM"),
    },
    "smith": {
        settings: {
            cooldown: 120,
            canShowCaptcha: true,
            risk: 10
        },
        run: (i, c, m) => m.Work(i, c, "SMITH"),
    },

    // -- Other -- \\

    "daily": {
        settings: {
            cooldown: 300,
            canShowCaptcha: true,
            risk: 10
        },
        run: (i, c, m) => m.Daily(i, c),
    },

    "leaderboard": {
        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10
        },
        run: (i, c, m) => {
            const type = i.options.getString('type');
            const upperType = type?.toUpperCase();
            return m.Leaderboard(i, c, upperType);
        }
    },

    "gift": {
        settings: {
            cooldown: 3600,
            canShowCaptcha: true,
            risk: 25
        },
        run: (i, c, m) => {
            const user = i.options.getUser('user');
            const amount = i.options.getInteger('amount');
            return m.Gift(i, c, user, amount);
        }
    },

    // -- Inventory -- \\

    "bank": {
        settings: {
            cooldown: 10,
            canShowCaptcha: false,
            risk: 0
        },
        run: (i, c, m) => {
            const amount = i.options.getInteger('amount');
            const action = i.options.getString('action');
            return m.Bank(i, c, { action: action, amount: amount });
        }
    },

    "wallet": {
        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0
        },
        run: (i, c, m) => {
            const target = i.options.getUser('target');
            return m.Wallet(i, c, target);
        }
    },

    // -- Criminal -- \\

    "rob": {
        settings: {
            cooldown: 1500,
            canShowCaptcha: true,
            risk: 25
        },
        run: async (i, c, m) => {
            const target = i.options.getUser('target');
            m.Rob(i, c, target)
        }
    },
    
    "heist": {
        settings: {
            cooldown: 1500,
            canShowCaptcha: true,
            risk: 25
        },
        run: async (i, c, m) => {
            const target = i.options.getString('target');
            const difficulty = i.options.getString('difficulty');
            m.Heist(i, c, target, difficulty)
        }
    },

    // -- Gambling -- \\

    "dice": {
        settings: {
            cooldown: 90,
            canShowCaptcha: true,
            risk: 10
        },
        run: (i, c, m) => {
            const amount = i.options.getInteger('amount');
            const type = i.options.getString('type');
            return m.Dice(i, c, amount, type);
        }
    },

    "rock-paper-scissors": {
        settings: {
            cooldown: 90,
            canShowCaptcha: true,
            risk: 10
        },
        run: (i, c, m) => {
            const amount = i.options.getInteger('amount');
            const type = i.options.getString('type');
            return m.RPS(i, c, amount, type);
        }
    },

    "slots": {
        settings: {
            cooldown: 90,
            canShowCaptcha: true,
            risk: 10
        },
        run: (i, c, m) => {
            const amount = i.options.getInteger('amount');
            const viewInfo = i.options.getBoolean('view') ?? false;
            return m.Slots(i, c, amount, viewInfo);
        }
    },

    // -- Fun -- \\

    "bonk": {
        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0
        },
        run: async (i, c, m) => {
            // Changed i.option to i.options
            const target = i.options.getUser("target");
            return m.socialActions.Bonk(i, c, target);
        }
    },

    "build-tower": {
        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },
        run: async(i, c, m) => {
            return m.Tower(i, c);
        }
    },

    "patpat": {
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

    "hug": {
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