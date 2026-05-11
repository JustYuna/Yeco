const { GetAsync, SetAsync } = require('../../DataStorage/Datastore');

async function ToggleSetting(interaction, client, setting) {
    const userId = interaction.user.id;
    console.log(setting);

    const current = (await GetAsync(userId, setting)) || false;
    const newValue = !current;

    await SetAsync(userId, { [setting]: newValue });

    const msg = newValue
        ? "✅ Setting enabled"
        : "❌ Setting disabled";

    return interaction.editReply({
        content: msg
    });
}

module.exports = ToggleSetting;