const { WebhookClient, EmbedBuilder } = require("discord.js");
require("dotenv").config();

const webhookMap = {
    feedback: process.env.WEBHOOK_FEEDBACK,
    report: process.env.WEBHOOK_REPORT,
};

const clients = {};

// lazy init (only create when needed)
function getClient(type) {
    if (!webhookMap[type]) return null;

    if (!clients[type]) {
        clients[type] = new WebhookClient({ url: webhookMap[type] });
    }

    return clients[type];
}

async function sendWebhook(interaction, text, type = "feedback", extra = {}) {
    try {
        const client = getClient(type);
        if (!client) return;

        const embed = new EmbedBuilder()
            .setTitle(extra.title || `📩 ${type.toUpperCase()}`)
            .setDescription(text)
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

        if (extra.color) embed.setColor(extra.color);
        if (extra.fields) embed.addFields(extra.fields);

        await client.send({
            username: extra.username || "Yeco Logs",
            embeds: [embed],
        });

    } catch (err) {
        console.error(`[Webhook:${type}]`, err);
    }
}

module.exports = sendWebhook;