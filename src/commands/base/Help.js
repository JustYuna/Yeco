const { EmbedBuilder } = require("discord.js");

async function help(interaction, client) {
    const helpEmbed = new EmbedBuilder()
        .setAuthor({
            name: "✨ Yeco Command Center",
            iconURL: client.user.displayAvatarURL()
        })
        .setColor(0x5865F2) // Discord Blurple
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "🎯 **Essential Commands**\n" +
            "`📩 /help` • `📩 /info` • `📩 /me` • `📩 /report`\n" +
            "`📩 /onboarding` • `📩 /setting` • `📩 /vote`\n\n" +
            
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "💰 **Economy & Progression**\n" +
            "```\n" +
            "/farm      • Level 0\n" +
            "/gather    • Level 5\n" +
            "/extract   • Level 10\n" +
            "/craft     • Level 15\n" +
            "/factory   • Level 20\n" +
            "```\n" +
            
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "⚔️ **Crime System**\n" +
            "`/rob` • `/heist` • `/laundry`\n\n" +
            
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "🏦 **Banking & Wealth**\n" +
            "`📩 /daily` • `/wallet` • `/bank` • `/gift`\n" +
            "`/profile`\n\n" +
            
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "🎰 **Gambling**\n" +
            "`/slots` • `/coinflip`\n\n" +
            
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "🎉 **Fun & Social**\n" +
            "`📩 /bonk` • `📩 /hug` • `📩 /patpat` • `📩 /poke` • `📩 /ship` • `📩 /spin`\n\n" +
            
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "📊 **Leaderboards & Stats**\n" +
            "`/leaderboard`\n\n" +
            
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "> 📩 Available in Direct Messages\n" +
            "> 🔒 Some commands have level requirements"
        )
        .setFooter({ 
            text:  `• Requested by ${interaction.user.displayName}`,
            iconURL: interaction.user.displayAvatarURL()
        })
        .setTimestamp();

    return interaction.editReply({ embeds: [helpEmbed] });
}

module.exports = help;