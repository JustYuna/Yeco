// index.js

// Main modules
const result = require('dotenv').config();

const { setCooldown, checkCooldown, editCooldown } = require('./Utils/Cooldown');
const { AddToGlobalAsync, initDB, initGlobals } = require("./DataStorage/Datastore");
const CacheMaid = require("./Utils/CacheMaid")
const botMAP = CacheMaid.new("bot");
CacheMaid.patch("bot", {
    startTime: Date.now(),
    commandsSinceStartup: 0,
    singleUsages: new Map()
});

{
    initDB().catch(console.error);
    initGlobals().catch(console.error);
}

const { GetRate, AddRate } = require("./Utils/Ratelimit");
const confirmInteraction = require("./Utils/Captcha");

const loadModules = require('./helpers/loadCommandsModules');
const commandModules = loadModules('./src/commands');

const onMessage = require('./Core/onMessage');
const onCommand = require('./Core/onCommand');

const token = process.env.TOKEN;
const botId = process.env.BOT_ID;
const clientId = process.env.CLIENT_ID;

const OwnerID = process.env.OWNER_ID;

const { Client, GatewayIntentBits, Options } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const config = require('./Core/config');
const configManager = require('./Core/configManager');

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
    console.log(`Logged in as ${client.user.tag}!`);

    const { ActivityType } = require('discord.js');

    if (config.CORE.SETTINGS.DEVELOPER_MODE) {
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
                name: '/help',
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
        clientID: clientId
    })
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction && !interaction.isChatInputCommand()) return;

    const { commandName, user, guild } = interaction;

    if (config.CORE.SETTINGS.DEVELOPER_MODE && user.id !== OwnerID && !Testers.includes(user.id))
        return interaction.reply({ content: "This bot is currently being maintained, please try again later!", flags: 64 });

    // ========================
    // Defer
    // ========================
    if (!interaction.deferred && !interaction.replied) {
        try {
            await interaction.deferReply(); 
        } catch (err) {
            // Error Code 10062 = Unknown Interaction (Expired)
            // Error Code 40060 = Interaction has already been acknowledged
            if (err.code === 10062 || err.code === 40060) {
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

    if (!handler || !module) {
        return interaction.editReply({ content: config.CORE.MESSAGES.ACTION_UNAVAILABLE, flags: 64 });
    }

    // ========================
    // COOLDOWN
    // ========================
    
     {
        AddRate(user.id)
        const Rate = GetRate(user.id)
        if (Rate > config.CORE.SETTINGS.COMMANDS_PER_MINUTE) {
            return interaction.editReply({ content: config.CORE.MESSAGES.ACTION_RATE_LIMIT });
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
        const shouldShow = (Math.random() < riskScore) || (userRate >= configManager.raw.CORE.SETTINGS.COMMANDS_PER_MINUTE);

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
                return interaction.editReply("There was an error verifying your interaction.");
            }
        }
    }

    // ========================
    // Command
    // ========================
    try {
        const tags = handler.settings.tags || [];

        if (!tags.includes("DM_ENABLED")) {
            if (!guild || guild.memberCount < 5) {
                return interaction.editReply({
                    content: "This command is not available here.\n[Requirements]:\nMust be in a server\nServer must have 5+ members"
                });
            }
        }

        await handler.run(interaction, client, module);

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
            content: "An error occurred while processing the command."
        }).catch(() => {});
    }
});

client.login(token);
module.exports = { client };