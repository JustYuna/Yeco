// Ship.js
const ConfigManager = require("../../Core/configManager");

async function ship(interaction, client, user1, user2) {
    const percentage = Math.round(Math.random() * 101);
    let emoji = "❤️";
    if (percentage < 50) emoji = "💔";
    if (percentage < 25) emoji = "💀";

    const msg = ConfigManager.getMsg("FUN.SHIP.MESSAGE", {
        emoji: emoji,
        name1: user1,
        name2: user2,
        percentage: percentage
    });

    await interaction.editReply({ content: msg });
}

module.exports = ship;