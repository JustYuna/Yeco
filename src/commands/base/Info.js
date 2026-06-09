require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

// Ensure the token is loaded; if not, we'll log a warning
const API_TOKEN = process.env.PRONOUNCECC_TOKEN?.trim();
const ConfigManager = require("../../Core/configManager");

async function info(interaction) {
    const sid = "560203020681793987";

    try {
        const res = await fetch(`https://pronouns.cc/api/v1/users/${sid}`, {
            headers: {
                Authorization: API_TOKEN || ""
            }
        });

        if (!res.ok) {
            return interaction.editReply("User not found on pronouns.cc.");
        }

        const user = await res.json();
        const username = user.name || user.username || "Unknown";
        const bio = user.bio ? user.bio.slice(0, 500) : "No bio provided.";
        const avatarUrl = user.avatar
            ? `https://cdn.pronouns.cc/users/${user.id}/${user.avatar}.webp`
            : "https://pronouns.cc/default/512.webp";


        const embed = new EmbedBuilder()
            .setColor([150, 100, 250])
            .setTitle("Yeco Info")
            .setThumbnail(avatarUrl)
            .setDescription(
                `Open-source Discord economy and progression bot with a persistent cross-server world.`
            )
            .addFields(
                {
                    name: "❤️‍🩹 About Yeco ❤️‍🩹",
                    value:
                        `[Terms of Service](${ConfigManager.raw.OTHER.TOS.RAW})
[Privacy Policy](${ConfigManager.raw.OTHER.PRIVACY_POLICY.RAW})
[Changelog](${ConfigManager.raw.OTHER.CHANGELOG.RAW})
[Source Code](${ConfigManager.raw.OTHER.SOURCE_CODE.RAW})
[Support Server](${ConfigManager.raw.OTHER.SUPPORT_SERVER.RAW})`
                },
                {
                    name: "🧾 Credits",
                    value: `**~ Developer ~\n${username}\n\n~ Icons ~**\ngvesster\n${username}\n\n**~ Alpha Tester ~**\nepsilon.art\nviledairy\nilylilylila`
                }
            )
            .setFooter({ text: `Powered by: ${username}` });

        await interaction.editReply({ embeds: [embed] });

    } catch (err) {
        console.log("[ERROR](Info.js): Failed to send embed with error:", err);
        await interaction.editReply("Something broke while fetching the bio.");
    }
}

module.exports = info;