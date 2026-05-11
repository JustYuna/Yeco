const { WebhookClient, EmbedBuilder } = require("discord.js");
require("dotenv").config();

const webhookMap = {
    feedback: process.env.WEBHOOK_FEEDBACK,
    report: process.env.WEBHOOK_REPORT,
    update: process.env.WEBHOOK_UPDATE,
    rules: process.env.WEBHOOK_RULES,
};

const webhookSettings = {
    update: {
        ping: process.env.ROLEID_UPDATE,
        type: "raw",
    },

    feedback: {
        type: "feedback",
    },

    report: {
    type: "feedback",
},

rules: {
    type: "preset",
    preset: new EmbedBuilder()
        .setColor('Aqua')
        .setTitle('📜 Server Rules')
        .setAuthor({
            name: 'Yuna',
        })
        .addFields(
            {
                name: 'General Rules',
                value: `
1. Be respectful — no harassment or personal attacks.
2. No NSFW or clearly offensive content.
3. Avoid spam, trolling, and disruptive behavior.
4. Don't impersonate others or misuse alt accounts.
5. Follow Discord's Terms of Service.
6. Use English in public channels, including voice channels.
7. Do not send AI-generated content.
8. Promotion of any kind is forbidden.
9. Sending scam or malicious content will result in a ban.
                `,
            },
            {
                name: 'Regarding Yeco',
                value: `
Terms of Service:
https://github.com/JustYuna/Yeco/blob/main/ToS.md

Privacy Policy:
https://github.com/JustYuna/Yeco/blob/main/PrivacyPolicy.md
                `,
            }
        ),
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