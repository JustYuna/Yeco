const ConfigManager = require("./configManager");

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
            risk: 0,
            guildSizeLockout: [ "LARGE", "HUGE" ]
        },
        run: (i, c, m) => m.Info(i, c),
    },
    "cooldown": {
        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            guildSizeLockout: [ "MEDIUM", "LARGE", "HUGE" ]
        },
        run: (i, c, m) => m.Cooldowns(i, c),
    },
    "onboarding": {
        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            guildSizeLockout: [ "MEDIUM", "LARGE", "HUGE" ]
        },
        run: (i, c, m) => m.Onboarding(i, c),
    },
    "settings": {
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
    "report": {
        settings: {
            cooldown: 300,
            canShowCaptcha: true,
            risk: 15,
            tags: ["DM_ENABLED"]
        },
        run: async (i, c, m) => {
            const type = i.options.getString("type");
            const message = i.options.getString("message");

            // basic validation
            if (!message || message.length < 5) {
                return i.editReply({
                    content: "Please provide a more detailed message."
                });
            }

            // send to webhook
            m.webhook(i, message, type, {
                title:
                    type === "report"
                        ? "🚨 Bug Report"
                        : type === "abuse"
                        ? "⚠️ Abuse Report"
                        : "💬 Feedback",
                color:
                    type === "report"
                        ? 0xff0000
                        : type === "abuse"
                        ? 0xffa500
                        : 0x00b0f4
            });

            return i.editReply({
                content: "Thanks! Your message has been sent 💌"
            });
        }
    },

    "vote": {
        settings: {
            cooldown: 300,
            canShowCaptcha: false,
            risk: 0
        },
        run: (i, c, m) => m.Vote(i, c),
    },

    "me": {
        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },
        run: (i, c, m) => {
            const type = i.options.getString("type");

            switch (type) {
                case "delete_data": return m.DataDeletion(i, c);
                case "tos": return i.editReply({ content: ConfigManager.raw.OTHER.TOS.TEXT });
                case "privacy_policy": return i.editReply({ content: ConfigManager.raw.OTHER.PRIVACY_POLICY.TEXT });
                default: return i.editReply({ content: ConfigManager.raw.CORE.MESSAGES.ACTION_UNAVAILABLE });
            }
        },
    },

    // -- Economy -- \\

    "farm": {
        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10,
            tags: [ "ONBOARDING" ]
        },
        run: (i, c, m) => m.Work(i, c, "FARM"),
    },
    "gather": {
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

    // -- Other -- \\

    "daily": {
        settings: {
            cooldown: 300,
            canShowCaptcha: true,
            risk: 10,
            tags: [ "DM_ENABLED", "ONBOARDING" ]
        },
        run: (i, c, m) => m.Daily(i, c),
    },

    "leaderboard": {
        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10,
            guildSizeLockout: [ "LARGE", "HUGE" ]
        },
        run: (i, c, m) => {
            const type = i.options.getString('type');
            const upperType = type?.toUpperCase();
            return m.Leaderboard(i, c, upperType);
        }
    },

    "reputation": {
        settings: {
            cooldown: 30,
            canShowCaptcha: true,
            risk: 10,
            guildSizeLockout: [ "LARGE", "HUGE" ]
        },
        run: (i, c, m) => {
            const target = i.options.getUser('target');
            const action = i.options.getString('action');
            return m.Reputation(i, c, { action: action, target: target });
        }
    },

    "gift": {
        settings: {
            cooldown: 3600,
            canShowCaptcha: true,
            risk: 25,
            guildSizeLockout: [ "LARGE", "HUGE" ],
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
        settings: {
            cooldown: 1500,
            canShowCaptcha: true,
            risk: 25,
            guildSizeLockout: [ "MEDIUM", "LARGE", "HUGE" ],
            tags: [ "ONBOARDING" ]
        },
        run: async (i, c, m) => {
            const target = i.options.getString('target');
            const difficulty = i.options.getString('difficulty');
            m.Heist(i, c, target, difficulty)
        }
    },

    // -- Gambling -- \\

    "coinflip": {
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
        settings: {
            cooldown: 90,
            canShowCaptcha: true,
            risk: 10,
            guildSizeLockout: [ "MEDIUM", "LARGE", "HUGE" ],
            tags: [ "ONBOARDING" ]
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
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },
        run: async (i, c, m) => {
            const target = i.options.getUser("target");
            return m.socialActions.Bonk(i, c, target);
        }
    },

    "randomvideo": {
        settings: {
            cooldown: 5,
            canShowCaptcha: false,
            risk: 0,
            tags: [ "DM_ENABLED" ]
        },
        run: async (i, c, m) => {
            const type = i.options.getString("type");
            return m.RandomVideo(i, c, { type: type });
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

    "spin": {
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