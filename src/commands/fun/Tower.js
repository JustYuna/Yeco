const { GetGlobalAsync, AddToGlobalAsync } = require("../../DataStorage/Datastore");
const ConfigManager = require("../../Core/configManager")

async function buildTower(interaction, client) {
    await AddToGlobalAsync({ TOWERSIZE: 1 });
    const needed = ConfigManager.raw.FUN.TOWER.BRICKS_PER_LAYER;

    const towerSize = await GetGlobalAsync("TOWERSIZE") || 0;
    const layer = Math.floor(towerSize / needed) + 1;

    const msg = ConfigManager.getMsg("FUN.TOWER.MESSAGE", { size: towerSize, layer: layer, needed: needed });
    await interaction.editReply({ 
        content: msg
    });
}

module.exports = buildTower;