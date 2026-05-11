const { removeUser } = require('../../DataStorage/Datastore');
const ConfigManager = require("../../Core/configManager")
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
            const msg = ConfigManager.getMsg("OTHER.DATA_DELETION.DELETED")
            return interaction.editReply({
                content: msg
            });
        }
    }

    pendingDeletes.set(userId, now);

    const msg = ConfigManager.getMsg("OTHER.DATA_DELETION.CONFIRM")
    return interaction.editReply({
        content: msg
    });
}

module.exports = DataDeletion;