const { removeUser } = require('../../DataStorage/Datastore');
const ConfigManager = require('../../Core/configManager');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

async function DataDeletion(interaction, client) {
    if (!interaction) return;
    const userId = interaction.user.id;

    // 1. Create the confirmation buttons
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`confirm_delete_${userId}`)
            .setLabel("Confirm Deletion")
            .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
            .setCustomId(`cancel_delete_${userId}`)
            .setLabel("Cancel")
            .setStyle(ButtonStyle.Secondary)
    );

    // 2. Send the initial warning (Using parseMsg for theme emojis)
    const initialMsg = await interaction.editReply({
        content: ConfigManager.parseMsg(
            "{emoji_UI_Warn} **WARNING:** This will permanently wipe all your progress, currency, and items. Are you sure?"
        ),
        components: [row],
        flags: 64
    });

    // 3. Create a collector for the buttons
    const collector = initialMsg.createMessageComponentCollector({
        filter: i => i.user.id === userId,
        time: 15000, // 15 seconds to decide
        max: 1
    });

    collector.on('collect', async (i) => {
        if (i.customId === `confirm_delete_${userId}`) {
            await removeUser(userId);
            
            return i.update({
                content: ConfigManager.parseMsg("{emoji_UI_Plus} Your data has been successfully deleted."),
                components: []
            });
        } else {
            // CANCEL
            return i.update({
                content: ConfigManager.parseMsg("{emoji_UI_Cross} Deletion canceled."),
                components: []
            });
        }
    });

    collector.on('end', collected => {
        if (collected.size === 0) {
            interaction.editReply({
                content: ConfigManager.parseMsg("{emoji_UI_Cross} Deletion timed out."),
                components: []
            });
        }
    });
}

module.exports = DataDeletion;