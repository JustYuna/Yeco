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
\`/help\` • \`/info\` • \`/delete-data\` 📩 • \`/report\` 📩

**💰 Economy**
\`/farm\` - Lvl. 0
\`/gather\` - Lvl. 2
\`/extract\` - Lvl. 5
\`/craft\` - Lvl. 10

**⚔️ Crime**
\`/rob\` • \`/heist\`

**🏦 Other Economy**
\`/daily\` 📩 • \`/wallet\` • \`/bank\` • \`/gift\`

**🎰 Gambling**
\`/slots\` • \`/coinflip\`

**🎉 Fun**
\`/bonk\` 📩 • \`/hug\` 📩 • \`/patpat\` 📩 • \`/poke\` 📩
\`/ship\` 📩 • \`/build-tower\` 📩 • \`/spin\` 📩

**📊 Extras**
\`/leaderboard\` 📩 • \`/cooldowns\` 📩

-{ Legend }-
📩 - Available in DMs
`
        );

    return interaction.editReply({ embeds: [helpEmbed] });
}

module.exports = help;