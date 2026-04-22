const { removeUser } = require('../../DataStorage/Datastore');
const CacheMaid = require("../../Utils/CacheMaid");

const pendingDeletes = CacheMaid.new("command_dataDeletion").map;

async function DataDeletion(interaction, client) {
    if (!interaction) return;

    const userId = interaction.user.id;
    const now = Date.now();

    if (pendingDeletes.has(userId)) {
        const lastRequest = pendingDeletes.get(userId);

        if (now - lastRequest <= 20000) {
            pendingDeletes.delete(userId);

            await removeUser(userId);
            return interaction.editReply({
                content: "🗑️ Your data has been permanently deleted."
            });
        }
    }

    pendingDeletes.set(userId, now);

    return interaction.editReply({
        content: "⚠️ This will delete ALL your data.\nRun `/delete-data` again within 20 seconds to confirm."
    });
}

module.exports = DataDeletion;