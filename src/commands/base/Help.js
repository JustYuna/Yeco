const { EmbedBuilder } = require("discord.js");

async function help(interaction, client) {
    const helpEmbed = new EmbedBuilder()
        .setAuthor({
            name: "Commands Overview",
            iconURL: client.user.displayAvatarURL()
        })
        .setColor(0x00AE86)
        .setDescription(
`**📖 Base**
\`/help\` • \`/info\` • \`/delete-data\` 📩• \`/report\` 📩

**💰 Economy**
\`/fish\` • \`/mine\` • \`/cook\` • \`/hunt\`

**🔓 Unlocks (Level 5)**
\`/chop\` • \`/farm\` • \`/smith\`

**⚔️ Crime**
\`/rob\` • \`/heist\`

**🏦 Other Economy**
\`/daily\` 📩 • \`/wallet\` • \`/bank\` • \`/gift\`

**🎰 Gambling**
\`/slots\` • \`/dice\` • \`/rock-paper-scissors\`

**🎉 Fun**
\`/bonk\` 📩 • \`/hug\` 📩 • \`/patpat\` 📩 • \`/poke\` 📩
\`/ship\` 📩 • \`/build-tower\` 📩 • \`/spin\` 📩

**📊 Extras**
\`/leaderboard\` 📩

-{ Legend }-
📩 - Available in DMs
`
        );

    return interaction.editReply({ embeds: [helpEmbed] });
}

module.exports = help;