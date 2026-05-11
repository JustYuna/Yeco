// Ship.js
const ConfigManager = require("../../Core/configManager");

async function ship(interaction, client, user1, user2) {
    const ids = [user1.id, user2.id].sort();
    const combined = ids.join("");

    // deterministic hash
    let seed = 0;
    for (let i = 0; i < combined.length; i++) {
        seed = (seed * 31 + combined.charCodeAt(i)) % 1000000007;
    }

    let percentage = seed % 101;

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