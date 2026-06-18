// index.js

// Main modules
const result = require('dotenv').config();
const Testers = process.env.TESTER?.split(',') || [];
const Developers = process.env.DEVELOPER?.split(',') || [];

const configManager = require('./Core/configManager');
const config = configManager.raw;
const CORE_SETTINGS = config.CORE.SETTINGS;
const COMMANDS_PER_MINUTE = CORE_SETTINGS.COMMANDS_PER_MINUTE;
const GUILD_SIZE_SPEC = CORE_SETTINGS.GUILD_SIZE_SPEC;
const GUILD_CACHE_TTL = CORE_SETTINGS.GUILD_CACHE_TTL;
const CORE_MESSAGES = config.CORE.MESSAGES;

const DISCORD_ERRORS = {
    UNKNOWN_INTERACTION: 10062,
    INTERACTION_ALREADY_ACKNOWLEDGED: 40060
};

const CacheMaid = require("./Utilities/CacheMaid")
const botMAP = CacheMaid.new("bot");
const guildSizeCache = CacheMaid.new("core_guildSizeCache");
CacheMaid.autoEvict("core_guildSizeCache", 25, 3600000)

const { setCooldown, checkCooldown, editCooldown } = require('./Utilities/Cooldown');
const { AddToGlobalAsync, initDB, initGlobals, initGuilds, GetAsync } = require("./DataStorage/Datastore");

CacheMaid.patch("bot", {
    startTime: Date.now(),
    commandsSinceStartup: 0,
    singleUsages: new Map()
});

{
    initDB().catch(console.error);
    initGlobals().catch(console.error);
    initGuilds().catch(console.error);
}

const { GetRate, AddRate } = require("./Utilities/Ratelimit");
const confirmInteraction = require("./Utilities/Captcha");

const loadModules = require('./Utilities/LoadCommandsModules');
const commandModules = loadModules('./src/Commands');

const onMessage = require('./Core/onMessage');
const onCommand = require('./Core/onCommand');
const onboarding = require("./Commands/Base/Onboarding");

let token;
let botId;
let clientId;
const devMode = config.CORE.SETTINGS.DEVELOPER_MODE;

if (config.CORE.SETTINGS.DEVELOPER_MODE) {
    token = process.env.DEV_TOKEN;
    botId = process.env.DEV_BOT_ID;
    clientId = process.env.DEV_CLIENT_ID;
} else {
    token = process.env.TOKEN;
    botId = process.env.BOT_ID;
    clientId = process.env.CLIENT_ID;
}

const OwnerID = process.env.OWNER_ID;

const { Client, GatewayIntentBits, Options } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const restClient = new REST({ version: '10' }).setToken(token);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    makeCache: Options.cacheWithLimits({
        MessageManager: 50,       // keep messages small
        UserManager: 1000,        // max 1000 users in cache
        GuildMemberManager: 500,  // max 500 members per guild
        ThreadManager: 0,        // limit threads per channel
    })
});

