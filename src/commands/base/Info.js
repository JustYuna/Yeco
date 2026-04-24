require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

// Ensure the token is loaded; if not, we'll log a warning
const API_TOKEN = process.env.PRONOUNCECC_TOKEN?.trim();

async function info(interaction) {
    const sid = "560203020681793987"; // your ID

    try {
        // You only need to defer if your command handler hasn't done it yet
        // await interaction.deferReply(); 

        const res = await fetch(`https://pronouns.cc/api/v1/users/${sid}`, {
            headers: {
                Authorization: API_TOKEN || "" // Fallback for safety
            }
        });

        if (!res.ok) {
            return interaction.editReply("User not found on pronouns.cc.");
        }

        const user = await res.json();
        
        // --- 🛠️ Extraction Fixes ---
        const username = user.name || user.username || "Unknown";
        // Check if bio is null/empty and sanitize
        const bio = user.bio ? user.bio.slice(0, 500) : "No bio provided.";

        // --- 📸 Avatar Logic ---
        // Note: pronouns.cc sometimes uses direct URLs or relative paths
        const avatarUrl = user.avatar
            ? `https://cdn.pronouns.cc/users/${user.id}/${user.avatar}.webp`
            : "https://pronouns.cc/default/512.webp";

        // --- 🧱 Embed Building ---
        const embed = new EmbedBuilder()
            .setColor(0x2b2d31)
            .setTitle("Trickster Info")
            .setThumbnail(avatarUrl)
            .setDescription(
                `**Developer:** ${username}\n` +
                `This bot is designed to be a global economy bot to sync up multiple servers into using one stable system!`
            )
            .addFields(
                {
                    name: "🔗 Changelogs",
                    value:
                        "[View Changelog](https://github.com/JustYuna/Yeco/blob/main/Changelog.md)\n" +
                        "[View Source Code](https://github.com/JustYuna/Yeco)"
                },
                {
                    name: "🌐 Socials",
                    value:
                        "[Support Server](https://discord.gg/43kaQUsUjf)\n" +
                        `[About ${username}](https://pronouns.cc/@Snuv)\n` +
                        "[GitHub](https://github.com/JustSnuv)"
                },
                {
                    name: "🧾 Credits",
                    value: `Icons: gvesster + ${username}`
                }
            )
            .setFooter({ text: `Powered by: ${username}` });

        await interaction.editReply({ embeds: [embed] });

    } catch (err) {
        console.error("Error in Info command:", err);
        // Using a check to see if the interaction was already replied to
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply("Something broke while fetching the bio.");
        } else {
            await interaction.reply({ content: "Something broke.", ephemeral: true });
        }
    }
}

module.exports = info;