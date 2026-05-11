const { EmbedBuilder } = require("discord.js");
const { getCooldowns } = require("../../Utils/Cooldown");

async function help(interaction, client) {
    const cooldowns = getCooldowns(interaction.user.id);
    const entries = Array.from(cooldowns.entries());

    const description =
        entries.length > 0
            ? entries
                .map(([cmd, expires]) => {
                    const remaining = Math.max(0, expires - Date.now());
                    const seconds = Math.ceil(remaining / 1000);
                    return `**${cmd}** → ${seconds}s left`;
                })
                .join("\n")
            : "No active cooldowns 🎉";

    const embed = new EmbedBuilder()
        .setColor(0x2b2d31)
        .setTitle("Your Cooldowns")
        .setDescription(description);

    await interaction.editReply({ embeds: [embed], flags: 64 });
}

module.exports = help;