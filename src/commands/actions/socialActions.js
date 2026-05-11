// socialActions.js
const ConfigManager = require("../../Core/configManager");

async function sendAction(interaction, client, { target, config }) {
    const links = config.GIFS;
    const messages = config.RESPONSES || {};

    // randomize selections
    const gif = links[Math.floor(Math.random() * links.length)];
    let msg = messages[Math.floor(Math.random() * messages.length)] || "No response found...";

    if (target) {
        msg = ConfigManager.parseMsg(msg, { user: `<@${interaction.user.id}>`, gif: gif, target: `<@${target.id}>` })
    } else {
        msg = ConfigManager.parseMsg(msg, { user: `<@${interaction.user.id}>`, gif: gif })
    }
    await interaction.editReply({ content: msg });
}

module.exports = {
    PatPat: (interaction, client, target) => sendAction(interaction, client, { target: target, config: ConfigManager.raw.FUN.PATPAT }),
    Hug: (interaction, client, target) => sendAction(interaction, client, { target: target, config: ConfigManager.raw.FUN.HUG }),
    Poke: (interaction, client, target) => sendAction(interaction, client, { target: target, config: ConfigManager.raw.FUN.POKE }),
    Bonk: (interaction, client, target) => sendAction(interaction, client, { target: target, config: ConfigManager.raw.FUN.BONK }),
    Spin: (interaction, client, target) => sendAction(interaction, client, { target: target, config: ConfigManager.raw.FUN.SPIN }),
};