// Handle bot Status + Activity
client.once('clientReady', async () => {
    const colors = {
        reset: '\x1b[0m',
        cyan: '\x1b[36m',
        magenta: '\x1b[35m',
        green: '\x1b[32m',
        blue: '\x1b[34m',
        gray: '\x1b[90m',
        yellow: '\x1b[93m',
        bold: '\x1b[1m'
    };

    const version = require('../package.json').version;
    const mode = devMode ? '🔧 DEVELOPMENT' : '🚀 PRODUCTION';
    const tag = client?.user?.tag || 'Starting...';

    console.log();
    console.log(colors.green + '╔═══════════════════════════════════════════════════════════════════════════════╗' + colors.reset);
    console.log(colors.green + '║' + colors.reset);
    console.log(colors.green + '║' + colors.magenta + '  ██╗   ██╗██╗   ██╗███╗   ██╗ █████╗       ██████╗ ██████╗ ██████╗ ███████╗' + colors.reset);
    console.log(colors.green + '║' + colors.magenta + '  ╚██╗ ██╔╝██║   ██║████╗  ██║██╔══██╗     ██╔════╝██╔═══██╗██╔══██╗██╔════╝' + colors.reset);
    console.log(colors.green + '║' + colors.magenta + '   ╚████╔╝ ██║   ██║██╔██╗ ██║███████║     ██║     ██║   ██║██║  ██║█████╗  ' + colors.reset);
    console.log(colors.green + '║' + colors.magenta + '    ╚██╔╝  ██║   ██║██║╚██╗██║██╔══██║     ██║     ██║   ██║██║  ██║██╔══╝  ' + colors.reset);
    console.log(colors.green + '║' + colors.magenta + '     ██║   ╚██████╔╝██║ ╚████║██║  ██║     ╚██████╗╚██████╔╝██████╔╝███████╗' + colors.reset);
    console.log(colors.green + '║' + colors.magenta + '     ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝      ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝' + colors.reset);
    console.log(colors.green + '║' + colors.reset);
    console.log(colors.green + '╠═══════════════════════════════════════════════════════════════════════════════╣' + colors.reset);
    console.log(colors.green + '║' + colors.cyan + colors.bold + `  Yeco v${version}` + colors.reset);
    console.log(colors.green + '║' + colors.blue + `  Developed and maintained by Yuna2077` + colors.reset);
    console.log(colors.green + '║' + colors.gray + `  Mode: ${mode}` + colors.reset);
    console.log(colors.green + '║' + colors.yellow + `  Logged in as: ${tag}` + colors.reset);
    console.log(colors.green + '╚═══════════════════════════════════════════════════════════════════════════════╝' + colors.reset);
    console.log();

    const { ActivityType } = require('discord.js');

    if (devMode) {
        client.user.setPresence({
            activities: [{
                name: 'Maintenance Mode',
                type: ActivityType.Playing,
            }],
            status: 'dnd', // online, offline, idle, dnd
        });

    } else {
        client.user.setPresence({
            activities: [{
                name: '/help • Summer Mode ☀️ • V2026.06.1',
                type: ActivityType.Playing,
            }],
            status: 'online',
        });
    }

    setInterval(() => {
        const usage = process.memoryUsage();

        if (config.CORE.SETTINGS.DEBUG_MEMORY)
            console.log({
                rss: (usage.rss / 1024 / 1024).toFixed(2) + " MB",
                heapUsed: (usage.heapUsed / 1024 / 1024).toFixed(2) + " MB",

                guilds: client.guilds.cache.size,
                users: client.users.cache.size,
                channels: client.channels.cache.size
            });

        if (usage > config.CORE.SETTINGS.MAX_MEMORY_USAGE) {
            console.log("Memory limit exceeded, shutting down.");
            process.exit(1);
        };
    }, 10000);
});

// -- Message handler
client.on('messageCreate', (message) => {
    onMessage(message, {
        client: client,
        ownerID: OwnerID,
        restClient: restClient,
        clientID: clientId,
        developers: Developers,
    })
});

// -- Command handler helper
const tiers = Object.values(GUILD_SIZE_SPEC)
    .sort((a, b) => a.COUNT - b.COUNT);

function getGuildTier(guild) {
    if (!guild) return "OVERSIZED";

    const cached = guildSizeCache.map.get(guild.id);
    const now = Date.now();

    // use cache if valid
    if (cached && (now - cached.updated < GUILD_CACHE_TTL)) {
        return cached.tier;
    }

    const size = guild.memberCount;

    let currentTier = "OVERSIZED";

    for (const tier of tiers) {
        if (size >= tier.COUNT) {
            currentTier = tier.LOCKOUT_NAME;
        } else {
            break;
        }
    }

    guildSizeCache.map.set(guild.id, {
        tier: currentTier,
        updated: now
    });

    return currentTier;
}

