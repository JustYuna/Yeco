const config = require("./config");
const { EmbedBuilder } = require('discord.js');

const configManager = {
    raw: config,

    /**
     * Internal helper to resolve placeholders based on current theme and variables
     * @param {string} str - The raw string with placeholders
     * @param {object} vars - Custom variables to inject
     */
    _resolve: (str, vars = {}) => {
        if (!str || typeof str !== 'string') return str;

        const activeKey = config.CORE.THEMES.ACTIVE;
        const theme = config.CORE.THEMES[activeKey];

        // Map emojis → emoji_Candy, emoji_Cookie, etc.
        const emojiContext = Object.fromEntries(
            Object.entries(config.CORE.EMOJIS)
                .map(([key, val]) => [`emoji_${key}`, val])
        );

        const context = {
            ...emojiContext,                 // {emoji_Candy}
            ...config.CORE.EMOJIS,           // {Candy}
            ...vars,

            mainCurrency_name: theme.CURRENCY.MAIN.NAME,
            mainCurrency_emoji: theme.CURRENCY.MAIN.EMOJI,
            secondaryCurrency_name: theme.CURRENCY.SECONDARY.NAME,
            secondaryCurrency_emoji: theme.CURRENCY.SECONDARY.EMOJI,

            color_main: theme.COLORS.MAIN,
            color_secondary: theme.COLORS.SECONDARY
        };

        let result = str;
        let prev;

        // 🔥 Resolve nested placeholders safely
        do {
            prev = result;
            result = result.replace(/{(\w+)}/g, (match, key) => {
                return context[key] !== undefined ? context[key] : match;
            });
        } while (result !== prev);

        return result;
    },

    /**
     * Get a message from the config path and parse it
     */
    getMsg: (path, vars = {}) => {
        const str = path.split('.').reduce((obj, key) => obj?.[key], config);
        if (!str) return `[String not found: ${path}]`;
        
        return configManager._resolve(str, vars);
    },

    /**
     * Directly parse a raw string using the theme engine
     */
    parseMsg: (rawString, vars = {}) => {
        return configManager._resolve(rawString, vars);
    },

    parseEmbed: (embedConfig, vars = {}) => {
        if (!embedConfig || typeof embedConfig !== "object") return null;

        const parsed = {};

        // simple fields
        if (embedConfig.title)
            parsed.title = configManager._resolve(embedConfig.title, vars);

        if (embedConfig.description)
            parsed.description = configManager._resolve(embedConfig.description, vars);

        if (embedConfig.color)
            parsed.color = embedConfig.color === "MAIN"
                ? configManager.getColor()
                : embedConfig.color;

        // fields[]
        if (Array.isArray(embedConfig.fields)) {
            parsed.fields = embedConfig.fields.map(f => ({
                name: configManager._resolve(f.name, vars),
                value: configManager._resolve(f.value, vars),
                inline: f.inline ?? false
            }));
        }

        // footer
        if (embedConfig.footer) {
            parsed.footer = {
                text: configManager._resolve(embedConfig.footer, vars)
            };
        }

        return parsed;
    },

    getEmbed: (path, vars = {}) => {
        const embedConfig = path.split('.').reduce((obj, key) => obj?.[key], config);

        if (!embedConfig) {
            return null;
        }

        const parsed = configManager.parseEmbed(embedConfig, vars);
        if (!parsed) return null;

        const embed = new EmbedBuilder();

        if (parsed.title) embed.setTitle(parsed.title);
        if (parsed.description) embed.setDescription(parsed.description);
        if (parsed.color) embed.setColor(parsed.color);
        if (parsed.fields) embed.addFields(parsed.fields);
        if (parsed.footer) embed.setFooter(parsed.footer);

        return embed;
    },

    getColor: () => {
        const activeKey = config.CORE.THEMES.ACTIVE;
        return config.CORE.THEMES[activeKey].COLORS.MAIN;
    }
};

module.exports = configManager;