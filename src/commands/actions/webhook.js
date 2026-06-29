const { WebhookClient, EmbedBuilder } = require("discord.js");
require("dotenv").config();

const Presets = require("../../../other/Yeco-Hangout/embed_presets");

const webhookMap = {
    feedback: process.env.WEBHOOK_FEEDBACK,
    update: process.env.WEBHOOK_UPDATE,
    rules: process.env.WEBHOOK_RULES,
};

const webhookSettings = {
    update: {
        type: "raw",
    },

    feedback: {
        type: "feedback",
    },

    rules: {
        type: "preset",
        preset: Presets.rules
    }
};

const clients = {};

function getClient(type) {
    const url = webhookMap[type];
    if (!url) return null;

    if (!clients[type]) {
        clients[type] = new WebhookClient({ url });
    }

    return clients[type];
}

async function sendWebhook(
    interaction,
    text,
    type = "feedback",
    extra = {}
) {
    try {
        const client = getClient(type);
        if (!client) return;

        const settings = webhookSettings[type];
        if (!settings) return;

        const safeText = String(text).replace(/```/g, "'''");

        // RAW MESSAGE
        if (settings.type === "raw") {

            const content = settings.ping
                ? `<@&${settings.ping}>\n${safeText}`
                : safeText;

            await client.send({
                username: extra.username || "Yeco",
                content,

                allowedMentions: {
                    roles: settings.ping
                        ? [settings.ping]
                        : [],
                },
            });

        // EMBED FEEDBACK
        } else if (settings.type === "preset") {
            await client.send({
                username: extra.username || "Yeco",
                embeds: [settings.preset],
            });

        } else if (settings.type === "feedback") {

            const embed = new EmbedBuilder()
                .setTitle(extra.title || `📩 ${type.toUpperCase()}`)
                .setDescription(safeText)
                .addFields(
                    {
                        name: "User",
                        value: `${interaction.user.tag} (${interaction.user.id})`,
                    },
                    {
                        name: "Server",
                        value: interaction.guild
                            ? `${interaction.guild.name} (${interaction.guild.id})`
                            : "DM",
                    }
                )
                .setTimestamp();

            if (extra.color) {
                embed.setColor(extra.color);
            }

            if (extra.fields) {
                embed.addFields(extra.fields);
            }

            await client.send({
                username: extra.username || "Yeco",
                embeds: [embed],
            });
        }

    } catch (err) {
        console.error(`[Webhook:${type}]`, err);
    }
}

module.exports = sendWebhook;