// -- Command handler
client.on('interactionCreate', async (interaction) => {
    if (!interaction?.isChatInputCommand()) return;

    const { commandName, user, guild } = interaction;

    if (CORE_SETTINGS.DEVELOPER_MODE && user.id !== OwnerID && !Testers.includes(user.id))
        return interaction.reply({ content: "This bot is currently being maintained, please try again later!", flags: 64 });

    // ========================
    // Defer
    // ========================
    if (!interaction.deferred && !interaction.replied) {
        try {
            await interaction.deferReply();
        } catch (err) {
            if (err.code === DISCORD_ERRORS.UNKNOWN_INTERACTION || err.code === DISCORD_ERRORS.INTERACTION_ALREADY_ACKNOWLEDGED) {
                console.log(`[Interaction Log] ${interaction.user.tag} interaction expired or was already handled.`);
                return;
            }

            // Log other serious errors (API down, etc.)
            console.error("Critical error during deferral:", err);
            return;
        }
    }

    // ========================
    // Gather base variables
    // ========================
    const userId = user.id;
    const handler = onCommand[commandName];
    const module = commandModules;
    const settings = handler?.settings
    const members = guild?.memberCount || 0;

    if (!handler || !module) {
        return interaction.editReply({ content: config.CORE.MESSAGES.ACTION_UNAVAILABLE, flags: 64 });
    }

    // ========================
    // Server Lockout
    // ========================
    const tier = getGuildTier(guild);

    if (
        guild &&
        !config.CORE.SETTINGS.GUILD_SIZE_IGNORE.includes(guild.id) &&
        settings.guildSizeLockout?.includes(tier)
    ) {
        const display = tier.charAt(0) + tier.slice(1).toLowerCase();

        return interaction.editReply({
            content: configManager.getMsg("CORE.MESSAGES.SERVER_LOCKOUT_MESSAGE", { tier: tier }),
        });
    }

    // ========================
    // COOLDOWN + RATE LIMIT
    // ========================

    {
        const Rate = AddRate(user.id)
        if (Rate > COMMANDS_PER_MINUTE) {
            return interaction.editReply({ content: configManager.getMsg("CORE.MESSAGES.ACTION_RATE_LIMIT") });
        };
    }

    {
        const commandCooldown = await checkCooldown(interaction, commandName);
        if (commandCooldown) return;
        setCooldown(interaction, commandName, settings.cooldown);
    }

    // ========================
    // CAPTCHA
    // ========================
    if (settings.canShowCaptcha) {
        const riskScore = settings.risk / 100 || 0;
        const userRate = GetRate(user.id);
        const shouldShow = (Math.random() < riskScore) || (userRate >= COMMANDS_PER_MINUTE);

        if (shouldShow) {
            try {
                const passed = await confirmInteraction(interaction, client);
                if (!passed) {
                    // Penalize bots with a longer cooldown
                    editCooldown(interaction, commandName, 30);
                    return; // confirmInteraction usually handles the 'failed' message
                }
            } catch (err) {
                console.error(`Captcha Error:`, err);
                return interaction.editReply({ content: configManager.getMsg("CORE.MESSAGES.CAPTCHA_FAIL") });
            }
        }
    }

    // ========================
    // Command
    // ========================
    try {
        const tags = handler.settings.tags || [];

        if (!tags.includes("DM_ENABLED")) {
            if (!guild) {
                return interaction.editReply({ content: configManager.getMsg("CORE.MESSAGES.NOT_IN_GUILD") });
            }
        }

        if (tags.includes("ONBOARDING")) {
            const onboardingCompleted = await GetAsync(userId, "ONBOARDING_COMPLETED") || false;

            if (!onboardingCompleted) {
                editCooldown(interaction, commandName, 10);
                return onboarding(interaction, client);
            }
        }

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Command timeout")), 10000)
        );

        await Promise.race([
            handler.run(interaction, client, module),
            timeoutPromise
        ])

        AddToGlobalAsync({ "COMMANDS_USED": 1 })
        CacheMaid.patchAdvanced("bot", {
            commandsSinceStartup: (v) => (v || 0) + 1,
            singleUsages: (map) => {
                map = map || new Map();
                map.set(commandName, (map.get(commandName) || 0) + 1);
                return map;
            }
        });

    } catch (err) {
        console.error(`Error executing command ${commandName}:`, err);

        CacheMaid.patchAdvanced("bot", {
            errors: (v) => (v || 0) + 1
        });

        await interaction.editReply({
            content: configManager.getMsg("CORE.MESSAGES.COMMAND_ERROR_PROCESS")
        }).catch(() => { });
    }
});

client.login(token);
module.exports = { client };